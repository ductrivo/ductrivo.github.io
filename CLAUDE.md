# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
make serve        # Start dev server at http://localhost:4000 (binds 0.0.0.0)
make install      # Install system deps, Ruby, Jekyll, Bundler
make install-gems # Run bundle install only
make help         # List all available tasks
```

All commands delegate to `run.sh`. There is no Node/npm setup — this is a pure Ruby/Jekyll project.

## Architecture

**Stack**: Jekyll static site using the [Mundana theme](https://github.com/wowthemesnet/mundana-theme-jekyll) (Bootstrap 4). Deployed to GitHub Pages at `expred.co`.

**Key plugins**: `jekyll-feed`, `jekyll-sitemap`, `jekyll-paginate`, `jekyll-seo-tag`, `jekyll-toc`, `jekyll-scholar` (bibliography).

**Markdown**: Kramdown + Rouge with line numbers. LaTeX math via MathJax. Excerpt separator: `<!-- excerpt -->`.

### Content Types

| Type | Location | Layout | Notes |
|------|----------|---------|-------|
| Blog posts | `_posts/YYYY-MM-DD-slug.md` | `post` or `post-sidebar` | Categories: Robotics, Control System, Programming |
| Static pages | `_pages/` | `page` | Auto-assigned via `_config.yml` defaults |
| Course lessons | `_courses/{course-id}/{slug}.md` | `lesson` | Custom collection, permalink `/courses/:path/` |
| Resume | `_pages/resume.html` | `resume-layout` | Data pulled from YAML files in `_data/` |

### Courses Collection

Courses are defined in two places:
- **`_data/courses.yml`** — course/module/lesson metadata (title, duration, order, flags like `has_quiz`)
- **`_courses/{course-id}/`** — actual lesson markdown files

Current courses: `robotics/`, `control-systems/`. Lesson progress is tracked client-side via `localStorage` (`assets/js/progress.js`).

### Resume / Portfolio Data

All resume content is stored as YAML in `_data/`: `Skills.yml`, `Experience.yml`, `Education.yml`, `Projects.yml`, `Publications.yml`, `Awards.yml`, `Languages.yml`. The `resume-layout.html` template renders these.

### Layouts & Includes

- `_layouts/default.html` — base shell (Bootstrap 4, jQuery, MathJax, GTM analytics, sticky navbar)
- `_layouts/lesson.html` — course lesson with breadcrumb, sidebar nav, mark-complete button, prev/next
- `_layouts/course.html` — course overview with module/lesson listing and progress bars
- `_includes/lesson-sidebar.html` — lesson nav sidebar (reads `_data/courses.yml`)
- `_includes/menu-header.html` — top navbar items (Tutorials dropdown, Categories dropdown)
- `_includes/search-lunr.html` — client-side full-text search

### Front Matter Fields (Posts)

```yaml
layout: post           # or post-sidebar
title: "..."
author: sal            # matches author key in _config.yml
categories: [Robotics]
tags: [featured]       # "featured" pins to homepage, "sticky" pins to top
image: assets/images/foo.jpg
intro: "Short summary shown in listings"
```

### Front Matter Fields (Lessons)

```yaml
layout: lesson
title: "..."
course: robotics       # matches course id in _data/courses.yml
lesson_order: 1
duration_min: 30
has_quiz: false
has_interactive: false
```
