---
layout: post
title: "Every Morning, the Report Already Knows What Needs Fixing"
subtitle: "How I built an automated OKR lead report that replaced 45 minutes of manual calculation with an email that arrives before the first meeting of the day."
date: 2026-04-05
tags: [automation, okr, internal-tools, claude-code, data, social-media]
description: "Every morning meeting on lead generation started with someone opening a dashboard and a spreadsheet to manually calculate where we stood. I built a system that does it automatically and delivers the answer before anyone opens a laptop."
---

Every team meeting about lead generation started the same way.

Someone opened the OKR dashboard. Someone else opened a Google Sheet. The next few minutes looked like a live calculation session — how far are we from target? What's the daily run rate? If we stay at this pace, where do we land at month end?

The answers always came. But they always came late.

By the time we'd worked out that a category was tracking at 67% and would miss the month by 40 leads, six minutes had passed. Six minutes of math instead of deciding what to do about it.

That wasn't the worst part.

---

## The data was already old

The dashboard pulled numbers till the previous day. Data for today wouldn't show up until after midnight. So every morning meeting — the one where you're supposed to course-correct before the day gets away from you — was running on information that was at least 12 hours stale.

We were doing real-time math on yesterday's numbers. And calling it a data-driven meeting.

I've been running social media operations long enough to know what a real-time decision feels like, and what a delayed one costs. A lead category tracking at 65% on Day 10 is recoverable. The same category at 65% on Day 25 isn't. The window to act matters. And every morning we were showing up to the window hours after it opened.

---

## The thing nobody says out loud

There's an unspoken cost to manual calculation in a team setting. Someone has to be the one who *knows the numbers*. They're always slightly under pressure to have them ready. They open the sheet, run the figures, try to remember which POC owns which category, and present while everyone else waits.

That person's job in that moment isn't strategy. It's data retrieval.

Data retrieval is a computer's job.

We had 22 active lead categories. Multiple POCs. Different monthly targets for each. A daily run rate that shifts based on how many working days are left. The calculation is doable — but doing it manually every morning, before a meeting, under time pressure, is a design failure dressed up as a routine.

I started thinking about what the meeting would look like if everyone already knew the numbers before they walked in.

---

## What I actually needed

Not a better dashboard. We had a dashboard. The problem wasn't access to data — it was the gap between the data existing and the data being useful. Processed, shaped, delivered.

What I needed was simple: every morning, before anyone opens a laptop, an email arrives. It's already done the math. It knows which categories are on track, which are slipping, which are critical. It knows who owns each one. It projects where each category finishes if the current pace holds. It sorts by urgency — so the first thing you read is the thing that needs immediate attention.

No downloading. No calculating. No asking "who owns this one?"

Just: here is what is happening, here is what needs attention today, here is who needs to act.

---

## Building it

I built the entire system with Claude Code.

It connects to the data source, calculates daily run-rate achievement for every category, compares it against the expected pace for that point in the month, and classifies each category into a severity tier: on track, nearly there, needs push, behind, critical. It pulls the POC for every flagged item. It formats everything into a clean email and sends it to the full team by 10 AM.

It also projects month-end outcomes: based on current pace, this category will finish here — not the target, not the hope, the actual mathematical outcome if nothing changes.

I described the problem. Worked through the logic. Kept iterating until it ran cleanly on its own. Nobody else needed to be involved.

---

## What the meeting looks like now

People walk in already knowing.

The email came at 10 AM. Everyone's seen it. The categories that need attention are identified. The POCs already know they're flagged. Sometimes the problem is already being addressed before the meeting starts.

The meeting stopped being a data retrieval session and became what it was always supposed to be: a decision-making session.

The data is still from yesterday — the source system hasn't changed. But the gap between *data exists* and *team has processed it and is ready to act* went from 45 minutes to zero.

That's the only gap that actually mattered.

---

## Questions people ask about this

**Why not just fix the dashboard to update in real time?**
That would solve the data freshness problem but not the processing problem. Someone still has to open it, read it, calculate the gaps, identify who's behind, and summarise for the team. The bottleneck isn't the dashboard — it's the manual steps between data and decision.

**How do you handle multiple POCs across different categories?**
The system maps each category to its owner. When a category is flagged, the POC is pulled automatically and shown alongside it. No looking up, no remembering. The right name is there the moment the problem surfaces.

**Can you build internal data tools without a data team?**
Yes. The gap between having a clear problem and having a working system has never been smaller. You need to understand the logic of what you want built — the rules, the tiers, the outputs — and be willing to iterate. The technical execution is no longer the constraint it used to be.
