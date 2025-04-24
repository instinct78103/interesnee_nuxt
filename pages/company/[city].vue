<script setup>
import { SITE_NAME } from '@/helpers.js';
import { companyInfo, companyFields} from '@/data/companyInfo.js';

useHead({ title: SITE_NAME });
import { computed } from 'vue';
import Hero from '@/components/Hero.vue';

const info = computed(() => companyInfo[useRoute().params.city]);

if (!info.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'City not found',
  });
}
</script>

<template>
  <Hero><strong>Работать с нами</strong> <em>Очень Интересно</em></Hero>
  <div :class="$style.section">
    <div :class="$style.container">
      <h2>Карточка предприятия</h2>
    </div>
    <div :class="$style.container">
      <ul :class="$style.companyInfo">
        <li v-for="(item, key) in info" :key>
          <p :class="$style.key">{{ companyFields.find(field => field.key === key).title }}:</p>
          <p :class="$style.value">{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" module>
@use '@/scss/helpers';

.section {
  @extend %section;
}

.container {
  @extend %container;
  max-width: 1140px;

  h2 {
    font-size: clamp(24px, 4vw, 36px);
    margin-bottom: clamp(30px, 4vw, 80px);
    color: var(--red);
    text-align: center;
    font-weight: 600;
  }
}

.companyInfo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(10px, 3vw, 20px);

  > li {
    display: grid;
    grid-column: span 2;
    text-wrap: balance;
    align-items: baseline;

    @media(width > 480px) {
      grid-template-columns: subgrid;
    }
  }

  .key {
    font-size: clamp(20px, 4vw, 24px);
    line-height: 1.3;
    color: var(--red);
  }

  .value {
    font-size: 16px;
    line-height: 1.3;
    color: var(--gray-dark);
  }
}
</style>
