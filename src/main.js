// 应用入口：场景、拾取、显示模式、标注、控制台、导览
import * as THREE from 'three';
import { createStage } from './scene/stage.js';
import { buildMaterials, M, U, skinMats, MATERIAL_CLASSES, materialClassMat } from './core/materials.js';
import { buildAircraft, FLAP_DETENTS } from './aircraft/index.js';
import { Registry } from './aircraft/registry.js';
import { PARTS, GROUPS } from './data/parts.js';
import { TOUR } from './data/tour.js';
import {
  initLocale, setLocale, isEn, onLocaleChange, t,
  partName, partAltName, groupName, specRows, classLabel, shareRows,
} from './i18n/index.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 语言必须在任何 UI 模板执行前初始化（默认中文，可被 ?lang=en 覆盖）。
initLocale();

const MODES = [
  { id: 'ext', key: '1' },
  { id: 'xray', key: '2' },
  { id: 'cut', key: '3' },
  { id: 'explode', key: '4' },
  { id: 'material', key: '5' },
];
const LAYERS = ['skin', 'struct', 'cabin', 'sys', 'gear'];


const S = {
  mode: 'ext', layers: { skin: true, struct: true, cabin: true, sys: true, gear: true },
  cutAxis: 'z', cutK: 0, explodeK: 1, labels: true, dims: false,
  selected: null, hovered: null, isolate: false, tour: -1, flight: false, tab: 'fly', windowDim: 0.8,
};

// ------------------------------------------------------------------ 场景
const stage = createStage($('#stage'));
buildMaterials();
const aircraft = buildAircraft();
stage.scene.add(aircraft.root);
const { camera, controls } = stage;
stage.outlineSel.hiddenEdgeColor.copy(stage.outlineSel.visibleEdgeColor);
stage.outlineHover.hiddenEdgeColor.copy(stage.outlineHover.visibleEdgeColor);
stage.renderer.localClippingEnabled = true;

const meshes = [];
aircraft.root.updateMatrixWorld(true);
aircraft.root.traverse(o => {
  if (!o.isMesh) return;
  const p = Registry.partOf(o);
  o.userData.pid = p ? p.id : null;
  meshes.push(o);
});

// ------------------------------------------------------------------ 相机
let fly = null;
function flyTo(c, dur = 1.25) {
  fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: new THREE.Vector3(c[0], c[1], c[2]), t1: new THREE.Vector3(c[3], c[4], c[5]), t: 0, dur };
}
function setCam(px, py, pz, tx, ty, tz) { fly = null; camera.position.set(px, py, pz); controls.target.set(tx, ty, tz); controls.update(); }
controls.addEventListener('start', () => { fly = null; });

// 面板会遮住画面两侧：把投影中心移到未被遮挡区域的中央，并按可用宽高比决定机位远近
const pad = { l: 0, r: 0 };
const freeAspect = () => Math.max(0.35, (innerWidth - pad.l - pad.r) / innerHeight);
function layoutView() {
  const W = innerWidth, H = innerHeight, touring = document.body.classList.contains('touring');
  pad.l = W >= 1180 && !touring ? 264 : 0;
  pad.r = W > 820 && !(touring && !S.selected) ? 340 : 0;
  camera.setViewOffset(W, H, (pad.r - pad.l) / 2, touring ? 85 : W > 820 ? 14 : 40, W, H);
}
function homeCam() {
  const d = clamp(67 / (2 * Math.tan(camera.fov * Math.PI / 360) * freeAspect()), 72, 190);
  const dir = new THREE.Vector3(-57, 15.5, 52).normalize();
  return [-1 + dir.x * d, 5 + dir.y * d, dir.z * d, -1, 5, 0];
}
/** 导览机位按 16:9 全幅画面编排，可用区域更窄时等比拉远 */
function fitCam(c) {
  const k = clamp(1.62 / freeAspect(), 1, 2.4);
  return [c[3] + (c[0] - c[3]) * k, c[4] + (c[1] - c[4]) * k, c[5] + (c[2] - c[5]) * k, c[3], c[4], c[5]];
}
addEventListener('resize', layoutView);

function partBox(id) {
  const objs = aircraft.reg.objectsOf(id);
  const pick = objs.filter(o => o.userData.side !== 'R');
  const box = new THREE.Box3();
  for (const o of (pick.length ? pick : objs)) box.expandByObject(o);
  return box;
}
function focusPart(id) {
  const box = partBox(id);
  if (box.isEmpty()) return;
  const sp = box.getBoundingSphere(new THREE.Sphere());
  const fov = camera.fov * Math.PI / 180, asp = Math.min(1, freeAspect());
  const dist = clamp(sp.radius / Math.sin(fov / 2) / asp * 1.3, 9, 130);
  const dir = camera.position.clone().sub(controls.target).normalize();
  if (sp.center.z > 0.6) dir.z = Math.abs(dir.z) + 0.25; else if (sp.center.z < -0.6) dir.z = -Math.abs(dir.z) - 0.25;
  dir.y = clamp(dir.y, 0.2, 0.75);
  if (PARTS[id].g === 'gear' || (sp.center.y < 2.6 && PARTS[id].hot === 1)) dir.y = 0.08;   // 起落架、机腹外部件：压低机位平视
  dir.normalize();
  const p = sp.center.clone().addScaledVector(dir, dist);
  if (!S.flight && S.mode !== 'explode') p.y = Math.max(p.y, 0.7);
  flyTo([p.x, p.y, p.z, sp.center.x, sp.center.y, sp.center.z]);
}

