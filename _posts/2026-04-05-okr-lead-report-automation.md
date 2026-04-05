---
layout: post
title: "Every Morning, the Report Already Knows What Needs Fixing"
subtitle: "How I built an automated lead performance report that replaced 45 minutes of manual calculation with an email that arrives before the first meeting of the day."
date: 2026-04-05
tags: [automation, okr, internal-tools, claude-code, data, social-media]
description: "Every morning meeting on lead generation started with someone opening a dashboard and a spreadsheet to manually calculate where we stood. I built a system that does it automatically and delivers the answer before anyone opens a laptop."
---

Picture the scene.

Seven people in a meeting. Someone is sharing their screen — the performance dashboard on one side, a Google Sheet on the other. Someone else is copying numbers into ChatGPT to get the calculations faster. A third person is scrolling to find which category belongs to which POC.

Everyone is waiting. Nobody is deciding.

This was the first six minutes of every lead generation review. Not strategy. Not action. Just people in a room — some using spreadsheets, some using AI — all doing the same math that should have already been done before anyone walked in.

The answers always came. But they always came late.

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

Not a better dashboard. We had a dashboard.

The problem wasn't visibility. It was the gap between data existing and data being useful — processed, ranked, delivered to the right people before they need to ask for it.

I wanted one thing: an email that lands every morning before the first meeting. Not a data dump. A briefing. The kind a sharp analyst would prepare — except it shows up automatically, every single day, whether anyone remembers to ask for it or not.

Which categories are bleeding. Who owns them. How far behind. Where they finish if nothing changes today. In that order, by urgency. Not alphabetically. Not by team. By how badly they need attention right now.

That's it. The whole idea. Completely obvious once you say it out loud. Completely missing from how we were actually operating.

---

## Building it

I built the whole thing with Claude Code. No data team. No engineering backlog. Just a clear problem, a clear output, and enough iterations until it worked.

The logic isn't complicated once you write it down. Take the data. Calculate how each category is performing against where it should be on this specific day of the month — not the monthly target, but the expected pace right now. Rank by gap. Flag the owner. Project the finish. Send at 10 AM.

What took time was getting the projections right. Not just "you're behind" — but "at this pace, you'll finish at 71% of target by month end." That number is what changes a conversation. It turns "we're a bit behind" into "we will miss by this much unless something changes today."

That specificity is what makes people act. Vague warnings get noted. Precise consequences get addressed.

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
The system maps every category to its owner. When something is flagged, the name is right there — no cross-referencing, no asking around. The value isn't just knowing what's broken. It's knowing who to talk to about it before the meeting starts.

**Can you build internal reporting tools without a data or engineering team?**
Yes — if you can clearly describe what you want the output to look like and what logic should drive it. The hard part was never writing the code. It was thinking through the rules: what counts as "behind", how to calculate a projection, what order things should surface in. Once that thinking is done, the rest follows.
