import{_ as x,d,a as s,m as k,c as v,e as g,o,g as l,w as a,f as y,k as C,i as r,l as f,h as _,F as E,r as u}from"./main-c86dc07d.js";import{s as w}from"./settingsStore-7b782259.js";const A={name:"testDifficultComponent",components:{toolComponent:d(()=>s(()=>import("./toolComponent-80a52d65.js"),["js/toolComponent-80a52d65.js","js/main-c86dc07d.js","css/main-c8ad37bc.css","js/settingsStore-7b782259.js","css/toolComponent-83ba9bef.css"])),titleComponent:d(()=>s(()=>import("./titleComponent-138d81d7.js"),["js/titleComponent-138d81d7.js","js/main-c86dc07d.js","css/main-c8ad37bc.css","css/titleComponent-6a53e84b.css"])),cardTestItemComponent:d(()=>s(()=>import("./cardTestItemComponent-47b5ede5.js"),["js/cardTestItemComponent-47b5ede5.js","js/main-c86dc07d.js","css/main-c8ad37bc.css","js/settingsStore-7b782259.js","css/cardTestItemComponent-1f9a5bf9.css"])),itemComponent:d(()=>s(()=>import("./itemComponent-4a5d9561.js"),["js/itemComponent-4a5d9561.js","js/main-c86dc07d.js","css/main-c8ad37bc.css","css/itemComponent-e6bc1473.css"]))},props:{difficult:String,partAnswers:Array},computed:{...k(v,["mode"])},methods:{...g(w,["startEdit"])}},D={class:"item__column"},V={class:"item__column"};function I(c,L,t,P,T,b){const i=u("card-test-item-component"),p=u("tool-component"),m=u("item-component"),h=u("title-component");return t.partAnswers.length?(o(),l(h,{key:0,title:t.difficult,"must-is-open":c.mode!=="settings","must-is-top":c.mode!=="settings"},{default:a(()=>[(o(!0),y(E,null,C(t.partAnswers,(e,n)=>(o(),l(m,{key:e.question,"test-item":e,onDblclick:B=>c.startEdit(n,t.difficult)},{default:a(()=>[r("div",D,[f(i,{item:e.question,difficult:t.difficult,index:n,excluded:e==null?void 0:e.excluded,type:"question"},null,8,["item","difficult","index","excluded"])]),r("div",V,[f(i,{type:"answer",difficult:t.difficult,index:n,item:e.answer,excluded:e==null?void 0:e.excluded,checked:e.answer===(e==null?void 0:e.choice),right:!0},null,8,["difficult","index","item","excluded","checked"]),e!=null&&e.choice&&e.answer!==(e==null?void 0:e.choice)?(o(),l(i,{key:0,type:"answer",difficult:t.difficult,index:n,item:e==null?void 0:e.choice,checked:!0,right:!1},null,8,["difficult","index","item"])):_("",!0)]),c.mode==="settings"?(o(),l(p,{key:0,index:n,difficult:t.difficult,excluded:e==null?void 0:e.excluded,edited:e==null?void 0:e.edited,included:e==null?void 0:e.included},null,8,["index","difficult","excluded","edited","included"])):_("",!0)]),_:2},1032,["test-item","onDblclick"]))),128))]),_:1},8,["title","must-is-open","must-is-top"])):_("",!0)}const S=x(A,[["render",I],["__scopeId","data-v-cbfd45c6"]]);export{S as default};