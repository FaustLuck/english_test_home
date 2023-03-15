import{_ as y,d,a as u,m as v,c as C,b as O,e as b,o as r,f as p,q as c,v as k,l,i as t,u as m,F as V,k as L,x as S,y as I,z as q,n as A,r as _,p as x,j as E}from"./main-5a7cda18.js";import{s as F}from"./settingsStore-66ac45fd.js";const N={name:"itemAddComponent",components:{uploadComponent:d(()=>u(()=>import("./uploadComponent-d7c4bf30.js"),["js/uploadComponent-d7c4bf30.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","js/settingsStore-66ac45fd.js","css/uploadComponent-05c96233.css"])),inputComponent:d(()=>u(()=>import("./inputComponent-5f4f7794.js"),["js/inputComponent-5f4f7794.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","css/inputComponent-4975777f.css"])),buttonComponent:d(()=>u(()=>import("./buttonComponent-2b057739.js"),["js/buttonComponent-2b057739.js","js/main-5a7cda18.js","css/main-0fdc12b1.css","css/buttonComponent-34ec8aaf.css"]))},data(){return{question:"",answer:"",selectedDifficult:"",check:!1}},watch:{isOpen(e){this.setOpen(e)}},computed:{...v(C,["orderDifficult","isOpen","isLoading"]),...v(O,["sub"])},methods:{...b(F,["addItem","sendNewDictionaryFromClipboard"]),...b(C,["setOpen","setLoading"]),clear(){this.question="",this.answer="",this.selectedDifficult="easy"},updateValue({type:e,newValue:n}){this[e]=n},add(){if(this.question===""||this.answer==="")return;const e={question:this.question,answer:this.answer};this.addItem(this.selectedDifficult,e),this.clear()},toOpen(){this.isLoading||this.setOpen(!0)},async addFromClipboard(){let n=(await navigator.clipboard.readText()).split(/\r\n|\r|\n/g);n=n.map(h=>h.split("	")),n.every(this.checkRow)&&(this.setLoading(!0),await this.sendNewDictionaryFromClipboard(n,this.check,this.sub),this.setLoading(!1))},checkRow(e){return e[2]=e[2].toLowerCase(),e.length===3&&e[2].match(/easy|medium|hard/)}},created(){this.selectedDifficult=this.orderDifficult[0]}},g=e=>(x("data-v-bbc77efb"),e=e(),E(),e),R={class:"add__container"},T=["onChange"],P={title:"Перезаписать словарь?"},B=g(()=>t("span",null,"Перезаписать?",-1)),z=g(()=>t("div",null,[t("span",null,"или")],-1));function M(e,n,D,h,s,i){const a=_("button-component"),f=_("input-component"),w=_("upload-component");return r(),p("div",{class:A(["add__wrapper",{open:e.isOpen}]),onClick:n[2]||(n[2]=(...o)=>i.toOpen&&i.toOpen(...o))},[c(l(a,{value:"+",title:"Добавить новую запись"},null,512),[[k,!e.isOpen]]),c(t("div",R,[t("label",null,[m("Сложность: "),c(t("select",{"onUpdate:modelValue":n[0]||(n[0]=o=>s.selectedDifficult=o)},[(r(!0),p(V,null,L(e.orderDifficult,o=>(r(),p("option",{key:o,onChange:U=>s.selectedDifficult=o},S(o),41,T))),128))],512),[[I,s.selectedDifficult]])]),t("label",null,[m("Вопрос: "),l(f,{type:"question",value:s.question,onChanges:i.updateValue},null,8,["value","onChanges"])]),t("label",null,[m("Ответ: "),l(f,{type:"answer",value:s.answer,onChanges:i.updateValue},null,8,["value","onChanges"])]),t("div",null,[l(a,{value:"Очистить",title:"Очистить",onClick:i.clear},null,8,["onClick"]),l(a,{value:"Добавить",title:"Добавить",onClick:i.add},null,8,["onClick"])]),t("div",null,[t("label",P,[c(t("input",{type:"checkbox","onUpdate:modelValue":n[1]||(n[1]=o=>s.check=o)},null,512),[[q,s.check]]),B])]),t("div",null,[l(w,{check:s.check},null,8,["check"])]),z,t("div",null,[l(a,{value:"Вставить из буфера",title:"Вставить словарь из буфера обмена",onClick:i.addFromClipboard},null,8,["onClick"])])],512),[[k,e.isOpen]])],2)}const H=y(N,[["render",M],["__scopeId","data-v-bbc77efb"]]);export{H as default};
