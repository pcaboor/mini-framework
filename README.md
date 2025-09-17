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
- **Routage** : Synchronisez l'URL et l'affichage de vos composants/pages avec support navigation navigateur.
- **Gestion d'état** : Stockez et partagez l'état de l'application entre tous vos composants avec re-rendu automatique.
- **Gestion d'événements** : Attachez des événements de façon déclarative, sans `addEventListener`.
- **Lifecycle des composants** : Méthodes `Mounting()` et `UnMounting()` pour gérer le cycle de vie.
- **Références DOM** : Système de références pour accéder directement aux éléments DOM.

---

## 📦 Structure du projet

```
mini-framework/
├── framework/
│   ├── component.js      # Classe de base pour vos composants
│   ├── framwork.js       # Classe principale du framework (routing, state, etc.)
│   └── helpers.js        # Fonctions utilitaires (Virtual DOM, diff, etc.)
├── todoMVC/              # Application TodoMVC complète en exemple
│   ├── index.html
│   ├── style.css
│   └── app.js
├── index.html            # Page de démonstration
├── main.js               # Exemples d'utilisation du framework
├── README.md             # Ce fichier
└── INSTRUCTION.md        # Cahier des charges
```

---

## 🛠️ Utilisation rapide

### 1. Installation

Clonez ou téléchargez le repository et naviguez dans le dossier.

```bash
git clone <your-repo>
cd mini-framework
```

### 2. Test rapide

Ouvrez `index.html` dans votre navigateur pour voir la démonstration, ou lancez un serveur local :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (si vous avez npx)
npx serve .
```

Note:

- La version `todoMVC` utilise `localStorage` (clé `miniframework_todos_v1`) pour persister les todos entre rechargements.
- Le `Dashboard` de la démo principale lit les todos du state global et affiche des statistiques calculées (total, actifs, complétés, %).

Puis visitez `http://localhost:8000`

## 🛡️ Notes pour l'audit

- **Routage** : le framework utilise le mode _hash routing_ (via `location.hash`). Cela évite les 404 lors du rafraîchissement sur un serveur statique simple.
- **Vérifications TodoMVC** : pour valider la conformité, vérifiez que l'exemple TodoMVC (dans `todoMVC/` ou `main.js`) contient :
  - un champ d'ajout de todo (input) et un bouton/contrôle pour ajouter une tâche;
  - chaque tâche rendue avec la classe `todo-item` (ou équivalent clairement identifiable);
  - un élément `footer` (ou tout élément avec la classe `footer`) visible lorsque la liste contient au moins une tâche;
  - contrôles de filtrage (All / Active / Completed) qui filtrent l'affichage et mettent éventuellement à jour l'URL/hash;
  - un bouton `Clear completed` qui supprime uniquement les tâches complétées;
  - persistance via `localStorage` (clé utilisée : `miniframework_todos_v1`).

Pour vérifier rapidement : ouvrir `http://localhost:8000`, aller sur la route Todo, ajouter quelques todos, tester cocher/décocher, filtrer et cliquer sur Clear Completed. Il ne doit pas y avoir d'erreurs dans la console DevTools.

## ✅ Audit — Q&A

- **VDOM :** implémentation dans `framework/helpers.js` — fonctions clés : `createVElement`, `VDomToReelDom`, `diff`, `updateDOM`. Vérifier : modification d'un composant provoque un patch minimal sur le DOM (inspecter éléments et classes en DevTools).

- **Routage :** implémentation dans `framework/framwork.js` — fonctions : `getCurrentPath()`, `navigateTo(path)` et écouteur `hashchange`. Vérifier : changement d'URL via `app.navigateTo('/path')` met à jour le hash et le composant affiché ; rafraîchir la page ne doit pas renvoyer 404 sur un serveur statique.

- **Gestion d'état :** implémentation dans `framework/framwork.js` — API : `getState(name)`, `setState(name, value)`, `setWState(name, value)`. Vérifier : `setState` déclenche re-render, `setWState` ne déclenche pas de re-render.

