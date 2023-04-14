import type { Meta, StoryObj } from "@storybook/vue3";
import HeaderComponent from "@/stories/Header.vue";
import { useAuthStore } from "@/store/auth";

const meta = {
  title: "App/Header",
  component: HeaderComponent,
  tags: ["autodocs"],
  render: () => ({
    components: { HeaderComponent },
    setup() {
      useAuthStore().isLogin = true;
    },
    template: `
			<v-layout>
			<header-component/>
			</v-layout>
    `
  })
}satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};

