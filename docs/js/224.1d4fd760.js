"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[224,355],{8224:function(e,t,i){i.r(t),i.d(t,{default:function(){return m}});var n=i(3396),s=i(7139),a=i(9242);const l={key:0},o=["name","checked","disabled"],d={key:1,class:"item speech"};function r(e,t,i,r,u,c){const h=(0,n.up)("input-item");return c.editing?((0,n.wg)(),(0,n.iD)("label",d,[(0,n.Wm)(h,{value:e.editingItem[i.type],onChanges:t[2]||(t[2]=({newValue:t})=>e.editingItem[i.type]=t),onKeydown:[(0,a.D2)(e.clearEdit,["esc"]),(0,a.D2)(e.finishEdit,["enter"])]},null,8,["value","onKeydown"])])):((0,n.wg)(),(0,n.iD)("label",{key:0,class:(0,s.C_)(["item",{speech:!c.isSpeech,excluded:i.excluded}])},[c.isSpeech?((0,n.wg)(),(0,n.iD)("a",l,"🔉")):(0,n.kq)("",!0),"settings"!==e.mode?(0,n.wy)(((0,n.wg)(),(0,n.iD)("input",{key:1,onChange:t[0]||(t[0]=(...e)=>c.update&&c.update(...e)),onClick:t[1]||(t[1]=(...e)=>c.toVoice&&c.toVoice(...e)),type:"radio",name:c.name,checked:i.checked,disabled:"test"!==e.mode},null,40,o)),[[a.F8,"answer"===i.type]]):(0,n.kq)("",!0),(0,n._)("span",{class:(0,s.C_)(["item__title",{right:c.rightColor,wrong:c.wrongColor}])},(0,s.zw)(i.item),3)],2))}var u=i(65),c=i(9355),h={name:"cardTestItemComponent",components:{InputItem:c["default"]},props:{item:{type:String,required:!0},difficult:String,index:Number,type:String,checked:Boolean,right:Boolean,excluded:Boolean},computed:{...(0,u.rn)(["mode"]),...(0,u.rn)("test",["SPEECH"]),...(0,u.rn)("settings",["editingDifficult","editingIndex","editingItem"]),isSpeech(){return"test"===this.mode&&/[a-zA-Z]/g.test(this.item)},name(){return"question"===this.type?null:`${this.difficult}${this.index}`},editing(){return this.difficult===this.editingDifficult&&this.index===this.editingIndex},rightColor(){return this.right&&"question"!==this.type&&!["settings","test"].includes(this.mode)},wrongColor(){return!this.right&&"question"!==this.type&&!["settings","test"].includes(this.mode)}},methods:{...(0,u.OI)("settings",["clearEdit"]),...(0,u.nv)("settings",["finishEdit"]),update(){"answer"===this.type&&this.$emit("updateChoice",this.item)},async toVoice(){if(this.isSpeech)try{let e=await fetch(this.SPEECH+this.item);if(e.ok){let t=await e.blob(),i=URL.createObjectURL(t);const n=new Audio(i);await n.play()}}catch(e){console.log(e)}}}},p=i(89);const g=(0,p.Z)(h,[["render",r],["__scopeId","data-v-2d697688"]]);var m=g},9355:function(e,t,i){i.r(t),i.d(t,{default:function(){return r}});var n=i(3396),s=i(9242);function a(e,t,i,a,l,o){return(0,n.wy)(((0,n.wg)(),(0,n.iD)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>l.localValue=e),onInput:t[1]||(t[1]=(...e)=>o.validate&&o.validate(...e))},null,544)),[[s.nr,l.localValue]])}var l={name:"inputItem",props:{type:String,value:{type:String,required:!0}},data(){return{localValue:this.value}},watch:{value(e){e&&(this.localValue=e[0].toUpperCase()+e.substr(1,e.length-1))}},methods:{validate(e){const t=e.target.value,i=/[^a-zа-яё,.?!\s]/gi;this.localValue=t.replace(i,""),this.$emit("changes",{type:this.type,newValue:this.localValue})}}},o=i(89);const d=(0,o.Z)(l,[["render",a],["__scopeId","data-v-757f276b"]]);var r=d}}]);