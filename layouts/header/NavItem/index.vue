<script setup>
const props = defineProps({ item: Object, level: Number });
const emit = defineEmits(['navItemClick']);

const handleClick = () => {
  emit('navItemClick', props.item.componentId);
};
</script>

<template>
  <v-list-item 
    :to="item.to" 
    :href="item.href" 
    @click="handleClick" 
    :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''" 
    :ripple="false"
  >
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ item.subCaption }}
    </v-list-item-subtitle>
  </v-list-item>
</template>