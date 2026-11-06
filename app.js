(() => {
'use strict';

const qs = new URLSearchParams(location.search);
const GIFT = qs.has('gift');
const KEY = GIFT ? 'eapple-tree-gift-v2' : 'eapple-tree-v2';
const MAX = 30, ORDER = 5, FRIEND_MAX = 3, GIFT_PTS = 3;

const STAGES = [
  { n: '씨앗', at: 0 },
  { n: '새싹', at: 2 },
  { n: '어린 나무', at: 6 },
  { n: '사과꽃', at: 12, rw: '꽃 소식' },
  { n: '열매', at: 19, rw: '쿠폰' },
  { n: '수확', at: 30, rw: '사과 상자' },
];
const START = STAGES[2].at;

const VAR = {
  hongro: { n: '홍로', m: 9, brix: 12, img: 'img/hongro.jpg', desc: '9월 · 추석 햇사과', rw: '홍로 한입사과 1박스', rwShort: '한입사과 1박스', rwImg: 'img/shop_hanip.jpg',
    red: { hi: '#FF9C8C', mid: '#E8392E', lo: '#A51D1D' } },
  gamhong: { n: '감홍', m: 10, brix: 15, img: 'img/gamhong.jpg', desc: '10월 · 진한 단맛', rw: '감홍 사과(못난이) 3kg', rwShort: '감홍 3kg', rwImg: 'img/shop_gamhong.jpg',
    red: { hi: '#E88E88', mid: '#B4262E', lo: '#6E1218' } },
  busa: { n: '부사', m: 11, brix: 12, img: 'img/busa.jpg', desc: '11월 · 달콤하고 산뜻한 맛', rw: '햇 부사 가정용(못난이) 3kg', rwShort: '부사 3kg', rwImg: 'img/shop_busa_home.jpg',
    red: { hi: '#FFB4A2', mid: '#E9574A', lo: '#B0392C' } },
};

const SHOP = [
  { n: '홍로 한입사과', p: 17000, op: 21000, b: 12, img: 'img/shop_hanip.jpg' },
  { n: '2026 햇 홍로 가정용(못난이)', p: 13900, op: 35000, b: 12, img: 'img/shop_hongro_home.jpg' },
  { n: '2026 햇 감홍 사과', p: 31000, op: 39000, b: 15, img: 'img/shop_gamhong.jpg' },
  { n: '햇 부사 가정용(못난이) 사과', p: 21900, op: 35000, b: 12, img: 'img/shop_busa_home.jpg' },
];

const FRIENDS = ['옆집 언니', '회사 동기', '막내 동생'];
const MONTH = { 1: '가지치기', 2: '가지치기', 3: '새순 트는 때', 4: '사과꽃 피는 때', 5: '열매 솎는 때', 6: '열매 키우는 때', 7: '열매 키우는 때', 8: '열매 키우는 때', 9: '홍로 따는 때', 10: '감홍 따는 때', 11: '부사 따는 때', 12: '나무 쉬는 때' };
const GAP = { 2: '이틀', 3: '사흘', 4: '나흘', 5: '닷새' };

const CANOPY = [[150, 160, 58], [100, 178, 42], [200, 178, 42], [120, 128, 38], [182, 128, 38], [150, 106, 34], [76, 200, 28], [224, 200, 28], [150, 206, 42]];
const SMALL = [[150, 198, 36], [122, 210, 26], [178, 210, 26], [134, 176, 24], [166, 174, 24], [150, 160, 22], [100, 224, 18], [200, 222, 18], [114, 186, 19], [186, 188, 19], [150, 142, 18]];
const SMALL_BASE = 6;
const APPLES = [[112, 170], [140, 140], [172, 150], [198, 176], [150, 192], [124, 204], [180, 204], [96, 196], [208, 144], [160, 116], [128, 112], [220, 200], [82, 172], [150, 164]];
const FLOWERS = [[110, 160], [132, 132], [168, 140], [196, 166], [150, 184], [120, 196], [184, 198], [92, 190], [206, 134], [158, 108], [126, 106], [222, 192], [80, 168], [150, 150], [102, 136], [196, 118], [142, 206], [170, 176], [116, 180], [230, 172], [70, 192], [176, 96], [134, 90], [188, 214]];
const EDGE = [[54, 204, 200], [64, 176, 220], [86, 140, 235], [100, 104, 250], [128, 84, 262], [150, 70, 270], [174, 82, 280], [204, 102, 292], [220, 134, 305], [240, 168, 320], [248, 200, 340], [112, 232, 160], [190, 236, 20]];

const ICON = {
  can: '<svg viewBox="0 0 32 32" fill="none"><path d="M12 12h10.5a2 2 0 0 1 2 2v8.5a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V14a2 2 0 0 1 2-2z" fill="currentColor"/><path d="M14 12c0-4.4 7.5-4.4 7.5 0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10 16.5 4.6 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="4" cy="11.3" r="2.3" fill="currentColor"/><path d="M4.4 17.5v2.2M2 20.5v1.8M6.8 20.5v1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".8"/></svg>',
  canColor: '<svg viewBox="0 0 64 48"><path d="M28 14c0-11 20-11 20 0" fill="none" stroke="#3B83BD" stroke-width="4.5" stroke-linecap="round"/><path d="M25 16h28a4 4 0 0 1 4 4v15a8 8 0 0 1-8 8H31a8 8 0 0 1-8-8V18a2 2 0 0 1 2-2z" fill="#5BB0E8"/><path d="M27 21h24" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/><path d="M24 27 7 15" stroke="#4A9AD3" stroke-width="5.5" stroke-linecap="round"/><rect x="0" y="9" width="11" height="8" rx="2.5" transform="rotate(35 5.5 13)" fill="#3B83BD"/></svg>',
  check: '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="currentColor" opacity=".16"/><path d="m10.5 16.5 3.8 3.8 7.4-8" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  basket: '<svg viewBox="0 0 32 32"><circle cx="11.5" cy="13" r="5" fill="#fff"/><circle cx="20.5" cy="13" r="5" fill="#FFE1DC"/><path d="M4 16h24l-2.6 10a2 2 0 0 1-2 1.5H8.6a2 2 0 0 1-2-1.5z" fill="#fff" opacity=".95"/><path d="M8 20h16M9 23.5h14" stroke="#E3352B" stroke-opacity=".35" stroke-width="1.6"/></svg>',
  seedling: '<svg viewBox="0 0 32 32" fill="none"><path d="M16 27V15" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M16 16C12 9.5 5.5 10.5 5 14c3 3.6 8 3.8 11 2z" fill="#fff"/><path d="M16 14.5c3-7 10-7 11-3.6-2.6 4.3-8 5.2-11 3.6z" fill="#fff" opacity=".85"/><path d="M8 27h16" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>',
  sack: '<svg viewBox="0 0 24 24"><path d="M6 7.5c-1 3.5-1.3 8 .2 12.5h11.6c1.5-4.5 1.2-9-.2-12.5z" fill="#E7CFA0"/><path d="M6 7.5c2-1.6 10-1.6 12 0-2 1.3-10 1.3-12 0z" fill="#CFAE73"/><path d="M8.5 5.5 12 7.2l3.5-1.7" stroke="#B48A4F" stroke-width="1.4" fill="none" stroke-linecap="round"/><rect x="8" y="11.5" width="8" height="5" rx="1.2" fill="#FF990D"/><circle cx="12" cy="14" r="1.3" fill="#fff"/></svg>',
  friend: '<svg viewBox="0 0 24 24"><path d="M9 3.5S4 9 4 12.4a5 5 0 0 0 10 0C14 9 9 3.5 9 3.5z" fill="#6EC0F0"/><path d="M7 11.5a2.4 2.4 0 0 0 1.6 2.6" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".8"/><path d="M17.2 12.4c-1.1-1.4-3.6-.8-3.6 1.3 0 2.1 3.6 4.4 3.6 4.4s3.6-2.3 3.6-4.4c0-2.1-2.5-2.7-3.6-1.3z" fill="#F06292"/></svg>',
  gift: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2" fill="#F26B5B"/><rect x="3" y="7" width="18" height="4.5" rx="1.5" fill="#FF8A75"/><rect x="10.8" y="7" width="2.4" height="13" fill="#FFD36E"/><path d="M12 7C10 3.5 6.5 4.5 7.5 6.5 8.2 7.6 12 7 12 7zM12 7c2-3.5 5.5-2.5 4.5-.5-.7 1.1-4.5.5-4.5.5z" fill="#FFD36E"/></svg>',
  box: '<svg viewBox="0 0 24 24"><circle cx="8.5" cy="9" r="3.6" fill="#E8392E"/><circle cx="15.5" cy="9" r="3.6" fill="#F05A44"/><circle cx="12" cy="7.2" r="3.4" fill="#E8392E"/><path d="M3 11h18l-1.6 8.4a2 2 0 0 1-2 1.6H6.6a2 2 0 0 1-2-1.6z" fill="#C98E55"/><path d="M5 15h14" stroke="#A8743F" stroke-width="1.4"/></svg>',
  leaf: '<svg viewBox="0 0 16 16"><path d="M3 13C3 6 8 3 14 3c0 6-3.5 10-10 10z" fill="#5FAE4E"/><path d="M3 13 10 6.5" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".7"/></svg>',
  talk: '<svg viewBox="0 0 24 24"><path d="M12 4C6.8 4 3 7.1 3 11c0 2.5 1.6 4.6 4 5.9L6.2 20l3.6-2.3c.7.1 1.4.2 2.2.2 5.2 0 9-3.1 9-6.9S17.2 4 12 4z" fill="#3A2A12"/></svg>',
  soundOn: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  soundOff: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor"/><path d="m16 9.5 5 5m0-5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#2A2622" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="#6E655C" stroke-width="2" stroke-linecap="round"/></svg>',
  tick: '<svg viewBox="0 0 12 12" fill="none"><path d="m2.5 6.2 2.3 2.3 4.7-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flower: '<svg viewBox="0 0 24 24"><g fill="#fff" stroke="#F4B6C9" stroke-width="1"><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(72 12 12)"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(144 12 12)"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(216 12 12)"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(288 12 12)"/></g><circle cx="12" cy="12" r="2.6" fill="#F7C548"/></svg>',
  coupon: '<svg viewBox="0 0 24 24"><path d="M2 7a1.5 1.5 0 0 1 1.5-1.5h17A1.5 1.5 0 0 1 22 7v3.2a1.8 1.8 0 0 0 0 3.6V17a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 17v-3.2a1.8 1.8 0 0 0 0-3.6z" fill="#FF990D"/><path d="M16.5 6.5v11" stroke="#fff" stroke-width="1.3" stroke-dasharray="1.8 1.8"/><text x="10" y="14.2" font-size="6.2" font-weight="800" fill="#fff" text-anchor="middle">1천</text></svg>',
  pen: '<svg viewBox="0 0 16 16" fill="none"><path d="M3 13l.6-2.8L10.4 3.4a1.4 1.4 0 0 1 2 0l.2.2a1.4 1.4 0 0 1 0 2L5.8 12.4z" fill="#B07D4A"/><path d="M3 13l.6-2.8 2.2 2.2z" fill="#7A5230"/></svg>',
  rain: '<svg viewBox="0 0 24 24"><path d="M7 14a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6 1.6A3.3 3.3 0 0 1 17 14z" fill="#A9C7E2"/><path d="M8 17l-1 2.5M12 17l-1 2.5M16 17l-1 2.5" stroke="#5BA6DE" stroke-width="1.8" stroke-linecap="round"/></svg>',
};

const STEP_ICON = [
  '<svg viewBox="0 0 20 20"><path d="M3 15.5h14" stroke="#C9A27A" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="10" cy="11.5" rx="4.4" ry="3.4" fill="#9A6A44"/><ellipse cx="8.6" cy="10.4" rx="1.3" ry=".8" fill="#fff" opacity=".4"/></svg>',
  '<svg viewBox="0 0 20 20"><path d="M10 17.5V9.5" stroke="#5FAE4E" stroke-width="1.8" stroke-linecap="round"/><path d="M10 10.5C7.5 6.5 3.5 7 3 9.2c1.8 2.3 5 2.4 7 1.3z" fill="#6DBB5A"/><path d="M10 9.5c1.8-4.3 6.3-4.5 7-2.3-1.6 2.7-5 3.3-7 2.3z" fill="#86CC6E"/></svg>',
  '<svg viewBox="0 0 20 20"><rect x="9.1" y="10" width="1.8" height="7.5" rx=".9" fill="#8B5A36"/><circle cx="10" cy="8" r="5.6" fill="#6DBB5A"/><circle cx="8" cy="6.2" r="1.9" fill="#fff" opacity=".28"/></svg>',
  '<svg viewBox="0 0 24 24"><g fill="#fff" stroke="#EFA3BC" stroke-width="1.2"><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(72 12 12)"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(144 12 12)"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(216 12 12)"/><ellipse cx="12" cy="6.8" rx="3.6" ry="4.6" transform="rotate(288 12 12)"/></g><circle cx="12" cy="12" r="2.6" fill="#F7C548"/></svg>',
  '<svg viewBox="0 0 20 20"><path d="M10 6.2C8.4 4.8 4 4.9 4 9.6c0 4.2 2.8 7.4 6 6.6 3.2.8 6-2.4 6-6.6 0-4.7-4.4-4.8-6-3.4z" fill="#9ACD45"/><path d="M10 6.2c0-1.6.6-2.8 1.6-3.6" stroke="#6B4423" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M11 4.2c1.6-1.8 3.8-1.4 4.4-.8-1.2 1.4-3 1.6-4.4.8z" fill="#5FAE4E"/></svg>',
  '<svg viewBox="0 0 20 20"><path d="M10 6.2C8.4 4.8 4 4.9 4 9.6c0 4.2 2.8 7.4 6 6.6 3.2.8 6-2.4 6-6.6 0-4.7-4.4-4.8-6-3.4z" fill="#E5392E"/><ellipse cx="7" cy="9" rx="1.2" ry="1.9" fill="#fff" opacity=".45"/><path d="M10 6.2c0-1.6.6-2.8 1.6-3.6" stroke="#6B4423" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M11 4.2c1.6-1.8 3.8-1.4 4.4-.8-1.2 1.4-3 1.6-4.4.8z" fill="#5FAE4E"/></svg>',
];

const APPLE_FLY = '<svg viewBox="-12 -14 24 26"><path d="M0 -6.5C-3.5 -10 -11.5 -9 -11 0.5C-10.6 8 -5 12 0 10.4C5 12 10.6 8 11 0.5C11.5 -9 3.5 -10 0 -6.5Z" fill="#E8392E"/><path d="M0 -6.5C0 -9.5 1 -11.6 2.6 -13" stroke="#6B4423" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M1.8 -10.6C5 -14.2 9.4 -12.8 10.4 -11.2C7.8 -8.8 4.4 -8.8 1.8 -10.6Z" fill="#5FAE4E"/><ellipse cx="-5" cy="-1.6" rx="2.3" ry="3.6" fill="#fff" opacity=".42" transform="rotate(22 -5 -1.6)"/></svg>';

const SACK_BIG = '<svg viewBox="0 0 56 62"><path d="M10 16C7 30 7 46 12 58h32c5-12 5-28 2-42z" fill="#E9D3A6"/><path d="M10 16c6-5 30-5 36 0-6 4-30 4-36 0z" fill="#D2B077"/><path d="M14 12l14 6 14-6" stroke="#B48A4F" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="15" y="30" width="26" height="16" rx="3" fill="#FF990D"/><text x="28" y="42" font-size="10" text-anchor="middle" fill="#fff" font-weight="800">거름</text></svg>';
const GIFT_BIG = '<svg viewBox="0 0 64 64"><rect x="10" y="28" width="44" height="30" rx="5" fill="#F26B5B"/><rect x="7" y="19" width="50" height="12" rx="4" fill="#FF8A75"/><rect x="29" y="19" width="6" height="39" fill="#FFD36E"/><path d="M32 19C27 9 17 12 20 17.5c1.8 3 12 1.5 12 1.5zM32 19c5-10 15-7 12-1.5-1.8 3-12 1.5-12 1.5z" fill="#FFD36E"/></svg>';
const SEED_CARD_ART = '<svg viewBox="0 0 120 120"><circle cx="60" cy="62" r="50" fill="#FFF8EC"/><path d="M28 92c8-10 56-10 64 0-8 7-56 7-64 0z" fill="#A9764F"/><path d="M60 90V66" stroke="#5FAE4E" stroke-width="5" stroke-linecap="round"/><path d="M60 70C52 55 36 57 33 64c7 9 19 10 27 6z" fill="#6DBB5A"/><path d="M60 66c6-16 24-17 28-9-6 10-19 13-28 9z" fill="#86CC6E"/><ellipse cx="60" cy="88" rx="7" ry="4.5" fill="#8C5A35"/></svg>';

function treeSVG(sfx, cls) {
  const u = (n) => n + sfx;
  const f = (n) => n.toFixed(1);
  const lv = (k) => (k >= SMALL_BASE ? ` class="lv off" data-k="${k}"` : '');
  const back = (arr, c) => arr.map(([x, y, r], k) => `<circle${c ? c(k) : ''} cx="${x + 3}" cy="${y + 5}" r="${r}"/>`).join('');
  const mid = (arr, c) => arr.map(([x, y, r], k) => `<circle${c ? c(k) : ''} cx="${x}" cy="${y}" r="${r - 3}" fill="url(#${u('lf')})"/>`).join('');
  const hi = (arr, c) => arr.map(([x, y, r], k) => `<circle${c ? c(k) : ''} cx="${f(x - r * 0.34)}" cy="${f(y - r * 0.38)}" r="${f(r * 0.34)}"/>`).join('');
  const edge = EDGE.map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" transform="rotate(${a} ${x} ${y})"/>`).join('');
  const fl = FLOWERS.map(([x, y], i) => { const s = 13 + ((i * 7) % 9); return `<use href="#${u('fl')}" x="${f(x - s / 2)}" y="${f(y - s / 2)}" width="${s}" height="${s}" style="--i:${i}"/>`; }).join('');
  const ap = APPLES.map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="aps" style="--i:${i}"><use href="#${u('ap')}" x="-12" y="-14" width="24" height="26"/></g></g>`).join('');
  const gl = APPLES.filter((_, i) => i % 3 === 0).map(([x, y], i) => `<path class="glint" style="--i:${i}" d="M${x + 8} ${y - 14}l1.3 3.2 3.2 1.3-3.2 1.3-1.3 3.2-1.3-3.2-3.2-1.3 3.2-1.3z" fill="#FFF7C2"/>`).join('');
  const petals = [0, 72, 144, 216, 288].map((a) => `<ellipse cy="-4.4" rx="3.5" ry="4.5" transform="rotate(${a})"/>`).join('');
  return `<svg class="tree ${cls || ''}" viewBox="0 0 300 320" aria-hidden="true">
<defs>
<radialGradient id="${u('lf')}" cx=".36" cy=".3" r=".75"><stop offset="0" style="stop-color:var(--leaf-hi)"/><stop offset="1" style="stop-color:var(--leaf-mid)"/></radialGradient>
<radialGradient id="${u('apg')}" cx=".36" cy=".32" r=".7"><stop offset="0" style="stop-color:var(--ap-hi)"/><stop offset=".55" style="stop-color:var(--ap-mid)"/><stop offset="1" style="stop-color:var(--ap-lo)"/></radialGradient>
<linearGradient id="${u('tr')}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9A663D"/><stop offset=".55" stop-color="#7A4D2C"/><stop offset="1" stop-color="#5C3820"/></linearGradient>
<radialGradient id="${u('soil')}" cx=".5" cy=".15" r=".85"><stop offset="0" stop-color="#AE7B53"/><stop offset="1" stop-color="#7A4C2E"/></radialGradient>
<radialGradient id="${u('pt')}" cx=".5" cy=".85" r=".9"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#FFF5F8"/><stop offset="1" stop-color="#F7C3D4"/></radialGradient>
<symbol id="${u('ap')}" viewBox="-12 -14 24 26"><path d="M0 -6.5C-3.5 -10 -11.5 -9 -11 0.5C-10.6 8 -5 12 0 10.4C5 12 10.6 8 11 0.5C11.5 -9 3.5 -10 0 -6.5Z" fill="url(#${u('apg')})"/><path d="M0 -6.5C0 -9.5 1 -11.6 2.6 -13" stroke="#6B4423" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M1.8 -10.6C5 -14.2 9.4 -12.8 10.4 -11.2C7.8 -8.8 4.4 -8.8 1.8 -10.6Z" fill="#5FAE4E"/><ellipse cx="-5" cy="-1.6" rx="2.3" ry="3.6" fill="#fff" opacity=".42" transform="rotate(22 -5 -1.6)"/></symbol>
<symbol id="${u('fl')}" viewBox="-9 -9 18 18"><g fill="url(#${u('pt')})">${petals}</g><circle r="2.4" fill="#F7C548"/><circle r="1" fill="#E3A21C"/></symbol>
</defs>
<ellipse cx="150" cy="311" rx="112" ry="9" fill="#2B3A1A" opacity=".12"/>
<g class="ghost"><path d="M150 70C178 68 196 84 204 96C222 100 236 116 236 136C252 152 258 178 250 204C246 226 226 238 204 236C190 248 168 252 150 250C132 252 110 248 96 236C74 238 54 226 50 204C42 178 48 152 64 136C64 116 78 100 96 96C104 84 122 68 150 70Z" fill="#fff" fill-opacity=".13" stroke="#fff" stroke-opacity=".8" stroke-width="2" stroke-dasharray="6 6"/><path d="M141 250L139 288M159 250L162 288" stroke="#fff" stroke-opacity=".65" stroke-width="2" stroke-dasharray="5 6" fill="none"/><text x="150" y="112" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fff" stroke="#4F7A43" stroke-opacity=".35" stroke-width="3" paint-order="stroke">다 자라면 이만큼!</text></g>
<path d="M62 304C86 285 214 285 238 304C214 315 86 315 62 304Z" fill="url(#${u('soil')})"/>
<ellipse class="wet" cx="150" cy="301" rx="54" ry="7.5" fill="#4E2E19"/>
<path d="M84 297c3 1 6 1 9 0M204 297.5c3 1 6 1 9 0M114 292.5c2 .8 4 .8 6 0M178 291.5c2 .8 4 .8 6 0" stroke="#fff" stroke-opacity=".2" stroke-width="1.6" stroke-linecap="round" fill="none"/>
<path d="M57 306l3-11 2.6 9 2.6-13 2.4 15zM233 306l2.4-12 2.6 10 2.6-9 2.4 11z" fill="#5FA94C"/>
<g class="stg g-big">
<path d="M136 303C140 286 142 266 140 246C133 232 123 222 110 213L115 205C128 212 138 221 145 231C146 218 146 204 144 190L153 189C155 203 155 217 154 230C161 219 172 210 187 202L192 209C178 217 167 228 162 244C159 262 161 284 166 303Z" fill="url(#${u('tr')})"/>
<path d="M126 304Q137 300 141 289L143 304ZM175 304Q164 300 159 289L157 304Z" fill="#6E4426"/>
<path d="M148 297C149 281 150 267 149 253M156 270c2-6 2-12 1-17" stroke="#000" stroke-opacity=".13" stroke-width="2" fill="none" stroke-linecap="round"/>
<g class="sway">
<g style="fill:var(--leaf-lo)">${back(CANOPY)}${edge}</g>
<g>${mid(CANOPY)}</g>
<g fill="#fff" opacity=".1">${hi(CANOPY)}</g>
<g class="fl">${fl}</g>
<g class="ap">${ap}</g>
<g>${gl}</g>
</g>
</g>
<g class="stg g-sap">
<path d="M144.5 303C146.5 285 147.4 262 147 236L153 236C152.6 262 153.5 285 155.5 303Z" fill="url(#${u('tr')})"/>
<path d="M148.6 258C142 251 135 245 126 240M151.4 250C158 244 165 239 174 235" stroke="#7A4E2D" stroke-width="3.4" fill="none" stroke-linecap="round"/>
<g class="sway"><g style="fill:var(--leaf-lo)">${back(SMALL, lv)}</g><g>${mid(SMALL, lv)}</g><g fill="#fff" opacity=".1">${hi(SMALL, lv)}</g></g>
</g>
<g class="stg g-sprout"><g class="sway">
<path d="M150 299C150 287 149 277 151 265" stroke="#5FAE4E" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M151 268C141 255 125 256 120 263C128 272 142 273 151 268Z" fill="url(#${u('lf')})"/>
<path d="M151 265C160 250 178 250 184 258C176 268 160 271 151 265Z" fill="url(#${u('lf')})"/>
<path d="M150 268C141 262 132 261 125 263M152 265c8-6 17-8 26-6" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" fill="none" stroke-linecap="round"/>
</g></g>
<g class="stg g-seed">
<ellipse cx="150" cy="291" rx="7.5" ry="5.5" fill="#8C5A35"/>
<ellipse cx="147.6" cy="289" rx="2.6" ry="1.5" fill="#fff" opacity=".38"/>
</g>
<path d="M98 299.5C122 293.5 178 293.5 202 299.5C186 309 114 309 98 299.5Z" fill="#93603C"/>
<path d="M112 298.5C130 295.5 170 295.5 188 298.5" stroke="#fff" stroke-opacity=".14" stroke-width="1.6" fill="none" stroke-linecap="round"/>
<g class="stg g-seed"><g transform="translate(196 302)">
<rect x="-1.6" y="-38" width="3.2" height="40" rx="1.6" fill="#B88A5A"/>
<rect x="-16" y="-46" width="32" height="17" rx="4" fill="#FFF6E3" stroke="#D9BE96"/>
<text class="seed-var" x="0" y="-34.2" font-size="9.5" text-anchor="middle" fill="#7A5A3A" font-weight="800">홍로</text>
</g></g>
</svg>`;
}

const $ = (id) => document.getElementById(id);
const E = {};
['app', 'scene', 'treeWrap', 'treeBounce', 'treeIn', 'fx', 'sign', 'signName', 'signVar', 'crate', 'toast', 'pBadge', 'pStage', 'pCount', 'pSide', 'steps', 'stepsFill', 'reward', 'rewardImg', 'rewardName',
  'btnMain', 'mainIco', 'mainT', 'mainS', 'btnShop', 'btnFriend', 'btnGift', 'noti', 'notiMsg', 'notiIc', 'backdrop', 'sheet', 'sheetT', 'sheetP', 'sheetB', 'sheetX', 'modal', 'coach', 'confetti',
  'intro', 'ipB', 'ipC', 'goC', 'goPlant', 'backB', 'backC', 'vars', 'nameIn', 'chips', 'pvName', 'pvVar', 'demoDay', 'dDay', 'dSkip', 'dReset', 'season', 'btnSound'].forEach((k) => { E[k] = $(k); });

const def = () => ({ v: 1, name: '', variety: 'hongro', pts: START, day: 1, lastWater: 0, friendDay: 0, friendCnt: 0, orders: 0, waterDays: 0, trees: 0, coupons: [], forgave: -1, coach: 0, hello: 0, sound: true, given: {}, phase: 'grow' });
let S = load();
function load() {
  try { const o = JSON.parse(localStorage.getItem(KEY)); if (o && o.v === 1) return Object.assign(def(), o); } catch (e) {}
  return def();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

const stageIdx = (p) => { let i = 0; STAGES.forEach((s, k) => { if (p >= s.at) i = k; }); return i; };
const frac = (p) => { const i = stageIdx(p); if (i >= 5) return 1; const a = STAGES[i].at, b = STAGES[i + 1].at; return (p - a) / (b - a); };
const V = () => VAR[S.variety] || VAR.hongro;
const owner = () => `${S.name || '우리 가족'}의 ${V().n}나무`;
const won = (n) => n.toLocaleString('ko-KR') + '원';
const josa = (w, a, b) => { const c = (w || '').charCodeAt((w || '').length - 1); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 ? a : b; };
const NB = '\u00A0';
const brixOf = (p) => { const a = STAGES[4].at; if (p < a) return null; return 6 + (V().brix - 6) * Math.min(1, (p - a) / (MAX - a)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function hex(c) { const n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function mix(a, b, t) { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
function appleColors(t, red) {
  const G = { hi: '#F6FBC4', mid: '#C9E35A', lo: '#86A82C' }, Y = { hi: '#FFEFB0', mid: '#F5BC3E', lo: '#C97A1B' };
  const [A, B, w] = t < 0.5 ? [G, Y, t / 0.5] : [Y, red, (t - 0.5) / 0.5];
  return { hi: mix(A.hi, B.hi, w), mid: mix(A.mid, B.mid, w), lo: mix(A.lo, B.lo, w) };
}
function setLeaves(svg, idx, p) {
  const n = idx === 2 ? SMALL_BASE + Math.round(frac(p) * (SMALL.length - SMALL_BASE + 1)) : SMALL.length;
  svg.querySelectorAll('.lv').forEach((c) => c.classList.toggle('off', +c.dataset.k >= n));
}
function paintTree(svg, idx, p, variety) {
  for (let k = 0; k < 6; k++) svg.classList.toggle('st-' + k, k === idx);
  setLeaves(svg, idx, p);
  const t = idx >= 5 ? 1 : idx === 4 ? frac(p) : 0;
  const c = appleColors(t, (VAR[variety] || VAR.hongro).red);
  svg.style.setProperty('--ap-hi', c.hi);
  svg.style.setProperty('--ap-mid', c.mid);
  svg.style.setProperty('--ap-lo', c.lo);
  svg.style.setProperty('--apz', (0.62 + 0.33 * t).toFixed(3));
  const sv = svg.querySelector('.seed-var'); if (sv) sv.textContent = (VAR[variety] || VAR.hongro).n;
}

let AC = null;
function audio() {
  if (!S.sound) return null;
  try {
    if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); }
    if (AC.state === 'suspended') AC.resume();
  } catch (e) { return null; }
  return AC;
}
function tone(f, t, d, type, g, slide) {
  const a = audio(); if (!a) return;
  const o = a.createOscillator(), v = a.createGain(), t0 = a.currentTime + t;
  o.type = type || 'sine';
  o.frequency.setValueAtTime(f, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(f * slide, t0 + d);
  v.gain.setValueAtTime(0.0001, t0);
  v.gain.exponentialRampToValueAtTime(g || 0.05, t0 + 0.015);
  v.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  o.connect(v); v.connect(a.destination); o.start(t0); o.stop(t0 + d + 0.05);
}
const sfx = {
  tap: () => tone(660, 0, 0.06, 'triangle', 0.025),
  water: () => [0, 0.12, 0.22, 0.34, 0.46, 0.58].forEach((t, i) => tone(1250 + (i % 3) * 140, t, 0.1, 'sine', 0.03, 0.55)),
  grow: () => [523, 659, 784].forEach((f, i) => tone(f, i * 0.07, 0.2, 'triangle', 0.045)),
  big: () => [392, 523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.06, 0.24, 'triangle', 0.05)),
  stage: () => [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, i * 0.09, 0.34, 'triangle', 0.055)),
  pop: () => tone(760, 0, 0.09, 'sine', 0.05, 1.7),
  harvest: () => [523, 659, 784, 659, 784, 1046, 1318].forEach((f, i) => tone(f, i * 0.11, 0.28, 'triangle', 0.055)),
  day: () => { tone(330, 0, 0.45, 'sine', 0.035, 1.5); tone(495, 0.14, 0.45, 'sine', 0.025, 1.5); },
};
const buzz = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} };

function setVH() { document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px'); }

function hillY(x) {
  if (x <= 200) { const t = x / 200; return (1 - t) ** 2 * 440 + 2 * (1 - t) * t * 416 + t * t * 432; }
  let lo = 0, hi = 1;
  for (let k = 0; k < 18; k++) { const m = (lo + hi) / 2; const xm = (1 - m) ** 2 * 200 + 2 * (1 - m) * m * 300 + m * m * 390; if (xm < x) lo = m; else hi = m; }
  const t = (lo + hi) / 2; return (1 - t) ** 2 * 432 + 2 * (1 - t) * t * 448 + t * t * 424;
}
function buildOrchard() {
  let h = '';
  [[12, 0.55, 17, 4], [29, 0.72, 22, 14], [52, 0.92, 28, 2]].forEach(([dy, k, step, off]) => {
    for (let x = off; x < 398; x += step) {
      const y = hillY(Math.min(390, x)) + dy;
      h += `<use href="#mt" x="${(x - 10 * k).toFixed(1)}" y="${(y - 24 * k).toFixed(1)}" width="${(20 * k).toFixed(1)}" height="${(26 * k).toFixed(1)}"/>`;
    }
  });
  document.getElementById('orchRows').innerHTML = h;
}

let treeSvg;
const CRATE_SLOTS = [[20, 40], [37, 41], [54, 40], [71, 41], [88, 40], [104, 41], [28, 32], [45, 31], [62, 32], [79, 31], [96, 32], [38, 23], [60, 22], [82, 23]];
function crateSVG(id, full) {
  const apple = APPLE_FLY.replace(/^<svg[^>]*>/, '').replace('</svg>', '');
  return `<svg viewBox="0 0 120 96"><defs><symbol id="${id}" viewBox="-12 -14 24 26">${apple}</symbol></defs>
<rect x="9" y="30" width="102" height="14" rx="3" fill="#8E5E33"/>
${CRATE_SLOTS.map(([x, y], i) => `<g transform="translate(${x} ${y})"><g class="ca${full ? ' in' : ''}" data-i="${i}"><use href="#${id}" x="-12" y="-14" width="24" height="26"/></g></g>`).join('')}
<rect x="4" y="42" width="112" height="15" rx="3" fill="#D7A066"/><rect x="4" y="59" width="112" height="15" rx="3" fill="#C98F55"/><rect x="4" y="76" width="112" height="16" rx="3" fill="#D7A066"/>
<path d="M16 49h28M62 51h38M20 84h22M72 86h30" stroke="#B57E47" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
<rect x="1.5" y="38" width="10" height="56" rx="3" fill="#A86F3B"/><rect x="108.5" y="38" width="10" height="56" rx="3" fill="#A86F3B"/>
<g fill="#7A4A22"><circle cx="6.5" cy="49" r="1.3"/><circle cx="6.5" cy="66" r="1.3"/><circle cx="6.5" cy="84" r="1.3"/><circle cx="113.5" cy="49" r="1.3"/><circle cx="113.5" cy="66" r="1.3"/><circle cx="113.5" cy="84" r="1.3"/></g>
<text x="60" y="70.6" text-anchor="middle" font-size="11.5" font-weight="900" fill="#74441C" letter-spacing=".5">열매나무</text></svg>`;
}
function mountTrees() {
  E.treeIn.innerHTML = treeSVG('_t', '');
  treeSvg = E.treeIn.querySelector('svg');
  E.crate.innerHTML = crateSVG('cap', false);
  const path = document.getElementById('pathL');
  if (path) path.innerHTML = STAGES.map((st, k) => `<li class="${k < 2 ? 'pre' : k === 2 ? 'start' : ''}"><span>${STEP_ICON[k]}</span>${st.n}</li>`).join('');
}

function renderSteps(idx, p) {
  E.steps.innerHTML = STAGES.map((s, k) => `<li class="${k < idx ? 'done' : k === idx ? 'now' : ''}"><span class="dot">${STEP_ICON[k]}</span><span>${s.n}</span>${s.rw ? `<span class="rw">${s.rw}</span>` : ''}</li>`).join('');
  const pos = idx >= 5 ? 5 : idx + frac(p);
  E.stepsFill.style.setProperty('--p', (pos / 5).toFixed(4));
}

let entering = false;
function render() {
  const idx = stageIdx(S.pts), v = V(), done = S.phase === 'done';
  if (entering) setLeaves(treeSvg, idx, S.pts);
  else paintTree(treeSvg, idx, S.pts, S.variety);
  treeSvg.querySelectorAll('.aps').forEach((a) => a.classList.toggle('gone', done));
  const g = idx >= 5 ? 1 : idx >= 3 ? 0.93 + 0.07 * frac(S.pts) : idx === 2 ? 0.9 + 0.1 * frac(S.pts) : 0.88 + 0.12 * frac(S.pts);
  E.treeIn.style.setProperty('--g', g.toFixed(3));
  E.scene.classList.toggle('k-bloom', idx === 3);
  E.scene.classList.toggle('k-fruit', idx === 4);
  E.scene.classList.toggle('k-harvest', idx === 5);
  E.signName.textContent = S.name || '우리 가족';
  E.signVar.textContent = v.n;
  E.sign.classList.toggle('hide', entering);
  E.crate.classList.toggle('on', idx === 5);
  if (!done) E.crate.querySelectorAll('.ca').forEach((c) => c.classList.remove('in'));

  E.pBadge.textContent = done ? '수확 완료' : `${idx + 1}단계`;
  E.pStage.textContent = done ? `${S.trees}그루째 거뒀어요` : STAGES[idx].n;
  if (done) E.pCount.innerHTML = `교환권을 받았어요 · <b>새 나무</b>를 심어요`;
  else if (idx < 5) {
    const nx = STAGES[idx + 1], left = nx.at - S.pts;
    E.pCount.innerHTML = `${nx.n}까지 물 <b>${left}번</b> 남았어요`;
  } else E.pCount.innerHTML = `다 익었어요! 이제 <b>수확</b>해요`;

  const b = brixOf(S.pts);
  if (b !== null && !done) {
    E.pSide.className = 'p-side tap';
    const mc = appleColors(idx >= 5 ? 1 : frac(S.pts), v.red).mid;
    E.pSide.innerHTML = `<u>당도</u><b>${b.toFixed(1)}<small style="font-size:11px;color:#9A9087"> / ${v.brix}${NB}브릭스</small></b><span class="meter" style="--m:${Math.min(100, (b / v.brix) * 100).toFixed(0)}%;--mc:${mc}"><i></i></span>`;
  } else {
    E.pSide.className = 'p-side';
    E.pSide.innerHTML = `물 준 날<b>${S.waterDays}일</b>${S.orders ? `<span>주문 ${S.orders}번</span>` : ''}`;
  }
  renderSteps(done ? 5 : idx, S.pts);
  E.rewardImg.src = v.rwImg;
  E.rewardName.textContent = v.rw;

  const m = E.btnMain;
  m.classList.remove('done', 'harvest', 'plant');
  if (done) { m.classList.add('plant'); E.mainIco.innerHTML = ICON.seedling; E.mainT.textContent = '새 나무 심기'; E.mainS.textContent = `${S.trees + 1}번째 나무`; }
  else if (idx === 5) { m.classList.add('harvest'); E.mainIco.innerHTML = ICON.basket; E.mainT.textContent = '수확하기'; E.mainS.textContent = `사과 ${APPLES.length}알`; }
  else if (S.lastWater === S.day) { m.classList.add('done'); E.mainIco.innerHTML = ICON.check; E.mainT.textContent = '오늘 물 줬어요'; E.mainS.textContent = '내일 또 만나요'; }
  else { E.mainIco.innerHTML = ICON.can; E.mainT.textContent = '물 주기'; E.mainS.textContent = '하루 한 번 · 3초'; }

  E.demoDay.textContent = `${S.day}일째`;
  E.dSkip.disabled = done || idx === 5;
  const mo = new Date().getMonth() + 1;
  E.season.innerHTML = `<i>${ICON.leaf}</i>지금 거창 과수원 · ${mo}월 ${MONTH[mo]}`;
}

let toastT;
function toast(msg, ms) {
  E.toast.textContent = msg;
  E.toast.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => E.toast.classList.remove('on'), ms || 2300);
}
let notiT;
function noti(msg, delay) {
  const show = (tries) => {
    if ((modalOpen || sheetOpen) && tries < 30) { setTimeout(() => show(tries + 1), 400); return; }
    E.notiMsg.textContent = msg;
    E.noti.classList.add('on');
    E.app.classList.add('noti-on');
    clearTimeout(notiT);
    notiT = setTimeout(hideNoti, 4200);
  };
  setTimeout(() => show(0), delay || 0);
}
function hideNoti() { E.noti.classList.remove('on'); E.app.classList.remove('noti-on'); }

let sheetOpen = false, modalOpen = false;
function openSheet(t, p, body, bind) {
  hideCoach();
  hideNoti();
  E.sheetT.textContent = t;
  E.sheetP.textContent = p;
  E.sheetB.innerHTML = body;
  E.sheetB.scrollTop = 0;
  E.sheet.classList.add('on');
  E.backdrop.classList.add('on');
  sheetOpen = true;
  if (bind) bind(E.sheetB);
}
function closeSheet() {
  E.sheet.classList.remove('on');
  if (!modalOpen) E.backdrop.classList.remove('on');
  sheetOpen = false;
}
function openModal(html, bind) {
  hideCoach();
  hideNoti();
  E.modal.innerHTML = html;
  E.modal.scrollTop = 0;
  E.modal.classList.add('on');
  E.backdrop.classList.add('on');
  modalOpen = true;
  if (bind) bind(E.modal);
}
function closeModal() {
  E.modal.classList.remove('on');
  if (!sheetOpen) E.backdrop.classList.remove('on');
  modalOpen = false;
}
function modalTree(idx) {
  const html = treeSVG('_m' + Math.floor(Math.random() * 1e6), '');
  return `<div class="m-art"><div class="halo"></div>${html}</div>`;
}
function paintModalTree(idx) {
  const svg = E.modal.querySelector('.m-art svg');
  if (!svg) return;
  paintTree(svg, idx, idx === 4 ? STAGES[4].at + 1 : S.pts, S.variety);
  if (idx === 4) svg.style.setProperty('--apz', '0.95');
}

let coachT;
function coach(targetId, text, where) {
  const tg = $(targetId); if (!tg) return;
  const a = E.app.getBoundingClientRect(), r = tg.getBoundingClientRect();
  E.coach.textContent = text;
  E.coach.className = 'coach ' + (where === 'below' ? 'up' : 'down');
  const bw = Math.min(220, a.width - 24);
  E.coach.style.maxWidth = bw + 'px';
  E.coach.style.left = '0px';
  E.coach.style.top = '0px';
  const w = E.coach.offsetWidth, h = E.coach.offsetHeight;
  const cx = r.left - a.left + r.width / 2;
  const left = Math.max(10, Math.min(a.width - w - 10, cx - w / 2));
  const top = where === 'below' ? r.bottom - a.top + 12 : r.top - a.top - h - 12;
  E.coach.style.left = left + 'px';
  E.coach.style.top = top + 'px';
  E.coach.style.setProperty('--ax', (cx - left) + 'px');
  requestAnimationFrame(() => E.coach.classList.add('on'));
  clearTimeout(coachT);
  coachT = setTimeout(hideCoach, 6000);
}
function hideCoach() { E.coach.classList.remove('on'); }

function wrapRect() { return { w: E.treeWrap.clientWidth, h: E.treeWrap.clientHeight }; }
function fxEl(cls, x, y, html) {
  const d = document.createElement('div');
  d.className = cls;
  d.style.left = x + 'px';
  d.style.top = y + 'px';
  if (html) d.innerHTML = html;
  E.fx.appendChild(d);
  return d;
}
function canopyTop(idx) { return [0.86, 0.76, 0.44, 0.2, 0.2, 0.2][idx]; }

function floatText(text, big) {
  const { w, h } = wrapRect(), idx = stageIdx(S.pts);
  const d = fxEl('float' + (big ? ' big' : ''), w / 2, h * canopyTop(idx) - 6, '');
  d.textContent = text;
  d.style.transform = 'translateX(-50%)';
  d.animate([{ opacity: 0, transform: 'translate(-50%,10px) scale(.8)' }, { opacity: 1, transform: 'translate(-50%,-8px) scale(1)', offset: 0.25 }, { opacity: 1, transform: 'translate(-50%,-26px)', offset: 0.7 }, { opacity: 0, transform: 'translate(-50%,-44px)' }], { duration: 1300, easing: 'ease-out' }).onfinish = () => d.remove();
}
function sparkle(n) {
  const { w, h } = wrapRect(), idx = stageIdx(S.pts);
  const cy = h * (idx >= 3 ? 0.45 : idx === 2 ? 0.6 : canopyTop(idx) + 0.06), cx = w / 2;
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.4, dist = w * (idx >= 3 ? 0.3 : idx === 2 ? 0.22 : 0.16) + Math.random() * 24;
    const s = fxEl('spark', cx - 6, cy - 6, '');
    const sc = 0.6 + Math.random() * 0.8;
    s.animate([{ transform: 'translate(0,0) scale(0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px) scale(${sc}) rotate(90deg)`, opacity: 1, offset: 0.6 }, { transform: `translate(${Math.cos(a) * dist * 1.15}px,${Math.sin(a) * dist * 1.15}px) scale(0) rotate(160deg)`, opacity: 0 }], { duration: 900 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove();
  }
}
function bounce(big) {
  const k = big ? 1.09 : 1.05;
  E.treeBounce.animate([{ transform: 'scale(1)' }, { transform: `scale(${k},${2 - k})`, offset: 0.25 }, { transform: `scale(${2 - k * 0.98},${k})`, offset: 0.55 }, { transform: 'scale(1)' }], { duration: big ? 750 : 600, easing: 'ease-out' });
}
function wetSoil() {
  const w = treeSvg.querySelector('.wet'); w.classList.add('on');
  setTimeout(() => w.classList.remove('on'), 900);
}

function pour(kind, side) {
  return new Promise((res) => {
    const { w, h } = wrapRect(), idx = stageIdx(S.pts);
    const isSack = kind === 'sack';
    const tw = w * (isSack ? 0.2 : 0.26), th = tw * (isSack ? 62 / 56 : 48 / 64);
    const flip = side === 'l' && !isSack ? -1 : 1;
    const rot = isSack ? (side === 'l' ? 40 : -40) : side === 'l' ? 32 : -32;
    const a = (rot * Math.PI) / 180, ox = tw * 0.6, oy = th * 0.6;
    let tx, ty;
    if (isSack) { tx = side === 'l' ? tw * 0.92 : tw * 0.08; ty = th * 0.2; }
    else { tx = flip < 0 ? tw * (1 - 2 / 64) : tw * (2 / 64); ty = th * (13 / 48); }
    const dx = tx - ox, dy = ty - oy;
    const relX = ox + dx * Math.cos(a) - dy * Math.sin(a), relY = oy + dx * Math.sin(a) + dy * Math.cos(a);
    const aimX = w * 0.5 + (side === 'l' ? -10 : 10);
    const aimY = h * [0.7, 0.62, 0.34, 0.1, 0.1, 0.1][idx];
    const tool = fxEl('tool', aimX - relX, aimY - relY, isSack ? SACK_BIG : ICON.canColor);
    tool.style.width = tw + 'px';
    tool.style.height = th + 'px';
    tool.firstChild.style.transform = `scaleX(${flip})`;
    tool.animate([{ opacity: 0, transform: 'translate(10px,-14px) rotate(0)' }, { opacity: 1, transform: 'translate(0,0) rotate(0)', offset: 0.18 }, { opacity: 1, transform: `rotate(${rot}deg)`, offset: 0.32 }, { opacity: 1, transform: `rotate(${rot}deg)`, offset: 0.82 }, { opacity: 0, transform: 'translate(6px,-8px) rotate(0)' }], { duration: 1650, easing: 'ease-in-out' }).onfinish = () => tool.remove();
    const soilY = h * 0.925;
    const count = isSack ? 22 : 16;
    setTimeout(() => {
      if (isSack) sfx.big(); else sfx.water();
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const d = fxEl(isSack ? 'grain' : 'drop', aimX + (Math.random() * 8 - 4), aimY, '');
          if (isSack) d.style.background = ['#C8962E', '#A9772A', '#E0B85A'][i % 3];
          const fall = soilY - aimY + (Math.random() * 10 - 5);
          const drift = (w * 0.5 - aimX) + (Math.random() * 16 - 8) * (isSack ? 1.8 : 1);
          d.animate([{ transform: 'translate(0,0) scale(.6)', opacity: 0.95 }, { transform: `translate(${drift}px,${fall}px) scale(1)`, opacity: 0.95, offset: 0.92 }, { transform: `translate(${drift}px,${fall}px) scale(.3)`, opacity: 0 }], { duration: 520 + Math.random() * 260, easing: 'cubic-bezier(.45,0,.9,.6)' }).onfinish = () => d.remove();
        }, i * 45);
      }
      setTimeout(() => {
        const rg = fxEl('ring', w / 2 - 20, soilY - 6, '');
        rg.animate([{ transform: 'scale(.4)', opacity: 0.9 }, { transform: 'scale(2.2)', opacity: 0 }], { duration: 700, easing: 'ease-out' }).onfinish = () => rg.remove();
        if (!isSack) wetSoil();
      }, 520);
    }, 420);
    setTimeout(res, 1500);
  });
}

