import{c as D,_ as Mt,m as wt,f as Pt,o as kt}from"./main-d8b19f6a.js";function St(y){[y.width,y.height]=[window.innerWidth,window.innerHeight];const t=y.getContext("2d"),g=y.width,I=y.height,p=Math.round(Math.min(g,I)/4),T=Math.round(g/2),B=Math.round(I/2),P=n=>n*Math.PI/180,F=(n,a)=>Math.random()*(a-n)+n,H="rgb(255, 231, 188)",G="rgb(153, 54, 0)",L="rgb(107, 38, 0)";let j="rgb(42, 42, 42)",c="rgb(29, 29, 29)";const[e,R]=[p/3,p/10];let q=-p*11/12,k=q-p/5,K=[],Z=!1,U=1;const tt=.1;let N=1;const et={create(n,a){const l={x:n,y:a};let i={x:0,y:0,r:5};const M=Math.round(F(0,1))===1?F(0,50)*-.1:F(0,50)*.1;let _=F(-10,10);return{color:`hsl(${F(30,60)},100%,${F(50,100)}%)`,coords:{dx:M,dy:_,...i},translate:l}},draw({translate:n,coords:a,color:l}){return t.save(),t.translate(n.x,n.y),t.rotate(30*Math.PI/180),t.fillStyle=l,t.beginPath(),t.arc(a.x,a.y,a.r,0,2*Math.PI),t.fill(),t.restore(),this.update(a)},update(n){return n.r-=.05,n.x+=n.dx,n.y+=n.dy,n.dy++,n}},lt={create(n,a,l){const i={x:Math.min(n.x,a.x,l.x)*10/p,y:Math.min(n.y,a.y,l.y)*10/p};return{a:n,b:a,c:l,delta:i,translate:{x:0,y:0}}},update({delta:n,translate:a}){return a.x+=n.x,a.y+=n.y,a},draw({a:n,b:a,c:l,translate:i,delta:d}){return t.save(),t.translate(i.x,i.y),t.fillStyle="transparent",t.strokeStyle="black",t.beginPath(),t.moveTo(n.x,n.y),t.lineTo(a.x,a.y),t.lineTo(l.x,l.y),t.clip(),nt(),t.restore(),this.update({delta:d,translate:i})}};let J=[],W=1,S=[],Q=1,V=0;function nt(){const n=p/4,a=Math.acos(n/(2*p));t.save(),t.beginPath(),t.fillStyle=c,t.arc(0,0,p,0,2*Math.PI),t.fill(),t.globalCompositeOperation="source-atop",t.beginPath(),t.arc(0,0,p,-a,a),t.arc(n,0,p,Math.PI-a,Math.PI+a),t.fillStyle=j,t.fill(),t.restore()}function it(){function n(l){const i=P(120);t.beginPath(),t.ellipse(0,k,e,R,0,i*!l,i*l||Math.PI),t.ellipse(0,q,e,R,0,i*l||Math.PI,i*!l,!0),t.ellipse(0,k,e,R,0,i*!l,i*!l),t.stroke(),t.fill()}function a(l){const i=P(160);t.beginPath(),t.ellipse(0,k,e,R,0,i,2*(i-Math.PI),!!l),t.stroke(),t.fill()}for(let l=0;l<2;l++)t.fillStyle=l?j:c,t.strokeStyle=l?j:c,a(l),n(l)}function ot(n=0,a=1,l){const i=P(120),d={x:0,y:k},M={x:-e/2,y:k-p/4},_={x:e/3,y:k-p/2},E={x:-e/6,y:k-p*3/4},[O,o]=[e/6,R/6];let h,m;function w(u){const x=(1-u)**3,b=3*u*(1-u)**2,r=3*u**2*(1-u),s=u**3;h=x*d.x+b*M.x+r*_.x+s*E.x,m=x*d.y+b*M.y+r*_.y+s*E.y,t.beginPath(),t.strokeStyle=l||L,t.ellipse(h,m,O,o,0,i,Math.PI),t.stroke(),t.beginPath(),t.strokeStyle=l||G,t.ellipse(h,m,O,o,0,0,i),t.stroke()}function f(){t.beginPath(),t.fillStyle=l||L,t.ellipse(h,m,O,o,0,0,2*Math.PI),t.fill()}for(let u=n;u<=a;u+=.001)w(u);if(f(),l)return[h,m]}function ut(){Z=!0,nt(),it(),ot(0,U);const n=Math.max(U,0),a=Math.min(1,U+tt);let[l,i]=ot(n,a,H);l&&i&&K.push(et.create(l,i)),K=K.filter(d=>(d.coords=et.draw(d),d.coords.r>0)),U-=tt/10}function xt(){J=J.filter(n=>(n.translate=lt.draw(n),Math.abs(n.translate.x)<g&&Math.abs(n.translate.y)<I)),k-=10,q-=10,it(),N-=.01,j=`rgba(42, 42, 42, ${N})`,c=`rgba(29, 29, 29, ${N})`}function yt(){W-=.02;for(let l=0;l<S.length;l++){const{r:i,g:d,b:M,o:_}=S[l].color;t.fillStyle=`rgba(${i},${d},${M},${_}`;const E=S[l].pos;t.beginPath(),E.forEach(({x:O,y:o})=>{t.lineTo(O,o)}),t.fill(),S[l].pos=E.map(a),S[l].color=n(S[l].color)}S=S.filter(l=>l.pos.every(i=>Math.abs(i.x)<y.width*10&&Math.abs(i.y)<y.height*10));function n({r:l,g:i,b:d,o:M}){return{r:l,g:i-1,b:d-.5,o:M-.02}}function a({x:l,y:i}){const d=l/15,M=i/15;return{x:l+d,y:i+M}}}function dt(){const n="TEST OVER";t.textBaseline="middle",t.textAlign="center",t.fillStyle="rgba(255, 255, 255, 1)",t.save();for(let a=.02;a<.1;a+=.02)t.font=`${(V-a)*16}rem Khula sans-serif`,t.fillText(n,T,B);t.restore(),t.font=`${V*16}rem Khula sans-serif`,t.fillText(n,T,B),t.font=`${V*16}rem Khula sans-serif`,t.strokeStyle="rgba(0, 0, 0, 1)",t.strokeText(n,T,B),V+=.01,Q=t.measureText(n).width}function at(){Q<T*1.5?(requestAnimationFrame(at),t.fillStyle="#000",t.fillRect(-y.width,-y.height,2*y.width,2*y.height)):setTimeout(()=>D().setAnimationStatus(!1),3e3),(K.length||!Z)&&ut(),!K.length&&N>=0&&xt(),N<.5&&W>0&&yt(),W<0&&Q===1&&(t.rotate(P(30)),t.translate(-T,-B)),W<0&&dt()}function mt(){const[n,a]=bt(p),l=[];for(let i=0;i<a.length;i+=3){const d=lt.create(n[a[i]],n[a[i+1]],n[a[i+2]]);l.push(d)}return l}function gt(n){let l=1,i=[],d=0;for(let M=0;M<n;M++){const _=F(0,2*Math.PI);i.push(_)}return i.sort(),function(){const M=100*Math.cos(i[d])*(1-l/4),_=100*Math.sin(i[d])*(1-l/4);return l*=-1,d++,{x:M,y:_}}}function pt(){var d;(d=S[S.length-1])!=null&&d.flag&&(S[S.length-1].flag=!1);let n={r:255,g:236,b:73,o:W};const a=Math.round(F(50,75)),l=gt(a);let i=[];for(let M=0;M<a;M++)i.push(l());S.push({flag:!0,pos:i,color:n})}function bt(n){const l=[],i=Math.floor(n/4);for(let o=0;o<i;o++)l.push(d(n));function d(o){const h=Math.random()*(3*o)-1.5*o,m=Math.random()*(3*o)-1.5*o;return{x:h,y:m}}function M(o){let h=o.length;if(h<3)return[];o=o.slice(0);let m=[];for(let r=0;r<h;r++)m.push(r);m.sort((r,s)=>o[r].x-o[s].x);let w=E(o);o.push(w.p1,w.p2,w.p3);let f=[_(o,h,h+1,h+2)],u=[],x=[];for(let r=m.length-1;r>=0;r--){for(let s=f.length-1;s>=0;s--){let C=o[m[r]].x-f[s].x;if(C>0&&C*C>f[s].r){u.push(f[s]),f.splice(s,1);continue}let z=o[m[r]].y-f[s].y;C*C+z*z-f[s].r>1e-7||(x.push(f[s].a,f[s].b,f[s].b,f[s].c,f[s].c,f[s].a),f.splice(s,1))}O(x);for(let s=x.length-1;s>=0;){let C=x[s];if(s--,s<0)break;let z=x[s];s--,f.push(_(o,z,C,m[r]))}x=[]}for(let r=f.length-1;r>=0;r--)u.push(f[r]);let b=[];for(let r=0;r<u.length;r++)u[r].a<h&&u[r].b<h&&u[r].c<h&&b.push(u[r].a,u[r].b,u[r].c);return b}function _(o,h,m,w){let f=o[h].x,u=o[h].y,x=o[m].x,b=o[m].y,r=o[w].x,s=o[w].y,C=Math.abs(u-b),z=Math.abs(b-s),A,$;if(C<1e-7){let X=-((r-x)/(s-b)),Y=(x+r)/2,v=(b+s)/2;A=(f+x)/2,$=X*(A-Y)+v}else if(z<1e-7){let X=-((x-f)/(b-u)),Y=(f+x)/2,v=(u+b)/2;A=(x+r)/2,$=X*(A-Y)+v}else{let X=-((x-f)/(b-u)),Y=-((r-x)/(s-b)),v=(f+x)/2,ht=(u+b)/2,ct=(x+r)/2,ft=(b+s)/2;A=(X*v-Y*ct+ft-ht)/(X-Y),C>z?$=X*(A-v)+ht:$=Y*(A-ct)+ft}let rt=x-A,st=b-$;return{a:h,b:m,c:w,x:A,y:$,r:rt*rt+st*st}}function E(o){let h=1e6,m=-1e6,w=1e6,f=-1e6;for(let $=0;$<o.length;$++)h=Math.min(h,o[$].x),w=Math.min(w,o[$].y),m=Math.max(m,o[$].x),f=Math.max(f,o[$].y);let u=m-h,x=f-w,b=Math.max(u,x),r=u*.5+h,s=x*.5+w;const C={x:r-10*b,y:s-10*b},z={x:r,y:s+10*b},A={x:r+10*b,y:s-10*b};return{p1:C,p2:z,p3:A}}function O(o){for(let h=o.length-1;h>=0;){let m=o[h];h--;let w=o[h];h--;let f,u;for(let x=h;x>=0;){if(f=o[x],x--,u=o[x],x--,w===u&&m===f){o.splice(h+1,2),o.splice(x+1,2);break}if(w===f&&m===u){o.splice(h+1,2),o.splice(x+1,2);break}}}}return[l,M(l)]}t.translate(T,B),t.rotate(P(-30)),J=mt(),pt(),at(),D().setAnimationStatus(!0)}function _t(y){let t;y.width=window.innerWidth,y.height=window.innerHeight;const g=y.getContext("2d");g.fillStyle="#000",g.fillRect(0,0,y.width,y.height);let I=[],p=[],T=20,B={x:y.width/2,y:y.height/2},P=400;for(let c=0;c<T;c++){let e={x:Math.random()*P/2-P/4+B.x,y:Math.random()*P*2+y.height,size:Math.random()+.5,fill:"#fd1",vx:Math.random()-.5,vy:-(Math.random()+4),ax:Math.random()*.02-.01,far:Math.random()*P+(B.y-P)};e.base={x:e.x,y:e.y,vx:e.vx},I.push(e)}function F(){let c=Math.floor(Math.random()*256),e=Math.floor(Math.random()*256),R=Math.floor(Math.random()*256);return`rgb(${c},${e},${R}`}function H(c){t||(t=c),c-t>5e3&&G(),L(),j(),requestAnimationFrame(H)}function G(){let{opacity:c}=getComputedStyle(y);c<=0&&D().setAnimationStatus(!1),c-=.01,y.style.opacity=c}function L(){for(let c=0;c<I.length;c++){let e=I[c];if(e.y<=e.far){let R=F();for(let q=0;q<T*5;q++){let k={x:e.x,y:e.y,size:Math.random()+1.5,fill:R,vx:Math.random()*5-2.5,vy:Math.random()*-5+1.5,ay:.05,alpha:1,life:Math.round(Math.random()*P/2)+P/2};k.base={life:k.life,size:k.size},p.push(k)}e.y=e.base.y,e.x=e.base.x,e.vx=e.base.vx,e.ax=Math.random()*.02-.01}e.x+=e.vx,e.y+=e.vy,e.vx+=e.ax}for(let c=p.length-1;c>=0;c--){let e=p[c];e&&(e.x+=e.vx,e.y+=e.vy,e.vy+=e.ay,e.alpha=e.life/e.base.life,e.size=e.alpha*e.base.size,e.alpha=e.alpha>.6?1:e.alpha,e.life--,e.life<=0&&p.splice(c,1))}}function j(){g.globalCompositeOperation="source-over",g.globalAlpha=.18,g.fillStyle="#000",g.fillRect(0,0,y.width,y.height),g.globalCompositeOperation="screen",g.globalAlpha=1;for(let c=0;c<I.length;c++){let e=I[c];g.beginPath(),g.arc(e.x,e.y,e.size,0,Math.PI*2),g.closePath(),g.fillStyle=e.fill,g.fill()}for(let c=0;c<p.length;c++){let e=p[c];g.globalAlpha=e.alpha,g.beginPath(),g.arc(e.x,e.y,e.size,0,Math.PI*2),g.closePath(),g.fillStyle=e.fill,g.fill()}}requestAnimationFrame(H),D().setAnimationStatus(!0)}const $t={name:"AnimationShow",computed:{...wt(D,["mode","isAnimate"])},watch:{isAnimate(y){y||this.$router.replace({name:"test"})}},async mounted(){switch(this.mode){case"fire-show":await _t(this.$refs.canvas);break;case"fail-show":St(this.$refs.canvas);break}}},Ct={ref:"canvas"};function At(y,t,g,I,p,T){return kt(),Pt("canvas",Ct,null,512)}const Tt=Mt($t,[["render",At],["__scopeId","data-v-7504476d"]]);export{Tt as default};