// ------------------------------------------------------------------ 可见性 / 显示模式
function refreshVis() {
  const iso = S.isolate && S.selected;
  for (const m of meshes) {
    const L = m.userData.layer || 'skin';
    let v = L === 'core' ? true : S.layers[L] !== false;
    if (S.mode === 'material' && (L === 'cabin' || L === 'sys')) v = false;
    if (iso) v = m.userData.pid === S.selected;
    m.visible = v;
  }
}
const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
const cutMats = () => [...skinMats, M.frame, M.stringer, M.bin];
const CUT = { z: { min: -3.4, max: 31, def: 0 }, y: { min: 1.2, max: 8.2, def: 5.75 } };
function applyCut() {
  if (S.cutAxis === 'z') clipPlane.normal.set(0, 0, -1); else clipPlane.normal.set(0, -1, 0);
  clipPlane.constant = S.cutK;
}
let xrayT = 0;
function setMode(mode) {
  if (S.mode === 'material') for (const m of meshes) if (m.userData.mat0) { m.material = m.userData.mat0; m.userData.mat0 = null; }
  for (const m of cutMats()) {
    const b = m.userData.base;
    m.clippingPlanes = null; m.clipShadows = false; m.side = b.side; m.transparent = b.transparent; m.depthWrite = b.depthWrite; m.needsUpdate = true;
  }
  U.xray.value = 0; xrayT = 0; aircraft.tgt.explode = 0;
  S.mode = mode;
  if (mode === 'xray') { for (const m of skinMats) { m.transparent = true; m.depthWrite = false; m.needsUpdate = true; } xrayT = 1; }
  if (mode === 'cut') { applyCut(); for (const m of cutMats()) { m.clippingPlanes = [clipPlane]; m.clipShadows = true; m.side = THREE.DoubleSide; m.needsUpdate = true; } }
  if (mode === 'explode') aircraft.tgt.explode = S.explodeK;
  if (mode === 'material') for (const m of meshes) {
    const L = m.userData.layer || 'skin';
    if (L === 'cabin' || L === 'sys') continue;
    m.userData.mat0 = m.material; m.material = materialClassMat(m.userData.mc || 'other');
  }
  // 透视/剖视下被蒙皮挡住的内部件也要描边；其余模式里被遮挡的部分（如另一侧的对称件）只留很淡的轮廓
  const through = mode === 'xray' || mode === 'cut' ? 1 : 0.12;
  stage.outlineSel.hiddenEdgeColor.copy(stage.outlineSel.visibleEdgeColor).multiplyScalar(through);
  stage.outlineHover.hiddenEdgeColor.copy(stage.outlineHover.visibleEdgeColor).multiplyScalar(through);
  refreshVis(); renderModeBar();
  if (mode === 'explode' && S.tour < 0) goHome();
  $$('#modes button').forEach(b => b.classList.toggle('on', b.dataset.mode === mode));
}
function setFlight(on) {
  S.flight = on;
  stage.floor.visible = !on; stage.apron.visible = !on;
  dimsG.visible = S.dims && !on;
}
function setWindowDim(k) {
  S.windowDim = k;
  M.cabinWindow.color.set(0x56697e).lerp(new THREE.Color(0x05090f), k);
}

// ------------------------------------------------------------------ 尺寸标注
const dimsG = new THREE.Group(); dimsG.visible = false; stage.scene.add(dimsG);
const dimLabels = [];
{
  const pts = [];
  const seg = (a, b) => pts.push(...a, ...b);
  const dim = (a, b, key, ext) => {
    seg(a, b);
    const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
    const n = Math.abs(d.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(-d.z, 0, d.x);
    for (const p of [a, b]) {                       // 端部短线
      seg([p[0] - n.x * 0.7, p[1], p[2] - n.z * 0.7], [p[0] + n.x * 0.7, p[1], p[2] + n.z * 0.7]);
      if (ext) seg(p, [p[0] + ext[0], p[1] + ext[1], p[2] + ext[2]]);
    }
    dimLabels.push({ pos: new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), key });
  };
  const y = 0.04;
  dim([-30.5, y, -34], [32.31, y, -34], 'dim.length', [0, 0, 30]);
  dim([-35.5, y, -30.06], [-35.5, y, 30.06], 'dim.span', [22, 0, 0]);
  dim([35.5, 0, 0], [35.5, 17.02, 0], 'dim.height', [-6, 0, 0]);
  dim([0.74, y, -4.9], [0.74, y, 4.9], 'dim.track');
  dim([-25.09, y, 8], [0.74, y, 8], 'dim.wheelbase', [0, 0, -5]);
  dim([-9.7, y, 9.91], [-9.7, y, 0], 'dim.engine');
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const ln = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xffc46b, transparent: true, opacity: 0.9, fog: false }));
  ln.userData.noPick = true; dimsG.add(ln);
}

