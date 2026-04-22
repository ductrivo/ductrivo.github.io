---
layout: post-sidebar
title:  "Code Propre en Python, Guides de Style, Formateurs et Linters"
ref: python-clean-code
author: ductri
categories: [Programming]
tags: [featured, python]
image: /assets/images/python-clean-code-style-guides-formatters-linters.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: true
side_toc: True
lang: fr
permalink: /fr/python-clean-code-style-guides/
---

## Qu'est-ce que le Clean Code (Code Propre) ?

Le code propre est crucial pour maintenir et faire évoluer les projets logiciels. Il doit être :

- Facile à maintenir et à modifier
- Compréhensible par les autres
- Sécurisé
- Correct, c'est-à-dire qu'il "fonctionne"
- Pertinent par rapport aux besoins du projet, par exemple, pas de fonctionnalités inutiles qui alourdissent la base de code

> **Le plus important : un code propre est un code facile à changer !**

## PEP 8 et les Guides de Style Python de Google

Le `code idiomatique` est un code qui respecte les conventions de style communes au langage. Pour `Python` spécifiquement, la [PEP 8](https://peps.python.org/pep-0008/) et les [Guides de Style Python de Google](https://google.github.io/styleguide/pyguide.html) énoncent un ensemble d'opinions que la majorité du code Python suit désormais.

## Principes de Code

Il existe de nombreux principes de codage que vous pouvez suivre pour écrire un meilleur code, chacun ayant ses propres avantages/inconvénients et compromis. Cet article couvre quatre des principes les plus populaires : DRY, KISS, SoC et SOLID :

- **DRY** (Don't repeat yourself - Ne vous répétez pas)
- **KISS** (Keep it simple, stupid - Faites simple, idiot)
- **SoC** (Separation of concerns - Séparation des préoccupations)
- **SOLID :**
  - Le principe de **S**ponsabilité unique : "Une classe ne devrait avoir qu'une seule, et une seule, raison de changer."
  - Le principe **O**uvert/Fermé : "Les entités devraient être ouvertes à l'extension, mais fermées à la modification."
  - Le principe de substitution de **L**iskov : "Les fonctions qui utilisent des pointeurs ou des références à des classes de base doivent pouvoir utiliser des objets de classes dérivées sans le savoir."
  - Le principe de ségrégation des **I**nterfaces : "Un client ne devrait pas être forcé d'implémenter une interface qu'il n'utilise pas."
  - Le principe d'inversion de **D**épendance : "Dépendez des abstractions, pas des concrétions."

[**Source :** Clean Code in Python](https://testdriven.io/blog/clean-code-python/)

## Une Cohérence Absurde est le Lutin des Petits Esprits

- L'une des idées clés de Guido est que le code est lu beaucoup plus souvent qu'il n'est écrit. Les directives fournies ici sont destinées à améliorer la lisibilité du code et à le rendre cohérent sur tout le spectre du code Python. Comme le dit la [PEP 20](https://peps.python.org/pep-0020/), `La lisibilité compte`.
- Un guide de style est une question de cohérence. La cohérence avec ce guide de style est importante. La cohérence au sein d'un projet est plus importante. La cohérence au sein d'un module ou d'une fonction est la plus importante.
- Cependant, sachez quand être incohérent – parfois les recommandations du guide de style ne sont tout simplement pas applicables. En cas de doute, utilisez votre meilleur jugement. Regardez d'autres exemples et décidez de ce qui semble le mieux. Et n'hésitez pas à demander !

> En particulier : ne rompez pas la rétrocompatibilité juste pour vous conformer à cette PEP !

Quelques autres bonnes raisons d'ignorer une directive particulière :

1. Lorsque l'application de la directive rendrait le code moins lisible, même pour quelqu'un qui a l'habitude de lire du code qui suit cette PEP.
2. Pour être cohérent avec le code environnant qui la rompt également (peut-être pour des raisons historiques) – bien que ce soit aussi une opportunité de nettoyer le désordre de quelqu'un d'autre (dans le pur style XP).
3. Parce que le code en question est antérieur à l'introduction de la directive et qu'il n'y a aucune autre raison de modifier ce code.
4. Lorsque le code doit rester compatible avec d'anciennes versions de Python qui ne supportent pas la fonctionnalité recommandée par le guide de style.

[**Source :** PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/#a-foolish-consistency-is-the-hobgoblin-of-little-minds)

## Revue de Code et Bonnes Pratiques de Pull Request

- La revue de code permet à votre organisation de n'accepter que les modifications de code qui reçoivent un consensus d'approbation, dans le but de maintenir un code de qualité, autrement connu sous le nom de "code propre".

- Composantes de la Qualité du Code
  - Est-ce que ça fonctionne ?
  - Puis-je le comprendre ?
  - Est-ce sûr ?
  - Est-ce que nous voulons vraiment cela ?

- Gardez les pull requests très petites et très ciblées, avec peu de décisions logiques
  - Cela facilite la tâche du réviseur pour répondre aux quatre questions de qualité du code énumérées ci-dessus
  - Réduit les conflits de fusion potentiels
  - Permet aux collaborateurs de s'adapter à vos changements

- [**Exemple** d'une pull request trop volumineuse](https://github.com/rootski-io/rootski/pull/56)

- Faites en sorte qu'il soit aussi facile que possible pour les collaborateurs de réviser votre code rapidement
  - Répondez clairement aux quatre questions de qualité du code
    - Le code fonctionne-t-il ?
    - Le code est-il propre ?
    - Le code est-il sûr ?
    - Le code est-il souhaité ?

- Le temps machine a moins de valeur que le temps humain
  - Utilisez l'automatisation pour fournir des preuves à vos réponses aux questions ci-dessus autant que possible
  - Plus de détails sur l'automatisation seront dans les vidéos qui suivent celle-ci

- Alternatives aux pull requests
  - Programmation en binôme (Pair programming) - deux développeurs travaillant ensemble pour écrire du code
  - Programmation en groupe (Mob programming) - trois développeurs ou plus travaillant ensemble pour écrire du code
  - Fusionnez simplement votre code directement dans la branche principale - fonctionne mieux dans les équipes de haute confiance

## Auto-formateurs

- Les auto-formateurs réajustent l'espacement et appliquent automatiquement les conventions dans votre code
- L'auto-formatage crée un style de code cohérent au sein d'une équipe, tant que tous les membres de l'équipe utilisent le même formateur et les mêmes paramètres
- `Black` est l'un des auto-formateurs les plus populaires en `Python`. D'autres options incluent `autopep8` et `yapf`

## PyLint

- Linters
  - Effectuent une analyse statique de votre code ; ils ne lancent pas le code, mais ils :
    - Le scannent pour les erreurs
    - Appliquent les standards de code
    - Rechargent les "odeurs" de code (code smells)
    - Font des suggestions sur la façon dont le code pourrait être refactorisé
  - Pylint est un exemple de linter pour Python
- Pylint est couramment utilisé dans l'Intégration Continue pour attraper automatiquement le code problématique lors des Pull Requests.

**Notes :**

- Une adhésion sans compromis et dogmatique à n'importe quelle règle, y compris les règles de linting, peut parfois être néfaste ; parfois vous pouvez avoir une bonne raison de ne pas respecter une règle de linting
- Les messages d'erreur de Pylint peuvent être désactivés pour un fichier spécifique en utilisant le nom de la règle ou son ID - voir les ressources ci-dessous pour un exemple
  - Désactivation des règles dans le terminal : `pylint --disable=<liste-de-règles> <nom-du-fichier>`
  - Désactivation des règles dans un fichier Python donné via un commentaire : `# pylint: disable=nom-de-la-règle`
  - Il est recommandé de ne pas utiliser l'ID de la règle, mais le nom de la règle, pour le rendre facilement lisible
- Créer un fichier de configuration pylint dans le terminal : `pylint --generate-rcfile > .pylintrc`

## Flake8

- `Darglint` est un linter et un plugin `flake8` qui vérifie les arguments à l'intérieur des docstrings, s'assurant qu'ils correspondent à l'implémentation réelle du code.
- Installez `Darglint` en lançant la commande `pip install darglint` dans le même environnement virtuel que `flake8`.
- La plupart des extensions `flake8` peuvent être installées de la même manière que `Darglint` - consultez la liste des extensions `flake8` dans les ressources ci-dessous pour trouver des extensions qui vous intéressent.
- [Awesome Flake8 Extensions](https://github.com/DmytroLitvinov/awesome-flake8-extensions)

## Métriques de Code

- La complexité cyclomatique (CC) fait référence au nombre de décisions dans le code, ou au nombre de chemins de branchement qu'il possède
- `Radon` est un outil d'analyse CC populaire et peut être installé avec `pip install radon`
  - Calculez la CC des fonctions dans un fichier donné en lançant cette commande de terminal : `radon cc nom_fichier.py -s`
- D'autres outils d'analyse de complexité de code en Python incluent `mccabe` et `xenon`, ce dernier étant une mince enveloppe autour de `radon`
- L'installation de `flake8` et `radon` dans le même environnement virtuel active radon en tant qu'extension `flake8`, permettant la coloration syntaxique lorsque la complexité cyclomatique est trop élevée
  - Ajoutez ceci à votre fichier de configuration .flake8 pour fixer le score CC max que vous voulez que votre code ait à 10 : `radon-max-cc = 10`

## Darker : linter progressivement les projets hérités

- Le linting rend le code plus lisible, mais si vous avez une base de code volumineuse et préexistante, imposer une conformité de linting à 100% d'un coup peut être prohibitif en termes de temps.
- `darker` est un outil CLI basé sur Python qui vous permet de lancer des outils de linting comme `flake8`, `pylint`, `ruff`, etc. *uniquement* sur les lignes de code qui ont changé dans votre dépôt. Il le fait en regardant le `git --diff` entre deux commits dans votre dépôt.
- Ainsi, dans un workflow de Pull Request, vous pourriez utiliser `darker` pour ne faire échouer `pylint` ou `ruff` que pour les erreurs découvertes dans les lignes modifiées entre le dernier commit de votre branche de fonctionnalité et le dernier commit de la branche principale/master.
- Des outils similaires existent pour parvenir à cela avec l'application de la couverture de test également. Mais nous n'avons pas parlé de tests jusqu'à présent, donc si ce commentaire n'a pas de sens, il en aura plus tard.

## Ruff : le dernier linter Python ?

- Ruff est un linter Python implémenté en Rust, connu pour sa rapidité et ses performances.
- Ruff vise à rassembler plusieurs outils de linting et d'autres outils d'analyse statique en un seul outil unifié, par exemple `pylint`, `flake8`, `autoflake`, `isort`, etc.
- `ruff` réimplémente tous ces outils d'analyse statique en `rust` à partir de zéro !
- Ruff peut corriger automatiquement certains problèmes de code avec `ruff check --fix ./`
- Ruff a une extension VS Code et suit le protocole de serveur de langage (LSP).
- La configuration de Ruff peut être faite via des fichiers comme `pyproject.toml`.
- `darker` supporte l'utilisation de `darker --lint "ruff check" ./` pour appliquer les corrections `ruff` uniquement au git diff entre les commits.

![Capture d'écran du dépôt ruff](/assets/images/ruff-the-last-python-linter-ever.svg)
<p align="center">
  <i>Linting de la base de code CPython à partir de zéro.</i>
</p>
- ⚡️ 10 à 100 fois plus rapide que les linters existants (comme Flake8) et les formateurs (comme Black)
- 🐍 Installable via `pip`
- 🛠️ Support de `pyproject.toml`
- 🤝 Compatibilité Python 3.13
- ⚖️ Parité de remplacement avec [Flake8](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-flake8), isort et [Black](https://docs.astral.sh/ruff/faq/#how-does-ruffs-formatter-compare-to-black)
- 📦 Mise en cache intégrée, pour éviter de ré-analyser les fichiers inchangés
- 🔧 Support de correction, pour une correction automatique des erreurs (par exemple, supprimer automatiquement les imports inutilisés)
- 📏 Plus de [800 règles intégrées](https://docs.astral.sh/ruff/rules/), avec des ré-implémentations natives de plugins Flake8 populaires, comme flake8-bugbear
- ⌨️ Intégrations d'éditeurs de premier plan pour [VS Code](https://github.com/astral-sh/ruff-vscode) et [plus](https://docs.astral.sh/ruff/editors/setup)
- 🌎 Adapté aux monorépos, avec une [configuration hiérarchique et en cascade](https://docs.astral.sh/ruff/configuration/#config-file-discovery)

[**Référence :** Documentation Ruff](https://docs.astral.sh/ruff/)
