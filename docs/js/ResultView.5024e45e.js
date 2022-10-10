"use strict";(self["webpackChunkenglish_test_home"]=self["webpackChunkenglish_test_home"]||[]).push([[498],{5434:function(t,e,n){n.r(e),n.d(e,{default:function(){return nt}});var o=n(3396);function r(t,e,n,r,i,a){const s=(0,o.up)("header-component"),c=(0,o.up)("test-info-component");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(s),(0,o.Wm)(c,{timestamp:t.timestamp,answers:{test:t.answers,timeSpent:t.timeSpent},onShow:a.show,onClick:e[0]||(e[0]=e=>i.activeTimestamp=t.timestamp)},null,8,["timestamp","answers","onShow"])],64)}var i=n(6623),a=(n(1703),n(4870)),s=n(8005),c="store";function u(t,e){Object.keys(t).forEach((function(n){return e(t[n],n)}))}function l(t){return null!==t&&"object"===typeof t}function p(t){return t&&"function"===typeof t.then}function f(t,e){return function(){return t(e)}}function h(t,e,n){return e.indexOf(t)<0&&(n&&n.prepend?e.unshift(t):e.push(t)),function(){var n=e.indexOf(t);n>-1&&e.splice(n,1)}}function d(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;v(t,n,[],t._modules.root,!0),m(t,n,e)}function m(t,e,n){var o=t._state;t.getters={},t._makeLocalGettersCache=Object.create(null);var r=t._wrappedGetters,i={};u(r,(function(e,n){i[n]=f(e,t),Object.defineProperty(t.getters,n,{get:function(){return i[n]()},enumerable:!0})})),t._state=(0,a.qj)({data:e}),t.strict&&C(t),o&&n&&t._withCommit((function(){o.data=null}))}function v(t,e,n,o,r){var i=!n.length,a=t._modules.getNamespace(n);if(o.namespaced&&(t._modulesNamespaceMap[a],t._modulesNamespaceMap[a]=o),!i&&!r){var s=k(e,n.slice(0,-1)),c=n[n.length-1];t._withCommit((function(){s[c]=o.state}))}var u=o.context=y(t,a,n);o.forEachMutation((function(e,n){var o=a+n;g(t,o,e,u)})),o.forEachAction((function(e,n){var o=e.root?n:a+n,r=e.handler||e;b(t,o,r,u)})),o.forEachGetter((function(e,n){var o=a+n;w(t,o,e,u)})),o.forEachChild((function(o,i){v(t,e,n.concat(i),o,r)}))}function y(t,e,n){var o=""===e,r={dispatch:o?t.dispatch:function(n,o,r){var i=j(n,o,r),a=i.payload,s=i.options,c=i.type;return s&&s.root||(c=e+c),t.dispatch(c,a)},commit:o?t.commit:function(n,o,r){var i=j(n,o,r),a=i.payload,s=i.options,c=i.type;s&&s.root||(c=e+c),t.commit(c,a,s)}};return Object.defineProperties(r,{getters:{get:o?function(){return t.getters}:function(){return _(t,e)}},state:{get:function(){return k(t.state,n)}}}),r}function _(t,e){if(!t._makeLocalGettersCache[e]){var n={},o=e.length;Object.keys(t.getters).forEach((function(r){if(r.slice(0,o)===e){var i=r.slice(o);Object.defineProperty(n,i,{get:function(){return t.getters[r]},enumerable:!0})}})),t._makeLocalGettersCache[e]=n}return t._makeLocalGettersCache[e]}function g(t,e,n,o){var r=t._mutations[e]||(t._mutations[e]=[]);r.push((function(e){n.call(t,o.state,e)}))}function b(t,e,n,o){var r=t._actions[e]||(t._actions[e]=[]);r.push((function(e){var r=n.call(t,{dispatch:o.dispatch,commit:o.commit,getters:o.getters,state:o.state,rootGetters:t.getters,rootState:t.state},e);return p(r)||(r=Promise.resolve(r)),t._devtoolHook?r.catch((function(e){throw t._devtoolHook.emit("vuex:error",e),e})):r}))}function w(t,e,n,o){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(t){return n(o.state,o.getters,t.state,t.getters)})}function C(t){(0,o.YP)((function(){return t._state.data}),(function(){}),{deep:!0,flush:"sync"})}function k(t,e){return e.reduce((function(t,e){return t[e]}),t)}function j(t,e,n){return l(t)&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}var E="vuex bindings",O="vuex:mutations",M="vuex:actions",x="vuex",S=0;function I(t,e){(0,s.F1)({id:"org.vuejs.vuex",app:t,label:"Vuex",homepage:"https://next.vuex.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",packageName:"vuex",componentStateTypes:[E]},(function(n){n.addTimelineLayer({id:O,label:"Vuex Mutations",color:A}),n.addTimelineLayer({id:M,label:"Vuex Actions",color:A}),n.addInspector({id:x,label:"Vuex",icon:"storage",treeFilterPlaceholder:"Filter stores..."}),n.on.getInspectorTree((function(n){if(n.app===t&&n.inspectorId===x)if(n.filter){var o=[];N(o,e._modules.root,n.filter,""),n.rootNodes=o}else n.rootNodes=[L(e._modules.root,"")]})),n.on.getInspectorState((function(n){if(n.app===t&&n.inspectorId===x){var o=n.nodeId;_(e,o),n.state=D(V(e._modules,o),"root"===o?e.getters:e._makeLocalGettersCache,o)}})),n.on.editInspectorState((function(n){if(n.app===t&&n.inspectorId===x){var o=n.nodeId,r=n.path;"root"!==o&&(r=o.split("/").filter(Boolean).concat(r)),e._withCommit((function(){n.set(e._state.data,r,n.state.value)}))}})),e.subscribe((function(t,e){var o={};t.payload&&(o.payload=t.payload),o.state=e,n.notifyComponentUpdate(),n.sendInspectorTree(x),n.sendInspectorState(x),n.addTimelineEvent({layerId:O,event:{time:Date.now(),title:t.type,data:o}})})),e.subscribeAction({before:function(t,e){var o={};t.payload&&(o.payload=t.payload),t._id=S++,t._time=Date.now(),o.state=e,n.addTimelineEvent({layerId:M,event:{time:t._time,title:t.type,groupId:t._id,subtitle:"start",data:o}})},after:function(t,e){var o={},r=Date.now()-t._time;o.duration={_custom:{type:"duration",display:r+"ms",tooltip:"Action duration",value:r}},t.payload&&(o.payload=t.payload),o.state=e,n.addTimelineEvent({layerId:M,event:{time:Date.now(),title:t.type,groupId:t._id,subtitle:"end",data:o}})}})}))}var A=8702998,G=6710886,T=16777215,$={label:"namespaced",textColor:T,backgroundColor:G};function P(t){return t&&"root"!==t?t.split("/").slice(-2,-1)[0]:"Root"}function L(t,e){return{id:e||"root",label:P(e),tags:t.namespaced?[$]:[],children:Object.keys(t._children).map((function(n){return L(t._children[n],e+n+"/")}))}}function N(t,e,n,o){o.includes(n)&&t.push({id:o||"root",label:o.endsWith("/")?o.slice(0,o.length-1):o||"Root",tags:e.namespaced?[$]:[]}),Object.keys(e._children).forEach((function(r){N(t,e._children[r],n,o+r+"/")}))}function D(t,e,n){e="root"===n?e:e[n];var o=Object.keys(e),r={state:Object.keys(t.state).map((function(e){return{key:e,editable:!0,value:t.state[e]}}))};if(o.length){var i=R(e);r.getters=Object.keys(i).map((function(t){return{key:t.endsWith("/")?P(t):t,editable:!1,value:B((function(){return i[t]}))}}))}return r}function R(t){var e={};return Object.keys(t).forEach((function(n){var o=n.split("/");if(o.length>1){var r=e,i=o.pop();o.forEach((function(t){r[t]||(r[t]={_custom:{value:{},display:t,tooltip:"Module",abstract:!0}}),r=r[t]._custom.value})),r[i]=B((function(){return t[n]}))}else e[n]=B((function(){return t[n]}))})),e}function V(t,e){var n=e.split("/").filter((function(t){return t}));return n.reduce((function(t,o,r){var i=t[o];if(!i)throw new Error('Missing module "'+o+'" for path "'+e+'".');return r===n.length-1?i:i._children}),"root"===e?t:t.root._children)}function B(t){try{return t()}catch(e){return e}}var H=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=("function"===typeof n?n():n)||{}},W={namespaced:{configurable:!0}};W.namespaced.get=function(){return!!this._rawModule.namespaced},H.prototype.addChild=function(t,e){this._children[t]=e},H.prototype.removeChild=function(t){delete this._children[t]},H.prototype.getChild=function(t){return this._children[t]},H.prototype.hasChild=function(t){return t in this._children},H.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},H.prototype.forEachChild=function(t){u(this._children,t)},H.prototype.forEachGetter=function(t){this._rawModule.getters&&u(this._rawModule.getters,t)},H.prototype.forEachAction=function(t){this._rawModule.actions&&u(this._rawModule.actions,t)},H.prototype.forEachMutation=function(t){this._rawModule.mutations&&u(this._rawModule.mutations,t)},Object.defineProperties(H.prototype,W);var F=function(t){this.register([],t,!1)};function Y(t,e,n){if(e.update(n),n.modules)for(var o in n.modules){if(!e.getChild(o))return;Y(t.concat(o),e.getChild(o),n.modules[o])}}F.prototype.get=function(t){return t.reduce((function(t,e){return t.getChild(e)}),this.root)},F.prototype.getNamespace=function(t){var e=this.root;return t.reduce((function(t,n){return e=e.getChild(n),t+(e.namespaced?n+"/":"")}),"")},F.prototype.update=function(t){Y([],this.root,t)},F.prototype.register=function(t,e,n){var o=this;void 0===n&&(n=!0);var r=new H(e,n);if(0===t.length)this.root=r;else{var i=this.get(t.slice(0,-1));i.addChild(t[t.length-1],r)}e.modules&&u(e.modules,(function(e,r){o.register(t.concat(r),e,n)}))},F.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1],o=e.getChild(n);o&&o.runtime&&e.removeChild(n)},F.prototype.isRegistered=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1];return!!e&&e.hasChild(n)};var U=function(t){var e=this;void 0===t&&(t={});var n=t.plugins;void 0===n&&(n=[]);var o=t.strict;void 0===o&&(o=!1);var r=t.devtools;this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new F(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._makeLocalGettersCache=Object.create(null),this._devtools=r;var i=this,a=this,s=a.dispatch,c=a.commit;this.dispatch=function(t,e){return s.call(i,t,e)},this.commit=function(t,e,n){return c.call(i,t,e,n)},this.strict=o;var u=this._modules.root.state;v(this,u,[],this._modules.root),m(this,u),n.forEach((function(t){return t(e)}))},q={state:{configurable:!0}};U.prototype.install=function(t,e){t.provide(e||c,this),t.config.globalProperties.$store=this;var n=void 0!==this._devtools&&this._devtools;n&&I(t,this)},q.state.get=function(){return this._state.data},q.state.set=function(t){},U.prototype.commit=function(t,e,n){var o=this,r=j(t,e,n),i=r.type,a=r.payload,s={type:i,payload:a},c=this._mutations[i];c&&(this._withCommit((function(){c.forEach((function(t){t(a)}))})),this._subscribers.slice().forEach((function(t){return t(s,o.state)})))},U.prototype.dispatch=function(t,e){var n=this,o=j(t,e),r=o.type,i=o.payload,a={type:r,payload:i},s=this._actions[r];if(s){try{this._actionSubscribers.slice().filter((function(t){return t.before})).forEach((function(t){return t.before(a,n.state)}))}catch(u){}var c=s.length>1?Promise.all(s.map((function(t){return t(i)}))):s[0](i);return new Promise((function(t,e){c.then((function(e){try{n._actionSubscribers.filter((function(t){return t.after})).forEach((function(t){return t.after(a,n.state)}))}catch(u){}t(e)}),(function(t){try{n._actionSubscribers.filter((function(t){return t.error})).forEach((function(e){return e.error(a,n.state,t)}))}catch(u){}e(t)}))}))}},U.prototype.subscribe=function(t,e){return h(t,this._subscribers,e)},U.prototype.subscribeAction=function(t,e){var n="function"===typeof t?{before:t}:t;return h(n,this._actionSubscribers,e)},U.prototype.watch=function(t,e,n){var r=this;return(0,o.YP)((function(){return t(r.state,r.getters)}),e,Object.assign({},n))},U.prototype.replaceState=function(t){var e=this;this._withCommit((function(){e._state.data=t}))},U.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"===typeof t&&(t=[t]),this._modules.register(t,e),v(this,this.state,t,this._modules.get(t),n.preserveState),m(this,this.state)},U.prototype.unregisterModule=function(t){var e=this;"string"===typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit((function(){var n=k(e.state,t.slice(0,-1));delete n[t[t.length-1]]})),d(this)},U.prototype.hasModule=function(t){return"string"===typeof t&&(t=[t]),this._modules.isRegistered(t)},U.prototype.hotUpdate=function(t){this._modules.update(t),d(this,!0)},U.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(U.prototype,q);K((function(t,e){var n={};return z(e).forEach((function(e){var o=e.key,r=e.val;n[o]=function(){var e=this.$store.state,n=this.$store.getters;if(t){var o=Q(this.$store,"mapState",t);if(!o)return;e=o.context.state,n=o.context.getters}return"function"===typeof r?r.call(this,e,n):e[r]},n[o].vuex=!0})),n})),K((function(t,e){var n={};return z(e).forEach((function(e){var o=e.key,r=e.val;n[o]=function(){var e=[],n=arguments.length;while(n--)e[n]=arguments[n];var o=this.$store.commit;if(t){var i=Q(this.$store,"mapMutations",t);if(!i)return;o=i.context.commit}return"function"===typeof r?r.apply(this,[o].concat(e)):o.apply(this.$store,[r].concat(e))}})),n})),K((function(t,e){var n={};return z(e).forEach((function(e){var o=e.key,r=e.val;r=t+r,n[o]=function(){if(!t||Q(this.$store,"mapGetters",t))return this.$store.getters[r]},n[o].vuex=!0})),n}));var Z=K((function(t,e){var n={};return z(e).forEach((function(e){var o=e.key,r=e.val;n[o]=function(){var e=[],n=arguments.length;while(n--)e[n]=arguments[n];var o=this.$store.dispatch;if(t){var i=Q(this.$store,"mapActions",t);if(!i)return;o=i.context.dispatch}return"function"===typeof r?r.apply(this,[o].concat(e)):o.apply(this.$store,[r].concat(e))}})),n}));function z(t){return J(t)?Array.isArray(t)?t.map((function(t){return{key:t,val:t}})):Object.keys(t).map((function(e){return{key:e,val:t[e]}})):[]}function J(t){return Array.isArray(t)||l(t)}function K(t){return function(e,n){return"string"!==typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n)}}function Q(t,e,n){var o=t._modulesNamespaceMap[n];return o}var X={name:"ResultView",components:{testInfoComponent:(0,o.RC)((()=>n.e(954).then(n.bind(n,9954)))),HeaderComponent:(0,o.RC)((()=>n.e(380).then(n.bind(n,2380))))},data(){return{activeTimestamp:0}},watch:{async isLogin(t){t&&await this.sendAnswersToDB({uid:this.uid})}},computed:{...(0,i.rn)("test",["answers","timestamp","timeSpent"]),...(0,i.rn)("auth",["isLogin","uid"])},methods:{...Z("test",["sendAnswersToDB"]),show(t){setTimeout((()=>{this.$router.replace({name:`${t}-show`})}),3e3)}},async created(){this.isLogin&&await this.sendAnswersToDB({uid:this.uid})},beforeRouteEnter(t,e,n){"test"!==e.name?n({name:"test"}):n()}},tt=n(89);const et=(0,tt.Z)(X,[["render",r]]);var nt=et}}]);
//# sourceMappingURL=ResultView.5024e45e.js.map