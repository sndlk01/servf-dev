<script setup lang="ts">
import { Iconsdata } from '@/_mockApis/custom-components/index';
</script>
<style>
.text-contact {
    text-align: center;
    color: black;
    width: 100%;
}

.icons {
    display: flex;
    justify-content: center;
    padding: 2rem 3rem;
}

.contactJA {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
<template>
    <div class="py-md-15 py-8 contact" id="Contact">
        <v-container>
            <v-row class="justify-center">
                <v-col cols="12" md="8" class="contactJA">
                    <v-col cols="12" sm="8">
                        <div class="text-center">
                            <h2 class="text-h2 text-dark  mb-5" data-aos="fade-left" data-aos-delay="200"
                                data-aos-duration="1000">Contact Us</h2>
                        </div>
                    </v-col>
                    <div class="text-contact text-dark">
                        <h3>SERVF OFFICIAL</h3>
                        <p>ช่องทางสำหรับติดต่อสอบถามรายละเอียดเพิ่มเติมเกี่ยวกับบริการของเรา <br>
                            E-mail : servfofficial@gmail.com
                        </p>
                    </div>
                    <div class="icons">
                        <v-row>
                            <v-col v-for="(icon, index) in Iconsdata" :key="index" cols="3">
                                <a :href="icon.url" target="_blank" rel="noopener noreferrer">
                                    <v-img :src="icon.img" alt="social icon" height="50px" width="50px"></v-img>
                                </a>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>