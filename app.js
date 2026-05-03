const API_BASE = "https://overfast-api.tekrop.fr";
const LOCALE = "ja-jp";
const FALLBACK_LOCALE = "en-us";
const ACCESS_PASSWORD = "1234567890";
const ACCESS_KEY = "ow2-reference-access-v1";
const TRACKED_PLAYERS = [
  { label: "自分 RYUKO", name: "RYUKO" },
  { label: "ゆうき(弟) ZEPPRLI0204", name: "ZEPPRLI0204" },
  { label: "ゆうき(MAX) YUKINGMAX", name: "YUKINGMAX" },
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
  playerMode: "competitive",
  playerPlatform: "pc",
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
  els.playerGrid = document.querySelector("#playerGrid");
  els.playerMode = document.querySelector("#playerMode");
  els.playerPlatform = document.querySelector("#playerPlatform");
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

  els.playerMode.addEventListener("change", (event) => {
    state.playerMode = event.target.value;
    loadPlayers();
  });

  els.playerPlatform.addEventListener("change", (event) => {
    state.playerPlatform = event.target.value;
    loadPlayers();
  });
}

async function bootstrap() {
  if (state.bootstrapped) {
    setStatus(state.heroes.length ? "表示中" : "起動中");
    setProgress(state.heroes.length ? "Ready" : "Waiting");
    renderAll();
    await loadPlayers();
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
  await loadPlayers();
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
  els.compGrid.innerHTML = Array.from({ length: 3 }, () => '<article class="comp-card skeleton"></article>').join("");
  els.playerGrid.innerHTML = TRACKED_PLAYERS.map(
    () => '<article class="player-card skeleton"></article>',
  ).join("");
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
    platform: "pc",
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
  const comps = buildRecommendedComps();
  if (!comps.length) {
    els.compGrid.innerHTML = renderEmpty("ヒーローStatsを取得できるとおすすめ構成が表示されます。");
    return;
  }

  els.compGrid.innerHTML = comps.map(renderCompCard).join("");
  els.compGrid.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
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
      title: "安定構成",
      note: "PickとWinのバランス重視",
      members: makeMembers("balanced"),
    },
    {
      title: "勝率重視",
      note: "Win Rateを少し強めに評価",
      members: makeMembers("win"),
    },
    {
      title: "合わせやすさ重視",
      note: "Pick Rate高めで野良にも合わせやすい",
      members: makeMembers("pick"),
    },
  ].filter((comp) => comp.members.length === 5);
}

function renderCompCard(comp) {
  return `
    <article class="comp-card">
      <div class="comp-head">
        <h3>${escapeHtml(comp.title)}</h3>
        <p>${escapeHtml(comp.note)}</p>
      </div>
      <div class="comp-members">
        ${comp.members.map(renderCompMember).join("")}
      </div>
    </article>
  `;
}

