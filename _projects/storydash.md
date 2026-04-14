---
title: StoryDash
description: Real-time Instagram story monitoring dashboard with automated hourly email reports. Built for managing 25+ pages at scale.
status: live
built: 2026
tools: [Claude Code]
---

Managing 25+ Instagram pages means checking a lot of things manually — unless you build something that does it instead.

StoryDash is an internal dashboard that shows, in one screen: every page, every story posted today, view counts, and whether story spacing is within the safe window for algorithm distribution.

![StoryDash — all pages, story counts, and status at a glance](/assets/images/storydash-overview.png)

**The problem it solves**

At scale, manually checking each Instagram page for story activity isn't monitoring — it's just time disappearing. More critically, stories posted too close together quietly kill reach. The algorithm doesn't distribute them the way you'd expect. Most teams never catch this because you simply can't track it at volume.

**What it does**

- Single-screen overview of all pages and their story activity
- Story spacing violation detection — flags consecutive stories posted too close together
- Per-page drill-down with thumbnails, timestamps, and specific gap warnings
- Automated hourly email report delivered to the full team: pages that posted, pages that haven't, spacing violations

**The result**

No one on the team needs to open Instagram to know the status. The information arrives. The spacing violations that were silently happening every day are now caught and fixed.

**Built with**

Claude Code. From problem to working internal tool without a dedicated engineering team.

---

Read the full writeup: [I Was "Monitoring" 25+ Instagram Pages. I Was Just Wasting Time.](/writing/monitor-instagram-stories-multiple-accounts/)
