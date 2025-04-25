export default function useTodos() {
  const todoStore = useTodoStore();
  const todos = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const archiving = ref(false);
  const deleting = ref(false);

  async function getTodos(table = "todos") {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    loading.value = true;
    error.value = null;

    try {
      const { data, error: supabaseError } = await supabase
        .from(table)
        .select("*")
        .eq("user", user.value.id);

      if (supabaseError) {
        throw supabaseError;
      }

      todoStore.setTodos(data);
      todos.value = todoStore.$state.todos;
    } catch (err) {
      error.value =
        err.message || "An unexpected error occurred while fetching todos.";
    } finally {
      loading.value = false;
    }
  }

  async function archiveTodo(todo) {
    if (!todo || !todo.id) {
      return;
    }
    archiving.value = true;
    error.value = null;
    const client = useSupabaseClient();

    try {
      const { error: insertError } = await client
        .from("archived")
        .insert({ ...todo, status: "archived" });

      if (insertError) throw insertError;

      todoStore.addTodoToArchive(todo);
      const { error: deleteError } = await client
        .from("todos")
        .delete()
        .eq("id", todo.id);

      if (deleteError) throw deleteError;

      archiving.value = false;
    } catch (err) {
      error.value = err.message || "Error archiving todo.";
    } finally {
      archiving.value = false;
    }
  }

  async function deleteTodo(todo) {
    if (!todo || !todo.id) {
      console.error("Error: Invalid todo object provided for deletion: ", todo);
      return;
    }
    deleting.value = true;
    error.value = null;
    const client = useSupabaseClient();

    try {
      if (todo.status === "archived") {
        const { error: deleteArchivedError } = await client
          .from("archived")
          .delete()
          .eq("id", todo.id);

        if (deleteArchivedError) throw deleteArchivedError;
        todoStore.removeFromArchive(todo.id);
      } else {
        const { error: deleteTodoError } = await client
          .from("todos")
          .delete()
          .eq("id", todo.id);

        if (deleteTodoError) throw deleteTodoError;
        todoStore.deleteTodo(todo.id);
      }

      getTodos();
    } catch (err) {
      error.value = err.message || "Error deleting todo.";
      console.error("Error deleting todo:", error.value);
    } finally {
      deleting.value = false;
    }
  }

  return {
    todos,
    loading,
    error,
    archiving,
    deleting,
    getTodos,
    archiveTodo,
    deleteTodo,
  };
}
