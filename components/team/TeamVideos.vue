<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.gallery">
        <div v-for="(image, index) in images" :key="image" :class="$style.photo" @click="openPopup(index)">
          <NuxtImg
              :src="image"
              :class="$style.galleryImage"
              alt="Culture photo"
              format="webp"
              loading="lazy"
          ></NuxtImg>
          <button :class="$style.playButton" type="button" />
        </div>
      </div>

      <div :class="$style.actions">
        <button v-show="!expanded && videos.length > 8" :class="$style.button" aria-label="Показать все видео" type="button" @click="expanded = !expanded">
          Показать все
        </button>
      </div>
    </div>
  </section>
  <Dialog ref="dialog" @scrollend="stopVideos" @close="stopVideos">
    <template #arrowLeft>
      <button
        @click="videoSlidesRef[videoIndexClicked].parentElement.scrollLeft -= videoSlidesRef[videoIndexClicked].offsetWidth; stopVideos()"
        :class="[$style.leftArrow, $style.arrow]"
      >
        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </template>
    <template #body>
      <div v-for="(video, index) in videos" :key="video" class="sliderItem" :ref="(el) => videoSlidesRef[index] = el">
        <video :class="$style.sliderPhoto" width="800" controls preload="none">
          <source :src="video" type="video/mp4">
        </video>
      </div>
    </template>
    <template #arrowRight>
      <button
        @click="videoSlidesRef[videoIndexClicked].parentElement.scrollLeft += videoSlidesRef[videoIndexClicked].offsetWidth; stopVideos()"
        :class="[$style.rightArrow, $style.arrow]"
      >
        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </template>
  </Dialog>
</template>

<script setup>
import { videoFiles, previews } from '@/data/culture-videos';
import { computed, ref, watch } from 'vue';
import Dialog from '@/components/Dialog.vue';

const dialog = ref(null);
const videoSlidesRef = ref([]);
const showModal = () => dialog?.value?.showModal();

const previewPhotos = ref(previews);
const videos = ref(videoFiles);
const initialPhotos = computed(() => previewPhotos.value.slice(0, 8));
const expanded = ref(false);
const images = ref(initialPhotos.value);
const videoIndexClicked = ref(0);

function openPopup(index) {
  videoIndexClicked.value = index;
  showModal();
  videoSlidesRef.value[index].scrollIntoView({
    behavior: 'instant',
    inline: 'start',
    block: 'nearest',
  });
}

watch(expanded, newVal => images.value = newVal ? previewPhotos.value : initialPhotos.value);

function stopVideos() {
  const videos = document.getElementsByTagName('video');
  Object.keys(videos).forEach(index => {
    const video = videos[index];
    video.pause();
    video.currentTime = 0;
  });
}
</script>

<style lang="scss" module>
@use '@/scss/helpers.scss';
@use '@/scss/BaseSlider.module.scss';

.section {
  @extend %section;
}

.container {
  @extend %container;
  max-width: 1140px;
}

.title {
  @extend %sectionTitle;
  margin: 0 0 clamp(30px, 5vw, 80px);
  text-align: center;
}

.gallery {
  --gap: 15px;
  gap: var(--gap);
  min-height: 300px;
  columns: 260px;
}

.galleryImage {
  @extend %hoverBlock;
}

.sliderItem {
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo {
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  object-fit: fill;
  cursor: pointer;

  + .photo {
    margin-top: var(--gap);
  }

  &:hover .playButton {
    opacity: 1;
    transform: scale(1.1);
  }

  img {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
  }

  .playButton {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    border-style: solid;
    border-width: 37px 0 37px 60px;
    border-color: transparent transparent transparent var(--gray);
    display: block;
    background-color: transparent;
    z-index: 1;
    opacity: 0.7;
    transition: all 0.3s;
    cursor: pointer;
    justify-self: center;
  }
}

.sliderPhoto {
  min-width: 100%;
  max-height: 80cqmin;
}

.loader {
  z-index: 4;
  width: 100%;
  height: 100%;
}

.actions {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.button {
  @extend %button;
  width: 160px;
  padding-block: clamp(15px, 5vw, 20px);
  padding-bottom: 20px;

  @media(width <= 480px) {
    display: block;
    margin: 0 auto;
    width: auto;
  }
}
</style>