- **Événements et nettoyage :** modifications appliquées dans `framework/helpers.js` — mécanisme : `listenerMap` (WeakMap), utilitaires `addListener()` / `removeListener()` et intégration dans `updateProps`/`setProp`. Vérifier : naviguer entre pages et observer absence de doublons d'écouteurs (console, profiler, ou instrumentation simple `console.count()` dans un handler).

- **Persistance TodoMVC :** l'exemple utilise `localStorage` avec la clé `miniframework_todos_v1` (voir `todoMVC/` ou la logique dans `main.js` / `TodoDemoComponent`). Vérifier : ajouter des todos, recharger la page, les todos persistent.

- **Tests manuels rapides :**
  - Démarrer le serveur :
    ```bash
    python3 -m http.server 8000
    ```
  - Vérifier l'écoute : `ss -ltnp 'sport = :8000'` ou `lsof -i :8000`
  - Vérifier la réponse HTTP : `curl -I http://localhost:8000/`
  - Ouvrir `http://localhost:8000/` puis naviguer vers la route Todo et exécuter la checklist TodoMVC (ajout, édition, bascule, filtres, Clear completed).

- **Emplacement des éléments à relire pour l'audit :**
  - VDOM & events : `framework/helpers.js`
  - Framework (routing/state/ref) : `framework/framwork.js`
  - Composants de base : `framework/component.js`
  - Démo Todo et persistance : `todoMVC/` et `main.js`

- **Commit attendu pour la correction événements :** si nécessaire, rechercher le commit `fix(events): dedupe listeners and deterministic cleanup` sur la branche `component` ou vérifier le fichier `framework/helpers.js` dans l'arborescence de travail.

Si vous voulez, je peux :
- committer/pusher la modification `README.md` (message proposé : `docs(audit): add Q&A and verification steps`),
- ou lancer les vérifications manuelles et rapporter les observations.

### 3. Projet TodoMVC

Pour voir l'exemple TodoMVC conforme aux spécifications officielles :

```bash
cd todoMVC
# Ouvrez index.html ou lancez un serveur dans ce dossier
```

### 4. Créez votre propre application

Préparez votre HTML :

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mon App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

Créez votre application :

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

---

## ⚙️ API du framework

### Classe `Framework`

#### Constructeur

```js
const app = new Framework((initialState = {}));
```

#### Méthodes de routage

- `route(path, ComponentClass)` : Associe un chemin à un composant
- `navigateTo(path)` : Change l'URL et affiche le composant associé
- `start()` : Démarre l'application (affiche la page courante)

#### Gestion d'état

- `setState(name, value)` : Modifie l'état global et re-render automatiquement
- `getState(name)` : Récupère une valeur d'état
- `setWState(name, value)` : Modifie l'état sans re-render (pour l'initialisation)

#### Références DOM

- `setRef(name, value)` : Stocke une référence DOM
- `getRef(name)` : Récupère une référence DOM

#### Virtual DOM

- `createVElement(tag, props, children)` : Crée un élément virtuel

### Classe `Component`

#### Méthodes à surcharger

- `getVDom()` : **OBLIGATOIRE** - Retourne l'arbre virtuel à afficher

#### Lifecycle

- `Mounting()` : Appelé après le premier rendu du composant
- `UnMounting()` : Appelé lors d'un changement de page/composant

#### Propriétés

- `this.framework` : Référence vers l'instance du framework

### Création d'éléments virtuels

#### Syntaxe de base

```js
this.framework.createVElement(tag, props, children);
```

- **tag** : `string` - Nom de la balise HTML
- **props** : `object` - Attributs et événements
- **children** : `array` - Tableau d'enfants (éléments ou texte)

---

## 📚 Exemples détaillés

### 1. Créer un élément simple

```js
// Créer un paragraphe
this.framework.createVElement("p", {}, ["Bonjour le monde"]);

// Créer un titre avec classe CSS
this.framework.createVElement("h1", { class: "title" }, ["Mon Titre"]);
```

### 2. Créer un élément avec attributs

```js
// Input avec attributs
this.framework.createVElement(
  "input",
  {
    type: "text",
    placeholder: "Tapez ici...",
    class: "form-control",
    id: "username",
  },
  []
);

// Lien avec attributs
this.framework.createVElement(
  "a",
  {
    href: "https://example.com",
    target: "_blank",
    class: "external-link",
  },
  ["Lien externe"]
);
```

