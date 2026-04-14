---
layout: post
title: "If I Can See It on the Screen, I Can Get It Out"
subtitle: "Chrome extensions became my secret weapon. Vibe coding made them something I build in an afternoon."
date: 2026-04-08
tags: [vibe-coding, chrome-extension, automation, browser-automation, claude-code, cursor, productivity, internal-tools, web-scraping, data-extraction]
description: "How I build custom Chrome extensions using vibe coding tools like Claude Code and Cursor — pulling data from dashboards, automating forms, and replacing manual workflows. No API needed. No coding experience required."
image: /assets/images/chrome-extension-vibe-coding.png
seo_title: "How to Build a Chrome Extension Without Coding (Vibe Coding with Claude Code)"
keywords: [build chrome extension without coding, vibe coding chrome extension, chrome extension no code, extract data from dashboard no API, automate browser tasks, Claude Code chrome extension, Cursor chrome extension]
permalink: /writing/build-chrome-extension-without-coding/
last_modified_at: 2026-04-09
---

There's a dashboard at work that shows exactly what I need.

Numbers, live data, everything. Beautifully laid out.

No export. No API. Nothing. Just a page that shows you the data and expects you to manually copy it like it's 2009.

I used to lose that fight. Copy, paste, format, repeat. Every single morning.

Now I just don't.

---

## The Python thing never really works

First instinct: write a Python script.

Hit the endpoint. Parse the response. Done.

Except internal dashboards don't have public APIs. They load after a login. The data lives behind cookies and session tokens that only exist inside a live browser. So you get creative. Grab the cookies manually, pass them into requests, and it works. Once. Then the session expires and the script breaks. The auth flow changes and it breaks again. A rate limit gets added and now you're debugging a hack at 9am before a meeting.

You spend more time maintaining the workaround than you ever saved building it.

I went through this enough times. It's a dead end.

---

## The thing that actually works

A Chrome extension doesn't fake being a browser. It runs inside one.

Same session. Same cookies. Same page you're already looking at. If the data is on your screen, an extension can read it. No tokens to replicate, no auth to reverse-engineer. You're already logged in. The extension just reaches in and takes what's there.

That's the whole thing. Sounds obvious until it isn't.

---

## This is where vibe coding changed everything

I'll be straight: I had no idea how Chrome extensions worked.

Manifest files, content scripts, service workers. There's a whole structure to it. Enough that I never touched it.

Then I just described what I wanted to Claude Code:

> *"Build me a Chrome extension for this dashboard. There's a table with the class `.lead-metrics`. When I click the extension icon, read every row and copy it to clipboard as CSV."*

Forty minutes later it was running in my browser.

Not a rough draft. A working extension doing exactly that, on a real dashboard, without filing a single ticket.

Forty minutes to build something that saves twenty minutes every morning. Break-even is two days.

---

## What I've actually shipped this way

A metrics extractor that reads numbers off a locked dashboard. One click, data in clipboard, formatted exactly how my spreadsheet expects it.

A cross-tab aggregator. Seven regional tabs, each showing data for one region. I told Cursor:

> *"Open each tab, wait for it to load, grab the number inside `.region-total`, close the tab, then show me everything compiled in one place."*

Seven tabs of mental math became one button.

A form prefiller. Same ten fields, same values, thirty times a day. The extension fills everything predictable and skips the two fields that actually vary. Two minutes per form times thirty forms is an hour back every single day.

A page monitor that checks a supplier site on a schedule, saves the values, and tells me when something changes. No API on their end. Doesn't matter.

None of these needed me to know JavaScript. Every one of them started with a plain description.

---

## The prompt is the skill

This is what people miss about vibe coding.

Claude Code and Cursor aren't magic. They need a clear description. The better you explain the problem, the better the first output. Vague in, broken out.

Three things I always include:

The URL or type of page. The exact element holding the data (right-click anything on the page, hit inspect, find the class name). What I want done with the data after.

That's it. First version gets maybe 80% right. Two or three corrections and it's done. The whole process feels less like coding and more like explaining something to a very capable person who just needs the specifics.

Claude Code is what I use when I want to describe the whole problem at once and get something fast. Cursor is better when I want to see the files, read through what it built, and tweak things myself. Both work. Pick one and just start.

---

## How I think about problems now

Before this, hitting a data wall meant looking for workarounds. Is there a hidden export? Can someone from the data team pull this? Is there a third-party tool that connects?

Now the first question is: can I see it on a screen?

If yes, I can have something built today.

