"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[492],{7694:function(i,e,t){t.r(e),t.d(e,{default:function(){return a}});var d=t(3396),n=t(7139),l=t.p+"img/edit.f46232c6.svg",s=t.p+"img/delete.06df569f.svg",c=t.p+"img/done.c1942b50.svg",u=t.p+"img/undo.06164d9c.svg";function f(i,e,t,f,g,o){return(0,d.wg)(),(0,d.iD)("div",{class:(0,n.C_)(["tool",{show:o.editing}])},[o.editing||t.excluded?(0,d.kq)("",!0):((0,d.wg)(),(0,d.iD)("img",{key:0,src:l,onClick:e[0]||(e[0]=e=>i.startEdit({index:t.index,difficult:t.difficult})),alt:"Редактировать",title:"Редактировать"})),o.editing||t.excluded?(0,d.kq)("",!0):((0,d.wg)(),(0,d.iD)("img",{key:1,src:s,onClick:e[1]||(e[1]=e=>i.deleteItem({index:t.index,difficult:t.difficult})),alt:"Удалить",title:"Удалить"})),o.editing&&!t.excluded?((0,d.wg)(),(0,d.iD)("img",{key:2,src:c,onClick:e[2]||(e[2]=(...e)=>i.finishEdit&&i.finishEdit(...e)),alt:"Готово",title:"Готово"})):(0,d.kq)("",!0),t.excluded||t.edited||t.included?((0,d.wg)(),(0,d.iD)("img",{key:3,src:u,onClick:e[3]||(e[3]=(...i)=>o.undoChanges&&o.undoChanges(...i)),alt:"Отменить",title:"Отменить"})):(0,d.kq)("",!0)],2)}var g=t(65),o={name:"toolComponent",props:{difficult:String,index:Number,excluded:Boolean,edited:Boolean,included:Boolean},computed:{...(0,g.rn)("settings",["editingDifficult","editingIndex"]),editing(){return this.difficult===this.editingDifficult&&this.index===this.editingIndex}},methods:{...(0,g.OI)("settings",["startEdit","returnDeletedItem","cancelEdit","removeIncluded"]),...(0,g.nv)("settings",["finishEdit","deleteItem"]),undoChanges(){this.included?this.removeIncluded({index:this.index,difficult:this.difficult}):this.excluded?this.returnDeletedItem({index:this.index,difficult:this.difficult}):this.edited&&this.cancelEdit({index:this.index,difficult:this.difficult})}}},h=t(89);const r=(0,h.Z)(o,[["render",f],["__scopeId","data-v-69c64eb0"]]);var a=r}}]);