function giftPop() {
  return new Promise((res) => {
    const { w, h } = wrapRect(), idx = stageIdx(S.pts);
    const sz = w * 0.2;
    const g = fxEl('tool', w / 2 - sz / 2, h * Math.max(0.05, canopyTop(idx) - 0.24), GIFT_BIG);
    g.style.width = sz + 'px'; g.style.height = sz + 'px';
    sfx.pop();
    g.animate([{ opacity: 0, transform: 'translateY(20px) scale(.4)' }, { opacity: 1, transform: 'translateY(0) scale(1.1)', offset: 0.3 }, { transform: 'scale(1)', offset: 0.5 }, { opacity: 1, transform: 'scale(1.15) rotate(-8deg)', offset: 0.75 }, { opacity: 0, transform: 'scale(.2) rotate(10deg)' }], { duration: 1300, easing: 'ease-out' }).onfinish = () => g.remove();
    setTimeout(res, 1050);
  });
}

function friendTag(name) {
  const { w, h } = wrapRect();
  const t = fxEl('friend-tag', w * 0.04, h * [0.8, 0.74, 0.5, 0.26, 0.26, 0.26][stageIdx(S.pts)], '');
  t.textContent = `${name}${josa(name, '이', '가')} 물을 줬어요`;
  t.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none', offset: 0.15 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: 1900 }).onfinish = () => t.remove();
}

