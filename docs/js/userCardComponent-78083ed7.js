import{_ as r,o,f as _,i as s,x as c,n as i}from"./main-5bec4d1c.js";const u={name:"userCardComponent",props:{user:Object}},l={class:"user__avatar"},d=["src","alt"],m={class:"user__name"};function p(n,a,e,f,v,C){var t;return o(),_("div",{class:i(["user",{privileged:(t=e.user)==null?void 0:t.privileged}]),onClick:a[0]||(a[0]=b=>n.$emit("changeActiveUser",e.user.sub))},[s("span",l,[s("img",{src:e.user.picture,alt:e.user.name},null,8,d)]),s("span",m,c(e.user.name),1)],2)}const x=r(u,[["render",p],["__scopeId","data-v-6b718f6b"]]);export{x as default};
