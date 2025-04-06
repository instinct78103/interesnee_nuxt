<template>
  <button @click="navigate('backward')" v-if="options?.arrows" class="leftArrow" :class="[$style.arrow, $style.leftArrow]">
    <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <div ref="sliderRef" :class="[$style.slider, {[$style.fade]: options?.fade}]" :style="customStyles" class="slider">
    <slot name="slider" :activeSlide="slideIndex" :activeClass="$style.active" />
  </div>
  <button @click="navigate('forward')" v-if="options?.arrows" class="rightArrow" :class="[$style.arrow, $style.rightArrow]">
    <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import { useSliderClient } from '~/composables/useSlider.client.js';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  goSlide: {
    type: Number,
    default: 0,
  },
  customStyles: {
    type: String,
    default: '',
  },
});

const sliderRef = ref(null);
const { currentIndex, slideIndex, navigate } = useSliderClient(sliderRef, props);

const activeIndex = inject('activeIndex', 0);
const updateActiveIndex = inject('updateActiveIndex', null);

if (updateActiveIndex) {
  watch(currentIndex, (newValue) => updateActiveIndex(newValue));
}

</script>
<style lang="scss" module>
@use '@/scss/BaseSlider.module.scss';
</style>