// KSFE Chit Calculator — UI (Zerodha-style live layout)
// Requires window.KSFE from calculations.js
// Requires window.ML from malayalam.js

// ── Date helpers ──────────────────────────────────────────
var MONTHS_SHORT_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getMonthShort(idx) {
  var key = 'month-short-' + (idx + 1);
  return t(key, MONTHS_SHORT_EN[idx]);
}

function calcChittyDates(startMonth, startYear, duration) {
  var now = new Date();
  var elapsed = (now.getFullYear() - startYear) * 12 + (now.getMonth() + 1 - startMonth);
  var remaining = duration - elapsed;
  var end = new Date(startYear, startMonth - 1 + duration, 1);
  return {
    elapsed:   elapsed,
    remaining: remaining,
    monthNum:  elapsed + 1,
    endMonth:  end.getMonth() + 1,
    endYear:   end.getFullYear(),
  };
}

// ── i18n helper ───────────────────────────────────────────
var currentLang = 'en';

function t(key, fallback) {
  if (currentLang === 'ml' && window.ML && window.ML[key]) return window.ML[key];
  return fallback || key;
}

function applyLang() {
  // Static text elements
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (currentLang === 'ml' && window.ML && window.ML[key]) {
      el.textContent = window.ML[key];
    } else {
      // Restore original English — stored on first run
      if (el.dataset.en) el.textContent = el.dataset.en;
    }
  });
  // Placeholder attributes
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-ph');
    if (!el.dataset.enPh) el.dataset.enPh = el.placeholder;
    el.placeholder = (currentLang === 'ml' && window.ML && window.ML[key]) ? window.ML[key] : el.dataset.enPh;
  });
}

// Save English originals before any swap
document.querySelectorAll('[data-i18n]').forEach(function(el) {
  el.dataset.en = el.textContent.trim();
});

// ── Dark mode toggle ──────────────────────────────────────
document.getElementById('theme-btn').addEventListener('click', function() {
  var html = document.documentElement;
  var isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  this.textContent = isDark ? '🌙' : '☀️';
  this.classList.toggle('active', !isDark);
});

// ── Language toggle ───────────────────────────────────────
document.getElementById('lang-btn').addEventListener('click', function() {
  currentLang = currentLang === 'en' ? 'ml' : 'en';
  this.classList.toggle('active', currentLang === 'ml');
  document.documentElement.setAttribute('data-lang', currentLang);
  document.documentElement.setAttribute('lang', currentLang);
  applyLang();
  // Re-render dynamic content if results are shown
  tryCalculate();
});

// ── Chip controls ─────────────────────────────────────────
document.querySelectorAll('.chip').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var targetId = btn.dataset.target;
    var val = btn.dataset.val;
    document.getElementById(targetId).value = val;
    btn.closest('.chip-row').querySelectorAll('.chip').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    renderBasics(getInputs());
  });
});

// ── Date inputs — re-render timeline if results visible ───
document.getElementById('start-month').addEventListener('change', function() {
  if (document.getElementById('right-col').classList.contains('open')) tryCalculate();
});
document.getElementById('start-year').addEventListener('input', function() {
  var yr = Number(this.value);
  if (yr >= 2015 && yr <= 2030 && document.getElementById('right-col').classList.contains('open')) tryCalculate();
});

// ── Urgency chips — re-render verdict if results visible ──
document.querySelectorAll('#urgency-chips .chip').forEach(function(btn) {
  btn.addEventListener('click', function() {
    if (document.getElementById('right-col').classList.contains('open')) {
      tryCalculate();
    }
  });
});

// ── Submit button — only place that shows results ─────────
document.getElementById('calc-btn').addEventListener('click', function() {
  var inp = getInputs();
  if (!inp.lastPaid) {
    showError('err-sms', 'Please enter the amount from your KSFE SMS.');
    document.getElementById('last-paid').focus();
    return;
  }
  calculate(inp);
});

