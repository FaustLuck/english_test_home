"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[350],{1350:function(t,e,i){i.r(e),i.d(e,{default:function(){return c}});var o=i(3396),r=i(7139);function n(t,e,i,n,a,l){return(0,o.wg)(),(0,o.iD)("div",{class:(0,r.C_)(["layout",{alert:t.timeLeft>0&&t.timeLeft<=a.timeAlert&&"test"===t.mode,transparent:"settings"===t.mode,open:t.isOpen}]),onClick:e[0]||(e[0]=e=>t.setOpen(!1))},null,2)}var a=i(65),l={name:"layoutComponent",data(){return{isColored:null,timeWarning:30,timeAlert:10,animationStart:null,animationID:0,colorDefault:{r:255,g:218,b:185},colorWarning:{r:255,g:140,b:105},colorAlert:{r:255,g:0,b:0},colorDelta:{},color:{},durationStep:4e3}},computed:{...(0,a.rn)("test",["timeLeft"]),...(0,a.rn)(["mode","isOpen"])},watch:{timeLeft(t){t>this.timeAlert&&t<=this.timeWarning&&(18===t&&(this.durationStep=2e3),this.colorWarning=this.addDelta(this.colorWarning,this.colorDelta),null===this.isColored&&(this.isColored=!1)),t>0&&t<=this.timeAlert&&(cancelAnimationFrame(this.animationID),this.$el.style=""),0===t&&(this.$el.style.backgroundColor="transparent")},mode(t,e){"test"===e&&"result"===t&&(this.$el.style="")},isColored(){cancelAnimationFrame(this.animationID),this.animationStart=null,this.timeLeft<=this.timeAlert||(this.isColored||(this.color={...this.colorWarning}),this.animationID=requestAnimationFrame(this.animate))}},methods:{...(0,a.OI)(["setOpen"]),changeColor(){this.isColored=!this.isColored},animate(){this.animationStart||(this.animationStart=performance.now());let t=(performance.now()-this.animationStart)/this.durationStep;t>1&&(t=1);let e=this.isColored?this.calculateColor(this.colorDefault,this.color,t):this.calculateColor(this.color,this.colorDefault,t);this.draw(e),t<1&&requestAnimationFrame(this.animate),1===t&&this.changeColor()},draw({r:t,g:e,b:i}){this.$el.style.backgroundColor=`rgb(${t}, ${e}, ${i})`},calculateColor(t,e,i){let o={};for(let r in t)o[r]=e[r]+(t[r]-e[r])*i;return o},addDelta(t,e){let i={};for(let o in t)i[o]=t[o]+e[o];return i}},created(){let t=this.timeWarning-this.timeAlert;for(let e in this.colorAlert)this.colorDelta[e]=(this.colorAlert[e]-this.colorWarning[e])/t}},s=i(89);const h=(0,s.Z)(l,[["render",n],["__scopeId","data-v-2918c633"]]);var c=h}}]);