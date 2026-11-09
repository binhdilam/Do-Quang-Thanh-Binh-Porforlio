/* GMV Max Rules — clickable demo. Pure front-end, sample data, state kept in this browser only. */
(function () {
'use strict';

/* ============ helpers ============ */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function pad(n) { return (n < 10 ? '0' : '') + n; }
function vnd(n) { return '₫' + Math.round(n).toLocaleString('en-US'); }
function trf(n) { return (n / 1e6).toFixed(1).replace('.', ',') + 'tr'; }
function hm(m) { m = Math.max(0, Math.min(1440, m)); return pad(Math.floor(m / 60) % 24 + (m === 1440 ? 24 : 0) * 0) + ':' + pad(m % 60); }
function hm24(m) { return m >= 1440 ? '24:00' : hm(m); }
function tm(s) { var p = String(s).split(':'); return (+p[0]) * 60 + (+p[1] || 0); }
function dstr(d) { var x = new Date(2026, 10, 6 + d); return pad(x.getDate()) + '/' + pad(x.getMonth() + 1); }
function wday(d) { return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(2026, 10, 6 + d).getDay()]; }
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hstr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function clone(o) { return JSON.parse(JSON.stringify(o)); }

var P = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  rules: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3 3 0 0 1 3 3v6.5"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  radio: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  gauge: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h4M9 13h6M9 17h6"/>',
  tpl: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="13" width="8" height="7" rx="1.5"/><rect x="14" y="13" width="7" height="7" rx="1.5"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 0 0 4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
  chev: '<path d="M9 6l6 6-6 6"/>', back: '<path d="M15 6l-6 6 6 6"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M8 5l-2 4M14 5l-2 4M20 5l-2 4"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/>',
  hist: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 8v5l3 2"/>',
  ext: '<path d="M7 17L17 7M8 7h9v9"/>', dl: '<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',
  rocket: '<path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M14 4c3 0 6 3 6 6-2 4-5 6-8 7l-5-5c1-3 3-6 7-8z"/><circle cx="14.5" cy="9.5" r="1.3"/>',
  power: '<path d="M12 3v8M6.3 6.8a8 8 0 1 0 11.4 0"/>', eyeoff: '<path d="M3 3l18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c5 0 9 6 9 6a15 15 0 0 1-3 3.5M6.5 7.5C4 9.2 3 12 3 12s4 6 9 6c1.4 0 2.7-.4 3.8-1M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>', cal2: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>'
};
function ic(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>'; }

/* ============ sample data ============ */
var KEY = 'gmvmax-demo-v2';
var NOW = 20 * 60 + 22;

var ACC = [
  { id: 'a1', name: 'Mộc An Organics', live: true, on: true },
  { id: 'a2', name: 'Hạ Vy Beauty', live: true, on: true },
  { id: 'a3', name: 'Nhà Xinh Decor', live: false, on: false }
];
var METRICS = {
  spend: { l: 'Total spend', u: '₫' }, roi: { l: 'ROI', u: '' }, gmv: { l: 'GMV', u: '₫' },
  ctr: { l: 'CTR', u: '%' }, fall: { l: 'Days of falling ROI', u: 'days' }, age: { l: 'Video age', u: 'days' }
};
var ACTS = {
  exclude: { l: 'Exclude video', ic: 'eyeoff', ph: 'remove the video from every active campaign', d: 'Remove the video from the campaign.' },
  create: { l: 'Create boost', ic: 'rocket', ph: 'create a boost for the video', d: 'New boost for each video that has none yet.' },
  kill: { l: 'Kill boost', ic: 'power', ph: "stop the video's boost (the video stays in the campaign)", d: 'Stop the boost, keep the video.' },
  raise: { l: 'Raise budget', ic: 'trend', ph: 'raise the boost budget by 20%', d: 'Add 20% to boosts already running.' },
  extend: { l: 'Extend boost', ic: 'cal2', ph: 'extend the boost by 7 days', d: 'Keep a winning boost running 7 more days.' },
  alert: { l: 'Alert only', ic: 'bell', ph: 'send me an alert and change nothing', d: 'Notify me, do not touch the ads.' }
};
var TITLES = ['Chả cá chiên giòn — review', 'Combo quà tết — unbox', 'Serum phục hồi — before/after', 'Gối ôm cotton — thử nhanh', 'Nồi chiên không dầu — mẹo hay', 'Son dưỡng — demo 15s', 'Bộ dao bếp — ASMR', 'Trà thảo mộc — pha cùng mình'];

function vid(id) {
  var r = rng(hstr(String(id)));
  var spend = Math.round(30 + r() * 900) * 1000, roi = +(0.5 + r() * 9).toFixed(2);
  return { id: String(id), title: TITLES[Math.floor(r() * TITLES.length)], spend: spend, roi: roi, gmv: Math.round(spend * roi), orders: Math.max(1, Math.round(spend * roi / 180000)), ctr: +(1 + r() * 5).toFixed(1), age: Math.floor(1 + r() * 30), boosted: r() > 0.55, fall: Math.floor(r() * 5) };
}
var POOL = []; for (var pi = 1; pi <= 16; pi++) POOL.push(vid('75120364821109' + ('00000' + pi * 37).slice(-5)));

function seedRules() {
  return [
    { id: 1, name: 'Exclude L3D', desc: 'Remove videos that spent a lot and returned little over the last days, from every active campaign.', mode: 'dry', on: true, accts: ['a1', 'a2'], last: '06/11 07:00', st: 'Completed', matched: 7, acted: 0, dryOk: true, win: 3, cond: [{ m: 'spend', o: '>', v: 50000 }, { m: 'roi', o: '<', v: 5 }], comb: 'and', act: 'exclude', sched: { t: 'daily', times: ['07:00'] }, limit: '' },
    { id: 2, name: 'Set Boost', desc: 'Boost videos that are performing well today and are not boosted yet.', mode: 'live', on: true, accts: ['a1', 'a2', 'a3'], last: '06/11 15:01', st: 'Completed', matched: 4, acted: 2, dryOk: true, win: 1, cond: [{ m: 'roi', o: '>', v: 8 }, { m: 'gmv', o: '>', v: 300000 }], comb: 'and', act: 'create', sched: { t: 'daily', times: ['10:00', '12:00', '15:00'] }, limit: '5' },
    { id: 3, name: 'Kill Boost', desc: 'Stop boosts that spend a lot today and return little. The video stays in the campaign.', mode: 'live', on: true, accts: ['a1', 'a2'], last: '06/11 21:01', st: 'Completed', matched: 3, acted: 3, dryOk: true, win: 1, cond: [{ m: 'spend', o: '>', v: 200000 }, { m: 'roi', o: '<', v: 3 }], comb: 'and', act: 'kill', sched: { t: 'every', n: 60 }, limit: '' },
    { id: 4, name: 'Fatigue', desc: 'Remove videos whose ROI has fallen day after day and is now low.', mode: 'dry', on: true, accts: ['a2'], last: '06/11 08:00', st: 'Partial data', matched: 5, acted: 0, dryOk: false, win: 3, cond: [{ m: 'fall', o: '≥', v: 3 }, { m: 'roi', o: '<', v: 5 }], comb: 'and', act: 'exclude', sched: { t: 'daily', times: ['08:00'] }, limit: '' },
    { id: 5, name: 'Scale Boost', desc: 'Raise the budget of boosts that have used most of it and are still profitable.', mode: 'live', on: false, accts: ['a1'], last: '04/11 18:00', st: 'Completed', matched: 1, acted: 0, dryOk: true, win: 1, cond: [{ m: 'gmv', o: '>', v: 500000 }, { m: 'roi', o: '>', v: 6 }], comb: 'and', act: 'raise', sched: { t: 'every', n: 60 }, limit: '' },
    { id: 6, name: 'Extend Boost', desc: 'Extend boosts that are about to end and are still profitable.', mode: 'dry', on: true, accts: ['a1', 'a2'], last: '06/11 18:00', st: 'Completed', matched: 6, acted: 0, dryOk: true, win: 3, cond: [{ m: 'roi', o: '>', v: 6 }, { m: 'age', o: '≤', v: 14 }], comb: 'and', act: 'extend', sched: { t: 'daily', times: ['18:00'] }, limit: '' }
  ];
}
function seedAct() {
  return [
    { t: '21:01', src: 'Kill Boost', acct: 'Mộc An Organics', text: '3 boosts stopped (spend over ₫200,000, ROI under 3.00)', st: 'live' },
    { t: '20:14', src: 'Set Boost', acct: 'Hạ Vy Beauty', text: '2 boosts created, 2 videos already boosted', st: 'live' },
    { t: '18:00', src: 'Extend Boost', acct: 'Mộc An Organics', text: 'Would extend 6 boosts by 7 days', st: 'dry' },
    { t: '15:01', src: 'Set Boost', acct: 'Mộc An Organics', text: '2 boosts created', st: 'live' },
    { t: '12:00', src: 'Set Boost', acct: 'Hạ Vy Beauty', text: 'No videos matched', st: 'skip' },
    { t: '10:30', src: 'Set Boost', acct: 'Hạ Vy Beauty', text: 'Boost could not be created: daily budget below TikTok minimum', st: 'failed', id: 'f1', err: 'TikTok API returned “budget below minimum” for 1 video. In a real workspace the rule would retry on its next run, and pause itself after 3 failures in a row.' },
    { t: '08:00', src: 'Fatigue', acct: 'Hạ Vy Beauty', text: 'Would exclude 5 videos (ROI falling 3+ days, ROI under 5.00)', st: 'dry' },
    { t: '07:00', src: 'Exclude L3D', acct: 'Mộc An Organics', text: 'Would exclude 7 videos', st: 'dry' }
  ];
}
function seedCamp() {
  return [
    { id: 'c1', name: 'GMV Max · Chả cá', cid: '1840000000000000003', acct: 'Mộc An Organics', cost: 1830000, gmv: 7462335, orders: 90, ctr: 3.1, vr: 16, budget: 2500000, roiT: 4 },
    { id: 'c2', name: 'GMV Max · Combo quà tết', cid: '1840000000000000002', acct: 'Mộc An Organics', cost: 1219999, gmv: 4974880, orders: 90, ctr: 3.1, vr: 16, budget: 2000000, roiT: 4 },
    { id: 'c3', name: 'GMV Max · Serum phục hồi', cid: '1840000000000000007', acct: 'Hạ Vy Beauty', cost: 610000, gmv: 2487443, orders: 54, ctr: 2.8, vr: 14, budget: 1200000, roiT: 3.5 },
    { id: 'c4', name: 'GMV Max · Gối ôm', cid: '1840000000000000011', acct: 'Nhà Xinh Decor', cost: 0, gmv: 0, orders: 0, ctr: 0, vr: 0, budget: 800000, roiT: 3 }
  ];
}
var LIVE_ACC = [
  { id: 'MAS', name: 'Mộc An Store', sub: 'MAS · Mộc An · Ads 01', perm: true },
  { id: 'MAH', name: 'Mộc An Home', sub: 'MAH · Mộc An · Ads 01', perm: true },
  { id: 'MAO', name: 'Mộc An Organics', sub: 'MAO · Mộc An · Ads 02', perm: true },
  { id: 'MAS2', name: 'Mộc An Store 2', sub: 'MAS2 · Mộc An · Ads 02 · no LIVE permission', perm: false }
];
var seq = 0;
function mkS(acct, name, s, e, roi, budget, d, ov) { return { id: 's' + (++seq), acct: acct, name: name, d: d, s: tm(s), e: e === '24:00' ? 1440 : tm(e), roi: roi, budget: budget, ov: ov || null }; }
function seedLive() {
  var base = [
    ['MAS', 'Morning deal', '10:30', '12:30', 6.5, 1500000], ['MAS', 'Lunch show', '13:00', '15:00', 6.5, 2000000], ['MAS', 'Early show', '16:00', '18:30', 6.5, 2000000], ['MAS', 'Main show', '20:00', '24:00', 7, 3000000],
    ['MAH', 'Flash 1', '10:00', '11:30', 5.5, 1000000], ['MAH', 'Flash 2', '12:00', '13:30', 5.5, 1000000], ['MAH', 'Afternoon', '15:00', '16:30', 6, 1500000], ['MAH', 'Flash deal', '17:00', '18:00', 5.5, 1000000, 'failed'], ['MAH', 'Shift 1', '19:00', '21:30', 6, 2000000], ['MAH', 'Shift 2', '22:00', '24:00', 6, 1500000],
    ['MAO', 'Day block', '10:00', '13:00', 6.5, 2500000], ['MAO', 'Noon block', '13:30', '16:00', 6.5, 2500000], ['MAO', 'Prime', '16:30', '19:30', 6.5, 3000000], ['MAO', 'Night show', '20:00', '24:00', 6.5, 3000000]
  ];
  var out = [];
  base.forEach(function (b) { out.push(mkS(b[0], b[1], b[2], b[3], b[4], b[5], 0, b[6])); });
  base.forEach(function (b, i) { out.push(mkS(b[0], b[1], b[2], b[3], b[4], b[5], -1, b[6] === 'failed' ? null : null)); if (i % 3 !== 2) out.push(mkS(b[0], b[1], b[2], b[3], b[4], b[5], 1, null)); });
  return out;
}
function fresh() {
  return {
    rules: seedRules(), act: seedAct(), camp: seedCamp(), hist: [{ t: '06/11 09:12', who: 'Demo user', what: 'GMV Max · Chả cá', f: 'Budget', from: '₫2,000,000', to: '₫2,500,000' }],
    live: seedLive(), liveRules: [
      { id: 1, name: 'Raise budget when ROI beats target', desc: 'If ROI stays 15% above target for 20 minutes, raise the budget by 10%.', on: true },
      { id: 2, name: 'Lower ROI target after a slow start', desc: 'If orders are below plan after 45 minutes, lower the ROI target by 0.5.', on: true },
      { id: 3, name: 'Stop spending when budget is almost used', desc: 'At 95% of budget, stop raising bids and alert me.', on: false }
    ],
    tpls: [
      { id: 1, name: 'Main show', s: '20:00', e: '24:00', roi: 6.5, budget: 3000000 }, { id: 2, name: 'Flash deal', s: '17:00', e: '18:00', roi: 5.5, budget: 1000000 }, { id: 3, name: 'Lunch show', s: '12:00', e: '14:00', roi: 6, budget: 1500000 }
    ],
    pausedAll: false, liveMaster: true, tg: { summary: true, errors: true, cmds: true }, failedOpen: true, clock: NOW, lastSync: '20:22',
    ui: { ruleAcct: 'all', actF: 'all', per: 'today', perfAcct: 'all', liveDay: 0, liveView: 'day', liveFull: false, monDay: 0, monF: 'all', monSel: null, chart: 'spend', repPer: 'today', repAcct: 'all', findMode: 'weak', findAcct: 'all', findCost: 100000, findRoi: 5 }
  };
}
var S;
function load() { try { var j = localStorage.getItem(KEY); if (j) { S = JSON.parse(j); seq = 1000; return; } } catch (e) { } S = fresh(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
load();

/* ============ derived ============ */
function ruleMode(r) { return (S.pausedAll || !r.on) ? 'paused' : r.mode; }
function accName(id) { var a = ACC.filter(function (x) { return x.id === id; })[0]; return a ? a.name : id; }
function condPhrase(c) {
  var op = { '>': 'over', '<': 'under', '≥': 'at least', '≤': 'at most' }[c.o] || c.o, v = c.v;
  if (c.m === 'spend') return 'total spend is ' + op + ' ' + vnd(v);
  if (c.m === 'gmv') return 'GMV is ' + op + ' ' + vnd(v);
  if (c.m === 'roi') return 'ROI is ' + op + ' ' + (+v).toFixed(2);
  if (c.m === 'ctr') return 'CTR is ' + op + ' ' + v + '%';
  if (c.m === 'fall') return 'ROI has fallen ' + (c.o === '<' || c.o === '≤' ? 'for at most ' : 'for at least ') + v + ' days in a row';
  if (c.m === 'age') return 'the video was posted ' + (c.o === '>' || c.o === '≥' ? 'more than ' : 'in the last ') + v + ' days' + (c.o === '>' || c.o === '≥' ? ' ago' : '');
  return '';
}
function schedText(s) { return s.t === 'every' ? 'Every ' + s.n + ' min' : 'Daily ' + s.times.join(', '); }
function sentence(d) {
  var when = d.sched.t === 'every' ? 'Every ' + d.sched.n + ' minutes' : 'Every day at ' + d.sched.times.join(', ');
  var look = d.win === 1 ? 'today' : 'the last ' + d.win + ' days';
  var cs = d.cond.filter(function (c) { return c.v !== '' && c.v != null; }).map(condPhrase);
  var cond = cs.length ? cs.join(d.comb === 'or' ? ' or ' : ' and ') : 'any video';
  var lim = d.limit ? 'Up to ' + d.limit + ' videos per run.' : 'No limit on videos per run.';
  return when + ', look at ' + look + ' for each video across all campaigns. If ' + cond + ', ' + ACTS[d.act].ph + '. ' + lim;
}
function nowStr() { S.clock += 1; return hm(S.clock); }
function addAct(src, acct, text, st, extra) { var e = { t: nowStr(), src: src, acct: acct, text: text, st: st }; if (extra) for (var k in extra) e[k] = extra[k]; S.act.unshift(e); }
function sStatus(x) {
  if (x.ov === 'failed') return 'failed'; if (x.ov === 'off') return 'ended';
  if (x.d < 0) return 'ended'; if (x.d > 0) return 'planned';
  if (NOW < x.s) return 'planned'; if (NOW >= x.e) return 'ended'; return 'on';
}
function metrics(x) {
  var st = sStatus(x); if (st === 'planned' || st === 'failed') return { spend: 0, gmv: 0, orders: 0, views: 0 };
  if (x.m) return x.m;
  var r = rng(hstr(x.id + x.name)), frac = st === 'on' ? Math.min(0.95, Math.max(0.1, (NOW - x.s) / (x.e - x.s))) : 0.82 + r() * 0.16;
  var spend = Math.round(x.budget * frac / 1000) * 1000, roi = x.roi * (0.82 + r() * 0.45), gmv = Math.round(spend * roi / 1000) * 1000;
  x.m = { spend: spend, gmv: gmv, orders: Math.round(gmv / 195000), views: Math.round(spend / 95) };
  return x.m;
}
function daySessions(d) { return S.live.filter(function (x) { return x.d === d; }); }
function laName(id) { var a = LIVE_ACC.filter(function (x) { return x.id === id; })[0]; return a ? a.name : id; }

/* ============ shell ============ */
var route = { sec: 'video', page: 'overview', tab: 'overview' };
var VT = [['overview', 'grid', 'Overview'], ['rules', 'rules', 'Rules'], ['quick', 'bolt', 'Quick actions'], ['activity', 'activity', 'Activity'], ['performance', 'chart', 'Performance']];
var LT = [['schedule', 'cal', 'Schedule'], ['monitor', 'gauge', 'Monitor'], ['reports', 'doc', 'Reports'], ['rules', 'rules', 'Rules'], ['templates', 'tpl', 'Templates'], ['settings', 'cog', 'Settings']];
function parse() {
  var p = (location.hash.replace(/^#\/?/, '') || 'video/overview').split('/');
  var sec = p[0], page = p[1] || (sec === 'live' ? 'schedule' : 'overview'), sub = p[2] || '';
  if (['video', 'live', 'accounts', 'notifications', 'settings'].indexOf(sec) < 0) { sec = 'video'; page = 'overview'; }
  var tab = page; if (sec === 'video') { if (page === 'find') tab = 'performance'; if (page === 'new') tab = 'rules'; if (page === 'rules' && sub === 'new') tab = 'rules'; }
  route = { sec: sec, page: page, sub: sub, tab: tab };
}
function go(h) { if (location.hash === h) render(); else location.hash = h; }

function shell() {
  var nRules = S.rules.length;
  $('#side').innerHTML =
    '<div class="logo"><i>B</i><div><b>GMV Max</b><span>RULES</span></div></div>' +
    '<div class="ws"><i>D</i><div><b>Demo workspace</b><span>Advertising operations</span></div></div>' +
    '<div class="nav-h">GMV MAX</div>' +
    '<button class="nav-i' + (route.sec === 'video' ? ' on' : '') + '" data-go="#/video/overview">' + ic('film') + 'Video GMV Max<span class="n">' + nRules + '</span></button>' +
    '<button class="nav-i' + (route.sec === 'live' ? ' on' : '') + '" data-go="#/live/schedule">' + ic('radio') + 'LIVE GMV Max</button>' +
    '<div class="nav-h">SETUP</div>' +
    ['accounts|users|Accounts', 'notifications|bell|Notifications', 'settings|cog|Settings'].map(function (x) { x = x.split('|'); return '<button class="nav-i' + (route.sec === x[0] ? ' on' : '') + '" data-go="#/' + x[0] + '">' + ic(x[1]) + x[2] + '</button>'; }).join('') +
    '<div class="side-foot"><div class="safe-note">' + ic('shield') + 'Built for controlled actions</div><div class="user"><i>D</i><div><b>Demo user</b><span>Demo session</span></div></div></div>';

  var secName = { video: 'Video GMV Max', live: 'LIVE GMV Max', accounts: 'Accounts', notifications: 'Notifications', settings: 'Settings' }[route.sec];
  var pg = route.sec === 'video' || route.sec === 'live' ? ((route.sec === 'video' ? VT : LT).filter(function (t) { return t[0] === route.tab; })[0] || [0, 0, ''])[2] : '';
  $('#top').innerHTML =
    '<div class="m-logo"><i>B</i>GMV Max</div>' +
    '<div class="crumb">' + ic('rules').replace('<svg', '<svg width="16" height="16"') + 'Workspace<span class="sep">›</span>' + (pg ? secName + '<span class="sep">›</span><b>' + pg + '</b>' : '<b>' + secName + '</b>') + '</div>' +
    '<div class="top-r"><a class="link about" href="/gmvmax-tool">About this tool ' + ic('ext') + '</a><a class="btn hire sm" href="/">Hire me</a></div>';
  $('#banner').innerHTML = '<div class="banner"><span class="tag">DEMO</span><span>Sample data only. Nothing is sent to TikTok.</span><span class="sp"></span><button class="link" data-act="reset">' + ic('refresh') + 'Reset demo</button></div>';

  var tabs = route.sec === 'video' ? VT : route.sec === 'live' ? LT : null;
  $('#tabs').style.display = tabs ? '' : 'none';
  if (tabs) $('#tabs').innerHTML = tabs.map(function (t) {
    return '<button class="tab' + (route.tab === t[0] ? ' on' : '') + '" data-go="#/' + route.sec + '/' + t[0] + '">' + ic(t[1]) + t[2] + (t[0] === 'rules' && route.sec === 'video' ? '<span class="n">' + nRules + '</span>' : '') + '</button>';
  }).join('');

  $('#tabbar').innerHTML = [['video', 'film', 'Video', '#/video/overview'], ['live', 'radio', 'LIVE', '#/live/schedule'], ['accounts', 'users', 'Accounts', '#/accounts']].map(function (t) {
    return '<button class="tb' + (route.sec === t[0] ? ' on' : '') + '" data-go="' + t[3] + '">' + ic(t[1]) + t[2] + '</button>';
  }).join('') + '<button class="tb' + (route.sec === 'notifications' || route.sec === 'settings' ? ' on' : '') + '" data-act="more">' + ic('more') + 'More</button>';
}

/* ============ modal / toast ============ */
function modal(html) {
  $('#layer').innerHTML = '<div class="ov" data-act="ovclose"><div class="md" role="dialog" aria-modal="true">' + html + '</div></div>';
  var f = $('#layer .md input, #layer .md select, #layer .md button'); if (f) f.focus({ preventScroll: true });
}
function closeModal() { $('#layer').innerHTML = ''; }
var tt;
function toast(msg) { var t = $('#toast'); if (t) t.remove(); var d = document.createElement('div'); d.id = 'toast'; d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = msg; document.body.appendChild(d); clearTimeout(tt); tt = setTimeout(function () { d.remove(); }, 2600); }
function sw(on, act, id, label) { return '<button class="sw" role="switch" aria-checked="' + !!on + '" aria-label="' + esc(label) + '" data-act="' + act + '" data-id="' + id + '"></button>'; }
function badge(m) { var t = { live: 'Live', dry: 'Dry run', paused: 'Paused', failed: 'Failed', skip: 'Skipped', on: 'On', ended: 'Ended', planned: 'Planned' }[m] || m; return '<span class="badge b-' + m + '">' + t + '</span>'; }
function sel(id, opts, cur, extra) { return '<select class="sel" id="' + id + '" ' + (extra || '') + '>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(cur) ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
function head(eyebrow, title, sub, acts) { return '<div class="h1"><div><div class="eyebrow">' + eyebrow + '</div><h1>' + title + '</h1>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' + (acts ? '<div class="acts">' + acts + '</div>' : '') + '</div>'; }

/* ============ VIDEO: overview ============ */
function vOverview() {
  var live = S.act.filter(function (a) { return a.st === 'live'; }).length;
  var fails = S.act.filter(function (a) { return a.st === 'failed' && !a.done; });
  var f4 = S.rules.filter(function (r) { return !r.dryOk; })[0];
  var items = '';
  if (fails.length) items += '<button class="li" data-go="#/video/activity" data-f="failed"><span class="dot r"></span>' + fails.length + ' failed run' + (fails.length > 1 ? 's' : '') + ' need' + (fails.length > 1 ? '' : 's') + ' review' + ic('chev').replace('<svg', '<svg class="ar"') + '</button>';
  items += '<button class="li" data-go="#/accounts"><span class="dot a"></span>Nhà Xinh Decor is paused' + ic('chev').replace('<svg', '<svg class="ar"') + '</button>';
  if (f4) items += '<button class="li" data-act="rule" data-id="' + f4.id + '"><span class="dot a"></span>' + esc(f4.name) + ' needs a successful Dry run' + ic('chev').replace('<svg', '<svg class="ar"') + '</button>';
  if (S.pausedAll) items = '<div class="li"><span class="dot a"></span>All rules are paused</div>' + items;
  var today = S.rules.map(function (r) { return '<button class="li" data-act="rule" data-id="' + r.id + '"><div><b>' + esc(r.name) + '</b><div class="muted" style="font-size:12.5px">' + r.accts.length + ' account' + (r.accts.length > 1 ? 's' : '') + '</div></div><span class="r">' + schedText(r.sched) + '</span></button>'; }).join('');
  return head('Workspace overview', 'Today at a glance', 'See rule activity and anything that needs your attention.', '<button class="btn" data-act="pauseall">' + ic('pause') + (S.pausedAll ? 'Resume all rules' : 'Pause all rules') + '</button>') +
    '<div class="stats"><div class="card stat"><span>Runs today</span><b>' + (44 + S.act.length - 8) + '</b><small>Across all rules and accounts</small></div>' +
    '<div class="card stat"><span>Videos matched</span><b>122</b><small>Including Dry run matches</small></div>' +
    '<div class="card stat"><span>Live actions taken</span><b>' + (40 + live - 3) + '</b><small>Dry runs changed nothing</small></div>' +
    '<div class="card stat' + (fails.length ? ' bad' : '') + '"><span>Failed runs</span><b>' + fails.length + '</b><small>Review in Activity</small></div></div>' +
    '<div class="two"><div class="card"><div class="ch"><i>' + ic('alert') + '</i><div><b>Needs attention</b><span>Items that may stop expected actions.</span></div></div>' + items + '</div>' +
    '<div class="card"><div class="ch"><i>' + ic('clock') + '</i><div><b>Rules today</b><span>Schedules shown in workspace time.</span></div></div>' + today + '</div></div>' +
    '<p class="note">' + ic('shield') + 'Sample metrics for the design preview. No real TikTok actions are shown.</p>';
}

/* ============ VIDEO: rules ============ */
function vRules() {
  var rs = S.rules.filter(function (r) { return S.ui.ruleAcct === 'all' || r.accts.indexOf(S.ui.ruleAcct) >= 0; });
  var rows = rs.map(function (r) {
    var m = ruleMode(r);
    return '<div class="gr rules-g click" data-act="rule" data-id="' + r.id + '"><div class="rn"><i>' + ic('rules') + '</i><div><b>' + esc(r.name) + '</b><span class="d">' + esc(r.desc) + '</span></div></div>' +
      '<div data-l="Mode">' + badge(m) + '</div><div data-l="Accounts">' + r.accts.length + '</div><div data-l="Schedule">' + schedText(r.sched) + '</div>' +
      '<div data-l="Last run"><span>' + r.last + '<span class="d">' + r.st + '</span></span></div><div data-l="Result">Matched ' + r.matched + ' · Acted ' + r.acted + '</div>' +
      '<div data-act="noop">' + sw(r.on && !S.pausedAll, 'toggle', r.id, 'Turn ' + r.name + ' on or off') + '</div></div>';
  }).join('') || '<div class="pad muted">No rules for this account yet.</div>';
  return head('Automation', 'Rules', 'Clear conditions. Consistent decisions. You stay in control.', '<button class="btn pri" data-go="#/video/rules/new" data-reset-draft="1">' + ic('plus') + 'New rule</button>') +
    (S.pausedAll ? '<div class="banner" style="border-style:solid"><span class="tag">PAUSED</span><span>All rules are paused.</span><span class="sp"></span><button class="link" data-act="pauseall">Resume</button></div>' : '') +
    '<div class="card"><div class="ch" style="justify-content:space-between;flex-wrap:wrap"><div style="display:flex;gap:10px;align-items:center"><b style="font-size:15px">All rules</b><span class="chip">' + rs.length + '</span></div>' +
    '<label style="display:flex;gap:10px;align-items:center;color:var(--ink3)">Ad account ' + sel('ruleAcct', [['all', 'All accounts']].concat(ACC.map(function (a) { return [a.id, a.name]; })), S.ui.ruleAcct, 'data-ui="ruleAcct" style="width:auto"') + '</label></div>' +
    '<div class="gt"><div class="gh rules-g"><span>Name</span><span>Mode</span><span>Accounts</span><span>Schedule</span><span>Last run</span><span>Result</span><span>On/Off</span></div>' + rows + '</div></div>';
}
function ruleDetail(id) {
  var r = S.rules.filter(function (x) { return x.id == id; })[0]; if (!r) return;
  var m = ruleMode(r);
  modal('<div class="mh"><div><h3>' + esc(r.name) + '</h3><div class="muted">' + esc(r.desc) + '</div></div><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div>' +
    '<p style="font-size:15px;line-height:1.7;margin-bottom:12px">' + esc(sentence(r)) + '</p>' +
    '<div class="kv"><span>Mode</span>' + badge(m) + '</div><div class="kv"><span>Accounts</span><b>' + r.accts.map(accName).join(', ') + '</b></div><div class="kv"><span>Schedule</span><b>' + schedText(r.sched) + '</b></div><div class="kv"><span>Last run</span><b>' + r.last + ' · ' + r.st + '</b></div>' +
    (r.dryOk ? '' : '<p class="hint" style="margin-top:10px">This rule needs one successful Dry run before it can go Live.</p>') +
    '<div class="foot"><button class="btn danger sm" data-act="delrule" data-id="' + r.id + '">Delete</button><button class="btn sm" data-act="dryrun" data-id="' + r.id + '">' + ic('refresh') + 'Run a Dry run now</button>' +
    (r.mode === 'live' ? '<button class="btn sm" data-act="todry" data-id="' + r.id + '">Back to Dry run</button>' : '<button class="btn pri sm" data-act="golive" data-id="' + r.id + '"' + (r.dryOk ? '' : ' disabled') + '>Go Live…</button>') + '</div>');
}

/* ============ VIDEO: rule builder ============ */
var draft = null;
var STEPS = ['Start', 'Target', 'Conditions', 'Action', 'Schedule & limits', 'Accounts', 'Review'];
var PRESETS = {
  excl: { n: 'Exclude weak videos', d: 'Remove videos that spend a lot and return little.', win: 3, cond: [{ m: 'spend', o: '>', v: 50000 }, { m: 'roi', o: '<', v: 5 }], act: 'exclude' },
  boost: { n: 'Boost winners', d: 'Create a boost for videos that perform well and are not boosted.', win: 1, cond: [{ m: 'roi', o: '>', v: 8 }, { m: 'gmv', o: '>', v: 300000 }], act: 'create' },
  kill: { n: 'Kill wasteful boosts', d: 'Stop boosts that spend a lot and return little.', win: 1, cond: [{ m: 'spend', o: '>', v: 200000 }, { m: 'roi', o: '<', v: 3 }], act: 'kill' },
  blank: { n: 'Start from scratch', d: 'Empty rule, you set every condition.', win: 3, cond: [{ m: 'roi', o: '<', v: 5 }], act: 'alert' }
};
function newDraft() { return { step: 0, name: '', tpl: 'excl', win: 3, incToday: false, scope: 'all', cond: clone(PRESETS.excl.cond), comb: 'and', act: 'exclude', sched: { t: 'daily', times: ['08:00'] }, every: 60, limit: '', accts: [], tried: false }; }
function stepValid(i) { if (i === 0) return draft.name.trim().length > 0; if (i === 2) return draft.cond.length > 0; if (i === 5) return draft.accts.length > 0; return true; }
function vBuilder() {
  if (!draft) draft = newDraft();
  var d = draft, i = d.step;
  var steps = STEPS.map(function (s, k) {
    var cls = k === i ? 'now' : (k < i ? (stepValid(k) ? 'done' : 'bad') : (d.tried && !stepValid(k) ? 'bad' : 'todo'));
    var icon = cls === 'done' ? ic('check') : cls === 'bad' ? ic('alert') : cls === 'now' ? '<b style="font-size:12px">' + (k + 1) + '</b>' : (k + 1);
    return '<button class="st ' + cls + '" data-act="wstep" data-id="' + k + '"><i>' + icon + '</i>' + s + '</button>';
  }).join('') + '<div class="note" style="padding:10px;margin:8px 0 0;align-items:flex-start;border-top:1px solid var(--line2)">' + ic('shield') + '<span>Start with a dry run. See what would happen before a rule changes your ads.</span></div>';
  var body = '';
  if (i === 0) {
    body = '<h2>Start</h2><p class="sub">Name your rule and start from a template.</p>' +
      '<div class="fld"><label for="wname">Rule name</label><input class="inp" id="wname" data-b="name" maxlength="60" placeholder="e.g. Exclude weak videos" value="' + esc(d.name) + '">' + (d.tried && !d.name.trim() ? '<span class="err">Give the rule a name.</span>' : '') + '</div>' +
      '<div class="lbl" style="margin-bottom:8px">Template</div><div class="optc">' + Object.keys(PRESETS).map(function (k) { return '<button class="opt' + (d.tpl === k ? ' on' : '') + '" data-act="wtpl" data-id="' + k + '"><div><b>' + PRESETS[k].n + '</b><span>' + PRESETS[k].d + '</span></div></button>'; }).join('') + '</div>';
  } else if (i === 1) {
    body = '<h2>Target</h2><p class="sub">Choose which videos the rule looks at.</p><div class="optc">' +
      [['all', 'Every video in every active campaign', 'The rule looks at all videos that ran in the time window.'], ['unboosted', 'Only videos that are not boosted yet', 'Good for rules that create boosts.'], ['boosted', 'Only videos with an active boost', 'Good for rules that kill, raise or extend boosts.']].map(function (o) { return '<button class="opt' + (d.scope === o[0] ? ' on' : '') + '" data-act="wscope" data-id="' + o[0] + '"><div><b>' + o[1] + '</b><span>' + o[2] + '</span></div></button>'; }).join('') + '</div>';
  } else if (i === 2) {
    body = '<h2>Conditions</h2><p class="sub">Pick the time window, then set when a video should match.</p>' +
      '<div class="row2"><div class="fld"><label for="wwin">Days in the window</label><input class="inp" id="wwin" type="number" min="1" max="30" inputmode="numeric" data-b="win" value="' + d.win + '"></div><div class="fld"><label>Conditions combine with</label><div class="seg" style="margin:0"><button class="' + (d.comb === 'and' ? 'on' : '') + '" data-act="wcomb" data-id="and">AND</button><button class="' + (d.comb === 'or' ? 'on' : '') + '" data-act="wcomb" data-id="or">OR</button></div></div></div>' +
      '<div class="lbl" style="margin-bottom:8px">When should a video match?</div><div class="grp">' +
      d.cond.map(function (c, k) { return '<div class="cond">' + sel('cm' + k, Object.keys(METRICS).map(function (m) { return [m, METRICS[m].l]; }), c.m, 'data-c="' + k + '" data-k="m" aria-label="Metric"') + sel('co' + k, ['>', '<', '≥', '≤'].map(function (o) { return [o, o]; }), c.o, 'data-c="' + k + '" data-k="o" aria-label="Operator"') + '<input class="inp" type="number" inputmode="decimal" aria-label="Value" data-c="' + k + '" data-k="v" value="' + esc(c.v) + '"><button class="x" data-act="wdel" data-id="' + k + '" aria-label="Remove condition">' + ic('x') + '</button></div>'; }).join('') +
      '<button class="btn sm" data-act="wadd">' + ic('plus') + 'Add condition</button></div>' + (d.cond.length ? '' : '<span class="err">Add at least one condition.</span>');
  } else if (i === 3) {
    body = '<h2>Action</h2><p class="sub">What should happen to a matching video?</p><div class="acs">' + Object.keys(ACTS).map(function (k) { return '<button class="opt' + (d.act === k ? ' on' : '') + '" data-act="wact" data-id="' + k + '"><div><b>' + ACTS[k].l + '</b><span>' + ACTS[k].d + '</span></div></button>'; }).join('') + '</div>';
  } else if (i === 4) {
    body = '<h2>Schedule &amp; limits</h2><p class="sub">When should the rule run, and how far may it go?</p>' +
      '<div class="seg"><button class="' + (d.sched.t === 'daily' ? 'on' : '') + '" data-act="wsched" data-id="daily">Daily at a time</button><button class="' + (d.sched.t === 'every' ? 'on' : '') + '" data-act="wsched" data-id="every">Every N minutes</button></div>' +
      (d.sched.t === 'daily' ? '<div class="fld"><label for="wtime">Run at</label><input class="inp" id="wtime" type="time" data-b="time" value="' + d.sched.times[0] + '"></div>' : '<div class="fld"><label for="wevery">Run every (minutes)</label>' + sel('wevery', [[30, '30 minutes'], [60, '60 minutes'], [120, '2 hours'], [240, '4 hours']], d.sched.n, 'data-b="every"') + '</div>') +
      '<div class="fld"><label for="wlim">Per-run limit (videos)</label><input class="inp" id="wlim" type="number" min="1" inputmode="numeric" placeholder="No limit" data-b="limit" value="' + esc(d.limit) + '"><span class="hint">Leave empty for no limit. A limit keeps a new rule from touching too much at once.</span></div>';
  } else if (i === 5) {
    body = '<h2>Accounts</h2><p class="sub">Pick the ad accounts this rule may act on.</p>' +
      ACC.map(function (a) { return '<label class="chk"><input type="checkbox" data-acc="' + a.id + '"' + (d.accts.indexOf(a.id) >= 0 ? ' checked' : '') + '><span><b>' + a.name + '</b>' + (a.on ? '' : ' <span class="muted">· paused</span>') + '</span></label>'; }).join('') +
      ((d.tried || i > 5) && !d.accts.length ? '<span class="err">Select at least one ad account.</span>' : '');
  } else {
    var n = 3 + (hstr(sentence(prepared())) % 14), vs = POOL.slice(0, 5).map(function (v, k) { return POOL[(k * 3 + n) % POOL.length]; });
    var bad = STEPS.map(function (s, k) { return stepValid(k) ? null : s; }).filter(Boolean);
    body = '<h2>Review</h2><p class="sub">Check the rule, then save it as a Dry run.</p>' +
      '<div class="card pad" style="background:#F8FAFF;margin-bottom:14px"><p style="font-size:15.5px;line-height:1.75">' + esc(sentence(prepared())) + '</p></div>' +
      '<div class="lbl" style="margin-bottom:6px">Preview on current numbers: <span style="color:var(--blue)">would match ' + n + ' videos</span></div>' +
      '<div class="card" style="overflow:hidden">' + vs.map(function (v) { return '<div class="li" style="min-height:48px"><div style="min-width:0"><b style="font-size:13px">' + esc(v.title) + '</b><div class="mono muted" style="font-size:11.5px">' + v.id + '</div></div><span class="r">' + vnd(v.spend) + ' · ROI ' + v.roi.toFixed(2) + '</span></div>'; }).join('') + '</div>' +
      (bad.length ? '<p class="err" style="margin-top:12px">Fix before saving: ' + bad.join(', ') + '.</p>' : '<p class="hint" style="margin-top:12px">Saved as <b>Dry run</b>: it logs what it would do and changes nothing until you go Live.</p>');
  }
  var foot = '<div class="wz-foot"><button class="btn" data-act="wback"' + (i === 0 ? ' data-go="#/video/rules"' : '') + '>' + (i === 0 ? 'Cancel' : 'Back') + '</button>' + (i < 6 ? '<button class="btn pri" data-act="wnext">Continue ' + ic('chev') + '</button>' : '<button class="btn pri" data-act="wsave">Save as Dry run</button>') + '</div>';
  var p = prepared();
  return head('Rule builder', 'Create a new rule <span class="badge b-dry" style="vertical-align:middle;margin-left:6px">Dry run</span>', 'Build your logic. Preview the impact. Go Live when you\'re ready.', '<button class="btn" data-go="#/video/rules">' + ic('back') + 'Back to rules</button>') +
    '<div class="wiz"><div class="card steps">' + steps + '</div><div class="card wz-body">' + body + foot + '</div><div class="card sum" id="wsum">' + sumHtml(p) + '</div></div>';
}
function prepared() { var d = draft; return { win: Math.max(1, +d.win || 1), cond: d.cond, comb: d.comb, act: d.act, sched: d.sched.t === 'every' ? { t: 'every', n: +d.every || 60 } : d.sched, limit: d.limit }; }
function sumHtml(p) {
  var d = draft;
  return '<h3>Rule summary <small>Updates as you build</small></h3><p class="s">' + esc(sentence(p)) + '</p>' +
    '<div class="kv"><span>Mode</span>' + badge('dry') + '</div><div class="kv"><span>Accounts</span><b>' + (d.accts.length ? d.accts.length + ' selected' : 'Not selected') + '</b></div><div class="kv"><span>Schedule</span><b>' + schedText(p.sched) + '</b></div><div class="kv"><span>Per-run limit</span><b>' + (d.limit ? d.limit : 'No limit') + '</b></div>' +
    '<div class="note" style="background:#F6F8FD;border-radius:12px;padding:10px 12px">' + ic('shield') + '<span>Dry run shows what would happen. Your ads stay unchanged.</span></div>' +
    (d.accts.length ? '' : '<div style="margin-top:14px"><b style="font-size:14px">To complete your rule</b><br><button class="link" style="color:var(--red)" data-act="wstep" data-id="5">Select at least one ad account. ' + ic('chev') + '</button></div>');
}

/* ============ VIDEO: quick actions ============ */
var qa = { step: 1, acct: 'a1', mode: 'ids', ids: '', rule: 1, act: 'create', err: '', res: null };
function parseIds(t) { var seen = {}, out = [], bad = 0; String(t).split(/[\s,;]+/).forEach(function (x) { if (!x) return; if (!/^\d{6,22}$/.test(x)) { bad++; return; } if (!seen[x]) { seen[x] = 1; out.push(x); } }); return { ids: out.slice(0, 200), bad: bad, cut: out.length > 200 }; }
function effect(v, act) {
  if (act === 'exclude') return ['Exclude from campaign', 1];
  if (act === 'create') return v.boosted ? ['Skipped: already boosted', 0] : ['Create boost · ₫300,000/day · 7 days', 1];
  if (act === 'kill') return v.boosted ? ['Kill boost, video stays', 1] : ['Skipped: no active boost', 0];
  if (act === 'raise') return v.boosted ? ['Raise budget +20% (' + vnd(300000) + ' → ' + vnd(360000) + ')', 1] : ['Skipped: no active boost', 0];
  if (act === 'extend') return v.boosted ? ['Extend boost by 7 days', 1] : ['Skipped: no active boost', 0];
  return ['Alert only', 0];
}
function vQuick() {
  var sMark = function (n, t) { return '<div class="q ' + (qa.step === n ? 'on' : qa.step > n ? 'done' : '') + '"><span class="n">' + (qa.step > n ? '✓' : n) + '</span>' + t + '</div>'; };
  var stepper = '<div class="qs">' + sMark(1, 'Choose') + '<span class="ln"></span>' + sMark(2, 'Check') + '<span class="ln"></span>' + sMark(3, 'Send') + '</div>';
  var h = head('Video GMV Max', 'Quick actions', 'Act on videos now, or run a rule once. You check every change before anything is sent to TikTok.');
  if (qa.step === 1) {
    return h + stepper + '<div class="card pad" style="max-width:860px">' +
      '<div class="fld"><label for="qacct"><b>1</b> · Ad account</label>' + sel('qacct', ACC.filter(function (a) { return a.on; }).map(function (a) { return [a.id, a.name]; }), qa.acct, 'data-q="acct"') + '</div>' +
      '<div class="lbl" style="margin-bottom:8px">2 · Which videos?</div><div class="seg"><button class="' + (qa.mode === 'ids' ? 'on' : '') + '" data-act="qmode" data-id="ids">Video IDs</button><button class="' + (qa.mode === 'rule' ? 'on' : '') + '" data-act="qmode" data-id="rule">Run a rule once</button></div>' +
      (qa.mode === 'ids' ? '<p class="hint" style="margin-bottom:8px">Act on exactly these videos. No conditions are checked.</p><div class="fld"><label for="qids">Video IDs</label><textarea class="ta" id="qids" data-q="ids" placeholder="Paste IDs: one per line, or separated by commas or spaces">' + esc(qa.ids) + '</textarea><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span class="hint">Up to 200. Each video is found in the active campaigns and products it ran in over the last 7 days.</span><button class="link" data-act="qsample">Use sample IDs</button></div></div>' : '<div class="fld"><label for="qrule">Rule</label>' + sel('qrule', S.rules.map(function (r) { return [r.id, r.name]; }), qa.rule, 'data-q="rule"') + '<span class="hint">The rule runs once now, with its own conditions. Nothing is saved to its schedule.</span></div>') +
      '<div class="lbl" style="margin:6px 0 8px">3 · What should happen?</div><div class="acs">' + ['create', 'kill', 'raise', 'extend', 'exclude'].map(function (k) { return '<button class="opt' + (qa.act === k ? ' on' : '') + '" data-act="qact" data-id="' + k + '"><i style="color:var(--blue);display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--bw);flex:none">' + ic(ACTS[k].ic).replace('<svg', '<svg width="18" height="18"') + '</i><div><b>' + ACTS[k].l + '</b><span>' + ACTS[k].d + '</span></div></button>'; }).join('') + '</div>' +
      (qa.err ? '<p class="err" style="margin-top:12px">' + qa.err + '</p>' : '') +
      '<div class="wz-foot"><span></span><button class="btn pri" data-act="qcheck">Preview ' + ic('chev') + '</button></div></div>';
  }
  if (qa.step === 2) {
    var list = qa.vids, n = 0, sk = 0;
    var rows = list.map(function (v) { var e = effect(v, qa.act); if (e[1]) n++; else sk++; return '<div class="gr find-g" style="grid-template-columns:minmax(0,1.6fr) 1fr .8fr 1.6fr"><div><b style="font-size:13px">' + esc(v.title) + '</b><span class="d mono">' + v.id + '</span></div><div data-l="Spend">' + vnd(v.spend) + '</div><div data-l="ROI"><span class="roi ' + (v.roi >= 6 ? 'g' : v.roi < 3 ? 'r' : '') + '">' + v.roi.toFixed(2) + '</span></div><div data-l="Will happen" style="' + (e[1] ? '' : 'color:var(--ink3)') + '">' + e[0] + '</div></div>'; }).join('');
    return h + stepper + '<div class="card"><div class="ch" style="justify-content:space-between;flex-wrap:wrap"><div><b>' + n + ' will change · ' + sk + ' skipped</b><span>' + accName(qa.acct) + ' · ' + ACTS[qa.act].l + '</span></div><span class="badge b-dry">Preview only</span></div><div class="gt"><div class="gh find-g" style="grid-template-columns:minmax(0,1.6fr) 1fr .8fr 1.6fr"><span>Video</span><span>Spend</span><span>ROI</span><span>What will happen</span></div>' + rows + '</div>' +
      '<div class="wz-foot" style="padding:16px 20px"><button class="btn" data-act="qback">' + ic('back') + 'Back</button><button class="btn pri" data-act="qsend"' + (n ? '' : ' disabled') + '>Send to TikTok (sample)</button></div></div>';
  }
  return h + stepper + '<div class="card ok"><i>' + ic('check') + '</i><h2 style="letter-spacing:-.02em">Done — ' + qa.res.n + ' change' + (qa.res.n === 1 ? '' : 's') + ' sent</h2><p class="muted" style="max-width:48ch;margin:8px auto 18px">This is the demo, so nothing reached TikTok. In a real workspace each action is sent once, with an idempotency key, and logged in Activity.</p><div class="acts" style="justify-content:center"><button class="btn pri" data-go="#/video/activity">View in Activity</button><button class="btn" data-act="qreset">Do another</button></div></div>';
}

/* ============ VIDEO: activity ============ */
function vActivity() {
  var f = S.ui.actF, list = S.act.filter(function (a) { return f === 'all' || (f === 'failed' ? a.st === 'failed' && !a.done : a.st === f); });
  var chips = [['all', 'All'], ['live', 'Live'], ['dry', 'Dry run'], ['failed', 'Failed'], ['skip', 'Skipped']].map(function (c) { return '<button class="chip' + (f === c[0] ? ' on' : '') + '" data-act="actf" data-id="' + c[0] + '">' + c[1] + '</button>'; }).join('');
  var rows = list.map(function (a, i) { return '<div class="gr act-g' + (a.st === 'failed' ? ' click' : '') + '"' + (a.st === 'failed' ? ' data-act="failed" data-id="' + (a.id || '') + '"' : '') + '><span class="mono muted">' + a.t + '</span><div><b>' + esc(a.src) + '</b><span class="d">' + esc(a.text) + '</span></div><span class="muted" data-l="Account">' + esc(a.acct) + '</span><span>' + badge(a.done ? 'skip' : a.st) + '</span></div>'; }).join('') || '<div class="pad muted">Nothing here yet.</div>';
  return head('Automation', 'Activity', 'Every run and every action, with the reason.', '') + '<div class="pills" style="margin-bottom:14px">' + chips + '</div><div class="card"><div class="gt"><div class="gh act-g"><span>Time</span><span>What happened</span><span>Account</span><span>Result</span></div>' + rows + '</div></div>';
}

/* ============ VIDEO: performance + find ============ */
var PER = { today: ['Today', 1], yesterday: ['Yesterday', 1.15], '7d': ['Last 7 days', 6.4], month: ['This month', 21], last: ['Last month', 28], custom: ['Custom', 3] };
function vPerf() {
  var k = PER[S.ui.per][1], cs = S.camp.filter(function (c) { return S.ui.perfAcct === 'all' || c.acct === accName(S.ui.perfAcct); });
  var tc = 0, tg = 0, to = 0; cs.forEach(function (c) { tc += c.cost * k; tg += c.gmv * k; to += c.orders * k; });
  var roi = tc ? tg / tc : 0, maxC = Math.max.apply(null, cs.map(function (c) { return c.cost * k; }).concat([1]));
  var rows = cs.map(function (c) {
    var cost = c.cost * k, g = c.gmv * k, r = cost ? g / cost : 0;
    return '<div class="gr perf-g"><div><b>' + esc(c.name) + '</b><span class="d mono">ID ' + c.cid + ' · ' + esc(c.acct) + '</span><button class="btn sm" style="margin-top:8px;color:var(--blue)" data-act="budget" data-id="' + c.id + '">' + ic('doc').replace('<svg', '<svg width="14" height="14"') + 'Budget / ROI</button></div>' +
      '<div data-l="Cost" style="text-align:right">' + vnd(cost) + '<div class="bar"><i style="width:' + Math.round(cost / maxC * 100) + '%"></i></div></div><div data-l="GMV" style="text-align:right">' + vnd(g) + '</div><div data-l="ROI"><span class="roi' + (r >= c.roiT ? ' g' : '') + '">' + (r ? r.toFixed(2) : '–') + '</span></div><div data-l="Orders" style="text-align:right">' + Math.round(c.orders * k) + '</div><div data-l="CTR" style="text-align:right">' + (c.ctr ? c.ctr + '%' : '–') + '</div><div data-l="6s view rate" style="text-align:right">' + (c.vr ? c.vr + '%' : '–') + '</div></div>';
  }).join('');
  return head('Reporting', 'Performance', 'Campaigns and products that spent or sold in the chosen dates.', '<button class="btn pri" data-go="#/video/find">' + ic('search') + 'Find videos</button><button class="btn" data-act="hist">' + ic('hist') + 'Change history</button>') +
    '<div class="card"><div class="pad"><div class="pills">' + Object.keys(PER).map(function (p) { return '<button class="pill' + (S.ui.per === p ? ' on' : '') + '" data-act="per" data-id="' + p + '">' + PER[p][0] + '</button>'; }).join('') + '</div>' +
    '<div class="fld" style="margin:14px 0 0;max-width:420px"><label for="pacct" class="sr">Accounts</label>' + sel('pacct', [['all', 'All accounts (' + ACC.length + ')']].concat(ACC.map(function (a) { return [a.id, a.name]; })), S.ui.perfAcct, 'data-ui="perfAcct"') + '</div></div>' +
    '<div class="hero-dark"><div><small>GMV</small><div class="big">' + vnd(tg) + '</div><span class="roi">ROI ' + roi.toFixed(2) + '</span></div><div class="kp"><div><small>COST</small><b>' + vnd(tc) + '</b></div><div><small>ORDERS (SKU)</small><b>' + Math.round(to) + '</b></div><div><small>CTR</small><b>3.1%</b></div><div><small>6S VIEW RATE</small><b>16%</b></div></div></div>' +
    '<div class="gt"><div class="gh perf-g"><span>Campaign</span><span style="text-align:right">Cost</span><span style="text-align:right">GMV</span><span>ROI</span><span style="text-align:right">Orders (SKU)</span><span style="text-align:right">CTR</span><span style="text-align:right">6s view rate</span></div>' + rows + '</div></div>';
}
var findSel = {};
function vFind() {
  var u = S.ui, weak = u.findMode === 'weak';
  var list = POOL.filter(function (v) { return weak ? (v.spend >= u.findCost && v.roi < u.findRoi) : (v.roi >= u.findRoi && v.spend >= u.findCost / 2 && !v.boosted); });
  var n = list.filter(function (v) { return findSel[v.id]; }).length;
  var rows = list.map(function (v) { return '<label class="gr find-g" style="cursor:pointer"><input type="checkbox" data-fs="' + v.id + '"' + (findSel[v.id] ? ' checked' : '') + ' style="width:20px;height:20px;accent-color:var(--blue)" aria-label="Select video"><div><b style="font-size:13px">' + esc(v.title) + '</b><span class="d mono">' + v.id + '</span></div><div data-l="Spend">' + vnd(v.spend) + '</div><div data-l="GMV">' + vnd(v.gmv) + '</div><div data-l="ROI"><span class="roi ' + (v.roi >= 6 ? 'g' : v.roi < 3 ? 'r' : '') + '">' + v.roi.toFixed(2) + '</span></div><div data-l="Boost">' + (v.boosted ? 'Boosted' : 'Not boosted') + '</div></label>'; }).join('') || '<div class="pad muted">No videos match these filters. Try a lower spend or a different ROI.</div>';
  return head('Reporting', 'Find videos', 'Filter by performance, then send the result straight to Quick actions.', '<button class="btn" data-go="#/video/performance">' + ic('back') + 'Back to Performance</button>') +
    '<div class="card pad" style="margin-bottom:14px"><div class="seg" style="max-width:420px"><button class="' + (weak ? 'on' : '') + '" data-act="fmode" data-id="weak">Weak videos</button><button class="' + (!weak ? 'on' : '') + '" data-act="fmode" data-id="win">Winning videos</button></div>' +
    '<div class="row2"><div class="fld"><label for="fcost">Spent at least (₫)</label><input class="inp" id="fcost" type="number" inputmode="numeric" step="10000" data-ui="findCost" value="' + u.findCost + '"></div><div class="fld"><label for="froi">ROI ' + (weak ? 'below' : 'at least') + '</label><input class="inp" id="froi" type="number" inputmode="decimal" step="0.5" data-ui="findRoi" value="' + u.findRoi + '"></div></div></div>' +
    '<div class="card"><div class="ch" style="justify-content:space-between;flex-wrap:wrap"><div><b>' + list.length + ' video' + (list.length === 1 ? '' : 's') + ' found</b><span>' + n + ' selected · last 7 days</span></div><button class="btn pri" data-act="fsend"' + (n ? '' : ' disabled') + '>Send ' + n + ' to Quick actions ' + ic('chev') + '</button></div><div class="gt"><div class="gh find-g"><span></span><span>Video</span><span>Spend</span><span>GMV</span><span>ROI</span><span>Boost</span></div>' + rows + '</div></div>';
}

/* ============ LIVE: schedule ============ */
function vSchedule() {
  var u = S.ui, d = u.liveDay, full = u.liveFull, h0 = full ? 0 : 10, h1 = 24, span = (h1 - h0) * 60;
  var hrs = ''; for (var h = h0; h <= h1; h += 2) hrs += '<span style="left:' + ((h - h0) / (h1 - h0) * 100) + '%">' + pad(h % 24 === 0 && h > 0 ? 24 : h) + 'h</span>';
  var ses = daySessions(d);
  var lanes = LIVE_ACC.map(function (a) {
    var mine = ses.filter(function (x) { return x.acct === a.id; });
    var blocks = a.perm ? mine.map(function (x) {
      var st = sStatus(x), l = Math.max(0, (x.s - h0 * 60) / span * 100), w = Math.min(100 - l, (x.e - Math.max(x.s, h0 * 60)) / span * 100); if (x.e <= h0 * 60) return '';
      var sub = st === 'on' ? 'On · ROI ' + x.roi + ' · ' + trf(x.budget) : st === 'ended' ? 'Ended' : st === 'failed' ? 'Failed · see Monitor' : 'Planned · ROI ' + x.roi;
      return '<button class="ss ' + st + '" style="left:' + l + '%;width:' + w + '%" data-act="sess" data-id="' + x.id + '" title="' + esc(x.name) + '"><b>' + hm24(x.s) + '–' + hm24(x.e) + '</b><span>' + esc(x.name) + '</span><span>' + sub + '</span></button>';
    }).join('') : '';
    return '<div class="tl-r"><div class="tl-n"><b>' + a.name + '</b><small>' + a.sub + '</small></div><div class="tl-l' + (a.perm ? '' : ' dis') + '" data-lane="' + a.id + '" style="background-size:' + (100 / ((h1 - h0) / 1)) + '% 100%">' + blocks + (d === 0 && NOW > h0 * 60 ? '<i class="now-l" style="left:' + ((NOW - h0 * 60) / span * 100) + '%"></i>' : '') + '</div></div>';
  }).join('');
  var vgrid = vGrid(ses, h0, h1, d);
  var timeline = vgrid + '<div class="tl-wrap tl-desk"><div class="tl"><div class="tl-h"><div></div><div class="tl-hrs">' + hrs + '</div></div>' + lanes + '</div></div>';
  var week = '<div class="wk">' + [0, 1, 2, 3, 4, 5, 6].map(function (k) {
    var dd = d + k - ((new Date(2026, 10, 6 + d).getDay() + 6) % 7), list = daySessions(dd).sort(function (a, b) { return a.s - b.s; });
    return '<div class="wkc"><h4>' + wday(dd) + ' ' + dstr(dd) + '</h4>' + (list.length ? list.slice(0, 8).map(function (x) { return '<button class="ss ' + sStatus(x) + '" data-act="sess" data-id="' + x.id + '"><b>' + hm24(x.s) + '–' + hm24(x.e) + '</b><span>' + esc(laName(x.acct)) + ' · ' + esc(x.name) + '</span></button>'; }).join('') + (list.length > 8 ? '<span class="hint">+' + (list.length - 8) + ' more</span>' : '') : '<span class="hint">No campaigns</span>') + '</div>';
  }).join('') + '</div>';
  var cnt = ses.length;
  return '<div class="sched">' + head('LIVE GMV Max', 'Schedule', 'One LIVE campaign per TikTok account at a time. When a campaign starts, the tool turns the account\'s previous campaign off, then creates the new one.', '<button class="btn" data-act="copyday">' + ic('copy') + 'Copy day</button><button class="btn pri" data-act="newlive">' + ic('plus') + 'Create campaign</button>') +
    '<details class="card" style="margin-bottom:16px"><summary style="padding:16px 18px;font-weight:600;cursor:pointer;min-height:44px">How it works</summary><div style="padding:0 18px 16px;color:var(--ink2)">Fill the calendar once. At start time the app creates the campaign on that TikTok account; at the end time it switches it off. Click an empty time to create a campaign there; click a campaign to edit it, turn it on or off, or delete a planned one.</div></details>' +
    '<div class="card"><div class="pad" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><div class="seg" style="margin:0;width:150px"><button class="' + (u.liveView === 'day' ? 'on' : '') + '" data-act="lview" data-id="day">Day</button><button class="' + (u.liveView === 'week' ? 'on' : '') + '" data-act="lview" data-id="week">Week</button></div>' +
    '<button class="btn sm" data-act="lnav" data-id="-1" aria-label="Previous">' + ic('back') + '</button><b style="min-width:120px;text-align:center">' + (d === 0 ? 'Today' : wday(d)) + '<span class="dsk"> · ' + dstr(d) + '</span></b><button class="btn sm" data-act="lnav" data-id="1" aria-label="Next">' + ic('chev') + '</button></div>' +
    '<div class="sync-g" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="muted" style="color:var(--green)" id="syncmsg">✓ Synced ' + S.lastSync + ' · nothing new</span><button class="btn sm" data-act="sync">' + ic('refresh') + 'Sync from TikTok</button></div></div>' +
    (u.liveView === 'day' ? '<div style="padding:0 20px 8px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><span class="hint">' + cnt + ' campaign' + (cnt === 1 ? '' : 's') + ' · showing ' + (full ? '00h–24h' : '10h–24h<span class="dsk">, the busy hours</span>') + '</span><button class="link" data-act="lfull">' + (full ? 'Focus on busy hours' : 'Show the full day') + '</button></div>' + timeline + '<div style="padding:0 20px 18px"><div class="legend"><span><i style="background:#CDEFD9"></i>On</span><span><i style="background:#E3ECFF"></i>Planned</span><span><i style="background:#EAEDF3"></i>Ended</span><span><i style="background:#FDE3E4"></i>Failed</span><span><i style="background:#D12B2B;width:3px"></i>Now 20:22</span></div><p class="hint" style="margin-top:10px">Click an empty time to create a campaign there.</p></div>' : week + '<p class="hint" style="padding:0 20px 18px">Click a campaign for details.</p>') + '</div></div>';
}
function vGrid(ses, h0, h1, d) {
  var RH = 44, accs = LIVE_ACC.filter(function (a) { return a.perm; }), n = h1 - h0;
  var labels = ''; for (var h = h0; h <= h1; h++) if (h === h0 || h % 2 === 0) labels += '<span style="top:' + ((h - h0) * RH) + 'px">' + pad(h) + 'h</span>';
  var cols = accs.map(function (a) {
    var blocks = ses.filter(function (x) { return x.acct === a.id && x.e > h0 * 60; }).map(function (x) {
      var st = sStatus(x), top = (Math.max(x.s, h0 * 60) - h0 * 60) / 60 * RH, hgt = (x.e - Math.max(x.s, h0 * 60)) / 60 * RH - 2;
      var sub = st === 'on' ? 'On · ROI ' + x.roi : st === 'ended' ? 'Ended' : st === 'failed' ? 'Failed' : 'Planned · ROI ' + x.roi;
      return '<button class="ss ' + st + '" style="top:' + top.toFixed(1) + 'px;height:' + hgt.toFixed(1) + 'px" data-act="sess" data-id="' + x.id + '"><b>' + hm24(x.s) + '–' + hm24(x.e) + '</b><span>' + esc(x.name) + '</span>' + (hgt > 62 ? '<span>' + sub + '</span>' : '') + '</button>';
    }).join('');
    return '<div class="vg-c" data-lane="' + a.id + '" data-v="1" style="height:' + (n * RH) + 'px">' + blocks + '</div>';
  }).join('');
  var now = d === 0 && NOW > h0 * 60 ? '<i class="vg-now" style="top:' + ((NOW - h0 * 60) / 60 * RH) + 'px"></i>' : '';
  return '<div class="vg"><div class="vg-h"><span></span>' + accs.map(function (a) { return '<b>' + a.id + '<small>' + a.name.replace('Mộc An ', '') + '</small></b>'; }).join('') + '</div><div class="vg-b"><div class="vg-t" style="height:' + (n * RH) + 'px">' + labels + '</div>' + cols + now + '</div></div>';
}
function sessModal(id) {
  var x = S.live.filter(function (s) { return s.id === id; })[0]; if (!x) return;
  var st = sStatus(x);
  modal('<div class="mh"><div><h3>' + esc(x.name) + '</h3><div class="muted">' + laName(x.acct) + ' · ' + dstr(x.d) + ' · ' + hm24(x.s) + '–' + hm24(x.e) + '</div></div><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div>' +
    '<div class="kv"><span>Status</span>' + badge(st) + '</div><div class="kv"><span>ROI target</span><b>' + x.roi + '</b></div><div class="kv"><span>Budget</span><b>' + vnd(x.budget) + '</b></div>' +
    (st === 'failed' ? '<p class="err" style="margin-top:10px">Could not be created on TikTok: sample error “account budget below minimum”. In a real workspace the tool retries, then alerts you on Telegram.</p>' : '') +
    '<div class="foot">' + (st === 'planned' ? '<button class="btn danger sm" data-act="sdel" data-id="' + x.id + '">Delete</button>' : '') + '<button class="btn sm" data-act="sedit" data-id="' + x.id + '">Edit</button>' + (st === 'on' ? '<button class="btn sm" data-act="soff" data-id="' + x.id + '">' + ic('power') + 'Turn off</button>' : '') + (st === 'planned' && x.d === 0 ? '<button class="btn pri sm" data-act="son" data-id="' + x.id + '">Start now</button>' : '') + (st === 'failed' ? '<button class="btn pri sm" data-act="sretry" data-id="' + x.id + '">Retry</button>' : '') + '<button class="btn sm" data-go="#/live/monitor" data-act="close" data-mon="' + x.id + '">Open in Monitor</button></div>');
}
function liveForm(x, pre) {
  var v = x || pre || {};
  modal('<div class="mh"><div><h3>' + (x ? 'Edit campaign' : 'Create LIVE campaign') + '</h3><div class="muted">One LIVE campaign per TikTok account at a time.</div></div><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div>' +
    '<div class="fld"><label for="lf-acct">TikTok account</label>' + sel('lf-acct', LIVE_ACC.filter(function (a) { return a.perm; }).map(function (a) { return [a.id, a.name]; }), v.acct || 'MAS') + '</div>' +
    '<div class="fld"><label for="lf-name">Campaign name</label><input class="inp" id="lf-name" maxlength="40" value="' + esc(v.name || 'Main show') + '"></div>' +
    '<div class="row2"><div class="fld"><label for="lf-s">Start</label><input class="inp" id="lf-s" type="time" value="' + hm(v.s != null ? v.s : tm('21:00')) + '"></div><div class="fld"><label for="lf-e">End</label><input class="inp" id="lf-e" type="time" value="' + (v.e != null ? hm24(v.e) : '23:00') + '"></div></div>' +
    '<div class="row2"><div class="fld"><label for="lf-r">ROI target</label><input class="inp" id="lf-r" type="number" step="0.1" inputmode="decimal" value="' + (v.roi || 6.5) + '"></div><div class="fld"><label for="lf-b">Budget (₫)</label><input class="inp" id="lf-b" type="number" step="100000" inputmode="numeric" value="' + (v.budget || 2000000) + '"></div></div>' +
    '<p class="err" id="lf-err" role="alert"></p><div class="foot"><button class="btn" data-act="close">Cancel</button><button class="btn pri" data-act="lsave" data-id="' + (x ? x.id : '') + '" data-d="' + (x ? x.d : S.ui.liveDay) + '">' + (x ? 'Save' : 'Create campaign') + '</button></div>');
}

/* ============ LIVE: monitor ============ */
function series(x, kind) {
  var m = metrics(x), st = sStatus(x), end = st === 'on' ? NOW : Math.min(x.e, 1440), n = Math.max(4, Math.floor((end - x.s) / 15)), r = rng(hstr(x.id)), out = [], acc = 0;
  for (var i = 1; i <= n; i++) { acc += 0.5 + r(); out.push(acc); }
  var tot = acc; return out.map(function (v) { var f = v / tot; return kind === 'spend' ? m.spend * f : kind === 'gmv' ? m.gmv * f : (m.spend ? m.gmv / m.spend : 0) * (0.85 + 0.3 * f * (0.6 + r() * 0.8)); });
}
function chartSvg(x, kind) {
  var pts = series(x, kind); if (pts.length < 2) return '<p class="hint">Not enough data yet.</p>';
  var W = 640, H = 190, mx = Math.max.apply(null, pts) * 1.1, tgt = kind === 'roi' ? x.roi : (kind === 'spend' ? x.budget : 0);
  if (kind === 'spend') mx = Math.max(mx, x.budget * 1.05);
  var xy = pts.map(function (v, i) { return [30 + i / (pts.length - 1) * (W - 40), H - 24 - v / mx * (H - 40)]; });
  var line = xy.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  var area = line + ' L' + xy[xy.length - 1][0].toFixed(1) + ' ' + (H - 24) + ' L30 ' + (H - 24) + ' Z';
  var ty = tgt ? H - 24 - tgt / mx * (H - 40) : null;
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + kind + ' chart"><defs><linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F5BF5" stop-opacity=".22"/><stop offset="1" stop-color="#1F5BF5" stop-opacity="0"/></linearGradient></defs>' +
    [0, 1, 2, 3].map(function (g) { var y = 16 + g * (H - 40) / 3; return '<line x1="30" x2="' + (W - 10) + '" y1="' + y + '" y2="' + y + '" stroke="#EEF2F9"/>'; }).join('') +
    '<path d="' + area + '" fill="url(#gA)"/><path d="' + line + '" fill="none" stroke="#1F5BF5" stroke-width="2.5" stroke-linejoin="round"/>' +
    (ty != null ? '<line x1="30" x2="' + (W - 10) + '" y1="' + ty + '" y2="' + ty + '" stroke="#1E9B63" stroke-dasharray="5 4"/><text x="' + (W - 12) + '" y="' + (ty - 5) + '" text-anchor="end" font-size="11" fill="#1E9B63">' + (kind === 'roi' ? 'target ' + tgt : 'budget ' + trf(tgt)) + '</text>' : '') +
    '<text x="30" y="' + (H - 6) + '" font-size="11" fill="#97A1B6">' + hm(x.s) + '</text><text x="' + (W - 10) + '" y="' + (H - 6) + '" text-anchor="end" font-size="11" fill="#97A1B6">' + (sStatus(x) === 'on' ? 'now ' + hm(NOW) : hm24(x.e)) + '</text></svg>';
}
function vMonitor() {
  var u = S.ui, d = u.monDay, all = daySessions(d).filter(function (x) { return LIVE_ACC.filter(function (a) { return a.id === x.acct; })[0].perm; }).sort(function (a, b) { return b.s - a.s; });
  var F = u.monF, list = all.filter(function (x) { var s = sStatus(x); return F === 'all' || (F === 'look' ? (s === 'failed' || (s === 'on' && metrics(x).spend > x.budget * 0.8)) : F === s); });
  var sel_ = all.filter(function (x) { return x.id === u.monSel; })[0] || list[0] || all[0];
  var on = all.filter(function (x) { return sStatus(x) === 'on'; }), sp = 0, gm = 0, od = 0; all.forEach(function (x) { var m = metrics(x); sp += m.spend; gm += m.gmv; od += m.orders; });
  var cnt = function (f) { return all.filter(function (x) { var s = sStatus(x); return f === 'all' || (f === 'look' ? (s === 'failed' || (s === 'on' && metrics(x).spend > x.budget * 0.8)) : f === s); }).length; };
  var chips = [['all', 'All'], ['look', 'Needs a look'], ['on', 'On'], ['planned', 'Planned'], ['ended', 'Ended']].map(function (c) { return '<button class="chip' + (c[0] === 'look' ? ' warn' : '') + (F === c[0] ? ' on' : '') + '" data-act="monf" data-id="' + c[0] + '">' + c[1] + ' ' + cnt(c[0]) + '</button>'; }).join(' ');
  var cards = list.map(function (x) {
    var s = sStatus(x), m = metrics(x), roi = m.spend ? m.gmv / m.spend : 0, near = s === 'on' && m.spend > x.budget * 0.8;
    return '<button class="sc ' + s + (sel_ && sel_.id === x.id ? ' sel' : '') + '" data-act="monsel" data-id="' + x.id + '"><div class="t"><div><b>' + laName(x.acct) + '</b><small>' + esc(x.name) + ' · ' + hm24(x.s) + '–' + hm24(x.e) + '</small></div>' + badge(s) + '</div>' +
      (s === 'planned' ? '<small style="margin-top:6px">Starts at ' + hm(x.s) + ' · ROI target ' + x.roi + '</small>' : s === 'failed' ? '<span class="warn r">' + ic('alert').replace('<svg', '<svg width="14" height="14"') + 'Could not be created on TikTok</span>' : '<div class="m"><span>ROI<b style="color:' + (roi >= x.roi ? '#17794A' : '#A35A06') + '">' + roi.toFixed(2) + '</b></span><span>GMV<b>' + trf(m.gmv) + '</b></span><span>Orders<b>' + m.orders + '</b></span></div>' + (near ? '<span class="warn">' + ic('alert').replace('<svg', '<svg width="14" height="14"') + 'Budget almost used</span>' : '')) + '</button>';
  }).join('') || '<p class="muted">No campaigns here.</p>';
  var det = '<div class="card pad"><p class="muted">Select a campaign to see its numbers.</p></div>';
  if (sel_) {
    var s2 = sStatus(sel_), m2 = metrics(sel_), roi2 = m2.spend ? m2.gmv / m2.spend : 0, rp = Math.min(100, roi2 / (sel_.roi * 1.4) * 100), sp2 = Math.min(100, m2.spend / sel_.budget * 100);
    var log = monLog(sel_, s2);
    det = '<div class="card pad" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><h2 style="font-size:22px;letter-spacing:-.02em">' + laName(sel_.acct) + '</h2><div class="mono muted" style="font-size:12px;margin-top:3px">' + sel_.id.toUpperCase() + ' · ' + esc(sel_.name) + ' · ' + hm24(sel_.s) + '–' + hm24(sel_.e) + (s2 === 'on' ? ' · read ' + hm(NOW) + ' (2 min ago)' : '') + '</div></div>' + badge(s2) + '</div>' +
      '<div class="acts" style="margin-top:12px">' + (s2 === 'on' ? '<button class="btn sm" data-act="soff" data-id="' + sel_.id + '">' + ic('power') + 'Turn off</button>' : '') + (s2 === 'planned' && sel_.d === 0 ? '<button class="btn pri sm" data-act="son" data-id="' + sel_.id + '">Start now</button>' : '') + (s2 === 'failed' ? '<button class="btn pri sm" data-act="sretry" data-id="' + sel_.id + '">Retry</button>' : '') + '<button class="btn sm" data-act="sedit" data-id="' + sel_.id + '">Edit</button></div></div>' +
      (s2 === 'planned' || s2 === 'failed' ? '<div class="card pad muted">' + (s2 === 'planned' ? 'This campaign has not started. The tool creates it at ' + hm(sel_.s) + ' and starts reading numbers.' : 'This campaign could not be created. Retry it, or check the account in Accounts.') + '</div>' :
        '<div class="big2"><div class="card metric"><span>ROI today</span><b class="tnum" style="color:' + (roi2 >= sel_.roi ? '#17794A' : '#A35A06') + '">' + roi2.toFixed(2) + ' <em>/ ' + sel_.roi + '</em></b><div class="track"><i style="width:' + rp.toFixed(0) + '%;background:' + (roi2 >= sel_.roi ? '#1E9B63' : '#D58A12') + '"></i><u style="left:' + (sel_.roi / (sel_.roi * 1.4) * 100).toFixed(0) + '%"></u></div></div>' +
        '<div class="card metric"><span>Spend today</span><b class="tnum" style="color:#A35A06">' + trf(m2.spend) + ' <em>/ ' + trf(sel_.budget) + '</em></b><div class="track"><i style="width:' + sp2.toFixed(0) + '%;background:#C47A0A"></i></div></div></div>' +
        '<div class="g4"><div class="card metric"><span>GMV today</span><b>' + trf(m2.gmv) + '</b></div><div class="card metric"><span>Orders today</span><b>' + m2.orders + '</b><small>' + vnd(m2.orders ? m2.gmv / m2.orders : 0).replace('₫', '') + ' per order</small></div><div class="card metric"><span>LIVE views</span><b>' + m2.views.toLocaleString('en-US') + '</b><small>' + (m2.views ? (m2.orders / m2.views * 1000).toFixed(1) : 0) + ' orders / 1,000 views</small></div><div class="card metric"><span>Cost per order</span><b>' + (m2.orders ? Math.round(m2.spend / m2.orders / 1000) + 'k' : '–') + '</b></div></div>' +
        '<div class="card chart"><div class="pills" style="margin-bottom:10px">' + [['spend', 'Spend today and budget'], ['roi', 'ROI vs target'], ['gmv', 'GMV today']].map(function (t) { return '<button class="chip' + (u.chart === t[0] ? ' on' : '') + '" data-act="chart" data-id="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div>' + chartSvg(sel_, u.chart) + '</div>') +
      '<div class="card pad" style="margin-top:12px"><b style="font-size:15px">Change log</b><ul class="logl" style="margin-top:6px">' + log + '</ul></div>';
  }
  return head('LIVE GMV Max', 'Monitor', '', '<button class="btn" data-act="mrefresh">' + ic('refresh') + 'Refresh</button>') +
    '<div class="mon"><div class="card pad"><div style="display:flex;justify-content:space-between;align-items:center"><button class="btn sm" data-act="mnav" data-id="-1" aria-label="Previous day">' + ic('back') + '</button><b>' + (d === 0 ? 'Today' : wday(d)) + ' · ' + dstr(d) + '</b><button class="btn sm" data-act="mnav" data-id="1" aria-label="Next day">' + ic('chev') + '</button></div>' +
    '<div class="sstrip"><div><small>On now</small><b>' + on.length + ' / ' + all.length + '</b></div><div><small>Spend</small><b>' + trf(sp) + '</b></div><div><small>GMV</small><b>' + trf(gm) + '</b></div><div><small>Orders</small><b>' + od + '</b></div><div><small>ROI</small><b>' + (sp ? (gm / sp).toFixed(2) : '–') + '</b></div></div>' +
    '<div class="pills" style="margin-bottom:12px;gap:6px">' + chips + '</div>' + cards + '</div><div id="mdet">' + det + '</div></div>';
}
function monLog(x, st) {
  var items = [[hm(x.s), 'Campaign created at start time on ' + laName(x.acct) + ' (previous campaign switched off)']];
  if (st === 'on' || st === 'ended') { items.push([hm(x.s + 30), 'LIVE rule: ROI ' + (x.roi * 1.2).toFixed(2) + ' is above target ' + x.roi + ' → budget +10% (' + trf(x.budget * 0.9) + ' → ' + trf(x.budget) + ')']); items.push([hm(x.s + 75), 'Read from TikTok: spend, GMV and orders updated']); }
  if (st === 'on') items.push([hm(NOW), 'Read from TikTok (every 5 minutes)']);
  if (x.ov === 'off') items.push([hm(NOW), 'Turned off manually by Demo user']);
  if (st === 'ended' && x.ov !== 'off') items.push([hm24(x.e), 'Campaign switched off at end time']);
  return items.reverse().map(function (i) { return '<li><time>' + i[0] + '</time><span>' + esc(i[1]) + '</span></li>'; }).join('');
}

/* ============ LIVE: reports / rules / templates / settings ============ */
var RP = { today: ['Today', 0, 0], '7d': ['Last 7 days', -6, 0], '14d': ['Last 14 days', -13, 0], month: ['This month', -5, 0] };
function vReports() {
  var u = S.ui, a = u.repAcct, p = RP[u.repPer], rows = [], sp = 0, gm = 0, od = 0;
  for (var d = p[2]; d >= p[1]; d--) daySessions(Math.max(-1, Math.min(0, d))).forEach(function (x) { if (a !== 'all' && x.acct !== a) return; var s = sStatus(x); if (s === 'planned' || s === 'failed') return; var m = metrics(x); rows.push({ x: x, m: m, d: d }); });
  var mult = p[1] === 0 ? 1 : 1; rows = rows.slice(0, 40);
  rows.forEach(function (r) { sp += r.m.spend; gm += r.m.gmv; od += r.m.orders; });
  var body = rows.map(function (r) { var roi = r.m.spend ? r.m.gmv / r.m.spend : 0; return '<div class="gr rep-g"><div><b>' + esc(r.x.name) + '</b><span class="d">' + laName(r.x.acct) + ' · ' + dstr(r.d) + ' ' + hm24(r.x.s) + '–' + hm24(r.x.e) + '</span></div><div data-l="Spend">' + vnd(r.m.spend) + '</div><div data-l="GMV">' + vnd(r.m.gmv) + '</div><div data-l="ROI"><span class="roi ' + (roi >= r.x.roi ? 'g' : '') + '">' + roi.toFixed(2) + '</span></div><div data-l="Target">' + r.x.roi + '</div><div data-l="Orders">' + r.m.orders + '</div><div data-l="Cost / order">' + (r.m.orders ? Math.round(r.m.spend / r.m.orders).toLocaleString('en-US') : '–') + '</div></div>'; }).join('') || '<div class="pad muted">No finished sessions in this range.</div>';
  return head('LIVE GMV Max', 'Reports', 'Every finished session, with the numbers that decide the next schedule.', '<button class="btn" data-act="csv">' + ic('dl') + 'Export CSV</button>') +
    '<div class="card"><div class="pad"><div class="pills">' + Object.keys(RP).map(function (k) { return '<button class="pill' + (u.repPer === k ? ' on' : '') + '" data-act="rper" data-id="' + k + '">' + RP[k][0] + '</button>'; }).join('') + '</div><div class="fld" style="margin:14px 0 0;max-width:360px"><label class="sr" for="racct">Account</label>' + sel('racct', [['all', 'All accounts']].concat(LIVE_ACC.filter(function (z) { return z.perm; }).map(function (z) { return [z.id, z.name]; })), a, 'data-ui="repAcct"') + '</div></div>' +
    '<div class="hero-dark"><div><small>ALL SESSIONS · ' + rows.length + '</small><div class="big">' + vnd(gm) + '</div><span class="roi">ROI ' + (sp ? (gm / sp).toFixed(2) : '–') + '</span></div><div class="kp" style="grid-template-columns:repeat(3,1fr)"><div><small>SPEND</small><b>' + vnd(sp) + '</b></div><div><small>ORDERS</small><b>' + od + '</b></div><div><small>COST / ORDER</small><b>' + (od ? Math.round(sp / od / 1000) + 'k' : '–') + '</b></div></div></div>' +
    '<div class="gt"><div class="gh rep-g"><span>Session</span><span>Spend</span><span>GMV</span><span>ROI</span><span>Target</span><span>Orders</span><span>Cost / order</span></div>' + body + '</div></div>';
}
function vLiveRules() {
  return head('LIVE GMV Max', 'LIVE rules', 'Rules that change ROI target and budget while a stream is running.', '') + '<div class="card">' + S.liveRules.map(function (r) { return '<div class="li" style="align-items:flex-start;padding:18px 20px"><div style="flex:1"><b>' + esc(r.name) + '</b><div class="muted" style="margin-top:3px">' + esc(r.desc) + '</div></div>' + sw(r.on, 'lrule', r.id, 'Turn ' + r.name + ' on or off') + '</div>'; }).join('') + '</div>';
}
function vTemplates() {
  return head('LIVE GMV Max', 'Templates', 'Reusable session settings. Pick one to create a campaign in a click.', '') + '<div class="stats" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">' + S.tpls.map(function (t) { return '<div class="card stat"><span>' + esc(t.name) + '</span><b class="tnum" style="font-size:22px">' + t.s + '–' + t.e + '</b><small>ROI target ' + t.roi + ' · budget ' + trf(t.budget) + '</small><div style="margin-top:14px"><button class="btn pri sm" data-act="usetpl" data-id="' + t.id + '">Use template</button></div></div>'; }).join('') + '</div>';
}
function vLiveSettings() {
  return head('LIVE GMV Max', 'Settings', 'Controls for the whole LIVE automation.', '') + '<div class="card"><div class="li" style="padding:18px 20px"><div style="flex:1"><b>LIVE automation</b><div class="muted">Master switch. When off, no campaign is created or switched off by the schedule.</div></div>' + sw(S.liveMaster, 'lmaster', 0, 'LIVE automation') + '</div><div class="li" style="padding:18px 20px"><div style="flex:1"><b>Read numbers from TikTok</b><div class="muted">Every 5 minutes while a campaign is on.</div></div><span class="badge b-on">5 min</span></div><div class="li" style="padding:18px 20px"><div style="flex:1"><b>Workspace timezone</b><div class="muted">Schedules are shown in this timezone.</div></div><b>Asia/Ho_Chi_Minh · GMT+7</b></div></div>';
}

/* ============ SETUP ============ */
function vAccounts() {
  return head('Setup', 'Accounts', 'Ad accounts connected to this workspace. Tokens are kept in a vault and never shown in full.', '') + '<div class="card"><div class="gt"><div class="gh ac-g"><span>Account</span><span>Connection</span><span>LIVE permission</span><span>Video</span></div>' + ACC.map(function (a) { return '<div class="gr ac-g"><div><b>' + a.name + '</b><span class="d mono">token ••••' + (1000 + hstr(a.id) % 9000) + '</span></div><div data-l="Connection">' + badge(a.on ? 'on' : 'paused') + '</div><div data-l="LIVE">' + (a.live ? 'Yes' : 'No') + '</div><div>' + sw(a.on, 'acct', a.id, 'Turn ' + a.name + ' on or off') + '</div></div>'; }).join('') + '</div></div><p class="note">' + ic('shield') + 'An account that errors three times in a row pauses itself and sends an alert.</p>';
}
function vNotif() {
  var rows = [['summary', 'Morning summary', 'A short message every morning with yesterday\'s runs and anything that needs attention.'], ['errors', 'Error alerts', 'Get a message the moment a run fails or an account pauses itself.'], ['cmds', 'Commands from Telegram', 'Stop or run a rule from your phone with /pause, /run and /status.']];
  return head('Setup', 'Notifications', 'Your own Telegram bot, linked to your user only.', '') + '<div class="card"><div class="li" style="padding:18px 20px"><div style="flex:1"><b>Telegram bot</b><div class="muted">Connected as @demo_gmvmax_bot (sample)</div></div><span class="badge b-on">Connected</span></div>' + rows.map(function (r) { return '<div class="li" style="padding:18px 20px;align-items:flex-start"><div style="flex:1"><b>' + r[1] + '</b><div class="muted">' + r[2] + '</div></div>' + sw(S.tg[r[0]], 'tg', r[0], 'Turn ' + r[1] + ' on or off') + '</div>'; }).join('') + '</div>';
}
function vSettings() {
  return head('Setup', 'Settings', 'Workspace-wide controls.', '') + '<div class="card"><div class="li" style="padding:18px 20px"><div style="flex:1"><b>Pause all rules</b><div class="muted">One switch that stops every video rule in the workspace.</div></div>' + sw(S.pausedAll, 'pauseall2', 0, 'Pause all rules') + '</div><div class="li" style="padding:18px 20px"><div style="flex:1"><b>Workspace</b><div class="muted">Demo workspace · Advertising operations</div></div></div><div class="li" style="padding:18px 20px"><div style="flex:1"><b>Reset demo</b><div class="muted">Restore every rule, campaign and schedule to how it started.</div></div><button class="btn" data-act="reset">' + ic('refresh') + 'Reset</button></div></div>';
}

/* ============ render ============ */
function render() {
  parse(); shell();
  var v = '';
  if (route.sec === 'video') {
    v = route.page === 'overview' ? vOverview() : route.page === 'rules' ? (route.sub === 'new' ? vBuilder() : vRules()) : route.page === 'quick' ? vQuick() : route.page === 'activity' ? vActivity() : route.page === 'performance' ? vPerf() : route.page === 'find' ? vFind() : vOverview();
  } else if (route.sec === 'live') {
    v = route.page === 'schedule' ? vSchedule() : route.page === 'monitor' ? vMonitor() : route.page === 'reports' ? vReports() : route.page === 'rules' ? vLiveRules() : route.page === 'templates' ? vTemplates() : route.page === 'settings' ? vLiveSettings() : vSchedule();
  } else v = route.sec === 'accounts' ? vAccounts() : route.sec === 'notifications' ? vNotif() : vSettings();
  $('#view').innerHTML = v;
  var tw = $('.tl-wrap'); if (tw && S.ui.liveDay === 0 && tw.scrollWidth > tw.clientWidth) { var nl = $('.now-l', tw); if (nl) tw.scrollLeft = Math.max(0, nl.offsetLeft - tw.clientWidth * 0.6 + 92); }
  document.title = 'GMV Max Rules — demo';
}
function rerenderKeep() { var y = window.scrollY; render(); window.scrollTo(0, y); }
window.addEventListener('hashchange', function () { closeModal(); render(); window.scrollTo(0, 0); });

/* ============ events ============ */
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-act],[data-go]'); if (!t) return;
  var act = t.getAttribute('data-act'), id = t.getAttribute('data-id'), g = t.getAttribute('data-go');
  if (t.hasAttribute('data-reset-draft')) draft = newDraft();
  if (t.getAttribute('data-f')) S.ui.actF = t.getAttribute('data-f');
  if (t.getAttribute('data-mon')) { S.ui.monSel = t.getAttribute('data-mon'); S.ui.monDay = 0; }
  if (act === 'wback' && g) { /* cancel → rules */ }
  if (act && A[act]) { var r = A[act](id, t, e); if (r === false) return; }
  if (g) { closeModal(); go(g); }
});
$('#layer').addEventListener('click', function (e) { if (e.target.classList && e.target.classList.contains('ov')) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
document.addEventListener('change', function (e) {
  var t = e.target;
  if (t.hasAttribute('data-ui')) { var k = t.getAttribute('data-ui'); S.ui[k] = t.type === 'number' ? +t.value : t.value; save(); rerenderKeep(); return; }
  if (t.hasAttribute('data-q')) { qa[t.getAttribute('data-q')] = t.value; return; }
  if (t.hasAttribute('data-c')) { var c = draft.cond[+t.getAttribute('data-c')], kk = t.getAttribute('data-k'); c[kk] = kk === 'v' ? (t.value === '' ? '' : +t.value) : t.value; refreshSum(); return; }
  if (t.hasAttribute('data-acc')) { var ix = draft.accts.indexOf(t.getAttribute('data-acc')); if (t.checked && ix < 0) draft.accts.push(t.getAttribute('data-acc')); if (!t.checked && ix >= 0) draft.accts.splice(ix, 1); refreshSum(); return; }
  if (t.hasAttribute('data-fs')) { findSel[t.getAttribute('data-fs')] = t.checked; rerenderKeep(); return; }
  if (t.getAttribute('data-b') === 'every') { draft.every = +t.value; draft.sched = { t: 'every', n: +t.value }; refreshSum(); }
});
document.addEventListener('input', function (e) {
  var t = e.target, b = t.getAttribute && t.getAttribute('data-b');
  if (b && draft) { if (b === 'name') draft.name = t.value; else if (b === 'win') draft.win = t.value; else if (b === 'time') draft.sched = { t: 'daily', times: [t.value || '08:00'] }; else if (b === 'limit') draft.limit = t.value; refreshSum(); }
  else if (t.getAttribute && t.getAttribute('data-q') === 'ids') qa.ids = t.value;
  else if (t.getAttribute && t.getAttribute('data-ui') && t.type === 'number') { S.ui[t.getAttribute('data-ui')] = +t.value; save(); }
});
document.addEventListener('blur', function (e) { var t = e.target; if (t.getAttribute && t.getAttribute('data-ui') && t.type === 'number') rerenderKeep(); }, true);
function refreshSum() { var s = $('#wsum'); if (s && draft) s.innerHTML = sumHtml(prepared()); }

var A = {
  noop: function () { },
  close: function () { closeModal(); }, ovclose: function (id, t, e) { if (e.target === t) closeModal(); else return false; },
  reset: function () { try { localStorage.removeItem(KEY); } catch (e) { } S = fresh(); draft = null; qa = { step: 1, acct: 'a1', mode: 'ids', ids: '', rule: 1, act: 'create', err: '', res: null }; findSel = {}; closeModal(); toast('Demo reset'); go('#/video/overview'); render(); },
  more: function () { modal('<div class="mh"><h3>More</h3><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div><button class="nav-i" data-go="#/notifications">' + ic('bell') + 'Notifications</button><button class="nav-i" data-go="#/settings">' + ic('cog') + 'Settings</button><a class="nav-i" href="/gmvmax-tool">' + ic('ext') + 'About this tool</a><a class="nav-i" href="/" style="font-weight:700">' + ic('ext') + 'Hire me</a>'); },
  pauseall: function () { S.pausedAll = !S.pausedAll; save(); toast(S.pausedAll ? 'All rules paused' : 'Rules resumed'); render(); },
  pauseall2: function () { A.pauseall(); },
  toggle: function (id) { var r = S.rules.filter(function (x) { return x.id == id; })[0]; r.on = !r.on; addAct(r.name, 'Workspace', 'Rule turned ' + (r.on ? 'on' : 'off') + ' by Demo user', 'skip'); save(); render(); },
  rule: function (id) { ruleDetail(id); },
  dryrun: function (id) { var r = S.rules.filter(function (x) { return x.id == id; })[0], n = 2 + hstr(r.name + S.clock) % 9; r.dryOk = true; r.matched = n; r.last = '06/11 ' + nowStr(); r.st = 'Completed'; addAct(r.name, r.accts.map(accName)[0], 'Dry run: would match ' + n + ' videos, changed nothing', 'dry'); save(); toast('Dry run done: would match ' + n + ' videos'); ruleDetail(id); render(); },
  golive: function (id) { var r = S.rules.filter(function (x) { return x.id == id; })[0]; modal('<div class="mh"><h3>Go Live?</h3><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div><p style="line-height:1.7"><b>' + esc(r.name) + '</b> will start changing real ads on <b>' + r.accts.length + ' account' + (r.accts.length > 1 ? 's' : '') + '</b> (' + r.accts.map(accName).join(', ') + '). In this demo nothing is sent to TikTok.</p><div class="foot"><button class="btn" data-act="close">Cancel</button><button class="btn pri" data-act="confirmlive" data-id="' + r.id + '">Go Live on ' + r.accts.length + ' account' + (r.accts.length > 1 ? 's' : '') + '</button></div>'); },
  confirmlive: function (id) { var r = S.rules.filter(function (x) { return x.id == id; })[0]; r.mode = 'live'; r.on = true; addAct(r.name, 'Workspace', 'Rule went Live on ' + r.accts.length + ' account(s)', 'live'); save(); closeModal(); toast(r.name + ' is Live'); render(); },
  todry: function (id) { var r = S.rules.filter(function (x) { return x.id == id; })[0]; r.mode = 'dry'; save(); closeModal(); toast(r.name + ' is back to Dry run'); render(); },
  delrule: function (id) { S.rules = S.rules.filter(function (x) { return x.id != id; }); save(); closeModal(); toast('Rule deleted'); render(); },
  /* wizard */
  wstep: function (id) { draft.step = +id; render(); }, wback: function (id, t) { if (t.getAttribute('data-go')) return; draft.step = Math.max(0, draft.step - 1); render(); return false; },
  wnext: function () { var d = draft; d.tried = true; if (!stepValid(d.step)) { render(); return; } d.step = Math.min(6, d.step + 1); render(); window.scrollTo(0, 0); },
  wtpl: function (id) { var p = PRESETS[id]; draft.tpl = id; draft.win = p.win; draft.cond = clone(p.cond); draft.act = p.act; if (!draft.name.trim()) draft.name = p.n === 'Start from scratch' ? '' : p.n; render(); },
  wscope: function (id) { draft.scope = id; render(); }, wcomb: function (id) { draft.comb = id; render(); }, wact: function (id) { draft.act = id; render(); },
  wadd: function () { draft.cond.push({ m: 'roi', o: '<', v: 5 }); render(); }, wdel: function (id) { draft.cond.splice(+id, 1); render(); },
  wsched: function (id) { draft.sched = id === 'daily' ? { t: 'daily', times: ['08:00'] } : { t: 'every', n: draft.every || 60 }; render(); },
  wsave: function () { var d = draft; d.tried = true; var bad = STEPS.map(function (s, k) { return stepValid(k) ? k : -1; }).filter(function (k) { return k >= 0 ? false : true; }); var inv = []; for (var k = 0; k < 7; k++) if (!stepValid(k)) inv.push(k); if (inv.length) { d.step = inv[0]; render(); toast('Finish the highlighted step first'); return; } var p = prepared(); S.rules.unshift({ id: Date.now(), name: d.name.trim(), desc: sentence(p).split('. If')[0].replace(/^[^,]+, /, '') ? 'Custom rule: ' + ACTS[d.act].l.toLowerCase() + ' when conditions match.' : '', mode: 'dry', on: true, accts: d.accts.slice(), last: '—', st: 'No runs yet', matched: 0, acted: 0, dryOk: false, win: p.win, cond: clone(d.cond), comb: d.comb, act: d.act, sched: p.sched, limit: d.limit }); addAct(d.name.trim(), 'Workspace', 'Rule created as Dry run', 'skip'); draft = null; save(); toast('Saved as Dry run. It runs without changing your ads.'); go('#/video/rules'); },
  /* quick actions */
  qmode: function (id) { qa.mode = id; qa.err = ''; render(); }, qact: function (id) { qa.act = id; render(); },
  qsample: function () { qa.ids = POOL.slice(0, 7).map(function (v) { return v.id; }).join('\n'); qa.err = ''; render(); },
  qcheck: function () {
    var ta = $('#qids'); if (ta) qa.ids = ta.value;
    var vids;
    if (qa.mode === 'ids') { var p = parseIds(qa.ids); if (!p.ids.length) { qa.err = p.bad ? 'Those do not look like video IDs. IDs are long numbers, for example ' + POOL[0].id + '.' : 'Paste at least one video ID, or use the sample IDs.'; render(); return; } vids = p.ids.map(vid); }
    else vids = POOL.slice(0, 8);
    qa.err = ''; qa.vids = vids; qa.step = 2; render(); window.scrollTo(0, 0);
  },
  qback: function () { qa.step = 1; render(); },
  qsend: function () { var n = qa.vids.filter(function (v) { return effect(v, qa.act)[1]; }).length; qa.res = { n: n }; qa.step = 3; addAct('Quick action', accName(qa.acct), ACTS[qa.act].l + ' on ' + n + ' video' + (n === 1 ? '' : 's') + ' (' + (qa.vids.length - n) + ' skipped)', 'live'); save(); render(); window.scrollTo(0, 0); },
  qreset: function () { qa = { step: 1, acct: 'a1', mode: 'ids', ids: '', rule: 1, act: 'create', err: '', res: null }; render(); },
  /* activity */
  actf: function (id) { S.ui.actF = id; render(); },
  failed: function (id) { var a = S.act.filter(function (x) { return x.st === 'failed'; })[0]; modal('<div class="mh"><div><h3>Failed run</h3><div class="muted">' + a.t + ' · ' + esc(a.src) + ' · ' + esc(a.acct) + '</div></div><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div><p style="line-height:1.7">' + esc(a.err || a.text) + '</p><div class="foot"><button class="btn" data-act="close">Close</button>' + (a.done ? '' : '<button class="btn pri" data-act="reviewed">Mark as reviewed</button>') + '</div>'); },
  reviewed: function () { S.act.forEach(function (a) { if (a.st === 'failed') a.done = true; }); save(); closeModal(); toast('Marked as reviewed'); render(); },
  /* performance */
  per: function (id) { S.ui.per = id; save(); render(); },
  budget: function (id) { var c = S.camp.filter(function (x) { return x.id === id; })[0]; modal('<div class="mh"><div><h3>Budget / ROI</h3><div class="muted">' + esc(c.name) + ' · ' + esc(c.acct) + '</div></div><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div><div class="row2"><div class="fld"><label for="bf-b">Daily budget (₫)</label><input class="inp" id="bf-b" type="number" step="50000" inputmode="numeric" value="' + c.budget + '"></div><div class="fld"><label for="bf-r">ROI target</label><input class="inp" id="bf-r" type="number" step="0.1" inputmode="decimal" value="' + c.roiT + '"></div></div><p class="err" id="bf-e" role="alert"></p><div class="foot"><button class="btn" data-act="close">Cancel</button><button class="btn pri" data-act="bsave" data-id="' + c.id + '">Save changes</button></div>'); },
  bsave: function (id) { var c = S.camp.filter(function (x) { return x.id === id; })[0], b = +$('#bf-b').value, r = +$('#bf-r').value; if (!(b >= 50000) || !(r > 0)) { $('#bf-e').textContent = 'Budget must be at least ₫50,000 and ROI target above 0.'; return; } if (b !== c.budget) S.hist.unshift({ t: '06/11 ' + nowStr(), who: 'Demo user', what: c.name, f: 'Budget', from: vnd(c.budget), to: vnd(b) }); if (r !== c.roiT) S.hist.unshift({ t: '06/11 ' + nowStr(), who: 'Demo user', what: c.name, f: 'ROI target', from: String(c.roiT), to: String(r) }); c.budget = b; c.roiT = r; save(); closeModal(); toast('Saved. Logged in Change history.'); render(); },
  hist: function () { modal('<div class="mh"><h3>Change history</h3><button class="x" data-act="close" aria-label="Close">' + ic('x') + '</button></div><ul class="logl">' + S.hist.map(function (h) { return '<li><time>' + h.t + '</time><span><b>' + esc(h.what) + '</b> · ' + h.f + ' ' + h.from + ' → <b>' + h.to + '</b><br><span class="muted">by ' + h.who + '</span></span></li>'; }).join('') + '</ul>'); },
  fmode: function (id) { S.ui.findMode = id; S.ui.findRoi = id === 'weak' ? 5 : 8; save(); findSel = {}; render(); },
  fsend: function () { var ids = Object.keys(findSel).filter(function (k) { return findSel[k]; }); qa = { step: 1, acct: 'a1', mode: 'ids', ids: ids.join('\n'), rule: 1, act: S.ui.findMode === 'weak' ? 'exclude' : 'create', err: '', res: null }; go('#/video/quick'); },
  /* live */
  lview: function (id) { S.ui.liveView = id; save(); render(); }, lnav: function (id) { S.ui.liveDay = Math.max(-1, Math.min(7, S.ui.liveDay + +id)); if (S.ui.liveDay > 1 && !daySessions(S.ui.liveDay).length) { } save(); render(); }, lfull: function () { S.ui.liveFull = !S.ui.liveFull; save(); render(); },
  sync: function (id, t) { t.innerHTML = '<span class="spin"></span> Syncing'; t.disabled = true; setTimeout(function () { S.lastSync = nowStr(); save(); toast('Synced from TikTok: nothing new'); render(); }, 900); },
  copyday: function () { var src = daySessions(S.ui.liveDay), dd = S.ui.liveDay + 1, add = 0; src.forEach(function (x) { if (daySessions(dd).some(function (y) { return y.acct === x.acct && y.s < x.e && x.s < y.e; })) return; S.live.push(mkS(x.acct, x.name, hm(x.s), hm24(x.e), x.roi, x.budget, dd)); add++; }); save(); toast(add ? add + ' campaigns copied to ' + dstr(dd) : 'Nothing to copy: those hours are already filled'); if (add) { S.ui.liveDay = dd; save(); render(); } },
  sess: function (id) { sessModal(id); },
  newlive: function () { liveForm(null, null); },
  usetpl: function (id) { var t = S.tpls.filter(function (x) { return x.id == id; })[0]; go('#/live/schedule'); setTimeout(function () { liveForm(null, { name: t.name, s: tm(t.s), e: tm(t.e), roi: t.roi, budget: t.budget }); }, 60); },
  sedit: function (id) { var x = S.live.filter(function (s) { return s.id === id; })[0]; liveForm(x); },
  lsave: function (id, t) {
    var a = $('#lf-acct').value, n = $('#lf-name').value.trim() || 'Campaign', s = tm($('#lf-s').value), e = $('#lf-e').value === '00:00' ? 1440 : tm($('#lf-e').value), roi = +$('#lf-r').value, b = +$('#lf-b').value, d = +t.getAttribute('data-d'), err = $('#lf-err');
    if (!(e > s)) { err.textContent = 'End time must be after the start time.'; return; }
    if (!(roi > 0) || !(b >= 100000)) { err.textContent = 'ROI target must be above 0 and budget at least ₫100,000.'; return; }
    var clash = daySessions(d).filter(function (y) { return y.id !== id && y.acct === a && y.s < e && s < y.e; })[0];
    if (clash) { err.textContent = 'One LIVE campaign per account at a time: this overlaps “' + clash.name + '” (' + hm24(clash.s) + '–' + hm24(clash.e) + ').'; return; }
    if (id) { var x = S.live.filter(function (z) { return z.id === id; })[0]; x.acct = a; x.name = n; x.s = s; x.e = e; x.roi = roi; x.budget = b; x.m = null; } else S.live.push(mkS(a, n, hm(s), hm24(e), roi, b, d));
    save(); closeModal(); toast(id ? 'Campaign updated' : 'Campaign created: it starts automatically at ' + hm(s)); render();
  },
  sdel: function (id) { S.live = S.live.filter(function (x) { return x.id !== id; }); save(); closeModal(); toast('Campaign deleted'); render(); },
  soff: function (id) { var x = S.live.filter(function (s) { return s.id === id; })[0]; x.ov = 'off'; save(); closeModal(); toast(laName(x.acct) + ' campaign turned off'); render(); },
  son: function (id) { var x = S.live.filter(function (s) { return s.id === id; })[0]; var clash = daySessions(0).filter(function (y) { return y.id !== id && y.acct === x.acct && sStatus(y) === 'on'; })[0]; if (clash) { clash.ov = 'off'; } x.s = NOW; x.ov = null; x.m = null; save(); closeModal(); toast('Started' + (clash ? ' (the previous campaign was turned off)' : '')); render(); },
  sretry: function (id) { var x = S.live.filter(function (s) { return s.id === id; })[0]; x.ov = null; x.s = Math.min(x.s, NOW - 30); x.e = Math.max(x.e, NOW + 60); x.m = null; save(); closeModal(); toast('Retry worked: campaign is On'); render(); },
  monf: function (id) { S.ui.monF = id; save(); render(); }, monsel: function (id) { S.ui.monSel = id; save(); render(); window.scrollTo({ top: window.innerWidth < 1181 ? $('#mdet').offsetTop - 70 : window.scrollY }); },
  mnav: function (id) { S.ui.monDay = Math.max(-1, Math.min(1, S.ui.monDay + +id)); S.ui.monSel = null; save(); render(); },
  mrefresh: function (id, t) { t.innerHTML = '<span class="spin"></span> Refreshing'; setTimeout(function () { tick(); render(); toast('Numbers refreshed from TikTok'); }, 600); },
  chart: function (id) { S.ui.chart = id; save(); render(); },
  lrule: function (id) { var r = S.liveRules.filter(function (x) { return x.id == id; })[0]; r.on = !r.on; save(); render(); toast(r.name + (r.on ? ' is on' : ' is off')); },
  lmaster: function () { S.liveMaster = !S.liveMaster; save(); render(); toast('LIVE automation ' + (S.liveMaster ? 'on' : 'off')); },
  rper: function (id) { S.ui.repPer = id; save(); render(); },
  csv: function () { var rows = [['Session', 'Account', 'Spend', 'GMV', 'ROI', 'Orders']]; daySessions(0).forEach(function (x) { var s = sStatus(x); if (s === 'planned' || s === 'failed') return; var m = metrics(x); rows.push([x.name, laName(x.acct), m.spend, m.gmv, m.spend ? (m.gmv / m.spend).toFixed(2) : '', m.orders]); }); var b = new Blob([rows.map(function (r) { return r.join(','); }).join('\n')], { type: 'text/csv' }), a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'gmvmax-live-report-sample.csv'; document.body.appendChild(a); a.click(); a.remove(); toast('Sample CSV downloaded'); },
  acct: function (id) { var a = ACC.filter(function (x) { return x.id === id; })[0]; a.on = !a.on; render(); toast(a.name + (a.on ? ' resumed' : ' paused')); },
  tg: function (id) { S.tg[id] = !S.tg[id]; save(); render(); }
};
/* wizard's select 'data-act="wback"' with data-go on step 0 */

/* live ticking on the Monitor: an "on" campaign keeps moving */
function tick() { daySessions(0).forEach(function (x) { if (sStatus(x) !== 'on') return; var m = metrics(x), r = Math.random(); m.spend = Math.min(x.budget, m.spend + Math.round(x.budget * 0.003 * (0.5 + r) / 1000) * 1000); m.gmv += Math.round(x.budget * 0.003 * x.roi * (0.6 + Math.random() * 1.0) / 1000) * 1000; m.orders = Math.round(m.gmv / 195000); m.views += Math.round(20 + Math.random() * 60); }); save(); }
setInterval(function () { if (route.sec === 'live' && route.page === 'monitor' && !$('#layer').innerHTML && document.visibilityState === 'visible') { tick(); var y = window.scrollY; render(); window.scrollTo(0, y); } }, 8000);

/* lane click -> create at that time */
document.addEventListener('click', function (e) {
  var lane = e.target.closest && e.target.closest('[data-lane]'); if (!lane || e.target.closest('.ss')) return;
  var a = LIVE_ACC.filter(function (z) { return z.id === lane.getAttribute('data-lane'); })[0]; if (!a.perm) { toast('This account has no LIVE permission'); return; }
  var rect = lane.getBoundingClientRect(), full = S.ui.liveFull, h0 = full ? 0 : 10, mins = lane.hasAttribute('data-v') ? Math.round(((e.clientY - rect.top) / 44 * 60 + h0 * 60) / 30) * 30 : Math.round(((e.clientX - rect.left) / rect.width * (24 - h0) * 60 + h0 * 60) / 30) * 30;
  liveForm(null, { acct: a.id, name: 'New campaign', s: Math.min(mins, 1320), e: Math.min(mins + 120, 1440), roi: 6.5, budget: 2000000 });
});

if (!location.hash) location.hash = '#/video/overview';
render();
})();
