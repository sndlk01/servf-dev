<template>
  <div class="py-md-15 py-8" id="Testimonials">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" sm="8">
          <div class="text-center">
            <div class="d-flex align-center mb-5 justify-center" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
              <h3 class="text-dark">Review</h3>
            </div>
            <h2 class="text-h2 text-dark mb-5" data-aos-fade-left data-aos-delay="200" data-aos-duration="1000">What Our Consult Say</h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12">
          <div class="testimonial-carousel">
            <v-btn icon @click="prevSlide">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div class="testimonial-cards">
              <div v-for="(review, index) in visibleReviews" :key="review.id" class="testimonial-card"
                :class="{ 'active-card': index === 1 || visibleReviews.length === 1 }">
                <v-card elevation="10" class="mx-auto">
                  <v-card-text class="pa-sm-8 pa-5">
                    <p class="mb-8 text-subtitle-1">"{{ review.review }}"</p>
                    <div class="d-flex align-center">
                      <div class="ml-5">
                        <h6 class="font-weight-medium text-dark text-subtitle-1">
                          {{ review.name }}
                        </h6>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
            <v-btn icon @click="nextSlide">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { TestimonialsData } from '../../_mockApis/custom-components/index';

// ประกาศตัวแปรสำหรับตรวจสอบขนาดหน้าจอ
const isMobile = ref(false);

// ตรวจสอบขนาดหน้าจอด้วย window.innerWidth
if (typeof window !== 'undefined') {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 960;
  };
  
  // ตรวจสอบตอนเริ่มต้น
  checkScreenSize();
  
  // เพิ่ม event listener สำหรับการเปลี่ยนขนาดหน้าจอ
  window.addEventListener('resize', checkScreenSize);
}

interface Review {
  id: number;
  name: string;
  review: string;
}

// แปลงข้อมูล TestimonialsData เป็นรูปแบบ Review
const reviews = ref<Review[]>(TestimonialsData.map((testimonial, index) => ({
  id: index + 1,
  name: testimonial.name,
  review: testimonial.testimonial
})));

const currentSlide = ref(0);
const totalSlides = computed(() => reviews.value?.length || 0);

const visibleReviews = computed(() => {
  if (!reviews.value) return [];
  
  if (!isMobile.value) {
    const prev = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
    const next = (currentSlide.value + 1) % totalSlides.value;
    return [reviews.value[prev], reviews.value[currentSlide.value], reviews.value[next]];
  } else {
    return [reviews.value[currentSlide.value]];
  }
});

const nextSlide = () => {
  if (reviews.value) {
    currentSlide.value = (currentSlide.value + 1) % reviews.value.length;
  }
};

const prevSlide = () => {
  if (reviews.value) {
    currentSlide.value = (currentSlide.value - 1 + reviews.value.length) % reviews.value.length;
  }
};
</script>

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