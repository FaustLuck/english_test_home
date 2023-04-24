import DivideComponent from "@/stories/bricks/Divide.vue";
import { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: "UI/Bricks/Divide",
  component: DivideComponent,
  tags: ["autodocs"],
  args: {
    loading: true
  },
  render: (args) => ({
    components: { DivideComponent },
    setup() {
      return { args };
    },
    template: `
			<divide-component :loading="args.loading">
	      <span>Injected Slot</span>
			</divide-component>`
  })
}satisfies Meta<typeof DivideComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};

export const Loaded: Story = {
  args: {
    loading: false
  }
};