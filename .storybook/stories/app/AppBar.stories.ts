import type { Meta, StoryObj } from "@storybook/vue3";
import AppBar from "@/components/app/AppBar.vue";
import { useAuthStore } from "@/store/auth";

const meta = {
  title: "App/Bar",
  component: AppBar
}satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  render: () => ({
    components: { AppBar },
    setup() {
      useAuthStore().isLogin = true;
    },
    template:`<v-layout><app-bar/></v-layout>`
  })
};

export const LoggedFailed: Story = {
  render: () => ({
    components: { AppBar },
    setup() {
      useAuthStore().isLogin = false;
    },
    template:`<v-layout><app-bar/></v-layout>`
  })
};