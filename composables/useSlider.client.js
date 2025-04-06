// Safari doesn't natively support the `scrollend` event
// import { scrollend } from 'https://cdn.jsdelivr.net/gh/argyleink/scrollyfills@latest/dist/scrollyfills.modern.js';
import { onMounted, onUnmounted, ref, toValue, unref } from 'vue';

export function useSliderClient(sliderRef, props) {
  const isVisible = ref(false);
  const currentIndex = ref(0);
  let visibilityObserver = null;
  let observer = null;
  let intervalId = null;
  const countSlidesRef = ref(0);
  const isMouseEntered = ref(false);
  const hasIntersected = new Set();

  const observeVisibility = () => {
    if (!sliderRef.value) return;

    visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting;
          if (isVisible.value) {
            startAutoScroll();
          } else {
            stopAutoScroll();
          }
        });
      },
      { threshold: 0.1 },
    );

    visibilityObserver.observe(sliderRef.value);
  };

  const navigateTimeout = ref(null);

  const observeSlides = () => {
    if (!sliderRef.value) return;
    observer = new IntersectionObserver(
      (entries) => {
        clearTimeout(navigateTimeout.value);
        entries.forEach((entry) => {

          hasIntersected.add(entry);

          if (entry.isIntersecting) {
            navigateTimeout.value = setTimeout(() => {
              currentIndex.value = [...sliderRef.value.children].indexOf(entry.target);
            }, 250);
          }
        });
      },
      { threshold: 0.6, root: sliderRef.value },
    );

    [...sliderRef.value.children].forEach((slide) => observer.observe(slide));
  };

  function navigate(arg) {
    if (arg === 'forward') {
      currentIndex.value++;

      if (currentIndex.value > sliderRef.value.children.length - 1) {
        currentIndex.value = 0;
      }
    } else if (arg === 'backward') {
      currentIndex.value--;

      if (currentIndex.value < 0) {
        currentIndex.value++;
        return;
      }
    } else if (typeof arg === 'number') {
      currentIndex.value = arg;
    }

    sliderRef.value?.scrollTo({
      left: sliderRef.value.children[currentIndex.value].offsetLeft,
      behavior: 'smooth'
    })
  }

  function synchronize() {
    for (let observation of hasIntersected) {
      if (observation.isIntersecting) {
        currentIndex.value = [...sliderRef.value.children].indexOf(observation.target);
      }
    }
    hasIntersected.clear();
  }

  const scrollToSlide = function (index) {
    scrollToSlide.scrollTimeout = null;
    const sliderWidth = unref(sliderRef).clientWidth;  // Width of the visible slider area
    const slideWidth = unref(sliderRef).children[index].offsetWidth; // Width of each slide
    const targetPosition = index * slideWidth;

    // Adjust if the slideWidth is smaller than the slider width (peek behavior on desktop)
    const adjustPosition = Math.min(targetPosition, unref(sliderRef).scrollWidth - sliderWidth);

    clearTimeout(scrollToSlide.scrollTimeout);
    scrollToSlide.scrollTimeout = setTimeout(() => {
      unref(sliderRef).scrollTo({
        left: adjustPosition,
        behavior: 'smooth',
      });
    }, 0);
  };

  const startAutoScroll = () => {
    if (props?.autoplay && props?.autoplaySpeed && isVisible.value && !isMouseEntered.value) {
      clearInterval(intervalId);
      intervalId = setInterval(() => navigate('forward'), props?.autoplaySpeed);
    }
  };

  const stopAutoScroll = () => {
    clearInterval(intervalId);
  };

  const handleResize = () => {
    observer?.disconnect();
    observeSlides();
  };

  onMounted(() => {
    startAutoScroll();
    observeSlides();
    observeVisibility();
    synchronize();

    sliderRef.value?.addEventListener('scroll', stopAutoScroll);
    sliderRef.value?.addEventListener('scrollend', startAutoScroll);

    sliderRef.value?.parentElement.addEventListener('mouseenter', () => isMouseEntered.value = true);
    sliderRef.value?.parentElement.addEventListener('mouseleave', () => isMouseEntered.value = false);

    sliderRef.value?.parentElement.addEventListener('mouseenter', stopAutoScroll);
    sliderRef.value?.parentElement.addEventListener('mouseleave', startAutoScroll);

    countSlidesRef.value = sliderRef.value.children.length;

    window.addEventListener('resize', handleResize);

    sliderRef.value?.addEventListener('scrollend', synchronize);
  });

  onUnmounted(() => {
    observer?.disconnect();
    visibilityObserver?.disconnect();
    stopAutoScroll();

    unref(sliderRef)?.removeEventListener('scroll', stopAutoScroll);
    sliderRef.value?.parentElement.removeEventListener('mouseenter', stopAutoScroll);
    sliderRef.value?.parentElement.removeEventListener('mouseleave', startAutoScroll);
    sliderRef.value?.parentElement.removeEventListener('scrollend', startAutoScroll);
    sliderRef.value?.parentElement.removeEventListener('scrollend', synchronize);

    window.removeEventListener('resize', handleResize);
  });

  return {
    countSlidesRef,
    currentIndex,
    navigate,
    scrollToSlide,
    startAutoScroll,
  };
}