"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[567],{4567:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var i=n(3396),s=n(7139),o=n(9242);const a={class:"card__column"},c={key:0},l=["onClick","name"],u={class:"item__title"},r={class:"card__column"},h={key:0},p=["onChange","onClick","name"],_={class:"item__title"};function d(e,t,n,d,m,g){const w=(0,i.up)("header-component"),k=(0,i.up)("preloader-component");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(w),(0,i._)("div",null,[e.isLoading?((0,i.wg)(),(0,i.j4)(k,{key:0})):e.isTesting?((0,i.wg)(!0),(0,i.iD)(i.HY,{key:1},(0,i.Ko)(e.test,((t,n)=>((0,i.wg)(),(0,i.iD)("div",{class:"card",key:`${t.question}_${n}`},[(0,i._)("div",a,[(0,i._)("label",{class:(0,s.C_)(["item",{speech:!g.isSpeech(t.question)}])},[g.isSpeech(t.question)?((0,i.wg)(),(0,i.iD)("a",c,"🔉")):(0,i.kq)("",!0),(0,i.wy)((0,i._)("input",{onClick:e=>g.toVoice(t.question),type:"radio",name:t.question},null,8,l),[[o.F8,!1]]),(0,i._)("span",u,(0,s.zw)(t.question),1)],2)]),(0,i._)("div",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.answer,((o,a)=>((0,i.wg)(),(0,i.iD)("label",{class:(0,s.C_)(["item",{speech:!g.isSpeech(o)}]),key:`${t.question}_${n}_${a}`},[g.isSpeech(o)?((0,i.wg)(),(0,i.iD)("a",h,"🔉")):(0,i.kq)("",!0),(0,i._)("input",{onChange:n=>e.saveChoice({choice:o,question:t.question}),onClick:e=>g.toVoice(o),type:"radio",name:`${t.question}_${n}`},null,40,p),(0,i._)("span",_,(0,s.zw)(o),1)],2)))),128))])])))),128)):(0,i.kq)("",!0)])])}var m=n(65),g={name:"TestView",components:{headerComponent:(0,i.RC)((()=>n.e(811).then(n.bind(n,2811)))),preloaderComponent:(0,i.RC)((()=>n.e(437).then(n.bind(n,4437))))},computed:{...(0,m.rn)("test",["test","isTesting","SPEECH"]),...(0,m.rn)(["isLoading"])},watch:{isTesting(e){if(!e)return this.$router.push({name:"result"})}},methods:{...(0,m.OI)("test",["saveChoice"]),...(0,m.nv)("test",["getTest"]),isSpeech(e){return/[a-zA-Z]/g.test(e)},async toVoice(e){if(this.isSpeech(e))try{let t=await fetch(this.SPEECH+e);if(t.ok){let e=await t.blob(),n=URL.createObjectURL(e);const i=new Audio(n);await i.play()}}catch(t){console.log(t)}}}},w=n(89);const k=(0,w.Z)(g,[["render",d],["__scopeId","data-v-61447ec1"]]);var C=k}}]);