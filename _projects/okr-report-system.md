---
title: OKR Lead Report System
description: Automated daily email that tracks lead generation performance across all categories, flags what needs attention, and projects month-end outcomes — zero manual effort.
status: live
built: 2026
tools: [Claude Code]
---

![OKR Lead Status Report — automated daily email header](/assets/images/okr-report-header.png)

Every morning, someone used to download data from the dashboard, open a spreadsheet, calculate gaps, figure out who was behind, and send a summary to the team. It took time. It happened after a delay. And the decisions it enabled were already an hour old.

That process is now fully automated.

**The problem it solves**

When you're running lead generation across many categories with different owners, knowing *what needs attention right now* is the actual job. Not downloading data. Not calculating percentages. Not figuring out which POC owns which category. The system should surface that — instantly, every day, without anyone asking it to.

**What it does**

A daily automated email lands in the team's inbox each morning. One look tells you everything:

- Which categories are on track, nearly there, or in the critical zone
- The exact deficit or surplus for each — how far behind, how far ahead
- Who the POC is for every flagged category, so there's no ambiguity about ownership
- A month-end projection based on current run rate — if nothing changes, where does each category land?
- Severity tiers: categories are sorted by how urgent the gap is, not alphabetically

No one downloads anything. No one runs numbers. The decision-relevant information arrives pre-processed.

**What it replaced**

Manual data export → spreadsheet calculation → formatting → sending. A repeatable task that consumed time every single day, done by a person who should have been using that time for the decisions the data enables.

**Built with**

Claude Code. The entire system — data pipeline, calculation logic, severity classification, projection model, and email formatting — built without an engineering ticket.
