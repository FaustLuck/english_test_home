(function(){"use strict";var t={397:function(t,e,n){var i=n(9242),s=n(3396);const a={class:"menu"},r=(0,s.Uk)("⚙️"),o=(0,s.Uk)("📊");function c(t,e,n,i,c,l){const d=(0,s.up)("router-link"),u=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("nav",a,[(0,s.Wm)(d,{to:"/settings"},{default:(0,s.w5)((()=>[r])),_:1}),(0,s.Wm)(d,{to:"/statistic"},{default:(0,s.w5)((()=>[o])),_:1})]),(0,s.Wm)(u)],64)}var l={},d=n(89);const u=(0,d.Z)(l,[["render",c]]);var p=u,g=n(678),h=n(7139);const m=t=>((0,s.dD)("data-v-101c6dbe"),t=t(),(0,s.Cn)(),t),f={key:1},w=m((()=>(0,s._)("div",null,null,-1)));function v(t,e,n,i,a,r){const o=(0,s.up)("loader-spinner");return a.loading?((0,s.wg)(),(0,s.j4)(o,{key:0})):((0,s.wg)(),(0,s.iD)("form",f,[(0,s._)("header",null,[(0,s._)("input",{onClick:e[0]||(e[0]=t=>r.createTest()),type:"button",value:"Начать тест"}),(0,s._)("span",null,(0,h.zw)(a.timerString),1),w]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.test,(t=>((0,s.wg)(),(0,s.iD)("div",{key:t})))),128))]))}const _=t=>((0,s.dD)("data-v-bddc5940"),t=t(),(0,s.Cn)(),t),y={class:"preloader"},k=_((()=>(0,s._)("div",{class:"outer circle"},[(0,s._)("div",{class:"spinner"})],-1))),D=_((()=>(0,s._)("div",{class:"inner circle"},null,-1))),b=[k,D];function q(t,e,n,i,a,r){return(0,s.wg)(),(0,s.iD)("div",y,b)}var x={};const C=(0,d.Z)(x,[["render",q],["__scopeId","data-v-bddc5940"]]);var I=C,O={name:"TestPage",components:{LoaderSpinner:I},data(){return{settings:{},path:"settings",timerString:"",timerSec:0,loading:!0,ready:!1,test:[]}},watch:{timerSec:function(t){let e=(t%60).toString().padStart(2,"0"),n=(t-e)/60;this.timerString=`${n}:${e}`},ready:function(t){t&&this.countdown()}},async mounted(){let t=this.$store.getters.getInfo(this.path);this.settings=Object.keys(t).length?t:await this.$store.dispatch("fetchData",{path:this.path}),this.loading=!1,this.timerSec=60*this.settings.timer.min+this.settings.timer.sec},methods:{createTest(){let t=[],e=this.settings.variants;for(let[n,i]of Object.entries(this.settings.dictionary)){let s=[];do{let t=this.getRandomQuestion(i);if(this.checkRepeat(s,t))continue;let n=[t];do{let t=this.getRandomQuestion(i);this.checkRepeat(n,t)||n.push(t)}while(n.length<e);t.answer=n.map((t=>t.answer));let a=t.answer[0];t.answer.sort();let r=t.answer.findIndex((t=>t==a));console.log(r),t.answer[r]={answer:a,correct:!0},s.push(t)}while(s.length<this.settings.tests[n]);t.push([...s])}this.test=t,this.ready=!0},countdown(){let t=setInterval((()=>{this.timerSec--,this.timerSec||clearInterval(t)}),1e3)},getDate(){return new Intl.DateTimeFormat("ru-Ru",{year:"2-digit",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date).split(", ")},getRandomQuestion(t){return t[Math.floor(Math.random()*t.length)]},createVariants(t,e,n){let i=[e],s=[...t].map((t=>t.ru));s.splice(s.indexOf(e),1);while(i.length<n){let t=s.getRandom();s.splice(s.indexOf(t),1),i.push(t)}return i.sort()},checkRepeat(t,e){return t.includes((t=>t.question==e.question))}}};const j=(0,d.Z)(O,[["render",v],["__scopeId","data-v-101c6dbe"]]);var S=j;const R=t=>((0,s.dD)("data-v-22d5daee"),t=t(),(0,s.Cn)(),t),A={key:1},V=["onClick"],T={class:"tests__info"},U=R((()=>(0,s._)("span",null,"Дата теста: ",-1))),$={class:"date"},z={class:"tests__info"},Z=R((()=>(0,s._)("span",null,"Количество тестов: ",-1)));function E(t,e,n,i,a,r){const o=(0,s.up)("loader-spinner"),c=(0,s.up)("test-result");return a.loading?((0,s.wg)(),(0,s.j4)(o,{key:0})):((0,s.wg)(),(0,s.iD)("form",A,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(this.tests,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:(0,h.C_)(["tests",{open:a.activeDay===e}]),key:e,onClick:n=>{a.activeDay=e,r.openTests(t)}},[(0,s._)("div",T,[U,(0,s._)("span",$,(0,h.zw)(e),1)]),(0,s._)("div",z,[Z,(0,s._)("span",null,(0,h.zw)(Object.keys(t).length),1)]),((0,s.wg)(),(0,s.j4)(s.Ob,null,[a.activeDay===e?((0,s.wg)(),(0,s.j4)(c,{key:0,tests:a.testsOfDay},null,8,["tests"])):(0,s.kq)("",!0)],1024))],10,V)))),128))]))}const H=t=>((0,s.dD)("data-v-99830e2a"),t=t(),(0,s.Cn)(),t),K=["onClick"],P={class:"test__detail"},Y=H((()=>(0,s._)("span",null," Время выполнения теста: ",-1))),L={class:"time"},M={class:"test__detail"},F=H((()=>(0,s._)("span",null," Затраченное время: ",-1))),Q={class:"test__detail"},W=H((()=>(0,s._)("span",null," Кол-во верных ответов / вопросов: ",-1)));function B(t,e,n,i,a,r){const o=(0,s.up)("difficult-list");return(0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.tests,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"test",key:e,onClick:t=>a.activeTime=e},[(0,s._)("div",P,[Y,(0,s._)("span",L,(0,h.zw)(e),1)]),(0,s._)("div",M,[F,(0,s._)("span",null,(0,h.zw)(t["time spent"]),1)]),(0,s._)("div",Q,[W,(0,s._)("span",null,(0,h.zw)(t.correctAnswers)+" / "+(0,h.zw)(t.questions),1)]),((0,s.wg)(),(0,s.j4)(s.Ob,null,[a.activeTime===e?((0,s.wg)(),(0,s.j4)(o,{key:0,difficults:t.answers},null,8,["difficults"])):(0,s.kq)("",!0)],1024))],8,K)))),128)}const N={class:"difficult__item"};function G(t,e,n,i,a,r){const o=(0,s.up)("card-item");return(0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.difficults,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"difficult",key:e},[(0,s._)("div",N,[(0,s._)("span",null,(0,h.zw)(e),1)]),((0,s.wg)(),(0,s.j4)(s.Ob,null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t,((t,n)=>((0,s.wg)(),(0,s.j4)(o,{key:t.question,item:t,index:n,difficult:e},null,8,["item","index","difficult"])))),128))],1024))])))),128)}var J=n.p+"img/edit.71798a50.svg",X=n.p+"img/delete.96103a4e.svg",tt=n.p+"img/done.c0cf71e6.svg";const et={class:"card"},nt={class:"card__item"},it={class:"card__item_container"},st=["readonly"],at={class:"card__item"},rt={class:"card__item_container"},ot=["checked","name"],ct=["readonly"],lt={class:"card__item_container"},dt=["checked","name"];function ut(t,e,n,a,r,o){return(0,s.wg)(),(0,s.iD)("div",et,[(0,s._)("div",nt,[(0,s._)("div",it,[(0,s.wy)((0,s._)("input",{onKeyup:e[0]||(e[0]=t=>o.edit(t,"question")),readonly:!r.editing,class:(0,h.C_)({editing:r.editing}),"onUpdate:modelValue":e[1]||(e[1]=t=>r.question=t),type:"text"},null,42,st),[[i.nr,r.question]]),n.voice?((0,s.wg)(),(0,s.iD)("a",{key:0,class:"voice",onClick:e[2]||(e[2]=(...t)=>o.speech&&o.speech(...t))},"🔉")):(0,s.kq)("",!0)])]),(0,s._)("div",at,[(0,s._)("div",rt,[n.item.hasOwnProperty("correct")||!n.editable?((0,s.wg)(),(0,s.iD)("input",{key:0,checked:n.item.correct,name:n.difficult+"_"+n.index,type:"radio"},null,8,ot)):(0,s.kq)("",!0),(0,s.wy)((0,s._)("input",{type:"text",readonly:!r.editing,"onUpdate:modelValue":e[3]||(e[3]=t=>r.answer=t),onKeyup:e[4]||(e[4]=t=>o.edit(t,"answer")),class:(0,h.C_)({correct:n.item.correct,wrong:n.item.hasOwnProperty("correct")&&!n.item.correct,editing:r.editing})},null,42,ct),[[i.nr,r.answer]])]),(0,s._)("div",lt,[r.correctAnswer?((0,s.wg)(),(0,s.iD)("input",{key:0,checked:!n.item.correct,name:n.difficult+"_"+n.index,type:"radio"},null,8,dt)):(0,s.kq)("",!0),r.correctAnswer?(0,s.wy)(((0,s.wg)(),(0,s.iD)("input",{key:1,type:"text",class:(0,h.C_)({correct:!n.item.correct,wrong:n.item.correct}),"onUpdate:modelValue":e[5]||(e[5]=t=>r.correctAnswer=t)},null,2)),[[i.nr,r.correctAnswer]]):(0,s.kq)("",!0)])]),n.editable?((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,h.C_)(["card__item tool",{show:r.editing}])},[r.editing?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("img",{key:0,src:J,onClick:e[6]||(e[6]=t=>r.editing=!0)})),r.editing?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("img",{key:1,src:X,onClick:e[7]||(e[7]=e=>t.$emit("deleteRecord",n.item))})),r.editing?((0,s.wg)(),(0,s.iD)("img",{key:2,src:tt,onClick:e[8]||(e[8]=e=>{r.editing="newValue"==n.index||!1,t.$emit("editRecord",{answer:r.answer,question:r.question,index:n.index}),o.clear()})})):(0,s.kq)("",!0)],2)):(0,s.kq)("",!0)])}var pt={name:"CardItem",props:{item:Object,index:String,voice:{type:Boolean,default:!1,required:!1},difficult:{type:String,default:"",required:!1},editable:{type:Boolean,default:!1,required:!1}},data(){return{editing:"newValue"==this.index,question:this.item.question,answer:this.item.answer,correctAnswer:this.item.correctAnswer}},methods:{speech(t){let e=t.target.previousElementSibling.innerText;var n=new SpeechSynthesisUtterance(e);n.lang="en-US",n.rate=.75,window.speechSynthesis.speak(n)},edit(t,e){let n=/[^а-яА-ЯёЁa-zA-Z.,!?\s]/g;n.exec(t.key)&&(this[e]=t.target.value.replaceAll(n,""))},clear(){"newValue"==this.index&&(this.question="",this.answer="")}}};const gt=(0,d.Z)(pt,[["render",ut],["__scopeId","data-v-0fccfaf4"]]);var ht=gt,mt={components:{CardItem:ht},name:"DifficultList",props:{difficults:Object}};const ft=(0,d.Z)(mt,[["render",G],["__scopeId","data-v-bdfbe3c6"]]);var wt=ft,vt={name:"TestResult",components:{DifficultList:wt},props:{tests:Object},data(){return{activeTime:""}}};const _t=(0,d.Z)(vt,[["render",B],["__scopeId","data-v-99830e2a"]]);var yt=_t,kt={name:"StatisticPage",components:{TestResult:yt},data(){return{tests:{},loading:!0,activeDay:"",testsOfDay:{},path:"statistic"}},async mounted(){let t=this.$store.getters.getInfo(this.path);this.tests=Object.keys(t).length?t:await this.$store.dispatch("fetchData",{path:this.path}),this.loading=!1},methods:{openTests(t){this.testsOfDay=t}}};const Dt=(0,d.Z)(kt,[["render",E],["__scopeId","data-v-22d5daee"]]);var bt=Dt;const qt=t=>((0,s.dD)("data-v-bb9a2674"),t=t(),(0,s.Cn)(),t),xt={key:1},Ct={class:"settings"},It={class:"settings__detail"},Ot=qt((()=>(0,s._)("span",null,"Ограничение по времени:",-1))),jt={class:"time"},St=(0,s.Uk)(" : "),Rt={class:"settings__detail"},At=qt((()=>(0,s._)("span",null,"Количество вариантов:",-1))),Vt={class:"difficult"},Tt=["onClick"],Ut=["onUpdate:modelValue","onInput"],$t={class:"settings__detail update"};function zt(t,e,n,a,r,o){const c=(0,s.up)("loader-spinner"),l=(0,s.up)("card-item");return r.loading?((0,s.wg)(),(0,s.j4)(c,{key:0})):((0,s.wg)(),(0,s.iD)("form",xt,[(0,s._)("div",Ct,[(0,s._)("div",It,[Ot,(0,s._)("span",jt,[(0,s.wy)((0,s._)("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=t=>r.settings.timer.min=t)},null,512),[[i.nr,r.settings.timer.min,void 0,{number:!0}]]),St,(0,s.wy)((0,s._)("input",{type:"number","onUpdate:modelValue":e[1]||(e[1]=t=>r.settings.timer.sec=t)},null,512),[[i.nr,r.settings.timer.sec,void 0,{number:!0}]])])]),(0,s._)("div",Rt,[At,(0,s._)("span",null,[(0,s.wy)((0,s._)("input",{type:"number","onUpdate:modelValue":e[2]||(e[2]=t=>r.settings.variants=t)},null,512),[[i.nr,r.settings.variants,void 0,{number:!0}]])])]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.settings.tests,((t,n)=>((0,s.wg)(),(0,s.iD)("div",{key:n},[(0,s._)("div",Vt,[r.settings.dictionary[n].length?((0,s.wg)(),(0,s.iD)("div",{key:0,class:"settings__detail",onClick:t=>r.activeIndex=n},[(0,s._)("span",null,"Количество вопросов "+(0,h.zw)(n),1),(0,s._)("span",null,[(0,s.wy)((0,s._)("input",{type:"number",onClick:e[3]||(e[3]=(0,i.iM)((()=>{}),["stop"])),"onUpdate:modelValue":t=>r.settings.tests[n]=t,onInput:t=>o.checkCount(t.target.value,n)},null,40,Ut),[[i.nr,r.settings.tests[n],void 0,{number:!0}]])])],8,Tt)):(0,s.kq)("",!0),((0,s.wg)(),(0,s.j4)(s.Ob,null,[r.activeIndex==n?((0,s.wg)(),(0,s.j4)(l,{key:0,index:"newValue",item:{},editable:!0,onEditRecord:o.editRecord},null,8,["onEditRecord"])):(0,s.kq)("",!0)],1024))]),r.activeIndex===n?((0,s.wg)(),(0,s.j4)(s.Ob,{key:0},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.settings.dictionary[n],(t=>((0,s.wg)(),(0,s.j4)(l,{key:t.question,item:t,index:t.question,editable:!0,onDeleteRecord:e=>o.deleteRecord(t),onEditRecord:o.editRecord},null,8,["item","index","onDeleteRecord","onEditRecord"])))),128))],1024)):(0,s.kq)("",!0)])))),128)),(0,s._)("div",$t,[(0,s._)("input",{type:"button",value:"Обновить настройки",onClick:e[4]||(e[4]=(...t)=>o.saveData&&o.saveData(...t))})])])]))}var Zt={name:"SettingsPage",components:{CardItem:ht},data(){return{settings:{},loading:!0,path:"settings",activeIndex:""}},methods:{checkCount(t,e){let n=this.settings.dictionary[e].length;t>n&&(this.settings.tests[e]=n)},saveData(){this.$store.dispatch("setData",{path:this.path,data:this.settings})},deleteRecord(t){this.settings.dictionary[this.activeIndex]=this.settings.dictionary[this.activeIndex].filter((e=>e.question!=t.question))},editRecord(t){let e=this.settings.dictionary[this.activeIndex],n="newValue"==t.index?t.question:t.index,i=e.findIndex((t=>t.question==n));if("newValue"==t.index){if(i>-1)return;let n={question:t.question,answer:t.answer};e.push(n)}else e[i].question=t.question,e[i].answer=t.answer}},async mounted(){let t=this.$store.getters.getInfo(this.path);this.settings=Object.keys(t).length?t:await this.$store.dispatch("fetchData",{path:this.path}),this.loading=!1}};const Et=(0,d.Z)(Zt,[["render",zt],["__scopeId","data-v-bb9a2674"]]);var Ht=Et;const Kt=[{path:"/",name:"test",component:S},{path:"/statistic",name:"statistic",component:bt},{path:"/settings",name:"settings",component:Ht}],Pt=(0,g.p7)({history:(0,g.PO)("/english_test_home/"),routes:Kt});var Yt=Pt,Lt=n(65),Mt=n(1178),Ft=(0,Lt.MT)({state:{settings:{},statistic:{},order:["easy","medium","hard"]},mutations:{SAVE_DATA(t,e){t[e.path]=e.data}},actions:{async fetchData({commit:t},{path:e}){const n=(0,Mt.iH)((0,Mt.N8)(),`${e}/`);let i=await(0,Mt.U2)(n);if(i.exists()){let n=i.val();return t("SAVE_DATA",{path:e,data:n}),n}console.log("No data available")},setData({commit:t},{path:e,data:n}){const i=(0,Mt.iH)((0,Mt.N8)(),`${e}/`);(0,Mt.t8)(i,n),t("SAVE_DATA",{path:e,data:n})}},getters:{getInfo:t=>e=>t[e]}}),Qt=n(4275);const Wt={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-home.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"};(0,Qt.ZF)(Wt);(0,i.ri)(p).use(Ft).use(Yt).component("LoaderSpinner",I).mount("#app")}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var a=e[i]={exports:{}};return t[i](a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,i,s,a){if(!i){var r=1/0;for(d=0;d<t.length;d++){i=t[d][0],s=t[d][1],a=t[d][2];for(var o=!0,c=0;c<i.length;c++)(!1&a||r>=a)&&Object.keys(n.O).every((function(t){return n.O[t](i[c])}))?i.splice(c--,1):(o=!1,a<r&&(r=a));if(o){t.splice(d--,1);var l=s();void 0!==l&&(e=l)}}return e}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[i,s,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.p="/english_test_home/"}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,a,r=i[0],o=i[1],c=i[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(s in o)n.o(o,s)&&(n.m[s]=o[s]);if(c)var d=c(n)}for(e&&e(i);l<r.length;l++)a=r[l],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(d)},i=self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(397)}));i=n.O(i)})();
//# sourceMappingURL=app.13e7d152.js.map