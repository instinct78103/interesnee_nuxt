<template>
  <section :class="$style.root">

    <RotatedHeading>
      <h3>Технологии</h3>
    </RotatedHeading>

    <div :class="$style.wrapper">
      <div :class="$style.left">

        <h2 :class="$style.subHeading">
          Мастерим проекты с помощью
        </h2>

        <ul :class="$style.techList">
          <li :class="$style.techItem" v-for="tech of techList" :key="tech.iconId">
            <a :class="$style.techInner" href="/join">
              <div :class="$style.icon" :style="{backgroundImage: `url(/icons/icon-${tech.iconId}.svg)`}"></div>
              <p :class="$style.techText">{{ tech.text }}</p>
            </a>
          </li>
        </ul>
      </div>

      <div :class="$style.right">
        <div :class="$style.phrasesList" ref="sliderRef">
          <div :class="$style.phraseItem" v-for="desc of descriptions" :key="desc.title">
            <h4 :class="$style.phraseTitle">{{ desc.title }}</h4>
            <p :class="$style.phraseText">{{ desc.text }}</p>
          </div>
        </div>
        <ul :class="$style.indicatorsList">
          <li v-for="(_, key) in [...Array(countSlidesRef)]" :key>
            <button :class="{[$style.isActive]: key === currentIndex}" @click="navigate(key)"></button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import RotatedHeading from '@/components/RotatedHeading.vue';
import { useSliderClient } from '~/composables/useSlider.client.js';
import { ref } from 'vue';

const sliderRef = ref(null);
const { currentIndex, countSlidesRef, navigate } = useSliderClient(sliderRef);

const techList = [
  { iconId: 'react', text: 'REACT'},
  { iconId: 'angular-js', text: 'ANGULAR' },
  { iconId: 'python', text: 'PYTHON' },
  { iconId: 'php', text: 'PHP' },
  { iconId: 'dot-net', text: '.NET' },
  { iconId: 'html-css', text: 'HTML/CSS' },
  { iconId: 'swift', text: 'SWIFT' },
  { iconId: 'android', text: 'ANDROID' },
  { iconId: 'aws', text: 'AWS' },
];

const descriptions = [
  {
    title: 'Очень Интересно',
    text: 'Это растущая команда профессионалов, которая меняет мир к лучшему. Мы помогаем клиентам решать нестандартные задачи, создаем и оптимизируем алгоритмы, используя современный арсенал технологий.',
  },
  {
    title: 'От нуля до бесконечности',
    text: 'В нашей команде есть дизайнеры, разработчики, архитекторы, проектировщики, менеджеры, инженеры, тестировщики — словом все, что нужно, чтобы сделать мечту реальностью. Мы развиваем идеи и вместе с нашими клиентами достигаем цели.',
  },
  {
    title: 'Раздвигаем границы',
    text: 'Для нас нет языкового, географического или временного барьеров — мы находимся на трех континентах (Европа, Азия, Америка) и постоянно путешествуем между ними, по работе и просто так.',
  },
];

</script>

<style lang="scss" module>

@use '@/scss/helpers';

.root {
  //@extend %container;
  @extend %section;
}

.wrapper {
  //@extend %content;
  display: flex;
  justify-content: center;
  padding-inline: 10px;

  @media(width < 1025px) {
    display: block;
  }
}

.left {
  flex-basis: 580px;
}

.right {
  flex-basis: 400px;
}

.subHeading {
  @extend %heading;
  text-align: left;

  @media(width <= 1024px) {
    text-align: center;
  }
}

.techList {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

.techItem {
  width: 33.33%;
  display: flex;
  justify-content: flex-start;
  padding: clamp(20px, 6vw, 40px) 0;

  @media(width <= 1024px) {
    justify-content: center;
  }
}

.techInner {
  text-align: center;
  cursor: crosshair;
  width: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-decoration: none;
}

.techText {
  padding: 0;
  margin: 15px 0 0;
  font-size: 18px;
  line-height: 1.6;
  font-weight: 700;
  color: var(--gray-4);
  text-transform: uppercase;

  @media(width < 768px) {
    display: none;
  }
}

.icon {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  filter: invert(95%) sepia(0%) saturate(3821%) hue-rotate(316deg) brightness(88%) contrast(92%);
}

.techInner:hover .techText {
  color: var(--blue);
}

.techInner:hover .icon {
  filter: invert(41%) sepia(71%) saturate(496%) hue-rotate(160deg) brightness(88%) contrast(87%);
}

.isActive {
  background-color: var(--dots-active-color) !important;
}

.indicatorsList {
  display: flex;
  grid-column: 1 / span 1;
  grid-row: 2;
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

  @media(width >= 768px) {
    display: none;
  }
}

.phrasesList {
  padding-left: 40px;
  margin: 14px 0;

  @media(width < 1024px) {
    margin-top: 40px;
  }

  @media(width < 768px) {
    margin: 40px 0 0;
    padding: 0 0 20px;
    display: flex;
    flex-wrap: nowrap;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.phraseItem {
  position: relative;
  padding: 0 0 25px 35px;
  text-wrap: balance;

  @media(width < 768px) {
    padding: 0;
    text-align: center;
    scroll-snap-align: center;
    min-width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--blue);
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 4px;
    width: 2px;
    height: 100%;
    background-color: var(--gray-7);
  }

  &:last-child::after {
    display: none;
  }
}

.phraseItem::before,
.phraseItem::after {
  @media(width < 768px) {
    display: none;
  }
}

.phraseTitle {
  margin: 0 0 12px;
  padding: 0;
  font-size: clamp(20px, 5vw, 24px);
  line-height: 1.25;
  color: var(--blue);
  font-weight: normal;

  @media(width < 768px) {
    font-weight: 600;
  }
}

.phraseText {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  color: var(--gray-dark);

  @media(width < 768px) {
    font-size: 15px;
    line-height: 23px;
    opacity: 0.8;
  }
}

.sliderDots {
  //@extend %slickDots;
}

</style>