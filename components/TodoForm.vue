<template>
    <div :class="['absolute h-full w-full bg-black/60 flex justify-center items-center', isOpen ? '' : 'hidden']">
        <form class="bg-white p-4 rounded-md w-[90%] sm:w-[60%] md:w-[30%] flex flex-col space-y-4">
            <div class="flex justify-end text-xl">
                <button @click.prevent="close"
                    class="bg-gray-500 text-white p-2 rounded-full w-10 h-10 text-center flex items-center justify-center">
                    X
                </button>
            </div>
            <div class="flex flex-col gap-2">
                <label for="name">Name</label>
                <input v-model="name" type="text" placeholder="Name of the todo"
                    class="focus:outline-none border-orange-300 p-2 border rounded-md" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="description">Description</label>
                <input v-model="description" type="text" placeholder="Todo description"
                    class="focus:outline-none border-orange-300 p-2 border rounded-md" />
            </div>
            <div class="flex justify-end gap-4">
                <button type="submit" @click.prevent="addTodo" class="bg-green-500 px-2 rounded-md">Create</button>
                <button @click.prevent="close" class="bg-red-500 p-2 rounded-md">Cancel</button>
            </div>
        </form>
    </div>
</template>


<script setup>
import { useTodo } from '../composables/useTodo'



const todoStore = useTodoStore()
useTodo(todoStore)
const name = ref('')
const description = ref('')
const props = defineProps({
    isOpen: Boolean,
    todo: Object,
})


function addTodo() {
    if (!name.value && !description.value && !name.value.length > 5 && !description.value.length > 5) {
        return
    }
    const todo = {
        name: name.value,
        description: description.value
    }
    todoStore.addTodo(todo)
    close()
}


function close() {
    emit('close')
}



const emit = defineEmits(['close'])


</script>