### 3. Gestion d'événements

```js
// Bouton avec événement click
this.framework.createVElement(
  "button",
  {
    class: "btn btn-primary",
    onClick: () => {
      alert("Bouton cliqué !");
    },
  },
  ["Cliquez-moi"]
);

// Input avec événement de saisie
this.framework.createVElement(
  "input",
  {
    type: "text",
    onInput: (e) => {
      console.log("Valeur:", e.target.value);
      this.framework.setState("inputValue", e.target.value);
    },
    onChange: (e) => {
      console.log("Changement confirmé:", e.target.value);
    },
  },
  []
);

// Formulaire avec soumission
this.framework.createVElement(
  "form",
  {
    onSubmit: (e) => {
      e.preventDefault();
      console.log("Formulaire soumis");
    },
  },
  [
    // contenu du formulaire...
  ]
);
```

#### Événements supportés

Tous les événements HTML standard sont supportés avec la syntaxe `on` + nom de l'événement :

- `onClick`, `onMouseOver`, `onMouseOut`
- `onInput`, `onChange`, `onKeyPress`, `onKeyDown`, `onKeyUp`
- `onSubmit`, `onFocus`, `onBlur`
- `onLoad`, `onResize`, `onScroll`
- etc.

### 4. Imbriquer des éléments (Nesting)

```js
// Structure imbriquée complexe
this.framework.createVElement("div", { class: "container" }, [
  this.framework.createVElement("header", { class: "header" }, [
    this.framework.createVElement("h1", {}, ["Mon Application"]),
    this.framework.createVElement("nav", {}, [
      this.framework.createVElement("ul", {}, [
        this.framework.createVElement("li", {}, [
          this.framework.createVElement("a", { href: "/" }, ["Accueil"]),
        ]),
        this.framework.createVElement("li", {}, [
          this.framework.createVElement("a", { href: "/about" }, ["À propos"]),
        ]),
      ]),
    ]),
  ]),
  this.framework.createVElement("main", { class: "content" }, [
    this.framework.createVElement("p", {}, ["Contenu principal ici..."]),
  ]),
]);
```

### 5. Gestion de l'état

```js
class CounterComponent extends Component {
  Mounting() {
    // Initialiser le state au montage du composant
    if (this.framework.getState("counter") === undefined) {
      this.framework.setWState("counter", 0); // setWState = pas de re-render
    }
  }

  getVDom() {
    const counter = this.framework.getState("counter") || 0;

    return this.framework.createVElement("div", {}, [
      this.framework.createVElement("h2", {}, [`Compteur: ${counter}`]),
      this.framework.createVElement(
        "button",
        {
          onClick: () => this.framework.setState("counter", counter + 1),
        },
        ["+1"]
      ),
      this.framework.createVElement(
        "button",
        {
          onClick: () => this.framework.setState("counter", counter - 1),
        },
        ["-1"]
      ),
    ]);
  }
}
```

### 6. Utilisation de références DOM

```js
class InputFocusComponent extends Component {
  Mounting() {
    // Focus automatique sur l'input après le rendu
    setTimeout(() => {
      const input = this.framework.getRef("myInput");
      if (input) input.focus();
    }, 0);
  }

  getVDom() {
    return this.framework.createVElement("div", {}, [
      this.framework.createVElement("input", {
        ref: "myInput", // Référence stockée automatiquement
        type: "text",
        placeholder: "Ce champ sera focus automatiquement",
      }),
      this.framework.createVElement(
        "button",
        {
          onClick: () => {
            const input = this.framework.getRef("myInput");
            input.select(); // Sélectionner tout le texte
          },
        },
        ["Sélectionner le texte"]
      ),
    ]);
  }
}
```

### 7. Routage avancé