let busy = false;
async function grow(n, src) {
  const before = stageIdx(S.pts);
  if (S.pts >= MAX) return;
  S.pts = Math.min(MAX, S.pts + n);
  save();
  const after = stageIdx(S.pts);
  const label = { water: '+1 자람', order: `+${ORDER} 쑥!`, friend: '+1 친구 물', gift: `+${GIFT_PTS} 선물 물`, skip: '쑥쑥!' }[src] || `+${n}`;
  floatText(label, src === 'order' || src === 'skip' || src === 'gift');
  sparkle(src === 'water' || src === 'friend' ? 8 : 14);
  bounce(src !== 'water' && src !== 'friend');
  buzz(src === 'order' ? 30 : 12);
  if (src === 'water' || src === 'friend') sfx.grow();
  render();
  if (after > before) { await wait(700); stageUp(after, src, before); }
  else afterAction(src);
}

function afterAction(src) {
  if (src !== 'water') return;
  if (S.coach === 0) { S.coach = 1; save(); setTimeout(() => coach('dDay', '체험용 버튼이에요. 눌러서 내일로 넘어가 보세요', 'below'), 400); }
  else if (S.coach === 2) { S.coach = 3; save(); setTimeout(() => coach('btnShop', '오늘 물은 다 줬어요. 사과를 사면 거름이 와요 — 눌러 보세요', 'above'), 400); }
}

