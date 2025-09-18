import { Framework } from "./framework/framework.js";
import { Component } from "./framework/component.js";
import { getLocal, setLocal } from "./framework/storage.js";

/**
import { Framework } from "./framework/framework.js";
import { Component } from "./framework/component.js";
import { getLocal, setLocal } from "./framework/storage.js";

/**
 * NavigationComponent
 * Simple top navigation for demo routes.
 * @extends Component
 */
class NavigationComponent extends Component {
  /** @returns {Object} Virtual DOM for the navigation */
  getVDom() {
    return this.framework.createVElement("div", { class: "nav" }, [
      this.framework.createVElement(
        "a",
        {
          href: "#",
          class: "nav-item",
          onClick: (e) => {
            e.preventDefault();
            this.framework.navigateTo("/");
          },
        },
        [this.framework.createVElement("i", { class: "fas fa-home" }), "Home"]
      ),
      this.framework.createVElement(
        "a",
        {
          href: "#",
          class: "nav-item",
          onClick: (e) => {
            e.preventDefault();
            this.framework.navigateTo("/counter");
          },
        },
        [
          this.framework.createVElement("i", { class: "fas fa-calculator" }),
          "Counter",
        ]
      ),
      this.framework.createVElement(
        "a",
        {
          href: "#",
          class: "nav-item",
          onClick: (e) => {
            e.preventDefault();
            this.framework.navigateTo("/form");
          },
        },
        [this.framework.createVElement("i", { class: "fas fa-edit" }), "Form"]
      ),
      this.framework.createVElement(
        "a",
        {
          href: "#",
          class: "nav-item",
          onClick: (e) => {
            e.preventDefault();
            this.framework.navigateTo("/todo");
          },
        },
        [this.framework.createVElement("i", { class: "fas fa-tasks" }), "Todo"]
      ),
      this.framework.createVElement(
        "a",
        {
          href: "#",
          class: "nav-item",
          onClick: (e) => {
            e.preventDefault();
            this.framework.navigateTo("/dashboard");
          },
        },
        [
          this.framework.createVElement("i", { class: "fas fa-chart-bar" }),
          "Dashboard",
        ]
      ),
    ]);
  }
}

/**
 * HomeComponent
 * Landing page showcasing the micro-framework features.
 * @extends Component
 */
class HomeComponent extends Component {
  /** @returns {Object} Virtual DOM for the home page */
  getVDom() {
    return this.framework.createVElement("div", {}, [
      new NavigationComponent(this.framework).getVDom(),

      this.framework.createVElement("div", { class: "content-card" }, [
        this.framework.createVElement("h1", {}, ["🚀 Mini Framework"]),
        this.framework.createVElement(
          "p",
          {
            style:
              "text-align: center; font-size: 1.2rem; margin-bottom: 40px; opacity: 0.9;",
          },
          [
            "A modern JavaScript framework with Virtual DOM, routing and state management",
          ]
        ),

        this.framework.createVElement("div", { class: "feature-grid" }, [
          this.framework.createVElement("div", { class: "feature-card" }, [
            this.framework.createVElement("i", {
              class: "feature-icon fas fa-code",
            }),
            this.framework.createVElement("h3", {}, ["Virtual DOM"]),
            this.framework.createVElement("p", {}, [
              "Optimized diff and patch for maximum performance",
            ]),
          ]),

          this.framework.createVElement("div", { class: "feature-card" }, [
            this.framework.createVElement("i", {
              class: "feature-icon fas fa-route",
            }),
            this.framework.createVElement("h3", {}, ["SPA Routing"]),
            this.framework.createVElement("p", {}, [
              "Smooth navigation with back-button support",
            ]),
          ]),

          this.framework.createVElement("div", { class: "feature-card" }, [
            this.framework.createVElement("i", {
              class: "feature-icon fas fa-database",
            }),
            this.framework.createVElement("h3", {}, ["State Management"]),
            this.framework.createVElement("p", {}, [
              "Centralized state with automatic re-render",
            ]),
          ]),

          this.framework.createVElement("div", { class: "feature-card" }, [
            this.framework.createVElement("i", {
              class: "feature-icon fas fa-mouse-pointer",
            }),
            this.framework.createVElement("h3", {}, ["Event Handling"]),
            this.framework.createVElement("p", {}, [
              "Custom, optimized event system",
            ]),
          ]),

          this.framework.createVElement("div", { class: "feature-card" }, [
            this.framework.createVElement("i", {
              class: "feature-icon fas fa-shield-alt",
            }),
            this.framework.createVElement("h3", {}, ["Security"]),
            this.framework.createVElement("p", {}, [
              "Simple principles to keep components predictable",
            ]),
          ]),

          this.framework.createVElement("div", { class: "feature-card" }, [
            this.framework.createVElement("i", {
              class: "feature-icon fas fa-smile",
            }),
            this.framework.createVElement("h3", {}, ["UX & Styles"]),
            this.framework.createVElement("p", {}, [
              "Styled, consistent components for a better experience",
            ]),
          ]),
        ]),
      ]),
    ]);
  }
}