```js
// Configuration des routes
const app = new Framework({
  currentUser: null,
  isLoggedIn: false,
});

class HomePage extends Component {
  getVDom() {
    return this.framework.createVElement("div", {}, [
      this.framework.createVElement("h1", {}, ["Page d'accueil"]),
      this.framework.createVElement(
        "button",
        {
          onClick: () => this.framework.navigateTo("/profile"),
        },
        ["Voir le profil"]
      ),
    ]);
  }
}

class ProfilePage extends Component {
  getVDom() {
    const user = this.framework.getState("currentUser");

    return this.framework.createVElement("div", {}, [
      this.framework.createVElement("h1", {}, ["Profil"]),
      user
        ? this.framework.createVElement("p", {}, [`Bonjour ${user.name}`])
        : this.framework.createVElement("p", {}, ["Veuillez vous connecter"]),
      this.framework.createVElement(
        "button",
        {
          onClick: () => this.framework.navigateTo("/"),
        },
        ["Retour à l'accueil"]
      ),
    ]);
  }
}

// Enregistrement des routes
app.route("/", HomePage);
app.route("/profile", ProfilePage);

// Démarrage
app.start();
```

### 8. Composant avec formulaire complet

```js
class ContactForm extends Component {
  Mounting() {
    // Initialiser les champs du formulaire
    this.framework.setWState("formData", {
      name: "",
      email: "",
      message: "",
    });
    this.framework.setWState("errors", {});
    this.framework.setWState("isSubmitting", false);
  }

  validateForm(data) {
    const errors = {};

    if (!data.name.trim()) errors.name = "Le nom est requis";
    if (!data.email.trim()) errors.email = "L'email est requis";
    else if (!data.email.includes("@")) errors.email = "Email invalide";
    if (!data.message.trim()) errors.message = "Le message est requis";

    return errors;
  }

  updateField(field, value) {
    const formData = this.framework.getState("formData");
    this.framework.setState("formData", {
      ...formData,
      [field]: value,
    });
  }

  submitForm() {
    const formData = this.framework.getState("formData");
    const errors = this.validateForm(formData);

    this.framework.setState("errors", errors);

    if (Object.keys(errors).length === 0) {
      this.framework.setState("isSubmitting", true);

      // Simulation d'envoi
      setTimeout(() => {
        alert("Formulaire envoyé avec succès !");
        this.framework.setState("isSubmitting", false);
        this.framework.setState("formData", {
          name: "",
          email: "",
          message: "",
        });
      }, 2000);
    }
  }

  getVDom() {
    const formData = this.framework.getState("formData") || {};
    const errors = this.framework.getState("errors") || {};
    const isSubmitting = this.framework.getState("isSubmitting");

    return this.framework.createVElement(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          this.submitForm();
        },
      },
      [
        this.framework.createVElement("h2", {}, ["Formulaire de contact"]),

        // Champ nom
        this.framework.createVElement("div", {}, [
          this.framework.createVElement("label", {}, ["Nom:"]),
          this.framework.createVElement("input", {
            type: "text",
            value: formData.name || "",
            onInput: (e) => this.updateField("name", e.target.value),
            class: errors.name ? "error" : "",
          }),
          errors.name
            ? this.framework.createVElement("span", { class: "error-msg" }, [
                errors.name,
              ])
            : this.framework.createVElement("span", {}),
        ]),

        // Champ email
        this.framework.createVElement("div", {}, [
          this.framework.createVElement("label", {}, ["Email:"]),
          this.framework.createVElement("input", {
            type: "email",
            value: formData.email || "",
            onInput: (e) => this.updateField("email", e.target.value),
            class: errors.email ? "error" : "",
          }),
          errors.email
            ? this.framework.createVElement("span", { class: "error-msg" }, [
                errors.email,
              ])
            : this.framework.createVElement("span", {}),
        ]),

        // Champ message
        this.framework.createVElement("div", {}, [
          this.framework.createVElement("label", {}, ["Message:"]),
          this.framework.createVElement("textarea", {
            value: formData.message || "",
            onInput: (e) => this.updateField("message", e.target.value),
            class: errors.message ? "error" : "",
            rows: "4",
          }),
          errors.message
            ? this.framework.createVElement("span", { class: "error-msg" }, [
                errors.message,
              ])
            : this.framework.createVElement("span", {}),
        ]),

        // Bouton de soumission
        this.framework.createVElement(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
          },
          [isSubmitting ? "Envoi en cours..." : "Envoyer"]
        ),
      ]
    );
  }
}
```

---

## 💡 Pourquoi ce fonctionnement ?

