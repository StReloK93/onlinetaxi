import{k as m,d as z,b as C,r as p,o as f,c as y,w as _,e as s,f as g,g as x,x as V,h,z as M,A as $,t as w,s as q,v as j,y as B}from"./app-95cc3947.js";class E{constructor(t){this.seconds=m(t),this.timerTime=t,this.start()}start(){this.interval=setInterval(()=>{this.seconds.value--,this.seconds.value==0&&(clearInterval(this.interval),this.onEnd&&this.onEnd())},1e3)}formatted(){const t=this.seconds.value%60,a=Math.floor(this.seconds.value/60),n=t>9?t:`0${t}`;return`${a>9?a:`0${a}`}:${n}`}restart(){this.seconds.value=this.timerTime,this.start()}stop(){this.seconds.value=0,clearInterval(this.interval)}}const I={class:"d-flex tw-justify-start w-100"},N=s("h3",{class:"text-h5 font-weight-bold"},"Telefon raqamni tasdiqlash",-1),A={class:"my-2 d-flex align-center justify-between-start"},D={class:"text-caption font-weight-bold text-grey-darken-3"},P={class:"text-red"},U=s("p",{class:"text-grey-darken-1 w-75"}," Kiritgan raqamingizga tasdiqlovchi maxfiy kod junatildi. ",-1),K={class:"mb-4"},L={key:0},R=z({__name:"LoginSendSmsPage",setup(b){const t=C(),a=m(null),n=new E(300),o=history.state.props.phone,k={mask:"## ###-##-##"},r=m(""),v=m(!1);async function S(){v.value=!0,await t.login({code:+r.value,phone:o}).then(l=>{var e,i,d,c;l&&(a.value=(i=(e=l.response)==null?void 0:e.data)==null?void 0:i.message,setTimeout(()=>a.value=null,5e3),((c=(d=l.response)==null?void 0:d.data)==null?void 0:c.code)==2&&n.stop())}),v.value=!1}async function T(){await t.sendSecretCode({phone:o}),n.restart()}return(l,e)=>{const i=p("v-btn"),d=p("v-otp-input"),c=p("v-form");return f(),y(c,{onSubmit:j(S,["prevent"]),class:"text-center d-flex flex-column align-center"},{default:_(()=>[s("div",I,[g(i,{onClick:e[0]||(e[0]=u=>l.$router.go(-1)),icon:"mdi-arrow-left-thin",size:"small",variant:"tonal"})]),N,s("p",A,[s("span",D,[x(" +998 "),V(s("input",{type:"text",style:{width:"90px"},"onUpdate:modelValue":e[1]||(e[1]=u=>$(o)?o.value=u:null),disabled:""},null,512),[[h(B),void 0,k],[M,h(o)]])])]),s("div",P,w(a.value),1),U,g(d,{modelValue:r.value,"onUpdate:modelValue":e[2]||(e[2]=u=>r.value=u),length:"5"},null,8,["modelValue"]),s("main",K,[h(n).seconds.value!=0?(f(),q("div",L,w(h(n).formatted()),1)):(f(),y(i,{key:1,onClick:T,variant:"tonal",type:"button",size:"x-small"},{default:_(()=>[x("Qayta yuborish")]),_:1}))]),g(i,{type:"submit",loading:v.value,"append-icon":"mdi-login",class:"w-50",disabled:!(r.value.length>4)},{default:_(()=>[x(" Tasdiqlash ")]),_:1},8,["loading","disabled"])]),_:1})}}});export{R as default};