import type { Meta, StoryObj } from "@storybook/vue3";

import buttonComponent from "./Button.vue";

const meta = {
  title: "Example/LoadButton",
  component: buttonComponent,
  tags: ["autodocs"],
  args: { value: "Надпись" }
}satisfies Meta<typeof buttonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const aaa: Story = {};