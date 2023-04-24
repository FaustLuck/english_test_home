import type { Meta, StoryObj } from "@storybook/vue3";
import CalendarHeaderComponent from "@/stories/calendar/CalendarHeader.vue";

const meta = {
  title: "Calendar/Header",
  component: CalendarHeaderComponent,
  args: {
    year: 2023,
    max: 2023,
    min: 2022
  }
}satisfies Meta<typeof CalendarHeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {};