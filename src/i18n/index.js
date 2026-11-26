// 运行时双语层：locale 解析、界面词典、内容覆盖与订阅通知。
// 选型说明：单文件离线站点不引入 i18n 框架，自研模块约 3 KB，避免额外请求与依赖。
import { PARTS, GROUPS, SPEC, MATERIAL_SHARE } from '../data/parts.js';
import { TOUR } from '../data/tour.js';
import { MATERIAL_CLASSES } from '../core/materials.js';
import { UI } from './ui.js';
import { GROUPS_EN, SPEC_EN, CLASSES_EN, SHARE_EN, TOUR_EN } from './meta.js';
import { PARTS_EN_1 } from './parts-1.js';
import { PARTS_EN_2 } from './parts-2.js';
import { PARTS_EN_3 } from './parts-3.js';

const STORAGE_KEY = 'skyframe.locale';
const SUPPORTED = ['zh', 'en'];
const PARTS_EN = { ...PARTS_EN_1, ...PARTS_EN_2, ...PARTS_EN_3 };

// 中文原文快照：切换语言时只覆盖 d/f/t，不改动 n/e 与几何字段。
const ZH_PARTS = new Map(Object.entries(PARTS).map(([id, p]) => [id, { d: p.d, f: p.f, t: p.t }]));
const ZH_TOUR = TOUR.map(s => ({ title: s.title, text: s.text }));
const ZH_SHARE = MATERIAL_SHARE.map(row => row[2]);

let locale = 'zh';
const listeners = new Set();

function readStoredLocale() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}
function storeLocale(next) {
  try { localStorage.setItem(STORAGE_KEY, next); } catch { /* file:// 或隐私模式下忽略 */ }
}
function readParamLocale() {
  try { return new URLSearchParams(location.search).get('lang'); } catch { return null; }
}

/** ?lang= > localStorage > 默认中文 */
function detectLocale() {
  const q = readParamLocale();
  if (SUPPORTED.includes(q)) return q;
  const stored = readStoredLocale();
  return SUPPORTED.includes(stored) ? stored : 'zh';
}

function syncUrl(next) {
  try {
    const url = new URL(location.href);
    if (next === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  } catch { /* 忽略 file:// 等环境限制 */ }
}

function localizeData(next) {
  const en = next === 'en';
  for (const [id, p] of Object.entries(PARTS)) {
    const zh = ZH_PARTS.get(id);
    const tr = PARTS_EN[id];
    p.d = en && tr?.d ? tr.d : zh.d;
    p.f = en && tr?.f ? tr.f : zh.f;
    p.t = en && tr?.t ? tr.t : zh.t;
  }
  TOUR.forEach((step, i) => {
    const tr = TOUR_EN[i];
    const zh = ZH_TOUR[i];
    step.title = en && tr ? tr.title : zh.title;
    step.text = en && tr ? tr.text : zh.text;
  });
  const title = t('docTitle');
  document.title = title;
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  document.body.dataset.locale = next;
  const bootTitle = document.querySelector('.boot-title');
  const bootSub = document.querySelector('.boot-sub');
  if (bootTitle) bootTitle.textContent = t('bootTitle');
  if (bootSub) bootSub.textContent = t('bootSub');
}

export function initLocale() {
  const next = detectLocale();
  locale = next;
  storeLocale(next);
  syncUrl(next);
  localizeData(next);
  return next;
}

export function getLocale() { return locale; }
export function isEn() { return locale === 'en'; }
export function onLocaleChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function t(key, vars) {
  const table = UI[locale] || UI.zh;
  let text = table[key] ?? UI.zh[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  return text;
}

/** 切换语言：更新数据副本、URL、文档语言并通知界面重渲染。 */
export function setLocale(next) {
  if (!SUPPORTED.includes(next) || next === locale) return locale;
  locale = next;
  storeLocale(next);
  syncUrl(next);
  localizeData(next);
  listeners.forEach(fn => fn(next));
  return locale;
}

/** 中文显示中文名、英文作副标题；英文反之。 */
export function partName(p) { return locale === 'en' ? p.e : p.n; }
export function partAltName(p) { return locale === 'en' ? p.n : p.e; }

export function groupName(g) {
  return locale === 'en' ? (GROUPS_EN[g.id] || g.name) : g.name;
}

export function specRows() {
  return locale === 'en' ? SPEC_EN : SPEC;
}

export function classLabel(mc) {
  const c = MATERIAL_CLASSES[mc];
  if (!c) return mc;
  return locale === 'en' ? (CLASSES_EN[mc] || c.en || c.name) : c.name;
}

export function shareRows() {
  return MATERIAL_SHARE.map(([key, pct], i) => [
    key,
    pct,
    locale === 'en' ? (SHARE_EN[key] || '') : ZH_SHARE[i],
  ]);
}
