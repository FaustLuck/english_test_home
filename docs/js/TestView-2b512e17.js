import{_ as k,d as s,m,e as y,g as i,f as c,F as p,k as u,h as v,t as l,c as E,o,w as T,a as r,r as a,i as f,l as V}from"./main-5a7cda18.js";const g={name:"TestView",components:{cardTestItemComponent:s(()=>r(()=>import("./cardTestItemComponent-9ecfc818.js"),["js/cardTestItemComponent-9ecfc818.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","js/settingsStore-66ac45fd.js","css/cardTestItemComponent-1f9a5bf9.css"])),itemComponent:s(()=>r(()=>import("./itemComponent-cd62c997.js"),["js/itemComponent-cd62c997.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","css/itemComponent-8cc91341.css"])),preloaderComponent:s(()=>r(()=>import("./preloaderComponent-037524d1.js"),["js/preloaderComponent-037524d1.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","css/preloaderComponent-82881bbd.css"]))},computed:{...m(l,["test","isTesting","SPEECH"]),...m(E,["isLoading","orderDifficult"])},watch:{isTesting(e){if(!e)return this.$router.push({name:"result"})}},methods:{...y(l,["saveChoice"])}},w={key:1},L={class:"card__column"},$={class:"card__column"};function A(e,P,B,D,I,S){const h=a("preloader-component"),d=a("card-test-item-component"),C=a("item-component");return e.isLoading?(o(),i(h,{key:0})):e.isTesting?(o(),c("div",w,[(o(!0),c(p,null,u(e.test,(t,_)=>(o(),i(C,{key:t.key},{default:T(()=>[f("div",L,[V(d,{item:t.question,difficult:t.difficult,index:_,type:"question"},null,8,["item","difficult","index"])]),f("div",$,[(o(!0),c(p,null,u(t.answer,n=>(o(),i(d,{key:n,item:n,difficult:t.difficult,index:_,type:"answer",onUpdateChoice:x=>e.saveChoice({choice:n,key:t.key})},null,8,["item","difficult","index","onUpdateChoice"]))),128))])]),_:2},1024))),128))])):v("",!0)}const O=k(g,[["render",A]]);export{O as default};