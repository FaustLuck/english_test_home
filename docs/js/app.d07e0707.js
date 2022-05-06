(function(){"use strict";var t={2890:function(t,e,i){var s=i(9242),n=i(3396);const a={class:"container__menu"},r={class:"menu"},o=(0,n.Uk)("⚙️"),l=(0,n.Uk)("📊");function c(t,e,i,s,c,d){const u=(0,n.up)("router-link"),h=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",a,[(0,n._)("nav",r,[(0,n.Wm)(u,{to:"/settings"},{default:(0,n.w5)((()=>[o])),_:1}),(0,n.Wm)(u,{to:"/statistic"},{default:(0,n.w5)((()=>[l])),_:1})])]),(0,n._)("form",null,[(0,n.Wm)(h)])],64)}var d={},u=i(89);const h=(0,u.Z)(d,[["render",c],["__scopeId","data-v-387e9749"]]);var g=h,m=i(678),p=i(7139);const f=t=>((0,n.dD)("data-v-5c5fad48"),t=t(),(0,n.Cn)(),t),w=["value"],v=f((()=>(0,n._)("div",null,null,-1))),_={key:0};function y(t,e,i,s,a,r){const o=(0,n.up)("loader-spinner"),l=(0,n.up)("card-item");return a.loading?((0,n.wg)(),(0,n.j4)(o,{key:0})):((0,n.wg)(),(0,n.iD)("div",{key:1,class:(0,p.C_)({fail:0==a.timerSec})},[(0,n._)("header",{class:(0,p.C_)({warning:a.timerSec>10&&a.timerSec<31,alert:a.timerSec<11&&a.timerSec>0})},[(0,n._)("input",{onClick:e[0]||(e[0]=t=>a.ready?r.cancelTest():r.createTest()),type:"button",value:a.ready?"Завершить тест":"Начать тест"},null,8,w),(0,n._)("span",null,(0,p.zw)(a.timerString),1),v],2),a.ready?((0,n.wg)(),(0,n.iD)("div",_,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.order,(t=>((0,n.wg)(),(0,n.iD)("div",{key:t},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.test[t],((e,i)=>((0,n.wg)(),(0,n.iD)("div",{key:e},[(0,n.Wm)(l,{index:i,item:e,mode:"test",difficult:t,onUpdateAnswers:r.updateAnswers},null,8,["index","item","difficult","onUpdateAnswers"])])))),128))])))),128))])):(0,n.kq)("",!0)],2))}var k=i.p+"img/edit.71798a50.svg",x=i.p+"img/delete.96103a4e.svg",b=i.p+"img/done.c0cf71e6.svg";const D={class:"card"},I={class:"card__item"},q={class:"card__item_container"},S=["readonly"],C={key:0,class:"card__item"},A=["name","value","checked","disabled"],O=["onClick","value"],j={key:1,class:"card__item"},R={class:"card__item_container"},$=["readonly"];function M(t,e,i,a,r,o){return(0,n.wg)(),(0,n.iD)("div",D,[(0,n._)("div",I,[(0,n._)("div",q,["test"==i.mode?((0,n.wg)(),(0,n.iD)("a",{key:0,class:"voice",onClick:e[0]||(e[0]=(...t)=>o.speech&&o.speech(...t))},"🔉")):(0,n.kq)("",!0),(0,n.wy)((0,n._)("input",{type:"text",readonly:!r.editing,"onUpdate:modelValue":e[1]||(e[1]=t=>r.question=t),class:(0,p.C_)({editing:r.editing})},null,10,S),[[s.nr,r.question]])])]),"settings"!=i.mode?((0,n.wg)(),(0,n.iD)("div",C,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.answers,((t,a)=>((0,n.wg)(),(0,n.iD)("div",{class:"card__item_container",key:a},[(0,n.wy)((0,n._)("input",{type:"radio",name:i.difficult+"_"+i.index,value:t,"onUpdate:modelValue":e[2]||(e[2]=t=>r.check=t),checked:"statistic"==i.mode&&t==r.check,disabled:"statistic"==i.mode},null,8,A),[[s.G2,r.check]]),(0,n._)("input",{class:(0,p.C_)({correct:"statistic"==i.mode&&a==r.correctIndex,wrong:"statistic"==i.mode&&a!=r.correctIndex}),type:"text",readonly:"",onClick:e=>r.check=t,value:t},null,10,O)])))),128))])):((0,n.wg)(),(0,n.iD)("div",j,[(0,n._)("div",R,[(0,n.wy)((0,n._)("input",{class:(0,p.C_)({editing:r.editing}),type:"text",readonly:!r.editing,"onUpdate:modelValue":e[3]||(e[3]=t=>r.answers[0]=t)},null,10,$),[[s.nr,r.answers[0]]])])])),"settings"==i.mode?((0,n.wg)(),(0,n.iD)("div",{key:2,class:(0,p.C_)(["card__item tool",{show:r.editing}])},[r.editing?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("img",{key:0,src:k,onClick:e[4]||(e[4]=t=>r.editing=!0)})),r.editing?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("img",{key:1,src:x,onClick:e[5]||(e[5]=e=>t.$emit("deleteRecord",i.item))})),r.editing?((0,n.wg)(),(0,n.iD)("img",{key:2,src:b,onClick:e[6]||(e[6]=e=>{r.editing="newValue"==i.index||!1,t.$emit("editRecord",{answers:r.answers,question:r.question,index:i.index}),o.clear()})})):(0,n.kq)("",!0)],2)):(0,n.kq)("",!0)])}async function T(t){try{let e=await fetch(`https://api.voicerss.org//?key=19371763f18e48789d6a3741515f4800&hl=en-gb&c=MP3&f=16khz_16bit_stereo&src=${t}`);if(e.ok){let t=await e.blob(),i=URL.createObjectURL(t);const s=new Audio(i);s.play()}}catch(e){console.log(e)}}var z={name:"CardItem",props:{item:Object,difficult:String,index:[Number,String],mode:{type:String,required:!0}},data(){return{editing:"settings"==this.mode&&"newValue"==this.index,correctIndex:0,answers:[],question:"",check:"",correct:!1}},watch:{check:function(t){if("settings"==this.mode)return;let e=t==this.answers[this.correctIndex],i={question:this.question,answer:[{answer:this.check,correct:e}]};e||i.answer.push(this.answers[this.correctIndex]),this.$emit("updateAnswers",{answer:i,difficult:this.difficult,index:this.index})},answers:{deep:!0,handler(t){let e=/[^а-яА-ЯёЁa-zA-Z.,!?\s]/g;e.exec(t)&&(this.answers[0]=this.answers[0].replaceAll(e,""))}},question:function(t){let e=/[^а-яА-ЯёЁa-zA-Z.,!?\s]/g;e.exec(t)&&(this.question=t.replaceAll(e,""))}},mounted(){"newValue"!=this.index&&(this.question=this.item.question,this.answers="settings"==this.mode?[this.item.answer]:[...this.item.answer],"settings"!=this.mode&&(this.correctIndex=this.item.answer.findIndex((t=>t instanceof Object)),this.answers[this.correctIndex]=this.answers[this.correctIndex].answer),"statistic"==this.mode&&(this.check=this.item.answer[this.correctIndex].answer,this.correctIndex=this.item.answer.length-1))},methods:{speech(){T(this.question)},clear(){"newValue"==this.index&&(this.question="",this.answers[0]="")}}};const V=(0,u.Z)(z,[["render",M],["__scopeId","data-v-df6ab59e"]]);var P=V,F={name:"TestPage",components:{CardItem:P},data(){return{settings:{},path:"settings",timerString:"",timerSec:0,timerStart:0,counterId:"",loading:!0,ready:!1,test:{},order:[],answers:{},reason:""}},watch:{timerSec:function(t){this.timerString=this.timeToString(t),t||this.cancelTest()}},async mounted(){let t=this.$store.getters.getInfo(this.path);this.settings=Object.keys(t).length?t:await this.$store.dispatch("fetchData",{path:this.path}),this.loading=!1,this.timerSec=this.timerStart=60*this.settings.timer.min+this.settings.timer.sec,this.order=this.$store.getters.getInfo("order")},methods:{timeToString(t){let e=(t%60).toString().padStart(2,"0"),i=(t-e)/60;return`${i}:${e}`},createTest(){this.test={};for(let t of this.order){let e=this.settings.dictionary[t],i=this.toFill(e,this.settings.tests[t]);i=i.sort(this.compare),i=this.toFillVariants(this.settings.tests[t],i,e),this.test[t]=i}this.prepareAnswers(),this.ready=!0,this.timerSec=this.timerStart,this.countdown()},compare(t,e){return t.question<e.question?-1:t.question>e.question?1:0},prepareAnswers(){this.answers={};for(let t of this.order){let e=[];for(let i of this.test[t]){let t=i.answer.findIndex((t=>t instanceof Object));e.push({question:i.question,answer:[{answer:"Не выбрано",correct:!1},i.answer[t].answer]})}this.answers[t]=e}},cancelTest(){clearInterval(this.counterId);let[t,e]=this.getDate(),i=Object.values(this.answers).reduce(((t,e)=>t+e.length),0),s=0;for(let r of this.order)s+=this.answers[r].reduce(((t,e)=>t+e.answer.length),0);let n=this.timerStart-this.timerSec?"Тест завершен":"Время истекло";s=2*i-s;let a={answers:this.answers,congratulations:s==i,reason:n,"time spent":this.timeToString(this.timerStart-this.timerSec),questions:i,correctAnswers:s};this.$store.dispatch("setStatistic",{data:a,date:t,time:e}),this.timerSec?(this.ready=!1,this.$router.push("result")):setTimeout((()=>{this.ready=!1,this.$router.push("result")}),1e4)},countdown(){this.counterId=setInterval((()=>{this.timerSec--}),1e3)},getRandom(t){let e=t[Math.floor(Math.random()*t.length)];return e},toFill(t,e){let i=[],s=[...t];for(let n=0;n<e;n++){let t=this.getRandom(s);i.push(t),s=this.deleteRepeat(t,s)}return i},deleteRepeat(t,e){return e.filter((e=>t instanceof Object?e.question!=t.question:e!=t))},toFillVariants(t,e,i){for(let s=0;s<t;s++){let t={...e[s]},n=t.answer,a=this.toFill(i.map((t=>t.answer)).filter((t=>t!=n)),this.settings.variants-1);a.push(n),a.sort();let r=a.findIndex((t=>t==n));a[r]={answer:n,correct:!0},t.answer=a,e[s]={...t}}return e},updateAnswers({answer:t,difficult:e,index:i}){this.answers[e][i]=t},getDate(){let t=new Intl.DateTimeFormat("ru-Ru",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date).split(", ");return t[0]=t[0].split(".").reverse().join("-"),t}}};const E=(0,u.Z)(F,[["render",y],["__scopeId","data-v-5c5fad48"]]);var U=E;const H=t=>((0,n.dD)("data-v-7f6b7feb"),t=t(),(0,n.Cn)(),t),Z={key:1},K=["onClick"],Y={class:"tests__info"},W=H((()=>(0,n._)("span",null,"Дата теста: ",-1))),L={class:"date"},N={class:"tests__info"},J=H((()=>(0,n._)("span",null,"Количество тестов: ",-1)));function G(t,e,i,s,a,r){const o=(0,n.up)("loader-spinner"),l=(0,n.up)("test-result");return a.loading?((0,n.wg)(),(0,n.j4)(o,{key:0})):((0,n.wg)(),(0,n.iD)("div",Z,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.dateArray,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"tests",key:t.day,onClick:e=>{a.activeDay=t.day,a.testsOfDay=a.tests[t.day]}},[(0,n._)("div",Y,[W,(0,n._)("span",L,(0,p.zw)(t.output),1)]),(0,n._)("div",N,[J,(0,n._)("span",null,(0,p.zw)(Object.keys(a.tests[t.day]).length),1)]),((0,n.wg)(),(0,n.j4)(n.Ob,null,[a.activeDay==t.day?((0,n.wg)(),(0,n.j4)(l,{key:0,testsFromParent:a.testsOfDay},null,8,["testsFromParent"])):(0,n.kq)("",!0)],1024))],8,K)))),128))]))}const B=t=>((0,n.dD)("data-v-028ad5f2"),t=t(),(0,n.Cn)(),t),Q=["onClick"],X={class:"test__detail"},tt=B((()=>(0,n._)("span",null," Время выполнения теста: ",-1))),et={class:"time"},it={class:"test__detail"},st=B((()=>(0,n._)("span",null," Затраченное время: ",-1))),nt={class:"test__detail"},at=B((()=>(0,n._)("span",null," Кол-во верных ответов / вопросов: ",-1))),rt={class:"test__detail"},ot=B((()=>(0,n._)("span",null,"Причина:",-1)));function lt(t,e,i,s,a,r){const o=(0,n.up)("difficult-list");return(0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.tests,((t,e)=>((0,n.wg)(),(0,n.iD)("div",{class:(0,p.C_)(["test",{congratulations:t.congratulations}]),key:e,onClick:t=>a.activeTime=e},[(0,n._)("div",X,[tt,(0,n._)("span",et,(0,p.zw)(e),1)]),(0,n._)("div",it,[st,(0,n._)("span",null,(0,p.zw)(t["time spent"]),1)]),(0,n._)("div",nt,[at,(0,n._)("span",null,(0,p.zw)(t.correctAnswers)+" / "+(0,p.zw)(t.questions),1)]),(0,n._)("div",rt,[ot,(0,n._)("span",null,(0,p.zw)(t.reason),1)]),((0,n.wg)(),(0,n.j4)(n.Ob,null,[a.activeTime===e?((0,n.wg)(),(0,n.j4)(o,{key:0,difficults:t.answers,congratulations:t.congratulations},null,8,["difficults","congratulations"])):(0,n.kq)("",!0)],1024))],10,Q)))),128)}function ct(t,e,i,s,a,r){const o=(0,n.up)("card-item");return(0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.order,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"difficult",key:t},[(0,n._)("div",{class:(0,p.C_)(["difficult__item",{congratulations:i.congratulations}])},[(0,n._)("span",null,(0,p.zw)(t),1)],2),((0,n.wg)(),(0,n.j4)(n.Ob,null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(i.difficults[t],((e,i)=>((0,n.wg)(),(0,n.j4)(o,{key:e.question,item:e,index:i,difficult:t,mode:"statistic"},null,8,["item","index","difficult"])))),128))],1024))])))),128)}var dt={components:{CardItem:P},name:"DifficultList",props:{difficults:Object,congratulations:{type:Boolean,default:!1,required:!0}},data(){return{order:[]}},mounted(){this.order=this.$store.getters.getInfo("order")}};const ut=(0,u.Z)(dt,[["render",ct],["__scopeId","data-v-d77f334c"]]);var ht=ut,gt={name:"TestResult",components:{DifficultList:ht},props:{testsFromParent:Object},data(){return{activeTime:"",tests:[],timerId:0}},mounted(){void 0===this.testsFromParent?(this.tests=this.$store.getters.getInfo("answer"),this.activeTime=Object.keys(this.tests)[0],this.tests[this.activeTime].congratulations&&this.toWait()):this.tests=this.testsFromParent},methods:{toWait(){this.timerId=setTimeout((()=>{this.$router.push("fireworks")}),5e3)}}};const mt=(0,u.Z)(gt,[["render",lt],["__scopeId","data-v-028ad5f2"]]);var pt=mt,ft={name:"StatisticPage",components:{TestResult:pt},data(){return{tests:{},loading:!0,activeDay:"",testsOfDay:{},path:"statistic",dateArray:[]}},async mounted(){let t=this.$store.getters.getInfo(this.path);this.tests=Object.keys(t).length?t:await this.$store.dispatch("fetchData",{path:this.path}),this.loading=!1,this.dateArray=Object.keys(this.tests).reverse(),this.prepareDate()},methods:{prepareDate(){for(let t=0;t<this.dateArray.length;t++){let e=this.dateArray[t];e={day:e,output:e.split("-").reverse().join(".")},this.dateArray[t]=e}}}};const wt=(0,u.Z)(ft,[["render",G],["__scopeId","data-v-7f6b7feb"]]);var vt=wt;const _t=t=>((0,n.dD)("data-v-5abf1e08"),t=t(),(0,n.Cn)(),t),yt={key:1},kt={class:"settings"},xt={class:"settings__detail"},bt=_t((()=>(0,n._)("span",null,"Ограничение по времени:",-1))),Dt={class:"time"},It=(0,n.Uk)(" : "),qt={class:"settings__detail"},St=_t((()=>(0,n._)("span",null,"Количество вариантов:",-1))),Ct={class:"difficult"},At=["onClick"],Ot=["onUpdate:modelValue","onInput"],jt={class:"settings__detail update"};function Rt(t,e,i,a,r,o){const l=(0,n.up)("loader-spinner"),c=(0,n.up)("card-item");return r.loading?((0,n.wg)(),(0,n.j4)(l,{key:0})):((0,n.wg)(),(0,n.iD)("div",yt,[(0,n._)("div",kt,[(0,n._)("div",xt,[bt,(0,n._)("span",Dt,[(0,n.wy)((0,n._)("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=t=>r.settings.timer.min=t)},null,512),[[s.nr,r.settings.timer.min,void 0,{number:!0}]]),It,(0,n.wy)((0,n._)("input",{type:"number","onUpdate:modelValue":e[1]||(e[1]=t=>r.settings.timer.sec=t),onInput:e[2]||(e[2]=t=>o.checkTime(t.target.value))},null,544),[[s.nr,r.settings.timer.sec,void 0,{number:!0}]])])]),(0,n._)("div",qt,[St,(0,n._)("span",null,[(0,n.wy)((0,n._)("input",{type:"number","onUpdate:modelValue":e[3]||(e[3]=t=>r.settings.variants=t)},null,512),[[s.nr,r.settings.variants,void 0,{number:!0}]])])]),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.order,(t=>((0,n.wg)(),(0,n.iD)("div",{key:t},[(0,n._)("div",Ct,[r.settings.dictionary[t].length?((0,n.wg)(),(0,n.iD)("div",{key:0,class:"settings__detail",onClick:e=>r.activeIndex=t},[(0,n._)("span",null,"Количество вопросов "+(0,p.zw)(t),1),(0,n._)("span",null,[(0,n.wy)((0,n._)("input",{type:"number",onClick:e[4]||(e[4]=(0,s.iM)((()=>{}),["stop"])),"onUpdate:modelValue":e=>r.settings.tests[t]=e,onInput:e=>o.checkCount(e.target.value,t)},null,40,Ot),[[s.nr,r.settings.tests[t],void 0,{number:!0}]])])],8,At)):(0,n.kq)("",!0),((0,n.wg)(),(0,n.j4)(n.Ob,null,[r.activeIndex==t?((0,n.wg)(),(0,n.j4)(c,{key:0,index:"newValue",item:{},mode:"settings",onEditRecord:o.editRecord},null,8,["onEditRecord"])):(0,n.kq)("",!0)],1024))]),r.activeIndex===t?((0,n.wg)(),(0,n.j4)(n.Ob,{key:0},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.settings.dictionary[t],((t,e)=>((0,n.wg)(),(0,n.j4)(c,{key:t.question,item:t,index:e,mode:"settings",onDeleteRecord:e=>o.deleteRecord(t),onEditRecord:o.editRecord},null,8,["item","index","onDeleteRecord","onEditRecord"])))),128))],1024)):(0,n.kq)("",!0)])))),128)),(0,n._)("div",jt,[(0,n._)("input",{type:"button",value:"Обновить настройки",onClick:e[5]||(e[5]=(...t)=>o.saveData&&o.saveData(...t))})])])]))}var $t={name:"SettingsPage",components:{CardItem:P},data(){return{order:[],settings:{},loading:!0,path:"settings",activeIndex:""}},methods:{checkCount(t,e){let i=this.settings.dictionary[e].length;t>i&&(this.settings.tests[e]=i)},checkTime(t){t>59&&(this.settings.timer.sec=59)},saveData(){this.$store.dispatch("setData",{path:this.path,data:this.settings})},deleteRecord(t){this.settings.dictionary[this.activeIndex]=this.settings.dictionary[this.activeIndex].filter((e=>e.question!=t.question))},editRecord(t){let e=this.settings.dictionary[this.activeIndex],i="newValue"==t.index?t.question:t.index,s=e.findIndex((t=>t.question==i));if(t.answers=t.answers[0],"newValue"==t.index){if(s>-1)return;let i={question:t.question,answer:t.answers};e.push(i)}else e[t.index].question=t.question,e[t.index].answer=t.answers}},async mounted(){let t=this.$store.getters.getInfo(this.path);this.settings=Object.keys(t).length?t:await this.$store.dispatch("fetchData",{path:this.path}),this.loading=!1,this.order=this.$store.getters.getInfo("order")}};const Mt=(0,u.Z)($t,[["render",Rt],["__scopeId","data-v-5abf1e08"]]);var Tt=Mt;const zt={ref:"canvas"};function Vt(t,e,i,s,a,r){return(0,n.wg)(),(0,n.iD)("canvas",zt,null,512)}function Pt(t){t.width=window.innerWidth,t.height=window.innerHeight;var e=t.getContext("2d");window.addEventListener("resize",(()=>{t.width=window.innerWidth,t.height=window.innerHeight,e.fillStyle="#000",e.fillRect(0,0,t.width,t.height)})),e.fillStyle="#000",e.fillRect(0,0,t.width,t.height);let i=[],s=[],n=20,a={x:t.width/2,y:t.height/2},r=400;for(let d=0;d<n;d++){let e={x:Math.random()*r/2-r/4+a.x,y:Math.random()*r*2+t.height,size:Math.random()+.5,fill:"#fd1",vx:Math.random()-.5,vy:-(Math.random()+4),ax:.02*Math.random()-.01,far:Math.random()*r+(a.y-r)};e.base={x:e.x,y:e.y,vx:e.vx},i.push(e)}function o(){let t=Math.floor(256*Math.random()),e=Math.floor(256*Math.random()),i=Math.floor(256*Math.random()),s="rgb($r, $g, $b)";return s=s.replace("$r",t),s=s.replace("$g",e),s=s.replace("$b",i),s}function l(){for(let t=0;t<i.length;t++){let e=i[t];if(e.y<=e.far){let t=o();for(let i=0;i<5*n;i++){let i={x:e.x,y:e.y,size:Math.random()+1.5,fill:t,vx:5*Math.random()-2.5,vy:-5*Math.random()+1.5,ay:.05,alpha:1,life:Math.round(Math.random()*r/2)+r/2};i.base={life:i.life,size:i.size},s.push(i)}e.y=e.base.y,e.x=e.base.x,e.vx=e.base.vx,e.ax=.02*Math.random()-.01}e.x+=e.vx,e.y+=e.vy,e.vx+=e.ax}for(let t=s.length-1;t>=0;t--){let e=s[t];e&&(e.x+=e.vx,e.y+=e.vy,e.vy+=e.ay,e.alpha=e.life/e.base.life,e.size=e.alpha*e.base.size,e.alpha=e.alpha>.6?1:e.alpha,e.life--,e.life<=0&&s.splice(t,1))}}function c(){e.globalCompositeOperation="source-over",e.globalAlpha=.18,e.fillStyle="#000",e.fillRect(0,0,t.width,t.height),e.globalCompositeOperation="screen",e.globalAlpha=1;for(let t=0;t<i.length;t++){let s=i[t];e.beginPath(),e.arc(s.x,s.y,s.size,0,2*Math.PI),e.closePath(),e.fillStyle=s.fill,e.fill()}for(let t=0;t<s.length;t++){let i=s[t];e.globalAlpha=i.alpha,e.beginPath(),e.arc(i.x,i.y,i.size,0,2*Math.PI),e.closePath(),e.fillStyle=i.fill,e.fill()}}(function t(){requestAnimationFrame(t),l(),c()})()}var Ft={name:"FireshowPage",mounted(){let t=this.$refs.canvas;Pt(t)}};const Et=(0,u.Z)(Ft,[["render",Vt],["__scopeId","data-v-02e47ee4"]]);var Ut=Et;function Ht(t,e,i,s,a,r){return(0,n.wg)(),(0,n.iD)("input",{type:"button",value:"click",onClick:e[0]||(e[0]=(...t)=>r.loginMe&&r.loginMe(...t))})}var Zt={name:"loginPage",methods:{loginMe(){this.$store.dispatch("login",{})}}};const Kt=(0,u.Z)(Zt,[["render",Ht]]);var Yt=Kt;const Wt=[{path:"/",name:"test",component:U},{path:"/statistic",name:"statistic",component:vt},{path:"/settings",name:"settings",component:Tt},{path:"/result",name:"result",component:pt},{path:"/fireshow",name:"fireshow",component:Ut},{path:"/login",name:"login",component:Yt}],Lt=(0,m.p7)({history:(0,m.PO)("/english_test_home/"),routes:Wt});var Nt=Lt,Jt=i(65),Gt=i(1178),Bt=i(7301),Qt={actions:{async login({commit:t}){const e=(0,Bt.v0)(),i=new Bt.hJ;try{let t=await(0,Bt.rh)(e,i);const s=await Bt.hJ.credentialFromResult(t);console.dir(s)}catch(s){throw t("SET_ERROR",s),s}},async logout(){await(0,Bt.w7)()}}},Xt=(0,Jt.MT)({state:{settings:{},statistic:{},order:["easy","medium","hard"],answer:{},errors:""},mutations:{SAVE_DATA(t,e){t[e.path]=e.data},SET_ERROR(t,e){t.errors=e}},actions:{async fetchData({commit:t},{path:e}){const i=(0,Gt.iH)((0,Gt.N8)(),`${e}/`);let s=await(0,Gt.U2)(i);if(s.exists()){let i=s.val();return t("SAVE_DATA",{path:e,data:i}),i}console.log("No data available")},setData({commit:t},{path:e,data:i}){const s=(0,Gt.iH)((0,Gt.N8)(),`${e}/`);(0,Gt.t8)(s,i).then((()=>!0)),t("SAVE_DATA",{path:e,data:i})},setStatistic({commit:t},{data:e,date:i,time:s}){const n=(0,Gt.iH)((0,Gt.N8)(),`statistic/${i}/${s}`);(0,Gt.t8)(n,e).then((()=>!0)),e={[s]:e},t("SAVE_DATA",{path:"answer",data:e})}},getters:{getInfo:t=>e=>t[e],getError:t=>t.errors},modules:{auth:Qt}});const te=t=>((0,n.dD)("data-v-2c70f580"),t=t(),(0,n.Cn)(),t),ee={class:"container__preloader"},ie=te((()=>(0,n._)("div",{class:"preloader"},[(0,n._)("div",{class:"outer circle"},[(0,n._)("div",{class:"spinner"})]),(0,n._)("div",{class:"inner circle"})],-1))),se=[ie];function ne(t,e,i,s,a,r){return(0,n.wg)(),(0,n.iD)("div",ee,se)}var ae={};const re=(0,u.Z)(ae,[["render",ne],["__scopeId","data-v-2c70f580"]]);var oe=re,le=i(4275);const ce={apiKey:"AIzaSyCLchFcQWRGJxElVnI0Cv7JGgAvrC8yDZ4",authDomain:"english-test-home.firebaseapp.com",projectId:"english-test-home",storageBucket:"english-test-home.appspot.com",messagingSenderId:"223596466893",appId:"1:223596466893:web:bafc299ab7409de7cccf84"};(0,le.ZF)(ce);(0,s.ri)(g).use(Xt).use(Nt).component("LoaderSpinner",oe).mount("#app")}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var a=e[s]={exports:{}};return t[s](a,a.exports,i),a.exports}i.m=t,function(){var t=[];i.O=function(e,s,n,a){if(!s){var r=1/0;for(d=0;d<t.length;d++){s=t[d][0],n=t[d][1],a=t[d][2];for(var o=!0,l=0;l<s.length;l++)(!1&a||r>=a)&&Object.keys(i.O).every((function(t){return i.O[t](s[l])}))?s.splice(l--,1):(o=!1,a<r&&(r=a));if(o){t.splice(d--,1);var c=n();void 0!==c&&(e=c)}}return e}a=a||0;for(var d=t.length;d>0&&t[d-1][2]>a;d--)t[d]=t[d-1];t[d]=[s,n,a]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.p="/english_test_home/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,a,r=s[0],o=s[1],l=s[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(n in o)i.o(o,n)&&(i.m[n]=o[n]);if(l)var d=l(i)}for(e&&e(s);c<r.length;c++)a=r[c],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(d)},s=self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(2890)}));s=i.O(s)})();
//# sourceMappingURL=app.d07e0707.js.map