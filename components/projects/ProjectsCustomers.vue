<template>
  <div :class="$style.root">
    <div :class="$style.container" ref="sliderRef">
      <ul :class="$style.list">
        <li v-for="icon in iconsRow1" :key="icon" :class="$style.item">
          <svg :class="[$style.icon, $style[icon]]">
            <use :href="`${spriteSvg}#icon-logo-${icon}`"></use>
          </svg>
        </li>
      </ul>
      <ul :class="$style.list">
        <li v-for="icon in iconsRow2" :key="icon" :class="$style.item">
          <svg :class="[$style.icon, $style[icon]]">
            <use :href="`${spriteSvg}#icon-logo-${icon}`"></use>
          </svg>
        </li>
      </ul>
    </div>
    <ul :class="$style.indicatorsList">
      <li v-for="(_, key) in [...Array(countSlidesRef)]" :key>
        <button :class="{[$style.isActive]: key === slideIndex}" @click="navigate(key)"></button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useSliderClient } from '@/composables/useSlider.client.js';
import { spriteSvg } from '@/helpers.js';
import { ref } from 'vue';

const sliderRef = ref(null)

const {slideIndex, navigate, countSlidesRef} = useSliderClient(sliderRef);


const iconsRow1 = [
  'sony',
  'toyota',
  'vitas',
  'yamaha',
  'iheart',
];

const iconsRow2 = [
  'verizon',
  'bjs',
  'tipmed',
  'stjm',
  'vance',
];
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.root {
  @extend %section;
  @extend %container;

  &::after {
    display: none;
  }
}

.container {
  @extend %content;
}

.sliderDots {
  //@extend %slickDots;
}

div:has(> .list) {
  @media(width < 1024px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  > .list {
    @media(width < 1024px) {
      min-width: 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.isActive {
  background-color: var(--dots-active-color) !important;
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

  @media(width >= 1024px) {
    display: none;
  }
}

.list {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  margin: 0 -20px;
  list-style-type: none;
  justify-content: space-between;

  @media(width <= 1200px) {
    margin: 0;
  }

  @media(width <= 1024px) {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.item {
  padding: 20px;

  @media(width < 1024px) {
    flex-basis: 33.33%;
    text-align: center;
  }

  @media(width <= 1024px) {
    padding: 10px;
  }

  @media(width < 768px) {
    padding: 5px;
  }
}

.icon {
  fill: var(--gray-4);
  transition: fill 0.3s;
  max-width: 100%;

  &:hover {
    fill: var(--blue);
  }
}

.sony {
  height: 20px;
  width: 114px;
}

.toyota {
  height: 26px;
  width: 160px;
}

.vitas {
  height: 41px;
  width: 97px;
}

.yamaha {
  height: 30px;
  width: 132px;
}

.iheart {
  height: 36px;
  width: 212px;
}

.verizon {
  height: 26px;
  width: 118px;
}

.bjs {
  height: 55px;
  width: 240px;
  min-width: 160px;
}

.tipmed {
  height: 39px;
  width: 104px;
}

.stjm {
  height: 32px;
  width: 217px;
}

.vance {
  height: 31px;
  width: 115px;
}
</style>
