<template>
  <div
    class="pageCard"
    :class="{ 'pageCard-longform': longform, 'pageCard-simple': !longform }"
  >
    <div class="pageCard-inner">
      <header v-if="$slots.title" class="pageCard-header">
        <router-link
          v-if="backButtonPage"
          :to="backButtonPage"
          class="pageCard-back"
        >
          <i class="fa-solid fa-chevron-left" />
        </router-link>
        <h2 class="pageCard-title">
          <slot name="title" />
        </h2>
      </header>
      <main class="pageCard-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    backButtonPage: {
      type: String,
      default: null,
    },
    longform: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.pageCard {
  display: flex;
  justify-content: center;

  &-inner {
    box-sizing: border-box;
    padding: 3vmin;
    border-radius: 1vmin;
    text-decoration: none;
    transform: translateZ(0);
    transition: color 0.4s;
    display: block;
    position: relative;
    text-align: center;
    z-index: 10;
    width: 75vmin;
    background-color: var(--color-light);
    color: var(--color-dark);
  }

  &-simple {
    height: 100vh;
    overflow: hidden;
    align-items: center;
  }

  &-longform {
    & .pageCard-inner {
      margin: 8vmin 0;
    }

    & .pageCard-main {
      font-size: 1.8vmin;
      line-height: 2vmin;
      text-align: left;
    }
  }

  &-back {
    position: absolute;
    left: 3vmin;
    display: inline-block;
    color: var(--color-link);
  }

  &-title {
    display: inline-block;
    margin-top: 1vmin;
    margin-bottom: 3vmin;
    font-size: 4vmin;
    line-height: 4vmin;
    font-weight: 600;
  }

  &-main {
    text-align: center;
    font-size: 2.5vmin;
    line-height: 3.5vmin;
    margin: 0;
  }
}
</style>