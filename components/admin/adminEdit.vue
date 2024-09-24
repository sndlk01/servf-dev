<template>
    <v-card class="mx-auto" max-width="344">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text class="text-h4 text-center">
        {{ value }}
      </v-card-text>
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