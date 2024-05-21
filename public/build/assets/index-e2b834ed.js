import{d as F,p as I,q,v as N,r as u,o as c,c as b,w as l,b as s,e as n,f,x as P,h as g,m as R,a as T,j as w,F as z,y as B,n as $,g as a,t as v,z as U}from"./app-8826067a.js";import{u as j,a as E}from"./Edit.vue_vue_type_script_setup_true_lang-b2d64d3a.js";import{m as O}from"./constants-68fdd4d6.js";import{u as Q}from"./useMainStore-a959e310.js";const ht=F({__name:"Filter",setup(S,{expose:A}){const _=j(),t=I({start_city:null,end_city:null,day:null,strictly_on_time:!1}),y=q(()=>_.rides==null?[]:_.rides.map(e=>{var o;return(o=e.cities[0])==null?void 0:o.district}).filter((e,o,r)=>o===r.findIndex(m=>m.id===e.id))),p=q(()=>{if(_.rides==null)return[];const i=[];return _.rides.forEach(e=>{e.cities.forEach((o,r)=>{r!=0&&i.push(o.district)})}),i.filter((e,o,r)=>o===r.findIndex(m=>m.id===e.id))});function M(i){var x;const e=t.strictly_on_time?i.data.strictly_on_time==!0:!0,o=t.day==null?null:R(t.day).format("YYYY-MM-DD"),r=[null,(x=i.data.cities[0])==null?void 0:x.district_id].includes(t.start_city),C=[null,...i.data.cities.filter((V,Y)=>Y!=0).map(V=>V==null?void 0:V.district_id)].includes(t.end_city),h=[R(i.data.day).format("YYYY-MM-DD"),null].includes(o);return r&&C&&h&&e}const k=q(()=>Object.values(t).every(e=>[null,"",!1].includes(e)));function D(){t.start_city=null,t.end_city=null,t.day=null,t.strictly_on_time=!1}return A({filters:M,resetFilter:D,filtered:k}),N(()=>t,()=>{var i;return(i=_.agGrid)==null?void 0:i.onFilterChanged()},{deep:!0}),(i,e)=>{const o=u("v-btn"),r=u("v-autocomplete"),m=u("v-col"),C=u("VDatePicker"),h=u("v-switch"),x=u("v-row"),V=u("v-card"),Y=u("v-menu");return c(),b(Y,{"close-on-content-click":!1,location:"bottom"},{activator:l(({props:d})=>[s("main",null,[n(o,P({color:"primary",variant:"text"},d,{"prepend-icon":"mdi-filter"}),{default:l(()=>[f(" Filterlar ")]),_:2},1040),k.value==!1?(c(),b(o,{key:0,color:"primary",size:"x-small",variant:"text",onClick:D,icon:"mdi-close"})):g("",!0)])]),default:l(()=>[n(V,{elevation:"2",rounded:"sm",width:270},{default:l(()=>[n(x,{class:"ma-0"},{default:l(()=>[n(m,{cols:"12",class:"py-2"},{default:l(()=>[n(r,{label:"Shahar | A",modelValue:t.start_city,"onUpdate:modelValue":e[0]||(e[0]=d=>t.start_city=d),clearable:"",items:y.value,"item-title":"name","item-value":d=>d.id,variant:"plain"},null,8,["modelValue","items","item-value"])]),_:1}),n(m,{cols:"12",class:"py-2"},{default:l(()=>[n(r,{label:"Shahar | B",modelValue:t.end_city,"onUpdate:modelValue":e[1]||(e[1]=d=>t.end_city=d),clearable:"",items:p.value,"item-title":"name","item-value":d=>d.id,variant:"plain"},null,8,["modelValue","items","item-value"])]),_:1}),n(m,{cols:"12",class:"d-flex align-center flex-column py-0"},{default:l(()=>[n(C,{"trim-weeks":!0,"min-date":new Date,modelValue:t.day,"onUpdate:modelValue":e[2]||(e[2]=d=>t.day=d),mode:"date",transparent:"",borderless:"",expanded:""},null,8,["min-date","modelValue"])]),_:1}),n(m,{cols:"12"},{default:l(()=>[n(h,{modelValue:t.strictly_on_time,"onUpdate:modelValue":e[3]||(e[3]=d=>t.strictly_on_time=d),label:"Qat'iy shu vaqtda",class:"px-2"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})}}}),xt=F({__name:"Sorting",setup(S){const A=j();let _=0;const t=["asc","desc",null],y=()=>{A.agColumnApi.applyColumnState({state:[{colId:"ride_time",sort:t[_],sortIndex:1}]}),_<2?_++:_=0};return(p,M)=>{const k=u("v-btn");return c(),b(k,{onClick:y,variant:"plain",icon:"mdi-sort"})}}}),H={class:"w-100 d-flex flex-column"},L={class:"pa-2 tw-h-16 d-flex flex-column justify-space-between tw-relative"},G=s("div",{class:"tw-absolute tw-h-2/4 tw-border-l-2 border-primary tw-border-dotted tw-top-[15px] tw-left-[13px]"},null,-1),J={key:0,class:"tw-leading-none d-flex align-center"},K={class:"tw-font-bold"},W={class:"tw-text-xs ml-2 tw-text-gray-400"},X={class:"px-2 pb-1 pt-4 d-flex flex-column justify-space-between tw-flex-grow"},Z={class:"flex-grow-1"},tt={class:"d-flex justify-space-between"},et={class:"tw-leading-none"},at={class:"tw-text-xl tw-leading-[3px]"},st={class:"text-grey-darken-1 tw-text-base"},nt={key:0,class:"tw-text-gray-500"},lt=["href"],ot={class:"d-flex flex-column align-end"},it={class:"text-right tw-leading-none"},rt={class:"d-flex justify-space-between align-center"},ct={class:"tw-leading-none"},dt={class:"tw-text-gray-500 tw-translate-y-1"},ut={class:"tw-uppercase tw-text-2xl tw-font-semibold tw-text-gray-600 tw-inline-flex tw-items-center"},_t={class:"d-flex align-end"},mt=F({__name:"CarRideRenderer",props:["params"],setup(S){const A=j(),t=S.params.data,y=Q(),p=T(),M=D=>[0,t.cities.length-1].includes(D)==!0;function k(){y.dialog.open(()=>{y.dialog.title="Qatnovni o'chirmoqchimisiz ?",y.dialog.subTitle="O'chirilgan qatnovlarni qayta tiklashni imkoni yo'q",y.dialog.submit=()=>A.destroy(t)})}return(D,i)=>{var C;const e=u("v-icon"),o=u("v-tooltip"),r=u("v-btn"),m=u("v-chip");return c(),w("section",H,[s("main",L,[n(e,{class:"tw-absolute tw-top-[38px] tw-left-[3.5px]",color:"primary"},{default:l(()=>[f("mdi-chevron-down")]),_:1}),G,(c(!0),w(z,null,B(a(t).cities,(h,x)=>(c(),w(z,null,[M(x)?(c(),w("aside",J,[n(e,{class:$(["mr-2 tw-text-xs",{"tw-opacity-0":x==a(t).cities.length-1}]),color:"primary"},{default:l(()=>[f(" mdi-circle-medium ")]),_:2},1032,["class"]),s("span",K,v(h.district.name),1),s("span",W,v(h.district.region.name.replace("viloyati","V.")),1)])):g("",!0)],64))),256))]),s("main",X,[s("section",Z,[s("div",tt,[s("main",et,[s("div",at,[f(v(a(t).user_car.car.name)+" ",1),s("span",st,v(a(t).user_car.number),1)]),a(p).isPassenger?(c(),w("div",nt,[s("a",{href:`tel:${a(t).phone}`},v(a(t).phone),9,lt)])):g("",!0)]),s("main",ot,[s("div",it,[(c(!0),w(z,null,B(a(t).free_seat,h=>(c(),b(e,{color:"primary"},{default:l(()=>[f(" mdi-account-settings ")]),_:1}))),256))])])])]),s("section",rt,[s("div",ct,[s("p",dt,v(a(R)(a(t).day).format("HH:mm")),1),s("span",ut,[f(v(a(R)(a(t).day).format("D-MMMM"))+" ",1),a(t).strictly_on_time?(c(),b(r,{key:0,icon:"",size:"x-small",variant:"text"},{default:l(()=>[n(e,null,{default:l(()=>[f("mdi-book-clock")]),_:1}),n(o,{activator:"parent","open-on-click":!0,location:"bottom"},{default:l(()=>[f(" Qat'iy shu vaqtda ")]),_:1})]),_:1})):g("",!0)])]),s("div",_t,[a(p).isAnyAdmins||((C=a(p).user)==null?void 0:C.id)==a(t).user_id?(c(),w("div",{key:0,class:$([{"-tw-translate-x-24":a(p).isAnyAdmins},"tw-leading-none"])},[a(p).isAnyAdmins?(c(),b(r,{key:0,tag:"a",href:`tel:+998${a(t).phone}`,size:"x-small",variant:"plain",color:"teal",icon:"mdi-phone"},null,8,["href"])):g("",!0),n(a(E),{date:!0,id:a(t).id},null,8,["id"]),n(r,{size:"x-small",onClick:k,variant:"plain",icon:"mdi-delete"})],2)):g("",!0),a(p).isAnyAdmins?(c(),b(m,{key:1,variant:"tonal",color:"primary",class:"tw-font-semibold tw-absolute -tw-right-9 pr-10"},{default:l(()=>[f(v(a(U)(a(t).price,a(O)))+" so'm ",1)]),_:1})):g("",!0)])])])])}}}),wt=[{cellRenderer:mt,flex:1,valueFormatter:null,cellClass:["px-0","align-stretch"]},{field:"day",hide:!0},{field:"price",hide:!0},{field:"free_seat",hide:!0}];export{ht as _,xt as a,wt as c};
