import{d as $,u as I,a as z,b as S,r as T,i as Y,c as n,o as _,e as f,w as t,f as g,g as e,h as y,t as B,j as l,k as x,l as L,m as P,n as q,p as R,q as D,s as N,v as Q,x as E,T as G,F as O}from"./app-121b15a2.js";const J={class:"d-flex align-center py-4 px-2 bg-grey-lighten-4"},K={class:"font-weight-bold text-h6 leading-none mt-2"},W={class:"text-caption text-blue-grey-lighten-1"},X={class:"pa-2"},Z={key:0},ee={key:1},te={class:"pa-2"},oe=$({__name:"TheLeftNavigator",setup(C){const{name:v}=I(),a=z(),i=S(),d=T(!1);async function o(s){i.user.role_id!=s&&(d.value=!0,await i.changeRole(s),d.value=!1)}function u(s){return i.user.role_id==s?"primary":"grey-lighten-4"}const m=Y("deferredPrompt");function k(){const s=z();s.dialog.open(()=>{s.dialog.title="Dasturdan chiqmoqchimisiz ?",s.dialog.submit=()=>i.logout()})}function h(){m&&(m.value.prompt(),m.value.userChoice.then(s=>{s.outcome==="accepted"?console.log("user accepted A2HS prompt"):console.log("user dismissed A2HS prompt"),m.value=null}))}return(s,r)=>{const c=n("v-icon"),b=n("v-divider"),w=n("v-btn"),A=n("v-col"),V=n("v-row"),F=n("v-list-item"),M=n("v-list"),U=n("v-navigation-drawer");return _(),f(U,{temporary:l(v)=="sm",modelValue:l(a).menu,"onUpdate:modelValue":r[2]||(r[2]=p=>l(a).menu=p)},{append:t(()=>[g("div",te,[e(w,{onClick:k,block:"","append-icon":"mdi-logout"},{default:t(()=>[y(" Chiqish ")]),_:1})])]),default:t(()=>{var p,H;return[g("main",J,[e(c,{color:"primary",size:"40"},{default:t(()=>[y("mdi-vuetify")]),_:1}),g("aside",null,[g("div",K,B((p=l(i).user)==null?void 0:p.name),1),g("div",W,B((H=l(i).user)==null?void 0:H.phone),1)])]),e(b),g("div",null,[g("div",X,[l(m)?(_(),f(w,{key:0,onClick:h,block:"","append-icon":"mdi-download",variant:"tonal",class:"mb-2"},{default:t(()=>[y(" Ilovani o'rnatish ")]),_:1})):x("",!0),e(b),l(i).isPassenger||l(i).isDriver?(_(),f(V,{key:1,class:"mb-2 mt-2"},{default:t(()=>[e(A,{cols:"6",class:"py-0 pr-1"},{default:t(()=>[e(w,{onClick:r[0]||(r[0]=j=>o(4)),loading:d.value,color:u(4),variant:"flat",block:""},{default:t(()=>[y(" Haydovchi ")]),_:1},8,["loading","color"])]),_:1}),e(A,{cols:"6",class:"py-0 pl-1"},{default:t(()=>[e(w,{onClick:r[1]||(r[1]=j=>o(3)),loading:d.value,color:u(3),variant:"flat",block:""},{default:t(()=>[y(" Yo'lovchi ")]),_:1},8,["loading","color"])]),_:1})]),_:1})):x("",!0),e(b),e(M,{density:"compact"},{default:t(()=>[e(F,{"prepend-icon":"mdi-car-settings",to:{name:"transports"}},{title:t(()=>[l(i).isDriverAdmins?(_(),L("span",Z," Transportlar ")):(_(),L("span",ee," Mening transportlarim "))]),_:1})]),_:1})])])]}),_:1},8,["temporary","modelValue"])}}}),ne={class:"d-flex align-center"},ae=$({__name:"TheAppBar",setup(C){const v=z(),a=S();return(i,d)=>{const o=n("v-app-bar-nav-icon"),u=n("v-icon"),m=n("v-app-bar-title"),k=n("v-app-bar");return _(),f(k,{density:"comfortable",elevation:0,border:1,color:"primary"},{prepend:t(()=>[e(o,{color:"white",onClick:d[0]||(d[0]=h=>l(v).menu=!l(v).menu)})]),default:t(()=>[e(m,null,{default:t(()=>{var h,s;return[g("div",ne,[l(a).isDriver?(_(),f(u,{key:0},{default:t(()=>[y("mdi-chess-knight")]),_:1})):x("",!0),l(a).isPassenger?(_(),f(u,{key:1},{default:t(()=>[y("mdi-chess-pawn")]),_:1})):x("",!0),l(a).isAdmin?(_(),f(u,{key:2},{default:t(()=>[y("mdi-chess-rook")]),_:1})):x("",!0),l(a).isSuperAdmin?(_(),f(u,{key:3},{default:t(()=>[y("mdi-chess-king")]),_:1})):x("",!0),g("span",null,B((s=(h=l(a).user)==null?void 0:h.role)==null?void 0:s.name),1)])]}),_:1})]),_:1})}}}),ie={class:"text-right w-100 px-2"},le=$({__name:"TheLittleAppBar",setup(C){const v=S(),a=z(),i=T(!1),d=P(()=>{var r,c;return(r=a.city)!=null&&r.name?(c=a.city)==null?void 0:c.name:"Qayerdasiz?"}),o=q({notification:!0,overlay:!1,loading:!0,city_loading:!1,regions:[],region_districts:[],region_id:null,clearButtonLoading:!1}),u=q({city_id:null,token:v.token});async function m(r){o.region_id=r,o.region_districts=[],o.city_loading=!0,u.city_id=null,await D.get(`district/${r}`).then(({data:c})=>{o.region_districts=c,o.city_loading=!1})}async function k(){o.overlay=!0,u.city_id=null,o.region_id=null;const{data:r}=await D.get("region");if(o.regions=r,a.city==null)return o.overlay=!1;m(a.city.region_id),u.city_id=a.city.id,o.overlay=!1}async function h(){o.clearButtonLoading=!0,await D.post("firebase/set-city-topic",{city_id:null,token:v.token}),a.city=null,o.clearButtonLoading=!1}async function s(){const{data:r}=await D.post("firebase/set-city-topic",u);a.city=r}return R(async()=>{D.post("firebase/get-city-topic",{token:v.token}).then(({data:r})=>{a.city=r,o.loading=!1}).catch(()=>{console.clear(),o.notification=!1,o.loading=!1})}),(r,c)=>{const b=n("v-btn"),w=n("v-icon"),A=n("v-autocomplete"),V=n("v-col"),F=n("BaseForm"),M=n("v-bottom-sheet"),U=n("v-app-bar");return _(),f(U,{density:"compact",elevation:0,border:1},{default:t(()=>[g("div",ie,[l(a).city?(_(),f(b,{key:0,icon:"mdi-close",onClick:h,size:"x-small",loading:o.clearButtonLoading},null,8,["loading"])):x("",!0),o.notification?(_(),f(b,{key:1,onClick:c[0]||(c[0]=p=>i.value=!0),text:d.value,"append-icon":"mdi-map-marker",loading:o.loading},null,8,["text","loading"])):(_(),f(b,{key:2,disabled:""},{default:t(()=>[y("Habarnoma o'chirilgan")]),_:1}))]),e(M,{modelValue:i.value,"onUpdate:modelValue":c[5]||(c[5]=p=>i.value=p),inset:""},{default:t(()=>[e(F,{loading:o.overlay,submit:s,title:"Manzilni o'zgartirish",onClose:c[4]||(c[4]=p=>i.value=!1),onVnodeMounted:k},{default:t(()=>[g("p",null,[e(w,{color:"primary"},{default:t(()=>[y("mdi-bell-outline")]),_:1}),y(" Quyida ko'rsatgan manzilingizga qarab yo'lovchilar haqida sizga habarnoma junatamiz. ")]),e(V,{cols:"12",class:"px-0"},{default:t(()=>[e(A,{"onUpdate:modelValue":[c[1]||(c[1]=p=>m(p)),c[2]||(c[2]=p=>o.region_id=p)],items:o.regions,modelValue:o.region_id,label:"Viloyat","item-title":"name","item-value":p=>p.id,rules:l(N)},null,8,["items","modelValue","item-value","rules"])]),_:1}),e(V,{cols:"12",class:"px-0"},{default:t(()=>[e(A,{disabled:o.region_id==null,items:o.region_districts,modelValue:u.city_id,"onUpdate:modelValue":c[3]||(c[3]=p=>u.city_id=p),label:"Shahar (Tuman)","item-title":"name",loading:o.city_loading,"item-value":p=>p.id,rules:l(N)},null,8,["disabled","items","modelValue","loading","item-value","rules"])]),_:1})]),_:1},8,["loading"])]),_:1},8,["modelValue"])]),_:1})}}}),se=$({__name:"TheHeader",setup(C){const v=S();return(a,i)=>(_(),L("header",null,[e(oe),e(ae),a.$route.meta.clear!=!0&&l(v).isPassenger==!1?(_(),f(le,{key:0})):x("",!0)]))}}),re=g("span",{style:{width:"88px"},class:"tw-leading-none"},"Mening elonlarim",-1),ce=g("span",{style:{width:"88px"},class:"tw-leading-none"},"Haydovchi elonlari",-1),de=g("span",{style:{width:"88px"},class:"tw-leading-none"},"Yo'lovchi elonlari",-1),ue=$({__name:"TheBottomNavigation",setup(C){return S(),(v,a)=>{const i=n("v-icon"),d=n("v-btn"),o=n("v-bottom-navigation");return _(),f(o,{color:"primary",class:"text-center"},{default:t(()=>[e(d,{to:{name:"car-rides-auth-user"}},{default:t(()=>[e(i,null,{default:t(()=>[y("mdi-timeline-clock-outline")]),_:1}),re]),_:1}),e(d,{to:{name:"car-rides"}},{default:t(()=>[e(i,null,{default:t(()=>[y("mdi-taxi")]),_:1}),ce]),_:1}),e(d,{to:{name:"passengers"}},{default:t(()=>[e(i,null,{default:t(()=>[y("mdi-human-greeting")]),_:1}),de]),_:1})]),_:1})}}}),_e={class:"px-5 py-3 text-center elevation-1 position-relative"},me={class:"mb-1"},pe={class:"text-pink"},ve=$({__name:"TheAlert",setup(C){const v=T(null),a=z();function i(){a.dialog.cancel()}function d(){a.dialog.submitInner()}function o(){setTimeout(()=>v.value.$el.focus())}return(u,m)=>{const k=n("v-icon"),h=n("v-card-text"),s=n("v-spacer"),r=n("v-btn"),c=n("v-card-actions"),b=n("v-card"),w=n("v-form"),A=n("v-dialog");return _(),f(A,{width:"400",modelValue:l(a).dialog.model,"onUpdate:modelValue":m[2]||(m[2]=V=>l(a).dialog.model=V)},{default:t(()=>[e(w,{onSubmit:m[1]||(m[1]=Q(V=>i(),["prevent"])),onVnodeMounted:o,onVnodeUnmounted:l(a).dialog.reset},{default:t(()=>[e(b,null,{default:t(()=>[g("main",_e,[g("div",me,[e(k,{color:"primary",size:"40"},{default:t(()=>[y(B(l(a).dialog.icon),1)]),_:1})]),g("span",pe,B(l(a).dialog.title),1)]),e(h,{class:"bg-grey-lighten-4"},{default:t(()=>[y(B(l(a).dialog.subTitle),1)]),_:1}),e(c,{class:"bg-grey-lighten-4"},{default:t(()=>[e(s),e(r,{text:"Yoq",ref_key:"btnCalcel",ref:v,color:"primary",variant:"tonal",type:"submit",class:"",onClick:m[0]||(m[0]=V=>l(a).dialog.model=!1)},null,512),e(r,{text:"Ha",type:"button",color:"gray",variant:"tonal",onClick:d})]),_:1})]),_:1})]),_:1},8,["onVnodeUnmounted"])]),_:1},8,["modelValue"])}}}),ge=$({__name:"FormAdd-TransportForce",setup(C){const v=S(),a=T(),i=q({overlay:!1}),d=T([]),o=T(!1),u=P(()=>v.isDriverAdmins?d.value.length==0:!1),m=E();async function k(){const h=a.value.formData,s=await m.create(h);d.value.push(s)}return R(async()=>{d.value=await G.onlyAuthUser(),o.value=!0}),(h,s)=>{const r=n("BaseForm"),c=n("v-dialog");return o.value?(_(),f(c,{key:0,modelValue:u.value,"onUpdate:modelValue":s[2]||(s[2]=b=>u.value=b),scrollable:"",width:"600px"},{default:t(()=>[e(r,{loading:i.overlay,submit:k,title:"Transport kiritish"},{default:t(()=>[e(l(O),{onVnodeMounted:s[0]||(s[0]=b=>i.overlay=!0),onOnReady:s[1]||(s[1]=b=>i.overlay=!1),ref_key:"inputComponent",ref:a},null,512)]),_:1},8,["loading"])]),_:1},8,["modelValue"])):x("",!0)}}}),ye=$({__name:"General",setup(C){return(v,a)=>{const i=n("router-view"),d=n("v-container"),o=n("v-main"),u=n("v-app");return _(),f(u,{class:"bg-grey-lighten-4"},{default:t(()=>[e(ge),e(ve),e(o,null,{default:t(()=>[e(se),e(d,{class:"h-100 pb-3"},{default:t(()=>[e(i,{class:"h-100 position-relative mx-n2"})]),_:1})]),_:1}),e(ue)]),_:1})}}});export{ye as default};
