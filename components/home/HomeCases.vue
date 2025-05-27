<template>
  <div :class="$style.root">
    <RotatedHeading>
      <h3>Наши работы</h3>
    </RotatedHeading>
    <div :class="$style.wrapper">
      <BaseSlider :options="sliderOptions" custom-styles="scroll-snap-type: x mandatory;display:flex;flex-wrap:nowrap;overflow-x:auto;scroll-behavior:smooth">
        <template #slider="{ sliderRef, activeClass, activeSlide }">
          <div v-for="(project, key) in projectsSlides" :key :class="[$style.projectSlideWrapper, {[activeClass]: key === activeSlide}]">
            <div :class="$style.projectSlide">
              <NuxtImg
                :src="project.thumbnail"
                :class="$style.picture"
                :webp="project.thumbnail"
                :alt="project.name"
                loading="lazy"
              ></NuxtImg>
              <div :class="$style.desc">
                <p :class="$style.title">{{ project.name }}</p>
                <p :class="$style.text">{{ project.shortDescription }}</p>
                <NuxtLink :class="$style.button" :to="`/projects/${project.slug}`">Подробнее</NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </BaseSlider>
    </div>
  </div>
</template>
<script setup>
import { projectsSlides } from '@/data/projects.js';
import RotatedHeading from '@/components/RotatedHeading.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import { ref } from 'vue';
import { useSliderClient } from '@/composables/useSlider.client.js';

const sliderRef = ref(null);

const sliderOptions = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

if (projectsSlides.value) {
  useSliderClient(sliderRef, sliderOptions);
}
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.root {
  @extend %container;
  @extend %section;

  @media(width < 768px) {
    padding-top: 0;
  }
}

.wrapper {
  @extend %content;

  position: relative;
  scroll-snap-type: x mandatory;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;

  @media(width < 768px) {
    margin-inline: -15px;
  }
}


.projectSlideWrapper {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding-block: 0 35px;
  padding-inline: 35px;
  min-width: 100%;

  img {
    aspect-ratio: 16 / 12;
    object-fit: cover;
  }

  @media(width < 768px) {
    padding: 0;
  }
}

.projectSlide {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  align-items: center;

  @media(width < 768px) {
    grid-template-rows: 1fr fit-content(100%);
  }
}

.picture {
  box-shadow: -35px 35px 0 0 var(--gray);
  display: block;
  width: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / span 10;

  @media(width < 768px) {
    grid-column: 1 / -1;
    box-shadow: none;
  }
}

.desc {
  border-radius: 2px;
  text-align: center;
  padding: 0 10px;
  grid-row: 1 / 1;
  grid-column: 7 / span 6;
  height: fit-content;

  @media(width >= 768px) {
    padding: 64px 28px 58px;
    border: 1px solid #eee;
    box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }

  @media(width < 768px) {
    margin-top: 40px;
    grid-row: 2;
    grid-column: 1 / -1;
  }
}

.title {
  @extend %heading;

  @media(width < 768px) {
    margin-bottom: 20px;
  }
}

.text {
  margin: 0 0 39px;
  padding: 0;
  font-size: 16px;
  line-height: 1.56;
  color: var(--gray-dark);
  text-wrap: balance;
}

.button {
  @extend %button;
}

.sliderDots {
  position: static;
  margin: 10px auto 0;
  transform: none;
}
</style>
