import type { Meta, StoryObj } from "@storybook/vue3";
import TimerComponent from "@/stories/Timer.vue";
import { useTestStore } from "@/store/test";

const meta = {
  title: "UI/Timer",
  component: TimerComponent,
  render: () => ({
    components: { TimerComponent },
    setup() {
      useTestStore().$patch({ timer: 250 });
    },
    template: `
			<timer-component/>`
  }),
}satisfies Meta<typeof TimerComponent>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};