const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const code=html.slice(html.indexOf('canvases.forEach((c,i)=>{\n let drag='),html.indexOf('function fullLabels()'));
const rect={left:100,top:50,width:600,height:500};
const ctx2d={save(){},restore(){},fillRect(){},setTransform(){},drawImage(){}};
const plane={getBoundingClientRect:()=>rect,append(){}};
const gesture={parentElement:plane,style:{}};
const canvas={parentElement:gesture,width:600,height:500,classList:{remove(){},toggle(){}},getContext:()=>ctx2d,getBoundingClientRect:()=>rect,setPointerCapture(){},addEventListener(){}};
const state={m:[0,0,3.6],j:[0,0,3.6],c:[.2,.3],family:'mandelbrot'};
const sandbox={window:{},canvases:[canvas],state,RATIO:1.2,activeGestures:new Set(),renderers:[{dispose(){}}],lastRender:[''],document:{createElement:()=>({style:{},getContext:()=>ctx2d})},flushHistory(){},draw(){},updateCross(){},change(){},notice(){},zoom(){},point(){throw Error('Pin must not change after pinch')}};
vm.runInNewContext(code,sandbox);
const event=(id,x,y)=>({pointerType:'touch',pointerId:id,clientX:x,clientY:y,preventDefault(){}});
canvas.onpointerdown(event(1,300,300));canvas.onpointerdown(event(2,500,300));
canvas.onpointermove(event(1,200,300));canvas.onpointermove(event(2,600,300));
canvas.onpointerup(event(2,600,300));canvas.onpointerup(event(1,200,300));
assert.equal(state.m[2],1.8);assert.equal(state.m[0],0);assert.equal(state.m[1],0);assert.deepEqual(state.c,[.2,.3]);assert.equal(sandbox.activeGestures.size,0);
// Moving the remaining finger pans the zoomed region, without selecting c.
canvas.onpointerdown(event(1,300,300));canvas.onpointerdown(event(2,500,300));canvas.onpointermove(event(2,700,300));canvas.onpointerup(event(2,700,300));canvas.onpointermove(event(1,360,350));canvas.onpointerup(event(1,360,350));
assert.ok(Math.abs(state.m[0]+.24)<1e-12);assert.ok(Math.abs(state.m[1]-.075)<1e-12);assert.deepEqual(state.c,[.2,.3]);assert.equal(sandbox.activeGestures.size,0);
canvas.onpointerdown(event(1,300,300));canvas.onpointercancel(event(1,300,300));assert.equal(sandbox.activeGestures.size,0);
console.log('PASS: pinch scale, translated anchor, remaining-finger pan, stable Julia parameter, cancellation');
// Native iPad-style Touch Events: two fingers arrive/move/end together.
const listeners={};plane.addEventListener=()=>{};plane.contains=target=>target===canvas;canvas.closest=()=>null;sandbox.document.addEventListener=(type,handler)=>listeners[type]=handler;
sandbox.window={ontouchstart:null};state.m=[0,0,3.6];
vm.runInNewContext(code,sandbox);
const t=(identifier,clientX,clientY)=>({identifier,clientX,clientY,target:canvas});
let prevented=0;const touch=(type,current,changed)=>listeners[type]({touches:current,changedTouches:changed,cancelable:true,preventDefault(){prevented++}});
const initial=[t(1,300,300),t(2,500,300)],spread=[t(1,200,300),t(2,600,300)];
// Duplicate browser pointer events must not start a second gesture.
canvas.onpointerdown(event(1,300,300));assert.equal(sandbox.activeGestures.size,0);
touch('touchstart',initial,initial);touch('touchmove',spread,spread);touch('touchend',[],spread);
assert.equal(state.m[2],1.8);assert.equal(state.m[0],0);assert.deepEqual(state.c,[.2,.3]);assert.equal(sandbox.activeGestures.size,0);assert.equal(prevented,3);
touch('touchstart',initial,initial);touch('touchcancel',[],initial);assert.equal(sandbox.activeGestures.size,0);
console.log('PASS: native touch pinch, simultaneous release, pointer deduplication, default prevention and cancellation');

// Recover a second contact whose touchstart did not reach the viewport.
state.m=[0,0,3.6];
touch('touchstart',[initial[0]],[initial[0]]);
touch('touchmove',initial,[initial[1]]);
touch('touchmove',spread,spread);
touch('touchend',[],spread);
assert.equal(state.m[2],1.8);assert.deepEqual(state.c,[.2,.3]);assert.equal(sandbox.activeGestures.size,0);
console.log('PASS: recover missing second touchstart from full touch list');
