<script setup>

import { ref } from 'vue';

const dialog = ref();

const showModal = () => dialog.value?.showModal();

defineExpose({
  showModal,
});

</script>

<template>
  <dialog ref="dialog" class="modal">
    <slot name="arrowLeft"></slot>
    <div class="dialog--wrap modal-box">
      <slot name="body"/>
    </div>
    <slot name="arrowRight"></slot>
    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  </dialog>
</template>

<style lang="scss">

.modal[open] {
  display: grid;
  height: 100%;
  width: 100%;
  max-width: none;
  max-height: none;
  justify-items: center;
  align-items: center;

  section {
    padding-block: 0;

    > * {
      max-height: 100%;
      overflow-y: auto;
    }
  }
}

.modal-box {
  overflow-y: auto;
  overscroll-behavior: contain;
  max-height: calc(100vh - 5em);

  form {
    margin-block: 30px;
  }

  &:has(form) {
    align-items: unset !important;
  }
}

.modal-box,
.modal-backdrop {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.modal-backdrop {
  z-index: -1;
  display: grid;
  align-self: stretch;
  justify-self: stretch;
}

dialog {
  overscroll-behavior: contain;
  max-width: 90cqmin;
  margin: auto;
  border: none;
  inset: 0;
  transition: transform 0.3s ease-in-out;
  padding: 0;
  background-color: transparent;
  overflow-y: hidden;


  &::backdrop {
    background-color: rgb(0, 0, 0, 0.5);
  }

  form[method='dialog'] {
    //padding: 30px;
    border: none;

    > * {
      outline: none;
    }

    > button {
      color: transparent;
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
}

.sliderItem {
  img {
    object-fit: contain;
    display: block;
    width: inherit;
  }
}

dialog {
  .dialog--wrap {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-x: auto;
    scrollbar-width: none;
    align-items: center;
    gap: 20px;
    max-width: 767px;
    height: fit-content;

    > * {
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      min-width: 100%;

      > * {
        width: 100%;
    }
    }
  }
}
</style>