That shift matters more than any specific extension I've made. Problems that used to sit in a backlog somewhere now take an afternoon. Needing an engineer, waiting on a ticket, hoping someone has bandwidth — that's just gone for this type of problem.

Anyone can do this. You don't need to code. You need to know what you want and be specific about it.

The extension does the rest.

---

*Same pattern — [automated the daily OKR lead report](/writing/automate-daily-lead-performance-report/) that sends before anyone asks for it, and built an [Instagram story monitoring dashboard](/writing/monitor-instagram-stories-multiple-accounts/) that catches spacing violations I never knew were happening. Different problems, same approach.*

**More on this:** [What Vibe Coding Means for Non-Developers](/writing/what-is-vibe-coding/) · [Automate a Daily Lead Performance Report](/writing/automate-daily-lead-performance-report/) · [Monitor Instagram Stories Across 25+ Pages](/writing/monitor-instagram-stories-multiple-accounts/)

---

<details markdown="1">
<summary>Common questions</summary>

**Can you build a Chrome extension without knowing how to code?**

Yes. Describe what's on the page, what you want, and what should happen with the data. Claude Code or Cursor handles the manifest, content scripts, everything. Right-click any element, hit Inspect, grab the class name. That's the hardest technical step. First version is maybe 80% right. A couple of corrections and it's done.

**Why does a Chrome extension work when a Python script doesn't?**

Auth. A Python script has to replicate your browser session from outside, grabbing cookies, passing tokens, and it breaks every time something changes. Session expires, auth flow shifts, rate limit gets added. You spend more time maintaining the workaround than you saved building it. A Chrome extension runs inside your existing session. You're already logged in. It just reads what's there.

**How do you pull data from a dashboard with no API?**

Build a Chrome extension. It runs inside your browser session, so it can access anything rendered on the page without replicating auth or managing tokens. Right-click the element holding the data, inspect it, find the class name, and describe it to Claude Code or Cursor. If you can see it on the screen, you can get it out.

**What is vibe coding?**

Describing what you want to an AI tool and iterating on what it builds, without writing code yourself. The term came from Andrej Karpathy. The actual skill isn't coding — it's describing the problem well. The more precise you are about the page, the element, the output you need, the better the first version. Vague in, broken out.

**What is the difference between Claude Code and Cursor for building Chrome extensions?**

Claude Code is what I use when I want to describe the full problem and get something fast. Cursor is better when I want to read through what it built and make my own tweaks. Both work. If you want speed, Claude Code. If you want to understand what was built, Cursor. Either way, just start.

**What's the best first extension to build?**

Something you do manually every single day. Copying numbers off a page, filling the same form, checking the same value. The more repetitive and boring it is, the better the first one to build. The break-even is usually two days.

</details>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you build a Chrome extension without knowing how to code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Describe what's on the page, what you want, and what should happen with the data. Claude Code or Cursor handles the manifest, content scripts, everything. Right-click any element, hit Inspect, grab the class name. That's the hardest technical step. First version is maybe 80% right. A couple of corrections and it's done."
      }
    },
    {
      "@type": "Question",
      "name": "Why does a Chrome extension work when a Python script doesn't?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auth. A Python script has to replicate your browser session from outside, grabbing cookies, passing tokens, and it breaks every time something changes. Session expires, auth flow shifts, rate limit gets added. You spend more time maintaining the workaround than you saved building it. A Chrome extension runs inside your existing session. You're already logged in. It just reads what's there."
      }
    },
    {
      "@type": "Question",
      "name": "How do you pull data from a dashboard with no API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build a Chrome extension. It runs inside your browser session, so it can access anything rendered on the page without replicating auth or managing tokens. Right-click the element holding the data, inspect it, find the class name, and describe it to Claude Code or Cursor. If you can see it on the screen, you can get it out."
      }
    },
    {
      "@type": "Question",
      "name": "What is vibe coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Describing what you want to an AI tool and iterating on what it builds, without writing code yourself. The term came from Andrej Karpathy. The actual skill isn't coding — it's describing the problem well. The more precise you are about the page, the element, the output you need, the better the first version. Vague in, broken out."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Claude Code and Cursor for building Chrome extensions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claude Code is what I use when I want to describe the full problem and get something fast. Cursor is better when I want to read through what it built and make my own tweaks. Both work. If you want speed, Claude Code. If you want to understand what was built, Cursor. Either way, just start."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best first Chrome extension to build with vibe coding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Something you do manually every single day. Copying numbers off a page, filling the same form, checking the same value. The more repetitive and boring it is, the better the first one to build. The break-even is usually two days."
      }
    }
  ]
}
</script>
