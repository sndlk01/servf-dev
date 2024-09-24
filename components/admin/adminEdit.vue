<template>
    <v-card class="mx-auto " max-width="344" style="padding: 2rem;">
      <v-card-title style="align-items: center; text-align: center; ">
        <h3>{{ title }}</h3>
      </v-card-title>
      <v-card-actions>
        <v-btn block color="primary" @click="$emit('button-click')">
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  })
  
  defineEmits(['button-click'])
  </script>