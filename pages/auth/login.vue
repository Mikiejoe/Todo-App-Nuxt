<script setup>
definePageMeta({
    layout: false
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()
const loading = ref(false)
const { login } = useAuth()

async function onSubmit() {
    errorMessage.value = ''
    loading.value = true
    const { error } = login(email.value, password.value)
    if (error) {
        errorMessage.value = error
        loading.value = false
    }
    else {
        successMessage.value = "Login successful"
        loading.value = false
        router.push("/")
    }
}


useSeoMeta({
    title: 'Lets Do It || Login',
    description: 'Todo app made with nuxt',
})

</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="bg-gray-100 p-0 w-full m-6 sm:m-0 md:p-6 rounded-md shadow-md flex flex-col md:w-1/3">
            <h1 class="text-2xl font-semibold mb-4 text-center text-gray-800">Login</h1>
            <div v-if="errorMessage" class="text-white text-center bg-red-300 p-2 rounded-md text-sm my-2">{{
                errorMessage }}</div>
            <div v-if="successMessage" class="text-white text-center bg-green-300 p-2 rounded-md text-sm my-2">{{
                successMessage }}</div>
            <form @submit.prevent="onSubmit" class="w-full">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" placeholder="Email Address" required v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" placeholder="Password" required v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <button type="submit" :disabled="loading"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        {{ loading ? 'Loading...' : 'Login' }}
                    </button>
                </div>
                <div class="mb-4">
                    Don't have an account?
                    <NuxtLink to="/auth/register"
                        class="inline-block align-baseline font-semibold text-sm text-orange-500 hover:text-orange-800">
                        Register
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>