/**
 * CounterComponent
 * Demo component for simple state management.
 * @extends Component
 */
class CounterComponent extends Component {
  /** Initialize `counter` state if missing */
  Mounting() {
    if (this.framework.getState("counter") === undefined) {
      this.framework.setWState("counter", 0);
    }
  }

  getVDom() {
    const counter = this.framework.getState("counter") || 0;

    return this.framework.createVElement("div", {}, [
      new NavigationComponent(this.framework).getVDom(),

      this.framework.createVElement("div", { class: "content-card" }, [
        this.framework.createVElement("h1", {}, ["🔢 Counter Pro"]),

        this.framework.createVElement("div", { class: "counter-display" }, [
          String(counter),
        ]),

        this.framework.createVElement(
          "div",
          {
            style:
              "display: flex; justify-content: center; flex-wrap: wrap; gap: 15px;",
          },
          [
            this.framework.createVElement(
              "button",
              {
                class: "modern-btn",
                onClick: () => this.framework.setState("counter", counter + 1),
              },
              [
                this.framework.createVElement("i", { class: "fas fa-plus" }),
                " +1",
              ]
            ),

            this.framework.createVElement(
              "button",
              {
                class: "modern-btn",
                onClick: () => this.framework.setState("counter", counter + 10),
              },
              [
                this.framework.createVElement("i", {
                  class: "fas fa-angle-double-up",
                }),
                " +10",
              ]
            ),

            this.framework.createVElement(
              "button",
              {
                class: "modern-btn",
                onClick: () => this.framework.setState("counter", counter - 1),
              },
              [
                this.framework.createVElement("i", { class: "fas fa-minus" }),
                " -1",
              ]
            ),

            this.framework.createVElement(
              "button",
              {
                class: "modern-btn",
                onClick: () => this.framework.setState("counter", counter - 10),
              },
              [
                this.framework.createVElement("i", {
                  class: "fas fa-angle-double-down",
                }),
                " -10",
              ]
            ),

            this.framework.createVElement(
              "button",
              {
                class: "modern-btn",
                onClick: () => this.framework.setState("counter", 0),
              },
              [
                this.framework.createVElement("i", { class: "fas fa-redo" }),
                " Reset",
              ]
            ),
          ]
        ),

        this.framework.createVElement(
          "div",
          { style: "margin-top: 30px; text-align: center; font-size: 1.1rem;" },
          [
            counter === 0
              ? "🎯 Ready to count!"
              : counter > 0
                ? `🚀 Positive: +${counter}`
                : `📉 Negative: ${counter}`,
          ]
        ),
      ]),
    ]);
  }
}

/**
 * FormComponent
 * Example contact form with local validation and simulated submission.
 * @extends Component
 */
class FormComponent extends Component {
  /** Initialize form state if missing */
  Mounting() {
    if (this.framework.getState("formData") === undefined) {
      this.framework.setWState("formData", {
        name: "",
        email: "",
        message: "",
        skills: [],
      });
    }
    if (this.framework.getState("submissionStatus") === undefined) {
      this.framework.setWState("submissionStatus", null);
    }
  }

  /**
   * Update a form field in the central state.
   * @param {string} field - Field name
   * @param {any} value - New value
   */
  updateField(field, value) {
    const formData = this.framework.getState("formData") || {};
    this.framework.setState("formData", { ...formData, [field]: value });
  }

  /** Simulate form submission and update status */
  submitForm() {
    const formData = this.framework.getState("formData");
    this.framework.setState("submissionStatus", "loading");

    setTimeout(() => {
      this.framework.setState("submissionStatus", "success");
      setTimeout(() => {
        this.framework.setState("submissionStatus", null);
        this.framework.setState("formData", {
          name: "",
          email: "",
          message: "",
          skills: [],
        });
      }, 3000);
    }, 2000);
  }

