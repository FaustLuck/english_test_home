import{_ as u,m as c,e as m,o as n,f as l,i as o,n as r}from"./main-2dcca78f.js";import{s as f}from"./settingsStore-38e39a1e.js";const a="/english_test_home/img/edit-0ced950f.svg",g="/english_test_home/img/delete-b8d49457.svg",h="/english_test_home/img/done-3e1fee01.svg",_="/english_test_home/img/undo-625466e9.svg";const x={name:"toolComponent",props:{difficult:String,index:Number,excluded:Boolean,edited:Boolean,included:Boolean},computed:{...c(f,["editingDifficult","editingIndex"]),editing(){return this.difficult===this.editingDifficult&&this.index===this.editingIndex}},methods:{...m(f,["finishEdit","deleteItem","startEdit","returnDeletedItem","cancelEdit","removeIncluded"]),undoChanges(){if(this.included){this.removeIncluded({index:this.index,difficult:this.difficult});return}if(this.excluded){this.returnDeletedItem({index:this.index,difficult:this.difficult});return}this.edited&&this.cancelEdit({index:this.index,difficult:this.difficult})}}};function v(s,t,e,C,k,i){return n(),l("div",{class:r(["tool",{show:i.editing}])},[!i.editing&&!e.excluded?(n(),l("img",{key:0,src:a,onClick:t[0]||(t[0]=d=>s.startEdit({index:e.index,difficult:e.difficult})),alt:"Редактировать",title:"Редактировать"})):o("",!0),!i.editing&&!e.excluded?(n(),l("img",{key:1,src:g,onClick:t[1]||(t[1]=d=>s.deleteItem({index:e.index,difficult:e.difficult})),alt:"Удалить",title:"Удалить"})):o("",!0),i.editing&&!e.excluded?(n(),l("img",{key:2,src:h,onClick:t[2]||(t[2]=(...d)=>s.finishEdit&&s.finishEdit(...d)),alt:"Готово",title:"Готово"})):o("",!0),e.excluded||e.edited||e.included?(n(),l("img",{key:3,src:_,onClick:t[3]||(t[3]=(...d)=>i.undoChanges&&i.undoChanges(...d)),alt:"Отменить",title:"Отменить"})):o("",!0)],2)}const y=u(x,[["render",v],["__scopeId","data-v-43d9f1b8"]]);export{y as default};