// ------------------------------------------------------------------ 界面骨架
const ICON = {
  tour: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>',
  tag: '<svg viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8zM7.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>',
  ruler: '<svg viewBox="0 0 24 24"><path d="M2 8h20v8H2zM6 8v4M10 8v3M14 8v4M18 8v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>',
  help: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.2 15.6h-1.7v-1.7h1.7zm1.9-6.4c-.9.7-1.6 1.2-1.6 2.6h-1.7c0-2 .9-2.8 1.8-3.5.7-.5 1.2-.9 1.2-1.7 0-.9-.7-1.5-1.7-1.5-1.1 0-1.8.7-1.9 1.8H8.5c.1-2 1.5-3.3 3.6-3.3 2 0 3.4 1.2 3.4 3 0 1.4-.7 2-1.4 2.6z"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></svg>',
};
$('#ui').innerHTML = `
<header id="top">
  <button class="tool only-narrow" id="btn-list" title="${t('partListTitle')}">${ICON.list}</button>
  <div class="brand"><b>${t('brand')}</b><span>${t('brandSub')}</span></div>
  <nav id="modes">${MODES.map(m => `<button data-mode="${m.id}" title="${t(`modeHint.${m.id}`)} · ${m.key}">${t(`mode.${m.id}`)}</button>`).join('')}</nav>
  <div id="tools">
    <button class="tool cta" id="btn-tour" title="${t('tourTitle')}">${ICON.tour}<span>${t('tour')}</span></button>
    <button class="tool" id="btn-labels" title="${t('labelsTitle')}">${ICON.tag}</button>
    <button class="tool" id="btn-dims" title="${t('dimsTitle')}">${ICON.ruler}</button>
    <button class="tool" id="btn-theme" title="${t('themeTitle')}">${ICON.sun}</button>
    <button class="tool" id="btn-home" title="${t('homeTitle')}">${ICON.home}</button>
    <button class="tool" id="btn-lang" title="${t('langTitle')}">${t('langLabel')}</button>
    <button class="tool" id="btn-help" title="${t('helpTitle')}">${ICON.help}</button>
  </div>
</header>
<div id="modebar"></div>
<aside id="left" class="panel">
  <div class="search"><input id="q" type="search" placeholder="${t('searchPlaceholder')}" autocomplete="off"></div>
  <div id="tree"></div>
</aside>
<aside id="right" class="panel"><div id="info"></div></aside>
<section id="console" class="panel">
  <div class="tabs">
    <button data-tab="fly">${t('tab.fly')}</button><button data-tab="anim">${t('tab.anim')}</button><button data-tab="view">${t('tab.view')}</button>
    <span class="grow"></span><button id="btn-min" title="${t('panelMinTitle')}">▾</button>
  </div>
  <div id="pane"></div>
</section>
<div id="tourcard" class="panel" hidden></div>
<div id="tip" hidden></div>
<div id="toast" hidden></div>
<div id="help" hidden></div>`;

// ------------------------------------------------------------------ 部件树
const partIds = Object.keys(PARTS).filter(id => aircraft.reg.parts.has(id));
function renderTree(q = '') {
  q = q.trim().toLowerCase();
  let html = '';
  for (const g of GROUPS) {
    const items = partIds.filter(id => PARTS[id].g === g.id && (!q || PARTS[id].n.toLowerCase().includes(q) || PARTS[id].e.toLowerCase().includes(q)));
    if (!items.length) continue;
    html += `<details ${q || g.id === 'fuselage' ? 'open' : ''}><summary><i style="background:${g.color}"></i>${groupName(g)}<em>${items.length}</em></summary>` +
      items.map(id => `<button class="item${S.selected === id ? ' on' : ''}" data-id="${id}"><span>${esc(partName(PARTS[id]))}</span><small>${esc(partAltName(PARTS[id]))}</small></button>`).join('') + '</details>';
  }
  $('#tree').innerHTML = html || `<p class="empty">${t('treeEmpty')}</p>`;
}
$('#tree').addEventListener('click', e => { const b = e.target.closest('.item'); if (b) select(b.dataset.id, { focus: true, auto: true }); });
$('#q').addEventListener('input', e => renderTree(e.target.value));

