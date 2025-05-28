<template>
  <section :class="$style.root">

    <h2 :class="$style.title">Отзывы</h2>

    <div :class="$style.descriptionCol">
      <div :class="$style.descriptionContainer">
        <NuxtImg :class="$style.icQuotes" src="/icons/ic_quotes.svg" alt="quotes" loading="lazy"></NuxtImg>
        <div :class="$style.gridStack">
          <blockquote
            v-for="(item, index) in campFeedbacks"
            :class="[$style.commentWrap, {[$style.active]: index === currentIndex}]"
            :key="item.text">
            <p v-html="item.text" />
            <p :class="$style.commentAuthor">
              {{ item.author }}
            </p>
          </blockquote>
        </div>
      </div>
    </div>

    <div :class="$style.contentCol">
      <button
        @click="navigate('backward')"
        :class="[$style.leftArrow, $style.arrow]"
      >
        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <div :class="$style.scrollSnap" ref="sliderRef">
        <NuxtImg
          v-for="item in campFeedbacks"
          :key="item.text"
          :class="$style.contentImage"
          :alt="item.author"
          :src="item.img"
          loading="lazy"
        ></NuxtImg>
      </div>
      <button
        @click="navigate('forward')"
        :class="[$style.rightArrow, $style.arrow]"
      >
        <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <ul :class="$style.indicatorsList">
        <li v-for="(_, key) in [...Array(countSlidesRef)]" :key>
          <button :class="{[$style.isActive]: key === currentIndex}" @click="navigate(key)"></button>
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup>
import campFeedbacks from '@/data/campFeedbacks';
import { useSliderClient } from '@/composables/useSlider.client.js';
import { ref } from 'vue';

const sliderRef = ref(null);
const { currentIndex, countSlidesRef, navigate } = useSliderClient(sliderRef, { autoplay: true, autoplaySpeed: 5000 });
</script>

<style lang="scss" module>
@use '@/scss/helpers';
@use '@/scss/BaseSlider.module.scss';

.root {
  @extend %container;
  --gap: 40px;
  --left-col-width: clamp(400px, 20vw, 450px);
  display: flex;
  flex-flow: row wrap;
  padding: 40px clamp(20px, 5vw, 40px);
  gap: var(--gap);
  align-items: stretch;
  background: var(--white-gray);
}

.gridStack {
  display: grid;

  > * {
    grid-area: 1 / 1;
    opacity: 0;

    &.active {
      pointer-events: all;
      opacity: 0.8;
    }
  }
}

.indicatorsList {
  display: flex;
  gap: 8px;
  justify-content: center;

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

.isActive {
  background-color: var(--dots-active-color) !important;
}

.scrollSnap {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  height: -webkit-fill-available;

  > * {
    min-width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
}

.descriptionCol {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: var(--left-col-width);
  background: var(--white-gray);
  text-align: center;

  @media(width <= 1024px) {
    padding: 0 var(--grid-gutter);
  }

  @media(width < 1024px) {
    width: 100%;
  }
}

.descriptionContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  @media(width < 1024px) {
    height: auto;
  }
}

.icQuotes {
  display: block;
  width: 35px;
  margin: 0 auto 30px;
}

.commentWrap {
  color: var(--gray-dark);
  font-size: 16px;
  line-height: 1.5;
  margin: 0;

  p {
    text-wrap: pretty;
  }

  br {
    margin: 5px;
    display: block;
  }
}

.commentAuthor {
  font-size: 14px;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
  font-weight: 600;
}

.contentCol {
  position: relative;
  width: calc(100% - var(--left-col-width) - var(--gap));
  background-color: var(--white-gray);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media(width < 1024px) {
    width: 100%;
  }
}

.title {
  @extend %sectionTitle;
  font-size: 46px;
  line-height: 1.2;
  width: 100%;
  text-align: center;
}

.list {
  padding: 0;
  margin: 0 0 25px;
  list-style: none;
  counter-reset: counter;
  text-align: left;
}

.listItem {
  display: inline-block;
  vertical-align: top;
  position: relative;
  padding: 0 0 0 20px;
  margin: 0;
  font-size: 0;
}

.listItem::before {
  font-size: 16px;
  line-height: 1.5;
  content: counter(counter) '.';
  counter-increment: counter;
  position: absolute;
  left: 0;
  top: 0;
  color: var(--gray-dark);
  opacity: 0.8;
}

.condition {
  font-size: 16px;
  line-height: 1.3;
  margin-bottom: 20px;
  color: var(--red);

  @media(width <= 1024px) {
    font-size: 20px;
  }
}

.text {
  font-size: 16px;
  line-height: 1.3;
  margin: 0;
  color: var(--gray-dark);
  opacity: 0.8;
}

.textMb {
  margin-bottom: 30px;

  @media(width <= 1024px) {
    margin-bottom: 25px;
  }
}

.buttons {
  display: flex;
  justify-content: center;

  @media(width < 768px) {
    flex-wrap: wrap;
  }
}

.button {
  @extend %button;
  display: flex;
  align-items: center;
  padding: 9px 20px 7px;
  margin: 5px;
  white-space: nowrap;
}

.icon {
  width: 30px;
  height: 30px;
  fill: #fff;
  margin-right: 5px;
}

.contentSlider {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.sliderDots {
  bottom: 30px;

  @media(width <= 480px) {
    bottom: 15px;
  }
}

.contentImage {
  width: 100%;
  min-height: -webkit-fill-available;
  height: -webkit-fill-available;
  object-fit: cover;
}
</style>
