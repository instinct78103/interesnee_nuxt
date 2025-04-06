<template>

  <svg xmlns="http://www.w3.org/2000/svg" id="icon-placemark" viewBox="0 0 56 56" :class="[$style.icon, { [$style.active]: isActive }]">
    <path d="M40.092 27c-11.322 0-23.84 4.604-27.961 10.282-5.974 8.234 7.023 15.86 7.023 15.86.38.222 1.346.858 1.346.858s1.89-.636 2.592-.859c0 0 24.065-7.625 30.039-15.859C57.25 31.604 51.413 27 40.09 27zM29.316 41.85c-5.79 0-8.962-2.12-7.071-4.725 1.89-2.605 8.139-4.725 13.928-4.725 5.79 0 8.962 2.12 7.072 4.725-1.89 2.605-8.14 4.725-13.929 4.725z" opacity=".25" filter="url(#filter)"/>
    <path d="M20.5 0C9.178 0 0 9.207 0 20.565 0 37.03 18.53 52.282 18.53 52.282 19.073 52.728 20.5 54 20.5 54s1.428-1.272 1.97-1.718c0 0 18.53-15.25 18.53-31.717C41 9.207 31.822 0 20.5 0zm0 30.91c-5.687 0-10.313-4.64-10.313-10.345 0-5.705 4.626-10.346 10.313-10.346s10.313 4.641 10.313 10.346c0 5.704-4.626 10.346-10.313 10.346z"/>
    <filter id="filter" x="-6.8%" y="-11.1%" width="113.7%" height="122.2%" filterUnits="objectBoundingBox">
      <feGaussianBlur stdDeviation="1" in="SourceGraphic" />
    </filter>
    <defs>
      <linearGradient id="default" x1="0%" y1="0%" x2="50%" y2="100%">
        <stop stop-color="#C40E0E" offset="0%" />
        <stop stop-color="#F75050" offset="100%" />
      </linearGradient>
      <linearGradient id="active" x1="0%" y1="0%" x2="50%" y2="100%">
        <stop stop-color="#0058A4" offset="0%" />
        <stop stop-color="#036CC7" offset="100%" />
      </linearGradient>
    </defs>
  </svg>

</template>

<script>
export default {
  name: 'HomeMapMark',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" module>

$default-gradient: url('#default');
$active-gradient: url('#active');

.icon {
  width: 44px;
  height: 44px;
  fill: $default-gradient;
  transition: fill 0.3s;
}

.icon.active {
  fill: $active-gradient;
}
</style>
