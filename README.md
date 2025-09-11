# mini-framework

## 🚀 Présentation

**mini-framework** est un micro-framework JavaScript qui vous permet de créer des applications web modernes en toute simplicité, sans dépendre de bibliothèques externes comme React, Vue ou Angular. Il propose :

- Une abstraction du DOM via un Virtual DOM
- Un système de routage simple
- Une gestion d'état globale
- Un système d'événements custom

---

## 🧩 Fonctionnalités principales

- **Abstraction du DOM** : Manipulez l'interface utilisateur via des objets JS (Virtual DOM), puis synchronisez efficacement avec le DOM réel.
- **Routage** : Synchronisez l'URL et l'affichage de vos composants/pages.
- **Gestion d'état** : Stockez et partagez l'état de l'application entre tous vos composants.
- **Gestion d'événements** : Attachez des événements de façon déclarative, sans `addEventListener`.

---

## 📦 Structure du projet

```
framework/
  component.js      # Classe de base pour vos composants
  framwork.js       # Classe principale du framework (routing, state, etc.)
  helpers.js        # Fonctions utilitaires (Virtual DOM, diff, etc.)
README.md           # Ce fichier
INSTRUCTION.md      # Cahier des charges
```

---

## 🛠️ Utilisation rapide

### 1. Installation

Ajoutez le framework à votre projet (copiez le dossier `framework/`).

### 2. Préparez votre HTML

```html
<body>
  <div id="app"></div>
  <script type="module" src="main.js"></script>
</body>
```

### 3. Créez un composant

```js
// main.js
import { Framework } from "./framework/framwork.js";
import { Component } from "./framework/component.js";

class HelloComponent extends Component {
  getVDom() {
    return this.framework.createVElement("h1", {}, ["Hello World!"]);
  }
}

const app = new Framework();
app.route("/", HelloComponent);
app.start();
```

### 4. Créez un élément avec attributs, enfants et événements

```js
class ButtonComponent extends Component {
  getVDom() {
    return this.framework.createVElement(
      "button",
      {
        class: "my-btn",
        onClick: () => alert("Clicked!"),
      },
      ["Cliquez-moi"]
    );
  }
}
```

### 5. Nesting (imbriquer des éléments)

```js
getVDom() {
  return this.framework.createVElement("div", {}, [
    this.framework.createVElement("h2", {}, ["Titre"]),
    this.framework.createVElement("ul", {}, [
      this.framework.createVElement("li", {}, ["Item 1"]),
      this.framework.createVElement("li", {}, ["Item 2"])
    ])
  ]);
}
```

### 6. Gestion de l'état

```js
// Lire l'état
const value = this.framework.getState("clé");
// Modifier l'état (et re-render)
this.framework.setState("clé", nouvelleValeur);
```

### 7. Routage

```js
app.route("/about", AboutComponent);
app.navigateTo("/about");
```

---

## ⚙️ API du framework

### Classe `Framework`

- `route(path, ComponentClass)` : Associe un chemin à un composant
- `navigateTo(path)` : Change l'URL et affiche le composant associé
- `setState(name, value)` : Modifie l'état global et re-render
- `getState(name)` : Récupère une valeur d'état
- `setRef(name, value)` / `getRef(name)` : Stocke/récupère une référence DOM
- `start()` : Démarre l'application (affiche la page courante)

### Classe `Component`

- `getVDom()` : Retourne l'arbre virtuel à afficher (méthode à surcharger)
- `Mounting()` : Appelé après le premier rendu
- `UnMounting()` : Appelé lors d'un changement de page

### Virtual DOM

- `createVElement(tag, props, children)` : Crée un élément virtuel

---

## 💡 Pourquoi ce fonctionnement ?

- **Virtual DOM** : Permet de manipuler l'UI comme un arbre JS, puis d'appliquer seulement les changements nécessaires au DOM réel (rapide et efficace).
- **Routage** : Synchronise l'URL et l'affichage, pour des SPA modernes.
- **State Management** : Centralise l'état pour des applications prévisibles.
- **Event Handling** : Les événements sont déclarés dans le Virtual DOM, nettoyés automatiquement lors des changements de page.

---

## 📝 Exemples avancés

### Ajouter un input contrôlé

```js
class InputComponent extends Component {
  getVDom() {
    return this.framework.createVElement("input", {
      type: "text",
      value: this.framework.getState("valeur") || "",
      onInput: (e) => this.framework.setState("valeur", e.target.value),
    });
  }
}
```

---

## 📚 Pour aller plus loin

- Consultez `INSTRUCTION.md` pour le cahier des charges complet.
- Inspirez-vous du projet TodoMVC fourni pour voir un exemple complet.

---

## 🧑‍💻 Auteur

Framework développé par [pcaboor].

---

## 🏁 Bon développement !