const STAGE_TXT = {
  1: { t: '새싹이 돋았어요!', p: () => `물을 잘 마셨어요. 어린 나무까지 물${NB}${STAGES[2].at - S.pts}번${NB}남았어요.` },
  2: { t: '어린 나무가 됐어요!', p: () => `가지가 뻗기 시작했어요. 꽃이 피기까지 물${NB}${STAGES[3].at - S.pts}번${NB}남았어요.` },
  3: { t: '사과꽃이 피었어요!', p: () => '봄날 거창 과수원처럼 하얀 사과꽃이 가득해요.', gift: () => ({ ic: ICON.flower, b: '꽃 소식 알림톡', s: '과수원 꽃 사진과 함께 보내 드려요' }) },
  4: { t: '열매가 맺혔어요!', p: () => '작은 풋사과가 열렸어요. 이제 당도가 오를 차례예요.', gift: () => ({ ic: ICON.coupon, b: '1,000원 쿠폰', s: '1만 원 이상 주문 때 · 쿠폰함에 넣었어요' }) },
  5: { t: '빨갛게 다 익었어요!', p: () => `당도 ${V().brix}${NB}브릭스까지 올랐어요. 이제 수확할 수${NB}있어요!`, gift: () => ({ img: V().rwImg, b: V().rw, s: '수확하면 교환권으로 드려요 · 배송비 없음' }) },
};
function stageUp(idx, src, before) {
  sfx.stage();
  buzz(40);
  const T = STAGE_TXT[idx];
  const prev = STAGES[idx - 1].n;
  const jump = typeof before === 'number' && idx - before > 1 ? `쑥 자라서 ${prev}${josa(prev, '을', '를')} 건너뛰었어요. ` : '';
  if (idx === 4 && !S.given['f' + S.trees]) { S.given['f' + S.trees] = 1; S.coupons.push({ t: '1,000원 쿠폰', day: S.day }); save(); }
  if (idx >= 3) confetti(idx === 5 ? 140 : 70);
  const gf = T.gift ? T.gift() : null;
  openModal(`${modalTree(idx)}<p class="m-kicker">${idx + 1}단계 · ${STAGES[idx].n}</p><h3>${T.t}</h3><p>${jump}${T.p()}</p>${gf ? `<div class="m-gift"><span class="gi">${gf.img ? `<img src="${gf.img}" alt="">` : gf.ic}</span><span><b>${gf.b}</b><span>${gf.s}</span></span></div>` : ''}<button class="btn-l" id="mOk">${idx === 5 ? '수확하러 가기' : '좋아요'}</button>`, (m) => {
    paintModalTree(idx);
    m.querySelector('#mOk').onclick = () => {
      sfx.tap();
      closeModal();
      if (idx === 3) noti(`${owner()}에 사과꽃이 피었어요. 거창 과수원 꽃 소식도 함께 보내 드려요.`, 350);
      if (idx === 4) noti('열매가 맺혔어요! 1,000원 쿠폰이 쿠폰함에 들어갔어요.', 350);
      if (idx === 5) { noti(`${owner()}가 다 익었어요. 지금 수확하러${NB}오세요!`, 350); E.btnMain.classList.add('nudge'); setTimeout(() => E.btnMain.classList.remove('nudge'), 4000); }
      afterAction(src);
    };
  });
}

