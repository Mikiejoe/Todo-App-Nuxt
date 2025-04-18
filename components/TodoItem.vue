<template>
    <div :class="['p-2 m-3 rounded-md flex flex-col md:flex-row justify-between bg-gray-300']">
        <div>
            <h3>{{ todo.name }}</h3>
            <p>{{ todo.description }}</p>
        </div>
        <div class="flex sm:flex-col items-center gap-4 justify-center">
            <p class="capitalize self-end">{{ todo.status }}</p>
            <div class="flex gap-2 text-white items-center">
                    <button v-show="todo.status != 'archived'" class="bg-blue-500  px-4 py-2 rounded-md"
                        @click="addToArchive()">Archive</button>
                <button @click="deleteTodo" class="bg-red-500  px-4 py-2 rounded-md">Delete</button>
            </div>
        </div>

    </div>
</template>

<script setup>

const todoStore = useTodoStore()

const props = defineProps({
    todo: Object
})

function addToArchive() {
    todoStore.addTodoToArchive(props.todo)
    get()
}

function deleteTodo() {
    if (props.todo.status === "archived") {
        todoStore.removeFromArchive(props.todo.id)
    }
    else {
        todoStore.deleteTodo(props.todo.id)
    }
    get()
}

function get() {
    emit('get')
}



const emit = defineEmits(['get'])


</script>