// ------------------------------------------------------------------ 信息卡
function renderInfo() {
  const id = S.selected, box = $('#info');
  if (!id) {
    box.innerHTML = `
      <div class="kicker">${t('infoKicker')}</div>
      <h2>${t('aircraftName')}</h2><div class="en">${t('aircraftAlt')}</div>
      <p>${t('infoIntro')}</p>
      <dl class="facts two">${specRows().map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <button class="primary" id="go-tour">${ICON.tour} ${t('startTour', { n: TOUR.length })}</button>
      <ul class="hints"><li>${t('hintClick')}</li><li>${t('hintDrag')}</li><li>${t('hintModes')}</li><li>${t('hintConsole')}</li></ul>`;
    $('#go-tour').onclick = () => tourGo(0);
    return;
  }
  const p = PARTS[id], g = GROUPS.find(x => x.id === p.g);
  const n = aircraft.reg.objectsOf(id).length;
  box.innerHTML = `
    <div class="kicker"><i style="background:${g.color}"></i>${groupName(g)}<button class="x" id="info-x" title="${t('deselectTitle')}">×</button></div>
    <h2>${esc(partName(p))}</h2><div class="en">${esc(partAltName(p))}</div>
    <p>${esc(p.d)}</p>
    ${p.f ? `<dl class="facts">${p.f.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
    ${p.t ? `<div class="tipbox"><b>${t('didYouKnow')}</b>${esc(p.t)}</div>` : ''}
    <div class="acts"><button id="act-focus">${t('focus')}</button><button id="act-iso" class="${S.isolate ? 'on' : ''}">${S.isolate ? t('showAll') : t('isolate')}</button>${p.v && S.mode === 'ext' ? `<button id="act-xray">${t('xrayView')}</button>` : ''}</div>
    <div class="foot">${t('instances', { n })}</div>`;
  $('#info-x').onclick = () => select(null);
  $('#act-focus').onclick = () => focusPart(id);
  $('#act-iso').onclick = () => { S.isolate = !S.isolate; refreshVis(); renderInfo(); if (S.isolate) focusPart(id); };
  const ax = $('#act-xray'); if (ax) ax.onclick = () => { setMode('xray'); renderInfo(); };
}

const DENSE = { frame: M.frame, stringer: M.stringer };
let hlMat = null;
function select(id, o = {}) {
  if (id && !PARTS[id]) id = null;
  S.selected = id;
  if (!id) S.isolate = false;
  // 隔框、长桁这类上百根的密集构件，描边会糊成一片：改为整体提亮材质
  const dense = id ? DENSE[id] : null;
  if (hlMat) { hlMat.emissive.setHex(hlMat.userData.em0); hlMat = null; }
  if (dense) { hlMat = dense; hlMat.userData.em0 = hlMat.emissive.getHex(); hlMat.emissive.setHex(0x1b6a9c); }
  stage.outlineSel.selectedObjects = id && !dense ? aircraft.reg.objectsOf(id) : [];
  if (id && o.auto) {
    const first = aircraft.reg.objectsOf(id)[0]; let L = null;
    first.traverse(c => { if (!L && c.userData.layer) L = c.userData.layer; });
    if (L && L !== 'core' && S.layers[L] === false) { S.layers[L] = true; renderPane(); }
    if (S.mode === 'ext' && (PARTS[id].v || (L && L !== 'skin' && L !== 'gear'))) setMode('xray');
  }
  refreshVis(); renderInfo();
  $$('#tree .item').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  if (id) { const b = $(`#tree .item[data-id="${id}"]`); if (b) { b.closest('details').open = true; b.scrollIntoView({ block: 'nearest' }); } }
  if (id && o.focus) focusPart(id);
  document.body.classList.toggle('has-sel', !!id);
}

// ------------------------------------------------------------------ 模式附加控件
function renderModeBar() {
  const bar = $('#modebar'), m = MODES.find(x => x.id === S.mode);
  let h = `<span class="hint">${t(`modeHint.${m.id}`)}</span>`;
  if (S.mode === 'cut') {
    const c = CUT[S.cutAxis];
    h = `<div class="seg">${Object.keys(CUT).map(a => `<button data-axis="${a}" class="${a === S.cutAxis ? 'on' : ''}">${t(`cutAxis.${a}`)}</button>`).join('')}</div>
      <label class="sl wide"><span>${t('cutPos')}</span><input id="cutk" type="range" min="${c.min}" max="${c.max}" step="0.05" value="${S.cutK}"><output>${(+S.cutK).toFixed(1)} m</output></label>`;
  } else if (S.mode === 'explode') {
    h = `<label class="sl wide"><span>${t('explodeAmount')}</span><input id="expk" type="range" min="0" max="1" step="0.01" value="${S.explodeK}"><output>${Math.round(S.explodeK * 100)}%</output></label>`;
  } else if (S.mode === 'material') {
    h = `<div class="legend">${Object.entries(MATERIAL_CLASSES).map(([key, c]) => `<span><i style="background:#${c.color.toString(16).padStart(6, '0')}"></i>${classLabel(key)}</span>`).join('')}</div>
      <div class="share">${shareRows().map(([key, pc, tip]) => `<i title="${esc(tip)}" style="flex:${pc};background:#${MATERIAL_CLASSES[key].color.toString(16).padStart(6, '0')}">${pc}%</i>`).join('')}</div><span class="hint">${t('materialWeight')}</span>`;
  }
  bar.innerHTML = h;
  bar.dataset.mode = S.mode;
}
$('#modebar').addEventListener('input', e => {
  if (e.target.id === 'cutk') { S.cutK = +e.target.value; applyCut(); e.target.nextElementSibling.textContent = S.cutK.toFixed(1) + ' m'; }
  if (e.target.id === 'expk') { S.explodeK = +e.target.value; aircraft.tgt.explode = S.explodeK; e.target.nextElementSibling.textContent = Math.round(S.explodeK * 100) + '%'; }
});
$('#modebar').addEventListener('click', e => {
  const b = e.target.closest('[data-axis]'); if (!b) return;
  S.cutAxis = b.dataset.axis; S.cutK = CUT[S.cutAxis].def; applyCut(); renderModeBar();
});
$('#modes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { setMode(b.dataset.mode); renderInfo(); } });

// ------------------------------------------------------------------ 控制台
const T = aircraft.tgt;
const flapName = (i) => i === 0 ? t('fmt.up') : String(FLAP_DETENTS[i]);
const SL = {
  flaps: { key: 'sl.flaps', min: 0, max: FLAP_DETENTS.length - 1, step: 1, get: () => FLAP_DETENTS.indexOf(T.flaps), set: v => { T.flaps = FLAP_DETENTS[v]; }, fmt: v => flapName(v) },
  speedbrake: { key: 'sl.speedbrake', min: 0, max: 1, step: 0.01, get: () => T.speedbrake, set: v => { T.speedbrake = v; }, fmt: v => Math.round(v * 100) + '%' },
  roll: { key: 'sl.roll', min: -1, max: 1, step: 0.01, get: () => T.roll, set: v => { T.roll = v; }, fmt: v => v === 0 ? t('fmt.neutral') : (v > 0 ? t('fmt.right') : t('fmt.left')) + ' ' + Math.round(Math.abs(v) * 100) + '%' },
  pitch: { key: 'sl.pitch', min: -1, max: 1, step: 0.01, get: () => T.pitch, set: v => { T.pitch = v; }, fmt: v => v === 0 ? t('fmt.neutral') : (v > 0 ? t('fmt.noseUp') : t('fmt.noseDown')) + ' ' + Math.round(Math.abs(v) * 100) + '%' },
  yaw: { key: 'sl.yaw', min: -1, max: 1, step: 0.01, get: () => T.yaw, set: v => { T.yaw = v; }, fmt: v => v === 0 ? t('fmt.neutral') : (v > 0 ? t('fmt.right') : t('fmt.left')) + ' ' + Math.round(Math.abs(v) * 100) + '%' },
  trim: { key: 'sl.trim', min: -1, max: 1, step: 0.01, get: () => T.trim, set: v => { T.trim = v; }, fmt: v => (v * 5).toFixed(1) + '°' },
  wdim: { key: 'sl.wdim', min: 0, max: 1, step: 0.01, get: () => S.windowDim, set: v => setWindowDim(v), fmt: v => v < 0.1 ? t('fmt.clear') : v > 0.9 ? t('fmt.darkest') : Math.round(v * 100) + '%' },
};
const TG = {
  gear: { key: 'tg.gear', get: () => T.gear < 0.5, set: on => { T.gear = on ? 0 : 1; }, onKey: 'state.down', offKey: 'state.up' },
  n1: { key: 'tg.n1', get: () => T.n1 > 0, set: on => { T.n1 = on ? 1 : 0; }, onKey: 'state.running', offKey: 'state.off' },
  rev: { key: 'tg.rev', get: () => T.reverser > 0, set: on => { T.reverser = on ? 1 : 0; }, onKey: 'state.deployed', offKey: 'state.stowed' },
  rat: { key: 'tg.rat', get: () => T.rat > 0, set: on => { T.rat = on ? 1 : 0; }, onKey: 'state.deployed', offKey: 'state.stowed' },
  flight: { key: 'tg.flight', get: () => S.flight, set: on => { setFlight(on); T.flex = on ? 1 : 0; T.gear = on ? 1 : 0; T.n1 = on ? 1 : T.n1; }, onKey: 'state.airborne', offKey: 'state.ground' },
  beacon: { key: 'tg.beacon', get: () => aircraft.lights.beacon, set: on => { aircraft.lights.beacon = on; } },
  strobe: { key: 'tg.strobe', get: () => aircraft.lights.strobe, set: on => { aircraft.lights.strobe = on; } },
  nav: { key: 'tg.nav', get: () => aircraft.lights.nav, set: on => { aircraft.lights.nav = on; } },
  landing: { key: 'tg.landing', get: () => aircraft.lights.landing, set: on => { aircraft.lights.landing = on; } },
  labels: { key: 'tg.labels', get: () => S.labels, set: on => { S.labels = on; } },
  dims: { key: 'tg.dims', get: () => S.dims, set: on => { S.dims = on; dimsG.visible = on && !S.flight; } },
};
const slHtml = (k) => { const s = SL[k], v = s.get(); return `<label class="sl"><span>${t(s.key)}</span><input type="range" data-sl="${k}" min="${s.min}" max="${s.max}" step="${s.step}" value="${v}"><output>${s.fmt(v)}</output></label>`; };
const tgHtml = (k) => { const item = TG[k], on = item.get(); return `<button class="tg${on ? ' on' : ''}" data-tg="${k}"><i></i><span>${t(item.key)}</span>${item.onKey ? `<em>${t(on ? item.onKey : item.offKey)}</em>` : ''}</button>`; };
function renderPane() {
  let h = '';
  if (S.tab === 'fly') h = `<div class="grid">${['flaps', 'speedbrake', 'roll', 'pitch', 'yaw', 'trim'].map(slHtml).join('')}</div><button class="ghost" id="btn-center">${t('centerControls')}</button>`;
  if (S.tab === 'anim') h = `<div class="row">${['gear', 'n1', 'rev', 'rat', 'flight'].map(tgHtml).join('')}</div><div class="row sub"><b>${t('lightsLabel')}</b>${['beacon', 'strobe', 'nav', 'landing'].map(tgHtml).join('')}</div>`;
  if (S.tab === 'view') h = `<div class="row"><b>${t('layersLabel')}</b>${LAYERS.map(k => `<button class="tg${S.layers[k] ? ' on' : ''}" data-layer="${k}"><i></i><span>${t(`layer.${k}`)}</span></button>`).join('')}</div>
    <div class="row sub">${tgHtml('labels')}${tgHtml('dims')}<div class="grid one">${slHtml('wdim')}</div></div>`;
  $('#pane').innerHTML = h;
  $$('#console .tabs [data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === S.tab));
  $('#btn-labels').classList.toggle('on', S.labels); $('#btn-dims').classList.toggle('on', S.dims);
}
$('#console').addEventListener('input', e => {
  const k = e.target.dataset.sl; if (!k) return;
  const v = +e.target.value; SL[k].set(v); e.target.nextElementSibling.textContent = SL[k].fmt(v);
});
$('#console').addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]'); if (tab) { S.tab = tab.dataset.tab; $('#console').classList.remove('min'); renderPane(); return; }
  const tg = e.target.closest('[data-tg]'); if (tg) { const item = TG[tg.dataset.tg]; item.set(!item.get()); renderPane(); return; }
  const ly = e.target.closest('[data-layer]'); if (ly) { const k = ly.dataset.layer; S.layers[k] = !S.layers[k]; refreshVis(); renderPane(); return; }
  if (e.target.id === 'btn-center') { T.roll = T.pitch = T.yaw = T.trim = 0; T.speedbrake = 0; renderPane(); }
  if (e.target.id === 'btn-min') $('#console').classList.toggle('min');
});
function resetControls() {
  Object.assign(T, { flaps: 0, speedbrake: 0, roll: 0, pitch: 0, yaw: 0, trim: 0, gear: 0, reverser: 0, n1: 0, rat: 0, flex: 0 });
  setFlight(false);
}

