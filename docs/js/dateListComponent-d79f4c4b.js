import{_ as f,d as o,a as n,m as h,c as g,B as L,e as C,o as t,h as i,w as b,f as r,F as v,l as k,r as s}from"./main-6bab10b7.js";import{s as T}from"./statisticStore-a73dab09.js";const y={name:"dateListComponent",components:{itemPreloader:o(()=>n(()=>import("./itemPreloader-56e4789f.js"),["js/itemPreloader-56e4789f.js","js/main-6bab10b7.js","css/main-df3f9d20.css","css/itemPreloader-6b651cd2.css"])),titleComponent:o(()=>n(()=>import("./titleComponent-cd666273.js"),["js/titleComponent-cd666273.js","js/main-6bab10b7.js","css/main-df3f9d20.css","css/titleComponent-faf6f09e.css"])),testInfoComponent:o(()=>n(()=>import("./testInfoComponent-fde448c7.js"),["js/testInfoComponent-fde448c7.js","js/main-6bab10b7.js","css/main-df3f9d20.css","js/statisticStore-a73dab09.js","css/testInfoComponent-a2f37640.css"]))},props:{count:Number,datestamp:String,sub:String},data(){return{timeList:null}},computed:{...h(g,["orderDifficult"]),dateString(){return L(+this.datestamp)[0]}},methods:{...C(T,["getTimeList"]),async getTime(){this.timeList||(this.timeList=await this.getTimeList({sub:this.$route.params.sub,date:this.datestamp}))}}},E={key:1,class:"info__container"};function I(S,x,e,A,a,m){const c=s("item-preloader"),p=s("test-info-component"),d=s("title-component");return t(),i(d,{title:`${m.dateString} Тестов: ${e.count}`,onClick:m.getTime},{default:b(l=>[a.timeList?(t(),r("div",E,[(t(!0),r(v,null,k(a.timeList,(u,_)=>(t(),i(p,{key:_,timestamp:+e.datestamp+ +_,testInfo:u,sub:e.sub,"height-title":l.heightTitle},null,8,["timestamp","testInfo","sub","height-title"]))),128))])):(t(),i(c,{key:0}))]),_:1},8,["title","onClick"])}const B=f(y,[["render",I],["__scopeId","data-v-0f8ba9c9"]]);export{B as default};