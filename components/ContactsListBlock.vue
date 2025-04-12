<template>
  <div :class="$style.mailto">
    <p :class="$style.mailText">Пишите/звоните нам</p>
    <div :class="$style.bottomLinkWrap">
      <template v-for="(contact, index) in contacts" :key="index">
        <a :class="$style.mailLink" :aria-label="contact.title" :href="contact.value">{{ contact.title }}</a>
        <br v-if="index === 0" :key="`${index}-br`">
        <span v-if="index !== 0 && index < contacts.length - 1" :key="`${index}-hr`" :class="$style.linkDelimiter">|</span>
      </template>
    </div>
    <div>
      <a
        :class="$style.mailLink"
        :href="mainPhone.link">{{ mainPhone.label }}</a>
    </div>
  </div>
</template>

<script setup>
import { mainPhone, contacts } from '@/data/commonInfo.js';
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.mailto {
  text-align: center;
}

.bottomLinkWrap {
  display: inline-block;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;

  @media (width <= 480px) {
    border-bottom: 0 solid transparent;
  }
}

.mailText {
  font-size: 16px;
  line-height: 20px;
  color: var(--gray-dark);
  opacity: 0.8;
  margin-block: 1em 0;
}

.linkDelimiter {
  padding: 0 10px;

  @media (max-width: 480px) {
    display: none;
  }
}

.mailLink {
  font-size: 16px;
  line-height: 20px;
  color: #000;
  transition: color 0.3s;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-top: 20px;

  @media (width <= 480px) {
    display: block;
  }
}
</style>
