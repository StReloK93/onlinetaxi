import{d as k,u as D,a as B,i as N,r as n,o as c,c as r,w as t,b as l,e,f as _,t as w,g as o,n as q,h as v,j as M,F as z,k as H,l as P}from"./app-227a9147.js";import{u as C}from"./useMainStore-409e227f.js";const T={class:"d-flex align-center py-4 px-2 tw-bg-slate-100"},U={class:"font-weight-bold text-h6 tw-leading-3 mt-2 mb-1"},F={class:"text-caption text-blue-grey-lighten-1"},I={class:"pa-2"},j={class:"pa-2"},Y=k({__name:"Navigator",setup($){const{name:d}=D(),a=C(),u=B(),s=N("deferredPrompt");function m(){const i=C();i.dialog.open(()=>{i.dialog.title="Dasturdan chiqmoqchimisiz ?",i.dialog.submit=()=>u.logout()})}function p(){s&&(s.value.prompt(),s.value.userChoice.then(i=>{i.outcome==="accepted"?console.log("user accepted A2HS prompt"):console.log("user dismissed A2HS prompt"),s.value=null}))}return(i,h)=>{const f=n("v-icon"),g=n("v-divider"),x=n("v-list-item"),V=n("v-list"),A=n("v-btn"),S=n("v-navigation-drawer");return c(),r(S,{temporary:o(d)=="sm",modelValue:o(a).menu,"onUpdate:modelValue":h[0]||(h[0]=y=>o(a).menu=y)},{append:t(()=>[l("div",j,[e(A,{onClick:m,block:"","append-icon":"mdi-logout"},{default:t(()=>[_(" Chiqish ")]),_:1})])]),default:t(()=>{var y,b;return[l("main",T,[e(f,{color:"primary",size:"40"},{default:t(()=>[_("mdi-vuetify")]),_:1}),l("aside",null,[l("div",U,w((y=o(u).user)==null?void 0:y.name),1),l("div",F,w((b=o(u).user)==null?void 0:b.phone),1)])]),e(g),l("div",null,[o(u).isAnyAdmins?(c(),r(V,{key:0,density:"compact"},{default:t(()=>[e(x,{"prepend-icon":"mdi-phone-classic",title:"Operatorlarga",class:q({"text-primary v-list-item--active":i.$route.name=="operator"}),color:"primary",to:{name:"operator",params:{id:1}}},null,8,["class"]),e(x,{"prepend-icon":"mdi-car-settings",title:"Junatilgan transportlar",color:"primary",to:{name:"send-roads"}})]),_:1})):v("",!0),e(g,{class:"border-opacity-50"}),l("div",I,[o(s)?(c(),r(A,{key:0,onClick:p,block:"","append-icon":"mdi-download",variant:"tonal"},{default:t(()=>[_(" Ilovani o'rnatish ")]),_:1})):v("",!0)])])]}),_:1},8,["temporary","modelValue"])}}}),E={class:"d-flex align-center"},J=k({__name:"Header",setup($){const d=C(),a=B();return(u,s)=>{const m=n("v-app-bar-nav-icon"),p=n("v-icon"),i=n("v-app-bar-title"),h=n("v-app-bar");return c(),M(z,null,[e(Y),e(h,{density:"comfortable",elevation:0,border:1,color:"primary"},{prepend:t(()=>[e(m,{color:"white",onClick:s[0]||(s[0]=f=>o(d).menu=!o(d).menu)})]),default:t(()=>[e(i,null,{default:t(()=>{var f,g;return[l("div",E,[o(a).isDriver?(c(),r(p,{key:0},{default:t(()=>[_("mdi-chess-knight")]),_:1})):v("",!0),o(a).isPassenger?(c(),r(p,{key:1},{default:t(()=>[_("mdi-chess-pawn")]),_:1})):v("",!0),o(a).isAdmin?(c(),r(p,{key:2},{default:t(()=>[_("mdi-chess-rook")]),_:1})):v("",!0),o(a).isSuperAdmin?(c(),r(p,{key:3},{default:t(()=>[_("mdi-chess-king")]),_:1})):v("",!0),l("span",null,w((g=(f=o(a).user)==null?void 0:f.role)==null?void 0:g.name),1)])]}),_:1})]),_:1})],64)}}}),L=l("span",{style:{width:"90px"},class:"tw-leading-none"},"Mening qatnovlarim",-1),O=l("span",{style:{width:"90px"},class:"tw-leading-none"},"Barcha Qatnovlar",-1),Q=l("span",{style:{width:"90px"},class:"tw-leading-none"},"Barcha Yo'lovchilar",-1),G=l("span",{style:{width:"90px"},class:"tw-leading-none"},"Mening Transportim",-1),K=k({__name:"BottomNavigation",setup($){const d=B();return(a,u)=>{const s=n("v-icon"),m=n("v-btn"),p=n("v-bottom-navigation");return c(),r(p,{color:"primary",class:"text-center"},{default:t(()=>[o(d).isDriver?(c(),r(m,{key:0,to:{name:"car-rides-auth-user"}},{default:t(()=>[e(s,null,{default:t(()=>[_("mdi-taxi")]),_:1}),L]),_:1})):v("",!0),e(m,{to:{name:"car-rides"}},{default:t(()=>[e(s,null,{default:t(()=>[_("mdi-timeline-clock-outline")]),_:1}),O]),_:1}),o(d).isPassengerAdmins?(c(),r(m,{key:1,to:{name:"passengers"}},{default:t(()=>[e(s,null,{default:t(()=>[_("mdi-human-greeting")]),_:1}),Q]),_:1})):v("",!0),o(d).isDriverAdmins?(c(),r(m,{key:2,to:{name:"transports"}},{default:t(()=>[e(s,null,{default:t(()=>[_("mdi-train-car")]),_:1}),G]),_:1})):v("",!0)]),_:1})}}}),R={class:"px-5 py-3 text-center tw-shadow-sm tw-relative"},W={class:"mb-1"},X={class:"text-pink"},Z=k({__name:"Alert",setup($){const d=H(null),a=C();function u(){a.dialog.cancel()}function s(){a.dialog.submitInner()}function m(){setTimeout(()=>d.value.$el.focus())}return(p,i)=>{const h=n("v-icon"),f=n("v-card-text"),g=n("v-spacer"),x=n("v-btn"),V=n("v-card-actions"),A=n("v-card"),S=n("v-form"),y=n("v-dialog");return c(),r(y,{width:"400",modelValue:o(a).dialog.model,"onUpdate:modelValue":i[2]||(i[2]=b=>o(a).dialog.model=b)},{default:t(()=>[e(S,{onSubmit:i[1]||(i[1]=P(b=>u(),["prevent"])),onVnodeMounted:m,onVnodeUnmounted:o(a).dialog.reset},{default:t(()=>[e(A,null,{default:t(()=>[l("main",R,[l("div",W,[e(h,{color:"primary",size:"40"},{default:t(()=>[_(w(o(a).dialog.icon),1)]),_:1})]),l("span",X,w(o(a).dialog.title),1)]),e(f,{class:"tw-bg-slate-50"},{default:t(()=>[_(w(o(a).dialog.subTitle),1)]),_:1}),e(V,{class:"tw-bg-slate-50"},{default:t(()=>[e(g),e(x,{text:"Yoq",ref_key:"btnCalcel",ref:d,color:"primary",variant:"tonal",type:"submit",class:"tw-bg-gray-50 focus:tw-outline-2 focus:tw-outline-red-300 focus:tw-outline",onClick:i[0]||(i[0]=b=>o(a).dialog.model=!1)},null,512),e(x,{text:"Ha",type:"button",color:"gray",variant:"tonal",onClick:s})]),_:1})]),_:1})]),_:1},8,["onVnodeUnmounted"])]),_:1},8,["modelValue"])}}}),nt=k({__name:"Index",setup($){return(d,a)=>{const u=n("router-view"),s=n("v-container"),m=n("v-main"),p=n("v-app");return c(),r(p,{class:"bg-grey-lighten-4"},{default:t(()=>[e(Z),e(m,null,{default:t(()=>[e(J),e(s,{class:"h-100 md:tw-p-4 tw-p-2"},{default:t(()=>[e(u,{class:"h-100 tw-relative"})]),_:1})]),_:1}),e(K)]),_:1})}}});export{nt as default};