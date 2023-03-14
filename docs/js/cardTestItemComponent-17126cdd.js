import{_ as p,d as g,a as f,m as d,c as _,t as y,e as C,o,f as a,h as r,q as S,v as w,i as k,x as v,n as c,l as E,z as l,r as b}from"./main-de299c61.js";import{s as m}from"./settingsStore-d8a845ff.js";const I={name:"cardTestItemComponent",components:{inputComponent:g(()=>f(()=>import("./inputComponent-65e82fbf.js"),["js/inputComponent-65e82fbf.js","js/main-de299c61.js","css/main-0fdc12b1.css","css/inputComponent-4975777f.css"]))},props:{item:{type:String,required:!0},difficult:String,index:Number,type:String,checked:Boolean,right:Boolean,excluded:Boolean},computed:{...d(_,["mode"]),...d(y,["SPEECH"]),...d(m,["editingDifficult","editingIndex","editingItem"]),isSpeech(){return this.mode==="test"&&/[a-zA-Z]/g.test(this.item)},name(){return this.type==="question"?null:`${this.difficult}${this.index}`},editing(){return this.difficult===this.editingDifficult&&this.index===this.editingIndex},rightColor(){return this.right&&this.type!=="question"&&!["settings","test"].includes(this.mode)},wrongColor(){return!this.right&&this.type!=="question"&&!["settings","test"].includes(this.mode)}},methods:{...C(m,["clearEdit","finishEdit"]),update(){this.type==="answer"&&this.$emit("updateChoice",this.item)},async toVoice(){if(this.isSpeech)try{let e=await fetch(this.SPEECH+this.item);if(e.ok){let i=await e.blob(),n=URL.createObjectURL(i);await new Audio(n).play()}}catch(e){console.log(e)}}}},x={key:0},V=["name","checked","disabled"],B={key:1,class:"item speech"};function q(e,i,n,u,A,t){const h=b("input-component");return t.editing?(o(),a("label",B,[E(h,{value:e.editingItem[n.type],onChanges:i[2]||(i[2]=({newValue:s})=>e.editingItem[n.type]=s),onKeydown:[l(e.clearEdit,["esc"]),l(e.finishEdit,["enter"])]},null,8,["value","onKeydown"])])):(o(),a("label",{key:0,class:c(["item",{speech:!t.isSpeech,excluded:n.excluded}])},[t.isSpeech?(o(),a("a",x,"🔉")):r("",!0),e.mode!=="settings"?S((o(),a("input",{key:1,onChange:i[0]||(i[0]=(...s)=>t.update&&t.update(...s)),onClick:i[1]||(i[1]=(...s)=>t.toVoice&&t.toVoice(...s)),type:"radio",name:t.name,checked:n.checked,disabled:e.mode!=="test"},null,40,V)),[[w,n.type==="answer"]]):r("",!0),k("span",{class:c(["item__title",{right:t.rightColor,wrong:t.wrongColor}])},v(n.item),3)],2))}const P=p(I,[["render",q],["__scopeId","data-v-e9ea2a64"]]);export{P as default};