async function onMain() {
  if (busy) return;
  hideCoach();
  if (S.phase === 'done') { sfx.tap(); return openIntro('B', 'replant'); }
  const idx = stageIdx(S.pts);
  if (idx === 5) return harvest();
  if (S.lastWater === S.day) { sfx.tap(); toast('오늘 물은 줬어요 · 위 ‘하루 넘기기’로 내일로 가 보세요'); coach('dDay', '체험용 버튼이에요. 눌러서 내일로 넘어가 보세요', 'below'); return; }
  busy = true;
  S.lastWater = S.day; S.waterDays++; save();
  E.btnMain.classList.remove('nudge');
  try { await pour('can', 'r'); await grow(1, 'water'); } finally { busy = false; }
}

function nextDay() {
  if (busy) return;
  hideCoach();
  closeSheet();
  S.day++;
  save();
  sfx.day();
  E.scene.classList.remove('night'); void E.scene.offsetWidth; E.scene.classList.add('night');
  setTimeout(() => E.scene.classList.remove('night'), 1150);
  render();
  const gap = S.day - S.lastWater;
  if (S.phase === 'grow' && S.lastWater > 0 && gap >= 2 && S.forgave !== S.lastWater && stageIdx(S.pts) < 5) {
    S.forgave = S.lastWater; save();
    setTimeout(() => openModal(`${modalTree(stageIdx(S.pts))}<p class="m-kicker" style="color:#3D86C6">놓친 날은 봐줘요</p><h3>${GAP[gap] || gap + '일'} 만이에요!</h3><p>그동안 거창에 비가 와서 나무는 잘 지냈어요. 시들지 않고, 진도도 그대로예요.</p><button class="btn-l" id="mOk">물 주러 가기</button>`, (m) => {
      paintModalTree(stageIdx(S.pts));
      m.querySelector('#mOk').onclick = () => { sfx.tap(); closeModal(); E.btnMain.classList.add('nudge'); };
    }), 650);
    return;
  }
  setTimeout(() => toast(`${S.day}일째 아침이에요 · 물을 줄 수 있어요`), 500);
  if (S.coach === 1) { S.coach = 2; save(); }
}

