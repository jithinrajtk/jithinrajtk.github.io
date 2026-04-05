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

## The Real Problem Was Invisible

Here's the thing nobody talks about when you're managing Instagram at scale: **posting frequency matters more than posting count.**

It's not just *whether* you post stories. It's *when*. Stories posted too close together don't get distributed the way you'd expect. The algorithm sees a burst, not a cadence. Reach quietly drops. Views thin out. And nobody notices because at 25+ pages, you simply can't track the gaps manually.

We were posting stories two minutes apart on some pages. Sometimes one minute. We had no idea.

---

## So I Built Something

I built **StoryDash** — an internal dashboard that gives the whole picture in one screen.

Every page. Every story. How many posted today, when they were last active, and crucially — **whether the spacing between stories is within the safe window**.

![StoryDash overview — all pages, story counts, and status at a glance](/assets/images/storydash-overview.png)

The overview shows all 37 pages at once. 96 stories posted today. 21 pages active. The dashboard immediately surfaces which pages have no stories and which are violating spacing rules — without opening Instagram once.

---

## The Violations View

This was the part that surprised us most.

When I added the spacing check, I expected maybe two or three pages with issues. The violations view told a different story.

![Story spacing violations — pages with consecutive stories posted too close together](/assets/images/storydash-violations.png)

Multiple pages had consecutive stories posted less than a minute apart. Some flagged as critical. This was happening silently, every day, across pages with thousands of followers — and we had zero visibility into it.

---

## Drill Into Any Page

Clicking into a page shows the full story timeline for the day: thumbnails, timestamps, and a clear warning if the gap between stories is too short.

![Per-page detail view with story thumbnails and frequency warning](/assets/images/storydash-page-detail.png)

Here, the page had posted three pairs of stories with under 30 minutes between them. Worst gap: 0 minutes. The dashboard flags the exact violation and the recommended minimum (1 hour between stories) so whoever manages that page knows exactly what to fix.

---

## The Email That Arrives Without Anyone Asking

The dashboard solved the "need to check" problem. But I wanted to remove the need to check the dashboard too.

So I added an hourly automated email. Every hour, the team gets a clean report: how many pages posted, how many haven't, and which ones need attention.

![Automated hourly email report — stories today, pages posted, pages with no stories](/assets/images/storydash-email-report-clean.png)

93 stories tracked. 23 pages posted today. 8 pages with nothing yet — highlighted so they can't be missed.

The information just arrives. No one has to open anything.

---

## How I Built It

All of this was built using **Claude Code**.

I'm not a full-time developer. I manage content operations. But I had a clear problem, knew what the output should look like, and used Claude Code to go from idea to working internal tool — dashboard, spacing logic, automated emails, all of it.

We're in an era where you don't have to wait for a product team to solve your operational problem. If you can describe the problem clearly, you can build the solution.

---

## The Best Problems to Solve

The best problems to solve are the ones you live with every day. Not abstract ones. Not theoretical ones. The ones where you catch yourself doing the same pointless manual task and think, *this shouldn't require a human.*

This was one of them.

If you're managing multiple social accounts and still checking things page by page — there's a better way. Build it. The tools exist. The bar is lower than you think.

---

*Built with Claude Code. Running in production.*
