import { createVuetify } from "vuetify";
import "vuetify/styles";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { mdi, aliases } from "vuetify/iconsets/mdi-svg";

const customLight = {
  light: true,
  colors: {
    default: "#FFDAB9"
  },
  variables: {
    "medium-emphasis-opacity": .87,
    "high-emphasis-opacity": 1
  }
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: "customLight",
    themes: {
      customLight
    }
  }
});