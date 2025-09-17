# 🚀 Mini-Framework JavaScript - Guide Complet

## 📋 Contexte du Projet

**Objectif :** Créer votre propre framework JavaScript moderne, sans dépendances externes.

---

## ⚡ Framework vs Bibliothèque

**Bibliothèque** : Vous contrôlez l'exécution (vous appelez ses méthodes)

```js
// Exemple avec jQuery (bibliothèque)
$("#button").click(() => { ... });
```

**Framework** : Il contrôle votre code (inversion de contrôle)

```js
// Exemple avec votre framework
class MonComposant extends Component {
  getVDom() {
    /* Le framework appelle cette méthode */
  }
}
```

---

## 🎯 Fonctionnalités Obligatoires

Votre framework doit implémenter :

- ✅ **Abstraction du DOM** (Virtual DOM)
- ✅ **Système de routage** (navigation entre pages)
- ✅ **Gestion d'état** (state management)
- ✅ **Gestion d'événements** (différent de addEventListener)

**Projet requis :** Application TodoMVC complète

---

## � Structure de Fichiers Fournie

```
mini-framework/
├── framework/              # 🏗️ Le framework
│   ├── framwork.js         #   Classe principale
│   ├── component.js        #   Système de composants
│   └── helpers.js          #   Virtual DOM
├── todoMVC/               # ✅ TodoMVC complet
│   ├── index.html
│   ├── app.js
│   └── style.css
├── index.html             # 🏠 Demo moderne
├── main.js                # 🎮 Exemples d'usage
├── styles.css             # 🎨 Design moderne
├── README.md              # 📚 Documentation
└── INSTRUCTION.md         # 📖 Ce guide
```

---

## 🚀 Démarrage Rapide

### 1. Tester le Framework

```bash
# Lancer un serveur local
python3 -m http.server 8000

# Ouvrir dans le navigateur
# Demo principale : http://localhost:8000
# TodoMVC : http://localhost:8000/todoMVC/
```

### 2. Votre Premier Composant

```js
import { Framework } from "./framework/framwork.js";
import { Component } from "./framework/component.js";

class MonComposant extends Component {
  getVDom() {
    return this.framework.createVElement("div", {}, [
      this.framework.createVElement("h1", {}, ["Hello World!"]),
    ]);
  }
}

const app = new Framework();
app.route("/", MonComposant);
app.start();
```

Notes importantes :

- L'exemple `todoMVC` utilise `localStorage` avec la clé `miniframework_todos_v1` pour sauvegarder automatiquement les todos.
- Le composant `Dashboard` dans la démo principale calcule dynamiquement des statistiques à partir de l'état global `todos` (total, actifs, complétés, pourcentage de complétion).

---

## 🧩 Fonctionnalités Implémentées

### 1. Abstracting the DOM

You will have to implement a way to handle the DOM.  
The DOM can be seen as a big object. Example:

```html
<html>
  <div class="nameSubm">
    <input type="text" placeholder="Insert Name" />
    <input type="submit" placeholder="Submit" />
  </div>
</html>
```

```json
{
  "tag": "html",
  "attrs": {},
  "children": [
    {
      "tag": "div",
      "attrs": {
        "class": "nameSubm"
      },
      "children": [
        {
          "tag": "input",
          "attrs": {
            "type": "text",
            "placeholder": "Insert Name"
          }
        },
        {
          "tag": "input",
          "attrs": {
            "type": "submit",
            "placeholder": "Submit"
          }
        }
      ]
    }
  ]
}
```

With this approach, you can manipulate the DOM more easily in JS.

Possible techniques:

Virtual DOM → compare desired changes with real DOM, update only what’s needed

Data Binding → keep data sources synchronized

Templating → client-side data binding with JS

Your DOM must handle events, children, and attributes of each element.

2. Routing System

Routing synchronizes the state of the app with the URL.
You must provide a simple way to:

Change the URL through user actions

Update the state accordingly

3. State Management

The state of an app = the outcome of all actions since page load.
Example: if a user clicks a button → state changes.

Requirements:

Implement a way to handle state

Allow multiple pages to access and update the same state

4. Event Handling

Attach events declaratively using `onX` props (e.g. `onClick`, `onInput`). Internally the framework uses `addEventListener`/`removeEventListener` to attach handlers but keeps the declarative API so you don't need to manage listeners yourself.

✅ TodoMVC Project

You must create a TodoMVC project with your framework.

Requirements:

Replicate all elements of the official TodoMVC examples (IDs, classes, etc.)

Fully functional (add, remove, edit todos, filter list, etc.)

Use your framework to render and manage state

📚 Learning Outcomes

This project will help you understand:

Web Development

JavaScript

HTML & CSS

Framework design

Documentation writing

DOM manipulation

Routing

State management

Event handling
