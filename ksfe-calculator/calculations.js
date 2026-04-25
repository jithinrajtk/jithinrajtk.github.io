// KSFE Chit Fund Math Module
// Plain JS — no modules. Everything exposed via window.KSFE.

(function () {
  var KSFE = {};

  // ---------------------------------------------------------------------------
  // calcBasics
  // ---------------------------------------------------------------------------
  KSFE.calcBasics = function (opts) {
    var chitAmount      = opts.chitAmount;
    var duration        = opts.duration;
    var winnersPerMonth = opts.winnersPerMonth;
    var luckyPerMonth   = opts.luckyPerMonth;
    var commissionPct   = opts.commissionPct;

    return {
      installment:    Math.round(chitAmount / duration),
      totalMembers:   duration * winnersPerMonth,
      callsPerMonth:  winnersPerMonth - luckyPerMonth,
      ksfeCommission: Math.round(commissionPct / 100 * chitAmount),
    };
  };

  // ---------------------------------------------------------------------------
  // calcCurrentState
  // ---------------------------------------------------------------------------
  KSFE.calcCurrentState = function (opts) {
    var installment    = opts.installment;
    var lastPaid       = opts.lastPaid;
    var totalMembers   = opts.totalMembers;
    var callsPerMonth  = opts.callsPerMonth;
    var ksfeCommission = opts.ksfeCommission;
    var chitAmount     = opts.chitAmount;

    if (lastPaid >= installment) return null;

    var dividend     = installment - lastPaid;
    var dividendPool = dividend * totalMembers;
    var avgCallLoss  = Math.round((dividendPool + ksfeCommission * callsPerMonth) / callsPerMonth);
    var lossPercent  = Math.round(avgCallLoss / chitAmount * 1000) / 10;

    return { dividend: dividend, avgCallLoss: avgCallLoss, lossPercent: lossPercent };
  };

  // ---------------------------------------------------------------------------
  // buildGuide
  // ---------------------------------------------------------------------------
  KSFE.buildGuide = function (opts) {
    var chitAmount     = opts.chitAmount;
    var installment    = opts.installment;
    var totalMembers   = opts.totalMembers;
    var callsPerMonth  = opts.callsPerMonth;
    var ksfeCommission = opts.ksfeCommission;

    var targets = [5, 8, 10, 13, 18, 22, 27, 30];

    return targets.map(function (pct) {
      var bid      = Math.round(chitAmount * pct / 100);
      var dividend = Math.max(
        0,
        Math.round((bid * callsPerMonth - ksfeCommission * callsPerMonth) / totalMembers)
      );
      var payment  = installment - dividend;
      var received = chitAmount - bid - ksfeCommission;

      var label, badgeClass;
      if (pct <= 8) {
        label = "Excellent"; badgeClass = "badge-good";
      } else if (pct <= 13) {
        label = "Good";      badgeClass = "badge-good";
      } else if (pct <= 20) {
        label = "Average";   badgeClass = "badge-avg";
      } else {
        label = "High Loss"; badgeClass = "badge-bad";
      }

      return { pct: pct, bid: bid, dividend: dividend, payment: payment,
               received: received, label: label, badgeClass: badgeClass };
    });
  };

  // ---------------------------------------------------------------------------
  // getRecommendation
  // ---------------------------------------------------------------------------
  KSFE.getRecommendation = function (lossPercent) {
    if (lossPercent <= 8) {
      return {
        cssClass: "reco-go",
        title: "Great time to call!",
        desc:  "Competition is low. You can call with a small loss. Good window to go for it.",
      };
    }
    if (lossPercent <= 15) {
      return {
        cssClass: "reco-watch",
        title: "Okay — but could wait",
        desc:  "You’d give up " + lossPercent + "% of chit value. Acceptable if you need funds. Wait for SMS to cross ₹4,750 for a better deal.",
      };
    }
    return {
      cssClass: "reco-wait",
      title: "Too much competition — wait",
      desc:  "People are calling with " + lossPercent + "% loss right now. Wait until your SMS payment crosses ₹4,700 before calling. You’ll save thousands.",
    };
  };

  // ---------------------------------------------------------------------------
  // getCompetition
  // ---------------------------------------------------------------------------
  KSFE.getCompetition = function (lossPercent) {
    if (lossPercent <= 8) {
      return {
        label:    "Low — Good time to call",
        color:    "#16A34A",
        widthPct: lossPercent / 30 * 100,
      };
    }
    if (lossPercent <= 15) {
      return {
        label:    "Medium — Wait or negotiate",
        color:    "#D97706",
        widthPct: lossPercent / 30 * 100,
      };
    }
    return {
      label:    "High — Better to wait",
      color:    "#DC2626",
      widthPct: Math.min(lossPercent / 30 * 100, 100),
    };
  };

  // ---------------------------------------------------------------------------
  // calcLoan — compare chitty call cost vs personal loan interest
  // ---------------------------------------------------------------------------
  KSFE.calcLoan = function (opts) {
    var principal  = opts.principal;   // net amount received from chitty call
    var annualRate = opts.annualRate;  // bank interest % per year
    var months     = opts.months;      // loan tenure in months

    var r = annualRate / 100 / 12;
    var emi, totalInterest;

    if (r === 0 || months === 0) {
      emi           = principal;
      totalInterest = 0;
    } else {
      var factor    = Math.pow(1 + r, months);
      emi           = Math.round(principal * r * factor / (factor - 1));
      totalInterest = Math.round((emi * months) - principal);
    }

    return { emi: emi, totalInterest: totalInterest };
  };

  // ---------------------------------------------------------------------------
  // fmt
  // ---------------------------------------------------------------------------
  KSFE.fmt = function (amount) {
    if (amount >= 100000) {
      return "₹" + (amount / 100000).toFixed(1) + "L";
    }
    return "₹" + amount.toLocaleString("en-IN");
  };

  // ---------------------------------------------------------------------------
  // Expose
  // ---------------------------------------------------------------------------
  window.KSFE = KSFE;
})();

// ---------------------------------------------------------------------------
// Verification
// ---------------------------------------------------------------------------
// Example: chitAmount=300000, duration=60, winners=4, lucky=1, commission=5, lastPaid=4461
//
// calcBasics:
//   installment    = round(300000/60)        = 5000
//   totalMembers   = 60*4                    = 240
//   callsPerMonth  = 4-1                     = 3
//   ksfeCommission = round(5/100*300000)     = 15000
//
// calcCurrentState:
//   dividend       = 5000-4461              = 539
//   dividendPool   = 539*240               = 129360
//   avgCallLoss    = round((129360 + 15000*3)/3)
//                  = round(174360/3)        = 58120
//   lossPercent    = round(58120/300000*1000)/10
//                  = round(193.73)/10       = 194/10 = 19.4
//
// Expected: installment=5000, dividend=539, avgCallLoss=58120, lossPercent=19.4  ✓
