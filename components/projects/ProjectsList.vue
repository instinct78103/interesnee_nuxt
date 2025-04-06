<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <div :class="$style.list">
        <div
          v-for="project in projects"
          :key="project.id"
          :class="$style.item"
          @click="toggleInfo(project.id)"
        >
          <div :class="$style.itemContainer">
            <img
              :class="$style.img"
              :src="project.thumbnail.x1"
              :alt="project.name"
              :srcset="`${project.thumbnail.x1} 1x, ${project.thumbnail.x2} 2x`"
              decoding="async"
            >
            <div :class="[ $style.info, {[$style.active]: activeIndex === project.id }]">
              <h3 :class="$style.infoHeading">{{ project.name }}</h3>
              <p :class="$style.text" v-html="project.shortDescription" />
              <router-link :to="`/projects/${project.slug}`" :class="$style.link">Смотреть</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { projects } from '@/data/projects.js';
import { ref } from 'vue';

const activeIndex = ref(false);
const toggleInfo = projectId => activeIndex.value = activeIndex.value === projectId ? false : projectId;
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.root {
  @extend %container;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.container {
  @extend %section;
  @extend %content;

  padding-block-start: 0;
  max-width: 1110px;
  width: 100%;

  @media(width < 1024px) {
    background-color: var(--white-gray);
    max-width: 100%;
  }
}

.heading {
  @extend %heading;
}

.infoHeading {
  font-size: 24px;
  line-height: 30px;
  font-weight: normal;
  margin-bottom: 10px;
  margin-top: 0;
  color: #fff;

  @media(width < 1024px) {
    color: var(--blue);
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;

  @media(width < 1024px) {
    display: block;
  }
}

.item {
  flex-basis: calc(25% - 30px / 4);
  position: relative;
  overflow: hidden;

  @media(width > 1024px) {
    .img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }

  &:hover .img {
    transform: scale(1.05);
  }
}

.itemContainer {
  @media(width > 1024px) {
    padding-top: 100%;
  }
}

.link {
  @extend %button;
  @extend %buttonWhite;

  text-align: center;
  max-width: 160px;

  @media(width < 1024px) {
    background-color: var(--red-light);
    color: #fff;
  }
}

.info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s;

  @media(width < 1024px) {
    $inherit: inherit;

    position: static;
    padding: 10px;
    opacity: 1;
    height: auto;
    background-color: $inherit;

    display: grid;
    grid-template-rows: 50px 1fr 45px;
    justify-items: center;
    margin-bottom: 20px;
  }
}

.info.active,
.info:hover {
  @media(width >= 1024px) {
    opacity: 1;
    background-color: var(--red-transparent);
  }
}

.text {
  color: #fff;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  max-height: 60%;
  text-wrap: balance;

  @media(width < 1024px) {
    color: var(--gray-dark);
  }
}

.img {
  @extend %hoverBlock;

  width: 100%;
  height: 100%;
  object-fit: cover;

  @media(width < 1024px) {
    height: 300px;
  }
}
</style>
