<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

// Nuxt global state for login status
const isLoggedIn = useState('isLoggedIn', () => false) // Initialize to false

// const API_URL = 'http://localhost:8000' 
const API_URL = useRuntimeConfig().public.apiBase

const login = async () => {
    error.value = ''
    isLoading.value = true

    if (!username.value || !password.value) {
        error.value = 'Please enter both username and password.'
        isLoading.value = false
        return
    }

    try {
        const response = await axios.post(`${API_URL}login`, {
            username: username.value,
            password: password.value
        });

        console.log(API_URL)
        console.log('Login response:', response.data);

        if (response.data && response.data.message === 'Login successful') {
            localStorage.setItem('isLogin', 'true'); // Update local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            isLoggedIn.value = true; // Update Nuxt state to logged in
            console.log('Login status set:', localStorage.getItem('isLogin'));

            // Redirect to /admin using navigateTo
            return navigateTo('/admin');
        } else {
            error.value = 'Unexpected response from server.';
        }
    } catch (err) {
        console.error('Login error:', err);
        if (err.response) {
            if (err.response.status === 401) {
                error.value = 'Invalid credentials. Please try again.';
            } else {
                error.value = `Server error: ${err.response.data.message || 'Unknown error'}`;
            }
        } else {
            error.value = 'An unexpected error occurred. Please try again.';
        }
    } finally {
        isLoading.value = false;
    }
}
</script>
<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <h2>SERVF ADMIN</h2>
        </div>
    </div>
    <form @submit.prevent="login">
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Username</v-label>
                <v-text-field variant="outlined" v-model="username" class="pwdInput" hide-details color="primary"
                    :disabled="isLoading" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Password</v-label>
                <v-text-field variant="outlined" v-model="password" class="border-borderColor" type="password"
                    hide-details color="primary" :disabled="isLoading" required></v-text-field>
            </v-col>
            <v-col cols="12" v-if="error">
                <v-alert type="error" dense>{{ error }}</v-alert>
            </v-col>
            <v-col cols="12">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit"
                    :loading="isLoading" :disabled="isLoading">
                    Sign In
                </v-btn>
            </v-col>
        </v-row>
    </form>
</template>
