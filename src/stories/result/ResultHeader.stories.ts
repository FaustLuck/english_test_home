import type { Meta, StoryObj } from "@storybook/vue3";
import ResultHeader from "@/stories/result/ResultHeader.vue";

const meta = {
  title: "Result/Header",
  component: ResultHeader,
  tags: ["autodocs"]
}satisfies Meta<typeof ResultHeader>;

export default meta;
type Story = StoryObj<typeof meta>

export const Loading: Story = {};
export const Loaded: Story = {
  args: {
    timestamp: 1681402917884,
    correct: 5,
    timeSpent: 200,
    length: 10
  }
};