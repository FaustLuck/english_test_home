import{_ as n,d as a,m as t,g as m,r as p,o as r,a as c}from"./main-78052a6c.js";const _={name:"ResultView",components:{testInfoComponent:a(()=>c(()=>import("./testInfoComponent-bbf84664.js"),["js/testInfoComponent-bbf84664.js","js/main-78052a6c.js","css/main-df3f9d20.css","css/testInfoComponent-65f66e80.css"]))},computed:{...t("test",["timestamp"]),...t("auth",["sub"])},methods:{show(e){setTimeout(()=>{this.$router.replace({name:`${e}-show`})},3e3)}}};function i(e,u,d,f,l,o){const s=p("test-info-component");return r(),m(s,{timestamp:e.timestamp,sub:e.sub,onShow:o.show},null,8,["timestamp","sub","onShow"])}const w=n(_,[["render",i]]);export{w as default};