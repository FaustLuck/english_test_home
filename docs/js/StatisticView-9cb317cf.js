import{_ as m,d as o,m as u,b as l,f as a,e as n,F as f,j as L,o as t,a as i,r as c}from"./main-16d7450e.js";const v={name:"StatisticUserView",components:{preloaderComponent:o(()=>i(()=>import("./preloaderComponent-c86d3e1d.js"),["js/preloaderComponent-c86d3e1d.js","js/main-16d7450e.js","css/main-f7af7ba4.css","css/preloaderComponent-82881bbd.css"])),dateListComponent:o(()=>i(()=>import("./dateListComponent-997231eb.js"),["js/dateListComponent-997231eb.js","js/main-16d7450e.js","css/main-f7af7ba4.css"]))},props:{sub:String},computed:{...u("statistic",["dateList"])},methods:{...l("statistic",["getDateList"])},async created(){await this.getDateList(this.$route.params.sub)}},y={key:1,class:"statistic"};function b(e,k,_,g,h,E){const r=c("preloader-component"),p=c("date-list-component");return e.dateList?(t(),n("div",y,[(t(!0),n(f,null,L(e.dateList,(d,s)=>(t(),a(p,{key:s,count:d,datestamp:s,sub:_.sub},null,8,["count","datestamp","sub"]))),128))])):(t(),a(r,{key:0}))}const V=m(v,[["render",b],["__scopeId","data-v-2c09f0ad"]]);export{V as default};
