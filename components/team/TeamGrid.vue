<template>
  <section :class="$style.section">
    <div :class="$style.container">

      <RotatedHeading :class="$style.heading">
        <h3>Команда</h3>
      </RotatedHeading>

      <div v-if="headingItem" :class="$style.headingMobile">
        <p :class="$style.title">{{ headingItem.title }}</p>
        <p :class="$style.text">{{ headingItem.text }}</p>
      </div>

      <div :class="$style.row">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="{[$style.colOffer]: item.heading}">
          <div :class="[$style.item, {[$style.itemOffer]: item.heading}]">
            <template v-if="!item.heading">
              <img
                v-if="item.src"
                :class="$style.image"
                :src="item.src"
                width="35"
                height="35"
                decoding="async"
                :alt="item.post"
              >

              <svg v-else :class="$style.icon">
                <use :href="`${spriteSvg}#icon-rounded-${item.icon}`"></use>
              </svg>

              <p :class="$style.post">{{ item.post }}</p>
              <p :class="[$style.text, $style.count]">
                <span><b>Команда</b><br>{{ item.count }}</span>
              </p>
            </template>
            <template v-else>
              <p :class="$style.title">{{ item.title }}</p>
              <p :class="$style.text">{{ item.text }}</p>
            </template>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { spriteSvg } from '@/helpers.js';
import RotatedHeading from '@/components/RotatedHeading.vue';
import { computed } from 'vue';

const items = [
  {
    src: '/static/python.svg',
    post: 'Python',
    count: '14 человек',
  },
  {
    src: '/static/js.svg',
    post: 'Front-end',
    count: '24 человека',
  },
  {
    src: '/static/net.svg',
    post: '.Net',
    count: '20 человек',
  },
  {
    src: '/static/qa.svg',
    post: 'QA',
    count: '14 человек',
  },
  {
    src: '/static/unity.svg',
    post: 'Unity',
    count: '18 человек',
  },
  {
    src: '/static/mobile.svg',
    post: 'Mobile',
    count: '10 человек',
  },
  {
    heading: true,
    title: 'Наша команда разработки',
    text:
      'У нас работают талантливые разработчики, архитекторы, проектировщики, менеджеры, дизайнеры, инженеры, тестировщики, использующие новые технологии в реальных проектах, которые мы создаем с нуля. Присоединяйся!',
  },
  {
    src: '/static/php.svg',
    post: 'PHP',
    count: '17 человек',
  },
  {
    src: '/static/3d.svg',
    post: '3D',
    count: '4 человека',
  },
  {
    src: '/static/devops.svg',
    post: 'DevOps',
    count: '10 человек',
  },
  {
    src: '/static/ui-ux.svg',
    post: 'UI/UX Design',
    count: '7 человек',
  },
];

const headingItem = computed(() => items.find(obj => obj.heading))
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.section {
  @extend %section;

  &::after {
    display: none;
  }
}

.container {
  @extend %container;
  max-width: 1170px;
}

.row {
  --gap: clamp(10px, 3vw, 20px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(150px, calc((50% - var(--gap))), 260px), 1fr));
  gap: var(--gap);
}

.section .heading {
  max-width: 1140px;
}

.colOffer {
  grid-column: span 2;

  @media(width < 768px) {
    display: none;
  }
}

.item {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  height: 263px;
  padding: clamp(10px, 5vw, 30px);
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  box-shadow: inset 0 0 1px 0 rgba(139, 139, 139, 0.5);
  position: relative;
  overflow: hidden;

  @media(width <= 480px) {
    height: 170px;
  }

  &:hover .count {
    visibility: visible;
    opacity: 1;
  }
}

.itemOffer {
  display: flex;
  padding: min(4vw, 30px);
  border: 2px solid var(--red-light);
  text-align: left;
}

.icon,
.image {
  margin-bottom: 20px;
}

.icon {
  fill: var(--red-light);
}

.post {
  font-size: 16px;
  line-height: 1.3;
  font-weight: 600;
  color: var(--red);
  text-align: center;
  margin: 0;
}

.headingMobile {
  display: none;

  @media(width <= 768px) {
    display: block;
    margin-bottom: 28px;
    text-align: left;
  }
}

.title {
  font-size: 24px;
  line-height: 30px;
  color: var(--red);
  margin: 0 0 13px;
}

.text {
  font-size: 16px;
  line-height: 24px;
  color: var(--gray-dark);
  opacity: 0.8;
  margin: 0;
  text-wrap: balance;
}

.count {
  @media(width > 1024px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--red-transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    color: #fff;
  }

  @media(width <= 1024px) {
    b,
    br {
      display: none;
    }
  }

  span {
    text-align: center;
  }
}
</style>
