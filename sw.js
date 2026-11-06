const VERSION='social-web-v3-1';
const BASE=new URL('./',self.location.href).pathname;
const CACHE=VERSION+'-'+BASE;
const SHELL=['./','./index.html','./styles.css','./app.js','./config.js','./manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png','./vendor/peerjs.min.js','./vendor/supabase.js','./fonts/cairo-400.ttf','./fonts/cairo-500.ttf','./fonts/cairo-600.ttf','./fonts/cairo-700.ttf','./fonts/cairo-800.ttf'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('social-web-')&&key.endsWith('-'+BASE)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(BASE))return;
 // لا نخزّن طلبات Supabase ولا بيانات حسابات. تُخزّن ملفات الواجهة المعروفة فقط.
 const known=new Set(SHELL.map(path=>new URL(path,self.location.href).pathname));
 if(request.mode!=='navigate'&&!known.has(url.pathname))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{
   const response=await fetch(request);
   if(response.ok){const key=request.mode==='navigate'?new URL('./index.html',self.location.href).href:url.pathname;await cache.put(key,response.clone())}
   return response;
  }catch{
   const fallback=await cache.match(request.mode==='navigate'?new URL('./index.html',self.location.href).href:url.pathname);
   return fallback||new Response('أنت بدون إنترنت. افتح التطبيق مرة واحدة أثناء الاتصال.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});
  }
 })());
});
