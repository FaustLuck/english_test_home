import{_,d as m,a as f,m as h,b as v,c as C,o,e as l,l as d,v as p,i as n,F as D,k as g,t as O,x as w,f as c,n as y,s as u,r as V}from"./main-2a3cd1b3.js";const k={name:"itemAddComponent",components:{inputItem:m(()=>f(()=>import("./inputItem-fedd1cfb.js"),["js/inputItem-fedd1cfb.js","js/main-2a3cd1b3.js","css/main-df3f9d20.css"]))},data(){return{question:"",answer:"",selectedDifficult:""}},watch:{isOpen(t){this.setOpen(t)}},computed:{...h(["orderDifficult","isOpen","isLoading"])},methods:{...v("settings",["addItem"]),...C(["setOpen"]),clear(){this.question="",this.answer="",this.selectedDifficult="easy"},updateValue({type:t,newValue:s}){this[t]=s},add(){if(this.question===""||this.answer==="")return;const t={question:this.question,answer:this.answer};this.addItem({difficult:this.selectedDifficult,item:t}),this.clear()},toOpen(){this.isLoading||this.setOpen(!0)}},created(){this.selectedDifficult=this.orderDifficult[0]}},q={class:"add__container"},b=u("Сложность: "),A=["onChange"],I=u("Вопрос: "),L=u("Ответ: ");function S(t,s,B,E,a,i){const r=V("input-item");return o(),l("div",{class:y(["add__wrapper",{open:t.isOpen}]),onClick:s[3]||(s[3]=(...e)=>i.toOpen&&i.toOpen(...e))},[d(n("span",null,"+",512),[[p,!t.isOpen]]),d(n("div",q,[n("label",null,[b,d(n("select",{"onUpdate:modelValue":s[0]||(s[0]=e=>a.selectedDifficult=e)},[(o(!0),l(D,null,g(t.orderDifficult,e=>(o(),l("option",{key:e,onChange:N=>a.selectedDifficult=e},O(e),41,A))),128))],512),[[w,a.selectedDifficult]])]),n("label",null,[I,c(r,{type:"question",value:a.question,onChanges:i.updateValue},null,8,["value","onChanges"])]),n("label",null,[L,c(r,{type:"answer",value:a.answer,onChanges:i.updateValue},null,8,["value","onChanges"])]),n("div",null,[n("input",{type:"button",value:"Очистить",onClick:s[1]||(s[1]=(...e)=>i.clear&&i.clear(...e))}),n("input",{type:"button",value:"Добавить",onClick:s[2]||(s[2]=(...e)=>i.add&&i.add(...e))})])],512),[[p,t.isOpen]])],2)}const F=_(k,[["render",S],["__scopeId","data-v-8fd9125c"]]);export{F as default};