  /** Toggle presence of a skill in the selection */
  toggleSkill(skill) {
    const formData = this.framework.getState("formData") || {};
    const skills = formData.skills || [];
    const has = skills.includes(skill);
    const newSkills = has
      ? skills.filter((s) => s !== skill)
      : [...skills, skill];
    this.framework.setState("formData", { ...formData, skills: newSkills });
  }

  /** @returns {Object} Virtual DOM for the form */
  getVDom() {
    const formData = this.framework.getState("formData") || {};
    const status = this.framework.getState("submissionStatus");

    return this.framework.createVElement("div", {}, [
      new NavigationComponent(this.framework).getVDom(),

      this.framework.createVElement("div", { class: "content-card" }, [
        this.framework.createVElement("h1", {}, ["📝 Contact Form"]),

        this.framework.createVElement(
          "div",
          { style: "max-width: 600px; margin: 0 auto;" },
          [
            this.framework.createVElement(
              "div",
              { style: "margin-bottom: 20px;" },
              [
                this.framework.createVElement(
                  "label",
                  {
                    style:
                      "display: block; margin-bottom: 8px; font-weight: 500;",
                  },
                  ["👤 Full name"]
                ),
                this.framework.createVElement("input", {
                  class: "modern-input",
                  type: "text",
                  value: formData.name || "",
                  placeholder: "Your name...",
                  onInput: (e) => this.updateField("name", e.target.value),
                }),
              ]
            ),

            this.framework.createVElement(
              "div",
              { style: "margin-bottom: 20px;" },
              [
                this.framework.createVElement(
                  "label",
                  {
                    style:
                      "display: block; margin-bottom: 8px; font-weight: 500;",
                  },
                  ["📧 Email"]
                ),
                this.framework.createVElement("input", {
                  class: "modern-input",
                  type: "email",
                  value: formData.email || "",
                  placeholder: "your@email.com",
                  onInput: (e) => this.updateField("email", e.target.value),
                }),
              ]
            ),

            this.framework.createVElement(
              "div",
              { style: "margin-bottom: 20px;" },
              [
                this.framework.createVElement(
                  "label",
                  {
                    style:
                      "display: block; margin-bottom: 8px; font-weight: 500;",
                  },
                  ["💬 Message"]
                ),
                this.framework.createVElement("textarea", {
                  class: "modern-input",
                  value: formData.message || "",
                  placeholder: "Your message...",
                  rows: "4",
                  style: "resize: vertical; min-height: 100px;",
                  onInput: (e) => this.updateField("message", e.target.value),
                }),
              ]
            ),

            this.framework.createVElement(
              "div",
              { style: "margin-bottom: 20px;" },
              [
                this.framework.createVElement(
                  "label",
                  {
                    style: "display:block; margin-bottom:8px; font-weight:500;",
                  },
                  ["Skills:"]
                ),
                ...["JavaScript", "HTML", "CSS", "Node", "TypeScript"].map(
                  (skill) =>
                    this.framework.createVElement(
                      "label",
                      {
                        style:
                          "display:flex; gap:8px; align-items:center; margin:6px 0;",
                      },
                      [
                        this.framework.createVElement("input", {
                          type: "checkbox",
                          checked: (formData.skills || []).includes(skill),
                          onChange: () => this.toggleSkill(skill),
                        }),
                        skill,
                      ]
                    )
                ),
              ]
            ),

            this.framework.createVElement(
              "div",
              { style: "text-align: center; margin-top: 30px;" },
              [
                status === "loading"
                  ? this.framework.createVElement("div", {}, [
                      this.framework.createVElement("div", {
                        class: "spinner",
                      }),
                      this.framework.createVElement("p", {}, ["Sending..."]),
                    ])
                  : status === "success"
                    ? this.framework.createVElement(
                        "div",
                        {
                          style:
                            "color: #4facfe; font-weight: 500; font-size: 1.1rem;",
                        },
                        [
                          this.framework.createVElement("i", {
                            class: "fas fa-check-circle",
                          }),
                          " Message sent successfully!",
                        ]
                      )
                    : this.framework.createVElement(
                        "button",
                        {
                          class: "modern-btn",
                          onClick: () => this.submitForm(),
                          disabled:
                            !formData.name ||
                            !formData.email ||
                            !formData.message,
                        },
                        [
                          this.framework.createVElement("i", {
                            class: "fas fa-paper-plane",
                          }),
                          " Send",
                        ]
                      ),
              ]
            ),
          ]
        ),

        this.framework.createVElement(
          "div",
          {
            style:
              "margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 15px;",
          },
          [
            this.framework.createVElement("h3", {}, ["📋 Data preview:"]),
            this.framework.createVElement(
              "pre",
              {
                style:
                  "background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; overflow-x: auto;",
              },
              [JSON.stringify(formData, null, 2)]
            ),
          ]
        ),
      ]),
    ]);
  }
}

