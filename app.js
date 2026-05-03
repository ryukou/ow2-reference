const API_BASE = "https://overfast-api.tekrop.fr";
const LOCALE = "ja-jp";
const FALLBACK_LOCALE = "en-us";
const PATCH_UPDATES = [
  {
    type: "Event",
    title: "4v4 Evolved",
    date: "2026-04-28",
    tone: "info",
    summary: "エムレだけで戦う期間限定4v4チーム・デスマッチ。開催期間は4月28日から5月11日。",
    details: ["全員エムレの同条件ルール", "リプレイコードはこの更新でワイプ", "スコアボード中にジャンプできない不具合などを修正"],
    href: "https://overwatch.blizzard.com/en-us/news/patch-notes/live/",
  },
  {
    type: "Buff",
    title: "ロードホッグ / ソンブラ / ヴェンデッタ",
    date: "2026-04-23",
    tone: "buff",
    summary: "Season 2開始後に落ちすぎた勝率を戻すための小規模強化。",
    details: ["ロードホッグ: チェイン・フックのCD 8秒から7秒", "ソンブラ: 被ダメージ露見中の速度低下が50%から33%", "ヴェンデッタ: 体力175から200、合計250から275"],
    href: "https://overwatch.blizzard.com/en-us/news/patch-notes/live/",
  },
  {
    type: "Stadium",
    title: "Stadium調整",
    date: "2026-04-23",
    tone: "nerf",
    summary: "強すぎるStadiumビルドを抑えつつ、一部ビルドを強化。",
    details: ["ハザード/ジャンカー・クイーン/オリーサ/ウーヤン系の強い構成を弱体化", "ラマットラは一部弱体化と武器系強化が混在", "ジュノの武器系ビルドは強化"],
    href: "https://overwatch.blizzard.com/en-us/news/patch-notes/live/",
  },
  {
    type: "Season",
    title: "Season 2: Summit",
    date: "2026-04-14",
    tone: "info",
    summary: "新ダメージヒーローのシエラ、Operation: Grand Mesa、Antarctic Peninsulaリワークなどが追加。",
    details: ["新ヒーローのシエラ登場", "Operation: Grand Mesaイベント", "Post Match Accolades復帰とパークのミニ更新"],
    href: "https://overwatch.blizzard.com/news/24266793/reach-heroic-heights-in-reign-of-talon-season-2-summit",
  },
];
const COMPOSITION_EXAMPLES = [
  {
    title: "Dive",
    note: "高台や後衛に一気に飛び込む。フォーカスを合わせられる時向け。",
    tag: "Engage",
    members: [
      { role: "tank", key: "winston", fallback: "ウィンストン" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "damage", key: "genji", fallback: "ゲンジ" },
      { role: "support", key: "ana", fallback: "アナ" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
    ],
  },
  {
    title: "Rush / Brawl",
    note: "固まって前に出る。スピードで距離を詰めて近距離戦を作る。",
    tag: "Close",
    members: [
      { role: "tank", key: "reinhardt", fallback: "ラインハルト" },
      { role: "damage", key: "mei", fallback: "メイ" },
      { role: "damage", key: "reaper", fallback: "リーパー" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
    ],
  },
  {
    title: "Poke",
    note: "射線と高台で削る。無理に詰めず、相手のリソースを先に使わせる。",
    tag: "Range",
    members: [
      { role: "tank", key: "sigma", fallback: "シグマ" },
      { role: "damage", key: "ashe", fallback: "アッシュ" },
      { role: "damage", key: "soldier-76", fallback: "ソルジャー76" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "zenyatta", fallback: "ゼニヤッタ" },
    ],
  },
  {
    title: "Pick",
    note: "単発キルを作る。射線管理と蘇生/阻害のケアが大事。",
    tag: "Open",
    members: [
      { role: "tank", key: "dva", fallback: "D.Va" },
      { role: "damage", key: "widowmaker", fallback: "ウィドウメイカー" },
      { role: "damage", key: "hanzo", fallback: "ハンゾー" },
      { role: "support", key: "mercy", fallback: "マーシー" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
];
const MODE_COMPOSITION_EXAMPLES = [
  {
    title: "Control",
    note: "拠点周りの当たり合い。先入りと再集合を速くする。",
    tag: "Rule",
    members: [
      { role: "tank", key: "ramattra", fallback: "ラマットラ" },
      { role: "damage", key: "mei", fallback: "メイ" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "Escort",
    note: "長い射線と高台を使って、ペイロード周辺を削る。",
    tag: "Rule",
    members: [
      { role: "tank", key: "sigma", fallback: "シグマ" },
      { role: "damage", key: "ashe", fallback: "アッシュ" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "zenyatta", fallback: "ゼニヤッタ" },
    ],
  },
  {
    title: "Hybrid",
    note: "第一は取り切り、第二以降は射線を広げて押す。",
    tag: "Rule",
    members: [
      { role: "tank", key: "winston", fallback: "ウィンストン" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "ana", fallback: "アナ" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "Push",
    note: "ロボット周辺で当たり直しが多い。機動力と継戦力を優先。",
    tag: "Rule",
    members: [
      { role: "tank", key: "junker-queen", fallback: "ジャンカー・クイーン" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "juno", fallback: "ジュノ" },
    ],
  },
  {
    title: "Flashpoint",
    note: "広いマップを移動し続ける。移動速度と自己完結力を重視。",
    tag: "Rule",
    members: [
      { role: "tank", key: "dva", fallback: "D.Va" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "damage", key: "venture", fallback: "ベンチャー" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "Clash",
    note: "連続した拠点戦。勝った後に前へ出過ぎない構成。",
    tag: "Rule",
    members: [
      { role: "tank", key: "orisa", fallback: "オリーサ" },
      { role: "damage", key: "mei", fallback: "メイ" },
      { role: "damage", key: "cassidy", fallback: "キャスディ" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
];
const MAP_STYLE_COMPOSITION_EXAMPLES = [
  {
    title: "長射線マップ",
    note: "Circuit Royal / Havana系。角と高台から先に削る。",
    tag: "Map",
    members: [
      { role: "tank", key: "sigma", fallback: "シグマ" },
      { role: "damage", key: "widowmaker", fallback: "ウィドウメイカー" },
      { role: "damage", key: "ashe", fallback: "アッシュ" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "zenyatta", fallback: "ゼニヤッタ" },
    ],
  },
  {
    title: "高台マップ",
    note: "Gibraltar / Numbani系。高台を先に取り、相手を下ろす。",
    tag: "Map",
    members: [
      { role: "tank", key: "winston", fallback: "ウィンストン" },
      { role: "damage", key: "genji", fallback: "ゲンジ" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "support", key: "ana", fallback: "アナ" },
      { role: "support", key: "juno", fallback: "ジュノ" },
    ],
  },
  {
    title: "狭所乱戦マップ",
    note: "King's Row / Lijiang系。固まって短い距離で勝負する。",
    tag: "Map",
    members: [
      { role: "tank", key: "reinhardt", fallback: "ラインハルト" },
      { role: "damage", key: "reaper", fallback: "リーパー" },
      { role: "damage", key: "mei", fallback: "メイ" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
    ],
  },
  {
    title: "広い移動マップ",
    note: "Suravasa / New Junk City系。足の速さと孤立しにくさを優先。",
    tag: "Map",
    members: [
      { role: "tank", key: "wrecking-ball", fallback: "レッキング・ボール" },
      { role: "damage", key: "sombra", fallback: "ソンブラ" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
];
const COMP_CATEGORY_LABELS = {
  style: "戦い方",
  rule: "ルール",
  map: "ステージ",
  data: "Stats",
};
const COMP_RULE_OPTIONS = ["Control", "Escort", "Hybrid", "Push", "Flashpoint", "Clash"];
const COMP_MAP_OPTIONS = ["長射線", "高台", "狭所乱戦", "広い移動"];
const FALLBACK_STAGES = [
  { name: "Antarctic Peninsula", rule: "Control", style: "狭所乱戦" },
  { name: "Busan", rule: "Control", style: "狭所乱戦" },
  { name: "Ilios", rule: "Control", style: "長射線" },
  { name: "Lijiang Tower", rule: "Control", style: "狭所乱戦" },
  { name: "Nepal", rule: "Control", style: "狭所乱戦" },
  { name: "Oasis", rule: "Control", style: "広い移動" },
  { name: "Circuit Royal", rule: "Escort", style: "長射線" },
  { name: "Dorado", rule: "Escort", style: "高台" },
  { name: "Havana", rule: "Escort", style: "長射線" },
  { name: "Junkertown", rule: "Escort", style: "長射線" },
  { name: "Rialto", rule: "Escort", style: "長射線" },
  { name: "Route 66", rule: "Escort", style: "長射線" },
  { name: "Shambali Monastery", rule: "Escort", style: "長射線" },
  { name: "Watchpoint: Gibraltar", rule: "Escort", style: "高台" },
  { name: "Blizzard World", rule: "Hybrid", style: "高台" },
  { name: "Eichenwalde", rule: "Hybrid", style: "狭所乱戦" },
  { name: "Hollywood", rule: "Hybrid", style: "高台" },
  { name: "King's Row", rule: "Hybrid", style: "狭所乱戦" },
  { name: "Midtown", rule: "Hybrid", style: "長射線" },
  { name: "Numbani", rule: "Hybrid", style: "高台" },
  { name: "Paraiso", rule: "Hybrid", style: "高台" },
  { name: "Colosseo", rule: "Push", style: "広い移動" },
  { name: "Esperanca", rule: "Push", style: "広い移動" },
  { name: "New Queen Street", rule: "Push", style: "広い移動" },
  { name: "New Junk City", rule: "Flashpoint", style: "広い移動" },
  { name: "Suravasa", rule: "Flashpoint", style: "広い移動" },
  { name: "Hanaoka", rule: "Clash", style: "狭所乱戦" },
  { name: "Runasapi", rule: "Push", style: "広い移動" },
  { name: "Throne of Anubis", rule: "Clash", style: "狭所乱戦" },
];
const COMP_METADATA = {
  Dive: {
    category: "style",
    rules: ["Hybrid", "Flashpoint"],
    maps: ["高台", "広い移動"],
    reasons: ["ウィンストンが高台や後衛に先に入って、トレーサー/ゲンジが同じ相手を削り切る。", "アナの阻害とルシオのスピードで、入るタイミングと帰るタイミングを合わせやすい。"],
  },
  "Rush / Brawl": {
    category: "style",
    rules: ["Control", "Clash"],
    maps: ["狭所乱戦"],
    reasons: ["ラインハルト、メイ、リーパーで近距離の面を作り、ルシオで強制的に距離を詰める。", "バティストのイモータリティで、固まった時の被弾リスクを一度受けられる。"],
  },
  Poke: {
    category: "style",
    rules: ["Escort", "Hybrid"],
    maps: ["長射線", "高台"],
    reasons: ["シグマの盾と遠距離火力で、相手が入る前にリソースを削れる。", "バティスト/ゼニヤッタは射線を維持しながら火力も出せるため、長いマップで強い。"],
  },
  Pick: {
    category: "style",
    rules: ["Escort", "Hybrid"],
    maps: ["長射線", "高台"],
    reasons: ["ウィドウメイカー/ハンゾーで先に1人落とし、D.Vaが高台や射線の圧を消す。", "マーシーのダメージブーストと蘇生、キリコの鈴でワンピック勝負を支えやすい。"],
  },
  Control: {
    category: "rule",
    rules: ["Control"],
    maps: ["狭所乱戦"],
    reasons: ["拠点内での当たり合いが多いため、ラマットラとメイで前線を押し返しやすい。", "ルシオで先入りと再集合を速くし、キリコで阻害やスタン系の事故を消せる。"],
  },
  Escort: {
    category: "rule",
    rules: ["Escort"],
    maps: ["長射線", "高台"],
    reasons: ["ペイロード周辺は長い射線が生まれやすく、シグマと中長距離DPSが火力を出しやすい。", "ゼニヤッタの不和でタンクを下げ、バティストで射線を維持したまま支える。"],
  },
  Hybrid: {
    category: "rule",
    rules: ["Hybrid"],
    maps: ["高台", "長射線"],
    reasons: ["第一拠点は高台や後衛への圧が重要なので、ウィンストンとトレーサーで崩しに行ける。", "第二以降はソジョーンが射線を広げ、アナ/キリコで遠めの味方も支えやすい。"],
  },
  Push: {
    category: "rule",
    rules: ["Push"],
    maps: ["広い移動"],
    reasons: ["ロボット周辺で当たり直しが多く、ジャンカー・クイーンと機動力DPSがテンポを作りやすい。", "ルシオ/ジュノで移動速度を補い、負けた後の戻りも速い。"],
  },
  Flashpoint: {
    category: "rule",
    rules: ["Flashpoint"],
    maps: ["広い移動"],
    reasons: ["拠点間の移動が長いため、D.Va、トレーサー、ベンチャーの自己完結力が活きる。", "ルシオ/キリコで移動と離脱を支え、孤立した味方を助けやすい。"],
  },
  Clash: {
    category: "rule",
    rules: ["Clash"],
    maps: ["狭所乱戦"],
    reasons: ["連続拠点戦では前線維持が重要で、オリーサとメイが押し返しに強い。", "バティスト/キリコで耐久を厚くして、勝った後の前出過ぎによる事故を減らす。"],
  },
  長射線マップ: {
    category: "map",
    rules: ["Escort", "Hybrid"],
    maps: ["長射線"],
    reasons: ["Circuit RoyalやHavana系は先に射線を置く側が有利になりやすい。", "シグマが盾で相手の射線を切り、ウィドウメイカー/アッシュが遠距離から先に人数差を作る。"],
  },
  高台マップ: {
    category: "map",
    rules: ["Escort", "Hybrid"],
    maps: ["高台"],
    reasons: ["GibraltarやNumbani系は高台を取るだけで相手の進行ルートを制限できる。", "ウィンストン、ゲンジ、トレーサーで高台に触り、アナ/ジュノが遠くから支援する。"],
  },
  狭所乱戦マップ: {
    category: "map",
    rules: ["Control", "Clash", "Hybrid"],
    maps: ["狭所乱戦"],
    reasons: ["King's RowやLijiang系は角待ちと近距離戦が多く、ラッシュ構成が噛み合いやすい。", "メイの壁で分断し、リーパーとラインハルトで短時間に落とす狙いが明確。"],
  },
  広い移動マップ: {
    category: "map",
    rules: ["Push", "Flashpoint"],
    maps: ["広い移動"],
    reasons: ["SuravasaやNew Junk City系は次の当たり合いまでの移動が長い。", "レッキング・ボール、ソンブラ、トレーサーで広く触り、ルシオ/キリコで合流を速くする。"],
  },
};
const CACHE_KEY = "ow2-reference-cache-v1";
const FAVORITE_KEY = "ow2-reference-favorites-v1";
const CACHE_MS = 6 * 60 * 60 * 1000;

const state = {
  bootstrapped: false,
  heroes: [],
  heroDetails: new Map(),
  heroStats: new Map(),
  maps: FALLBACK_STAGES,
  selectedHeroKey: null,
  role: "all",
  query: "",
  favoriteOnly: false,
  favoriteHeroKeys: new Set(),
  compFilters: {
    category: "all",
    rule: "all",
    map: "all",
    stage: "all",
    hero: "all",
  },
  loadingDetails: false,
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  readFavorites();
  bindEvents();
  bootstrap();
});

function cacheElements() {
  els.syncStatus = document.querySelector("#syncStatus");
  els.refreshButton = document.querySelector("#refreshButton");
  els.heroSearch = document.querySelector("#heroSearch");
  els.roleButtons = document.querySelectorAll("[data-role]");
  els.favoriteFilterButton = document.querySelector("[data-favorite-filter]");
  els.heroList = document.querySelector("#heroList");
  els.heroDetail = document.querySelector("#heroDetail");
  els.heroCount = document.querySelector("#heroCount");
  els.detailProgress = document.querySelector("#detailProgress");
  els.metaStats = document.querySelector("#metaStats");
  els.updateGrid = document.querySelector("#updateGrid");
  els.compGrid = document.querySelector("#compGrid");
  els.compCategoryFilter = document.querySelector("#compCategoryFilter");
  els.compRuleFilter = document.querySelector("#compRuleFilter");
  els.compMapFilter = document.querySelector("#compMapFilter");
  els.compStageFilter = document.querySelector("#compStageFilter");
  els.compHeroFilter = document.querySelector("#compHeroFilter");
}

function bindEvents() {
  els.refreshButton.addEventListener("click", () => loadRemoteData({ force: true }));
  els.heroSearch.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderHeroList();
  });

  els.roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.role = button.dataset.role;
      els.roleButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      renderHeroList();
    });
  });

  els.favoriteFilterButton.addEventListener("click", () => {
    state.favoriteOnly = !state.favoriteOnly;
    els.favoriteFilterButton.classList.toggle("is-active", state.favoriteOnly);
    renderHeroList();
  });

  [
    [els.compCategoryFilter, "category"],
    [els.compRuleFilter, "rule"],
    [els.compMapFilter, "map"],
    [els.compStageFilter, "stage"],
    [els.compHeroFilter, "hero"],
  ].forEach(([select, key]) => {
    select.addEventListener("change", () => {
      state.compFilters[key] = select.value;
      renderComps();
    });
  });
}

async function bootstrap() {
  if (state.bootstrapped) {
    setStatus(state.heroes.length ? "表示中" : "起動中");
    setProgress(state.heroes.length ? "Ready" : "Waiting");
    renderAll();
    return;
  }
  state.bootstrapped = true;
  renderInitialLoading();

  const cached = readCache();
  if (cached) {
    hydrateFromCache(cached);
    renderAll();
    setProgress("Ready");
    setStatus("キャッシュ表示中");
  }

  await loadRemoteData({ force: false });
}

function renderInitialLoading() {
  els.heroList.innerHTML = Array.from({ length: 7 }, () => '<div class="hero-row skeleton"></div>').join("");
  els.heroDetail.innerHTML = '<div class="empty-state skeleton"></div>';
  renderComps();
}

async function loadRemoteData({ force }) {
  if (!force && state.heroes.length > 0 && state.heroDetails.size > 0) {
    return;
  }

  setStatus("API同期中");
  setProgress("Heroes");
  els.refreshButton.disabled = true;

  try {
    const [heroes, heroStats, maps] = await Promise.all([
      fetchHeroes(),
      fetchHeroStats().catch(() => []),
      fetchMaps().catch(() => FALLBACK_STAGES),
    ]);

    state.heroes = heroes;
    state.heroStats = new Map(heroStats.map((item) => [item.hero, item]));
    state.maps = normalizeStages(maps);
    if (!state.selectedHeroKey && heroes[0]) {
      state.selectedHeroKey = heroes[0].key;
    }

    renderAll();
    await loadHeroDetails(heroes);
    writeCache();
    setStatus(`更新 ${formatClock(new Date())}`);
  } catch (error) {
    console.error(error);
    setStatus("API取得エラー");
    if (!state.heroes.length) {
      renderFatalError(error);
    }
  } finally {
    els.refreshButton.disabled = false;
  }
}

async function fetchHeroes() {
  try {
    return await fetchJson("/heroes", { locale: LOCALE });
  } catch (error) {
    return fetchJson("/heroes", { locale: FALLBACK_LOCALE });
  }
}

async function fetchHeroDetail(heroKey) {
  try {
    return await fetchJson(`/heroes/${encodeURIComponent(heroKey)}`, { locale: LOCALE });
  } catch (error) {
    return fetchJson(`/heroes/${encodeURIComponent(heroKey)}`, { locale: FALLBACK_LOCALE });
  }
}

function fetchHeroStats() {
  return fetchJson("/heroes/stats", {
    platform: "console",
    gamemode: "competitive",
    region: "asia",
    order_by: "pickrate:desc",
  });
}

function fetchMaps() {
  return fetchJson("/maps");
}

async function loadHeroDetails(heroes) {
  state.loadingDetails = true;
  let completed = 0;
  setProgress(`Perks ${completed}/${heroes.length}`);

  await mapLimit(heroes, 4, async (hero) => {
    if (state.heroDetails.has(hero.key)) {
      completed += 1;
      setProgress(`Perks ${completed}/${heroes.length}`);
      return;
    }

    try {
      const detail = await fetchHeroDetail(hero.key);
      state.heroDetails.set(hero.key, detail);
    } catch (error) {
      state.heroDetails.set(hero.key, { key: hero.key, error: error.message });
    } finally {
      completed += 1;
      setProgress(`Perks ${completed}/${heroes.length}`);
      if (hero.key === state.selectedHeroKey) {
        renderHeroDetail();
      }
      renderHeroList();
    }
  });

  state.loadingDetails = false;
  setProgress("Ready");
  renderAll();
}

async function mapLimit(items, limit, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await task(items[index], index);
    }
  });
  await Promise.all(workers);
}

async function fetchJson(path, params = {}) {
  const url = new URL(path, API_BASE);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "all") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      message = readableError(body.error || body.message || body.detail || message);
    } catch {
      // Keep the HTTP message when the API returns non-JSON errors.
    }
    throw new Error(message);
  }
  return response.json();
}

function renderAll() {
  renderMetaStats();
  renderUpdates();
  renderComps();
  renderHeroList();
  renderHeroDetail();
}

function renderMetaStats() {
  const bestPick = [...state.heroStats.values()].sort(
    (a, b) => numberFromStat(b, ["pickrate", "pick_rate"]) - numberFromStat(a, ["pickrate", "pick_rate"]),
  )[0];
  const bestWin = [...state.heroStats.values()].sort(
    (a, b) => numberFromStat(b, ["winrate", "win_rate"]) - numberFromStat(a, ["winrate", "win_rate"]),
  )[0];

  els.metaStats.innerHTML = `
    <div class="mini-stat">
      <span>Top Pick</span>
      <strong>${bestPick ? escapeHtml(heroName(bestPick.hero)) : "-"}</strong>
    </div>
    <div class="mini-stat">
      <span>Top Win</span>
      <strong>${bestWin ? escapeHtml(heroName(bestWin.hero)) : "-"}</strong>
    </div>
    <div class="mini-stat">
      <span>Heroes</span>
      <strong>${state.heroes.length || "-"}</strong>
    </div>
  `;
}

function renderUpdates() {
  els.updateGrid.innerHTML = PATCH_UPDATES.map(renderUpdateCard).join("");
}

function renderUpdateCard(update) {
  return `
    <article class="update-card is-${escapeAttr(update.tone)}">
      <div class="update-head">
        <span class="update-type">${escapeHtml(update.type)}</span>
        <time datetime="${escapeAttr(update.date)}">${escapeHtml(update.date)}</time>
      </div>
      <h3>${escapeHtml(update.title)}</h3>
      <p>${escapeHtml(update.summary)}</p>
      <ul>
        ${update.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
      </ul>
      <a href="${safeUrl(update.href)}" target="_blank" rel="noreferrer">公式で確認</a>
    </article>
  `;
}

function renderComps() {
  const comps = buildAllComps();
  renderCompFilterOptions(comps);

  const filtered = comps.filter((comp) => {
    const filters = state.compFilters;
    const stage = getSelectedStage();
    const categoryMatches = filters.category === "all" || comp.category === filters.category;
    const ruleMatches = filters.rule === "all" || comp.rules.includes(filters.rule);
    const mapMatches = filters.map === "all" || comp.maps.includes(filters.map);
    const stageMatches =
      !stage ||
      comp.rules.includes(stage.rule) ||
      comp.maps.includes(stage.style) ||
      comp.stageNames.includes(stage.name);
    const heroMatches =
      filters.hero === "all" ||
      comp.members.some((member) => (member.hero?.key || member.key) === filters.hero);
    return categoryMatches && ruleMatches && mapMatches && stageMatches && heroMatches;
  });

  if (!filtered.length) {
    els.compGrid.innerHTML = renderEmpty("条件に合う構成例がありません。フィルタをゆるめてください。");
    return;
  }

  els.compGrid.innerHTML = filtered.map(renderCompCard).join("");
  els.compGrid.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function buildAllComps() {
  return [
    ...buildStaticComps(COMPOSITION_EXAMPLES),
    ...buildStaticComps(MODE_COMPOSITION_EXAMPLES),
    ...buildStaticComps(MAP_STYLE_COMPOSITION_EXAMPLES),
    ...buildRecommendedComps(),
  ];
}

function renderCompFilterOptions(comps) {
  const selected = { ...state.compFilters };
  setSelectOptions(
    els.compRuleFilter,
    [{ value: "all", label: "すべて" }, ...COMP_RULE_OPTIONS.map((rule) => ({ value: rule, label: rule }))],
    selected.rule,
  );
  setSelectOptions(
    els.compMapFilter,
    [{ value: "all", label: "すべて" }, ...COMP_MAP_OPTIONS.map((map) => ({ value: map, label: map }))],
    selected.map,
  );
  setSelectOptions(
    els.compStageFilter,
    [
      { value: "all", label: "すべて" },
      ...state.maps.map((stage) => ({
        value: stage.key,
        label: `${stage.name} / ${stage.rule}`,
      })),
    ],
    selected.stage,
  );

  const heroOptions = new Map();
  comps.forEach((comp) => {
    comp.members.forEach((member) => {
      const key = member.hero?.key || member.key;
      const name = member.hero?.name || member.fallback || member.key;
      if (key && name) {
        heroOptions.set(key, name);
      }
    });
  });
  setSelectOptions(
    els.compHeroFilter,
    [
      { value: "all", label: "すべて" },
      ...[...heroOptions.entries()]
        .sort((a, b) => a[1].localeCompare(b[1], "ja"))
        .map(([value, label]) => ({ value, label })),
    ],
    selected.hero,
  );
}

function buildStaticComps(comps) {
  return comps.map((comp) => ({
    ...comp,
    ...normalizeCompMeta(comp),
    members: comp.members.map((member) => ({
      ...member,
      hero: state.heroes.find((hero) => hero.key === member.key),
      source: "example",
    })),
  }));
}

function normalizeCompMeta(comp) {
  const meta = COMP_METADATA[comp.title] || {};
  return {
    category: meta.category || "style",
    categoryLabel: COMP_CATEGORY_LABELS[meta.category] || COMP_CATEGORY_LABELS.style,
    rules: meta.rules || [],
    maps: meta.maps || [],
    stageNames: meta.stageNames || [],
    reasons: meta.reasons || [comp.note],
  };
}

function buildRecommendedComps() {
  if (!state.heroes.length || !state.heroStats.size) {
    return [];
  }

  const score = (hero, mode) => {
    const stat = state.heroStats.get(hero.key);
    const pick = numberFromStat(stat, ["pickrate", "pick_rate"]);
    const win = numberFromStat(stat, ["winrate", "win_rate"]);
    const safePick = Number.isFinite(pick) ? pick : 0;
    const safeWin = Number.isFinite(win) ? win : 0;

    if (mode === "pick") {
      return safePick * 1.2 + safeWin * 0.2;
    }
    if (mode === "win") {
      return safeWin * 1.1 + safePick * 0.25;
    }
    return safePick * 0.65 + safeWin * 0.55;
  };

  const ranked = (role, mode) =>
    state.heroes
      .filter((hero) => hero.role === role)
      .sort((a, b) => score(b, mode) - score(a, mode));

  const makeMembers = (mode) => [
    ...ranked("tank", mode).slice(0, 1),
    ...ranked("damage", mode).slice(0, 2),
    ...ranked("support", mode).slice(0, 2),
  ];

  return [
    {
      title: "Stats安定",
      note: "Console AsiaのPickとWinから自動生成。",
      tag: "Data",
      category: "data",
      categoryLabel: COMP_CATEGORY_LABELS.data,
      rules: COMP_RULE_OPTIONS,
      maps: COMP_MAP_OPTIONS,
      stageNames: state.maps.map((stage) => stage.name),
      reasons: ["Console AsiaのPick RateとWin Rateを両方見て、極端に尖りすぎない候補を選ぶ。", "身内で迷った時の初期案として使い、マップに合わせてDPSかサポートを差し替える。"],
      members: makeMembers("balanced").map((hero) => ({ hero, role: hero.role, source: "stats" })),
    },
    {
      title: "Stats勝率",
      note: "Win Rateを少し強めに評価した候補。",
      tag: "Data",
      category: "data",
      categoryLabel: COMP_CATEGORY_LABELS.data,
      rules: COMP_RULE_OPTIONS,
      maps: COMP_MAP_OPTIONS,
      stageNames: state.maps.map((stage) => stage.name),
      reasons: ["勝率寄りなので、刺さる状況では強いが操作難度や相性の偏りも出やすい。", "敵構成に刺さらない時は、同じロール内で得意キャラに替える前提で見る。"],
      members: makeMembers("win").map((hero) => ({ hero, role: hero.role, source: "stats" })),
    },
    {
      title: "Stats合わせやすさ",
      note: "Pick Rate高めで合わせやすい候補。",
      tag: "Data",
      category: "data",
      categoryLabel: COMP_CATEGORY_LABELS.data,
      rules: COMP_RULE_OPTIONS,
      maps: COMP_MAP_OPTIONS,
      stageNames: state.maps.map((stage) => stage.name),
      reasons: ["Pick Rateを高めに見るため、野良や身内で合わせやすいヒーローが出やすい。", "強さの最大値よりも、全員が役割を理解しやすいことを優先した候補。"],
      members: makeMembers("pick").map((hero) => ({ hero, role: hero.role, source: "stats" })),
    },
  ].filter((comp) => comp.members.length === 5);
}

function renderCompCard(comp) {
  return `
    <article class="comp-card">
      <div class="comp-head">
        <div>
          <h3>${escapeHtml(comp.title)}</h3>
          <p>${escapeHtml(comp.note)}</p>
        </div>
        <span class="comp-tag">${escapeHtml(comp.tag || "Comp")}</span>
      </div>
      <div class="comp-meta">
        <span>${escapeHtml(comp.categoryLabel || COMP_CATEGORY_LABELS[comp.category] || "構成")}</span>
        ${comp.rules.map((rule) => `<span>${escapeHtml(rule)}</span>`).join("")}
        ${comp.maps.map((map) => `<span>${escapeHtml(map)}</span>`).join("")}
        ${renderStageMatchChips(comp)}
      </div>
      <div class="comp-members">
        ${comp.members.map(renderCompMember).join("")}
      </div>
      <div class="comp-reasons">
        <strong>理由</strong>
        <ul>
          ${comp.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

function renderStageMatchChips(comp) {
  const selected = getSelectedStage();
  if (!selected) {
    return "";
  }
  const matched =
    comp.stageNames.includes(selected.name) ||
    comp.rules.includes(selected.rule) ||
    comp.maps.includes(selected.style);
  return matched ? `<span>${escapeHtml(selected.name)}</span>` : "";
}

function renderCompMember(member) {
  const hero = member.hero;
  const stat = hero ? state.heroStats.get(hero.key) : null;
  const key = hero?.key || "";
  const name = hero?.name || member.fallback || member.key || "Unknown";
  const portrait = hero?.portrait ? `<img src="${safeUrl(hero.portrait)}" alt="">` : '<span class="comp-placeholder"></span>';
  const detail = member.source === "stats" && hero
    ? `Pick ${formatPercent(numberFromStat(stat, ["pickrate", "pick_rate"]))} · Win ${formatPercent(numberFromStat(stat, ["winrate", "win_rate"]))}`
    : "組み合わせ例";
  const disabled = hero ? "" : " disabled";
  const keyAttr = hero ? ` data-hero-key="${escapeAttr(key)}"` : "";

  return `
    <button class="comp-member" type="button"${keyAttr}${disabled}>
      ${portrait}
      <span>
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(labelRole(member.role || hero?.role))} · ${escapeHtml(detail)}</small>
      </span>
    </button>
  `;
}

function selectHeroFromInline(heroKey) {
  state.selectedHeroKey = heroKey;
  state.role = "all";
  state.query = "";
  els.heroSearch.value = "";
  els.roleButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.role === "all"));
  renderHeroList();
  renderHeroDetail();
  document.querySelector("#heroes").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderHeroList() {
  const heroes = getFilteredHeroes();
  els.heroCount.textContent = `${heroes.length} Heroes`;

  if (!heroes.length) {
    els.heroList.innerHTML = `
      <div class="empty-state">
        <p>該当するヒーローがありません。</p>
      </div>
    `;
    return;
  }

  if (!heroes.some((hero) => hero.key === state.selectedHeroKey)) {
    state.selectedHeroKey = heroes[0].key;
    renderHeroDetail();
  }

  els.heroList.innerHTML = heroes.map((hero) => renderHeroRow(hero)).join("");
  els.heroList.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedHeroKey = button.dataset.heroKey;
      renderHeroList();
      renderHeroDetail();
    });
  });
}

function renderHeroRow(hero) {
  const stat = state.heroStats.get(hero.key);
  const pickRate = formatPercent(numberFromStat(stat, ["pickrate", "pick_rate"]));
  const winRate = formatPercent(numberFromStat(stat, ["winrate", "win_rate"]));
  const active = hero.key === state.selectedHeroKey ? " is-active" : "";
  const favorite = state.favoriteHeroKeys.has(hero.key) ? " is-favorite" : "";
  const favoriteMark = state.favoriteHeroKeys.has(hero.key) ? '<span class="favorite-mark">★</span>' : "";

  return `
    <button class="hero-row${active}${favorite}" type="button" data-hero-key="${escapeAttr(hero.key)}">
      <img src="${safeUrl(hero.portrait)}" alt="">
      <span>
        <strong>${favoriteMark}${escapeHtml(hero.name)}</strong>
        <small>${escapeHtml(labelRole(hero.role))} · Pick ${pickRate} · Win ${winRate}</small>
      </span>
      <span class="role-badge">${escapeHtml(shortRole(hero.role))}</span>
    </button>
  `;
}

function getFilteredHeroes() {
  return state.heroes.filter((hero) => {
    if (state.favoriteOnly && !state.favoriteHeroKeys.has(hero.key)) {
      return false;
    }

    const roleMatches = state.role === "all" || hero.role === state.role;
    if (!roleMatches) {
      return false;
    }
    if (!state.query) {
      return true;
    }

    const detail = state.heroDetails.get(hero.key);
    const perks = normalizePerks(detail?.perks);
    const fields = [
      hero.name,
      hero.key,
      hero.role,
      detail?.description,
      ...(detail?.abilities || []).flatMap((ability) => [ability.name, ability.description]),
      ...perks.minor.flatMap((perk) => [perk.name, perk.description]),
      ...perks.major.flatMap((perk) => [perk.name, perk.description]),
    ];
    return fields.filter(Boolean).join(" ").toLowerCase().includes(state.query);
  });
}

function renderHeroDetail() {
  const hero = state.heroes.find((item) => item.key === state.selectedHeroKey);
  if (!hero) {
    els.heroDetail.innerHTML = '<div class="empty-state"><p>ヒーローを取得中です。</p></div>';
    return;
  }

  const detail = state.heroDetails.get(hero.key);
  if (detail?.error) {
    els.heroDetail.innerHTML = `
      ${renderHeroVisual(hero, null)}
      <div class="error-state">
        <p>${escapeHtml(detail.error)}</p>
      </div>
    `;
    return;
  }

  if (!detail) {
    els.heroDetail.innerHTML = `
      ${renderHeroVisual(hero, null)}
      <div class="empty-state skeleton"></div>
    `;
    return;
  }

  const stat = state.heroStats.get(hero.key);
  const hitpoints = formatHitpoints(detail.hitpoints);
  const perks = normalizePerks(detail.perks);
  const abilities = Array.isArray(detail.abilities) ? detail.abilities : [];

  els.heroDetail.innerHTML = `
    ${renderHeroVisual(hero, detail)}

    <div class="detail-grid">
      ${renderMetric("HP", hitpoints.total || "-")}
      ${renderMetric("Pick Rate", formatPercent(numberFromStat(stat, ["pickrate", "pick_rate"])))}
      ${renderMetric("Win Rate", formatPercent(numberFromStat(stat, ["winrate", "win_rate"])))}
      ${renderMetric("Role", labelRole(hero.role))}
    </div>

    <div class="content-grid">
      <section>
        <div class="panel-title">
          <h3>Perks</h3>
          <span class="chip">実測使用率は公開データなし</span>
        </div>
        ${renderPerkGroup("Minor Perk", perks.minor, "minor", hero, stat)}
        ${renderPerkGroup("Major Perk", perks.major, "major", hero, stat)}
      </section>

      <section>
        <div class="panel-title">
          <h3>Abilities</h3>
          <span class="chip">${abilities.length}</span>
        </div>
        <div class="ability-grid">
          ${abilities.length ? abilities.map(renderAbilityCard).join("") : renderEmpty("アビリティを取得できませんでした。")}
        </div>
      </section>
    </div>
  `;

  els.heroDetail.querySelector("[data-favorite-toggle]")?.addEventListener("click", () => {
    toggleFavorite(hero.key);
  });
}

function renderHeroVisual(hero, detail) {
  const background = pickBackground(detail?.backgrounds);
  const hitpoints = formatHitpoints(detail?.hitpoints);
  const location = detail?.location ? `<span class="chip">${escapeHtml(detail.location)}</span>` : "";
  const hp = hitpoints.label ? `<span class="chip">${escapeHtml(hitpoints.label)}</span>` : "";
  const subrole = hero.subrole ? `<span class="chip">${escapeHtml(hero.subrole)}</span>` : "";
  const favorite = state.favoriteHeroKeys.has(hero.key);

  return `
    <section class="hero-visual" style="--hero-bg: url('${safeUrl(background)}')">
      <div class="hero-copy">
        <div class="chips">
          <span class="chip">${escapeHtml(labelRole(hero.role))}</span>
          ${subrole}
          ${hp}
          ${location}
        </div>
        <div class="hero-title-row">
          <h2>${escapeHtml(hero.name)}</h2>
          <button class="favorite-button${favorite ? " is-on" : ""}" type="button" data-favorite-toggle aria-pressed="${favorite ? "true" : "false"}">
            <span>${favorite ? "★" : "☆"}</span>
            ${favorite ? "お気に入り" : "お気に入り"}
          </button>
        </div>
        <p>${escapeHtml(detail?.description || "データ取得中")}</p>
      </div>
      <div class="portrait-wrap">
        <img src="${safeUrl(hero.portrait)}" alt="${escapeAttr(hero.name)}">
      </div>
    </section>
  `;
}

function renderMetric(label, value) {
  return `
    <div class="metric">
      <span class="stat-label">${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </div>
  `;
}

function renderPerkGroup(label, perks, type, hero, stat) {
  const analyses = perks.map((perk, index) => analyzePerk(perk, index, type, hero, stat));
  const recommendedIndex = pickRecommendedPerkIndex(analyses);
  return `
    <div class="perk-group">
      <span class="perk-type">${escapeHtml(label)}</span>
      <div class="perk-grid">
        ${perks.length ? perks.map((perk, index) => renderPerkCard(perk, analyses[index], index === recommendedIndex)).join("") : renderEmpty("パークを取得できませんでした。")}
      </div>
    </div>
  `;
}

function renderPerkCard(perk, analysis, recommended) {
  const icon = perk.icon ? `<img src="${safeUrl(perk.icon)}" alt="">` : '<span></span>';
  const recommendedBadge = recommended ? '<span class="popular-perk">★ よく使う候補</span>' : "";
  return `
    <article class="perk-card${recommended ? " is-recommended" : ""}">
      ${icon}
      <div>
        <div class="perk-card-head">
          <h4>${escapeHtml(perk.name || "Unknown")}</h4>
          ${recommendedBadge}
        </div>
        <p>${escapeHtml(perk.description || "")}</p>
        <div class="perk-advice">
          <span class="advice-level is-${escapeAttr(analysis.levelKey)}">${escapeHtml(analysis.level)}</span>
          <span>${escapeHtml(analysis.situation)}</span>
        </div>
        <p class="perk-reason">${escapeHtml(analysis.reason)}</p>
      </div>
    </article>
  `;
}

function pickRecommendedPerkIndex(analyses) {
  if (!analyses.length) {
    return -1;
  }
  let bestIndex = 0;
  let bestScore = -Infinity;
  analyses.forEach((analysis, index) => {
    const score = analysis.score - index * 0.05;
    if (score > bestScore) {
      bestIndex = index;
      bestScore = score;
    }
  });
  return bestIndex;
}

function analyzePerk(perk, index, type, hero, stat) {
  const text = `${perk.name || ""} ${perk.description || ""}`.toLowerCase();
  const pick = numberFromStat(stat, ["pickrate", "pick_rate"]);
  const win = numberFromStat(stat, ["winrate", "win_rate"]);
  const isPopularHero = Number.isFinite(pick) && pick >= 10;
  const isWinningHero = Number.isFinite(win) && win >= 50;
  const isMajor = type === "major";

  const rules = [
    {
      keys: ["cooldown", "クールダウン", "短縮", "回復", "heal", "healing", "ライフ", "health", "armor", "shield"],
      levelKey: "high",
      level: "採用目安 高",
      score: 3,
      situation: "迷った時・安定重視",
      reason: "生存力や回転率を上げる効果は、マップや敵構成に左右されにくく腐りにくい。",
    },
    {
      keys: ["speed", "移動", "movement", "dash", "jump", "加速", "スピード", "range", "射程"],
      levelKey: "medium",
      level: "採用目安 中",
      score: 2,
      situation: "広いマップ・高台・当たり直し",
      reason: "位置取りや合流を助ける効果は、PushやFlashpoint、高台が多いステージで価値が上がる。",
    },
    {
      keys: ["damage", "ダメージ", "爆発", "追加", "critical", "クリティカル", "fire", "burn"],
      levelKey: "medium",
      level: "採用目安 中",
      score: 2,
      situation: "火力を出せる時・味方が支えてくれる時",
      reason: "火力強化はキルにつながるが、立ち位置やエイム、味方の支援が噛み合うほど強くなる。",
    },
    {
      keys: ["ultimate", "アルティメット", "ult", "チャージ"],
      levelKey: "situational",
      level: "状況採用",
      score: 1,
      situation: "長い集団戦・勝負所前",
      reason: "アルティメット関連はラウンドの流れに影響するが、短い当たり合いでは効果を感じにくいことがある。",
    },
    {
      keys: ["enemy", "敵", "revealed", "slow", "ノックバック", "stun", "阻害", "ハック"],
      levelKey: "situational",
      level: "状況採用",
      score: 1,
      situation: "特定キャラ対策・狭い場所",
      reason: "妨害や対策寄りの効果は、刺さる相手には強い一方で、相手構成によって価値が変わる。",
    },
  ];

  const matched = rules.find((rule) => rule.keys.some((key) => text.includes(key)));
  if (matched) {
    return matched;
  }

  if (isPopularHero && isWinningHero && index === 0) {
    return {
      levelKey: "high",
      level: "採用目安 高",
      score: 3,
      situation: "標準構成・まず試す候補",
      reason: "このヒーロー自体のPick/Winが悪くなく、最初の候補として試しやすい。",
    };
  }

  return {
    levelKey: isMajor ? "medium" : "situational",
    level: isMajor ? "採用目安 中" : "状況採用",
    score: isMajor ? 2 : 1,
    situation: isMajor ? "構成に合わせて選択" : "相手やマップで選択",
    reason: "パーク単位の実測使用率は公開データがないため、効果文とヒーローStatsからの目安として表示している。",
  };
}

function renderAbilityCard(ability) {
  return `
    <article class="ability-card">
      <img src="${safeUrl(ability.icon)}" alt="">
      <div>
        <h4>${escapeHtml(ability.name || "Unknown")}</h4>
        <p>${escapeHtml(ability.description || "")}</p>
      </div>
    </article>
  `;
}

function normalizePerks(raw) {
  const groups = { minor: [], major: [] };
  if (!raw) {
    return groups;
  }

  if (Array.isArray(raw)) {
    raw.forEach((item) => {
      const type = String(item.type || item.level || item.category || "").toLowerCase();
      groups[type.includes("major") || type.includes("3") ? "major" : "minor"].push(normalizePerk(item));
    });
    return groups;
  }

  Object.entries(raw).forEach(([key, value]) => {
    const lower = key.toLowerCase();
    const target = lower.includes("major") ? "major" : lower.includes("minor") ? "minor" : null;
    if (!target) {
      return;
    }
    toArray(value).forEach((item) => groups[target].push(normalizePerk(item)));
  });

  return groups;
}

function normalizePerk(raw) {
  if (typeof raw === "string") {
    return { name: raw, description: "", icon: "" };
  }

  return {
    name: stringValue(raw.name || raw.title || raw.label || raw.key),
    description: stringValue(raw.description || raw.effect || raw.summary || raw.tooltip),
    icon: stringValue(raw.icon || raw.image || raw.image_url),
  };
}

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!cached || Date.now() - cached.timestamp > CACHE_MS) {
      return null;
    }
    return cached;
  } catch {
    return null;
  }
}

function hydrateFromCache(cached) {
  state.heroes = cached.heroes || [];
  state.heroDetails = new Map(cached.heroDetails || []);
  state.heroStats = new Map(cached.heroStats || []);
  state.maps = normalizeStages(cached.maps || FALLBACK_STAGES);
  state.selectedHeroKey = state.heroes[0]?.key || null;
}

function writeCache() {
  const payload = {
    timestamp: Date.now(),
    heroes: state.heroes,
    heroDetails: [...state.heroDetails.entries()],
    heroStats: [...state.heroStats.entries()],
    maps: state.maps,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

function readFavorites() {
  try {
    const keys = JSON.parse(localStorage.getItem(FAVORITE_KEY));
    state.favoriteHeroKeys = new Set(Array.isArray(keys) ? keys : []);
  } catch {
    state.favoriteHeroKeys = new Set();
  }
}

function writeFavorites() {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify([...state.favoriteHeroKeys]));
}

function toggleFavorite(heroKey) {
  if (state.favoriteHeroKeys.has(heroKey)) {
    state.favoriteHeroKeys.delete(heroKey);
  } else {
    state.favoriteHeroKeys.add(heroKey);
  }
  writeFavorites();
  renderHeroList();
  renderHeroDetail();
}

function renderFatalError(error) {
  els.heroList.innerHTML = "";
  els.heroDetail.innerHTML = `
    <div class="error-state">
      <p>${escapeHtml(error.message)}</p>
      <p>OverFast APIに接続できませんでした。</p>
    </div>
  `;
}

function renderEmpty(message) {
  return `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
}

function setStatus(message) {
  els.syncStatus.textContent = message;
}

function setProgress(message) {
  els.detailProgress.textContent = message;
}

function setSelectOptions(select, options, selectedValue) {
  const values = new Set(options.map((option) => option.value));
  const nextValue = values.has(selectedValue) ? selectedValue : "all";
  if (nextValue !== selectedValue) {
    if (select === els.compRuleFilter) {
      state.compFilters.rule = nextValue;
    } else if (select === els.compMapFilter) {
      state.compFilters.map = nextValue;
    } else if (select === els.compStageFilter) {
      state.compFilters.stage = nextValue;
    } else if (select === els.compHeroFilter) {
      state.compFilters.hero = nextValue;
    }
  }

  select.innerHTML = options
    .map((option) => {
      const selected = option.value === nextValue ? " selected" : "";
      return `<option value="${escapeAttr(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
    })
    .join("");
}

function normalizeStages(rawMaps) {
  const maps = Array.isArray(rawMaps) && rawMaps.length ? rawMaps : FALLBACK_STAGES;
  const normalized = maps
    .map((map) => {
      const name = stringValue(map.name || map.label || map.title || map.key);
      if (!name) {
        return null;
      }
      const key = stringValue(map.key || slugify(name));
      const rule = normalizeRule(readMapMode(map) || guessStageRule(name)) || "Control";
      const style = normalizeStageStyle(map.style) || guessStageStyle(name, rule);
      return { key, name, rule, style };
    })
    .filter(Boolean);

  const byName = new Map();
  [...FALLBACK_STAGES.map((stage) => ({ ...stage, key: slugify(stage.name) })), ...normalized].forEach((stage) => {
    byName.set(stage.name, {
      key: stage.key || slugify(stage.name),
      name: stage.name,
      rule: normalizeRule(stage.rule) || "Control",
      style: normalizeStageStyle(stage.style) || guessStageStyle(stage.name, stage.rule),
    });
  });

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

function readMapMode(map) {
  const raw =
    map.gamemode ||
    map.game_mode ||
    map.mode ||
    map.rule ||
    (Array.isArray(map.gamemodes) ? map.gamemodes[0] : null);
  if (!raw || typeof raw !== "object") {
    return raw;
  }
  return raw.key || raw.name || raw.label || raw.title || "";
}

function getSelectedStage() {
  if (state.compFilters.stage === "all") {
    return null;
  }
  return state.maps.find((stage) => stage.key === state.compFilters.stage) || null;
}

function normalizeRule(value) {
  const text = stringValue(value).toLowerCase();
  if (text.includes("control")) return "Control";
  if (text.includes("escort")) return "Escort";
  if (text.includes("hybrid")) return "Hybrid";
  if (text.includes("push")) return "Push";
  if (text.includes("flash")) return "Flashpoint";
  if (text.includes("clash")) return "Clash";
  return "";
}

function normalizeStageStyle(value) {
  const text = stringValue(value);
  return COMP_MAP_OPTIONS.includes(text) ? text : "";
}

function guessStageRule(name) {
  const fallback = FALLBACK_STAGES.find((stage) => stage.name === name);
  return fallback?.rule || "";
}

function guessStageStyle(name, rule) {
  const fallback = FALLBACK_STAGES.find((stage) => stage.name === name);
  if (fallback) {
    return fallback.style;
  }
  if (rule === "Escort") {
    return "長射線";
  }
  if (rule === "Hybrid" || rule === "Clash" || rule === "Control") {
    return "狭所乱戦";
  }
  return "広い移動";
}

function labelRole(role) {
  const labels = {
    tank: "Tank",
    damage: "Damage",
    support: "Support",
    open: "Open",
  };
  return labels[String(role).toLowerCase()] || stringValue(role) || "-";
}

function shortRole(role) {
  const labels = {
    tank: "TNK",
    damage: "DMG",
    support: "SUP",
  };
  return labels[String(role).toLowerCase()] || "OW";
}

function heroName(key) {
  const found = state.heroes.find((hero) => hero.key === key || hero.name === key);
  if (found) {
    return found.name;
  }
  return stringValue(key)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function pickBackground(backgrounds) {
  if (!Array.isArray(backgrounds) || !backgrounds.length) {
    return "";
  }

  const preferred =
    backgrounds.find((item) => item.sizes?.includes("xl+")) ||
    backgrounds.find((item) => item.sizes?.includes("lg")) ||
    backgrounds[backgrounds.length - 1];
  return preferred?.url || "";
}

function formatHitpoints(hitpoints) {
  if (!hitpoints || typeof hitpoints !== "object") {
    return { total: "", label: "" };
  }

  const parts = [];
  const aliases = [
    ["health", "HP"],
    ["armor", "Armor"],
    ["shields", "Shield"],
    ["shield", "Shield"],
  ];

  aliases.forEach(([key, label]) => {
    const value = Number(hitpoints[key]);
    if (Number.isFinite(value) && value > 0) {
      parts.push({ label, value });
    }
  });

  const total = Number(hitpoints.total) || parts.reduce((sum, item) => sum + item.value, 0);
  return {
    total: total ? formatNumber(total) : "",
    label: parts.length
      ? parts.map((item) => `${item.label} ${formatNumber(item.value)}`).join(" / ")
      : total
        ? `HP ${formatNumber(total)}`
        : "",
  };
}

function numberFromStat(source, keys) {
  if (!source || typeof source !== "object") {
    return NaN;
  }
  for (const key of keys) {
    const value = Number(source[key]);
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return NaN;
}

function numberFromNested(source, paths) {
  for (const path of paths) {
    let cursor = source;
    for (const part of path) {
      cursor = cursor?.[part];
    }
    const value = Number(cursor);
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return NaN;
}

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  const normalized = value > 0 && value <= 1 ? value * 100 : value;
  return `${normalized.toFixed(1)}%`;
}

function formatDecimal(value, digits) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  return value.toFixed(digits);
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }
  return new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 0 }).format(value);
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "-";
  }
  const hours = seconds / 3600;
  if (hours >= 1) {
    return `${hours.toFixed(hours >= 10 ? 0 : 1)}h`;
  }
  return `${Math.round(seconds / 60)}m`;
}

function formatClock(date) {
  return new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function toArray(value) {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function stringValue(value) {
  return value === undefined || value === null ? "" : String(value);
}

function slugify(value) {
  return stringValue(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function readableError(value) {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(readableError).join(", ");
  }
  if (value && typeof value === "object") {
    return value.msg || value.message || value.error || JSON.stringify(value);
  }
  return stringValue(value);
}

function safeUrl(value) {
  const text = stringValue(value);
  try {
    const url = new URL(text, window.location.href);
    return url.protocol === "https:" ? escapeAttr(url.href) : "";
  } catch {
    return "";
  }
}

function escapeHtml(value) {
  return stringValue(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
