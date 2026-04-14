---
layout: post
title: "Every Problem I Hit Now Has a Technical Solution"
subtitle: "What vibe coding means when you run operations, not engineering — and why that distinction stopped mattering."
date: 2026-04-14
last_modified_at: 2026-04-14
tags: [vibe-coding, automation, claude-code, internal-tools, productivity, social-media, operations, no-code]
description: "How I went from manually copying Google Sheets data in 2022 to shipping production tools with Claude Code. What vibe coding actually is for someone who runs operations, not engineering."
seo_title: "What is Vibe Coding? A Non-Developer's Honest Answer"
keywords: [vibe coding, what is vibe coding, vibe coding for non-developers, vibe coding examples, Claude Code vibe coding, build tools without coding, vibe coding meaning]
permalink: /writing/what-is-vibe-coding/
---

End of 2022.

My team was spending part of every day pulling numbers from multiple Google Sheets into a single sheet. That sheet went to the sales team, who uploaded it to the CRM.

Every. Single. Day.

Nobody liked it. Nobody questioned it. It was just the job.

---

## The first thing that changed

ChatGPT launched. I started using it for content work — drafts, rewrites, captions. The obvious stuff.

Then one afternoon I described the Sheets problem to it. Not asking for a solution, just thinking out loud.

It gave me a script.

I didn't understand the script. I didn't need to. I copied it, ran it, and it worked. The thing that was eating 30 minutes every day took about 4 seconds.

I sat with that for a while.

---

## What I actually learned

It wasn't that AI was magic. It was that I'd been wrong about what required a developer.

I'd always sorted problems into two buckets: things I could solve myself, and things that needed engineering. The second bucket was basically everything technical. Scripts, bots, dashboards, any kind of automation. That whole bucket sat in a backlog. Sometimes it got prioritised. Usually it didn't.

What I learned that afternoon: the bucket was wrong. I'd been filtering out entire categories of solutions before I'd even looked for them.

---

## What came next

I started describing problems instead of accepting them.

A Slack bot that pulled stats and posted them to the channel every morning. A script that checked a supplier page and sent me a message when the price changed. Small things, then less small things.

Some broke. Some needed three rounds of back and forth to get right. None of that mattered much. The cost of trying had dropped to almost nothing.

By the time I found Claude Code, I'd already changed how I thought about problems. Claude Code just made the execution faster and more reliable. Describe the problem clearly, see what gets built, fix what's wrong, ship it. The whole thing — from idea to something running in production — started taking hours instead of months.

---

## The three things I've shipped since

[StoryDash](/projects/storydash/) — a dashboard that monitors story activity across 25+ Instagram pages, flags spacing violations, and sends hourly email reports to the team. I was spending 30 minutes every morning manually checking pages. Now I don't open Instagram for this at all.

The [daily OKR lead report](/writing/automate-daily-lead-performance-report/) — an email that lands before the first meeting, with every lead category ranked by urgency and projected month-end finish. The meeting went from 10 minutes of running numbers to actually making decisions.

[Chrome extensions](/writing/build-chrome-extension-without-coding/) that pull data from dashboards with no export and no API. One click, data in clipboard. No Python workaround, no session tokens to maintain.

None of these went through an engineering backlog. None needed a ticket. I described what I needed and iterated until it worked.

---

## What vibe coding means to me

Andrej Karpathy coined the term. Developers use it to describe writing code mostly with AI, barely touching it themselves.

That's not quite what it means for me.

For me it's the thing that happened when I stopped sorting problems into "I can solve this" and "this needs a developer." It's the realisation that the gap between seeing a problem and having something that solves it is now small enough that it's worth trying every single time.

I'm not a developer. I run social media operations for a team spread across five languages. I know what a problem costs in hours and what it costs to just live with it.

What changed is I stopped living with things.

Every manual task I see now, I think: how long would it take to build something that just does this? The answer is usually a few hours. The break-even is usually a few days.

That's the whole thing.

---

*These aren't just ideas. [StoryDash](/projects/storydash/) is running in production, the [OKR report](/writing/automate-daily-lead-performance-report/) lands every morning, and the [Chrome extensions](/writing/build-chrome-extension-without-coding/) are in the browser right now.*

---

<details markdown="1">
<summary>Common questions</summary>

**What is vibe coding?**
Describing what you want to an AI tool and iterating on what it builds, without writing code yourself. The term came from Andrej Karpathy. The actual skill isn't coding. It's knowing what you want and being specific about it.

**Can non-developers actually use vibe coding?**
That's mostly what I am. I manage operations, not engineering. Vibe coding isn't about writing less code — it's about dropping the assumption that you needed to write it in the first place. Describe the problem clearly. Iterate on what gets built. Ship it.

**What tools do you use for vibe coding?**
Claude Code when I want to describe the whole problem and get something fast. Cursor when I want to read through what it built and make my own tweaks. Both work. The tool matters less than how clearly you describe the problem.

**How do you start with vibe coding if you have no technical background?**
Pick one thing you do manually every single day. Something boring and repetitive. Describe it to Claude Code or Cursor — the data you're working with, what you do to it, what you want at the end. See what gets built. Fix what's wrong. That first working thing changes how you see every problem after it.

**What's the difference between vibe coding and no-code tools?**
No-code tools give you templates for common problems. Vibe coding builds exactly what you need for your specific problem, even if nothing like it exists. The ceiling is completely different. If you can describe it, you can build it.

</details>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is vibe coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Describing what you want to an AI tool and iterating on what it builds, without writing code yourself. The term came from Andrej Karpathy. The actual skill isn't coding. It's knowing what you want and being specific about it."
      }
    },
    {
      "@type": "Question",
      "name": "Can non-developers actually use vibe coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "That's mostly what I am. I manage operations, not engineering. Vibe coding isn't about writing less code. It's about dropping the assumption that you needed to write it in the first place. Describe the problem clearly. Iterate on what gets built. Ship it."
      }
    },
    {
      "@type": "Question",
      "name": "What tools do you use for vibe coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code when I want to describe the whole problem and get something fast. Cursor when I want to read through what it built and make my own tweaks. Both work. The tool matters less than how clearly you describe the problem."
      }
    },
    {
      "@type": "Question",
      "name": "How do you start with vibe coding if you have no technical background?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pick one thing you do manually every single day. Something boring and repetitive. Describe it to Claude Code or Cursor — the data you're working with, what you do to it, what you want at the end. See what gets built. Fix what's wrong. That first working thing changes how you see every problem after it."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between vibe coding and no-code tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No-code tools give you templates for common problems. Vibe coding builds exactly what you need for your specific problem, even if nothing like it exists. The ceiling is completely different. If you can describe it, you can build it."
      }
    }
  ]
}
</script>