/**
 * TodoDemoComponent
 * Simple Todo manager (CRUD) with local persistence.
 * @extends Component
 */
class TodoDemoComponent extends Component {
  /** Load initial state (todos, newTodo, filter) from storage */
  Mounting() {
    if (this.framework.getState("todos") === undefined) {
      const parsed = getLocal("miniframework_todos_v1");
      if (parsed) {
        this.framework.setWState("todos", parsed);
      } else {
        this.framework.setWState("todos", [
          { id: 1, text: "🎯 Learn the framework", completed: false },
          { id: 2, text: "🚀 Create an app", completed: true },
          { id: 3, text: "✨ Add animations", completed: false },
        ]);
      }
    }
    if (this.framework.getState("newTodo") === undefined) {
      this.framework.setWState("newTodo", "");
    }
    if (this.framework.getState("filter") === undefined) {
      this.framework.setWState("filter", "all");
    }
  }

  /** Persist todos list into storage */
  saveTodos() {
    try {
      const todos = this.framework.getState("todos") || [];
      setLocal("miniframework_todos_v1", todos);
    } catch (e) {
      // ignore
    }
  }

  /** Update the todos list in state and persist it. */
  updateTodos(newTodos) {
    this.framework.setState("todos", newTodos);
    this.saveTodos();
  }

  /** Add a new task if the input is not empty */
  addTodo() {
    const newTodo = this.framework.getState("newTodo") || "";
    if (!newTodo.trim()) return;
    const todos = this.framework.getState("todos") || [];
    const newId = Math.max(0, ...todos.map((t) => t.id)) + 1;

    this.updateTodos([
      ...todos,
      { id: newId, text: newTodo.trim(), completed: false },
    ]);
    this.framework.setState("newTodo", "");
  }

  /** Return the todos list filtered according to `filter` state */
  getFilteredTodos() {
    const todos = this.framework.getState("todos") || [];
    const filter = this.framework.getState("filter");

    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }

