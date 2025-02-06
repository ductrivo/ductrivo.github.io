---
layout: post-sidebar
title:  "Python Clean Code, Style Guides, Formatters, and Linters"
author: ductri
categories: [Programming]
tags: [featured, python, sticky]
image: assets/images/python-clean-code-style-guides-formatters-linters.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: False
side_toc: True
---

## What is Clean Code?

Clean code is crucial for maintaining and scaling software projects. It should be:

- Easy to maintain and change
- Understandable by others
- Secure
- Correct aka "it works"
- Relevant to the project needs, e.g. no irrelevant features that bloat the codebase

> **Most importantly: Clean code is code that is easy to change!**

## PEP 8 and Google Python Style Guides
`Idiomatic code` is code that adheres to the style conventions common to the language. For `Python` specifically, the [PEP 8](https://peps.python.org/pep-0008/) and [Google Python Style Guides](https://google.github.io/styleguide/pyguide.html) set forth a set of opinions that the majority of Python code now follows.

## Code Principles
There are numerous coding principles you can follow to write better code, each having their own pros/cons and tradeoffs. This article covers four of the more popular principles: DRY, KISS, SoC, and SOLID:

- **DRY** (Don't repeat yourself)
- **KISS** (Keep it simple, stupid)
- **SoC** (Separation of concerns)
- **SOLID:**
    - The **S**ingle-responsibility principle: "A class should have one, and only one, reason to change."
    - The **O**pen–closed principle: "Entities should be open for extension, but closed for modification."
    - The **L**iskov substitution principle: "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."
    - The **I**nterface segregation principle: "A client should not be forced to implement an interface that it doesn’t use."
    - The **D**ependency inversion principle: "Depend upon abstractions, not concretions."

[**Source:** Clean Code in Python](https://testdriven.io/blog/clean-code-python/)

## A Foolish Consistency is the Hobgoblin of Little Minds
- One of Guido’s key insights is that code is read much more often than it is written. The guidelines provided here are intended to improve the readability of code and make it consistent across the wide spectrum of Python code. As [PEP 20](https://peps.python.org/pep-0020/) says, `Readability counts`.
- A style guide is about consistency. Consistency with this style guide is important. Consistency within a project is more important. Consistency within one module or function is the most important.
- However, know when to be inconsistent – sometimes style guide recommendations just aren’t applicable. When in doubt, use your best judgment. Look at other examples and decide what looks best. And don’t hesitate to ask!

> In particular: do not break backwards compatibility just to comply with this PEP!

Some other good reasons to ignore a particular guideline:

1. When applying the guideline would make the code less readable, even for someone who is used to reading code that follows this PEP.
2. To be consistent with surrounding code that also breaks it (maybe for historic reasons) – although this is also an opportunity to clean up someone else’s mess (in true XP style).
3. Because the code in question predates the introduction of the guideline and there is no other reason to be modifying that code.
4. When the code needs to remain compatible with older versions of Python that don’t support the feature recommended by the style guide.

[**Source:** PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/#a-foolish-consistency-is-the-hobgoblin-of-little-minds)

## Code Review and Pull Request Best Practices

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

## Auto-formatters

- Auto-formatters readjust spacing and enforce conventions in your code automatically
- Autoformatting creates a consistent code style within a team, as long as all team members are using the same formatter and settings
- `Black` is one of the most popular auto-formatters in `Python`. Other options include `autopep8` and `yapf`

## PyLint

- Linters
    - Perform static analysis of your code; they don’t run the code, but they do:
        - Scan it for errors
        - Enforce code standards
        - Look for code smells
        - Make suggestions on how the code could be refactored
    - Pylint is an example of a linter for Python
- Pylint is commonly used in Continuous Integration to automatically catch problematic code during Pull Requests.

**Notes:**
- Uncompromising, dogmatic adherence to any rule, including linting rules, can occasionally be harmful; sometimes you may have a good reason to disregard a linting rule
- Pylint error messages can be disabled for a specific file using the name of the rule or its ID - see resources below for an example
    - Disabling rules while in the terminal: `pylint --disable=<list-of-rules> <file-name>`
    - Disabling rules in a given Python file via comment: `# pylint: disable=rule-name`
    - It’s recommended not to use the rule ID, but the rule name, to make it easily readable
- Create a pylint config file in the terminal: `pylint --generate-rcfile > .pylintrc`

## Flake8
- `Darglint` is a linter and `flake8` plugin that lints arguments inside docstrings, ensuring they match the actual code implementation.
- Install `Darglint` by running the command `pip install darglint` in the same virtual environment as `flake8`.
- Most `flake8` extensions can be installed in a similar way to `Darglint` - check the list of `flake8` extensions in the resources below to find extensions that interest you.
- [Awesome Flake8 Extensions](https://github.com/DmytroLitvinov/awesome-flake8-extensions)

## Code metrics

- Cyclomatic Complexity (CC) refers to the number of decisions in the code, or the number of branching paths it has
- `Radon` is a popular CC analysis tool and can be installed with `pip install radon`
    - Calculate the CC of the functions in a given file by running this terminal command: `radon cc  file_name.py -s`
- Other code complexity analysis tools in Python include `mccabe` and `xenon`, the latter of which is a thin wrapper around `radon`
- Installing `flake8` and `radon` in the same virtual environment enables radon as a `flake8` extension, allowing syntax highlighting when the Cyclomatic Complexity is too high
    - Add this to your .flake8 config file to set the max CC score you want your code to have at 10: `radon-max-cc = 10`

## Darker: incrementally lint legacy projects

- Linting makes code more readable, but if you have a large, pre-existing codebase, enforcing 100% linting compliance all at once may be prohibitively time-consuming.
- `darker` is a Python-based CLI tool that allows you to run linting tools like `flake8`, `pylint`, `ruff`, etc. *only* on lines of code that have changed in your repository. It does this by looking at the `git --diff` between two commits in your repository.
- So in a Pull Request workflow, you could use `darker` to only fail `pylint` or `ruff` for errors discovered in the lines modified between the latest commit in your feature branch and the latest commit in the main/master/trunk branch.
- Similar tools exist to achieve this with test coverage enforcement as well. But we have not talked about testing up to this point, so if this comment does not make sense, it will later.

## Ruff: the last Python linter ever?

- Ruff is a Python linter implemented in Rust, known for its speed and performance.
- Ruff aims to gather multiple linting and other static analysis tools into one unified tool, e.g. `pylint`, `flake8`, `autoflake`, `isort`, etc.
- `ruff` reimplements all of these static analysis tools in `rust` from scratch!
- Ruff can automatically fix certain code issues with `ruff check --fix ./`
- Ruff has a VS Code extension and follows the language server protocol.
- Ruff configuration can be done through files like `pyproject.toml`.
- `darker` supports using `darker --lint "ruff check" ./` to apply `ruff` fixes only to the git diff between commits.

![Screenshot from ruff repo](/assets/images/ruff-the-last-python-linter-ever.svg)
<p align="center">
  <i>Linting the CPython codebase from scratch.</i>
</p>
- ⚡️ 10-100x faster than existing linters (like Flake8) and formatters (like Black)
- 🐍 Installable via `pip`
- 🛠️ `pyproject.toml` support
- 🤝 Python 3.13 compatibility
- ⚖️ Drop-in parity with [Flake8](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-flake8), isort, and [Black](https://docs.astral.sh/ruff/faq/#how-does-ruffs-formatter-compare-to-black)
- 📦 Built-in caching, to avoid re-analyzing unchanged files
- 🔧 Fix support, for automatic error correction (e.g., automatically remove unused imports)
- 📏 Over [800 built-in rules](https://docs.astral.sh/ruff/rules/), with native re-implementations
    of popular Flake8 plugins, like flake8-bugbear
- ⌨️ First-party [editor integrations](https://docs.astral.sh/ruff/integrations/) for
    [VS Code](https://github.com/astral-sh/ruff-vscode) and [more](https://docs.astral.sh/ruff/editors/setup)
- 🌎 Monorepo-friendly, with [hierarchical and cascading configuration](https://docs.astral.sh/ruff/configuration/#config-file-discovery)

[**Reference:** Ruff Documentation](https://docs.astral.sh/ruff/)

