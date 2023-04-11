import DivideComponent from "./Divide.vue";
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
      <div>
	      <span>Injected Slot</span>
      </div>
			
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