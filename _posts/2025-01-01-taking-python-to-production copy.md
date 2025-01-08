---
layout: post-sidebar
title:  "Taking Python to Production: A Professional Onboarding Guide"
author: ductri
categories: [Course Notes, Python]
tags: [featured, python]
image: 'assets/images/taking-python-to-production.jpg'
description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: true
---

## Learning Objectives
{: .no_toc}
- Set up a professional Python development environment - `Visual Studio Code`, `pyenv`, `git`, `autocompletion`
- Make the terminal more intuitive with ZSH and plugins
- Setup automated code quality checks (testing, linting, documentation, type checking, etc.)
- Learn the professional git workflow with GitHub and CI/CD with GitHub Actions
- Version and package Python software and publish it for the community

## Semantic Versioning (`semver`)
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
## Clean Code
### What is Clean Code?

Clean code is crucial for maintaining and scaling software projects. It should be:

- Easy to maintain and change
- Understandable by others
- Secure
- Correct aka "it works"
- Relevant to the project needs, e.g. no irrelevant features that bloat the codebase

> **Most importantly: Clean code is code that is easy to change!**

### PEP 8 and Google Python Style Guides
`Idiomatic code` is code that adheres to the style conventions common to the language. For `Python` specifically, the [PEP 8](https://peps.python.org/pep-0008/) and [Google Python Style Guides](https://google.github.io/styleguide/pyguide.html) set forth a set of opinions that the majority of Python code now follows.

### Code Principles
There are numerous coding principles you can follow to write better code, each having their own pros/cons and tradeoffs. This article covers four of the more popular principles: DRY, KISS, SoC, and SOLID:

- DRY (Don't repeat yourself)
- KISS (Keep it simple, stupid)
- SoC (Separation of concerns)
- SOLID:
    - The **S**ingle-responsibility principle: "A class should have one, and only one, reason to change."
    - The **O**pen–closed principle: "Entities should be open for extension, but closed for modification."
    - The **L**iskov substitution principle: "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."
    - The **I**nterface segregation principle: "A client should not be forced to implement an interface that it doesn’t use."
    - The **D**ependency inversion principle: "Depend upon abstractions, not concretions."

[**Source:** Clean Code in Python](https://testdriven.io/blog/clean-code-python/)

### Code Review and Pull Request Best Practices

- Code review allows your organization to only accept code changes that receive a consensus of approval, with the goal of maintaining quality code, otherwise known as "clean code"

- Components of Code Quality
    - Does it work?
    - Can I understand it?
    - Is it safe?
    - Do we even want this?

- Keep pull requests very small and very focused, with few logical decisions
    - This makes it easier for the reviewer to answer the four questions of Code Quality listed above
    - Reduces potential merge conflicts
    - Allows collaborators to adapt to your changes

- [**Example** of a pull request that’s too large](https://github.com/rootski-io/rootski/pull/56)

- Make it as easy as possible for collaborators to review your code quickly
    - Answer the four questions of Code Quality clearly
        - Does the code work?
        - Is the code clean?
        - Is the code safe?
        - Is the code desired?
        
- Machine time is less valuable than human time
    - Use automation to provide evidence to your answers for the above questions as much as possible
    - Further details on automation will be in the videos that follow this one
    
- Alternatives to pull requests
    - Pair programming - two developers working together to write code
    - Mob programming - three or more developers working together to write code
    - Just merge your code directly into the main branch - works best in high trust teams