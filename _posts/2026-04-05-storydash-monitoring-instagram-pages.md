---
layout: post
title: "I Was \"Monitoring\" 25+ Instagram Pages. I Was Just Wasting Time."
subtitle: "How I built an internal dashboard and automated email reports to manage Instagram story activity at scale — using Claude Code."
date: 2026-04-05
tags: [building, automation, instagram]
description: "How I built an internal dashboard and automated email reports to manage Instagram story activity at scale — using Claude Code."
---

Every morning, the routine was the same.

Open Instagram. Check page one. Stories posted? Good. Check page two. Stories? Yes. Check page three...

Twenty-five pages later, thirty minutes had passed. And I hadn't done anything useful. I'd just *confirmed* that things existed.

That's not monitoring. That's just time disappearing.

---

## The gap nobody was tracking

Managing Instagram at scale has a problem that doesn't show up in any report: it's not *whether* you post stories. It's *when*.

Stories posted too close together don't get distributed the way you'd expect. The algorithm sees a burst, not a cadence. Reach drops. Views thin out. At 25+ pages, you can't track spacing manually — so it just keeps happening.

We were posting stories two minutes apart on some pages. Sometimes one minute. We had no idea.

---

## So I built StoryDash

An internal dashboard. One screen. Every page, every story posted today, when each page was last active — and whether the spacing between stories is within the safe window.

![StoryDash overview — all pages, story counts, and status at a glance](/assets/images/storydash-overview.png)

37 pages. 96 stories posted today. 21 pages active. Which pages have nothing posted and which are violating spacing rules — visible without opening Instagram once.

---

## The violations view

When I added the spacing check, I expected two or three pages with issues.

![Story spacing violations — pages with consecutive stories posted too close together](/assets/images/storydash-violations.png)

Multiple pages had consecutive stories posted less than a minute apart. Some critical. This was happening silently, every day, across pages with thousands of followers.

We had zero visibility into it. Now we do.

---

## Drill into any page

Click a page, see the full story timeline: thumbnails, timestamps, gap warnings.

![Per-page detail view with story thumbnails and frequency warning](/assets/images/storydash-page-detail.png)

Three pairs of stories posted under 30 minutes apart. Worst gap: 0 minutes. The dashboard flags the exact violation and the recommended minimum — so whoever manages that page knows exactly what to fix.

---

## The email that arrives without anyone asking

The dashboard solved the need to check. But I wanted to remove the need to check the dashboard too.

Hourly automated email. Every hour: pages that posted, pages that haven't, which ones need attention.

![Automated hourly email report — stories today, pages posted, pages with no stories](/assets/images/storydash-email-report-clean.png)

93 stories tracked. 23 pages posted. 8 with nothing yet — highlighted.

The information arrives. No one has to open anything.

---

## How it was built

Built with **Claude Code** — dashboard, spacing logic, automated emails, all of it.

I run content operations, not an engineering team. No dev resources, no product backlog. A problem that was costing thirty minutes every morning and a system that stopped it.

*Running in production.*
