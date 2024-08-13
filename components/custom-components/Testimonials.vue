<script setup lang="ts">
import { ref, computed } from 'vue';
import { TestimonialsData } from '@/_mockApis/custom-components/index';
import { useDisplay } from 'vuetify'

const display = useDisplay()
const currentSlide = ref(0);
const totalSlides = TestimonialsData.length;

const visibleCards = computed(() => {
    if (display.mdAndUp.value) {
        const prev = (currentSlide.value - 1 + totalSlides) % totalSlides;
        const next = (currentSlide.value + 1) % totalSlides;
        return [prev, currentSlide.value, next];
    } else {
        return [currentSlide.value];
    }
});
</script>

<style>
</style>

<template>
    <div class="py-md-15 py-8" id="Testimonials">
        <v-container>
            <v-row class="justify-center">
                <v-col cols="12" sm="8">
                    <div class="text-center">
                        <div class="d-flex align-center mb-5 justify-center" data-aos="fade-right" data-aos-delay="200"
                            data-aos-duration="1000">
                            <h3 class="text-dark">Review</h3>
                        </div>
                        <h2 class="text-h2 text-dark mb-5" data-aos-fade-left data-aos-delay="200"
                            data-aos-duration="1000">What Our Customer Say</h2>
                    </div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="12">
                    <div class="testimonial-carousel">
                        <v-btn icon @click="currentSlide = (currentSlide - 1 + totalSlides) % totalSlides">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <div class="testimonial-cards">
                            <div v-for="(index, cardIndex) in visibleCards" :key="index" class="testimonial-card"
                                :class="{ 'active-card': cardIndex === 1 || visibleCards.length === 1 }">
                                <v-card elevation="10" class="mx-auto">
                                    <v-card-text class="pa-sm-8 pa-5">
                                        <img src="/images/shape/question.png" alt="" style="width: 30px;">
                                        <p class="mb-8 text-subtitle-1">"{{ TestimonialsData[index].testimonial }}"</p>
                                        <div class="d-flex align-center">
                                            <v-avatar size="60">
                                                <img :src="TestimonialsData[index].img" alt="icon" height="60" />
                                            </v-avatar>
                                            <div class="ml-5">
                                                <h6 class="font-weight-medium text-dark text-subtitle-1">
                                                    {{ TestimonialsData[index].name }}
                                                </h6>
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                        <v-btn icon @click="currentSlide = (currentSlide + 1) % totalSlides">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
.testimonial-carousel {
    display: flex;
    align-items: center;
    justify-content: center;
}

.testimonial-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 20px;
    overflow: hidden;
}

.testimonial-card {
    transition: all 0.3s ease;
    flex: 0 0 100%;
    margin: 0 10px;
    opacity: 0.7;
    transform: scale(0.8);
}

.active-card {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
}

.v-btn.v-btn--icon {
    background-color: rgba(0, 0, 0, 0.1);
}

@media (min-width: 960px) {
    .testimonial-card {
        flex: 0 0 30%;
    }

    .active-card {
        flex: 0 0 40%;
    }
}
</style>