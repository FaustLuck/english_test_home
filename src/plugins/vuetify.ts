import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { mdi, aliases } from "vuetify/iconsets/mdi";

const customLight = {
  light: true,
  colors: {
    primary: "#FFDAB9"
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