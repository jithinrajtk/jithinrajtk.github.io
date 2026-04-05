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

## The problem I didn't know I had

When you're managing 25+ pages, there's an issue that doesn't show up anywhere: it's not *whether* you post stories. It's *when*.

Stories posted too close together don't get distributed the way you'd expect. The algorithm sees a burst, not a cadence. Reach drops. Views thin out. And because you can't manually track gaps across that many pages, it just keeps happening quietly.

We were posting stories two minutes apart on some pages. Sometimes one minute. We had no idea.

---

## So I built StoryDash

An internal dashboard. One screen. Every page, every story posted today, when each was last active — and whether the spacing is within the safe window.

![StoryDash overview — all pages, story counts, and status at a glance](/assets/images/storydash-overview.png)

37 pages. 96 stories today. 21 pages active. The ones with nothing posted and the ones breaking spacing rules — right there, without opening Instagram once.

---

## The violations view

When I added the spacing check, I expected maybe two or three pages with issues.

![Story spacing violations — pages with consecutive stories posted too close together](/assets/images/storydash-violations.png)

It was more than that. Multiple pages posting consecutive stories less than a minute apart. Some flagged critical. This had been happening every single day and we'd never caught it.

I showed this to the team. Nobody spoke for a second.

---

## Drill into any page

Click any page, see the full day: thumbnails, timestamps, exactly where the gaps are too short.

![Per-page detail view with story thumbnails and frequency warning](/assets/images/storydash-page-detail.png)

Three pairs of stories posted under 30 minutes apart. Worst gap: 0 minutes. The dashboard shows the exact violation and the recommended minimum — so the person managing that page knows what to fix, not just that something's wrong.

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

I manage content operations, not a dev team. No engineer involved, no ticket raised. Just a problem that was costing thirty minutes every morning, and a tool that stopped it.

*Running in production.*
