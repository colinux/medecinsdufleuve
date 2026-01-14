---
name: update-news
description: Mise à jour de la page actualités du site Médecins du Fleuve. Utiliser quand l'utilisateur veut ajouter une nouvelle actualité (mission, inauguration, événement) avec des photos.
---

# Mise à jour de la page Actualités

## Informations à demander

- Titre de l'actualité (mois/année, type)
- Texte descriptif
- Emplacement des photos sources
- Orientation de chaque photo (portrait/paysage)

## Workflow

### 1. Préparer les photos

**Convention de nommage :**
- Missions : `mission-XX-YY_NN.jpg` (ex: `mission-67-68_01.jpg`)
- Autres : `actu-YYYYMM-description-N.jpg` (ex: `actu-202512-inauguration-maraye-1.jpg`)

**Destination :** `assets/images/missions/`

```bash
mv "source/photo.jpg" assets/images/missions/nouveau-nom.jpg
```

### 2. Générer les miniatures

```bash
ruby bin/generate-thumbnails.rb assets/images/missions/photo1.jpg assets/images/missions/photo2.jpg
```

Crée des `.thumb.jpg` (1280x600 max, auto-orientation EXIF).

### 3. Corriger l'orientation si nécessaire

```bash
magick photo.jpg -rotate 180 photo.jpg
magick photo.thumb.jpg -rotate 180 photo.thumb.jpg
```

### 4. Optimiser avec ImageOptim

```bash
open -a /Applications/ImageOptim.app assets/images/missions/*.thumb.jpg
```

### 5. Modifier news.md

**Ajouter la galerie dans le YAML** (après `- wide`, avant les autres galeries) :

```yaml
gallery-nom-galerie:
- url: assets/images/missions/photo.jpg
  image_path: assets/images/missions/photo.thumb.jpg
  alt: "Description pour accessibilité"
  title: "Titre au survol"
```

**Ajouter le contenu** (après `# Missions & actualités`, avant les autres entrées) :

```markdown
## Mois Année. Titre

Texte descriptif.

{% include gallery id="gallery-nom-galerie" layout="half" %}
```

### 6. Layouts disponibles

| Layout | Usage |
|--------|-------|
| `layout="half"` | 2 colonnes |
| `layout="third"` | 3 colonnes |
| `style="grid-template-areas: 'a a b' 'c d d'"` | Grille personnalisée |

Dans le YAML : `style: "grid-row: span 2"` pour une image portrait.

### 7. Vérifier

```bash
bundle exec jekyll serve
```

Ouvrir http://localhost:4000/actualites

## Règles

- Toujours ajouter `alt` et `title` pour l'accessibilité
- Nouvelles entrées EN HAUT (chronologie inversée)
- Ne pas commit sans validation utilisateur
