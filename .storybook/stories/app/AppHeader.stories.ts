import type { Meta, StoryObj } from "@storybook/vue3";
import { useAuthStore } from "@/store/auth";
import AppHeader from "@/components/app/AppHeader.vue";

const meta = {
  title: "App/Header",
  component: AppHeader,
  render: () => ({
    components: {AppHeader },
    setup() {
      useAuthStore().isLogin = true;
    },
    template: `
	    <v-layout>
	    <app-header/>
	    </v-layout>
    `
  })
}satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};