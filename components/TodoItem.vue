<template>
    <div :class="['p-2 m-3 rounded-md flex flex-col md:flex-row justify-between bg-gray-300']">
        <div>
            <h3>{{ todo.name }}</h3>
            <p>{{ todo.description }}</p>
        </div>
        <div class="flex sm:flex-col items-center gap-4 justify-center">
            <div class="flex gap-2 justify-end w-full text-white items-center">
                <button :disabled="archiving" v-show="todo.status != 'archived'"
                    class="bg-blue-500  px-4 py-2 rounded-md" @click="addToArchive()">{{ archiving ? "Archiving" :
                        "Archive" }}</button>
                <button @click="deleteTodo" class="bg-red-500  px-4 py-2 rounded-md">{{ deleting ? "Deleting" : "Delete"
                    }}</button>
            </div>
        </div>

    </div>
</template>
<script setup>

const emit = defineEmits(['getTodos']);
const router = useRouter()
const props = defineProps({
    todo: Object,
});

const { archiveTodo: archive, deleteTodo: remove, archiving, deleting } = useTodos();

async function addToArchive() {
    await archive(props.todo);
    emit('getTodos');

}

async function deleteTodo() {
    await remove(props.todo);
    console.log("router.currentRoute ", router.currentRoute.value.path)
    if (router.currentRoute.value.path === "/archived") {
        emit('getTodos', ["archived"]);
        return
    }
    emit('getTodos');
}
</script>