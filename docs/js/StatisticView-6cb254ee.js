import{_ as u,d as o,m as l,e as f,g as a,f as n,F as L,k as v,o as t,a as i,r}from"./main-de299c61.js";import{s as _}from"./statisticStore-397f81cb.js";const k={name:"StatisticUserView",components:{preloaderComponent:o(()=>i(()=>import("./preloaderComponent-4c855f4a.js"),["js/preloaderComponent-4c855f4a.js","js/main-de299c61.js","css/main-0fdc12b1.css","css/preloaderComponent-82881bbd.css"])),dateListComponent:o(()=>i(()=>import("./dateListComponent-95066bc5.js"),["js/dateListComponent-95066bc5.js","js/main-de299c61.js","css/main-0fdc12b1.css","js/utils-821619ce.js","js/statisticStore-397f81cb.js","css/dateListComponent-ab8a00e1.css"]))},props:{sub:String},computed:{...l(_,["dateList"])},methods:{...f(_,["getDateList"])},async created(){await this.getDateList(this.$route.params.sub)}},y={key:1,class:"statistic"};function g(e,S,c,b,h,E){const p=r("preloader-component"),d=r("date-list-component");return e.dateList?(t(),n("div",y,[(t(!0),n(L,null,v(e.dateList,(m,s)=>(t(),a(d,{key:s,count:m,datestamp:s,sub:c.sub},null,8,["count","datestamp","sub"]))),128))])):(t(),a(p,{key:0}))}const A=u(k,[["render",g],["__scopeId","data-v-21362d06"]]);export{A as default};
