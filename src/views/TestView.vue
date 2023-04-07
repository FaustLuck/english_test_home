<template>
  <v-container class="pa-0">
    <card-component v-for="i of 3" :key="i" :loading="isLoading"/>
    <card-component v-for="(item) of test" :key="item.key" :item="item"/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { defineAsyncComponent } from "vue";
import { testStore } from "@/store/testStore";
import { mainStore } from "@/store/mainStore";
import { authStore } from "@/store/authStore";

export default {
  name: "TestView",
  components: {
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent.vue")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent.vue")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent.vue")),
    CardComponent: defineAsyncComponent(() => import("@/stories/CardTest.vue"))
  },
  data() {
    return {
      radioCheck: null,
    };
  },
  computed: {
    ...mapState(authStore, ["sub"]),
    ...mapState(testStore, ["test", "isTesting"]),
    ...mapState(mainStore, ["isLoading"]),
  },
  watch: {
    async isTesting(value) {
      if (!value) {
        await this.sendAnswers(this.sub);
        this.$router.push({name: "result"});
      }
    }
  },
  methods: {
    ...mapActions(testStore, ["saveChoice", "sendAnswers"]),
  }
};
</script>