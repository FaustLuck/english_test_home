import{_ as f,d as o,a as n,e as g,o as t,g as i,w as h,f as r,F as L,k as C,r as s}from"./main-9ffe6d67.js";import{g as k}from"./utils-821619ce.js";import{s as v}from"./statisticStore-d0483957.js";const T={name:"dateListComponent",components:{itemPreloader:o(()=>n(()=>import("./itemPreloader-1ce8f040.js"),["js/itemPreloader-1ce8f040.js","js/main-9ffe6d67.js","css/main-c8ad37bc.css","css/itemPreloader-6b651cd2.css"])),titleComponent:o(()=>n(()=>import("./titleComponent-300b3793.js"),["js/titleComponent-300b3793.js","js/main-9ffe6d67.js","css/main-c8ad37bc.css","css/titleComponent-6a53e84b.css"])),testInfoComponent:o(()=>n(()=>import("./testInfoComponent-26259288.js"),["js/testInfoComponent-26259288.js","js/main-9ffe6d67.js","css/main-c8ad37bc.css","js/utils-821619ce.js","js/statisticStore-d0483957.js","css/testInfoComponent-19a6e303.css"]))},props:{count:Number,datestamp:String,sub:String},data(){return{timeList:null}},computed:{dateString(){return k(+this.datestamp)[0]}},methods:{...g(v,["getTimeList"]),async getTime(){this.timeList||(this.timeList=await this.getTimeList(this.$route.params.sub,this.datestamp))}}},y={key:1,class:"info__container"};function E(I,b,e,x,a,_){const c=s("item-preloader"),p=s("test-info-component"),d=s("title-component");return t(),i(d,{title:`${_.dateString} Тестов: ${e.count}`,onClick:_.getTime},{default:h(l=>[a.timeList?(t(),r("div",y,[(t(!0),r(L,null,C(a.timeList,(u,m)=>(t(),i(p,{key:m,timestamp:+e.datestamp+ +m,testInfo:u,sub:e.sub,"height-title":l.heightTitle},null,8,["timestamp","testInfo","sub","height-title"]))),128))])):(t(),i(c,{key:0}))]),_:1},8,["title","onClick"])}const D=f(T,[["render",E],["__scopeId","data-v-1e829ed0"]]);export{D as default};