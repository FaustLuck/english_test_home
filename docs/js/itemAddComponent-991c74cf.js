import{_,d as h,a as v,m as C,c as p,e as c,o as l,f as o,q as r,v as m,j as n,u,F as g,l as D,x as O,y as w,g as f,n as y,r as q}from"./main-d8b19f6a.js";import{s as V}from"./settingsStore-339e4660.js";const k={name:"itemAddComponent",components:{inputItem:h(()=>v(()=>import("./inputItem-98362ee8.js"),["js/inputItem-98362ee8.js","js/main-d8b19f6a.js","css/main-df3f9d20.css"]))},data(){return{question:"",answer:"",selectedDifficult:""}},watch:{isOpen(t){this.setOpen(t)}},computed:{...C(p,["orderDifficult","isOpen","isLoading"])},methods:{...c(V,["addItem"]),...c(p,["setOpen"]),clear(){this.question="",this.answer="",this.selectedDifficult="easy"},updateValue({type:t,newValue:s}){this[t]=s},add(){if(this.question===""||this.answer==="")return;const t={question:this.question,answer:this.answer};this.addItem({difficult:this.selectedDifficult,item:t}),this.clear()},toOpen(){this.isLoading||this.setOpen(!0)}},created(){this.selectedDifficult=this.orderDifficult[0]}},A={class:"add__container"},S=["onChange"];function b(t,s,I,L,a,i){const d=q("input-item");return l(),o("div",{class:y(["add__wrapper",{open:t.isOpen}]),onClick:s[3]||(s[3]=(...e)=>i.toOpen&&i.toOpen(...e))},[r(n("span",null,"+",512),[[m,!t.isOpen]]),r(n("div",A,[n("label",null,[u("Сложность: "),r(n("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>a.selectedDifficult=e)},[(l(!0),o(g,null,D(t.orderDifficult,e=>(l(),o("option",{key:e,onChange:B=>a.selectedDifficult=e},O(e),41,S))),128))],512),[[w,a.selectedDifficult]])]),n("label",null,[u("Вопрос: "),f(d,{type:"question",value:a.question,onChanges:i.updateValue},null,8,["value","onChanges"])]),n("label",null,[u("Ответ: "),f(d,{type:"answer",value:a.answer,onChanges:i.updateValue},null,8,["value","onChanges"])]),n("div",null,[n("input",{type:"button",value:"Очистить",onClick:s[1]||(s[1]=(...e)=>i.clear&&i.clear(...e))}),n("input",{type:"button",value:"Добавить",onClick:s[2]||(s[2]=(...e)=>i.add&&i.add(...e))})])],512),[[m,t.isOpen]])],2)}const x=_(k,[["render",b],["__scopeId","data-v-c485e75c"]]);export{x as default};
