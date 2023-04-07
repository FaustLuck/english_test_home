import type { Meta, StoryObj } from "@storybook/vue3";
import lineLoadingComponent from "@/stories/LineLoading.vue";

const meta = {
  title: "UI/LineLoading",
  component: lineLoadingComponent,
  tags: ["autodocs"]
}satisfies Meta<typeof lineLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};