// ── Helpers ───────────────────────────────────────────────
function getInputs() {
  return {
    chitAmount:      Number(document.getElementById('chit-amount').value),
    duration:        Number(document.getElementById('duration').value),
    winnersPerMonth: Number(document.getElementById('winners').value),
    luckyPerMonth:   Number(document.getElementById('lucky').value),
    commissionPct:   Number(document.getElementById('commission').value),
    lastPaid:        Number(document.getElementById('last-paid').value),
    urgency:         document.getElementById('urgency').value || 'soon',
    startMonth:      Number(document.getElementById('start-month').value) || 0,
    startYear:       Number(document.getElementById('start-year').value) || 0,
  };
}

function updateLoanComparison(basics, state, inp) {
  var rate       = Number(document.getElementById('loan-rate').value);
  var loanMonths = Number(document.getElementById('loan-months').value);
  if (!rate || rate <= 0 || !loanMonths || loanMonths <= 0) return;

  var chittyBidCost = state.avgCallLoss + basics.ksfeCommission;
  var netReceived   = inp.chitAmount - chittyBidCost;
  if (netReceived <= 0) return;

  var loan = KSFE.calcLoan({
    principal:  netReceived,
    annualRate: rate,
    months:     loanMonths,
  });

  // Chitty column
  document.getElementById('cmp-chitty-net').textContent     = KSFE.fmt(netReceived);
  document.getElementById('cmp-chitty-cost').textContent    = KSFE.fmt(chittyBidCost);
  document.getElementById('cmp-chitty-monthly').textContent = KSFE.fmt(basics.installment) + ' / mo';

  // Loan column
  document.getElementById('cmp-loan-net').textContent      = KSFE.fmt(netReceived);
  document.getElementById('cmp-loan-interest').textContent = KSFE.fmt(loan.totalInterest);
  document.getElementById('cmp-loan-monthly').textContent  = KSFE.fmt(loan.emi) + ' / mo';

  var card    = document.getElementById('compare-card');
  var verdict = document.getElementById('compare-verdict');
  var cChitty = document.getElementById('cmp-chitty-col');
  var cLoan   = document.getElementById('cmp-loan-col');

  card.style.display = 'block';
  cChitty.classList.remove('winner');
  cLoan.classList.remove('winner');

  var saving = Math.abs(loan.totalInterest - chittyBidCost);
  if (chittyBidCost < loan.totalInterest) {
    cChitty.classList.add('winner');
    verdict.textContent = t('cmp-chitty-wins', 'Calling chitty saves you {save} compared to a {rate}% loan over {mo} months.')
      .replace('{save}', KSFE.fmt(saving)).replace('{rate}', rate).replace('{mo}', loanMonths);
    verdict.className   = 'compare-verdict good';
  } else if (loan.totalInterest < chittyBidCost) {
    cLoan.classList.add('winner');
    verdict.textContent = t('cmp-loan-wins', 'Personal loan saves you {save} — but you pay {emi} extra every month.')
      .replace('{save}', KSFE.fmt(saving)).replace('{emi}', KSFE.fmt(loan.emi));
    verdict.className   = 'compare-verdict warn';
  } else {
    verdict.textContent = t('cmp-equal', 'Both options cost roughly the same.');
    verdict.className   = 'compare-verdict';
  }
}

function showError(id, msg) {
  var el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

function clearErrors() {
  ['err-sms', 'err-lucky', 'err-date'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  });
}

function tryCalculate() {
  var inp = getInputs();
  if (inp.chitAmount && inp.duration && inp.lastPaid) {
    calculate(inp);
  } else {
    renderBasics(inp);
  }
}

function renderBasics(inp) {
  if (!inp.chitAmount || !inp.duration) return;
  var basics = KSFE.calcBasics(inp);
  document.getElementById('res-installment').textContent = KSFE.fmt(basics.installment);
}

