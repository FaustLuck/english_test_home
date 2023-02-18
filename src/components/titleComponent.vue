<template>
  <div
    class="container"
    :class="{'open':isOpen || mustIsOpen}"
    @click="toOpen"
  >
    <div
      ref="title"
      :class="{
      'top':isTop || mustIsTop,
      'container__title':isOpen || mustIsTop,
      'sticky':isOpen && mode==='settings'}"
    >{{ title }}
    </div>
    <slot
      v-if="isOpen || mustIsOpen"
      :heightTitle="heightTitle"
    ></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "titleComponent",
  props: {
    title: String,
    mustIsOpen: Boolean,
    mustIsTop: Boolean
  },
  data() {
    return {
      isOpen: false,
      isTop: false,
      heightTitle: 0
    };
  },
  computed: {
    ...mapState(["menuHeight"]),
    mode() {
      return this.$route.name;
    }
  },
  methods: {
    getTop() {
      if (!this.isOpen) return;
      let top = this.$refs.title.getBoundingClientRect().top;
      this.isTop = top <= this.menuHeight;
    },
    toOpen(e) {
      if (e.target !== this.$refs.title) return;
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$refs.title.style.top = `${this.menuHeight}px`;
        window.addEventListener("scroll", this.getTop);
      } else {
        window.removeEventListener("scroll", this.getTop);
      }
    },
    calculateHeightTitle() {
      let title = this.$refs.title;
      if (!title.classList.contains("container__title")) return;
      let marginBottom = parseInt(getComputedStyle(title).marginBottom);
      let height = title.getBoundingClientRect().height;
      let top = parseInt(getComputedStyle(title).top);
      this.heightTitle = height + marginBottom + top;
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.getTop);
  },
  updated() {
    if (this.isOpen) this.calculateHeightTitle();
  }
};
</script>

<style scoped lang="scss">
.container {
  text-align: center;
  background-color: #FFDAB9;
  box-shadow: 0 0 10px 5px #e9a66a;
  border-radius: 2rem;
  padding: .5rem 0;
  margin: .5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column-reverse;
  @media screen and (max-width: 768px) {
    margin: 1rem 0;
  }

  &.open {
    box-shadow: none;
  }

  &__title {
    background-color: #FFDAB9;
    margin-bottom: 1rem;
    display: flex;
    order: 1;
    justify-content: center;

    &.sticky {
      position: sticky;
    }

    &.top {
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
      box-shadow: 0 5px 0 0 #e9a66a;
      z-index: 1;
    }
  }
}
</style>