async function skipStage() {
  if (busy || S.phase === 'done') return;
  const idx = stageIdx(S.pts);
  if (idx >= 5) return;
  hideCoach();
  busy = true;
  sfx.big();
  try { await grow(STAGES[idx + 1].at - S.pts, 'skip'); } finally { busy = false; }
}

function askReset() {
  if (busy) return;
  openModal(`<h3 style="margin-top:6px">처음부터 다시 할까요?</h3><p>이 기기에 남은 체험 기록을 지우고 어린 사과나무부터 다시 시작해요.</p><div class="btn-row"><button class="btn-l line" id="mNo">그대로 둘게요</button><button class="btn-l dark" id="mYes">처음부터</button></div>`, (m) => {
    m.querySelector('#mNo').onclick = () => { sfx.tap(); closeModal(); };
    m.querySelector('#mYes').onclick = async () => {
      const snd = S.sound;
      S = def(); S.sound = snd; save();
      closeModal(); closeSheet(); hideNoti();
      E.fx.innerHTML = '';
      E.btnMain.classList.remove('nudge');
      await sprout(450);
      sfx.pop();
      toast('처음으로 돌아왔어요 · 물을 줘 볼까요?');
      welcome();
    };
  });
}

function openShop() {
  if (busy) return;
  sfx.tap();
  const ready = stageIdx(S.pts) >= 5 || S.phase === 'done';
  const body = SHOP.map((s, i) => `<div class="shop-item"><img src="${s.img}" alt=""><div class="si"><div class="sn">${s.n}</div><div class="sp">${won(s.p)}<s>${won(s.op)}</s></div><div class="sb"><span class="tag">당도 ${s.b}브릭스</span><span class="tag g">거름 1포대</span></div></div><button class="btn-s" data-i="${i}" ${ready ? 'disabled' : ''}>${ready ? '수확 먼저' : '주문한 셈<small>체험</small>'}</button></div>`).join('') + '<p class="fine">체험용이라 실제로 주문되지 않아요. 실제로는 쇼핑몰에서 주문이 확정되면 자동으로 거름이 들어가요. 가격은 11월 5일 쇼핑몰 기준입니다.</p>';
  openSheet('사과를 사면 거름이 와요', `주문이 확정되면 내 나무에 거름${NB}1포대가 들어가요. 거름${NB}1포대면 물${NB}${ORDER}번 몫이 한 번에 자라요.`, body, (b) => {
    b.querySelectorAll('.btn-s').forEach((btn) => { btn.onclick = () => buyFake(SHOP[+btn.dataset.i]); });
  });
}
async function buyFake(item) {
  if (busy) return;
  busy = true;
  closeSheet();
  hideCoach();
  try {
    await wait(380);
    S.orders++; save();
    toast(`‘${item.n}’ 주문 고마워요! 거름 1포대가 왔어요`, 2400);
    await pour('sack', 'l');
    await grow(ORDER, 'order');
  } finally { busy = false; }
}

