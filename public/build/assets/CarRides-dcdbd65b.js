import{_ as m,a as f,c as _}from"./index-66d95a6b.js";import{d as p,b as C,k as g,s as h,r as i,j as w,e as x,h as e,c as A,i as R,f as a,w as D,o as l}from"./app-52eb76ff.js";import{u as k,_ as y}from"./Edit.vue_vue_type_script_setup_true_lang-b5abcdd6.js";import"./constants-68fdd4d6.js";const v={class:"d-flex flex-column"},G={class:"d-flex align-center justify-space-between w-100"},P=p({__name:"CarRides",setup(V){const n=C(),r=g(),s=k();s.index();function c(t){s.agGrid=t.api,s.agColumnApi=t.columnApi}return h(()=>{s.agGrid=null,s.agColumnApi=null}),(t,B)=>{const u=i("AgGridVue"),d=i("v-spacer");return l(),w("main",v,[x("main",G,[e(n).isAnyAdmins||e(n).isDriver?(l(),A(e(y),{key:0,date:!0})):R("",!0),a(e(m),{ref_key:"filterComponent",ref:r},null,512),a(e(f))]),a(d,null,{default:D(()=>[a(u,{class:"ag-theme-ruzzifer ag-theme-alpine h-100",animateRows:!0,defaultColDef:{sortable:!0},rowHeight:170,rowClass:e(s).rowClass,headerHeight:0,columnDefs:e(_),rowData:e(s).rides,onGridReady:c,getRowId:({data:o})=>o.id,doesExternalFilterPass:o=>r.value.filters(o),isExternalFilterPresent:()=>!0},null,8,["rowClass","columnDefs","rowData","getRowId","doesExternalFilterPass"])]),_:1})])}}});export{P as default};