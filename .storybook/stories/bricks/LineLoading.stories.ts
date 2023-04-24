import type { Meta, StoryObj } from "@storybook/vue3";
import lineLoadingComponent from "@/components/bricks/LineLoading.vue";

const meta = {
  title: "UI/Bricks/LineLoading",
  component: lineLoadingComponent,
}satisfies Meta<typeof lineLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};