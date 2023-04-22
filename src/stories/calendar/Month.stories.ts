import MonthComponent from "@/stories/calendar/Month.vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { useHistoryStore } from "@/store/history";

const meta = {
  title: "Calendar/Month",
  component: MonthComponent,
  args: {
    monthIndex: 2,
    year: 2023,
    sub: "sub",
    loading: false
  },
  render: (args) => ({
    components: { MonthComponent },
    setup() {
      const history = {
        "sub": {
          2023: [
            { "key": "key_1", "timestamp": 1679230140000 },
            { "key": "key_1", "timestamp": 1679039940000 }
          ]
        }
      };
      useHistoryStore().$patch({ history });
      return { args };
    },
    template: `
			<month-component v-bind="args"/>`
  })
}satisfies Meta<typeof MonthComponent>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true
  }
};