if(!self.define){let s,e={};const r=(r,l)=>(r=new URL(r+".js",l).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(l,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const u=s=>r(s,i),o={module:{uri:i},exports:t,require:u};e[i]=Promise.all(l.map((s=>o[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-39703224.css",revision:null},{url:"assets/app-8826067a.js",revision:null},{url:"assets/CarRides-1ceee94f.js",revision:null},{url:"assets/CarRidesAuthUser-c62caf4c.js",revision:null},{url:"assets/constants-68fdd4d6.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-136b05f5.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-b2d64d3a.js",revision:null},{url:"assets/index-e2b834ed.js",revision:null},{url:"assets/Index-e5806dc0.js",revision:null},{url:"assets/InstallApp-1c4412d6.js",revision:null},{url:"assets/Login-7ceee82d.js",revision:null},{url:"assets/Operator-6e61dbcb.js",revision:null},{url:"assets/Passengers-cd1e86f4.js",revision:null},{url:"assets/PhonePage-15509b5a.js",revision:null},{url:"assets/SecretCode-b8b83fcb.js",revision:null},{url:"assets/SendRoads-12c342a9.js",revision:null},{url:"assets/Transports-af6ded20.js",revision:null},{url:"assets/useMainStore-a959e310.js",revision:null},{url:"assets/Welcome-71456cf2.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
