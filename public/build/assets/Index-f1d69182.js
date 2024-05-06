import{d as w,u as N,a as $,b as k,r as o,o as g,c as x,w as e,e as _,f as t,g as m,t as f,h as a,n as z,i as T,F as U,_ as j,j as q,k as D}from"./app-ffab9f92.js";const F={class:"d-flex justify-center align-center flex-column py-1 tw-bg-slate-100"},M={class:"d-flex justify-space-between flex-column align-right"},A={class:"font-weight-bold text-h6 tw-leading-3 mt-2 mb-1"},H={class:"text-caption text-blue-grey-lighten-1"},I=w({__name:"Navigator",setup(b){const{name:s}=N(),n=$(),i=k();return(r,l)=>{const u=o("v-icon"),c=o("v-divider"),d=o("v-list-item"),v=o("v-list"),y=o("v-navigation-drawer");return g(),x(y,{temporary:a(s)=="sm",modelValue:a(n).menu,"onUpdate:modelValue":l[0]||(l[0]=p=>a(n).menu=p)},{default:e(()=>{var p,h;return[_("main",F,[t(u,{color:"primary",size:"40"},{default:e(()=>[m("mdi-vuetify")]),_:1}),_("aside",M,[_("span",A,f((p=a(i).user)==null?void 0:p.name),1),_("span",H,f((h=a(i).user)==null?void 0:h.phone),1)])]),t(c),_("div",null,[t(v,{density:"compact"},{default:e(()=>[t(d,{"prepend-icon":"mdi-phone-classic",title:"Operatorlarga",class:z({"text-primary v-list-item--active":r.$route.name=="operator"}),color:"primary",to:{name:"operator",params:{id:1}}},null,8,["class"])]),_:1}),t(c,{class:"border-opacity-50"}),t(v,{density:"compact"},{default:e(()=>[t(d,{"prepend-icon":"mdi-train-car",title:"Transportlar",color:"primary",to:{name:"transports"}}),t(d,{"prepend-icon":"mdi-car-settings",title:"Junatilgan transportlar",color:"primary",to:{name:"send-roads"}})]),_:1})])]}),_:1},8,["temporary","modelValue"])}}}),Y=w({__name:"Header",setup(b){const s=$(),n=k();function i(){s.dialog.open(()=>{s.dialog.title="Dasturdan chiqmoqchimisiz ?",s.dialog.submit=()=>n.logout()})}return(r,l)=>{const u=o("v-app-bar-nav-icon"),c=o("v-app-bar-title"),d=o("v-btn"),v=o("v-app-bar");return g(),T(U,null,[t(I),t(v,{density:"comfortable",elevation:0,border:1,color:"primary"},{prepend:e(()=>[t(u,{color:"white",onClick:l[0]||(l[0]=y=>a(s).menu=!a(s).menu)})]),default:e(()=>[t(c,null,{default:e(()=>[m(" Shaharlararo online taxi ")]),_:1}),t(d,{icon:"mdi-logout",density:"comfortable",onClick:i,color:"white"})]),_:1})],64)}}}),E={};function J(b,s){const n=o("v-icon"),i=o("v-btn"),r=o("v-bottom-navigation");return g(),x(r,{color:"primary",grow:""},{default:e(()=>[t(i,{to:{name:"car-rides"}},{default:e(()=>[t(n,null,{default:e(()=>[m("mdi-timeline-clock-outline")]),_:1}),m(" Qatnovlar ")]),_:1}),t(i,{to:{name:"passengers"}},{default:e(()=>[t(n,null,{default:e(()=>[m("mdi-human-greeting")]),_:1}),m(" Yo'lovchilar ")]),_:1})]),_:1})}const O=j(E,[["render",J]]),Q={class:"px-5 py-3 text-center tw-shadow-sm tw-relative"},G={class:"mb-1"},K={class:"text-pink"},L=w({__name:"Alert",setup(b){const s=q(null),n=$();function i(){n.dialog.cancel()}function r(){n.dialog.submitInner()}function l(){setTimeout(()=>s.value.$el.focus())}return(u,c)=>{const d=o("v-icon"),v=o("v-card-text"),y=o("v-spacer"),p=o("v-btn"),h=o("v-card-actions"),C=o("v-card"),S=o("v-form"),B=o("v-dialog");return g(),x(B,{width:"400",modelValue:a(n).dialog.model,"onUpdate:modelValue":c[2]||(c[2]=V=>a(n).dialog.model=V)},{default:e(()=>[t(S,{onSubmit:c[1]||(c[1]=D(V=>i(),["prevent"])),onVnodeMounted:l,onVnodeUnmounted:a(n).dialog.reset},{default:e(()=>[t(C,null,{default:e(()=>[_("main",Q,[_("div",G,[t(d,{color:"primary",size:"40"},{default:e(()=>[m(f(a(n).dialog.icon),1)]),_:1})]),_("span",K,f(a(n).dialog.title),1)]),t(v,{class:"tw-bg-slate-50"},{default:e(()=>[m(f(a(n).dialog.subTitle),1)]),_:1}),t(h,{class:"tw-bg-slate-50"},{default:e(()=>[t(y),t(p,{text:"Yoq",ref_key:"btnCalcel",ref:s,color:"primary",variant:"tonal",type:"submit",class:"tw-bg-gray-50 focus:tw-outline-2 focus:tw-outline-red-300 focus:tw-outline",onClick:c[0]||(c[0]=V=>a(n).dialog.model=!1)},null,512),t(p,{text:"Ha",type:"button",color:"gray",variant:"tonal",onClick:r})]),_:1})]),_:1})]),_:1},8,["onVnodeUnmounted"])]),_:1},8,["modelValue"])}}}),R=w({__name:"Index",setup(b){return(s,n)=>{const i=o("router-view"),r=o("v-container"),l=o("v-main"),u=o("v-app");return g(),x(u,{class:"bg-grey-lighten-5"},{default:e(()=>[t(L),t(Y),t(l,null,{default:e(()=>[t(r,{class:"h-100 py-1"},{default:e(()=>[t(i,{class:"h-100 tw-relative"})]),_:1})]),_:1}),t(O)]),_:1})}}});export{R as default};
