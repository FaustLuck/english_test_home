import { defineStore } from "pinia";
import { requestGet, requestPost } from "@/utils/requests";

export const authStore = defineStore("auth", {
  state() {
    return {
      privileged: false,
      sub: undefined,
      name: undefined,
      picture: undefined,
      tests: undefined
    };
  },
  actions: {
    async googleInitialize() {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_client_id,
        auto_select: true,
        callback: async (response) => {
          {
            const token = response.credential;
            this.parseJwt(token);
            await requestPost("/user/login", {token});
            await this.getUserInfo();
          }
        }
      });
      google.accounts.id.renderButton(
        document.getElementById("google"),
        {
          type: "icon",
          shape: "circle",
          theme: "outline",
          size: "large"
        }
      );
      google.accounts.id.prompt();
    },
    parseJwt(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(window.atob(base64).split("").map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(""));
      const {sub} = JSON.parse(jsonPayload);
      this.sub = sub;
    },
    async getUserInfo() {
      const info = await requestGet(`/user/login/${this.sub}`);
      Object.assign(this, info);
    }
  }
});