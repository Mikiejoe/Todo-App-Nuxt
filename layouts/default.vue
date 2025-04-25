<template>
    <div class="w-full mx-auto h-[100vh] flex flex-col bg-gray- relative">
        <!-- navbar -->

        <div class="h-20 bg-gray-100 flex items-center justify-between py-4 shadow-md px-12 sm:px-16 md:px-20">
            <h1 class="text-2xl font-bold text-orange-600">Lets Do This</h1>
            <button @click="logout" class="bg-orange-500 px-2 py-1 rounded-md text-white">Logout</button>
        </div>
        <div class="h-full w-full bg- flex flex-row">
            <!-- sidebar -->

            <div class="w-1/4 bg-white shadow-sm flex md:flex flex-col items-center md:p-4 px-1">
                <ul class="flex flex-col w-full">
                    <NuxtLink to="/"
                        class="md:text-xl text-md font-semibold md:font-bold color bg-gray-300 text-orange-400 w-full text-center p-2 rounded-md mb-2">
                        My Todos
                    </NuxtLink>
                    <NuxtLink to="archived"
                        class="md:text-xl text-md font-semibold md:font-bold color bg-gray-300 text-orange-400 w-full text-center p-2 rounded-md mb-2">
                        Archived Todos
                    </NuxtLink>
                </ul>
            </div>


            <slot />
        </div>
    </div>
</template>

<script setup>


async function logout() {
    const client = useSupabaseClient()
    const { error } = await client.auth.signOut()
    if (error) return
    const router = useRouter()
    router.replace("/auth/login")
}
</script>
<style scoped>
.router-link-active {
    background-color: #3B82F6;
}
</style>