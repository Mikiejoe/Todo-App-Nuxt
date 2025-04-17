// stores/todoStore.js
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    archived: [],
  }),
  actions: {
    setTodos(payload) {
      this.todos = payload;
    },

    addTodo(todo) {
      const newTodo = { ...todo, id: this.todos.length + 1, status: "pending" };
      this.todos.push(newTodo);
    },

    addTodoToArchive(todo) {
      const newTodo = {
        ...todo,
        status: "archived",
      };
      this.archived.push(newTodo);
      this.deleteTodo(todo.id);
    },

    getTodos() {
      return this.todos;
    },

    getArchivedTodos() {
      return this.archived;
    },

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    removeFromArchive(id) {
      this.archived = this.archived.filter((todo) => todo.id !== id);
    },
  },
});
