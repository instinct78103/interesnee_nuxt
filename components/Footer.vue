<script setup>
import { spriteSvg } from '@/helpers.js';
import { useSliderClient } from '@/composables/useSlider.client.js';
import { ref } from 'vue';

const sliderRef = ref(null);
useSliderClient(sliderRef, { autoplay: true, autoplaySpeed: 3000 });

const contacts = [
  {
    'flag': 'ru',
    'city': 'Россия, Екатеринбург',
    'href': 'https://maps.app.goo.gl/HTsqPoDsGSkErSW8A',
    'address': 'пер. Красный, 5/1',
    'slug': 'ekaterinburg',
    'hasData': true,
  },
  {
    'flag': 'ru',
    'city': 'Россия, Сочи',
    'href': 'https://goo.gl/maps/zjoLkPpk86YnWuMt9',
    'address': 'ул. Невская, 23',
    'slug': 'sochi',
    'hasData': true,
  },
  {
    'flag': 'ru',
    'city': 'Россия, Красноярск',
    'href': 'https://maps.app.goo.gl/Ro2GWZBaUD6Zmw1C9',
    'address': 'ул. Красной армии, 10/5',
    'slug': 'krasnoyarsk',
    'hasData': true,
  },
  {
    'flag': 'kz',
    'city': 'Казахстан, Рудный',
    'href': 'https://maps.app.goo.gl/HnMBq97oQGtJdh2F6',
    'address': 'ул. Горняков, 70, офис 422',
    'slug': 'rudny',
    'hasData': false,
  },
  {
    'flag': 'vn',
    'city': 'Vietnam, Ho Chi Minh',
    'href': 'https://maps.app.goo.gl/mUh8chAVG3zMdbMq9',
    'address': '7th Floor, Long Tower, 101 - 103 Nguyen Cuu Van St., Ward 17, Binh Thanh Dist, Ho Chi Minh City',
    'slug': 'ho-chi-minh',
    'hasData': false,
  },
];

const socialLinks = [
  {
    'href': 'https://t.me/interesnee_ru',
    'icon': 'tg',
  },
  {
    'href': 'https://vk.com/interesnee_ru',
    'icon': 'vk',
  },
  {
    'href': 'https://www.linkedin.com/company/interesnee-ru/',
    'icon': 'linkedin',
  },
];

</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="office-locations">
        <p class="div-heading">Наши контакты</p>
        <ul class="scroll-snap" ref="sliderRef">
          <li v-for="contact in contacts" :key="contact.href">
            <p>
              <img class="flag" :class="contact.flag" :src="`https://blog.interesnee.ru/wp-content/themes/interesnee/project/assets/icons/flag-${contact.flag}.svg`" width="25" height="15" loading="lazy"/>
              <NuxtLink v-if="contact.hasData" :to="`/company/${contact.slug}`">{{ contact.city }}</NuxtLink>
              <template v-else>{{ contact.city }}</template>
            </p>
            <a :href="contact.href" target="_blank">{{ contact.address }}</a>
          </li>
        </ul>
      </div>
      <div class="social-links">
        <p class="div-heading">Мы в социальных сетях</p>
        <ul>
          <li v-for="socialLink in socialLinks" :key="socialLink.href">
            <a :href="socialLink.href" target="_blank">
              <svg width="20" height="20">
                <use :href="`${spriteSvg}#icon-${socialLink.icon}`"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p class="copyright">© 2006-{{ (new Date()).getFullYear() }} «Очень Интересно»</p>
        <p class="policy"><a href="/static/docs/privacy_policy.pdf">Политика обработки персональных данных</a></p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" module>

</style>