<script setup>
definePageMeta({
    layout: false
})

const email = ref('')
const password = ref('')
const cpassword = ref('')
const errorMessage = ref('')
const loading = ref(false) // Add loading ref

const supabase = useSupabaseClient()

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function onSubmit() {
    loading.value = true // Set loading to true on submit
    errorMessage.value = ''

    if (!isValidEmail(email.value)) {
        errorMessage.value = "Please enter a valid email address";
        loading.value = false;
        return;
    }

    if (password.value.length < 8) {
        errorMessage.value = "Password should be 8 or more characters";
        loading.value = false;
        return;
    }

    if (password.value !== cpassword.value) {
        errorMessage.value = "Passwords don't match";
        loading.value = false;
        return;
    }

    try {
        const { error, data } = await supabase.auth.signUp({ email: email.value, password: password.value })
        if (error) {
            errorMessage.value = error.message;
        }
        else {
            console.log(data.user.email);
            // Optionally redirect the user or show a success message
        }
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        loading.value = false // Set loading to false after the operation completes
    }
}
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="bg-gray-100 p-3 md:p-6 rounded-md shadow-md flex flex-col md:w-1/3">
            <h1 class="text-2xl font-semibold mb-4 text-center text-gray-800">Register</h1>
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
                <div class="mb-6">
                    <label for="cpassword" class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input type="password" id="cpassword" placeholder="Confirm Password" required v-model="cpassword"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="flex items-center justify-between mb-4">
                    <label class="flex items-center text-sm text-gray-600">
                        <input type="checkbox"
                            class="form-checkbox h-4 w-4 text-orange-500 focus:outline-none focus:shadow-outline mr-2">
                        Remember me
                    </label>
                    <NuxtLink to="/auth/forgot-password"
                        class="inline-block align-baseline font-semibold text-sm text-orange-500 hover:text-orange-800">
                        Forgot Password?
                    </NuxtLink>
                </div>
                <div class="mb-4">
                    <button type="submit" :disabled="loading"
                        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        {{ loading ? 'Registering...' : 'Register' }}
                    </button>
                </div>
                <div class="mb-4">
                    Have an account?
                    <NuxtLink to="/auth/login"
                        class="inline-block align-baseline font-semibold text-sm text-orange-500 hover:text-orange-800">
                        Login
                    </NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>