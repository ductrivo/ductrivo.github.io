---
layout: post
title:  "Taking Python to Production: A Professional Onboarding Guide"
author: ductri
categories: [Course Notes, Python]
tags: [featured, python]
image: 'assets/images/taking-python-to-production.jpg'
description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: true
---

# Learning Objectives:
{: .no_toc}
- Set up a professional Python development environment - `Visual Studio Code`, `pyenv`, `git`, `autocompletion`
- Make the terminal more intuitive with ZSH and plugins
- Setup automated code quality checks (testing, linting, documentation, type checking, etc.)
- Learn the professional git workflow with GitHub and CI/CD with GitHub Actions
- Version and package Python software and publish it for the community

# 1. Semantic versioning (`semver`)
[**Summary:**](https://semver.org/) Given a version number `Major.Minor.Patch`, increment the:
- `Major` version when you make incompatible API changes
- `Minor` version when you add functionality in a backward compatible manner
- `Patch` version when you make backward compatible bug fixes
Additional labels for pre-release and build metadata are available as extensions to the `Major.Minor.Patch` format.

Example:
```python
# 1.0.0
def add_numbers(a, b, c):
    return a + b + c
    
# 1.0.1
def add_number(a, b, c):
    # faster and more secure :)
    ...
    
# 2.0.0
def add_numbers(a, b, c, d):
    return a + b + c + d
    
# but the version could have been 1.1.0 if the changes were non-breaking
def add_numbers(a, b, c, d = 0):
		return a + b + c + d

# pip install cool_library
add_numbers(1, 2, 3, 0)
```

