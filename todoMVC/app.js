import { Framework } from "../framework/framework.js";
import { Component } from "../framework/component.js";

class TodoApp extends Component {
  Mounting() {
    // Initialize state if not exists
    if (this.framework.getState("todos") === undefined) {
      // Try load from localStorage
      const raw = localStorage.getItem("miniframework_todos_v1");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          this.framework.setWState("todos", parsed);
        } catch (e) {
          this.framework.setWState("todos", []);
        }
      } else {
        this.framework.setWState("todos", []);
      }
    }
    if (this.framework.getState("newTodo") === undefined) {
      this.framework.setWState("newTodo", "");
    }
    if (this.framework.getState("filter") === undefined) {
      this.framework.setWState("filter", "all"); // all, active, completed
    }
    if (this.framework.getState("editingId") === undefined) {
      this.framework.setWState("editingId", null);
    }
    if (this.framework.getState("editingText") === undefined) {
      this.framework.setWState("editingText", "");
    }
  }

  // Helper methods
  saveTodos() {
    try {
      const todos = this.framework.getState("todos") || [];
      localStorage.setItem("miniframework_todos_v1", JSON.stringify(todos));
    } catch (e) {
      // ignore storage errors
    }
  }

  updateTodos(newTodos) {
    this.framework.setState("todos", newTodos);
    this.saveTodos();
  }

  addTodo(text) {
    if (!text.trim()) return;

    const todos = this.framework.getState("todos") || [];
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    this.updateTodos([...todos, newTodo]);
    this.framework.setState("newTodo", "");
  }

  deleteTodo(id) {
    const todos = this.framework.getState("todos") || [];
    this.updateTodos(todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id) {
    const todos = this.framework.getState("todos") || [];
    this.updateTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  toggleAll() {
    const todos = this.framework.getState("todos") || [];
    const allCompleted = todos.every((todo) => todo.completed);

    this.updateTodos(
      todos.map((todo) => ({ ...todo, completed: !allCompleted }))
    );
  }

  editTodo(id, text) {
    this.framework.setState("editingId", id);
    this.framework.setState("editingText", text);
  }

  saveEdit() {
    const editingId = this.framework.getState("editingId");
    const editingText = this.framework.getState("editingText");

    if (!editingText.trim()) {
      this.deleteTodo(editingId);
    } else {
      const todos = this.framework.getState("todos") || [];
      this.updateTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
        )
      );
    }

    this.framework.setState("editingId", null);
    this.framework.setState("editingText", "");
  }

  cancelEdit() {
    this.framework.setState("editingId", null);
    this.framework.setState("editingText", "");
  }

  clearCompleted() {
    const todos = this.framework.getState("todos") || [];
    this.updateTodos(todos.filter((todo) => !todo.completed));
  }

  getFilteredTodos() {
    const todos = this.framework.getState("todos") || [];
    const filter = this.framework.getState("filter");

    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  renderTodoItem(todo) {
    const editingId = this.framework.getState("editingId");
    const editingText = this.framework.getState("editingText");
    const isEditing = editingId === todo.id;

    if (isEditing) {
      return this.framework.createVElement(
        "li",
        {
          class: "editing",
        },
        [
          this.framework.createVElement("input", {
            class: "edit",
            value: editingText,
            onInput: (e) =>
              this.framework.setState("editingText", e.target.value),
            onKeyPress: (e) => {
              if (e.key === "Enter") {
                this.saveEdit();
              }
            },
            onKeyDown: (e) => {
              if (e.key === "Escape") {
                this.cancelEdit();
              }
            },
            onBlur: () => this.saveEdit(),
          }),
        ]
      );
    }

    return this.framework.createVElement(
      "li",
      {
        class: todo.completed ? "completed" : "",
      },
      [
        this.framework.createVElement("div", { class: "view" }, [
          this.framework.createVElement("input", {
            class: "toggle",
            type: "checkbox",
            checked: todo.completed,
            onChange: () => this.toggleTodo(todo.id),
          }),
          this.framework.createVElement(
            "label",
            {
              onDoubleClick: () => this.editTodo(todo.id, todo.text),
            },
            [todo.text]
          ),
          this.framework.createVElement("button", {
            class: "destroy",
            onClick: () => this.deleteTodo(todo.id),
          }),
        ]),
      ]
    );
  }

  renderMain() {
    const todos = this.framework.getState("todos") || [];
    const filteredTodos = this.getFilteredTodos();

    if (todos.length === 0) {
      return this.framework.createVElement("div", {});
    }

    const allCompleted =
      todos.length > 0 && todos.every((todo) => todo.completed);

    return this.framework.createVElement("section", { class: "main" }, [
      this.framework.createVElement("input", {
        id: "toggle-all",
        class: "toggle-all",
        type: "checkbox",
        checked: allCompleted,
        onChange: () => this.toggleAll(),
      }),
      this.framework.createVElement("label", { for: "toggle-all" }),
      this.framework.createVElement(
        "ul",
        { class: "todo-list" },
        filteredTodos.map((todo) => this.renderTodoItem(todo))
      ),
    ]);
  }

  renderFooter() {
    const todos = this.framework.getState("todos") || [];
    const filter = this.framework.getState("filter");

    if (todos.length === 0) {
      return this.framework.createVElement("div", {});
    }

    const activeCount = todos.filter((todo) => !todo.completed).length;
    const completedCount = todos.filter((todo) => todo.completed).length;
    const itemText = activeCount === 1 ? "item" : "items";

    return this.framework.createVElement("footer", { class: "footer" }, [
      this.framework.createVElement("span", { class: "todo-count" }, [
        this.framework.createVElement("strong", {}, [activeCount.toString()]),
        ` ${itemText} left`,
      ]),
      this.framework.createVElement("ul", { class: "filters" }, [
        this.framework.createVElement("li", {}, [
          this.framework.createVElement(
            "a",
            {
              href: "#/",
              class: filter === "all" ? "selected" : "",
              onClick: (e) => {
                e.preventDefault();
                this.framework.setState("filter", "all");
              },
            },
            ["All"]
          ),
        ]),
        this.framework.createVElement("li", {}, [
          this.framework.createVElement(
            "a",
            {
              href: "#/active",
              class: filter === "active" ? "selected" : "",
              onClick: (e) => {
                e.preventDefault();
                this.framework.setState("filter", "active");
              },
            },
            ["Active"]
          ),
        ]),
        this.framework.createVElement("li", {}, [
          this.framework.createVElement(
            "a",
            {
              href: "#/completed",
              class: filter === "completed" ? "selected" : "",
              onClick: (e) => {
                e.preventDefault();
                this.framework.setState("filter", "completed");
              },
            },
            ["Completed"]
          ),
        ]),
      ]),
      completedCount > 0
        ? this.framework.createVElement(
            "button",
            {
              class: "clear-completed",
              onClick: () => this.clearCompleted(),
            },
            ["Clear completed"]
          )
        : this.framework.createVElement("span", {}),
    ]);
  }

  getVDom() {
    const newTodo = this.framework.getState("newTodo") || "";

    return this.framework.createVElement("div", {}, [
      this.framework.createVElement("h1", {}, ["todos"]),
      this.framework.createVElement("input", {
        class: "new-todo",
        placeholder: "What needs to be done?",
        value: newTodo,
        onInput: (e) => this.framework.setState("newTodo", e.target.value),
        onKeyPress: (e) => {
          if (e.key === "Enter") {
            this.addTodo(newTodo);
          }
        },
      }),
      this.renderMain(),
      this.renderFooter(),
    ]);
  }
}

// Initialize the TodoMVC app
const app = new Framework();
app.route("/", TodoApp);
app.start();

// Make available globally for debugging
window.app = app;
