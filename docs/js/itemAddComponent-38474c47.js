import{_ as y,d,a as r,m as v,c as C,b as O,e as k,o as u,f as p,q as c,v as g,l,i as n,u as m,F as V,k as L,x as S,y as I,z as q,n as A,r as _,p as x,j as E}from"./main-1677b578.js";import{s as F}from"./settingsStore-340e25cf.js";const N={name:"itemAddComponent",components:{uploadComponent:d(()=>r(()=>import("./uploadComponent-dc7474a4.js"),["js/uploadComponent-dc7474a4.js","js/main-1677b578.js","css/main-c8ad37bc.css","js/settingsStore-340e25cf.js","css/uploadComponent-05c96233.css"])),inputComponent:d(()=>r(()=>import("./inputComponent-9b8b603f.js"),["js/inputComponent-9b8b603f.js","js/main-1677b578.js","css/main-c8ad37bc.css","css/inputComponent-4b925b3a.css"])),buttonComponent:d(()=>r(()=>import("./buttonComponent-12c0cfa9.js"),["js/buttonComponent-12c0cfa9.js","js/main-1677b578.js","css/main-c8ad37bc.css","css/buttonComponent-9f4f48d2.css"]))},data(){return{question:"",answer:"",selectedDifficult:"",check:!1}},watch:{isOpen(e){this.setOpen(e)}},computed:{...v(C,["orderDifficult","isOpen","isLoading"]),...v(O,["sub"])},methods:{...k(F,["addItem","sendNewDictionaryFromClipboard"]),...k(C,["setOpen","setLoading"]),clear(){this.question="",this.answer="",this.selectedDifficult="easy"},updateValue({type:e,newValue:t}){this[e]=t},add(){if(this.question===""||this.answer==="")return;const e={question:this.question,answer:this.answer};this.addItem(this.selectedDifficult,e),this.clear()},toOpen(){this.isLoading||this.setOpen(!0)},async addFromClipboard(){let t=(await navigator.clipboard.readText()).split(/\r\n|\r|\n/g);t=t.map(h=>h.split("	")),t.every(this.checkRow)&&(this.setLoading(!0),await this.sendNewDictionaryFromClipboard(t,this.check,this.sub),this.setLoading(!1))},checkRow(e){return e[2]=e[2].toLowerCase(),e.length===3&&e[2].match(/easy|medium|hard/)}},created(){this.selectedDifficult=this.orderDifficult[0]}},b=e=>(x("data-v-c4f21453"),e=e(),E(),e),R={class:"add__container"},T=["onChange"],P=b(()=>n("span",null,"или",-1)),B={title:"Перезаписать словарь?"},z=b(()=>n("span",null,"Перезаписать?",-1));function M(e,t,D,h,s,i){const a=_("button-component"),f=_("input-component"),w=_("upload-component");return u(),p("div",{class:A(["add__wrapper",{open:e.isOpen}]),onClick:t[2]||(t[2]=(...o)=>i.toOpen&&i.toOpen(...o))},[c(l(a,{value:"+",title:"Добавить новую запись"},null,512),[[g,!e.isOpen]]),c(n("div",R,[n("label",null,[m("Сложность: "),c(n("select",{"onUpdate:modelValue":t[0]||(t[0]=o=>s.selectedDifficult=o)},[(u(!0),p(V,null,L(e.orderDifficult,o=>(u(),p("option",{key:o,onChange:U=>s.selectedDifficult=o},S(o),41,T))),128))],512),[[I,s.selectedDifficult]])]),n("label",null,[m("Вопрос: "),l(f,{type:"question",value:s.question,onChanges:i.updateValue},null,8,["value","onChanges"])]),n("label",null,[m("Ответ: "),l(f,{type:"answer",value:s.answer,onChanges:i.updateValue},null,8,["value","onChanges"])]),n("div",null,[l(a,{value:"Очистить",title:"Очистить",onClick:i.clear},null,8,["onClick"]),l(a,{value:"Добавить",title:"Добавить",onClick:i.add},null,8,["onClick"])]),n("div",null,[l(w,{check:s.check},null,8,["check"]),P,l(a,{value:"Вставить из буфера",title:"Вставить словарь из буфера обмена",onClick:i.addFromClipboard},null,8,["onClick"])]),n("div",null,[n("label",B,[c(n("input",{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=o=>s.check=o)},null,512),[[q,s.check]]),z])])],512),[[g,e.isOpen]])],2)}const H=y(N,[["render",M],["__scopeId","data-v-c4f21453"]]);export{H as default};
