if(!self.define){let s,e={};const r=(r,n)=>(r=new URL(r+".js",n).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(n,l)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const u=s=>r(s,i),o={module:{uri:i},exports:t,require:u};e[i]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(l(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/app-9c5fef41.css",revision:null},{url:"assets/app-ffab9f92.js",revision:null},{url:"assets/CarRide-01b13d09.js",revision:null},{url:"assets/CarRides-b60b864e.js",revision:null},{url:"assets/constants-68fdd4d6.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-41019c55.js",revision:null},{url:"assets/Edit.vue_vue_type_script_setup_true_lang-c9449f1f.js",revision:null},{url:"assets/IconRenderer.vue_vue_type_script_setup_true_lang-662e51d3.js",revision:null},{url:"assets/Index-f1d69182.js",revision:null},{url:"assets/Login-e527d0eb.js",revision:null},{url:"assets/Operator-a096262e.js",revision:null},{url:"assets/Passengers-9f4e3a32.js",revision:null},{url:"assets/PhonePage-d79de62d.js",revision:null},{url:"assets/SecretCode-4b2eaac8.js",revision:null},{url:"assets/SendRoads-a7fd8bce.js",revision:null},{url:"assets/Transports-25850cfe.js",revision:null},{url:"assets/Welcome-a20092c9.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
