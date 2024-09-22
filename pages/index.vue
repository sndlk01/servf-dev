<script setup lang="ts">
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import Header from '@/layouts/header/Header.vue';
import HeroBanner from '@/components/custom-components/HeroBanner.vue';
import BuildFeature from '@/components/custom-components/BuildFeature.vue';
import Blog from '@/components/custom-components/BlogSection.vue';
import Testimonials from '@/components/custom-components/Testimonials.vue';
import Contact from '@/components/custom-components/Contact.vue';

const chatOpen = ref(false);
const name = ref('');
const email = ref('');
const message = ref('');
const submitStatus = ref('');

const toggleChat = () => {
    chatOpen.value = !chatOpen.value;
};

const submitForm = async () => {
    try {
        const templateParams = {
            from_name: name.value,
            from_email: email.value,
            message: message.value,
        };

        const response = await emailjs.send(
            'service_1o9sszw',
            'template_g2wmh2b',
            templateParams,
            'wLrtgS0s_mjQ5LMau'
        );

        if (response.status === 200) {
            submitStatus.value = 'Form submitted successfully';
            name.value = '';
            email.value = '';
            message.value = '';
            setTimeout(() => {
                chatOpen.value = false;
                submitStatus.value = '';
            }, 3000);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        submitStatus.value = 'Error submitting form. Please try again.';
    }
};
</script>

<template>
    <Header />
    <HeroBanner id="hero" />
    <Testimonials id="testimonials" />
    <BuildFeature id="features" />
    <Blog id="blog" />
    <Contact id="contact" />

    <!-- Fixed Chat Component -->
    <div class="chat-container" :class="{ 'chat-open': chatOpen }">
        <div v-if="!chatOpen" @click="toggleChat" class="chat-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-hipchat" width="44"
                height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M17.802 17.292s.077 -.055 .2 -.149c1.843 -1.425 3 -3.49 3 -5.789c0 -4.286 -4.03 -7.764 -9 -7.764c-4.97 0 -9 3.478 -9 7.764c0 4.288 4.03 7.646 9 7.646c.424 0 1.12 -.028 2.088 -.084c1.262 .82 3.104 1.493 4.716 1.493c.499 0 .734 -.41 .414 -.828c-.486 -.596 -1.156 -1.551 -1.416 -2.29z" />
                <path d="M7.5 13.5c2.5 2.5 6.5 2.5 9 0" />
            </svg>
        </div>
        <v-card v-else class="chat-dialog">
            <v-card-title class="text-h5 text-center pa-4" style="background-color: #cca3e1; color: white;">
                สวัสดี <br>
                ต้องการให้เราช่วยเหลืออะไร
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitForm" class="pt-3">
                    <v-text-field v-model="name" label="Name" required></v-text-field>
                    <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
                    <v-textarea v-model="message" label="How can we help?" required></v-textarea>
                    <v-btn color="chatbtn" block type="submit" class="mt-4">
                        Send
                    </v-btn>
                </v-form>
                <p v-if="submitStatus"
                    :class="{ 'success-message': submitStatus.includes('success'), 'error-message': submitStatus.includes('Error') }">
                    {{ submitStatus }}
                </p>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
                <v-btn text @click="toggleChat">Close</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
.chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.chat-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #cca3e1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.chat-dialog {
    width: 300px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (min-width: 600px) {
    .chat-dialog {
        width: 400px;
    }
}

.success-message {
    color: green;
    font-weight: bold;
}

.error-message {
    color: red;
    font-weight: bold;
}
</style>