function calculate(inp) {
  if (!inp) inp = getInputs();
  if (!inp.chitAmount || !inp.duration || !inp.winnersPerMonth || !inp.commissionPct) return;

  clearErrors();

  if (inp.luckyPerMonth >= inp.winnersPerMonth) {
    showError('err-lucky', 'Lucky winners must be fewer than total winners per month.');
    return;
  }

  var basics = KSFE.calcBasics(inp);

  document.getElementById('res-installment').textContent = KSFE.fmt(basics.installment);

  if (!inp.lastPaid) return;

  if (inp.lastPaid >= basics.installment) {
    showError('err-sms', 'SMS amount (₹' + inp.lastPaid + ') can\'t be more than your monthly installment (₹' + basics.installment + ').');
    return;
  }

  var state = KSFE.calcCurrentState({
    installment:    basics.installment,
    lastPaid:       inp.lastPaid,
    totalMembers:   basics.totalMembers,
    callsPerMonth:  basics.callsPerMonth,
    ksfeCommission: basics.ksfeCommission,
    chitAmount:     inp.chitAmount,
  });

  var comp    = KSFE.getCompetition(state.lossPercent);
  var urgency = inp.urgency || 'soon';

  // ── Timeline / remaining months ──────────────────────────
  var remainingMonths = null;
  var timelineEl = document.getElementById('timeline-strip');

  if (inp.startMonth && inp.startYear) {
    var dc = calcChittyDates(inp.startMonth, inp.startYear, inp.duration);

    if (dc.elapsed < 0) {
      showError('err-date', t('err-date-future', 'Start date cannot be in the future.'));
      return;
    }
    if (dc.remaining <= 0) {
      showError('err-date', t('err-date-ended', 'This chitty has already ended — check the start date and duration.'));
      return;
    }

    remainingMonths = dc.remaining;
    var startStr = getMonthShort(inp.startMonth - 1) + ' ' + inp.startYear;
    var endStr   = getMonthShort(dc.endMonth - 1) + ' ' + dc.endYear;

    timelineEl.style.display = 'flex';
    timelineEl.innerHTML =
      '<span>' + startStr + '</span>' +
      '<span class="tl-sep">→</span>' +
      '<span>' + t('tl-month', 'Month') + ' <strong>' + dc.monthNum + '</strong> ' + t('tl-of', 'of') + ' ' + inp.duration + '</span>' +
      '<span class="tl-sep">·</span>' +
      '<span><strong>' + remainingMonths + ' ' + t('tl-months-left', 'months left') + '</strong></span>' +
      '<span class="tl-sep">·</span>' +
      '<span>' + t('tl-ends', 'Ends') + ' ' + endStr + '</span>';

    // Auto-set loan tenure to remaining months
    document.getElementById('loan-months').value = remainingMonths;
    document.getElementById('loan-tenure-auto').textContent = remainingMonths + ' ' + t('loan-tenure-auto-label', 'months (your remaining period)');
    document.getElementById('loan-tenure-auto').style.display = 'inline';
    document.getElementById('loan-tenure-manual').style.display = 'none';
    document.getElementById('compare-note').textContent =
      t('compare-note-auto', 'Loan tenure = your remaining') + ' ' + remainingMonths + ' ' + t('compare-note-auto2', 'months. Same amount received either way. Bank fees excluded.');
  } else {
    timelineEl.style.display = 'none';
    document.getElementById('loan-tenure-auto').style.display = 'none';
    document.getElementById('loan-tenure-manual').style.display = 'flex';
    document.getElementById('compare-note').textContent =
      t('compare-note-manual', 'Same amount received. Chitty monthly = your existing installment. Loan monthly = EMI only. Bank processing fees (~1–2%) excluded.');
  }

  // Verdict card — urgency-aware
  var bar = document.getElementById('verdict-bar');
  var verdictTitle, verdictSub, barCls, verdictIcon;

  if (state.lossPercent <= 10) {
    barCls       = 'go';
    verdictIcon  = '✅';
    verdictTitle = t('v-go-title', 'Good time to call!');
    verdictSub   = urgency === 'now'
      ? t('v-go-now', 'Low competition. Calling now costs less than a personal loan — see comparison below.')
      : t('v-go-wait', 'Competition is low. A good window to call your chitty.');
  } else if (state.lossPercent <= 15) {
    barCls      = 'wait';
    verdictIcon = '⚠️';
    if (urgency === 'now') {
      verdictTitle = t('v-med-now-title', 'Moderate competition — check loan comparison');
      verdictSub   = t('v-med-now-sub', 'You\'d lose {pct}% calling now. A personal loan may cost similar — compare below.').replace('{pct}', state.lossPercent);
    } else if (urgency === 'soon') {
      verdictTitle = t('v-med-soon-title', 'Okay to call — but could wait');
      verdictSub   = t('v-med-soon-sub', 'Competition is moderate. If you can hold 1–2 months, you\'ll likely get a better rate.');
    } else {
      verdictTitle = t('v-med-later-title', 'No rush — wait for a better month');
      verdictSub   = t('v-med-later-sub', 'Competition is moderate right now. Since you\'re not in a hurry, wait until it drops below 10%.');
    }
  } else {
    if (urgency === 'now') {
      barCls       = 'wait';
      verdictIcon  = '🔁';
      verdictTitle = t('v-high-now-title', 'Consider a personal loan instead');
      verdictSub   = t('v-high-now-sub', 'Competition is high — you\'d lose {pct}% calling now. A personal loan could cost you less. See comparison below.').replace('{pct}', state.lossPercent);
    } else {
      barCls       = 'no';
      verdictIcon  = '🚫';
      verdictTitle = urgency === 'soon' ? t('v-high-soon-title', 'Wait — competition is too high') : t('v-high-later-title', 'Keep waiting — no rush');
      verdictSub   = urgency === 'soon'
        ? t('v-high-soon-sub', 'You\'d lose {pct}% calling now. In 1–2 months this should improve.').replace('{pct}', state.lossPercent)
        : t('v-high-later-sub', 'Competition is high ({pct}% loss). No need to call until it drops below 10%.').replace('{pct}', state.lossPercent);
    }
  }
  bar.className = 'verdict-card ' + barCls;
  document.getElementById('verdict-dot').textContent  = verdictIcon;
  document.getElementById('verdict-text').textContent = verdictTitle;
  document.getElementById('verdict-sub').textContent  = verdictSub;

  // Loss box
  var chittyBidCost = state.avgCallLoss + basics.ksfeCommission;
  var netReceived   = inp.chitAmount - chittyBidCost;
  document.getElementById('loss-box').style.display = 'flex';
  document.getElementById('res-call-loss').textContent    = KSFE.fmt(chittyBidCost) + ' loss';
  document.getElementById('res-net-receive').textContent  = KSFE.fmt(netReceived);

  // Hidden compat spans
  document.getElementById('res-dividend').textContent  = KSFE.fmt(state.dividend);
  document.getElementById('res-avg-bid').textContent   = KSFE.fmt(state.avgCallLoss);
  document.getElementById('res-loss-pct').textContent  = state.lossPercent + '%';
  document.getElementById('comp-badge').textContent    = state.lossPercent + '%';
  document.getElementById('comp-level').textContent    = comp.label;
  document.getElementById('gauge-status').textContent  = comp.label;

  // Guide rows (hidden, kept for compat)
  var rows = KSFE.buildGuide({
    chitAmount:     inp.chitAmount,
    installment:    basics.installment,
    totalMembers:   basics.totalMembers,
    callsPerMonth:  basics.callsPerMonth,
    ksfeCommission: basics.ksfeCommission,
  });
  var tbody = document.getElementById('guide-body');
  tbody.innerHTML = '';
  rows.forEach(function(row) {
    var tr = document.createElement('tr');
    if (Math.abs(row.payment - inp.lastPaid) < 200) tr.className = 'cur-row';
    tbody.appendChild(tr);
  });

  // Wait tip
  var recoRow  = document.getElementById('reco-row');
  var tipIcon, tipTitle, tipDesc, tipCls;
  var waitThreshold = KSFE.fmt(rows[3].payment); // payment at ~13% loss = "okay" floor
  if (state.lossPercent <= 10) {
    tipCls   = 'tip-go';
    tipIcon  = '✅';
    tipTitle = t('tip-go-title', 'Great time — go for it!');
    tipDesc  = t('tip-go-desc', 'Competition is low. Call the chitty now and get your funds at a fair cost.');
  } else if (state.lossPercent <= 15) {
    tipCls   = 'tip-wait';
    tipIcon  = '⚠️';
    tipTitle = t('tip-med-title', 'Could wait a bit longer');
    tipDesc  = t('tip-med-desc', 'You will lose a bit more than ideal. If you can wait until your SMS shows {amt} or more, you will save more money.').replace('{amt}', waitThreshold);
  } else {
    tipCls   = 'tip-no';
    tipIcon  = '⏳';
    tipTitle = t('tip-high-title', 'Wait until SMS shows {amt}+').replace('{amt}', waitThreshold);
    tipDesc  = t('tip-high-desc', 'Right now too many members are calling. When your SMS amount crosses {amt}, competition drops and you save thousands.').replace('{amt}', waitThreshold);
  }
  recoRow.className = 'wait-tip ' + tipCls;
  recoRow.style.display = 'flex';
  document.getElementById('reco-icon').textContent  = tipIcon;
  document.getElementById('reco-title').textContent = tipTitle;
  document.getElementById('reco-desc').textContent  = tipDesc;

  // Zone strip
  // rows[1]=8%, rows[2]=10%, rows[3]=13%, rows[5]=22%
  var zoneSection = document.getElementById('zone-section');
  var zoneStrip   = document.getElementById('zone-strip');
  zoneSection.style.display = 'block';
  var zoneDefs = [
    {
      range:    KSFE.fmt(rows[2].payment) + ' – ' + KSFE.fmt(rows[0].payment),
      label:    'Best time — low competition',
      badge:    'Call now ✓', badgeCls: 'green', dot: '#16a34a',
      current:  state.lossPercent <= 10,
    },
    {
      range:    KSFE.fmt(rows[3].payment) + ' – ' + KSFE.fmt(rows[2].payment),
      label:    'Okay — moderate competition',
      badge:    'Acceptable', badgeCls: 'amber', dot: '#f59e0b',
      current:  state.lossPercent > 10 && state.lossPercent <= 15,
    },
    {
      range:    KSFE.fmt(rows[5].payment) + ' – ' + KSFE.fmt(rows[3].payment),
      label:    'Too competitive — better to wait',
      badge:    'Wait', badgeCls: 'red', dot: '#dc2626',
      current:  state.lossPercent > 15 && state.lossPercent <= 24,
    },
    {
      range:    'Below ' + KSFE.fmt(rows[5].payment),
      label:    'Very high competition — avoid calling',
      badge:    "Don't call", badgeCls: 'red', dot: '#dc2626',
      current:  state.lossPercent > 24,
    },
  ];
  zoneStrip.innerHTML = '';
  zoneDefs.forEach(function(z) {
    var div = document.createElement('div');
    div.className = 'zone-row' + (z.current ? ' current' : '');
    var rangeText = z.current ? z.range + ' ◀ You' : z.range;
    div.innerHTML =
      '<div class="zone-dot" style="background:' + z.dot + '"></div>' +
      '<div class="zone-info">' +
        '<div class="zone-range">' + rangeText + '</div>' +
        '<div class="zone-label">' + z.label + '</div>' +
      '</div>' +
      '<span class="zone-badge ' + z.badgeCls + '">' + z.badge + '</span>';
    zoneStrip.appendChild(div);
  });

  // Loan comparison
  updateLoanComparison(basics, state, inp);
  ['loan-rate', 'loan-months'].forEach(function(id) {
    document.getElementById(id).oninput = function() {
      updateLoanComparison(basics, state, inp);
    };
  });

  // WhatsApp share button
  var shareBtn = document.getElementById('share-btn');
  shareBtn.style.display = 'inline-block';
  shareBtn.onclick = function() {
    var verdict = state.lossPercent <= 8 ? 'Good time ✅' : state.lossPercent <= 15 ? 'Okay, could wait ⚠️' : 'Wait 🛑';
    var msg =
      '*KSFE Chitty Analysis* 📊\n\n' +
      verdict + ' — ' + state.lossPercent + '% loss\n\n' +
      '• Chitty: ' + KSFE.fmt(inp.chitAmount) + ' / ' + inp.duration + ' months\n' +
      '• Monthly: ' + KSFE.fmt(basics.installment) + '\n' +
      '• SMS amount: ' + KSFE.fmt(inp.lastPaid) + '\n' +
      '• You save: ' + KSFE.fmt(state.dividend) + '/mo\n' +
      '• Others giving up: ' + KSFE.fmt(state.avgCallLoss);
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  };

  // Slide in results
  document.getElementById('right-col').classList.add('open');

  // Scroll to results on mobile
  if (window.innerWidth < 801) {
    setTimeout(function() {
      document.getElementById('right-col').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
}

// no-op on load — results shown only on button press
