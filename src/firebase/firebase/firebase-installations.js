import{registerVersion as e,_getProvider,getApp as t,_registerComponent as n}from"https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";class FirebaseError extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},a=`${this.service}/${e}`,o=this.errors[e],i=o?function replaceTemplate(e,t){return e.replace(r,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(o,n):"Error",s=`${this.serviceName}: ${i} (${a}).`;return new FirebaseError(a,s,n)}}const r=/\{\$([^}]+)}/g;class Component{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}let a,o;const i=new WeakMap,s=new WeakMap,c=new WeakMap,u=new WeakMap,l=new WeakMap;let d={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return s.get(e);if("objectStoreNames"===t)return e.objectStoreNames||c.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wrap(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function wrapFunction(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?function getCursorAdvanceMethods(){return o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}().includes(e)?function(...t){return e.apply(unwrap(this),t),wrap(i.get(this))}:function(...t){return wrap(e.apply(unwrap(this),t))}:function(t,...n){const r=e.call(unwrap(this),t,...n);return c.set(r,t.sort?t.sort():[t]),wrap(r)}}function transformCachableValue(e){return"function"==typeof e?wrapFunction(e):(e instanceof IDBTransaction&&function cacheDonePromiseForTransaction(e){if(s.has(e))return;const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("complete",complete),e.removeEventListener("error",error),e.removeEventListener("abort",error)},complete=()=>{t(),unlisten()},error=()=>{n(e.error||new DOMException("AbortError","AbortError")),unlisten()};e.addEventListener("complete",complete),e.addEventListener("error",error),e.addEventListener("abort",error)}));s.set(e,t)}(e),t=e,function getIdbProxyableTypes(){return a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}().some((e=>t instanceof e))?new Proxy(e,d):e);var t}function wrap(e){if(e instanceof IDBRequest)return function promisifyRequest(e){const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("success",success),e.removeEventListener("error",error)},success=()=>{t(wrap(e.result)),unlisten()},error=()=>{n(e.error),unlisten()};e.addEventListener("success",success),e.addEventListener("error",error)}));return t.then((t=>{t instanceof IDBCursor&&i.set(t,e)})).catch((()=>{})),l.set(t,e),t}(e);if(u.has(e))return u.get(e);const t=transformCachableValue(e);return t!==e&&(u.set(e,t),l.set(t,e)),t}const unwrap=e=>l.get(e);const p=["get","getKey","getAll","getAllKeys","count"],f=["put","add","delete","clear"],g=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(g.get(t))return g.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,a=f.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!a&&!p.includes(n))return;const method=async function(e,...t){const o=this.transaction(e,a?"readwrite":"readonly");let i=o.store;return r&&(i=i.index(t.shift())),(await Promise.all([i[n](...t),a&&o.done]))[0]};return g.set(t,method),method}!function replaceTraps(e){d=e(d)}((e=>({...e,get:(t,n,r)=>getMethod(t,n)||e.get(t,n,r),has:(t,n)=>!!getMethod(t,n)||e.has(t,n)})));const h="@firebase/installations",w=new ErrorFactory("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function isServerError(e){return e instanceof FirebaseError&&e.code.includes("request-failed")}function getInstallationsEndpoint({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function extractAuthTokenInfoFromResponse(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function getErrorFromResponse(e,t){const n=(await t.json()).error;return w.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function getHeaders({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function getHeadersWithAuth(e,{refreshToken:t}){const n=getHeaders(e);return n.append("Authorization",function getAuthorizationHeader(e){return`FIS_v2 ${e}`}(t)),n}async function retryIfServerError(e){const t=await e();return t.status>=500&&t.status<600?e():t}function sleep(e){return new Promise((t=>{setTimeout(t,e)}))}const m=/^[cdef][\w-]{21}$/;function generateFid(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function encode(e){return function bufferToBase64UrlSafe(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}(e).substr(0,22)}(e);return m.test(t)?t:""}catch(e){return""}}function getKey(e){return`${e.appName}!${e.appId}`}const I=new Map;function fidChanged(e,t){const n=getKey(e);callFidChangeCallbacks(n,t),function broadcastFidChange(e,t){const n=getBroadcastChannel();n&&n.postMessage({key:e,fid:t});closeBroadcastChannel()}(n,t)}function callFidChangeCallbacks(e,t){const n=I.get(e);if(n)for(const e of n)e(t)}let y=null;function getBroadcastChannel(){return!y&&"BroadcastChannel"in self&&(y=new BroadcastChannel("[Firebase] FID Change"),y.onmessage=e=>{callFidChangeCallbacks(e.data.key,e.data.fid)}),y}function closeBroadcastChannel(){0===I.size&&y&&(y.close(),y=null)}const v="firebase-installations-store";let b=null;function getDbPromise(){return b||(b=function openDB(e,t,{blocked:n,upgrade:r,blocking:a,terminated:o}={}){const i=indexedDB.open(e,t),s=wrap(i);return r&&i.addEventListener("upgradeneeded",(e=>{r(wrap(i.result),e.oldVersion,e.newVersion,wrap(i.transaction),e)})),n&&i.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),s.then((e=>{o&&e.addEventListener("close",(()=>o())),a&&e.addEventListener("versionchange",(e=>a(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(v)}})),b}async function set(e,t){const n=getKey(e),r=(await getDbPromise()).transaction(v,"readwrite"),a=r.objectStore(v),o=await a.get(n);return await a.put(t,n),await r.done,o&&o.fid===t.fid||fidChanged(e,t.fid),t}async function remove(e){const t=getKey(e),n=(await getDbPromise()).transaction(v,"readwrite");await n.objectStore(v).delete(t),await n.done}async function update(e,t){const n=getKey(e),r=(await getDbPromise()).transaction(v,"readwrite"),a=r.objectStore(v),o=await a.get(n),i=t(o);return void 0===i?await a.delete(n):await a.put(i,n),await r.done,!i||o&&o.fid===i.fid||fidChanged(e,i.fid),i}async function getInstallationEntry(e){let t;const n=await update(e.appConfig,(n=>{const r=function updateOrCreateInstallationEntry(e){return clearTimedOutRequest(e||{fid:generateFid(),registrationStatus:0})}(n),a=function triggerRegistrationIfNecessary(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(w.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function registerInstallation(e,t){try{const n=await async function createInstallationRequest({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=getInstallationsEndpoint(e),a=getHeaders(e),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}const i={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.6.4"},s={method:"POST",headers:a,body:JSON.stringify(i)},c=await retryIfServerError((()=>fetch(r,s)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:extractAuthTokenInfoFromResponse(e.authToken)}}throw await getErrorFromResponse("Create Installation",c)}(e,t);return set(e.appConfig,n)}catch(n){throw isServerError(n)&&409===n.customData.serverCode?await remove(e.appConfig):await set(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:waitUntilFidRegistration(e)}:{installationEntry:t}}(e,r);return t=a.registrationPromise,a.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function waitUntilFidRegistration(e){let t=await updateInstallationRequest(e.appConfig);for(;1===t.registrationStatus;)await sleep(100),t=await updateInstallationRequest(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await getInstallationEntry(e);return n||t}return t}function updateInstallationRequest(e){return update(e,(e=>{if(!e)throw w.create("installation-not-found");return clearTimedOutRequest(e)}))}function clearTimedOutRequest(e){return function hasInstallationRequestTimedOut(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()}(e)?{fid:e.fid,registrationStatus:0}:e}async function generateAuthTokenRequest({appConfig:e,heartbeatServiceProvider:t},n){const r=function getGenerateAuthTokenEndpoint(e,{fid:t}){return`${getInstallationsEndpoint(e)}/${t}/authTokens:generate`}(e,n),a=getHeadersWithAuth(e,n),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}const i={installation:{sdkVersion:"w:0.6.4",appId:e.appId}},s={method:"POST",headers:a,body:JSON.stringify(i)},c=await retryIfServerError((()=>fetch(r,s)));if(c.ok){return extractAuthTokenInfoFromResponse(await c.json())}throw await getErrorFromResponse("Generate Auth Token",c)}async function refreshAuthToken(e,t=!1){let n;const r=await update(e.appConfig,(r=>{if(!isEntryRegistered(r))throw w.create("not-registered");const a=r.authToken;if(!t&&function isAuthTokenValid(e){return 2===e.requestStatus&&!function isAuthTokenExpired(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(a))return r;if(1===a.requestStatus)return n=async function waitUntilAuthTokenRequest(e,t){let n=await updateAuthTokenRequest(e.appConfig);for(;1===n.authToken.requestStatus;)await sleep(100),n=await updateAuthTokenRequest(e.appConfig);const r=n.authToken;return 0===r.requestStatus?refreshAuthToken(e,t):r}(e,t),r;{if(!navigator.onLine)throw w.create("app-offline");const t=function makeAuthTokenRequestInProgressEntry(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function fetchAuthTokenFromServer(e,t){try{const n=await generateAuthTokenRequest(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await set(e.appConfig,r),n}catch(n){if(!isServerError(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await set(e.appConfig,n)}else await remove(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function updateAuthTokenRequest(e){return update(e,(e=>{if(!isEntryRegistered(e))throw w.create("not-registered");return function hasAuthTokenRequestTimedOut(e){return 1===e.requestStatus&&e.requestTime+1e4<Date.now()}(e.authToken)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e}))}function isEntryRegistered(e){return void 0!==e&&2===e.registrationStatus}async function getId(e){const t=e,{installationEntry:n,registrationPromise:r}=await getInstallationEntry(t);return r?r.catch(console.error):refreshAuthToken(t).catch(console.error),n.fid}async function getToken(e,t=!1){const n=e;await async function completeInstallationRegistration(e){const{registrationPromise:t}=await getInstallationEntry(e);t&&await t}(n);return(await refreshAuthToken(n,t)).token}async function deleteInstallationRequest(e,t){const n=function getDeleteEndpoint(e,{fid:t}){return`${getInstallationsEndpoint(e)}/${t}`}(e,t),r={method:"DELETE",headers:getHeadersWithAuth(e,t)},a=await retryIfServerError((()=>fetch(n,r)));if(!a.ok)throw await getErrorFromResponse("Delete Installation",a)}async function deleteInstallations(e){const{appConfig:t}=e,n=await update(t,(e=>{if(!e||0!==e.registrationStatus)return e}));if(n){if(1===n.registrationStatus)throw w.create("delete-pending-registration");if(2===n.registrationStatus){if(!navigator.onLine)throw w.create("app-offline");await deleteInstallationRequest(t,n),await remove(t)}}}function onIdChange(e,t){const{appConfig:n}=e;return function addCallback(e,t){getBroadcastChannel();const n=getKey(e);let r=I.get(n);r||(r=new Set,I.set(n,r)),r.add(t)}(n,t),()=>{!function removeCallback(e,t){const n=getKey(e),r=I.get(n);r&&(r.delete(t),0===r.size&&I.delete(n),closeBroadcastChannel())}(n,t)}}function getInstallations(e=t()){return _getProvider(e,"installations").getImmediate()}function getMissingValueError(e){return w.create("missing-app-config-values",{valueName:e})}const publicFactory=e=>{const t=e.getProvider("app").getImmediate(),n=function extractAppConfig(e){if(!e||!e.options)throw getMissingValueError("App Configuration");if(!e.name)throw getMissingValueError("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw getMissingValueError(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:_getProvider(t,"heartbeat"),_delete:()=>Promise.resolve()}},internalFactory=e=>{const t=e.getProvider("app").getImmediate(),n=_getProvider(t,"installations").getImmediate();return{getId:()=>getId(n),getToken:e=>getToken(n,e)}};!function registerInstallations(){n(new Component("installations",publicFactory,"PUBLIC")),n(new Component("installations-internal",internalFactory,"PRIVATE"))}(),e(h,"0.6.4"),e(h,"0.6.4","esm2017");export{deleteInstallations,getId,getInstallations,getToken,onIdChange};

//# sourceMappingURL=firebase-installations.js.map
