import type { Meta, StoryObj } from "@storybook/vue3";
import cardUser from "@/components/cards/CardUser.vue";

const meta = {
  title: "UI/Cards/User",
  component: cardUser,
  tags: ["autodocs"]
}satisfies Meta<typeof cardUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const TestItem: Story = {
  args: {
    user: {
      name: "user name",
      picture: "https://avataaars.io/"
    }
  }
};