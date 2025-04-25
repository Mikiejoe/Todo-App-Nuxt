<script setup>

const todoStore = useTodoStore()

const isFormOpen = ref(false)
const todos = ref([])
const loading = ref(true)

async function getTodos() {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    try {
        const { data, error } = await supabase.from('archived').select("*").eq("user", user.value.id)
        if (error) throw error
        todoStore.setArchivedTodos(data)
        todos.value = todoStore.$state.archived
        return
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getTodos()
    loading.value = false
})

function showForm() {
    isFormOpen.value = !isFormOpen.value
}

useSeoMeta({
    title: 'Lets Do It || My Archived TODOS',
    description: 'Todo app made with nuxt',
})
</script>

<template>
    <div class="w-full h-full bg-white rounded-md flex flex-col bg-gray- relative">

        <div class="h-full w-full bg- flex flex-row">
            <div class="md:m-4 m-2 bg-white shadow-md w-full p-4 rounded-md">
                <div class="w-full ">
                    <div class="flex justify-end">
                        <button @click="showForm"
                            class=" bg-green-500 px-4 py-2 rounded-md text-white  sm:text-lg md:text-xl">
                            +Add Todo
                        </button>
                    </div>
                </div>
                <div v-if="loading" class="text-xl mt-5 flex items-center justify-center">
                    Loading Archived Todos
                </div>
                <div v-else>

                    <div v-if="todos.length < 1" class="text-xl mt-5 flex items-center justify-center">
                        No Archived Todos Found
                    </div>
                    <div v-else v-for="todo in todos">
                        <TodoItem :todo="todo" @open="showForm" @get="getTodos" />
                    </div>
                </div>
            </div>
        </div>
        <TodoForm :isOpen="isFormOpen" @close="showForm" />
    </div>
</template>
