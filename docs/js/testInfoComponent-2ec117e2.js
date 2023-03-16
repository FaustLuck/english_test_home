import{_ as w,d as u,a as p,m as _,t as T,c as S,b as C,e as f,o as n,g,f as c,x as l,h,i as s,F as I,k,n as L,r as y,p as D,j as B}from"./main-6fbbc46d.js";import{g as F}from"./utils-821619ce.js";import{s as R}from"./statisticStore-d03f6910.js";const E={name:"testInfoComponent",components:{itemPreloader:u(()=>p(()=>import("./itemPreloader-7860d662.js"),["js/itemPreloader-7860d662.js","js/main-6fbbc46d.js","css/main-c8ad37bc.css","css/itemPreloader-6b651cd2.css"])),preloaderComponent:u(()=>p(()=>import("./preloaderComponent-60b25676.js"),["js/preloaderComponent-60b25676.js","js/main-6fbbc46d.js","css/main-c8ad37bc.css","css/preloaderComponent-82881bbd.css"])),testDifficultComponent:u(()=>p(()=>import("./testDifficultComponent-ac57701f.js"),["js/testDifficultComponent-ac57701f.js","js/main-6fbbc46d.js","css/main-c8ad37bc.css","js/settingsStore-e97c3d8a.js","css/testDifficultComponent-03e664ea.css"]))},props:{timestamp:Number,testInfo:Object,sub:String,heightTitle:Number},data(){var t,e;return{displayMode:0,date:0,time:0,localTest:null,localTimeSpent:(t=this.testInfo)==null?void 0:t.timeSpent,localTimeLeft:(e=this.testInfo)==null?void 0:e.timeLeft}},watch:{result(t){t&&this.mode==="result"&&(this.localTest=this.result,this.localTimeSpent=this.timeSpent,this.localTimeLeft=this.timeLeft,this.isCongratulation&&this.$emit("show","fire"),this.isFail&&this.$emit("show","fail"),this.setLoading(!1))},async sub(t){t&&await this.saveTest(t)}},computed:{..._(T,["timeSpent","result","timeLeft"]),..._(S,["orderDifficult","isLoading","mode"]),..._(C,["name"]),length(){var t;return this.mode==="result"?Object.values(this.result).reduce((e,d)=>e+d.length,0):(t=this.testInfo)==null?void 0:t.questions},correct(){var t;return this.mode==="result"?Object.values(this.result).reduce((e,d)=>e+d.filter(r=>r.answer===(r==null?void 0:r.choice)).length,0):(t=this.testInfo)==null?void 0:t.correct},timeSpentToString(){let t=(this.localTimeSpent%60).toString().padStart(2,"0");return`${(this.localTimeSpent-t)/60}:${t}`},isCongratulation(){return this.length===this.correct},isFail(){return this.localTimeLeft===0}},methods:{...f(R,["getResult"]),...f(T,["checkTest","saveTest","getVerifiedTest"]),...f(S,["setLoading"]),async changeDisplayMode(t){if(this.mode==="result"&&!this.localTest||(this.displayMode++,this.displayMode>2&&(this.displayMode=0),(this.isCongratulation||!this.correct)&&this.displayMode===1&&(this.displayMode=2),this.displayMode===0))return;await this.getResultFromBD();let e=t.target.closest(".info");setTimeout(()=>this.scroll(e),0)},async getResultFromBD(){this.localTest||(this.localTest=await this.getResult(this.sub,this.timestamp))},scroll(t){let e=t.getBoundingClientRect().top;e!==this.heightTitle&&this.displayMode>0&&window.scrollBy({top:e-this.heightTitle,behavior:"smooth"})},filterTest(t){return this.localTest[t].filter(e=>e.answer!==(e==null?void 0:e.choice))}},async mounted(){[this.date,this.time]=F(this.timestamp),this.mode==="result"&&(await this.getVerifiedTest(this.sub),this.displayMode=2,this.sub&&await this.saveTest(this.sub))}},m=t=>(D("data-v-c1f2b1a9"),t=t(),B(),t),V={key:0,class:"info__login"},O={class:"info__detail-clickable"},A={class:"info__detail"},P=m(()=>s("span",null,"Время тестирования:",-1)),j={class:"info__detail"},N=m(()=>s("span",null,"Кол-во верных ответов / вопросов:",-1)),q={class:"info__detail"},z=m(()=>s("span",null,"Времени затрачено:",-1)),G={key:0,class:"info__detail-fail"},H=m(()=>s("span",null,"Время вышло!",-1)),J=[H],K={key:2};function Q(t,e,d,r,i,o){const v=y("preloader-component"),b=y("item-preloader"),M=y("test-difficult-component");return t.isLoading&&t.mode==="result"?(n(),g(v,{key:0})):(n(),c("section",{key:1,class:L(["info",{fail:o.isFail&&t.mode!=="result"&&!i.displayMode,congratulation:o.isCongratulation&&t.mode!=="result"&&!i.displayMode}]),onClick:e[0]||(e[0]=(...a)=>o.changeDisplayMode&&o.changeDisplayMode(...a))},[t.mode==="result"?(n(),c("div",V,l(t.name?t.name:"Вход не выполнен"),1)):h("",!0),s("div",O,[s("div",A,[P,s("span",null,l(i.date)+" "+l(i.time),1)]),s("div",j,[N,s("span",null,l(o.correct)+" / "+l(o.length),1)]),s("div",q,[z,s("span",null,l(o.timeSpentToString),1)]),o.isFail&&t.mode==="result"?(n(),c("div",G,J)):h("",!0)]),i.displayMode>0&&!i.localTest?(n(),g(b,{key:1})):h("",!0),i.displayMode>0&&i.localTest?(n(),c("div",K,[(n(!0),c(I,null,k(t.orderDifficult,a=>(n(),g(M,{key:a,difficult:a,"part-answers":i.displayMode===1?o.filterTest(a):i.localTest[a]},null,8,["difficult","part-answers"]))),128))])):h("",!0)],2))}const Y=w(E,[["render",Q],["__scopeId","data-v-c1f2b1a9"]]);export{Y as default};
