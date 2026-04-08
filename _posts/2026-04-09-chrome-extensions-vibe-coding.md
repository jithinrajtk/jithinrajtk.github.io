---
layout: post
title: "The Data Was Right There on the Screen. Getting to It Was the Problem."
subtitle: "How vibe coding turned Chrome extensions into my go-to tool for pulling data from any dashboard, website, or internal system — no API required."
date: 2026-04-09
tags: [vibe-coding, chrome-extension, automation, browser-automation, claude-code, productivity, internal-tools, web-scraping, data-extraction, no-code-automation]
description: "How I build custom Chrome extensions with vibe coding to extract data from dashboards and websites that have no API. From Python scripts with session hacks to browser extensions that just work — and why this is now my default tool for any data problem."
image: /assets/images/chrome-extension-vibe-coding.png
seo_title: "Vibe Coding Chrome Extensions: How I Pull Data from Any Dashboard Without an API"
last_modified_at: 2026-04-09
---

The data was sitting right there.

On the screen. In a table. Formatted beautifully. Updated in real time.

And I had absolutely no way to get it out.

No API. No export button. No CSV download. Just a dashboard someone built that shows you the numbers but doesn't trust you enough to let you do anything with them.

This is a situation I kept running into. Different dashboards, different tools, different teams — same wall. The data exists. The data is visible. The data is useless unless someone copies it manually into a spreadsheet every time anyone needs it.

Manual data entry in 2026 is just a system design failure with extra steps.

---

## The Python approach, and where it breaks

The first instinct is always Python.

Write a script. Hit the endpoint. Parse the response. Done.

Except most internal dashboards aren't public APIs. They're authenticated sessions. The dashboard loads after a login. The data comes from internal endpoints that require cookies, session tokens, headers that only exist inside a live browser session. You can't just point a script at them.

So you try to replicate the session. Grab the cookies from your browser. Pass them into the request. It works — once. Then the session expires and the script breaks. Then the auth flow changes and the script breaks again. Then someone adds a rate limit and the script breaks for a third time.

You spend more time maintaining the hack than you ever saved by building it.

I went through this cycle enough times to know: if the data lives behind a login and only shows up in a browser, the right tool is a browser tool.

---

## Chrome extensions changed how I think about data

A Chrome extension isn't a script that tries to pretend it's a browser. It runs *inside* the browser. It has access to the current page's DOM, the active session, the same cookies the dashboard uses, the same context the user has.

If you can see the data on the screen, a Chrome extension can read it.

That's a fundamentally different proposition from fighting with session tokens. The authentication is already handled — the user is logged in. The data is already rendered — the browser has it. The extension just needs to reach out and grab it.

I built my first one out of necessity. A dashboard that tracked metrics I needed daily, no export, no API, and a teammate spending twenty minutes every morning copying numbers into a sheet. The extension reads the page, extracts the numbers, and formats them exactly the way the sheet expects. One click. Twenty minutes became five seconds.

Then I built another one. And another.

Now it's the first thing I reach for when I hit a data wall.

---

## Why this only became easy with vibe coding

I want to be honest about something: I didn't know how to build Chrome extensions before this.

Chrome extensions have a specific structure — manifest files, content scripts, background service workers, permissions declarations. The architecture isn't complicated once you know it, but there's enough setup that the learning curve used to be a real barrier for someone who isn't an engineer.

Vibe coding removed that barrier completely.

The way I work now: I open Claude Code, describe the problem in plain language, and let it generate the extension. Then I describe what's wrong or what's missing, and iterate. I'm not writing the code. I'm describing what I need and reviewing what comes out.

The extension for the dashboard problem took about forty minutes from "I have this problem" to "this is running in my browser." Including the time I spent explaining the page structure and fixing a selector that was grabbing the wrong element.

Forty minutes. For a tool that will save twenty minutes every single morning, indefinitely.

The math on that runs out in two days.

---

## What I've actually built

Here's the range, because I think it helps to see how far this can go:

