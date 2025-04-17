<template>
    <div
        :class="['p-2 m-3 rounded-md flex flex-col md:flex-row justify-between', todo.status == 'pending' ? 'bg-yellow-200' : todo.status == 'completed' ? 'bg-green-300' : 'bg-red-300']">
        <div>
            <h3>{{ todo.name }}</h3>
            <p>{{ todo.description }}</p>
        </div>
        <div class="flex sm:flex-col items-center gap-4 justify-center">
            <p class="capitalize self-end">{{ todo.status }}</p>
            <div class="flex gap-2">
                <button class="bg-green-500  px-4 py-2 rounded-md" @click="open">Edit</button>
                <div v-if="todo.status === 'pending'" class="flex gap-2">
                    <button class="bg-green-500  px-2 rounded-md">Complete</button>
                    <button class="bg-red-500  p-2 rounded-md">Cancel</button>
                </div>
                <div v-else class="flex gap-2">
                    <button class="bg-red-500  px-4 py-2 rounded-md">Delete</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

const emit = defineEmits(['open'])

defineProps({
    todo: Object
})

function open() {
    emit('open')
}

</script>
