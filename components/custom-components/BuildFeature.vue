<script setup lang="ts">
import { BuildFeaturesData } from '@/_mockApis/custom-components/index';
</script>

<style>
.bg-kub {
    background: rgb(146, 122, 244);
    background: linear-gradient(90deg, rgba(146, 122, 244, 1) 0%, rgba(250, 164, 177, 1) 100%);
    /* height: 100vh; */
    display: flex;
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
                            <!-- <span class="bg-success pa-2 rounded-circle mr-2"></span> -->
                            <!-- <h6 class="text-subtitle-1 text-dark font-weight-bold" >aboutUs</h6> -->
                        </div>
                        <h1 class="text-h2 text-dark mb-4" data-aos="fade-left" data-aos-delay="200"
                            data-aos-duration="1000">SERVF</h1>
                        <h2 class="  mb-4 text-dark">Simple way to find your <span
                                style="font-style: italic; color: #723bcf;">Friends</span></h2>
                        <p class="text-dark">บริการหา “ เพื่อน ” เพื่อดูแล และให้ความบันเทิง ไปทำกิจกรรมต่าง ๆ ร่วมกัน
                            ไม่ว่าจะเป็นไปกินข้าว ดูหนัง ช็อปปิ้ง ไปที่เที่ยวด้วยกัน เป็นต้น สามารถใช้งานได้ทุกที่
                            ทุกเวลา</p>

                    </div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col v-for="card in BuildFeaturesData" :key="card.title">
                    <div class="icons" style="display: flex; justify-content: center; flex-wrap: wrap;">
                        <div class="raduis d-flex"
                            style="background-color: #723bcf; width: 10rem; height: 10rem; 
                            justify-content: center; align-items: center; border-radius: 6rem; background-color: #fff;
                            ">
                            <component :is="card.icon" class="text-primary" stroke-width="1.5" size="60" />
                        </div>
                        <div class="text" style="text-align: center; width: 100%;">
                            <h4 class="text-h4 text-dark font-weight-bold my-sm-6 my-4 px-md-6">{{ card.title }}</h4>
                        </div>
                    </div>
                    <!-- <v-card elevation="0" class="text-center py-md-15 py-6 px-md-8 px-4  rounded-md" data-aos="fade-up"
                        data-aos-delay="200" data-aos-duration="1000">
                        <component :is="card.icon" class="text-primary" stroke-width="1.5" size="40" />
                        <h4 class="text-h4 text-dark font-weight-bold my-sm-6 my-4 px-md-6">{{ card.title }}</h4>
                        <p class="text-muted mb-sm-6 mb-4">{{ card.desc }}</p>
                    </v-card> -->
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>