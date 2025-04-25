<script setup>
definePageMeta({
    layout: false
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const supabase = useSupabaseClient()

async function onSubmit() {
    console.log("hello")
    errorMessage.value = '' // Clear any previous error messages
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) {
            console.error('Login failed:', error.message)
            errorMessage.value = error.message
        } else {
            console.log('Login success:', data)
            router.push('/')
        }
    } catch (err) {
        console.error('Unexpected error:', err)
        errorMessage.value = 'Something went wrong. Please try again.'
    }
}
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="bg-gray-100 p-0 w-full m-6 sm:m-0 md:p-6 rounded-md shadow-md flex flex-col md:w-1/3">
            <h1 class="text-2xl font-semibold mb-4 text-center text-gray-800">Login</h1>
            <div v-if="errorMessage" class="text-white text-center bg-red-300 p-2 rounded-md text-sm my-2">{{ errorMessage }}</div>
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
                <div class="flex items-center justify-between mb-4">
                    <label class="flex items-center text-sm text-gray-600">
                        <input type="checkbox"
                            class="form-checkbox h-4 w-4 text-orange-500 focus:outline-none focus:shadow-outline mr-2">
                        Remember me
                    </label>
                    <NuxtLink to="#"
                        class="inline-block align-baseline font-semibold text-sm text-orange-500 hover:text-orange-800">
                        Forgot Password?
                    </NuxtLink>
                </div>
                <div class="mb-4">
                    <button type="submit" @click="onSubmit"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Login
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
