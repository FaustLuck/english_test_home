import type { Preview } from "@storybook/vue3";
import "vuetify/styles";
import { setup } from '@storybook/vue3';
import { registerPlugins } from '@/plugins';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

setup((app) => {
  registerPlugins(app);
});
export default preview;
