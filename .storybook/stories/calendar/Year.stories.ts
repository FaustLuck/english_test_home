import type { Meta, StoryObj } from "@storybook/vue3";
import Year from "@/components/calendar/Year.vue";
import { useHistoryStore } from "@/store/history";
import { History } from "@/types";

const history: History = {
  "sub": {
    "2023": [{
      "key": "key1", "timestamp": 1679230140000
    }, {
      "key": "key2", "timestamp": 1679039940000
    }]
  }
};

const users = [
  {
    minYear: 2023,
    sub: "sub"
  }
];

const meta = {
  title: "Calendar/Year",
  component: Year,
  args: {
    sub: "sub",
    year: "2023"
  },
  render: (args) => ({
    components: { Year },
    setup() {
      useHistoryStore().$patch({ users, history });
      return { args };
    },
    template: `
			<year v-bind="args"/>`
  }),
}satisfies Meta<typeof Year>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};