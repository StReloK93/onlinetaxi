import{k as h,d as T,b as V,r as p,c as x,w as f,l as z,o as _,e as s,f as w,g,B as M,h as m,H as $,D as j,I as q,t as y,j as B}from"./app-52eb76ff.js";class I{constructor(t){this.seconds=h(t),this.timerTime=t,this.start()}start(){this.interval=setInterval(()=>{this.seconds.value--,this.seconds.value==0&&(clearInterval(this.interval),this.onEnd&&this.onEnd())},1e3)}formatted(){const t=this.seconds.value%60,o=Math.floor(this.seconds.value/60),a=t>9?t:`0${t}`;return`${o>9?o:`0${o}`}:${a}`}restart(){this.seconds.value=this.timerTime,this.start()}stop(){this.seconds.value=0,clearInterval(this.interval)}}const D={class:"d-flex tw-justify-start w-100"},E=s("h3",{class:"text-h5 font-weight-bold"},"Telefon raqamni tasdiqlash",-1),N={class:"my-2 d-flex tw-items-center tw-justify-start"},U={class:"tw-text-sm font-weight-bold text-grey-darken-3"},A={class:"text-red"},H=s("p",{class:"text-grey-darken-1 w-75"}," Kiritgan raqamingizga tasdiqlovchi maxfiy kod junatildi. ",-1),K={class:"mb-4"},P={key:0},R=T({__name:"SecretCode",setup(b){const t=V(),o=h(null),a=new I(300),n=history.state.props.phone,k={mask:"## ###-##-##"},r=h(""),v=h(!1);async function S(){v.value=!0,await t.login({code:+r.value,phone:n}).then(l=>{var e,i,d,c;l&&(o.value=(i=(e=l.response)==null?void 0:e.data)==null?void 0:i.message,setTimeout(()=>o.value=null,5e3),((c=(d=l.response)==null?void 0:d.data)==null?void 0:c.code)==2&&a.stop())}),v.value=!1}async function C(){await t.sendSecretCode({phone:n}),a.restart()}return(l,e)=>{const i=p("v-btn"),d=p("v-otp-input"),c=p("v-form");return _(),x(c,{onSubmit:z(S,["prevent"]),class:"text-center d-flex flex-column tw-items-center"},{default:f(()=>[s("div",D,[w(i,{onClick:e[0]||(e[0]=u=>l.$router.go(-1)),icon:"mdi-arrow-left-thin",size:"small",variant:"tonal"})]),E,s("p",N,[s("span",U,[g(" +998 "),M(s("input",{type:"text",class:"tw-w-[90px]","onUpdate:modelValue":e[1]||(e[1]=u=>q(n)?n.value=u:null),disabled:""},null,512),[[m($),void 0,k],[j,m(n)]])])]),s("div",A,y(o.value),1),H,w(d,{modelValue:r.value,"onUpdate:modelValue":e[2]||(e[2]=u=>r.value=u),length:"5"},null,8,["modelValue"]),s("main",K,[m(a).seconds.value!=0?(_(),B("div",P,y(m(a).formatted()),1)):(_(),x(i,{key:1,onClick:C,variant:"tonal",type:"button",size:"x-small"},{default:f(()=>[g("Qayta yuborish")]),_:1}))]),w(i,{type:"submit",loading:v.value,"append-icon":"mdi-login",class:"w-50",disabled:!(r.value.length>4)},{default:f(()=>[g(" Tasdiqlash ")]),_:1},8,["loading","disabled"])]),_:1},8,["onSubmit"])}}});export{R as default};
