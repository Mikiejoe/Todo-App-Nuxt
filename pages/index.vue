<script setup>


const isFormOpen = ref(false)

const editingTodo = ref(null)

function showForm(todo = null) {
    editingTodo.value = todo
    isFormOpen.value = true
}


const todos = ref([
    {
        name: "Cook supper",
        id: 1,
        status: "pending",
        description: "Cook supper for me and my friends"
    },
    {
        name: "Cook supper",
        id: 1,
        status: "pending",
        description: "Cook supper for me and my friends"
    },
    {
        id: 2,
        name: "Cook supper",
        status: "completed",
        description: "Cook supper for me and my friends"
    },
    {
        id: 3,
        name: "Cook supper",
        status: "cancelled",
        description: "Cook supper for me and my friends"
    },
])

</script>

<template>
    <div class="w-full mx-auto h-[100vh] flex flex-col bg-gray- relative">
        <!-- navbar -->

        <div class="h-20 bg-gray-100 flex items-center py-4 shadow-md pl-12 sm:pl-16 md:pl-20">
            <h1 class="text-2xl font-bold text-orange-600">Lets Do This</h1>
        </div>
        <div class="h-full w-full bg- flex flex-row">
            <!-- sidebar -->

            <div class="w-1/4 bg-white shadow-sm hidden md:flex flex-col items-center p-4">
                <ul v-for="i, index in ['My Todos', 'Pending', 'Completed', 'Cancelled']" class="flex flex-col w-full">
                    <li
                        class="text-xl font-bold color bg-gray-300 text-orange-400 w-full text-center p-2 rounded-md mb-2">
                        {{ i }}
                    </li>
                </ul>
            </div>

            <div class="md:m-4 m-2 bg-white shadow-md md:w-3/4 p-4 rounded-md">
                <div class="flex justify-end"><button @click="showForm"
                        class=" bg-green-500 px-4 py-2 rounded-md text-white  sm:text-lg md:text-xl">+
                        Add Todo</button></div>
                <div v-for="todo in todos">
                    <TodoItem :todo="todo" @open="showForm(todo)" />
                </div>
            </div>

        </div>
        <TodoForm :isOpen="isFormOpen" :todo="editingTodo" @close="isFormOpen = false" />
    </div>
</template>
