const API_BASE = "https://overfast-api.tekrop.fr";
const LOCALE = "ja-jp";
const FALLBACK_LOCALE = "en-us";
const ACCESS_PASSWORD = "1234567890";
const ACCESS_KEY = "ow2-reference-access-v1";
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
const CACHE_KEY = "ow2-reference-cache-v1";
const CACHE_MS = 6 * 60 * 60 * 1000;

const state = {
  bootstrapped: false,
  heroes: [],
  heroDetails: new Map(),
  heroStats: new Map(),
  selectedHeroKey: null,
  role: "all",
  query: "",
  loadingDetails: false,
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  if (hasSavedAccess()) {
    unlockApp({ remember: true });
  }
});

function cacheElements() {
  els.authForm = document.querySelector("#authForm");
  els.authPassword = document.querySelector("#authPassword");
  els.rememberAccess = document.querySelector("#rememberAccess");
  els.authError = document.querySelector("#authError");
  els.syncStatus = document.querySelector("#syncStatus");
  els.lockButton = document.querySelector("#lockButton");
  els.refreshButton = document.querySelector("#refreshButton");
  els.heroSearch = document.querySelector("#heroSearch");
  els.roleButtons = document.querySelectorAll("[data-role]");
  els.heroList = document.querySelector("#heroList");
  els.heroDetail = document.querySelector("#heroDetail");
  els.heroCount = document.querySelector("#heroCount");
  els.detailProgress = document.querySelector("#detailProgress");
  els.metaStats = document.querySelector("#metaStats");
  els.compGrid = document.querySelector("#compGrid");
}

function bindEvents() {
  els.authForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = els.authPassword.value;
    if (password !== ACCESS_PASSWORD) {
      els.authError.textContent = "パスワードが違います。";
      els.authPassword.select();
      return;
    }
    unlockApp({ remember: els.rememberAccess.checked });
  });

  els.lockButton.addEventListener("click", lockApp);
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

function hasSavedAccess() {
  return localStorage.getItem(ACCESS_KEY) === "unlocked";
}

function unlockApp({ remember }) {
  if (remember) {
    localStorage.setItem(ACCESS_KEY, "unlocked");
  } else {
    localStorage.removeItem(ACCESS_KEY);
  }
  els.authError.textContent = "";
  els.authPassword.value = "";
  document.body.classList.remove("is-locked");
  bootstrap();
}

function lockApp() {
  localStorage.removeItem(ACCESS_KEY);
  document.body.classList.add("is-locked");
  setStatus("ロック中");
  window.scrollTo({ top: 0, behavior: "auto" });
  els.authPassword.focus();
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
    const [heroes, heroStats] = await Promise.all([
      fetchHeroes(),
      fetchHeroStats().catch(() => []),
    ]);

    state.heroes = heroes;
    state.heroStats = new Map(heroStats.map((item) => [item.hero, item]));
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

function renderComps() {
  const comps = [
    ...buildStaticComps(COMPOSITION_EXAMPLES),
    ...buildStaticComps(MODE_COMPOSITION_EXAMPLES),
    ...buildStaticComps(MAP_STYLE_COMPOSITION_EXAMPLES),
    ...buildRecommendedComps(),
  ];
  if (!comps.length) {
    els.compGrid.innerHTML = renderEmpty("構成例を準備中です。");
    return;
  }

  els.compGrid.innerHTML = comps.map(renderCompCard).join("");
  els.compGrid.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function buildStaticComps(comps) {
  return comps.map((comp) => ({
    ...comp,
    members: comp.members.map((member) => ({
      ...member,
      hero: state.heroes.find((hero) => hero.key === member.key),
      source: "example",
    })),
  }));
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
      members: makeMembers("balanced").map((hero) => ({ hero, role: hero.role, source: "stats" })),
    },
    {
      title: "Stats勝率",
      note: "Win Rateを少し強めに評価した候補。",
      tag: "Data",
      members: makeMembers("win").map((hero) => ({ hero, role: hero.role, source: "stats" })),
    },
    {
      title: "Stats合わせやすさ",
      note: "Pick Rate高めで合わせやすい候補。",
      tag: "Data",
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
      <div class="comp-members">
        ${comp.members.map(renderCompMember).join("")}
      </div>
    </article>
  `;
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

  return `
    <button class="hero-row${active}" type="button" data-hero-key="${escapeAttr(hero.key)}">
      <img src="${safeUrl(hero.portrait)}" alt="">
      <span>
        <strong>${escapeHtml(hero.name)}</strong>
        <small>${escapeHtml(labelRole(hero.role))} · Pick ${pickRate} · Win ${winRate}</small>
      </span>
      <span class="role-badge">${escapeHtml(shortRole(hero.role))}</span>
    </button>
  `;
}

function getFilteredHeroes() {
  return state.heroes.filter((hero) => {
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
          <span class="chip">Minor ${perks.minor.length} / Major ${perks.major.length}</span>
        </div>
        ${renderPerkGroup("Minor Perk", perks.minor)}
        ${renderPerkGroup("Major Perk", perks.major)}
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
}

function renderHeroVisual(hero, detail) {
  const background = pickBackground(detail?.backgrounds);
  const hitpoints = formatHitpoints(detail?.hitpoints);
  const location = detail?.location ? `<span class="chip">${escapeHtml(detail.location)}</span>` : "";
  const hp = hitpoints.label ? `<span class="chip">${escapeHtml(hitpoints.label)}</span>` : "";
  const subrole = hero.subrole ? `<span class="chip">${escapeHtml(hero.subrole)}</span>` : "";

  return `
    <section class="hero-visual" style="--hero-bg: url('${safeUrl(background)}')">
      <div class="hero-copy">
        <div class="chips">
          <span class="chip">${escapeHtml(labelRole(hero.role))}</span>
          ${subrole}
          ${hp}
          ${location}
        </div>
        <h2>${escapeHtml(hero.name)}</h2>
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

function renderPerkGroup(label, perks) {
  return `
    <div class="perk-group">
      <span class="perk-type">${escapeHtml(label)}</span>
      <div class="perk-grid">
        ${perks.length ? perks.map(renderPerkCard).join("") : renderEmpty("パークを取得できませんでした。")}
      </div>
    </div>
  `;
}

function renderPerkCard(perk) {
  const icon = perk.icon ? `<img src="${safeUrl(perk.icon)}" alt="">` : '<span></span>';
  return `
    <article class="perk-card">
      ${icon}
      <div>
        <h4>${escapeHtml(perk.name || "Unknown")}</h4>
        <p>${escapeHtml(perk.description || "")}</p>
      </div>
    </article>
  `;
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
  state.selectedHeroKey = state.heroes[0]?.key || null;
}

function writeCache() {
  const payload = {
    timestamp: Date.now(),
    heroes: state.heroes,
    heroDetails: [...state.heroDetails.entries()],
    heroStats: [...state.heroStats.entries()],
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
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
