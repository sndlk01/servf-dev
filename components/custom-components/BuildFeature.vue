<script setup lang="ts">
import { BuildFeaturesData } from '@/_mockApis/custom-components/index';
</script>

<style>
.bg-kub {
    background: rgb(146, 122, 244);
    background: linear-gradient(90deg, #8872fb, #a08af7, #af96f2, #bfa0ee, #dcacde, #e1acd8, #eea8cc);
    display: flex;
    align-items: center;
}

.feature-circle {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<template>
    <div class="bg-kub py-md-15 py-8" id="BuildFeature">
        <v-container>
            <v-row class="justify-center">
                <v-col cols="12" sm="8">
                    <div class="text-center">
                        <div class="d-flex align-center mb-5 justify-center" data-aos="fade-right" data-aos-delay="200"
                            data-aos-duration="1000">
                        </div>
                        <h2 class="mb-4 text-white">Simple way to find your <span
                                style="font-size: 40px; color: #ffedb9;">CONSULTANTS</span></h2>
                        <p class="text-white">บริการหา <span style="font-weight: bold; font-style: italic;">"ที่ปรึกษา"</span> เพื่อให้คำปรึกษาในรูปแบบใหม่ ที่หลากหลายและเป็นกันเองผ่านการให้บริการจากนักศึกษาผู้มีความรู้ในเฉพาะด้าน</p>
                    </div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col v-for="card in BuildFeaturesData" :key="card.title">
                    <div class="icons" style="display: flex; justify-content: center; flex-wrap: wrap;">
                        <div class="feature-circle">
                            <img :src="card.image" alt="Feature icon" style="width: 80%; height: auto;" />
                        </div>
                        <div class="text" style="text-align: center; width: 100%;">
                            <h4 class="text-h4 my-sm-6 my-4 px-md-6 text-white">{{ card.title }}</h4>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>