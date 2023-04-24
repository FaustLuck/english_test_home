import { defineStore } from "pinia";
import { ref } from "vue";
import { requestGet, requestPost } from "@/utils/requests";
import { generateID } from "@/utils/generateID";

export const useAuthStore = defineStore("auth", () => {
  const sub = ref("");
  const name = ref("");
  const picture = ref("");
  const tests = ref(false);
  const isLogin = ref(false);
  const ID = ref("");

  async function loadScript() {
    const src = "https://accounts.google.com/gsi/client";
    const script = document.createElement("script");
    script.src = src;
    script.onload = googleInitialize;
    document.body.appendChild(script);
  }

  async function googleInitialize() {

    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_client_id,
      auto_select: true,
      callback: async (response: { credential: string; }) => {
        {
          const token = response.credential;
          ID.value = generateID();
          console.log(ID.value);
          await requestPost("/user/login", { token, ID: ID.value });
          await getUserInfo();
        }
      }
    });
    const element = document.getElementById("google");
    if (element) {
      // @ts-ignore
      google.accounts.id.renderButton(
        element,
        {
          type: "icon",
          shape: "circle",
          theme: "outline",
          size: "large"
        }
      );
    }
    // @ts-ignore
    google.accounts.id.prompt();
  }

  async function getUserInfo() {
    const info = await requestGet(`/user/login/${ID.value}`);
    name.value = info.name;
    picture.value = info.picture;
    tests.value = info.tests;
    isLogin.value = true;
  }

  return {
    sub,
    name,
    picture,
    tests,
    isLogin,
    googleInitialize,
    loadScript
  };
});