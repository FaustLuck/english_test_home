import{_ as f,d as o,a as n,m as g,c as h,e as L,o as t,g as i,w as C,f as _,F as b,k,r as s}from"./main-5a7cda18.js";import{g as v}from"./utils-821619ce.js";import{s as T}from"./statisticStore-6b49608d.js";const y={name:"dateListComponent",components:{itemPreloader:o(()=>n(()=>import("./itemPreloader-8a06dd40.js"),["js/itemPreloader-8a06dd40.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","css/itemPreloader-6b651cd2.css"])),titleComponent:o(()=>n(()=>import("./titleComponent-4809c3fb.js"),["js/titleComponent-4809c3fb.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","css/titleComponent-faf6f09e.css"])),testInfoComponent:o(()=>n(()=>import("./testInfoComponent-bd395d02.js"),["js/testInfoComponent-bd395d02.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","js/utils-821619ce.js","js/statisticStore-6b49608d.js","css/testInfoComponent-a2f37640.css"]))},props:{count:Number,datestamp:String,sub:String},data(){return{timeList:null}},computed:{...g(h,["orderDifficult"]),dateString(){return v(+this.datestamp)[0]}},methods:{...L(T,["getTimeList"]),async getTime(){this.timeList||(this.timeList=await this.getTimeList({sub:this.$route.params.sub,date:this.datestamp}))}}},E={key:1,class:"info__container"};function I(S,x,e,A,a,m){const c=s("item-preloader"),p=s("test-info-component"),d=s("title-component");return t(),i(d,{title:`${m.dateString} Тестов: ${e.count}`,onClick:m.getTime},{default:C(l=>[a.timeList?(t(),_("div",E,[(t(!0),_(b,null,k(a.timeList,(u,r)=>(t(),i(p,{key:r,timestamp:+e.datestamp+ +r,testInfo:u,sub:e.sub,"height-title":l.heightTitle},null,8,["timestamp","testInfo","sub","height-title"]))),128))])):(t(),i(c,{key:0}))]),_:1},8,["title","onClick"])}const B=f(y,[["render",I],["__scopeId","data-v-0f8ba9c9"]]);export{B as default};