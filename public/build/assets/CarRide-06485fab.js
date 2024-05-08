import{H as $,k as l,q as I}from"./app-1c89fd55.js";import{h as N}from"./constants-68fdd4d6.js";const E=$("useCarRide",()=>{const s=l(null),o=l(null),r=l(null),i=l([]),u=l([]),c=l(["car-ride-height","tw-shadow-md","bg-white","rounded-lg","overflow-hidden"]);function f(){axios.get("car-ride").then(({data:e})=>i.value=e)}async function v(e){axios.get(`car-rides/start-region/${e}`).then(({data:a})=>{i.value=a.car_rides,u.value=a.districts})}function g(e){i.value.push(e),s.value!=null&&(s.value.applyTransaction({add:[e],addIndex:0}),s.value.onFilterChanged())}function p(e){const a=i.value.findIndex(t=>t.id==e.id);if(i.value[a]=e,s.value==null)return;s.value.getRowNode(e.id).updateData(e),s.value.onFilterChanged()}function h(e){axios.delete(`car-ride/${e.id}`).then(()=>{i.value=i.value.filter(a=>a.id!=e.id),s.value!=null&&s.value.applyTransaction({remove:[e]})})}async function m(e){await axios.delete(`car-rides/send-road/${e.id}`).then(()=>{i.value=i.value.filter(a=>a.id!=e.id)})}const x=I(()=>{var a;const e={};return(a=u.value)==null||a.forEach(n=>{i.value.forEach(t=>{if(n.id==t.cities[0].district_id){let d=`${t.cities.at(-1).district.region.name} ${t.cities.at(-1).district.name}`;const R=d.split(" ");N(R)&&(d=t.cities.at(-1).district.name),e[n.name]?e[n.name][d]?e[n.name][d].push(t):e[n.name][d]=[t]:(e[n.name]={},e[n.name][d]=[t])}})}),e});function w(e){i.value.find(n=>n.id==e.car_ride_id).passengers.push(e)}function _(e){const a=i.value.find(t=>t.id==e.car_ride_id),n=a.passengers.findIndex(t=>t.id==e.id);a.passengers[n]=e}function y(e){const a=i.value.find(n=>n.id==e.car_ride_id);a.passengers=a.passengers.filter(n=>n.id!=e.id)}function C(){s.value=null,o.value=null,r.value=null,i.value=[],u.value=[],c.value=[]}return{agGrid:s,agColumnApi:o,rides:i,agRowHeight:r,rowClass:c,districts:u,groupRides:x,sendRoad:m,create:g,update:p,destroy:h,index:f,indexCity:v,createPassenger:w,updatePassenger:_,deletedPassenger:y,clear:C}});export{E as u};