function openFriend() {
  if (busy) return;
  sfx.tap();
  if (S.friendDay !== S.day) { S.friendDay = S.day; S.friendCnt = 0; save(); }
  const left = FRIEND_MAX - S.friendCnt;
  const ready = stageIdx(S.pts) >= 5 || S.phase === 'done';
  const body = `<div class="talk"><p class="who">열매나무</p><div class="bub"><b>[열매나무] 물 한 번만 부탁해요</b>${owner()}가 목말라요! 아래 버튼을 눌러 물을 주면, 친구분도 물 1번을 받아요.<span class="lk">물 주러 가기</span></div></div><div class="gap"></div><button class="btn-l kakao" id="fGo" ${left <= 0 || ready ? 'disabled' : ''}>${ICON.talk.replace('<svg', '<svg width="22" height="22"')}카카오톡으로 부탁하기</button><p class="fine">체험: 누르면 친구 한 명이 물을 준 셈 쳐요 (오늘 ${S.friendCnt}/${FRIEND_MAX}명). 실제로는 카카오톡 공유로 보냅니다.</p>`;
  openSheet('친구에게 물을 부탁해요', `친구가 눌러서 물을 주면 둘 다 물${NB}1번을 받아요. 하루${NB}${FRIEND_MAX}명까지예요.`, body, (b) => {
    b.querySelector('#fGo').onclick = async () => {
      if (busy) return;
      if (S.friendCnt >= FRIEND_MAX) { toast('오늘 친구 물은 다 받았어요'); return; }
      busy = true;
      S.friendCnt++; save();
      const name = FRIENDS[(S.friendCnt - 1) % FRIENDS.length];
      closeSheet();
      try {
        await wait(380);
        friendTag(name);
        await pour('can', 'l');
        await grow(1, 'friend');
      } finally { busy = false; }
    };
  });
}

function openGift() {
  if (busy) return;
  sfx.tap();
  const ready = stageIdx(S.pts) >= 5 || S.phase === 'done';
  const body = `<div class="card3d" id="gCard"><div class="cin"><div class="cf">${SEED_CARD_ART}<div><p>열매나무 선물 상자 속</p><h4>거창에서 온<br>사과 씨앗 한 알</h4><span class="from">${S.name || '우리 가족'}${josa(S.name || '우리 가족', '이', '가')} 보냄</span></div></div><div class="cb"><img src="img/qr_gift.svg" alt="선물 받은 분 화면 QR"><div><b>폰 카메라로<br>QR을 찍어 보세요</b><span>바로 내 사과나무가 심어지고, 보내신 분께 물 ${GIFT_PTS}번이 가요.</span><img class="logo" src="img/logo.png" alt="열매나무"></div></div></div></div><div class="gap"></div><div class="btn-row"><button class="btn-l line" id="gFlip">카드 뒤집기</button><button class="btn-l green" id="gGo" ${ready ? 'disabled' : ''}>받은 분이 심은 셈</button></div><p class="fine">체험: 다른 폰 카메라로 카드 뒷면 QR을 찍으면, 선물 받은 분이 보는 첫 화면이${NB}열려요.</p>`;
  openSheet('선물 상자에 씨앗 한 알', `선물로 사과를 보내면 상자에 씨앗 카드를 넣어 드려요. 받은 분이 카드의 QR을 찍으면 그분의 나무가 생기고, 보낸 분께는 물${NB}${GIFT_PTS}번이 와요.`, body, (b) => {
    b.querySelector('#gFlip').onclick = () => { sfx.tap(); b.querySelector('#gCard').classList.toggle('flip'); };
    b.querySelector('#gCard').onclick = () => { sfx.tap(); b.querySelector('#gCard').classList.toggle('flip'); };
    b.querySelector('#gGo').onclick = async () => {
      if (busy) return;
      busy = true;
      closeSheet();
      try {
        await wait(380);
        toast('선물 받은 분이 씨앗을 심었어요! 물 3번이 왔어요', 2400);
        await giftPop();
        await grow(GIFT_PTS, 'gift');
      } finally { busy = false; }
    };
  });
}

function openBrix() {
  if (stageIdx(S.pts) < 4 || S.phase === 'done') return;
  sfx.tap();
  const b = brixOf(S.pts);
  openSheet('당도가 오르면 수확해요', `지금 ${b.toFixed(1)}${NB}브릭스예요. ${V().n}${josa(V().n, '은', '는')} 쇼핑몰에 적힌 당도 ${V().brix}${NB}브릭스까지 오르면 수확할 수 있어요.`, `<img class="info-img" src="img/brix.jpg" alt="당도계로 사과 당도를 재는 모습"><p class="fine">쇼핑몰 ‘당도 체크’처럼 당도계로 잰 숫자를 게임에서도 보여 주는 방식입니다. 사진은 열매나무 쇼핑몰 당도 체크 사진입니다.</p>`);
}