function renderCompMember(hero) {
  const stat = state.heroStats.get(hero.key);
  return `
    <button class="comp-member" type="button" data-hero-key="${escapeAttr(hero.key)}">
      <img src="${safeUrl(hero.portrait)}" alt="">
      <span>
        <strong>${escapeHtml(hero.name)}</strong>
        <small>${escapeHtml(labelRole(hero.role))} · Pick ${formatPercent(numberFromStat(stat, ["pickrate", "pick_rate"]))} · Win ${formatPercent(numberFromStat(stat, ["winrate", "win_rate"]))}</small>
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

async function loadPlayers() {
  els.playerGrid.innerHTML = TRACKED_PLAYERS.map(
    () => '<article class="player-card skeleton"></article>',
  ).join("");

  const results = await Promise.all(TRACKED_PLAYERS.map((player) => loadPlayer(player)));
  els.playerGrid.innerHTML = results.map(renderPlayerCard).join("");
}

async function loadPlayer(player) {
  const inputName = player.name;
  try {
    const playerId = await resolvePlayerId(inputName);
    const params = {
      gamemode: state.playerMode,
      platform: state.playerPlatform,
    };

    const [summaryResult, statsResult] = await Promise.allSettled([
      fetchJson(`/players/${encodeURIComponent(playerId)}/summary`),
      fetchJson(`/players/${encodeURIComponent(playerId)}/stats/summary`, params),
    ]);

    const summary = summaryResult.status === "fulfilled" ? summaryResult.value : null;
    if (statsResult.status !== "fulfilled") {
      throw statsResult.reason;
    }

    return {
      inputName,
      label: player.label,
      playerId,
      summary,
      stats: statsResult.value,
      error: null,
    };
  } catch (error) {
    return {
      inputName,
      label: player.label,
      playerId: inputName,
      summary: null,
      stats: null,
      error: error.message,
    };
  }
}

async function resolvePlayerId(inputName) {
  try {
    const search = await fetchJson("/players", { name: inputName, limit: 10 });
    const results = extractSearchResults(search);
    if (!results.length) {
      if (/-\d{3,}$/.test(inputName)) {
        return inputName;
      }
      throw new Error(`${inputName} が見つかりません。BattleTagの番号まで指定してください。`);
    }
    const exact = results.find((item) => {
      const name = stringValue(item.name || item.player_name || item.player_id);
      return name.toLowerCase() === inputName.toLowerCase();
    });
    const best = exact || results[0];
    return stringValue(best?.player_id || best?.id || best?.name || inputName);
  } catch (error) {
    if (/-\d{3,}$/.test(inputName)) {
      return inputName;
    }
    throw error;
  }
}

function extractSearchResults(search) {
  if (Array.isArray(search)) {
    return search;
  }
  return search?.results || search?.players || search?.data || search?.items || [];
}

function renderPlayerCard(result) {
  if (result.error) {
    return `
      <article class="player-card">
        <div class="player-head">
          <div></div>
          <div>
            <h3>${escapeHtml(result.label || result.inputName)}</h3>
            <div class="chips"><span class="rank-chip">Not available</span></div>
          </div>
        </div>
        <div class="player-body">
          <div class="error-state">
            <p>${escapeHtml(result.error)}</p>
            <p>公開プロフィール、BattleTagの表記、API制限を確認してください。BattleTag#1234 は BattleTag-1234 として扱われます。</p>
          </div>
        </div>
      </article>
    `;
  }

  const summary = result.summary || {};
  const stats = result.stats || {};
  const general = stats.general || stats.summary || stats;
  const avatar = safeUrl(summary.avatar || summary.icon || "");
  const displayName = result.label || summary.name || result.playerId || result.inputName;
  const metrics = playerMetrics(general);
  const ranks = rankChips(summary);
  const roles = roleStats(stats);
  const topHeroes = topHeroStats(stats);

  return `
    <article class="player-card">
      <div class="player-head">
        ${avatar ? `<img src="${avatar}" alt="">` : "<div></div>"}
        <div>
          <h3>${escapeHtml(displayName)}</h3>
          <div class="chips">
            ${ranks.length ? ranks.map((rank) => `<span class="rank-chip">${escapeHtml(rank)}</span>`).join("") : '<span class="rank-chip">Rank N/A</span>'}
          </div>
        </div>
      </div>
      <div class="player-body">
        <div class="metric-grid">
          ${metrics.map((item) => renderMetric(item.label, item.value)).join("")}
        </div>

        <section>
          <div class="panel-title"><h3>Role</h3></div>
          <div class="role-grid">
            ${roles.length ? roles.map(renderRoleStat).join("") : renderEmpty("ロール統計を取得できませんでした。")}
          </div>
        </section>

        <section>
          <div class="panel-title"><h3>Top Heroes</h3></div>
          <div class="top-heroes">
            ${topHeroes.length ? topHeroes.map(renderTopHero).join("") : renderEmpty("ヒーロー別統計を取得できませんでした。")}
          </div>
        </section>
      </div>
    </article>
  `;
}

function playerMetrics(general) {
  return [
    {
      label: "Win Rate",
      value: formatPercent(numberFromStat(general, ["winrate", "win_rate"])),
    },
    {
      label: "KDA",
      value: formatDecimal(numberFromStat(general, ["kda", "kda_ratio"]), 2),
    },
    {
      label: "Time",
      value: formatDuration(numberFromStat(general, ["time_played", "timePlayed", "playtime"])),
    },
    {
      label: "Games",
      value: formatNumber(numberFromStat(general, ["games", "games_played", "played"])),
    },
    {
      label: "Elims/10",
      value: formatDecimal(numberFromNested(general, [["average", "eliminations"], ["average_eliminations"], ["eliminations_avg"]]), 1),
    },
    {
      label: "Deaths/10",
      value: formatDecimal(numberFromNested(general, [["average", "deaths"], ["average_deaths"], ["deaths_avg"]]), 1),
    },
    {
      label: "Damage/10",
      value: formatNumber(numberFromNested(general, [["average", "damage"], ["average_damage"], ["damage_avg"]])),
    },
    {
      label: "Healing/10",
      value: formatNumber(numberFromNested(general, [["average", "healing"], ["average_healing"], ["healing_avg"]])),
    },
  ];
}

function roleStats(stats) {
  const roles = stats.roles || {};
  const entries = Array.isArray(roles)
    ? roles.map((item) => [item.role || item.name, item])
    : Object.entries(roles);

  return entries
    .filter(([role, value]) => role && value)
    .map(([role, value]) => ({
      role,
      time: numberFromStat(value, ["time_played", "timePlayed", "playtime"]),
      winrate: numberFromStat(value, ["winrate", "win_rate"]),
    }))
    .sort((a, b) => b.time - a.time);
}

function renderRoleStat(item) {
  return `
    <div class="role-stat">
      <strong>${escapeHtml(labelRole(item.role))}</strong>
      <span>${formatDuration(item.time)} · ${formatPercent(item.winrate)}</span>
    </div>
  `;
}

function topHeroStats(stats) {
  const heroes = stats.heroes || {};
  const entries = Array.isArray(heroes)
    ? heroes.map((item) => [item.hero || item.name || item.key, item])
    : Object.entries(heroes);

  return entries
    .filter(([hero, value]) => hero && value)
    .map(([hero, value]) => ({
      hero,
      time: numberFromStat(value, ["time_played", "timePlayed", "playtime"]),
      winrate: numberFromStat(value, ["winrate", "win_rate"]),
      games: numberFromStat(value, ["games", "games_played", "played"]),
    }))
    .sort((a, b) => b.time - a.time || b.games - a.games)
    .slice(0, 6);
}

function renderTopHero(item) {
  return `
    <div class="top-hero">
      <strong>${escapeHtml(heroName(item.hero))}</strong>
      <span>${formatDuration(item.time)} · ${formatPercent(item.winrate)}</span>
    </div>
  `;
}

function rankChips(summary) {
  const chips = [];
  const competitive = summary.competitive || summary.ranks || {};
  const walk = (node, trail = []) => {
    if (!node || typeof node !== "object" || chips.length >= 6) {
      return;
    }

    const division = node.division || node.rank || node.tier || node.name;
    const role = node.role || trail.find((part) => ["tank", "damage", "support", "open"].includes(part));
    if (division && (node.tier || node.division || node.rank_icon || node.icon)) {
      chips.push(`${role ? `${labelRole(role)} ` : ""}${division}${node.tier ? ` ${node.tier}` : ""}`);
      return;
    }

    Object.entries(node).forEach(([key, value]) => walk(value, [...trail, key]));
  };

  walk(competitive);
  return [...new Set(chips)];
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