- **Virtual DOM** : Permet de manipuler l'UI comme un arbre JS, puis d'appliquer seulement les changements nécessaires au DOM réel (rapide et efficace).
- **Routage** : Synchronise l'URL et l'affichage, pour des SPA modernes.
- **State Management** : Centralise l'état pour des applications prévisibles.
- **Event Handling** : Les événements sont déclarés dans le Virtual DOM, nettoyés automatiquement lors des changements de page.

---

## 📝 Exemples avancés

---

## 💡 Pourquoi ce fonctionnement ?

- **Virtual DOM** : Permet de manipuler l'UI comme un arbre JS, puis d'appliquer seulement les changements nécessaires au DOM réel (rapide et efficace).
- **Routage** : Synchronise l'URL et l'affichage, pour des SPA modernes avec support du bouton retour du navigateur.
- **State Management** : Centralise l'état pour des applications prévisibles avec re-rendu automatique.
- **Event Handling** : Les événements sont déclarés dans le Virtual DOM, nettoyés automatiquement lors des changements de page.
- **Composants** : Encapsulation et réutilisabilité du code avec lifecycle management.

---

## 🚀 Getting Started - Guide complet

### Étape 1 : Structure de projet recommandée

```
mon-projet/
├── index.html
├── main.js
├── components/
│   ├── Header.js
│   ├── Navigation.js
│   └── Footer.js
├── pages/
│   ├── HomePage.js
│   ├── AboutPage.js
│   └── ContactPage.js
├── styles/
│   └── main.css
└── framework/         # Copié depuis ce repo
    ├── component.js
    ├── framwork.js
    └── helpers.js
```

### Étape 2 : HTML de base

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mon Application</title>
    <link rel="stylesheet" href="styles/main.css" />
  </head>
  <body>
    <div id="app">
      <!-- Le framework injectera le contenu ici -->
    </div>
    <script type="module" src="main.js"></script>
  </body>
</html>
```

### Étape 3 : Application principale

```js
// main.js
import { Framework } from "./framework/framwork.js";
import { HomePage } from "./pages/HomePage.js";
import { AboutPage } from "./pages/AboutPage.js";
import { ContactPage } from "./pages/ContactPage.js";

// Initialiser avec un état global
const app = new Framework({
  user: null,
  theme: "light",
  notifications: [],
});

// Définir les routes
app.route("/", HomePage);
app.route("/about", AboutPage);
app.route("/contact", ContactPage);

// Démarrer l'application
app.start();

// Rendre accessible globalement pour le debug
window.app = app;
```

### Étape 4 : Créer un composant réutilisable

```js
// components/Header.js
import { Component } from "../framework/component.js";

export class Header extends Component {
  getVDom() {
    const user = this.framework.getState("user");

    return this.framework.createVElement("header", { class: "header" }, [
      this.framework.createVElement("div", { class: "container" }, [
        this.framework.createVElement("h1", { class: "logo" }, ["Mon App"]),
        this.framework.createVElement("nav", {}, [
          this.framework.createVElement(
            "a",
            {
              href: "/",
              onClick: (e) => {
                e.preventDefault();
                this.framework.navigateTo("/");
              },
            },
            ["Accueil"]
          ),
          this.framework.createVElement(
            "a",
            {
              href: "/about",
              onClick: (e) => {
                e.preventDefault();
                this.framework.navigateTo("/about");
              },
            },
            ["À propos"]
          ),
        ]),
        user
          ? this.framework.createVElement("div", { class: "user-info" }, [
              `Bonjour ${user.name}`,
            ])
          : this.framework.createVElement(
              "button",
              {
                onClick: () => this.handleLogin(),
              },
              ["Se connecter"]
            ),
      ]),
    ]);
  }

  handleLogin() {
    // Simulation de connexion
    this.framework.setState("user", { name: "John Doe", id: 1 });
  }
}
```

### Étape 5 : Créer une page

```js
// pages/HomePage.js
import { Component } from "../framework/component.js";
import { Header } from "../components/Header.js";

export class HomePage extends Component {
  Mounting() {
    console.log("HomePage montée");
    // Initialisation spécifique à cette page
  }

  UnMounting() {
    console.log("HomePage démontée");
    // Nettoyage si nécessaire
  }