async function harvest() {
  if (busy) return;
  busy = true;
  hideCoach();
  E.btnMain.classList.remove('nudge');
  const a = E.app.getBoundingClientRect();
  const crate = E.crate.getBoundingClientRect();
  const tx = crate.left - a.left + crate.width * 0.5, ty = crate.top - a.top + crate.height * 0.32;
  const apples = [...treeSvg.querySelectorAll('.aps')];
  const slots = [...E.crate.querySelectorAll('.ca')];
  apples.forEach((ap, i) => {
    const r = ap.getBoundingClientRect();
    const fly = document.createElement('div');
    fly.className = 'fly';
    fly.innerHTML = APPLE_FLY;
    const x = r.left - a.left, y = r.top - a.top;
    fly.style.left = x + 'px'; fly.style.top = y + 'px';
    fly.style.width = r.width + 'px'; fly.style.height = r.height + 'px';
    setTimeout(() => {
      E.app.appendChild(fly);
      ap.classList.add('gone');
      const dx = tx - x - r.width / 2, dy = ty - y - r.height / 2;
      fly.animate([{ transform: 'translate(0,0) rotate(0)' }, { transform: `translate(${dx * 0.45}px,${dy * 0.45 - 70}px) rotate(160deg)`, offset: 0.5 }, { transform: `translate(${dx}px,${dy}px) rotate(320deg) scale(.85)` }], { duration: 720, easing: 'cubic-bezier(.4,0,.6,1)' }).onfinish = () => {
        fly.remove();
        if (slots[i]) slots[i].classList.add('in');
        E.crate.classList.remove('bump'); void E.crate.offsetWidth; E.crate.classList.add('bump');
        sfx.pop();
      };
    }, i * 95);
  });
  await wait(apples.length * 95 + 820);
  sfx.harvest(); buzz(60);
  confetti(160);
  const v = V();
  openModal(`<div class="m-crate">${crateSVG('capm', true)}</div><p class="m-kicker">${S.trees + 1}번째 나무 · 수확</p><h3>수확 완료!</h3><p>${owner()}에서 사과 ${APPLES.length}알을 땄어요.<br>약속한 사과를 교환권으로 드려요.</p><div class="ticket"><div class="tl"><p>내 나무 사과 교환권</p><b>${v.rw}</b><span>배송비 없음 · 90일 안에 쓰기</span></div><div class="tr"><img src="${v.rwImg}" alt=""></div></div><div class="btn-row"><button class="btn-l line" id="mNext">다음 주문에 함께</button><button class="btn-l" id="mNow">바로 보내 주세요</button></div><p class="fine">체험용 교환권이에요 · 실제로는 쿠폰함에 들어갑니다</p>`, (m) => {
    const take = (how) => {
      sfx.tap();
      S.coupons.push({ t: v.rw + ' 교환권', how, day: S.day });
      S.trees++; S.phase = 'done'; save();
      closeModal();
      render();
      toast(how === 'next' ? '교환권을 쿠폰함에 넣었어요 · 다음 주문에 함께 보내요' : '교환권을 쿠폰함에 넣었어요 · 배송비 없이 바로 보내요', 2600);
      noti(`수확 완료! ${v.rw} 교환권이 도착했어요.`, 900);
      busy = false;
    };
    m.querySelector('#mNext').onclick = () => take('next');
    m.querySelector('#mNow').onclick = () => take('now');
  });
}

let introMode = 'replant';
function showPage(id) {
  ['ipB', 'ipC'].forEach((k, i) => {
    const order = ['B', 'C'].indexOf(id);
    E[k].classList.toggle('r', i > order);
    E[k].classList.toggle('l', i < order);
  });
}
function openIntro(page, mode) {
  introMode = mode;
  closeSheet(); closeModal(); hideCoach();
  E.intro.classList.remove('off');
  renderVars();
  E.nameIn.value = S.name || '';
  updatePreview();
  E.goPlant.textContent = mode === 'edit' ? '이대로 바꾸기' : '나무 심기';
  showPage(page);
}
function closeIntro() { E.intro.classList.add('off'); }
let pickVar = 'hongro';
function renderVars() {
  pickVar = S.variety || 'hongro';
  E.vars.innerHTML = Object.entries(VAR).map(([k, v]) => `<button class="var ${k === pickVar ? 'on' : ''}" data-k="${k}"><img src="${v.img}" alt="${v.n} 사과"><span><span class="vn">${v.n}</span><span class="vd" style="display:block">${v.desc} · 당도${NB}${v.brix}${NB}브릭스</span><span class="vr" style="display:block">다 키우면 ${v.rw}</span></span><span class="chk">${ICON.tick}</span></button>`).join('');
  E.vars.querySelectorAll('.var').forEach((b) => {
    b.onclick = () => { sfx.tap(); pickVar = b.dataset.k; E.vars.querySelectorAll('.var').forEach((x) => x.classList.toggle('on', x === b)); updatePreview(); };
  });
}
function updatePreview() {
  E.pvName.textContent = E.nameIn.value.trim() || '우리 가족';
  E.pvVar.textContent = VAR[pickVar].n;
}

const typedName = () => (E.nameIn.value.replace(/[<>&"'`]/g, '').trim() || '우리 가족').slice(0, 8);

function sprout(delay) {
  entering = true;
  for (let k = 0; k < 6; k++) treeSvg.classList.remove('st-' + k);
  render();
  return new Promise((res) => setTimeout(() => {
    entering = false;
    render();
    sparkle(10);
    res();
  }, delay || 400));
}

function nudgeWater(delay) {
  E.btnMain.classList.add('nudge');
  setTimeout(() => { if (S.lastWater === 0 && S.phase === 'grow' && !busy && !modalOpen && !sheetOpen && E.intro.classList.contains('off')) coach('btnMain', '하루 한 번, 눌러서 물을 줘요', 'above'); }, delay || 300);
}

function welcome() {
  if (GIFT && !S.hello) {
    S.hello = 1; save();
    setTimeout(() => openModal(`${modalTree(stageIdx(S.pts))}<p class="m-kicker" style="color:#D9603F">선물 상자 속 씨앗 카드</p><h3>내 사과나무가 생겼어요!</h3><p>씨앗 카드로 어린 사과나무를 심어 드렸어요. 보내신 분 나무에도 물${NB}${GIFT_PTS}번이 갔어요.</p><button class="btn-l" id="mOk">물 주러 가기</button>`, (m) => {
      paintModalTree(stageIdx(S.pts));
      m.querySelector('#mOk').onclick = () => { sfx.tap(); closeModal(); nudgeWater(500); };
    }), 500);
    return;
  }
  if (S.phase === 'grow' && S.lastWater === 0 && S.waterDays === 0) nudgeWater(1100);
}

async function replant() {
  S.name = typedName(); S.variety = pickVar;
  S.pts = START; S.phase = 'grow'; S.lastWater = 0; S.forgave = -1;
  save();
  sfx.tap();
  closeIntro();
  E.fx.innerHTML = '';
  await sprout(500);
  sfx.pop(); buzz(20);
  toast(`${S.trees + 1}번째 나무를 심었어요!`, 2600);
  nudgeWater(1400);
}

function applyEdit() {
  S.name = typedName(); S.variety = pickVar;
  save();
  sfx.tap();
  closeIntro();
  E.sign.classList.add('hide');
  setTimeout(() => { render(); sfx.pop(); toast(`${owner()}로 바꿨어요`); }, 450);
}

function confetti(n) {
  const cv = E.confetti, ctx = cv.getContext('2d');
  const W = E.app.clientWidth, H = E.app.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cols = ['#E8392E', '#FF990D', '#FFC94A', '#6DBB5A', '#FFFFFF', '#F7A1B8'];
  const P = Array.from({ length: n }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.4, y: H * 0.45, vx: (Math.random() - 0.5) * 9, vy: -6 - Math.random() * 8, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, w: 5 + Math.random() * 6, h: 8 + Math.random() * 6, c: cols[(Math.random() * cols.length) | 0], round: Math.random() < 0.3 }));
  const t0 = performance.now();
  (function step(t) {
    const el = t - t0;
    ctx.clearRect(0, 0, W, H);
    P.forEach((p) => {
      p.vy += 0.28; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - el / 2600); ctx.fillStyle = p.c;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); } else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)) + 2);
      ctx.restore();
    });
    if (el < 2600) requestAnimationFrame(step); else ctx.clearRect(0, 0, W, H);
  })(t0);
}

function setSoundIcon() {
  E.btnSound.innerHTML = S.sound ? ICON.soundOn : ICON.soundOff;
  E.btnSound.setAttribute('aria-label', S.sound ? '소리 끄기' : '소리 켜기');
}

function init() {
  setVH();
  window.addEventListener('resize', setVH);
  buildOrchard();
  mountTrees();
  $('icShop').innerHTML = ICON.sack;
  $('icFriend').innerHTML = ICON.friend;
  $('icGift').innerHTML = ICON.gift;
  $('signEdit').innerHTML = ICON.pen;
  E.notiIc.innerHTML = ICON.talk;
  E.sheetX.innerHTML = ICON.x;
  E.backB.innerHTML = ICON.back;
  E.backC.innerHTML = ICON.back;
  setSoundIcon();

  E.btnMain.onclick = onMain;
  E.btnShop.onclick = openShop;
  E.btnFriend.onclick = openFriend;
  E.btnGift.onclick = openGift;
  E.pSide.onclick = openBrix;
  E.dDay.onclick = nextDay;
  E.dSkip.onclick = skipStage;
  E.dReset.onclick = askReset;
  E.sheetX.onclick = () => { sfx.tap(); closeSheet(); };
  E.backdrop.onclick = () => { if (!modalOpen) closeSheet(); };
  E.noti.onclick = hideNoti;
  const unscroll = (el) => el.addEventListener('scroll', () => { if (el.scrollTop || el.scrollLeft) { el.scrollTop = 0; el.scrollLeft = 0; } });
  unscroll(E.app);
  unscroll(E.scene);
  E.app.addEventListener('click', () => {
    if (window.innerWidth >= 1000) return;
    const y = window.scrollY;
    if (y > 0 && y < E.app.offsetHeight) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, true);
  E.btnSound.onclick = () => { S.sound = !S.sound; save(); setSoundIcon(); if (S.sound) sfx.tap(); };
  const editSign = () => { if (busy) return; sfx.tap(); openIntro('B', 'edit'); };
  E.sign.onclick = editSign;
  E.sign.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); editSign(); } });
  E.backB.onclick = () => { sfx.tap(); closeIntro(); };
  E.goC.onclick = () => { sfx.tap(); updatePreview(); showPage('C'); };
  E.backC.onclick = () => { sfx.tap(); showPage('B'); };
  E.goPlant.onclick = () => (introMode === 'edit' ? applyEdit() : replant());
  E.nameIn.addEventListener('input', updatePreview);
  E.nameIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') E.nameIn.blur(); });
  E.chips.querySelectorAll('button').forEach((b) => { b.onclick = () => { sfx.tap(); E.nameIn.value = b.textContent; updatePreview(); }; });

  sprout(450).then(welcome);
}

init();
})();
