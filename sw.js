if(!self.define){let e,i={};const l=(l,n)=>(l=new URL(l+".js",n).href,i[l]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=l,e.onload=i,document.head.appendChild(e)}else e=l,importScripts(l),i()})).then((()=>{let e=i[l];if(!e)throw new Error(`Module ${l} didn’t register its module`);return e})));self.define=(n,s)=>{const u=e||("document"in self?document.currentScript.src:"")||location.href;if(i[u])return;let r={};const a=e=>l(e,u),t={module:{uri:u},exports:r,require:a};i[u]=Promise.all(n.map((e=>t[e]||a(e)))).then((e=>(s(...e),r)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_app/immutable/assets/_layout.26f87547.css",revision:null},{url:"_app/immutable/chunks/_layout.da46b06b.js",revision:null},{url:"_app/immutable/chunks/0.49328714.js",revision:null},{url:"_app/immutable/chunks/1.7d3643ca.js",revision:null},{url:"_app/immutable/chunks/2.0d3ef773.js",revision:null},{url:"_app/immutable/chunks/3.a4262ef2.js",revision:null},{url:"_app/immutable/chunks/4.309f282f.js",revision:null},{url:"_app/immutable/chunks/index.25ef2629.js",revision:null},{url:"_app/immutable/chunks/paths.25ab82a2.js",revision:null},{url:"_app/immutable/chunks/singletons.7d9f73a0.js",revision:null},{url:"_app/immutable/entry/_layout.svelte.80fa5fb4.js",revision:null},{url:"_app/immutable/entry/_layout.ts.984db11e.js",revision:null},{url:"_app/immutable/entry/_page.svelte.7885fe4d.js",revision:null},{url:"_app/immutable/entry/about-page.svelte.bfc51456.js",revision:null},{url:"_app/immutable/entry/app.b622bec7.js",revision:null},{url:"_app/immutable/entry/create-page.svelte.1c5a8a98.js",revision:null},{url:"_app/immutable/entry/error.svelte.3ea9a221.js",revision:null},{url:"_app/immutable/entry/start.4efe59f6.js",revision:null},{url:"favicon.svg",revision:"f4bf5cdd8194fc4c0de15d6d6801c5a1"},{url:"icons/apple-icon-180.png",revision:"eedd1d59fa59ff31129bddf39778d3f2"},{url:"icons/manifest-icon-192.maskable.png",revision:"c947a3553752366776a0b2f065862491"},{url:"icons/manifest-icon-512.maskable.png",revision:"bdc3247713a1d9649239ddae7cc5a1ad"},{url:"registerSW.js",revision:"2afe4fdfded5fba85218df1ebbd1a517"},{url:"about",revision:"b0ad9354db274db8d4698aa7213af4ff"},{url:"create",revision:"79329be87ef355d6bd454030ebee5271"},{url:"/midimc/",revision:"cb5c0f9fb83632397c5175e7401c0080"},{url:"manifest.webmanifest",revision:"9e6d2c2f62cadedb9c90efe54131f575"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/midimc/")))}));
