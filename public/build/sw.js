if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const o=e=>n(e,r),u={module:{uri:r},exports:t,require:o};s[r]=Promise.all(i.map((e=>u[e]||o(e)))).then((e=>(l(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/app-8ca2de1d.js",revision:null},{url:"assets/app-a797a6a0.css",revision:null},{url:"assets/General-ac8b0c04.js",revision:null},{url:"assets/InstallAppPage-ffbb3e46.js",revision:null},{url:"assets/Login-c5f95bf0.js",revision:null},{url:"assets/LoginPhonePage-c5f5b2c2.js",revision:null},{url:"assets/LoginSendSmsPage-9f01d1f1.js",revision:null},{url:"assets/WelcomePage-96cd506f.js",revision:null},{url:"registerSW.js",revision:"2d094791c49e920331981a2d203b8cdb"},{url:"manifest.webmanifest",revision:"8fc494cee89ea45baf40c16278952177"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
