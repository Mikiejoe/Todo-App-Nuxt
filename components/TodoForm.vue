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
                <button type="submit" class="bg-green-500 px-2 rounded-md">{{ editing ? "Update" : "Create" }}</button>
                <button @click.prevent="close" class="bg-red-500 p-2 rounded-md">Cancel</button>
            </div>
        </form>
    </div>
</template>


<script setup>

const name = ref('')
const description = ref('')
const props = defineProps({
    isOpen: Boolean,
    todo: Object,
})

watch(() => props.todo, (newTodo) => {
    if (newTodo) {
        name.value = newTodo.name
        description.value = newTodo.description
    } else {
        name.value = ''
        description.value = ''
    }
}, { immediate: true })

function close() {
    emit('close')
}

const editing = computed(() => props.todo !== null)


const emit = defineEmits(['close'])



</script>
