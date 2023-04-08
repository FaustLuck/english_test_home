import type { Meta, StoryObj } from "@storybook/vue3";

import buttonComponent from "./Button.vue";

const meta = {
  title: "UI/Brick/Button",
  component: buttonComponent,
  tags: ["autodocs"],
  args: {
    value: "Надпись",
    loading: false
  }
}satisfies Meta<typeof buttonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Icon: Story = {
  args: {
    value:'',
    icon: "mdi mdi-vuetify"
  }
};