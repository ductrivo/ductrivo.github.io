# Project Overview: Duc-Tri VO Personal Site

This is a Jekyll-based static website serving as the personal portfolio, blog, and e-learning platform for **Duc-Tri VO**. It showcases expertise in automation, control systems, robotics, and industrial informatics.

## Architecture & Technologies
- **Core:** [Jekyll](https://jekyllrb.com/) (Static Site Generator)
- **Theme:** Modified [Mundana Jekyll Theme](https://www.wowthemes.net/mundana-jekyll-theme/)
- **Content:** Markdown-driven blog posts (`_posts`) and structured courses (`_courses`)
- **Data-Driven:** Resume and project details are managed via YAML files in `_data/`
- **Research:** Academic publications managed with `jekyll-scholar` and BibTeX
- **Deployment:** Docker-ready and optimized for GitHub Pages/Linux environments

## Key Directories
- `_posts/`: Technical blog posts and insights
- `_courses/`: Educational content organized by topic (e.g., Robotics, Control Systems)
- `_data/`: YAML files for site content (Experience, Education, Projects, i18n)
- `_includes/` & `_layouts/`: Liquid templates for site components and page structures
- `assets/`: CSS, JS, images, and PDF documents (CVs, publications)

## Building and Running

### Prerequisites
- Ruby and Bundler
- (Optional) Docker and Docker Compose

### Local Development
The project includes a `Makefile` and `run.sh` for easy management:

- **Install Dependencies:**
  ```bash
  make install      # Installs Ruby, Jekyll, and system dependencies (Debian/Ubuntu)
  make install-gems # Runs bundle install
  ```

- **Run Development Server:**
  ```bash
  make serve        # Runs Jekyll with livereload at http://localhost:4000
  ```

- **Using Docker:**
  ```bash
  docker-compose up
  ```

## Development Conventions

### Content Creation
- **Posts:** Create Markdown files in `_posts/` with the format `YYYY-MM-DD-title.md`. Use `layout: post` or `layout: post-sidebar`.
- **Lessons:** Add to `_courses/<course-name>/`. Front matter must include `course`, `lesson_order`, and `layout: lesson`.
- **Data Updates:** Modify YAML files in `_data/` to update the resume, certifications, or projects.

### Internationalization (i18n)
- Language strings are stored in `_data/i18n/` (en.yml, fr.yml, vi.yml).

### Bibliography
- Academic references should be added to `_bibliography/references.bib`.
