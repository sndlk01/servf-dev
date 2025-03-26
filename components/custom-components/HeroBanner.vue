<script setup>
import { ref } from 'vue';

const scrollToTestimonials = () => {
    const testimonialsElement = document.getElementById('team');
    if (testimonialsElement) {
        testimonialsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
</script>

<style>
.corporate-banner {
    /* background: rgb(146, 122, 244);
    background: linear-gradient(90deg, rgba(146, 122, 244, 1) 0%, rgba(250, 164, 177, 1) 100%); */
    background: linear-gradient(90deg, #8872fb, #a08af7, #af96f2, #bfa0ee, #dcacde, #e1acd8, #eea8cc);
    min-height: 600px; 
    display: flex;
    align-items: center;
}

/* สำหรับจอคอมพิวเตอร์ */
@media screen and (min-width: 1025px) {
    .corporate-banner {
        height: 100vh;
    }
}

/* สำหรับไอแพด */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .corporate-banner {
        /* margin-top: 7.95rem !important; */
        min-height: auto; 
    }
}

/* สำหรับโทรศัพท์มือถือ */
@media screen and (max-width: 767px) {
    .corporate-banner {
        /* margin-top: 7.95rem !important; */
        min-height: auto; 
    }
}

.text-h1 {
    font-size: 5rem !important;
    line-height: 1;
    color: #ffffff !important;
    letter-spacing: 2px !important;
}

.text-friend {
    font-size: 5rem !important;
    font-style: italic;
    font-weight: bold;
    line-height: 1;
    color: #ffedb9 !important;
}

.text-body-1 {
    color: #ffffff !important;
}
</style>

<template>
    <div class="corporate-banner pt-md-16 pt-8 pb-md-12 pb-8 mt-95">
        <v-container class="d-flex space-between">
            <v-row class="align-center justify-space-between">
                <v-col cols="12" md="5">
                    <p class="text-h1 mb-6" style="">Simple way to find your</p>
                    <p class="text-friend mb-6">CONSULTANTS</p>
                    <p class="text-body-1 mb-8">SERVF บริการหาเพื่อนไปทำกิจกรรมต่าง ๆ ร่วมกัน <br>รวมไปถึงหาที่ปรึกษาเฉพาะด้านหรือปัญหาอื่นๆ</p>
                    <!-- <p class="text-body-1 mb-8">รวมไปถึงหาที่ปรึกษาเฉพาะด้านหรือปัญหาอื่นๆ</p> -->
                    <v-btn variant="flat" color="white" size="large" class="px-9" style="color: #7a0eb0;"
                        @click="scrollToTestimonials">
                        Booking Now
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" class="d-flex justify-content-end align-items-end w-100">
                    <div class="position-relative text-right w-100">
                        <div class="position-relative z-index1 rounded-md overflow-hidden w-100">
                            <img src="/images/corporate/corporate-banner.png" alt="banner"
                                class="img-fluid rounded-md w-100" />
                        </div>
                        <img src="/images/shape/circle-line-3.png" alt="shape"
                            class="img-fluid position-absolute bottom-0 right-0 mb-n10 mr-n12" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>