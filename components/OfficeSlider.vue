<template>
  <div :class="$style.root">
    <BaseSlider
      :options="sliderOpts"
      :goSlide="currentSlider"
    >
      <template #slider>
        <div :class="$style.office" v-for="(value, index) in office" :key="index" class="office">
          <div :class="$style.officePhotos" :ref="el => imagesSliderRefs[index] = el">
            <NuxtImg
              v-for="(image, imgIndex) in value.images" :key="imgIndex"
              :class="[$style.carouselImg, {[$style.isActive]: imgIndex === sliders[index]?.currentIndex}]"
              :src="image.webp"
              :alt="value.city"
              lazy
              :width="200"
              :height="180"
              @click="openPopup(value, imgIndex, index)"
            ></NuxtImg>
          </div>

          <ul :class="$style.indicatorsList" v-if="value.images.length > 1">
            <li v-for="(_, key) in value.images" :key>
              <button :class="{ [$style.isActive]: innerIndexes[index]?.value === key }" @click="scrollToImage(index, key)"></button>
            </li>
          </ul>
          <div :class="$style.textWrap">
            <template v-if="value.link">
              <NuxtLink :to="`${value.link}`">
                <p :class="$style.title">{{ value.city }}</p>
              </NuxtLink>
            </template>
            <template v-else>
              <p :class="$style.title">{{ value.city }}</p>
            </template>
            <p :class="$style.address">
              {{ value.address }} <br>
              {{ value.tel }}
            </p>
          </div>
        </div>
      </template>
    </BaseSlider>

    <Dialog ref="dialog">
      <template #arrowLeft>
        <button
          @click="dialogImagesRef[imgIndexClicked].parentElement.scrollLeft -= dialogImagesRef[imgIndexClicked].offsetWidth"
          :class="[$style.leftArrow, $style.arrow]"
          v-if="officeSelected?.images.length > 1"
        >
          <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
      </template>
      <template #body>
        <div v-for="(image, index) in officeSelected?.images" :key="image" :ref="el => dialogImagesRef[index] = el">
          <NuxtImg
            :src="image.webp"
            alt="Office photo"
            lazy
          ></NuxtImg>
        </div>
      </template>
      <template #arrowRight>
        <button
          @click="dialogImagesRef[imgIndexClicked].parentElement.scrollLeft += dialogImagesRef[imgIndexClicked].offsetWidth"
          :class="[$style.rightArrow, $style.arrow]"
          v-if="officeSelected?.images.length > 1"
        >
          <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import BaseSlider from '@/components/BaseSlider.vue';
import Dialog from '@/components/Dialog.vue';
import $style from '@/scss/OfficeSlider.module.scss';
import { useSliderClient } from '@/composables/useSlider.client.js';

const dialog = ref(null);
const showModal = () => dialog?.value?.showModal();
const dialogImagesRef = ref([]);

const imagesSliderRefs = ref([]);
const sliders = ref([]);
const officeSelected = ref(null);
const imgIndexClicked = ref(0);
const officeClickedIndex = ref(0);

const openPopup = (value, imgIndex, officeIndex) => {
  officeSelected.value = value;
  officeClickedIndex.value = officeIndex;
  imgIndexClicked.value = imgIndex;
  showModal();
  nextTick(() => dialogImagesRef.value[imgIndex].scrollIntoView({
    behavior: 'smooth',
    inline: 'start',
    block: 'nearest',
  }));
};

const scrollToImage = (idx, buttonClickedIndex) => {
  const slider = sliders.value[idx];
  if (slider) {
    slider.scrollToSlide(buttonClickedIndex);
    slider.currentIndex = buttonClickedIndex;
  }
};

const props = defineProps({
  office: {
    type: Array,
  },
  currentSlider: {
    type: Number,
    default: 0,
  },
});

const office = computed(() => props.office);

const innerIndexes = ref([]);
let innerObservers = [];

const observeInnerSliders = () => {
  imagesSliderRefs.value.forEach((innerSlider, i) => {

    if (!innerSlider) return;

    const currentInnerIndex = ref(0);
    innerIndexes.value[i] = currentInnerIndex;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

          if (entry.isIntersecting) {
            currentInnerIndex.value = [...innerSlider.children].indexOf(entry.target);
          }
        });
      }, { threshold: 0.6 },
    );

    [...innerSlider.children].forEach(slide => observer.observe(slide));
    innerObservers.push(observer);

  });
};

// Set up slider functionality for each office
onMounted(() => {
  office.value.forEach((_, index) => {
    sliders.value[index] = useSliderClient(imagesSliderRefs.value[index], { autoplay: true, autoplaySpeed: 3000 });
  });

  observeInnerSliders();

});
onUnmounted(() => innerObservers.forEach(observer => observer.disconnect()));

const sliderOpts = {
  dotsClass: $style.sliderDots,
  autoplay: false,
};
</script>

<style lang="scss" module>
@use '@/scss/BaseSlider.module.scss';
</style>
