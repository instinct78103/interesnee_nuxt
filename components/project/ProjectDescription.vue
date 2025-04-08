<template>
  <article>
    <div :class="$style.root">
      <div :class="$style.wrapper">
        <h2 :class="$style.heading">{{ project.name }}</h2>

        <div :class="$style.progress">
          <div :class="$style.line">
            <div
              v-for="(stage, index) in stages"
              :class="[$style.point, {[$style.red]: stage.value !== activeTab}, {[$style.blue]: stage.value === activeTab} ]"
              :key="index"
            >
              <div :class="$style.mark">
                <svg :class="$style.icon">
                  <use :href="`${spriteSvg}#icon-tick`"></use>
                </svg>
              </div>
              <div :class="$style.btn">
                <button
                  :aria-label="stage.name"
                  :class="$style.button"
                  @click="setActiveTab(stage.value)"
                >{{ stage.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="project.description">
          <p
            v-if="activeTab === 'issue'"
            :class="$style.description"
            v-html="project.description.issue" />
          <p
            v-if="activeTab === 'process'"
            :class="$style.description"
            v-html="project.description.process" />
          <p
            v-if="activeTab === 'result'"
            :class="$style.description"
            v-html="project.description.result"
          />
        </div>
      </div>
    </div>

    <div :class="$style.galleryWrapper">
      <div :class="$style.images" ref="sliderRef">
        <NuxtImg
          v-for="(slide, key) in project.images" :key
          :src="slide.x1"
          :class="$style.picture"
          :alt="project.name"

          fit="cover"
        ></NuxtImg>
      </div>
      <ul :class="$style.indicatorsList">
        <li v-for="(_, key) in [...Array(countSlidesRef)]" :key>
          <button :class="{[$style.isActive]: key === currentIndex}" @click="navigate(key)"></button>
        </li>
      </ul>
      <template v-if="project.videos">
        <video
          v-for="(video, vIndex) in project.videos"
          :key="vIndex"
          :class="$style.video"
          :poster="video.poster"
          controls="controls"
        >
          <source
            v-for="(source, sIndex) in video.sources"
            :key="sIndex"
            :src="source.src"
            :type="source.type">
          Your browser does not support the video tag.
        </video>
      </template>
    </div>
  </article>
</template>
<script setup>
import { spriteSvg } from '@/helpers.js';
import { ref } from 'vue';
import { useSliderClient } from '@/composables/useSlider.client.js';

const sliderRef = ref(null);

import { useProjectsStore } from '@/store/useProjects.js';
import { storeToRefs } from 'pinia';

const { currentProject: project } = storeToRefs(useProjectsStore());

const activeTab = ref('issue');

function setActiveTab(value) {
  activeTab.value = value;
}

const stages = [
  {
    name: 'Задача',
    value: 'issue',
  },
  {
    name: 'Процесс',
    value: 'process',
  },
  {
    name: 'Результат',
    value: 'result',
  },
];

const { currentIndex, countSlidesRef, navigate } = useSliderClient(sliderRef, { autoplay: true, autoplaySpeed: 3000 });

</script>

<style lang="scss" module>
@use '@/scss/helpers';

%descriptionContainer {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.root {
  @extend %container;
  @extend %section;

  &::after {
    display: none;
  }
}

.wrapper {
  @extend %content;
}

.galleryWrapper {
  @extend %content;
  max-width: 1280px;
  margin-bottom: 30px;
}

.images {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin-bottom: -20px;

  > * {
    scroll-snap-stop: always;
    scroll-snap-align: start;
    min-width: 100%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.heading {
  @extend %heading;
  text-align: center;
}

.imgWrapper {
  margin: 17px 0;
}

.img {
  width: 100%;
  min-height: 235px;
  object-fit: cover;
}

.progress {
  @extend %descriptionContainer;
  padding: 40px 70px 65px;
  margin-bottom: 55px;

  @media(width < 768px) {
    margin-bottom: 0;
    padding: 40px 54px 65px;
  }
}

.isActive {
  background-color: var(--dots-active-color) !important;
}

.indicatorsList {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: 20px;

  > li {
    display: flex;
  }

  button {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    outline: none;
    font-size: 0;
    background-color: var(--dots-color);

    &:hover {
      cursor: pointer;
    }
  }
}

.line {
  width: 100%;
  height: 2px;
  background-color: var(--gray-7);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.point {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 1;
}

.point.red {
  background-color: var(--red-light);
}

.point.blue {
  background-color: var(--blue);
}

%position {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}

.mark {
  @extend %position;
  bottom: 20px;
}

.icon {
  min-width: 36px;
  height: 36px;
  transition: fill 0.4s;
}

.point.red .icon {
  fill: var(--red-light);
}

.point.blue .icon {
  fill: var(--blue);
}

.btn {
  @extend %position;
  top: 20px;
}

.button {
  @extend %button;
  min-width: fit-content;
  line-height: 1;

  @media(width < 768px) {
    padding: 5px;
  }
}


.point.red .button {
  @extend %buttonWhite;

  color: var(--red-light);
  border: 2px solid var(--red-light);
  text-align: center;
  border-radius: 70px;
}

.point.blue .button {
  color: #fff;
  background-color: var(--blue);
  border: 2px solid var(--blue);
  text-align: center;
  border-radius: 70px;
}

.description {
  @extend %descriptionContainer;
  opacity: 0.8;
  color: var(--gray-dark);
  font-size: 16px;
  line-height: 25px;
  text-wrap: pretty;

  @media(width < 768px) {
    padding: 0 20px;
  }
}

.description a {
  color: var(--red);
  text-decoration: none;
  transition: all 0.3s;
  border-bottom: 1px solid transparent;

  &:hover {
    border-color: var(--red);
  }
}

// Projects video
.video {
  width: 100%;
  max-height: 80vh;
}
</style>