  /** @returns {Object} Virtual DOM for the Todo view */
  getVDom() {
    const newTodo = this.framework.getState("newTodo") || "";
    const filter = this.framework.getState("filter");
    const todos = this.framework.getState("todos") || [];
    const filteredTodos = this.getFilteredTodos();
    const completedCount = todos.filter((t) => t.completed).length;

    return this.framework.createVElement("div", {}, [
      new NavigationComponent(this.framework).getVDom(),

      this.framework.createVElement("div", { class: "content-card" }, [
        this.framework.createVElement("h1", {}, ["📋 Todo Manager Pro"]),

        this.framework.createVElement(
          "div",
          {
            style:
              "display: flex; justify-content: center; gap: 30px; margin-bottom: 30px;",
          },
          [
            this.framework.createVElement(
              "div",
              {
                style:
                  "text-align: center; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 15px;",
              },
              [
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2rem; font-weight: bold;" },
                  [String(todos.length)]
                ),
                this.framework.createVElement("div", {}, ["Total"]),
              ]
            ),
            this.framework.createVElement(
              "div",
              {
                style:
                  "text-align: center; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 15px;",
              },
              [
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2rem; font-weight: bold;" },
                  [String(todos.length - completedCount)]
                ),
                this.framework.createVElement("div", {}, ["Active"]),
              ]
            ),
            this.framework.createVElement(
              "div",
              {
                style:
                  "text-align: center; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 15px;",
              },
              [
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2rem; font-weight: bold;" },
                  [String(completedCount)]
                ),
                this.framework.createVElement("div", {}, ["Completed"]),
              ]
            ),
          ]
        ),

        this.framework.createVElement(
          "div",
          { style: "display: flex; gap: 15px; margin-bottom: 30px;" },
          [
            this.framework.createVElement("input", {
              class: "modern-input",
              type: "text",
              value: newTodo,
              placeholder: "New task...",
              style: "flex: 1;",
              onInput: (e) =>
                this.framework.setState("newTodo", e.target.value),
              onKeyPress: (e) => {
                if (e.key === "Enter") this.addTodo();
              },
            }),
            this.framework.createVElement(
              "button",
              { class: "modern-btn", onClick: () => this.addTodo() },
              [
                this.framework.createVElement("i", { class: "fas fa-plus" }),
                " Add",
              ]
            ),
          ]
        ),

        this.framework.createVElement(
          "div",
          {
            style:
              "display: flex; justify-content: center; gap: 10px; margin-bottom: 30px;",
          },
          [
            ["all", "All"],
            ["active", "Active"],
            ["completed", "Completed"],
          ].map(([filterKey, label]) =>
            this.framework.createVElement(
              "button",
              {
                class: "modern-btn",
                style: filter === filterKey ? "opacity: 1;" : "opacity: 0.6;",
                onClick: () => this.framework.setState("filter", filterKey),
              },
              [label]
            )
          )
        ),

        this.framework.createVElement(
          "div",
          {},
          filteredTodos.map((todo) =>
            this.framework.createVElement(
              "div",
              { class: `todo-item ${todo.completed ? "completed" : ""}` },
              [
                this.framework.createVElement(
                  "div",
                  {
                    style:
                      "display: flex; align-items: center; gap: 15px; flex: 1;",
                  },
                  [
                    this.framework.createVElement("input", {
                      type: "checkbox",
                      checked: todo.completed,
                      onChange: () =>
                        this.updateTodos(
                          todos.map((t) =>
                            t.id === todo.id
                              ? { ...t, completed: !t.completed }
                              : t
                          )
                        ),
                      style: "transform: scale(1.2);",
                    }),
                    this.framework.createVElement(
                      "span",
                      {
                        style: `font-size: 1.1rem; ${todo.completed ? "opacity: 0.6;" : ""}`,
                      },
                      [todo.text]
                    ),
                  ]
                ),
                this.framework.createVElement(
                  "button",
                  {
                    class: "delete-btn",
                    onClick: () =>
                      this.updateTodos(todos.filter((t) => t.id !== todo.id)),
                  },
                  [
                    this.framework.createVElement("i", {
                      class: "fas fa-trash",
                    }),
                  ]
                ),
              ]
            )
          )
        ),
      ]),
    ]);
  }
}

/**
 * DashboardComponent
 * Simple analytics cards and quick actions.
 * @extends Component
 */
class DashboardComponent extends Component {
  Mounting() {
    const s = this.framework.getState("stats");
    if (!s || typeof s !== "object") {
      this.framework.setWState("stats", {
        visitors: 1247,
        sales: 892,
        revenue: 45320,
        growth: 12.5,
      });
      return;
    }

    // Normalize numeric fields to avoid NaN from undefined or string values
    const normalized = {
      visitors: Number(s.visitors) || 0,
      sales: Number(s.sales) || 0,
      revenue: Number(s.revenue) || 0,
      growth: Number(s.growth) || 0,
    };
    this.framework.setWState("stats", normalized);
  }