// ------------------------------------------------------------------ 导览
let tourLoop = 0;
function tourGo(i) {
  if (i < 0 || i >= TOUR.length) return tourEnd();
  S.tour = i; const st = TOUR[i];
  document.body.classList.add('touring'); $('#console').classList.add('min');
  clearInterval(tourLoop);
  resetControls(); Object.assign(T, st.set || {});
  if (st.loop) {                      // 循环演示：在两个状态间来回切换（如起落架收放）
    let on = false;
    tourLoop = setInterval(() => { on = !on; T[st.loop.key] = on ? st.loop.to : (st.set?.[st.loop.key] ?? 0); renderPane(); }, st.loop.every * 1000);
  }
  setFlight(!!st.flight);
  S.layers = { skin: true, struct: true, cabin: true, sys: true, gear: true, ...(st.layers || {}) };
  S.isolate = false;
  if (st.cut) { S.cutAxis = st.cut.axis; S.cutK = st.cut.k; }
  if (st.mode === 'explode') S.explodeK = 1;
  setMode(st.mode);
  select(st.select || null);
  layoutView(); flyTo(fitCam(st.cam), 1.7);
  renderPane();
  renderTourCard(i);
}
function renderTourCard(i) {
  const st = TOUR[i], c = $('#tourcard'); c.hidden = false;
  c.innerHTML = `<div class="tc-head"><span class="step">${String(i + 1).padStart(2, '0')}<small> / ${TOUR.length}</small></span><h3>${esc(st.title)}</h3><button class="x" id="tour-x" title="${t('tourExit')}">×</button></div>
    <p>${esc(st.text)}</p>
    <div class="tc-foot"><div class="dots">${TOUR.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}" data-k="${k}"></i>`).join('')}</div>
    <button id="tour-prev" ${i === 0 ? 'disabled' : ''}>${t('tourPrev')}</button><button class="primary" id="tour-next">${i === TOUR.length - 1 ? t('tourFinish') : t('tourNext')}</button></div>`;
  $('#tour-x').onclick = tourEnd; $('#tour-prev').onclick = () => tourGo(i - 1); $('#tour-next').onclick = () => tourGo(i + 1);
  $$('#tourcard .dots i').forEach(d => { d.onclick = () => tourGo(+d.dataset.k); });
}
function tourEnd() {
  clearInterval(tourLoop);
  S.tour = -1; $('#tourcard').hidden = true; document.body.classList.remove('touring'); $('#console').classList.remove('min'); layoutView();
}

// ------------------------------------------------------------------ 标注热点
const labelsEl = $('#labels');
const ANCHOR = {     // 机体坐标系下的手工锚点（其余取部件包围盒顶部中心）
  cabinWindow: [13.2, 5.75, 2.82], windshield: [3.5, 5.75, 0.95], airData: [2.3, 4.0, 1.72], packInlet: [20.7, 1.72, 1.3], paxDoor: [6.3, 6.3, 2.5],
  sec41: [8.5, 7.5, 0], cargoDoorFwd: [11, 3.6, -2.7], rat: [36.4, 1.75, -2.05], wbFairing: [22.5, 2.6, 3.2], brake: [31.9, 0.7, 5.6], mainGear: [31.24, 2.2, 4.9],
  wingBox: [30.5, 4.9, 13], frame: [16.3, 7.5, 0.6], stringer: [26, 6.9, 2.0], seatEco: [24, 5.6, 1.95], uld: [14, 3.6, 2.0], hydraulics: [34.2, 2.9, 2.5],
  powerFeeder: [25.4, 3.9, 6.0], fuelMain: [33, 5.0, 15], fuelCenter: [26.9, 4.1, 0], ecsPack: [25.4, 2.4, 1.2], centerWingBox: [28, 4.05, -1.8],
};
const hs = [];
function buildLabels() {
  const tmp = new THREE.Vector3();
  for (const id of partIds) {
    const p = PARTS[id]; if (!p.hot) continue;
    const objs = aircraft.reg.objectsOf(id);
    const obj = objs.find(o => o.userData.side !== 'R') || objs[0];
    let w;
    if (ANCHOR[id]) w = aircraft.root.localToWorld(new THREE.Vector3(...ANCHOR[id]));
    else { const b = new THREE.Box3().expandByObject(obj); b.getCenter(tmp); w = new THREE.Vector3(tmp.x, b.max.y, tmp.z); }
    const radial = p.hot === 1 && Math.abs(w.z) < 3.4 && w.y < 8.2 && w.x > -30 && w.x < 29 ? new THREE.Vector3(0, w.y - 4.8, w.z) : null;
    if (radial) { if (radial.length() < 0.4) radial.set(0, 1, 0); radial.normalize(); }
    const el = document.createElement('button');
    el.className = 'hs'; el.dataset.id = id; el.innerHTML = `<i></i><b>${esc(partName(p))}</b>`;
    el.onclick = () => select(id, { focus: true });
    labelsEl.appendChild(el);
    hs.push({ id, el, obj, local: obj.worldToLocal(w.clone()), radial, hot: p.hot, w: labelWidth(p), shown: false });
  }
  for (const d of dimLabels) {
    const el = document.createElement('div'); el.className = 'dimlab'; el.textContent = t(d.key); labelsEl.appendChild(el); d.el = el;
  }
}
// CJK 与拉丁字母的字宽不同；切换语言时同步更新热点宽高估算。
const labelWidth = (p) => (isEn() ? partName(p).length * 7 : partName(p).length * 13) + 30;
const shownChain = (o) => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
function firstMesh(o) { let m = null; o.traverse(c => { if (!m && c.isMesh && !c.userData.noPick) m = c; }); return m; }
const _v = new THREE.Vector3(), _c = new THREE.Vector3();
function updateLabels() {
  const W = innerWidth, H = innerHeight, placed = [];
  const want = S.mode === 'material' || !S.labels ? 0 : (S.mode === 'xray' || S.mode === 'cut') ? 2 : 1;
  // 两遍：先放选中的标注（它总是显示），其余按顺序贪心避让
  for (let pass = 0; pass < 2; pass++) for (const h of hs) {
    const sel = h.id === S.selected;
    if ((pass === 0) !== sel) continue;
    let show = (h.hot === want || (sel && want > 0)) && !S.isolate;
    if (show) { const m = h.mesh || (h.mesh = firstMesh(h.obj)); show = !!m && shownChain(m); }
    if (show) {
      _v.copy(h.local); h.obj.localToWorld(_v);
      if (h.radial && _c.copy(camera.position).sub(_v).dot(h.radial) < 0) show = false;
      // 剖视：只标注真正被剖开露出来的内部件（位于剖切面外侧，或与剖切面同处一个舱体内）
      if (show && S.mode === 'cut' && !sel && clipPlane.distanceToPoint(_v) > 3.4) show = false;
      _v.project(camera);
      if (_v.z > 1 || Math.abs(_v.x) > 1.02 || Math.abs(_v.y) > 1.02) show = false;
    }
    if (show) {
      const x = (_v.x * 0.5 + 0.5) * W, y = (-_v.y * 0.5 + 0.5) * H;
      const r = [x - 8, y - 38, x + h.w, y + 6];
      if (!sel && placed.some(q => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1])) show = false;
      else { placed.push(r); h.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; }
    }
    if (show !== h.shown) { h.shown = show; h.el.classList.toggle('show', show); }
    if (sel !== h.sel) { h.sel = sel; h.el.classList.toggle('on', sel); }
  }
  for (const d of dimLabels) {
    let show = dimsG.visible;
    if (show) { _v.copy(d.pos).project(camera); show = _v.z < 1 && Math.abs(_v.x) < 1 && Math.abs(_v.y) < 1; }
    if (show) d.el.style.transform = `translate(${((_v.x * 0.5 + 0.5) * W).toFixed(1)}px,${((-_v.y * 0.5 + 0.5) * H).toFixed(1)}px) translate(-50%,-50%)`;
    d.el.classList.toggle('show', show);
  }
}

// ------------------------------------------------------------------ 拾取
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const canvas = stage.renderer.domElement;
function pick(ev) {
  const r = canvas.getBoundingClientRect();
  ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObject(aircraft.root, true);
  let skinHit = null;
  for (const h of hits) {
    const o = h.object;
    if (o.userData.noPick || !o.userData.pid || !PARTS[o.userData.pid] || !shownChain(o)) continue;
    const L = o.userData.layer || 'skin';
    if (S.mode === 'cut' && o.material.clippingPlanes && clipPlane.distanceToPoint(h.point) < 0) continue;
    const res = { id: o.userData.pid, root: Registry.partOf(o).root };
    if (S.mode === 'xray' && L === 'skin') { skinHit ||= res; continue; }
    return res;
  }
  return skinHit;
}
let down = null, moveQueued = null;
canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; });
canvas.addEventListener('pointerup', e => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
  if (moved > 5 || e.button !== 0) return;
  const p = pick(e);
  select(p ? p.id : null);
});
canvas.addEventListener('pointermove', e => {
  if (e.buttons) { hover(null); return; }
  moveQueued = e;
});
canvas.addEventListener('pointerleave', () => { moveQueued = null; hover(null); });
function hover(p, ev) {
  const id = p ? p.id : null, tip = $('#tip');
  if (id !== S.hovered || (p && stage.outlineHover.selectedObjects[0] !== p.root)) {
    S.hovered = id;
    stage.outlineHover.selectedObjects = p && id !== S.selected ? [p.root] : [];
    canvas.style.cursor = id ? 'pointer' : '';
    if (id) tip.innerHTML = `<b>${esc(partName(PARTS[id]))}</b><small>${esc(partAltName(PARTS[id]))}</small>`;
    tip.hidden = !id;
  }
  if (id && ev) tip.style.transform = `translate(${Math.min(ev.clientX + 16, innerWidth - 220)}px,${ev.clientY + 18}px)`;
}

// ------------------------------------------------------------------ 顶栏工具 / 快捷键 / 帮助
function goHome() {
  let h = homeCam();
  if (S.mode === 'explode') { const e = S.explodeK, k = 1 + 0.5 * e; h = [2 + (h[0] + 1) * k, 5 + 7 * e + (h[1] - 5) * k, h[2] * k, 2, 5 + 7 * e, 0]; }
  flyTo(h);
}
let toastT = 0;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, 2600); }
$('#btn-tour').onclick = () => (S.tour >= 0 ? tourEnd() : tourGo(0));
$('#btn-labels').onclick = () => { S.labels = !S.labels; renderPane(); };
$('#btn-dims').onclick = () => { TG.dims.set(!S.dims); renderPane(); if (S.dims) flyTo(fitCam([-62, 50, 70, 0, 2, 0])); };
$('#btn-theme').onclick = () => {
  stage.setTheme(stage.theme === 'studio' ? 'day' : 'studio');
  dimsG.children[0].material.color.set(stage.theme === 'day' ? 0x7a4300 : 0xffc46b);   // 浅色地面上尺寸线改用深琥珀色
  toast(stage.theme === 'day' ? t('toast.themeDay') : t('toast.themeStudio'));
};
$('#btn-home').onclick = goHome;
$('#btn-list').onclick = () => document.body.classList.toggle('show-left');
$('#btn-lang').onclick = () => setLocale(isEn() ? 'zh' : 'en');

const HELP_ROWS = [
  ['help.rotate', 'help.rotateDesc'], ['help.zoom', 'help.zoomDesc'], ['help.pan', 'help.panDesc'], ['help.click', 'help.clickDesc'],
  ['help.modes', 'help.modesDesc'], ['help.gear', 'help.gearDesc'], ['help.flaps', 'help.flapsDesc'], ['help.brake', 'help.brakeDesc'],
  ['help.engine', 'help.engineDesc'], ['help.rev', 'help.revDesc'], ['help.labels', 'help.labelsDesc'], ['help.tour', 'help.tourDesc'],
  ['help.arrows', 'help.arrowsDesc'], ['help.home', 'help.homeDesc'], ['help.esc', 'help.escDesc'],
];
function renderHelp() {
  $('#help').innerHTML = `<div class="help-card panel"><button class="x" id="help-x">×</button><h3>${t('help.title')}</h3>
  <dl>${HELP_ROWS.map(([a, b]) => `<div><dt>${t(a)}</dt><dd>${t(b)}</dd></div>`).join('')}</dl>
  <p class="note">${t('help.note')}</p></div>`;
}
renderHelp();
const toggleHelp = (on) => { $('#help').hidden = on === undefined ? !$('#help').hidden : !on; };
$('#btn-help').onclick = () => toggleHelp();
$('#help').addEventListener('click', e => { if (e.target.id === 'help' || e.target.id === 'help-x') toggleHelp(false); });
addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' && e.target.type !== 'range') { if (e.key === 'Escape') e.target.blur(); return; }
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toLowerCase();
  const m = MODES.find(x => x.key === k);
  if (m) { setMode(m.id); renderInfo(); }
  else if (k === 'g') { T.gear = T.gear < 0.5 ? 1 : 0; toast(T.gear ? t('toast.gearUp') : t('toast.gearDown')); }
  else if (k === 'f') { const i = clamp(FLAP_DETENTS.indexOf(T.flaps) + (e.shiftKey ? -1 : 1), 0, FLAP_DETENTS.length - 1); T.flaps = FLAP_DETENTS[i]; toast(t('toast.flaps', { name: flapName(i) })); }
  else if (k === 'b') { T.speedbrake = T.speedbrake > 0 ? 0 : 1; }
  else if (k === 'e') { T.n1 = T.n1 > 0 ? 0 : 1; toast(T.n1 ? t('toast.engineOn') : t('toast.engineOff')); }
  else if (k === 'v') { T.reverser = T.reverser > 0 ? 0 : 1; }
  else if (k === 'l') S.labels = !S.labels;
  else if (k === 'd') TG.dims.set(!S.dims);
  else if (k === 't') { S.tour >= 0 ? tourEnd() : tourGo(0); return; }
  else if (k === 'r') goHome();
  else if (k === '?' || k === '/') toggleHelp();
  else if (k === 'escape') { if (!$('#help').hidden) toggleHelp(false); else select(null); }
  else if (k === 'arrowright' && S.tour >= 0) { tourGo(S.tour + 1); return; }
  else if (k === 'arrowleft' && S.tour > 0) { tourGo(S.tour - 1); return; }
  else return;
  renderPane();
});

// ------------------------------------------------------------------ 启动
// 语言切换只重渲染文案层，不重建几何、不丢失当前选中/模式/导览状态。
function syncShell() {
  const brand = $('.brand');
  if (brand) { brand.querySelector('b').textContent = t('brand'); brand.querySelector('span').textContent = t('brandSub'); }
  $$('#modes button').forEach(b => {
    const m = MODES.find(x => x.id === b.dataset.mode);
    b.textContent = t(`mode.${m.id}`);
    b.title = `${t(`modeHint.${m.id}`)} · ${m.key}`;
  });
  const tourBtn = $('#btn-tour'); tourBtn.title = t('tourTitle'); tourBtn.querySelector('span').textContent = t('tour');
  $('#btn-list').title = t('partListTitle');
  $('#btn-labels').title = t('labelsTitle');
  $('#btn-dims').title = t('dimsTitle');
  $('#btn-theme').title = t('themeTitle');
  $('#btn-home').title = t('homeTitle');
  $('#btn-lang').title = t('langTitle'); $('#btn-lang').textContent = t('langLabel');
  $('#btn-help').title = t('helpTitle');
  $('#q').placeholder = t('searchPlaceholder');
  $('#btn-min').title = t('panelMinTitle');
  $$('#console .tabs [data-tab]').forEach(b => { b.textContent = t(`tab.${b.dataset.tab}`); });
}

setWindowDim(S.windowDim);
renderTree(); renderInfo(); renderPane(); setMode('ext'); buildLabels();
onLocaleChange(() => {
  syncShell();
  renderTree($('#q').value);
  renderInfo();
  renderPane();
  renderModeBar();
  renderHelp();
  for (const h of hs) {
    h.w = labelWidth(PARTS[h.id]);
    const b = h.el.querySelector('b');
    if (b) b.textContent = partName(PARTS[h.id]);
  }
  for (const d of dimLabels) if (d.el) d.el.textContent = t(d.key);
  if (S.tour >= 0) renderTourCard(S.tour);
});
if (innerWidth <= 820) $('#console').classList.add('min');   // 小屏默认收起控制台，把画面留给模型
layoutView(); setCam(...homeCam());

let last = performance.now();
function loop(now) {
  const rdt = (now - last) / 1000, dt = Math.min(rdt, 0.05); last = now;   // 相机飞行按真实时间走，机构动画限制步长
  if (fly) {
    fly.t += Math.min(rdt, 0.2) / fly.dur; const k = clamp(fly.t, 0, 1), e = k * k * k * (k * (6 * k - 15) + 10);
    camera.position.lerpVectors(fly.p0, fly.p1, e); controls.target.lerpVectors(fly.t0, fly.t1, e);
    if (fly.t >= 1) fly = null;
  }
  controls.update();
  if (U.xray.value !== xrayT) U.xray.value = Math.abs(xrayT - U.xray.value) < 0.02 ? xrayT : U.xray.value + (xrayT - U.xray.value) * Math.min(1, dt * 7);
  const d = camera.position.distanceTo(controls.target), near = clamp(d * 0.02, 0.12, 3);
  if (Math.abs(near - camera.near) / camera.near > 0.12) { camera.near = near; camera.updateProjectionMatrix(); }
  aircraft.update(dt);
  if (moveQueued) { const ev = moveQueued; moveQueued = null; hover(pick(ev), ev); }
  stage.render();
  updateLabels();
  requestAnimationFrame(loop);
}
window.__app = { stage, aircraft, THREE, S, setCam, setMode, select, tourGo, tourEnd, flyTo, refreshVis, renderPane };
document.getElementById('boot')?.classList.add('gone');
setTimeout(() => document.getElementById('boot')?.remove(), 700);
requestAnimationFrame(loop);
