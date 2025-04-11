<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <h2 :class="$style.title">Наше предложение</h2>
      <div :class="$style.row">
        <div
          v-for="item in items"
          :key="item.icon"
          :class="[$style.col, $style.offerCol]"
        >
          <svg :class="$style.offerIcon" width="60" height="60">
            <use :href="`${spriteSvg}#icon-rounded-${item.icon}`"></use>
          </svg>
          <p :class="$style.offerTitle">{{ item.title }}</p>
          <p :class="$style.offerText">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { spriteSvg } from '@/helpers.js';

const items = [
  {
    icon: 'money',
    title: 'Достойная оплата труда',
    text:
      'Конкурентная зарплата с ежегодным пересмотром и индексацией. Оформление согласно законодательству. Система поощрения новых знаний.',
  },
  {
    icon: 'social',
    title: 'Коллектив профессионалов',
    text: 'Дружная международная команда и уважение личных приоритетов.',
  },
  {
    icon: 'grow',
    title: 'Динамичный рост',
    text:
      'Мы быстро развиваемся и постоянно открываем новые горизонты развития для каждого.',
  },
  {
    icon: 'chair',
    title: 'Комфортное рабочее место',
    text:
      'Наши уютные офисы расположены и оборудованы для максимального удобства наших сотрудников.',
  },
  {
    icon: 'batch',
    title: 'Очень Интересные задачи и проекты',
    text:
      'Мы там где нет других. Мы берем новые высоты каждый день и каждый член команды имеет непосредственное влияние на принятие решений.',
  },
  {
    icon: 'portfolio',
    title: 'Социальная жизнь',
    text:
      'Офисные мероприятия, участие в конференциях, путешествия между офисами.',
  },
];

</script>

<style lang="scss" module>
@use '@/scss/helpers';

.section {
  @extend %section;
}

.container {
  @extend %container;
  padding-inline: 0;
  max-width: min(1140px, calc(100% - 40px));
}

.row {
  --gap: 20px;
  --max-column-count: 3;
  --min-width: clamp(260px, calc((100% - (var(--max-column-count) - 1) * var(--gap)) / var(--max-column-count)), 100% / (var(--max-column-count) - 1));
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
}

.title {
  @extend %sectionTitle;
  margin-bottom: clamp(24px, 6vw, 60px);
  text-align: center;
}

.offerCol {
  text-align: center;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
  justify-items: center;
  gap: 10px;
}

.offerIcon {
  fill: var(--red-light);
}

.offerTitle {
  font-size: clamp(20px, 6vw, 24px);
  color: var(--red);
  margin: 0;
  text-wrap: balance;
  width: 18ch;
}

.offerText {
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-dark);
  margin: 0;
  text-wrap: balance;

  @media(width <= 480px) {
    display: none;
  }
}
</style>