  getVDom() {
    const stats = this.framework.getState("stats") || {};

    return this.framework.createVElement("div", {}, [
      new NavigationComponent(this.framework).getVDom(),

      this.framework.createVElement("div", { class: "content-card" }, [
        this.framework.createVElement("h1", {}, ["📊 Dashboard Analytics"]),

        this.framework.createVElement(
          "div",
          {
            style:
              "display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px;",
          },
          [
            this.framework.createVElement(
              "div",
              {
                style:
                  "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px; text-align: center; color: white;",
              },
              [
                this.framework.createVElement("i", {
                  class: "fas fa-users",
                  style: "font-size: 3rem; margin-bottom: 15px;",
                }),
                this.framework.createVElement(
                  "h3",
                  { style: "margin: 10px 0 5px 0;" },
                  ["Visitors"]
                ),
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2.5rem; font-weight: bold;" },
                  [stats.visitors?.toLocaleString() || "0"]
                ),
              ]
            ),

            this.framework.createVElement(
              "div",
              {
                style:
                  "background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 20px; text-align: center; color: white;",
              },
              [
                this.framework.createVElement("i", {
                  class: "fas fa-shopping-cart",
                  style: "font-size: 3rem; margin-bottom: 15px;",
                }),
                this.framework.createVElement(
                  "h3",
                  { style: "margin: 10px 0 5px 0;" },
                  ["Sales"]
                ),
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2.5rem; font-weight: bold;" },
                  [stats.sales?.toLocaleString() || "0"]
                ),
              ]
            ),

            this.framework.createVElement(
              "div",
              {
                style:
                  "background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; border-radius: 20px; text-align: center; color: white;",
              },
              [
                this.framework.createVElement("i", {
                  class: "fas fa-euro-sign",
                  style: "font-size: 3rem; margin-bottom: 15px;",
                }),
                this.framework.createVElement(
                  "h3",
                  { style: "margin: 10px 0 5px 0;" },
                  ["Revenue"]
                ),
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2.5rem; font-weight: bold;" },
                  [`${stats.revenue?.toLocaleString() || "0"}€`]
                ),
              ]
            ),

            this.framework.createVElement(
              "div",
              {
                style:
                  "background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 30px; border-radius: 20px; text-align: center; color: white;",
              },
              [
                this.framework.createVElement("i", {
                  class: "fas fa-chart-line",
                  style: "font-size: 3rem; margin-bottom: 15px;",
                }),
                this.framework.createVElement(
                  "h3",
                  { style: "margin: 10px 0 5px 0;" },
                  ["Growth"]
                ),
                this.framework.createVElement(
                  "div",
                  { style: "font-size: 2.5rem; font-weight: bold;" },
                  [`+${stats.growth || 0}%`]
                ),
              ]
            ),
          ]
        ),

        this.framework.createVElement(
          "div",
          {
            style:
              "background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px;",
          },
          [
            this.framework.createVElement("h2", {}, ["🎯 Quick actions"]),
            this.framework.createVElement(
              "div",
              {
                style:
                  "display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px;",
              },
              [
                this.framework.createVElement(
                  "button",
                  {
                    class: "modern-btn",
                    onClick: () => {
                      const s = this.framework.getState("stats") || {};
                      const newStats = {
                        visitors: Number(s.visitors) || 0,
                        sales: Number(s.sales) || 0,
                        revenue: Number(s.revenue) || 0,
                        growth: Number(s.growth) || 0,
                      };
                      const vDelta = Math.max(
                        1,
                        Math.floor(Math.random() * 100)
                      );
                      newStats.visitors += vDelta;
                      this.framework.setState("stats", newStats);
                    },
                  },
                  [
                    this.framework.createVElement("i", {
                      class: "fas fa-refresh",
                    }),
                    " Refresh visitors",
                  ]
                ),

                this.framework.createVElement(
                  "button",
                  {
                    class: "modern-btn",
                    onClick: () => {
                      const s = this.framework.getState("stats") || {};
                      const newStats = {
                        visitors: Number(s.visitors) || 0,
                        sales: Number(s.sales) || 0,
                        revenue: Number(s.revenue) || 0,
                        growth: Number(s.growth) || 0,
                      };
                      const saleDelta = Math.max(
                        1,
                        Math.floor(Math.random() * 10)
                      );
                      const revenueDelta = Math.max(
                        1,
                        Math.floor(Math.random() * 1000)
                      );
                      const prevRevenue = newStats.revenue;
                      newStats.sales += saleDelta;
                      newStats.revenue += revenueDelta;
                      newStats.growth =
                        prevRevenue > 0
                          ? Number(
                              (
                                ((newStats.revenue - prevRevenue) /
                                  prevRevenue) *
                                100
                              ).toFixed(1)
                            )
                          : 0;
                      this.framework.setState("stats", newStats);
                    },
                  },
                  [
                    this.framework.createVElement("i", {
                      class: "fas fa-plus",
                    }),
                    " Simulate sale",
                  ]
                ),

                this.framework.createVElement(
                  "button",
                  {
                    class: "modern-btn",
                    onClick: () => {
                      this.framework.setState("stats", {
                        visitors: 1247,
                        sales: 892,
                        revenue: 45320,
                        growth: 12.5,
                      });
                    },
                  },
                  [
                    this.framework.createVElement("i", {
                      class: "fas fa-undo",
                    }),
                    " Reset data",
                  ]
                ),
              ]
            ),
          ]
        ),
      ]),
    ]);
  }
}

const app = new Framework({ theme: "dark", notifications: [] });

app.route("/", HomeComponent);
app.route("/counter", CounterComponent);
app.route("/form", FormComponent);
app.route("/todo", TodoDemoComponent);
app.route("/dashboard", DashboardComponent);

app.start();

window.app = app;
