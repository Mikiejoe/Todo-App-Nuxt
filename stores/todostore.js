import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
    archived: [],
  }),
  actions: {
    setTodos(payload) {
      console.log("payload: ", payload);
      this.todos = payload;
    },
    setArchivedTodos(payload) {
      console.log("payload: ", payload);
      this.archived = payload;
    },

    addTodo(todo) {
      this.todos.push(todo);
    },

    addTodoToArchive(todo) {
      this.archived.push(todo);
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
