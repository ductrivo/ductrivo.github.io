---
layout: post-sidebar
title:  "Gestion de Version du Code"
author: ductri
categories: [Programming]
tags: [featured, python]
image: /assets/images/code-versioning.webp
# description: "Data scientists, analysts, and beginner devs: transition from 'coder' to 'software engineer' and learn to ship code."
toc: true
side_toc: true
lang: fr
permalink: /fr/code-versioning/
---

## Versionnage Sémantique (Semantic Versioning)
[**Résumé :**](https://semver.org/) Étant donné un numéro de version `Majeur.Mineur.Correctif`, incrémente la version :
- `Majeure` lorsque vous apportez des modifications d'API incompatibles
- `Mineure` lorsque vous ajoutez des fonctionnalités de manière rétrocompatible
- `Correctif` (Patch) lorsque vous effectuez des corrections de bogues rétrocompatibles
Des étiquettes supplémentaires pour les métadonnées de pré-version et de construction sont disponibles en tant qu'extensions du format `Majeur.Mineur.Correctif`.

Exemple :
```python
# 1.0.0
def add_numbers(a, b, c):
    return a + b + c
    
# 1.0.1
def add_number(a, b, c):
    # plus rapide et plus sûr :)
    ...
    
# 2.0.0
def add_numbers(a, b, c, d):
    return a + b + c + d
    
# mais la version aurait pu être 1.1.0 si les changements étaient non-cassants
def add_numbers(a, b, c, d = 0):
		return a + b + c + d

# pip install cool_library
add_numbers(1, 2, 3, 0)
```
