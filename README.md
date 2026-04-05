# jithinraaj.in

Personal website of Jithin Raaj — built with Jekyll, hosted on GitHub Pages.

## Stack

- [Jekyll](https://jekyllrb.com/) 4.3
- GitHub Actions for CI/CD
- GitHub Pages for hosting
- Custom domain: [jithinraaj.in](https://jithinraaj.in)

## Structure

```
├── _layouts/       # Page templates (default, post, page, project)
├── _includes/      # Header and footer partials
├── _posts/         # Blog posts (YYYY-MM-DD-title.md)
├── _projects/      # Project pages
├── assets/
│   ├── css/        # Styles
│   ├── js/         # Theme toggle
│   └── images/     # Post images
├── index.html      # Home
├── writing.html    # Blog list
├── projects.html   # Projects list
├── about.md
└── now.md
```

## Local development

Requires Ruby 3.2+. If you don't have it:

```bash
brew install rbenv
rbenv install 3.2.0
rbenv global 3.2.0
```

Then:

```bash
bundle install
bundle exec jekyll serve
```

Site runs at `http://localhost:4000`.

## Writing a new post

Create a file in `_posts/` with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-04-05
tags: [tag1, tag2]
description: "One line description for SEO."
---

Post content here.
```

Push to `main` and GitHub Actions builds and deploys automatically.

## Adding a project

Create a file in `_projects/`:

```markdown
---
title: Project Name
description: One line description shown on the projects list.
status: live
---

Project details here.
```

## Deployment

Every push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds the Jekyll site and deploys to GitHub Pages.
