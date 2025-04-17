import { watch, onMounted } from "vue";

export function useTodo(store) {
  const todoKey = "todos";
  const archiveKey  = "archived";
  onMounted(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        store.setTodos(parsedTodos);
      } catch (e) {
        console.error("Invalid todos data:", e);
      }
    }

    const savedArchived = localStorage.getItem("archived");
    if (savedArchived) {
      try {
        const parsedArchived = JSON.parse(savedArchived);
        store.archived = parsedArchived;
      } catch (e) {
        console.error("Invalid archived data:", e);
      }
    }
  });

  watch(
    () => store.todos,
    (newVal) => {
      localStorage.setItem(todoKey, JSON.stringify(newVal));
    },
    { deep: true }
  );

  watch(
    () => store.archived,
    (newVal) => {
      localStorage.setItem(archiveKey, JSON.stringify(newVal));
    },
    { deep: true }
  );
}
