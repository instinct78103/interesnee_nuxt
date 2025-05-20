<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <h2 :class="$style.title">Наша культура</h2>
      <div :class="$style.gallery">
        <div v-for="(image, index) in images" :key="image" :class="$style.photo">
          <NuxtImg :src="image" :class="$style.galleryImage" alt="Culture photo" @click="openPopup(index)" loading="lazy"></NuxtImg>
        </div>
      </div>
      <div :class="$style.actions">
        <button v-show="!expanded" :class="$style.button" @click="expanded = !expanded" aria-label="Показать все фото" type="button">Показать все</button>
      </div>
    </div>
  </section>
  <Dialog ref="dialog">
    <template #arrowLeft>
      <button
        @click="photoSlidesRef[imgIndexClicked].parentElement.scrollLeft -= photoSlidesRef[imgIndexClicked].offsetWidth"
        :class="[$style.leftArrow, $style.arrow]"
      >
        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    </template>
    <template #body>
    <div v-for="(photo, index) in fullsizePhotos" :key="photo" class="sliderItem" :ref="(el) => photoSlidesRef[index] = el">
      <NuxtImg :src="photo" alt="Culture photo" loading="lazy"></NuxtImg>
    </div>
    </template>
    <template #arrowRight>
      <button
        @click="photoSlidesRef[imgIndexClicked].parentElement.scrollLeft += photoSlidesRef[imgIndexClicked].offsetWidth"
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
import { computed, ref, watch } from 'vue';
import { full, previews } from '@/data/culture-photos';
import Dialog from '@/components/Dialog.vue';

const dialog = ref(null);
const photoSlidesRef = ref([]);
const showModal = () => dialog?.value?.showModal();

const expanded = ref(false);
const previewPhotos = ref(previews);
const fullsizePhotos = ref(full);
const initialPhotos = computed(() => previewPhotos.value.slice(0, 8));
const images = ref(initialPhotos.value);
const imgIndexClicked = ref(0);

function openPopup(index) {
  imgIndexClicked.value = index;
  showModal();
  photoSlidesRef.value[index].scrollIntoView({
    inline: 'start',
    block: 'nearest',
  })
}

watch(expanded, newVal => images.value = newVal ? previewPhotos.value : initialPhotos.value);
</script>

<style lang="scss" module>
@use '@/scss/helpers';
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
  margin-bottom: clamp(30px, 6vw, 60px);
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

.photo {
  display: flex;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  & + .photo {
    margin-top: var(--gap);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    object-fit: cover;
  }
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
  margin-top: 30px;
}

.button {
  @extend %button;
  padding-block: clamp(15px, 5vw, 20px);
}
</style>