**A metrics extractor** — reads a performance dashboard, pulls the numbers from specific table cells, formats them into a structured JSON object I can paste directly into a report. The dashboard has no export. The extension doesn't care.

**A session-authenticated data puller** — some internal tools load data through authenticated API calls. The extension intercepts those calls (using the browser's existing session), grabs the response, and saves it locally. No credential handling in my code. The browser handles auth. I handle what to do with the data.

**A cross-page aggregator** — one dashboard, multiple tabs, each tab showing data for one region. The extension opens each tab, waits for it to load, reads the relevant numbers, closes the tab, and compiles a summary. What used to be seven tabs open simultaneously and a lot of mental arithmetic is now one button.

**A form prefiller** — a tool we use internally has a multi-step form with the same ten fields filled the same way 90% of the time. The extension watches for the form, fills it automatically, and leaves the fields that actually vary. Saves maybe two minutes per submission. At thirty submissions a day, that's an hour.

**A price and availability monitor** — reads a supplier's website on a schedule, compares current values against a stored baseline, and flags anything that changed. No API. Just a page that loads and renders data the same way every time.

None of these required knowing how Chrome extensions work before I started. Every one of them was built by describing the problem and iterating on what Claude Code produced.

---

## The pattern behind all of them

Every extension I've built follows roughly the same logic:

**1. Identify what's on the page**
Open the page. Right-click the element with the data you want. Inspect element. Find the CSS class or ID that identifies it. That's your selector. This is the only part that requires you to look at code — and it's just reading, not writing.

**2. Describe the extraction logic**
What do you want to pull? A single number? A full table? Specific rows matching a condition? Write this in plain language. Claude Code translates it into a content script.

**3. Decide what happens with the data**
Copy to clipboard? Download as CSV? Send to a webhook? Store locally and compare on next visit? This is the output, and it's always simpler than the extraction.

**4. Handle the auth by not handling it**
Don't build authentication into your extension. Don't manage session tokens. Just require the user to be logged in before running the extension. The browser session is already there — use it.

**5. Iterate on what breaks**
The first version will get some selectors wrong. The page structure will be slightly different from what you described. Run it, see what's off, describe the fix. Three or four iterations and it's working.

That's the whole process. No manifest.json knowledge required. No JavaScript expertise required. Just a clear description of what you need and patience for a few iterations.

---

## The shift in how I think about problems

Before Chrome extensions were easy to build, I'd hit a data wall and start looking for a workaround: is there an export somewhere? Can someone from the data team pull this? Is there a third-party tool that integrates with this?

Now the first question is: can I see this data on a screen?

If yes, I can build a tool to extract it. Probably today. Probably in less than an hour.

That's a meaningful shift. Problems that used to mean "we need engineering help" or "we need to wait for a data request" now mean "let me build something quick." The dependency chain shortened by three or four steps.

Not every problem needs a Chrome extension. But for any situation where data exists in a browser, is trapped behind a login, and needs to be moved somewhere else with any regularity — an extension is almost always the fastest path.

Vibe coding made the fastest path accessible to people who don't write code for a living.

That's the part that still surprises me a little.

---

## Questions people ask about this

**Can you build a Chrome extension without knowing how to code?**
Yes — with vibe coding tools like Claude Code. You describe the problem in plain language: what page you're on, what data you want to extract, what you want to happen with it. The tool generates the extension code. You iterate on what doesn't work. The architecture knowledge (manifest structure, content scripts, permissions) is handled for you. What you bring is a clear description of the problem and the ability to identify which part of the output isn't right yet.

**How do you pull data from a dashboard that has no API?**
A Chrome extension that runs inside the browser and reads the rendered page directly. Because the extension runs in the same context as the page — with the same active session and cookies — it can access data that a script running outside the browser can't reach. You identify the HTML elements containing the data, write a content script that extracts them, and decide what to do with the output (copy to clipboard, download as CSV, send to a webhook, etc.).

**What is vibe coding and how does it apply to Chrome extensions?**
Vibe coding is building software by describing what you want in plain language to an AI coding tool, then iterating on what it produces — without writing code yourself. For Chrome extensions specifically: you describe the page, the data you want, and the output format. The AI generates the manifest, content scripts, and background logic. You run it, describe what's wrong, and iterate. Most simple extensions take under an hour to go from problem to working tool.

**What can a custom Chrome extension do that a Python script can't?**
The main difference is authentication context. A Python script running outside the browser has to replicate the browser session to access protected pages — which means handling cookies, session tokens, and headers that expire and change. A Chrome extension runs inside the browser where the user is already logged in. It inherits the active session automatically. For any data that lives behind a login, this removes the hardest part of the problem.

**How do you build a Chrome extension to scrape data from a website?**
The core is a content script — a JavaScript file that runs in the context of the target page and has access to its DOM. You identify the selectors for the elements containing your data (right-click > inspect in Chrome DevTools), then write logic to extract those values. Wrap it in a manifest.json with the right permissions and you have an extension. With vibe coding, you describe the page structure and the data you want, and the tool generates the content script for you.

**Is it legal to scrape data from websites with a Chrome extension?**
For internal dashboards and tools your organisation uses, where you have legitimate access, a Chrome extension is just automating what you'd do manually — reading data you're already authorised to see. For public websites, the legality varies: most platforms prohibit automated data collection in their terms of service, and some jurisdictions have laws that apply. The use cases I build for are internal tools and systems I'm authorised to access.

**What's the best use case for a custom Chrome extension at work?**
Any recurring task where you're manually reading data off a screen and typing or copying it somewhere else. Form filling that follows a predictable pattern. Aggregating data across multiple tabs or pages. Monitoring a page for changes. Extracting structured data from a tool that has no export. The common thread: data is visible on screen, you need it somewhere else, and you're doing this repeatedly. That's the pattern a Chrome extension solves.

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
        "text": "Yes — with vibe coding tools like Claude Code. You describe the problem in plain language: what page you're on, what data you want to extract, what you want to happen with it. The tool generates the extension code. You iterate on what doesn't work. The architecture knowledge is handled for you."
      }
    },
    {
      "@type": "Question",
      "name": "How do you pull data from a dashboard that has no API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Chrome extension that runs inside the browser and reads the rendered page directly. Because the extension runs in the same context as the page — with the same active session and cookies — it can access data that a script running outside the browser can't reach."
      }
    },
    {
      "@type": "Question",
      "name": "What is vibe coding and how does it apply to Chrome extensions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vibe coding is building software by describing what you want in plain language to an AI coding tool, then iterating on what it produces — without writing code yourself. For Chrome extensions: you describe the page, the data you want, and the output format. The AI generates the manifest, content scripts, and background logic. Most simple extensions take under an hour to go from problem to working tool."
      }
    },
    {
      "@type": "Question",
      "name": "What can a custom Chrome extension do that a Python script can't?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main difference is authentication context. A Python script has to replicate the browser session to access protected pages — handling cookies, session tokens, and headers that expire and change. A Chrome extension runs inside the browser where the user is already logged in. It inherits the active session automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do you build a Chrome extension to scrape data from a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The core is a content script — JavaScript that runs in the context of the target page and has access to its DOM. You identify the selectors for the elements containing your data (right-click > inspect in Chrome DevTools), then write logic to extract those values. With vibe coding, you describe the page structure and the data you want, and the AI generates the content script."
      }
    },
    {
      "@type": "Question",
      "name": "What's the best use case for a custom Chrome extension at work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Any recurring task where you're manually reading data off a screen and copying it somewhere else. Form filling that follows a predictable pattern. Aggregating data across multiple tabs. Monitoring a page for changes. Extracting structured data from a tool that has no export. The common thread: data is visible on screen, you need it somewhere else, and you're doing this repeatedly."
      }
    }
  ]
}
</script>