  getVDom() {
    return this.framework.createVElement("div", {}, [
      new Header(this.framework).getVDom(),
      this.framework.createVElement("main", { class: "main-content" }, [
        this.framework.createVElement("h2", {}, ["Bienvenue sur mon site"]),
        this.framework.createVElement("p", {}, [
          "Ceci est un exemple d'utilisation du mini-framework.",
        ]),
      ]),
    ]);
  }
}
```

---

## � Conseils et bonnes pratiques

### Performance

- Utilisez `setWState()` pour l'initialisation (pas de re-render)
- Utilisez `setState()` pour les modifications qui nécessitent un re-render
- Évitez les objets trop profonds dans le state

### Organisation du code

- Séparez vos composants en fichiers individuels
- Utilisez des composants réutilisables pour les éléments communs
- Centralisez la logique métier dans le state global

### Debugging

- Le framework est accessible via `window.app` dans la console
- Utilisez `console.log()` dans les méthodes lifecycle pour tracer l'exécution
- Inspectez l'état avec `app.getState()` dans la console

### Gestion des erreurs

```js
class ErrorBoundary extends Component {
  getVDom() {
    try {
      // Votre code ici
      return this.framework.createVElement("div", {}, ["Contenu"]);
    } catch (error) {
      console.error("Erreur dans le composant:", error);
      return this.framework.createVElement("div", { class: "error" }, [
        "Une erreur est survenue",
      ]);
    }
  }
}
```

---

## 📝 Exemples avancés

### Application avec authentification

```js
class App extends Component {
  Mounting() {
    // Vérifier l'authentification au démarrage
    const token = localStorage.getItem("authToken");
    if (token) {
      this.framework.setState("isLoggedIn", true);
      this.loadUserProfile();
    }
  }

  async loadUserProfile() {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const user = await response.json();
      this.framework.setState("currentUser", user);
    } catch (error) {
      console.error("Erreur de chargement du profil:", error);
      this.framework.setState("isLoggedIn", false);
    }
  }

  getVDom() {
    const isLoggedIn = this.framework.getState("isLoggedIn");

    return this.framework.createVElement("div", { class: "app" }, [
      isLoggedIn
        ? new Dashboard(this.framework).getVDom()
        : new LoginForm(this.framework).getVDom(),
    ]);
  }
}
```

### Composant avec état local et global

```js
class ShoppingCart extends Component {
  Mounting() {
    // État local pour l'UI
    this.framework.setWState("cartVisible", false);
    // État global pour les données
    if (!this.framework.getState("cartItems")) {
      this.framework.setWState("cartItems", []);
    }
  }

  addToCart(product) {
    const items = this.framework.getState("cartItems") || [];
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      this.framework.setState(
        "cartItems",
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.framework.setState("cartItems", [
        ...items,
        { ...product, quantity: 1 },
      ]);
    }
  }

  toggleCart() {
    const visible = this.framework.getState("cartVisible");
    this.framework.setState("cartVisible", !visible);
  }

  getVDom() {
    const cartItems = this.framework.getState("cartItems") || [];
    const cartVisible = this.framework.getState("cartVisible");
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return this.framework.createVElement("div", { class: "shopping-cart" }, [
      this.framework.createVElement(
        "button",
        {
          class: "cart-toggle",
          onClick: () => this.toggleCart(),
        },
        [`Panier (${totalItems})`]
      ),

      cartVisible
        ? this.framework.createVElement("div", { class: "cart-dropdown" }, [
            ...cartItems.map((item) =>
              this.framework.createVElement("div", { class: "cart-item" }, [
                `${item.name} x ${item.quantity}`,
              ])
            ),
            cartItems.length === 0
              ? this.framework.createVElement("p", {}, ["Panier vide"])
              : this.framework.createVElement(
                  "button",
                  {
                    onClick: () => this.checkout(),
                  },
                  ["Commander"]
                ),
          ])
        : this.framework.createVElement("div", {}),
    ]);
  }

  checkout() {
    // Logique de commande...
    alert("Commande passée !");
    this.framework.setState("cartItems", []);
    this.framework.setState("cartVisible", false);
  }
}
```
