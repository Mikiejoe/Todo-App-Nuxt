<script setup>

const todoStore = useTodoStore()


const todos = ref([])
const loading = ref(true)

function getTodos() {
    todos.value = todoStore.$state.todos
}

onMounted(() => {
    getTodos()
    loading.value = false
})

const isFormOpen = ref(false)

function showForm() {
    isFormOpen.value = !isFormOpen.value
}

useSeoMeta({
  title: 'Lets Do It || My TODOS',
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
                    Loading Todos
                </div>
                <div v-else>

                    <div v-if="todos.length < 1" class="text-xl mt-5 flex items-center justify-center">
                        No Todos Found
                    </div>
                    <div v-else v-for="todo in todos">
                        <TodoItem :todo="todo" @open="showForm" @get="getTodos"/>
                    </div>
                </div>
            </div>
        </div>
        <TodoForm :isOpen="isFormOpen" @close="showForm" />
    </div>
</template>
