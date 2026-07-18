const API_BASE = "https://overfast-api.tekrop.fr";
const LOCALE = "ja-jp";
const FALLBACK_LOCALE = "en-us";
const RECENT_UPDATE_DAYS = 7;
const FETCH_TIMEOUT_MS = 9000;
const FETCH_RETRY_DELAYS = [0, 650];
const QUICK_PERK_ROLES = [
  { role: "tank", label: "Tank", ja: "タンク" },
  { role: "damage", label: "Damage", ja: "ダメージ" },
  { role: "support", label: "Support", ja: "サポート" },
];
const OFFICIAL_PATCH_UPDATES = [
  {
    type: "公式パッチ",
    title: "2026年7月15日配信パッチ サマー・ゲーム2026",
    date: "2026-07-14",
    tone: "buff",
    category: "patch",
    summary: "サマー・ゲーム2026、ジャンクラットのトレジャー・ハント予定、ヒーロー調整、不具合修正を含む最新パッチ。",
    details: ["サマー・ゲーム2026を7月15日から31日まで配信", "ドゥームフィストの強化ロケット・パンチ射程/範囲ボーナスを調整", "シオン、マウガ、シエラ、スタジアム関連の不具合を修正"],
    href: "https://overwatch.blizzard.com/ja-jp/news/patch-notes/live/2026/07/",
  },
  {
    type: "公式パッチ",
    title: "2026年2月25日 不具合修正",
    date: "2026-02-25",
    tone: "info",
    category: "patch",
    summary: "公式パッチノート上の最新更新。バランス変更なしの不具合修正パッチ。",
    details: ["Dominaのアーマーに対するビームダメージ計算を修正", "PharahのPerk Rocket Salvoが想定以上に発射できる不具合を修正", "6v6 Open Queueのタンク系パッシブ不具合を修正"],
    href: "https://overwatch.blizzard.com/ja-jp/news/patch-notes/",
  },
  {
    type: "公式パッチ",
    title: "2026年2月25日配信パッチ 不具合修正",
    date: "2026-02-24",
    tone: "info",
    category: "patch",
    summary: "日本語公式告知の不具合修正。ヒーロー、スタジアム、UI周辺の修正が中心。",
    details: ["ソルジャー76スキン、アナ、ジェットパック・キャット、マーシーなどの不具合を修正", "スタジアムUI消失やヴェンデッタのULT関連不具合を修正", "ミズキがスタン中に形代を発動できる不具合を修正"],
    href: "https://overwatch.blizzard.com/ja-jp/news/patch-notes/",
  },
  {
    type: "公式パッチ",
    title: "2026年2月19日配信パッチ 不具合修正",
    date: "2026-02-18",
    tone: "info",
    category: "patch",
    summary: "トールビョーン、ジャンカー・クイーン、アッシュ、ミズキ、アンランなどの不具合修正。",
    details: ["トールビョーンのメイン攻撃とタレットの発射レート不具合を修正", "アッシュのダブルバレル関連不具合を修正", "レッキング・ボールのマルチ・ボール地雷数不具合を修正"],
    href: "https://overwatch.blizzard.com/ja-jp/news/patch-notes/",
  },
  {
    type: "公式パッチ",
    title: "2026年2月14日配信パッチ ヒーロー調整",
    date: "2026-02-13",
    tone: "buff",
    category: "patch",
    summary: "新ヒーロー6人を対象とした小規模なバランス調整と不具合修正。",
    details: ["ドミナのバリア耐久を低下", "アンラン、エムレ、ミズキに使いやすさや射程面の強化", "ジェットパック・キャットとヴェンデッタには一部弱体化"],
    href: "https://overwatch.blizzard.com/ja-jp/news/patch-notes/",
  },
];
const OFFICIAL_NEWS_ITEMS = [
  {
    type: "公式ニュース",
    title: "新要素「サブ・ロール」の紹介",
    date: "2026-02-26",
    tone: "info",
    category: "official-news",
    summary: "ヒーロー選択と役割理解に関わる新要素。初心者は自分の役割把握に使いやすい。",
    details: ["タンク/DPS/サポート内の役割をより細かく理解できる", "構成の意図を読みやすくなる", "このサイトのセオリー構成例とも合わせて見る"],
    href: "https://overwatch.blizzard.com/ja-jp/news/",
  },
  {
    type: "公式ニュース",
    title: "ハローキティ・アンド・フレンズ コラボ",
    date: "2026-02-12",
    tone: "video",
    category: "official-news",
    summary: "期間限定コラボ。イベントやスキン確認用の公式ニュース。",
    details: ["期間限定イベントやストア更新の確認に使う", "ゲーム内チャレンジがある場合は先に報酬条件を見る", "環境変化ではなくイベント情報として扱う"],
    href: "https://overwatch.blizzard.com/ja-jp/news/",
  },
  {
    type: "公式ニュース",
    title: "OWCS 2026 開幕前ガイド",
    date: "2026-01-29",
    tone: "esports",
    category: "official-news",
    summary: "競技シーンを見る時の入り口。構成やULT合わせを学ぶ材料にしやすい。",
    details: ["プロの構成はそのまま真似ず、役割と当たり合いの作り方を見る", "観戦時は最初の高台取り、ULT順、リグループに注目", "初心者は構成名より動きの理由を優先して学ぶ"],
    href: "https://overwatch.blizzard.com/ja-jp/news/",
  },
];
const TOPICAL_ARTICLE_ITEMS = [
  {
    type: "話題・参考",
    title: "Overwatch 2のリブランドと2026年方針",
    date: "2026-02-04",
    tone: "info",
    category: "topic",
    summary: "外部メディアのまとめ。ゲーム全体の方向性を把握する読み物。",
    details: ["公式情報の補助として読む", "バランス判断の根拠にはせず、今後の流れを知る用途", "大型変更時は公式パッチノートで必ず確認"],
    href: "https://www.polygon.com/gaming/518016/overwatch-2-renamed-overwatch-new-heroes",
  },
];
const PATCH_UPDATES = [...OFFICIAL_PATCH_UPDATES, ...OFFICIAL_NEWS_ITEMS, ...TOPICAL_ARTICLE_ITEMS];
const EXTRA_HEROES = [
  {
    key: "shion",
    name: "シオン",
    role: "damage",
    portrait: "",
    localDetail: true,
  },
];
const EXTRA_HERO_DETAILS = {
  shion: {
    key: "shion",
    description: "二丁拳銃とバイクで素早く仕掛ける高機動ダメージ。孤立した相手への奇襲が強い一方、準備された相手や妨害に弱い。",
    location: "Japan",
    hitpoints: { health: 250, total: 250 },
    abilities: [
      { name: "Kira Pistols", description: "左右のピストルを交互に撃つメイン武器。", icon: "" },
      { name: "Execution", description: "X字のボレーで瞬間火力を出す。", icon: "" },
      { name: "Evade", description: "素早くダッシュし、オーバーヘルスを得る。", icon: "" },
      { name: "Joyride", description: "バイクで移動し、投げつけてダメージを狙う。", icon: "" },
      { name: "Satsuriku Spree", description: "三方向へ連続突進しながら銃撃するアルティメット。", icon: "" },
    ],
    perks: {
      minor: [
        { name: "ラピッド・リロード", description: "Evade後の弾切れを減らし、近距離で撃ち続けやすくする。" },
        { name: "X・マキーナ", description: "Executionで体力が減った敵を倒し切りやすくする火力寄り候補。" },
      ],
      major: [
        { name: "リフュエル", description: "Joyride中の回復で、仕掛けた後の生存と離脱を安定させる。" },
        { name: "フェイシズ・オブ・デス", description: "ダメージ系サブロールの強みをまとめて得る、汎用火力寄り候補。" },
      ],
    },
  },
};
const OWPERKS_SOURCE_URL = "https://owperks.com/ja";
const HERO_LEARNING_LINKS = {
  defaultOfficial: "https://www.youtube.com/@PlayOverwatch/videos",
  defaultSearchBase: "https://www.youtube.com/results?search_query=",
  officialNews: "https://overwatch.blizzard.com/ja-jp/news/",
};
const OWPERKS_USAGE = {
  "ana": { minor: [18, 82], major: [31, 69] },
  "anran": { minor: [72, 28], major: [28, 72] },
  "ashe": { minor: [87, 13], major: [79, 21] },
  "baptiste": { minor: [48, 52], major: [76, 24] },
  "bastion": { minor: [34, 66], major: [27, 73] },
  "brigitte": { minor: [19, 81], major: [86, 14] },
  "cassidy": { minor: [94, 6], major: [7, 93] },
  "domina": { minor: [35, 65], major: [27, 73] },
  "doomfist": { minor: [38, 62], major: [8, 92] },
  "dva": { minor: [17, 83], major: [74, 26] },
  "echo": { minor: [23, 77], major: [95, 5] },
  "emre": { minor: [24, 76], major: [76, 24] },
  "freja": { minor: [57, 43], major: [70, 30] },
  "genji": { minor: [28, 72], major: [59, 41] },
  "hanzo": { minor: [65, 35], major: [67, 33] },
  "hazard": { minor: [13, 87], major: [83, 17] },
  "illari": { minor: [30, 70], major: [12, 88] },
  "jetpack_cat": { minor: [93, 7], major: [5, 95] },
  "junker-queen": { minor: [79, 21], major: [27, 73] },
  "junkrat": { minor: [65, 35], major: [14, 86] },
  "juno": { minor: [23, 77], major: [61, 39] },
  "kiriko": { minor: [26, 74], major: [13, 87] },
  "lifeweaver": { minor: [22, 78], major: [23, 77] },
  "lucio": { minor: [54, 46], major: [79, 21] },
  "mauga": { minor: [19, 81], major: [72, 28] },
  "mei": { minor: [27, 73], major: [72, 28] },
  "mercy": { minor: [46, 54], major: [60, 40] },
  "mizuki": { minor: [38, 62], major: [77, 23] },
  "moira": { minor: [18, 82], major: [24, 76] },
  "orisa": { minor: [17, 83], major: [63, 37] },
  "pharah": { minor: [75, 25], major: [14, 86] },
  "ramattra": { minor: [19, 81], major: [73, 27] },
  "reaper": { minor: [22, 78], major: [36, 64] },
  "reinhardt": { minor: [24, 76], major: [45, 55] },
  "roadhog": { minor: [73, 27], major: [73, 27] },
  "shion": { minor: [12, 88], major: [39, 61] },
  "sierra": { minor: [21, 79], major: [9, 91] },
  "sigma": { minor: [23, 77], major: [57, 43] },
  "sojourn": { minor: [51, 49], major: [23, 77] },
  "soldier-76": { minor: [76, 24], major: [21, 79] },
  "sombra": { minor: [24, 76], major: [23, 77] },
  "symmetra": { minor: [20, 80], major: [21, 79] },
  "torbjorn": { minor: [36, 64], major: [82, 18] },
  "tracer": { minor: [8, 92], major: [44, 56] },
  "vendetta": { minor: [31, 69], major: [86, 14] },
  "venture": { minor: [26, 74], major: [82, 18] },
  "widowmaker": { minor: [78, 22], major: [9, 91] },
  "winston": { minor: [83, 17], major: [24, 76] },
  "wrecking-ball": { minor: [33, 67], major: [26, 74] },
  "wuyang": { minor: [22, 78], major: [28, 72] },
  "zarya": { minor: [18, 82], major: [82, 18] },
  "zenyatta": { minor: [62, 38], major: [36, 64] },
};
const COMPOSITION_EXAMPLES = [
  {
    title: "迷ったらこれ",
    note: "まず全員が役割を理解しやすい汎用安定。マップを見てDPSだけ差し替える。",
    tag: "Default",
    members: [
      { role: "tank", key: "orisa", fallback: "オリーサ" },
      { role: "damage", key: "soldier-76", fallback: "ソルジャー76" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "汎用ポーク寄り",
    note: "射線を作って先に削る基本形。EscortやHybridで迷った時に使いやすい。",
    tag: "Default",
    members: [
      { role: "tank", key: "sigma", fallback: "シグマ" },
      { role: "damage", key: "ashe", fallback: "アッシュ" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
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
const THEORY_COMPOSITION_EXAMPLES = [
  {
    title: "初心者向け安定構成",
    archetype: "Default",
    goal: "前線、火力、回復の役割が分かりやすく、野良でも合わせやすい。",
    strong: "Control / Hybrid / 迷った時",
    weakness: "高台を放置すると押し込まれる。DPSのどちらかは横を取る。",
    swaps: "相手が空ならSoldier、近距離がきついならMei、回復が足りないならBaptiste。",
    members: [
      { role: "tank", key: "orisa", fallback: "オリーサ" },
      { role: "damage", key: "soldier-76", fallback: "ソルジャー76" },
      { role: "damage", key: "mei", fallback: "メイ" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "ポーク",
    archetype: "Poke",
    goal: "長い射線と高台で先に削り、相手がスキルを使ってから詰める。",
    strong: "Escort / 長射線 / 防衛",
    weakness: "一気に詰められると崩れやすい。角を捨てる判断が必要。",
    swaps: "相手がダイブならBrigitteやD.Va、射線勝ちしたいならWidowmaker。",
    members: [
      { role: "tank", key: "sigma", fallback: "シグマ" },
      { role: "damage", key: "ashe", fallback: "アッシュ" },
      { role: "damage", key: "sojourn", fallback: "ソジョーン" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
      { role: "support", key: "zenyatta", fallback: "ゼニヤッタ" },
    ],
  },
  {
    title: "ダイブ",
    archetype: "Dive",
    goal: "高台や孤立したサポートへ同時に入り、短時間で人数差を作る。",
    strong: "高台マップ / 広い移動 / 後衛が孤立する相手",
    weakness: "1人ずつ入ると返される。入る前に狙う敵を決める。",
    swaps: "難しければGenjiをSoldier、AnaをKirikoにして安定寄りにする。",
    members: [
      { role: "tank", key: "winston", fallback: "ウィンストン" },
      { role: "damage", key: "tracer", fallback: "トレーサー" },
      { role: "damage", key: "genji", fallback: "ゲンジ" },
      { role: "support", key: "ana", fallback: "アナ" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "ラッシュ",
    archetype: "Rush",
    goal: "ルシオのスピードで距離を詰め、狭い場所で一気に当たる。",
    strong: "King's Row / Lijiang Tower / 狭所乱戦",
    weakness: "長射線や空中相手に弱い。詰めるルートを決めないと削られる。",
    swaps: "相手が硬いならRamattra、分断したいならMei、火力がほしいならReaper。",
    members: [
      { role: "tank", key: "reinhardt", fallback: "ラインハルト" },
      { role: "damage", key: "mei", fallback: "メイ" },
      { role: "damage", key: "reaper", fallback: "リーパー" },
      { role: "support", key: "lucio", fallback: "ルシオ" },
      { role: "support", key: "baptiste", fallback: "バティスト" },
    ],
  },
  {
    title: "ピック",
    archetype: "Pick",
    goal: "ウィドウやハンゾーで先に1人落とし、人数有利で進める。",
    strong: "長射線 / 高台 / 防衛開始",
    weakness: "外す時間が長いと4対5のようになる。外したら構成変更も早めに考える。",
    swaps: "蘇生が欲しいならMercy、安定火力が欲しいならAsheやSoldier。",
    members: [
      { role: "tank", key: "dva", fallback: "D.Va" },
      { role: "damage", key: "widowmaker", fallback: "ウィドウメイカー" },
      { role: "damage", key: "hanzo", fallback: "ハンゾー" },
      { role: "support", key: "mercy", fallback: "マーシー" },
      { role: "support", key: "kiriko", fallback: "キリコ" },
    ],
  },
  {
    title: "対フランカー",
    archetype: "Anti Dive",
    goal: "トレーサー/ソンブラ/ゲンジに後衛を壊されないよう、近くで守って返す。",
    strong: "味方サポートが狙われ続ける試合",
    weakness: "守りすぎると前への圧が減る。返したらすぐ前へ出る。",
    swaps: "DPSはCassidyやTorbjorn、サポートはBrigitteやMoiraが分かりやすい。",
    members: [
      { role: "tank", key: "dva", fallback: "D.Va" },
      { role: "damage", key: "cassidy", fallback: "キャスディ" },
      { role: "damage", key: "torbjorn", fallback: "トールビョーン" },
      { role: "support", key: "brigitte", fallback: "ブリギッテ" },
      { role: "support", key: "moira", fallback: "モイラ" },
    ],
  },
];
const COMP_CATEGORY_LABELS = {
  style: "戦い方",
  rule: "ルール",
  map: "ステージ",
  data: "Stats",
};
const SENSITIVITY_PRESETS = {
  balanced: {
    title: "バランス",
    horizontal: [45, 65],
    verticalRatio: 0.82,
    scoped: [38, 50],
    assistWindow: [25, 45],
    smoothing: [85, 100],
    easeIn: [10, 30],
    note: "中距離DPS、タンク、サポートを広く触る人向け。",
  },
  tracking: {
    title: "トラッキング重視",
    horizontal: [38, 58],
    verticalRatio: 0.82,
    scoped: [35, 48],
    assistWindow: [35, 55],
    smoothing: [90, 100],
    easeIn: [18, 35],
    note: "ソルジャー76、ソジョーン、トレーサーなどで追い続ける人向け。",
  },
  flick: {
    title: "フリック重視",
    horizontal: [55, 78],
    verticalRatio: 0.86,
    scoped: [42, 58],
    assistWindow: [18, 36],
    smoothing: [70, 92],
    easeIn: [0, 18],
    note: "キャスディ、アッシュ、ウィドウメイカーなどで初動を速くしたい人向け。",
  },
  scoped: {
    title: "スコープ重視",
    horizontal: [42, 62],
    verticalRatio: 0.8,
    scoped: [38, 52],
    assistWindow: [22, 42],
    smoothing: [82, 96],
    easeIn: [8, 25],
    note: "アナ、アッシュ、ウィドウメイカーのADS中の安定を優先。",
  },
};
const HERO_AIM_PROFILES = {
  "soldier-76": { style: "tracking", horizontal: [45, 60], scoped: [40, 48], note: "横移動を追い続ける時間が長いので、行き過ぎない水平感度を優先。" },
  sojourn: { style: "tracking", horizontal: [45, 62], scoped: [42, 50], note: "通常射撃の追従とレールガンの止めを両立する中速寄り。" },
  tracer: { style: "tracking", horizontal: [55, 75], scoped: [40, 48], note: "近距離で視点移動が多いので水平感度は高め、細かい追従はアシストウィンドウで支える。" },
  sombra: { style: "tracking", horizontal: [52, 70], scoped: [40, 48], note: "裏取り後の初弾合わせと近距離追従を両方見る。" },
  reaper: { style: "tracking", horizontal: [50, 68], scoped: [40, 48], note: "近距離で大きく振るため低すぎる水平感度は避ける。" },
  bastion: { style: "tracking", horizontal: [38, 55], scoped: [38, 46], note: "変形中の追いエイムを安定させるため低中速寄り。" },
  cassidy: { style: "flick", horizontal: [50, 68], scoped: [42, 52], note: "初動を速くしすぎると止めづらいので、水平は中速から上げる。" },
  ashe: { style: "scoped", horizontal: [45, 62], scoped: [42, 52], note: "ADS中の頭の高さをなぞれるスコープ相対感度を優先。" },
  widowmaker: { style: "scoped", horizontal: [42, 60], scoped: [38, 50], note: "スコープ時の微調整が最優先。通常感度は振り向き用として詰める。" },
  ana: { style: "scoped", horizontal: [42, 58], scoped: [38, 50], note: "味方追従と敵への一瞬のスリープを両立する低中速寄り。" },
  hanzo: { style: "flick", horizontal: [48, 66], scoped: [40, 50], note: "溜め中の微調整と近距離フリックを両方確認する。" },
  genji: { style: "flick", horizontal: [58, 78], scoped: [40, 48], note: "振り向きと上下移動が多いので、縦感度を低くしすぎない。" },
  pharah: { style: "flick", horizontal: [52, 72], scoped: [40, 48], note: "空中からの大きい視点移動に合わせ、水平と垂直の差を小さめにする。" },
  echo: { style: "tracking", horizontal: [50, 68], scoped: [40, 48], note: "空中追従が多いので縦横比を0.85以上から試す。" },
  baptiste: { style: "tracking", horizontal: [42, 58], scoped: [40, 48], note: "回復弾と3点バーストの両方を安定させる中低速。" },
  illari: { style: "flick", horizontal: [45, 62], scoped: [42, 52], note: "チャージ射撃の止めを優先し、行き過ぎるなら水平を下げる。" },
  zenyatta: { style: "flick", horizontal: [45, 62], scoped: [40, 48], note: "不和後の単発精度を重視。速すぎる設定は避ける。" },
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
const HERO_ARCHETYPES = {
  brawl: ["reinhardt", "junker-queen", "ramattra", "orisa", "mei", "reaper", "cassidy", "lucio", "moira", "brigitte", "baptiste"],
  dive: ["winston", "dva", "wrecking-ball", "doomfist", "tracer", "genji", "sombra", "venture", "shion", "lucio", "ana", "kiriko", "juno"],
  poke: ["sigma", "ashe", "widowmaker", "hanzo", "soldier-76", "sojourn", "cassidy", "baptiste", "zenyatta", "illari", "ana"],
  pick: ["dva", "widowmaker", "hanzo", "ashe", "sombra", "tracer", "shion", "mercy", "kiriko"],
};
const HERO_COMBO_GUIDES = {
  ana: [
    {
      title: "阻害グレネード → スリープ確認 → フォーカス",
      steps: ["味方が詰める直前に阻害グレネードを入れる。", "逃げスキルやタンクの突進にスリープを合わせ、起こす味方を決めて倒す。"],
      note: "瓶とスリープを同時に外すと自衛がなくなるので、片方は返し用に残す判断も必要。",
    },
    {
      title: "ナノブースト → 味方ULT/突入",
      steps: ["ゲンジ、リーパー、ウィンストンなどが入る直前にナノを付ける。", "付けた後は対象を見続けず、他の味方のHPも確認する。"],
      note: "ナノ対象が見えてからでは遅いので、入る位置と合図を先に決める。",
    },
  ],
  ashe: [
    {
      title: "ダイナマイト → ADS追撃",
      steps: ["盾上や角裏にダイナマイトを投げ、空中で撃って燃焼を入れる。", "燃えた敵が下がるところをADSで1発ずつ削る。"],
      note: "コーチガンは追撃より自衛用に残すと安定する。",
    },
  ],
  baptiste: [
    {
      title: "イモータリティ → リジェネ → 高所ジャンプ",
      steps: ["味方が落ちそうな瞬間にイモータリティを置く。", "リジェネで戻しながら高所や角へジャンプし、射線を切って撃ち返す。"],
      note: "ランプを先置きしすぎると割られるので、致命傷の直前を狙う。",
    },
  ],
  bastion: [
    {
      title: "グレネード → 強襲モード集中火力",
      steps: ["グレネードで逃げ道や角を削る。", "相手の防御スキルを見てから強襲モードで短く撃ち切る。"],
      note: "変形中に正面へ残り続けず、終わる前に隠れる場所を決める。",
    },
  ],
  brigitte: [
    {
      title: "ウィップ・ショット → バッシュ → メイス追撃",
      steps: ["飛び込んでくる敵をウィップ・ショットで離す。", "近づかれたらバッシュで距離を作り、味方の射線に戻す。"],
      note: "自分から深く追うより、サポート周りで返す時に強い。",
    },
  ],
  cassidy: [
    {
      title: "グレネード → ロール → 近距離追撃",
      steps: ["機動キャラや瀕死の敵にグレネードを付ける。", "ロールでリロードし、角から出すぎず胴撃ちで倒し切る。"],
      note: "ロール後は逃げが弱いので、倒せない時は無理に追わない。",
    },
  ],
  doomfist: [
    {
      title: "スラム → パンチ壁当て → ブロックで帰る",
      steps: ["スラムで後衛や高台に入り、壁方向へパンチを狙う。", "倒し切れない時はブロックで火力を受け、次の移動で戻る。"],
      note: "パンチを先に使うと帰れないので、入る前に戻り道を決める。",
    },
  ],
  dva: [
    {
      title: "ブースター → ミサイル → 近距離射撃",
      steps: ["孤立した高台やサポートへブースターで入る。", "マイクロミサイルと近距離射撃を同時に当て、マトリックスで返しを消す。"],
      note: "倒せない時はメックを残すことを優先し、ブースターで戻る。",
    },
  ],
  echo: [
    {
      title: "粘着爆弾 → メイン → フォーカス・ビーム",
      steps: ["粘着爆弾とメイン射撃でHPを半分以下にする。", "フォーカス・ビームで短く削り切り、飛行で射線を切る。"],
      note: "ビームだけで入り始めると火力が足りない。先にHPを減らす。",
    },
  ],
  genji: [
    {
      title: "手裏剣 → 風斬り → 近接",
      steps: ["手裏剣で体力を削ってから風斬りで入り、近接を重ねる。", "キルで風斬りが戻ったら、次の敵か帰り道に使う。"],
      note: "最初から風斬りで入ると倒し切れない時に帰れない。",
    },
    {
      title: "龍撃剣 → 風斬り → 斬り",
      steps: ["味方のスピード、ナノ、鈴などの支援に合わせて抜刀する。", "風斬りで距離を詰め、斬りと風斬りリセットで次の敵へ移る。"],
      note: "支援なしで正面から抜くより、横や高台から入る。",
    },
  ],
  hanzo: [
    {
      title: "ソニック → ストームアロー → 角待ち",
      steps: ["ソニックで出てくる位置を確認する。", "ストームアローを角や盾割りに使い、見えた敵を先に削る。"],
      note: "体を出し続けるより、情報を取って一瞬だけ射線を通す。",
    },
  ],
  hazard: [
    {
      title: "壁で分断 → 飛び込み → 近距離追撃",
      steps: ["壁で回復線や逃げ道を切る。", "孤立した敵へ入り、倒せなければ壁の外へ戻る。"],
      note: "味方が撃てない場所で分断すると自分も孤立する。",
    },
  ],
  illari: [
    {
      title: "パイロン設置 → アウトバースト → チャージ射撃",
      steps: ["壊されにくい角にパイロンを置く。", "詰められたらアウトバーストで距離を取り、チャージ射撃で返す。"],
      note: "パイロンが壊された直後は無理に撃ち合わず、置き直す時間を作る。",
    },
  ],
  "junker-queen": [
    {
      title: "ナイフ引き寄せ → 斧 → ショットガン",
      steps: ["ナイフを当て、引き寄せた瞬間に距離を詰める。", "斧とショットガンで出血を重ね、シャウトで押し切る。"],
      note: "ナイフを外した時は無理に前へ出ず、次の角でやり直す。",
    },
  ],
  junkrat: [
    {
      title: "地雷 → グレネード → 地雷起爆",
      steps: ["足元や逃げ道に地雷を置く。", "グレネードを当てた直後に地雷で押し込み、瀕死を回収する。"],
      note: "地雷を移動用に使うか火力用に使うかを先に決める。",
    },
  ],
  juno: [
    {
      title: "リング → ブースト → 魚雷追撃",
      steps: ["味方が入る方向にハイパーリングを置く。", "ブーストで角を越え、魚雷で複数の味方回復と敵削りを同時に狙う。"],
      note: "リングだけ置いて味方が使えない位置だと価値が落ちる。",
    },
  ],
  kiriko: [
    {
      title: "鈴で受ける → 神出鬼没 → クナイ追撃",
      steps: ["阻害や大ダメージに鈴を合わせる。", "神出鬼没で射線を変え、頭の高さへクナイを通す。"],
      note: "鈴を攻めに使った後は、味方の危険スキルを受けられない点に注意。",
    },
  ],
  lifeweaver: [
    {
      title: "ペタル → ライフグリップ → 立て直し",
      steps: ["ペタルで高所や逃げ道を作る。", "深く入った味方をライフグリップで戻し、花で回復を重ねる。"],
      note: "味方のULTや確定キルを引っ張らないよう、危険時だけ使う。",
    },
  ],
  lucio: [
    {
      title: "スピード → ブープ → ウォールライド離脱",
      steps: ["味方が詰める瞬間だけスピードに切り替える。", "相手をブープで角や落下方向へ押し、壁走りで戻る。"],
      note: "常にスピードではなく、当たる瞬間と下がる瞬間を作る。",
    },
  ],
  mauga: [
    {
      title: "オーバーラン → 炎上 → オーバードライブ",
      steps: ["オーバーランで位置を取り、片方の銃で燃やす。", "味方が撃てるタイミングでオーバードライブを使い、回復しながら押す。"],
      note: "阻害を受けると崩れやすいので、相手Anaの瓶を見てから使う。",
    },
  ],
  mei: [
    {
      title: "壁で分断 → スプレー → つらら",
      steps: ["前に出た敵と後ろの回復線を壁で切る。", "スプレーで足を止め、つららと味方フォーカスで倒す。"],
      note: "味方の射線を壁で切らないよう、置く向きを確認する。",
    },
  ],
  mercy: [
    {
      title: "ダメージブースト → ガーディアン・エンジェル → 蘇生",
      steps: ["高火力DPSの撃つ瞬間にダメージブーストを付ける。", "倒れた味方は射線が切れた時だけ飛んで蘇生する。"],
      note: "蘇生を急ぐより、まず自分が落ちない角を取る。",
    },
  ],
  moira: [
    {
      title: "回復玉 → フェード温存 → コアレッセンス",
      steps: ["当たり合い前に回復玉を壁へ流す。", "フェードを残して味方の後ろに立ち、コアレッセンスで味方回復と敵削りを重ねる。"],
      note: "フェードを攻めに使い切ると、返しのフォーカスで落ちやすい。",
    },
  ],
  orisa: [
    {
      title: "槍投げ → スピンで押す → フォーティファイ",
      steps: ["壁際や逃げ道に向けて槍を当てる。", "スピンで距離を詰め、返しのCCや火力にフォーティファイを合わせる。"],
      note: "防御スキルを全部重ねると次の当たり合いで硬さがなくなる。",
    },
  ],
  pharah: [
    {
      title: "コンカッシブ → ロケット直撃 → 高度変更",
      steps: ["コンカッシブで敵を壁や味方射線にずらす。", "ロケットを置き撃ちし、高度を変えて反撃の照準を外す。"],
      note: "同じ高度に浮き続けるとヒットスキャンに落とされる。",
    },
  ],
  ramattra: [
    {
      title: "スロー場 → ネメシス → ブロック押し",
      steps: ["逃げ道にヴォイド・アクセラレーターのスローを置く。", "ネメシスでパンメルを通し、火力を受ける瞬間だけブロックする。"],
      note: "ネメシスが切れた後は前に残りすぎない。",
    },
  ],
  reaper: [
    {
      title: "シャドウステップ → 近距離2発 → レイス離脱",
      steps: ["見られにくい角や高台へ移動する。", "近距離で撃って倒し切り、返しのCC前にレイスで戻る。"],
      note: "テレポート音を聞かれるので、正面裏取りだけに頼らない。",
    },
  ],
  reinhardt: [
    {
      title: "ファイア・ストライク → チャージ圧 → 近距離スイング",
      steps: ["ファイア・ストライクで先にHPを削る。", "短いチャージや盾歩きで角を取り、ハンマー範囲で味方と殴る。"],
      note: "長距離チャージは孤立しやすいので、短く壁へ当てる。",
    },
  ],
  roadhog: [
    {
      title: "フック → 近距離射撃 → ピッグペン",
      steps: ["遮蔽物の角からフックを当てる。", "引いた敵に近距離射撃とピッグペンを重ね、倒せない時は回復で下がる。"],
      note: "フックを外したら大きな隙になるので、角に戻る。",
    },
  ],
  sigma: [
    {
      title: "岩 → ハイパースフィア → シールド再配置",
      steps: ["アクリーションで動きを止める。", "球を重ねて削り、相手の返し射線にシールドを置く。"],
      note: "吸収中に撃たせてから、相手のリロードやスキル切れで押す。",
    },
  ],
  shion: [
    {
      title: "Joyride → Execution → Evade離脱",
      steps: ["Joyrideで横や高台から孤立した敵へ入る。", "Executionで瞬間火力を出し、倒し切れない時はEvadeで戻る。"],
      note: "帰り道を決めずに入ると、CCやハックで止まりやすい。",
    },
  ],
  sojourn: [
    {
      title: "ディスラプター → 通常射撃チャージ → レールガン",
      steps: ["逃げ道や盾裏にディスラプターを置く。", "通常射撃でチャージし、HPが減った敵へレールガンを合わせる。"],
      note: "レールガンだけ狙い続けず、先に削る場所を作る。",
    },
  ],
  "soldier-76": [
    {
      title: "ヘリックス → 追い撃ち → バイオティック・フィールド",
      steps: ["ヘリックスで先に大きく削る。", "通常射撃で追い、撃ち合いが長引く時はフィールドを角に置く。"],
      note: "フィールド上で棒立ちせず、角を使って撃ち合う。",
    },
  ],
  sombra: [
    {
      title: "ハック → ウイルス → 近距離射撃",
      steps: ["孤立した敵をハックして逃げスキルを止める。", "ウイルスと近距離射撃で削り、倒せない時はトランスロケーターで戻る。"],
      note: "ハック前に撃つと逃げられやすい。味方が見ている敵を選ぶ。",
    },
  ],
  symmetra: [
    {
      title: "タレット設置 → テレポーター展開 → ビーム育成",
      steps: ["通路や曲がり角にタレットを置く。", "テレポーターで味方と距離を詰め、盾やタンクでビームを育てる。"],
      note: "テレポーターの出口が見られている時は、無理に全員で入らない。",
    },
  ],
  torbjorn: [
    {
      title: "タレット射線 → オーバーロード → 近距離連射",
      steps: ["タレットで横や裏取りを見せる。", "詰められたらオーバーロードで耐久と連射を上げて返す。"],
      note: "タレットを正面に置くより、壊しにくい横に置く。",
    },
  ],
  tracer: [
    {
      title: "ブリンク接近 → 1マガジン → リコール",
      steps: ["横や後ろから入り、1マガジンだけ撃つ。", "倒し切れない時はリコールで戻り、次のブリンクで再接触する。"],
      note: "リコールなしで深追いしない。HPと弾数を見て短く触る。",
    },
  ],
  venture: [
    {
      title: "ドリル・ダッシュ → バロー → 近距離追撃",
      steps: ["ドリル・ダッシュで孤立した敵に入る。", "危険になったらバローで回避し、出る位置で近距離火力を重ねる。"],
      note: "出る場所を読まれると倒されるので、味方射線へ戻る。",
    },
  ],
  widowmaker: [
    {
      title: "ヴェノム・マイン → グラップル射線 → チャージショット",
      steps: ["裏取りルートにヴェノム・マインを置く。", "グラップルで一瞬だけ射線を変え、チャージショットを撃ってすぐ隠れる。"],
      note: "同じ射線に居続けるとダイブされる。撃ったら位置を変える。",
    },
  ],
  winston: [
    {
      title: "ジャンプ → バリア → テスラ追撃",
      steps: ["孤立した後衛や高台へジャンプする。", "着地後にバリアで回復線を切り、テスラで複数を削ってジャンプで戻る。"],
      note: "バリア外の味方が撃てる敵へ入ると倒しやすい。",
    },
  ],
  "wrecking-ball": [
    {
      title: "グラップル加速 → パイルドライバー → シールド離脱",
      steps: ["横から加速して敵集団を崩す。", "パイルドライバーで浮かせ、アダプティブ・シールドを使って戻る。"],
      note: "着地後に止まる時間を短くし、ヘルスパック導線へ抜ける。",
    },
  ],
  zarya: [
    {
      title: "味方バリア → 高エネルギー → 自分バリアで押す",
      steps: ["前に出る味方へバリアを付けてエネルギーを得る。", "高エネルギーになったら自分バリアで角を取り、ビームで短く押す。"],
      note: "バリア2枚を同時に使い切ると次の返しに弱い。",
    },
  ],
  zenyatta: [
    {
      title: "不和 → チャージショット → 角から一瞬出る",
      steps: ["フォーカスしたい敵に不和を付ける。", "遮蔽物裏でチャージし、角から一瞬だけ出て撃つ。"],
      note: "逃げスキルがないので、撃つ位置は味方の近くにする。",
    },
  ],
};
const HERO_COUNTERS = {
  dva: [
    ["zarya", "ビームでディフェンス・マトリックスを無視されやすい。"],
    ["symmetra", "ビームとタレットで近距離の自由を奪われる。"],
    ["mei", "ブースター後の逃げ道を壁とスローで止められる。"],
  ],
  doomfist: [
    ["sombra", "ハックで機動力と防御のタイミングを崩される。"],
    ["cassidy", "機動力を止められると一気に落とされやすい。"],
    ["ana", "スリープと阻害で仕掛けのリスクが大きい。"],
  ],
  hazard: [
    ["sombra", "飛び込みや壁展開の流れをハックで止められる。"],
    ["ana", "自己耐久を阻害で崩されると前に残りにくい。"],
    ["zarya", "近距離でビームを当て続けられると逃げにくい。"],
  ],
  "junker-queen": [
    ["ana", "阻害で自己回復とランペイジ後の押し込みを止められる。"],
    ["kiriko", "鈴でランペイジの価値を消されやすい。"],
    ["pharah", "高所や空中から圧をかけられると届きにくい。"],
  ],
  mauga: [
    ["ana", "阻害で回復と自己維持を止められる。"],
    ["zenyatta", "不和で大きい体を削られやすい。"],
    ["sigma", "射線管理と吸収で撃ち合いのテンポをずらされる。"],
  ],
  orisa: [
    ["zarya", "ビームで防御を貫通され、近距離の圧を受けやすい。"],
    ["zenyatta", "不和で硬さを崩される。"],
    ["sojourn", "中距離から継続的に削られ、槍の届かない距離で戦われる。"],
  ],
  ramattra: [
    ["ana", "ネメシス中の押し込みを阻害とスリープで止められる。"],
    ["zenyatta", "不和で前に出る時間を短くされる。"],
    ["bastion", "変形火力でブロック中も削られやすい。"],
  ],
  reinhardt: [
    ["bastion", "盾と本体を高火力で削られる。"],
    ["pharah", "空中から盾裏や後衛を狙われると触りにくい。"],
    ["ramattra", "パンメルで盾越しに圧をかけられる。"],
  ],
  roadhog: [
    ["ana", "阻害で自己回復を止められる。"],
    ["zenyatta", "不和で大きい体を削られやすい。"],
    ["reaper", "近距離で撃ち合われると体力差を活かしにくい。"],
  ],
  sigma: [
    ["ramattra", "ネメシスで盾越しに圧をかけられる。"],
    ["sombra", "ハックで吸収や岩のタイミングを崩される。"],
    ["tracer", "裏から触られると正面の射線維持が難しい。"],
  ],
  winston: [
    ["reaper", "近距離火力で飛び込みを咎められる。"],
    ["bastion", "バリアを割られ、着地後に溶かされやすい。"],
    ["dva", "飛び先を追われ、味方への圧を消されやすい。"],
  ],
  "wrecking-ball": [
    ["sombra", "ハックで移動を止められると逃げにくい。"],
    ["cassidy", "機動力を止められ、フォーカスを受けやすい。"],
    ["ana", "スリープと阻害で戻りのテンポを崩される。"],
  ],
  zarya: [
    ["reinhardt", "盾と近距離圧でエネルギー管理を難しくされる。"],
    ["pharah", "高所や空中から射程外で削られる。"],
    ["hanzo", "中距離からバリア後の本体を削られやすい。"],
  ],
  shion: [
    ["cassidy", "近距離の動きを止められると離脱しづらい。"],
    ["sombra", "ハックでEvadeやJoyrideのテンポを崩される。"],
    ["winston", "奇襲先をバリアとジャンプで潰されやすい。"],
  ],
};
const HERO_COUNTERPLAY_OVERRIDES = {
  dva: {
    focus: "マトリックスで消せないビームや近距離継続火力で、ブースター後の着地を狙う。",
    position: "高台を取り返される前提で、飛んだ先を味方と囲む。正面だけで撃たず、戻り道も見る。",
    cooldown: "ブースターとディフェンス・マトリックスを使った直後は逃げにくい。ミサイル後も本体を削る。",
    warning: "自爆前は遮蔽物を確認する。メックを割った後のベビーD.Vaを逃がすと立て直される。",
  },
  doomfist: {
    focus: "ロケット・パンチ後、スラム着地後、ブロック終了後を狙う。チャージ中は正面から撃ちすぎない。",
    position: "壁際に立つとパンチで倒されやすい。味方と近く、横からの入り口を見える位置で受ける。",
    cooldown: "パンチ、スラム、ブロックのどれかを使った直後にスタン、ハック、スリープを合わせる。",
    warning: "1人で追うと逃げられて返される。帰り道をふさぐ味方と同時にフォーカスする。",
  },
  hazard: {
    focus: "飛び込み後と壁展開後を狙う。深く入ったHazardを孤立させ、戻る前に集中して削る。",
    position: "壁で分断される狭い入口を避ける。横に広がり、壁を置かれても回復線が切れない位置を取る。",
    cooldown: "移動スキルと壁を使った直後は次の圧が弱い。ハック、阻害、不和で戻りを咎める。",
    warning: "近距離で固まるとまとめて崩される。壁の内側に取り残された味方を無理に追いすぎない。",
  },
  "junker-queen": {
    focus: "ナイフが外れた後、斧を振った後、シャウトを使った後を狙う。阻害で自己回復を止める。",
    position: "近距離の直線通路で受けない。高台や空中、長めの射線から削って近づく前に体力を減らす。",
    cooldown: "コマンディング・シャウト後は耐久が落ちる。ランペイジは鈴、阻害解除、サウンドバリアで受ける。",
    warning: "ナイフで引かれる位置に立たない。出血中に前へ残ると回復されながら押し切られる。",
  },
  mauga: {
    focus: "カーディアック・オーバードライブが切れた後を狙う。阻害、不和、シールドで回復量を落とす。",
    position: "正面で撃ち合い続けない。角を使って銃を空撃ちさせ、横からサポートに圧をかける。",
    cooldown: "オーバーラン後は位置を戻しにくい。ケージ・ファイト中は中の味方を守るか、外から回復役を狙う。",
    warning: "大きい体だからと撃ち続けるだけだと回復される。先に回復線と自己回復スキルを切る。",
  },
  orisa: {
    focus: "フォーティファイ、ジャベリン・スピン、槍を使った後を狙う。ビームや不和で硬さを崩す。",
    position: "正面の押し合いに付き合わず、横から後衛へ圧を出す。槍で壁に当たる位置を避ける。",
    cooldown: "スピン中は弾を消されるので撃ちすぎない。フォーティファイ後は一気に体力を削る。",
    warning: "槍投げとテラ・サージの範囲に固まらない。オリーサだけ見すぎると後ろが自由になる。",
  },
  ramattra: {
    focus: "ネメシス・フォーム終了後、ブロック中の背後や横、ヴォイド・バリアの切れ目を狙う。",
    position: "パンメルが届く距離で受けない。角を下がりながら削り、ネメシス中は時間を使わせる。",
    cooldown: "ネメシスとバリアの両方を使った後は前に残りにくい。阻害、不和、スリープを合わせる。",
    warning: "アナイアレーション中に近くで固まると延長される。引く方向を決めて範囲外へ出る。",
  },
  reinhardt: {
    focus: "盾を正面から割るだけでなく、横、空中、高台から本体と後衛を狙う。チャージ後は大きな隙。",
    position: "ハンマー範囲に入り続けない。狭い角では盾裏に押し込まれる前に広い場所へ下がる。",
    cooldown: "ファイア・ストライク後とチャージ後は盾を出せない時間がある。シャター前は盾持ちやスタンを温存する。",
    warning: "固まって前に立つとシャターで全員倒される。盾裏のサポートを下げさせる動きが重要。",
  },
  roadhog: {
    focus: "フックを外した直後とテイク・ア・ブリーザー後を狙う。阻害で自己回復を止める。",
    position: "フック角に立たない。遮蔽物を挟み、引っ張られても味方がカバーできる距離で戦う。",
    cooldown: "フックの音とモーションを見たら攻め時。ピッグペン周辺で無理に踏み込まない。",
    warning: "大きい体を撃つだけだと回復される。フックを使わせてから全員で短く倒す。",
  },
  sigma: {
    focus: "キネティック・グラスプと岩を使った後、近距離や裏から狙う。シールド移動後も隙になる。",
    position: "長射線の正面で撃ち合わない。近づける角を使い、盾の外からサポートへ圧を出す。",
    cooldown: "吸収中に弾を撃ちすぎない。アクリーションを避けたら、次の防御が戻る前に詰める。",
    warning: "グラビティ・フラックス前は固まりすぎない。高台で浮かされた時の遮蔽物を先に見る。",
  },
  winston: {
    focus: "ジャンプ着地後とバリア外を狙う。近距離火力、ハック、不和で帰る前に削り切る。",
    position: "孤立した高台や後衛位置に1人で立たない。バリアの内外を移動して回復線を切らせない。",
    cooldown: "ジャンプ・パック後は逃げがない。バリアを割るか中に入って、回復を受けられない状態を作る。",
    warning: "バリアの中のWinstonだけ撃つと時間を稼がれる。飛び先の味方を全員で守る。",
  },
  "wrecking-ball": {
    focus: "パイルドライバー後、グラップリングで戻る前、アダプティブ・シールド後を狙う。",
    position: "孤立して背中を見せない。通路入口や回復パック周辺を見て、戻り道を止める。",
    cooldown: "ハック、スリープ、スタンを着地や変形直後に合わせる。シールド使用後は本体が落ちやすい。",
    warning: "追いかけすぎると時間を使われる。後衛を守り、戻ってきた瞬間だけ全員で撃つ。",
  },
  zarya: {
    focus: "バリア2枚を使った後を狙う。高エネルギー時は正面で受けず、射程外や高台から時間を使わせる。",
    position: "バリア中の味方を撃ち続けない。横に広がり、Zaryaが届かない相手から削る。",
    cooldown: "パーティクル・バリアとバリア・ショットの枚数を見る。2枚目の後は一気に本体へ圧をかける。",
    warning: "グラビトン前は固まらない。エネルギーを上げすぎると低ランク帯でも押し切られやすい。",
  },
  ashe: {
    focus: "スコープ射線、ダイナマイト後、コーチガン後を狙う。燃焼は早めに回復や解除で受ける。",
    position: "長い直線に立ち続けない。高台のAsheへは角をつなぎ、別方向から圧をかける。",
    cooldown: "コーチガンを使った後は自衛が弱い。B.O.B.は遮蔽物、スリープ、ハックで価値を下げる。",
    warning: "ダイナマイトで複数人が燃えると一気に不利。固まりすぎず、投げ物を見たら下がる。",
  },
  bastion: {
    focus: "強襲モードが終わった直後を狙う。変形中は遮蔽物に隠れ、無理に正面で撃ち合わない。",
    position: "角を使って砲台形態の時間を空振りさせる。横や高台から本体を撃てる位置を取る。",
    cooldown: "強襲モード、グレネード、自己修復の流れが切れた時に詰める。防御スキルを先に吐かせる。",
    warning: "タンクが正面で溶けると試合が崩れる。Bastionの音が聞こえたら全員で一度隠れる。",
  },
  cassidy: {
    focus: "マグネティック・グレネード後、コンバット・ロール後を狙う。中距離の頭出し撃ち合いを避ける。",
    position: "近距離で逃げ道なく立たない。角を使い、グレネードが届かない距離から削る。",
    cooldown: "グレネードを見たら機動キャラは攻め時。デッドアイ中は射線を切るかスタンで止める。",
    warning: "焦って1人で詰めるとロールと高火力で返される。味方と同時に角から出る。",
  },
  echo: {
    focus: "フォーカス・ビーム圏外で受け、飛行終了後やグライド中を撃つ。半分以下の味方を守る。",
    position: "真上を取られないよう屋根や高台を使う。ヒットスキャンはEchoの飛行ルートを先に見る。",
    cooldown: "フライトとスティッキー・ボム後は逃げが弱い。コピー中は変身先のULT価値を出させない。",
    warning: "低HPで残るとビームで即落ちする。回復を待つか遮蔽物へ入る判断を早くする。",
  },
  anran: {
    focus: "炎上ダメージが重なる前に射線を切り、突進後や炎の連撃後の戻り際を狙う。",
    position: "横や背後から入られやすい位置に1人で立たない。遮蔽物をつなぎ、燃焼中は無理に撃ち合わない。",
    cooldown: "Inferno RushやDancing Blazeの後は次の入り直しが遅い。移動後にスタンや集中射撃を合わせる。",
    warning: "倒した後もULTが残っている時は復活爆発に注意する。低HPで近くに残らない。",
  },
  emre: {
    focus: "3点バーストの射線とグレネード後を避け、Take Aim後の撃ち切りや移動後を狙う。",
    position: "中距離の正面に長く立たない。角を使ってバーストを外させ、横から本体へ圧をかける。",
    cooldown: "Cyber FragとSiphon Blasterを使った後は自衛と押し返しが弱い。Override中は射線を切って時間を使わせる。",
    warning: "シンプルな射撃キャラほど放置すると削り負ける。高台や長射線を早めに奪う。",
  },
  freja: {
    focus: "機動スキル後とチャージ射撃後を狙う。高台や横からの射線を切って近づく。",
    position: "長い射線に体を出し続けない。角をつなぎ、Frejaが撃ち直すタイミングで位置を変える。",
    cooldown: "移動後は逃げ道が限られる。バースト火力を使った直後にダイブやスタンを合わせる。",
    warning: "単独で追うと逆に削られる。射線を消しながら複数人で場所を奪う。",
  },
  genji: {
    focus: "木の葉返し後、風斬り後、二段ジャンプの着地を狙う。ビームや範囲攻撃が有効。",
    position: "孤立した後衛位置に立たない。味方サポート同士が助け合える距離で受ける。",
    cooldown: "木の葉返し中に弾を撃ちすぎない。風斬りを使った後は帰り道を止める。",
    warning: "龍撃剣前は散らばりすぎず、スリープ、鈴、ブープ、移動ULTを温存する。",
  },
  hanzo: {
    focus: "ソニック・アロー後、ストーム・アロー後、壁登り後を狙う。近距離で横に揺さぶる。",
    position: "頭一つ出しの長射線に立たない。ソニックで見られた位置からはすぐ移動する。",
    cooldown: "ストーム・アロー中は正面勝負を避け、撃ち切った後に詰める。ドラゴンは音で早めに避ける。",
    warning: "同じ角から何度も顔を出すとワンショットされる。ピーク位置を毎回変える。",
  },
  junkrat: {
    focus: "罠とコンカッション・マインを使った後を狙う。長射線や空中から削ると触りにくい。",
    position: "狭い入口、坂、室内で受けない。床のトラップを確認し、上から射線を作る。",
    cooldown: "マイン2枚を使った後は移動と瞬間火力が落ちる。タイヤは音を聞いて全員で撃つ。",
    warning: "狭所に固まると適当に撃たれても負ける。通る場所を変え、罠を壊してから入る。",
  },
  mei: {
    focus: "アイス・ブロック後と壁を使った後を狙う。壁で孤立した味方をすぐ壊して助ける。",
    position: "狭い通路で固まらない。凍結ビームが届く距離を避け、横や高台から削る。",
    cooldown: "クリオフリーズを使わせた後が本番。ブリザード前は鈴、移動スキル、盾を残す。",
    warning: "1人だけ前に出ると壁で切られる。味方の位置と退路を見てから角を曲がる。",
  },
  pharah: {
    focus: "ジャンプ・ジェット後、コンカッシブ後、マーシーと離れた瞬間を狙う。ヒットスキャンで空を見る。",
    position: "屋根や壁で爆風を減らす。開けた場所で上だけ見続けず、地上の味方もカバーする。",
    cooldown: "ブースト後は高度調整が読みやすい。バレッジはスタン、ハック、射線切りで止める。",
    warning: "無視すると後衛が崩れる。誰が空を見るかを決め、全員でバラバラに撃たない。",
  },
  reaper: {
    focus: "レイス・フォーム後、テレポート後、近距離に入る前を狙う。遠距離から削って寄せない。",
    position: "角待ちや裏取りルートを警戒する。タンクの背中側に立ちすぎない。",
    cooldown: "レイスを使わせたら逃げがない。デス・ブロッサム前はスタン、ブープ、無敵を温存する。",
    warning: "近距離で順番に戦うと回復される。距離を取り、全員で同時に撃つ。",
  },
  sojourn: {
    focus: "パワー・スライド後とレールガンを撃った直後を狙う。チャージを持つ時は顔を出さない。",
    position: "中距離の直線で撃ち合わない。高台を取られたら射線を切り、別角度から詰める。",
    cooldown: "スライド後は逃げにくい。ディスラプター・ショットの中で無理に戦わない。",
    warning: "レールが溜まったSojournに低HPで顔を出すと即落ちする。回復してから動く。",
  },
  "soldier-76": {
    focus: "バイオティック・フィールドを使わせてから場所を動かす。高台から降ろすと圧が落ちる。",
    position: "長い直線で撃たれ続けない。角を使い、Sprintで逃げた先を味方と追う。",
    cooldown: "ヒール床後は耐久が下がる。タクティカル・バイザーは盾、遮蔽物、ハックで時間を使わせる。",
    warning: "放置すると安定して削られる。高台Soldierを誰が触るか早めに決める。",
  },
  sombra: {
    focus: "ハック後に見えた位置を共有し、トランスロケーター後の着地を狙う。近距離で逃がさない。",
    position: "孤立しない。サポート同士で近くに立ち、背中や回復パック周辺を警戒する。",
    cooldown: "トランスロケーターを使った後は再突入まで時間がある。EMP前は固まりすぎず重要スキルを残す。",
    warning: "見失ったまま放置すると後衛が崩れる。攻撃された人へすぐ振り向く習慣を作る。",
  },
  symmetra: {
    focus: "タレットとテレポーターを先に壊す。ビームが育つ前に距離を取り、短時間で倒す。",
    position: "狭い室内で長く戦わない。タレットが置かれやすい入口は壊してから入る。",
    cooldown: "テレポーターを見つけたらすぐ破壊する。フォトン・バリア中は壁の向こう側へ移動して射線を変える。",
    warning: "タンクの盾やバリアを撃たせ続けるとビームが危険になる。育つ前に下がる。",
  },
  torbjorn: {
    focus: "タレットを最優先で壊し、オーバーロード後を狙う。タレット視界外から本体へ圧をかける。",
    position: "タレットと本体の両方に撃たれる角度を避ける。高台や長射線で設置物を先に処理する。",
    cooldown: "オーバーロード中は無理に近距離で勝負しない。モルテン・コアは床を見て退路を確保する。",
    warning: "タレットを放置すると初心者帯ほど回復が追いつかない。戦う前に壊す。",
  },
  tracer: {
    focus: "リコール後、ブリンクを使い切った後、近距離で撃ち終わった瞬間を狙う。",
    position: "孤立した後衛にならない。角を背負いすぎず、味方がすぐ振り向ける位置で受ける。",
    cooldown: "ブリンク回数とリコールを数える。リコール後はスタン、爆発、範囲攻撃で逃げ道を狭める。",
    warning: "1人で追うと時間を使われる。パルス・ボム前は固まりすぎず、無敵や鈴を残す。",
  },
  venture: {
    focus: "潜行から出た直後、ドリル・ダッシュ後、バーストを使った後を狙う。",
    position: "近距離の角待ちに注意する。出入口や高台下を見て、出てくる場所を味方と共有する。",
    cooldown: "バロウとドリルがない時は逃げが弱い。スタンや阻害を出口に合わせる。",
    warning: "狭い場所で固まると一気に削られる。潜られたら広がり、着地点を全員で見る。",
  },
  widowmaker: {
    focus: "フック使用後、スコープを覗いている時、孤立した高台を狙う。ダイブやスモーク系で射線を消す。",
    position: "長射線を横切らない。見られている場所ではジャンプせず、遮蔽物から遮蔽物へ移動する。",
    cooldown: "グラップリング・フック後は逃げにくい。インフラサイト中は無理に顔を出さない。",
    warning: "一度抜かれた射線に戻るとまた倒される。ルートを変えて場所を奪う。",
  },
  shion: {
    focus: "Evade後、Joyride後、近距離バーストを使った後を狙う。移動先を予測して囲む。",
    position: "奇襲ルートに1人で立たない。高台や横道を見張り、味方のカバー圏内で受ける。",
    cooldown: "移動スキルを使わせた後は逃げ道が少ない。ハック、スタン、バリアでテンポを止める。",
    warning: "新キャラ相手はスキル名よりタイミングを見る。入ってきた直後ではなく、帰り際を狙う。",
  },
  ana: {
    focus: "スリープ・ダーツ後、バイオティック・グレネード後を狙う。射線を切るだけでも回復量が落ちる。",
    position: "長い後方射線を自由にさせない。横から圧をかけ、Anaが味方を見られない角へ動かす。",
    cooldown: "スリープと瓶がない時は自衛が弱い。ナノ前後は対象を下げさせるか、無敵で受ける。",
    warning: "眠らされた味方を放置しない。阻害を受けたら無理に前へ出ず、解除か時間を待つ。",
  },
  baptiste: {
    focus: "イモータリティ・フィールドを壊してから本体を狙う。リジェネ・バースト後は耐久が落ちる。",
    position: "高台Baptisteを放置しない。ランプの射線を切り、斜めから圧をかける。",
    cooldown: "ランプ、リジェネ、ジャンプ後は詰め時。アンプリフィケーション・マトリックスは正面を避ける。",
    warning: "ランプ内の敵を撃ち続けても倒しにくい。先に装置を壊す判断を徹底する。",
  },
  brigitte: {
    focus: "シールド・バッシュ後、ウィップ・ショット後、盾が割れた後を狙う。距離を取って削る。",
    position: "近距離で順番に殴られない。開けた場所から盾を削り、サポートの近くに入らせない。",
    cooldown: "バッシュ後は逃げと止めが弱い。ラリー中は無理に倒し切らず、時間を使わせる。",
    warning: "ダイブを1人で入れると返される。ブリギッテの近くの相手を狙う時は人数を合わせる。",
  },
  illari: {
    focus: "ヒーリング・パイロンを最優先で壊す。チャージ射撃後やアウトバースト後を狙う。",
    position: "パイロンの回復範囲で戦わない。設置場所を探し、射線を切って別角度から入る。",
    cooldown: "アウトバースト後は距離を離しにくい。キャプティブ・サンは遮蔽物と解除で爆発を防ぐ。",
    warning: "パイロンを放置するとキルが取れない。敵を見る前に設置物を見る癖をつける。",
  },
  juno: {
    focus: "移動支援後、空中移動の着地、リングを使った直後を狙う。横移動を読んで撃つ。",
    position: "スピードで詰められる入口を広く見る。高台や空中のJunoを見失わない。",
    cooldown: "リングや機動スキル後は味方全体のテンポが落ちる。オービタル・レイ中は射線と位置を変える。",
    warning: "敵全体の移動速度が上がるタイミングで孤立しない。先に合流して受ける。",
  },
  kiriko: {
    focus: "鈴と瞬間移動後を狙う。壁登りで逃げる先を見て、味方と同時に詰める。",
    position: "Kirikoが味方を見られる射線を切る。高台や横道から圧をかけ、鈴を先に使わせる。",
    cooldown: "鈴がない時は阻害、スタン、ULTが通りやすい。狐走り中は正面で受けず、横へ逃げる。",
    warning: "鈴を使わせる前に大技を入れると無効化される。まず鈴、次に本命スキルの順で考える。",
  },
  lifeweaver: {
    focus: "ライフグリップ後、ペタル・プラットフォーム後、ダッシュ後を狙う。回復に忙しくさせる。",
    position: "高台や後方に逃げられる道を見ておく。グリップ先を攻め、救出後の味方を逃がさない。",
    cooldown: "グリップがない時は味方を助けにくい。生命の樹は遮蔽物にするか、回復範囲外へ動く。",
    warning: "本体を放置すると味方を救い続ける。倒し切れなくても視線を切らせる価値が高い。",
  },
  lucio: {
    focus: "アンプ・イット・アップ後、壁走りの着地、ブープ後を狙う。動きを止めるスキルが有効。",
    position: "落下ポイントや壁走りルートに近づきすぎない。スピードで詰められる角を早めに下がる。",
    cooldown: "アンプ後は回復と加速が落ちる。サウンドバリア前後は一度引いて効果時間を使わせる。",
    warning: "Lucioを追いすぎると本隊が崩れる。倒せない時は味方から離れさせるだけでよい。",
  },
  mercy: {
    focus: "蘇生中、ガーディアン・エンジェル後、ペアDPSから離れた瞬間を狙う。",
    position: "Mercy本体の飛び先を見て、味方と挟む。隠れて蘇生できる壁裏を先に警戒する。",
    cooldown: "蘇生を使った後は大きな価値が落ちる。ヴァルキリー中は無理に追わず、強化先を下げさせる。",
    warning: "倒した敵の上を見ないと蘇生される。キル後は数秒、Mercyの位置を確認する。",
  },
  moira: {
    focus: "フェード後を狙う。ダメージオーブを投げた後は回復量が落ちるので前線を押す。",
    position: "狭い部屋でオーブを何度も当てられないようにする。中距離以上から削る。",
    cooldown: "フェードがない時は逃げられない。コアレッセンス中は横へ避け、スタンや阻害を合わせる。",
    warning: "低HPで追うと吸われて返される。倒し切れない時は無理せず回復を待つ。",
  },
  zenyatta: {
    focus: "機動力がないので、遮蔽物をつないで一気に詰める。不和の射線を切ってから戦う。",
    position: "長射線で不和を付けられ続けない。横や高台から本体へ圧をかける。",
    cooldown: "不和を切った直後、スナップキックで距離を取られた後が攻め時。虹彩は先に使わせたい。",
    warning: "不和付きでタンクが前に残るとすぐ溶ける。付いたら一度角へ戻る。",
  },
  wuyang: {
    focus: "水弾の射線と回復線を切り、Guardian WaveやRushing Torrent後の位置を狙う。",
    position: "ノックバックで押し戻される入口に固まらない。横に広がって、Wuyangが味方全員を見られない角度を作る。",
    cooldown: "移動支援や波を使った後は守り直しが遅い。Tidal Blastは範囲外へ出るか、爆発前に射線を切る。",
    warning: "攻撃も回復もできるので放置すると前線が戻される。倒せなくても回復対象から視線を外させる。",
  },
};
const TANK_GUIDES = {
  dva: {
    allies: [
      ["tracer", "同じ高台や後衛に触れて、D.Vaの圧をキルにつなげやすい。"],
      ["genji", "ブースターで一緒に入ると、逃げる相手を追い切りやすい。"],
      ["ana", "遠距離から回復と阻害を入れられ、D.Vaが高台で長く動ける。"],
    ],
    styles: ["高台", "広い移動"],
    maps: ["Watchpoint: Gibraltar", "Dorado", "Numbani"],
    note: "高台を取り返す、射線を消す、味方DPSの仕掛けを守る動きが強い。",
  },
  doomfist: {
    allies: [
      ["tracer", "同じ孤立相手に圧を重ねやすく、ワンピックを作りやすい。"],
      ["sombra", "ハック後にドゥームフィストが入り、逃げスキルを使わせず倒しやすい。"],
      ["kiriko", "鈴と瞬間移動で深い仕掛けの事故を戻しやすい。"],
    ],
    styles: ["広い移動", "高台"],
    maps: ["New Junk City", "Suravasa", "Numbani"],
    note: "遮蔽物を使って短く出入りできる広いマップで強い。",
  },
  hazard: {
    allies: [
      ["mei", "壁や足止めと合わせると、近距離で相手を逃がしにくい。"],
      ["reaper", "狭い場所で一緒に前へ出ると、タンクへの圧が高い。"],
      ["lucio", "入る速度と引く速度を補い、近距離戦を作りやすい。"],
    ],
    styles: ["狭所乱戦", "広い移動"],
    maps: ["King's Row", "Lijiang Tower", "New Junk City"],
    note: "角や狭所で相手を閉じ込め、短い距離で勝負する形が扱いやすい。",
  },
  "junker-queen": {
    allies: [
      ["lucio", "スピードで距離を詰め、斧とナイフの射程に入りやすい。"],
      ["sojourn", "前線で削った相手を中距離から回収しやすい。"],
      ["kiriko", "ランペイジ後の事故や阻害返しを鈴で支えられる。"],
    ],
    styles: ["狭所乱戦", "広い移動"],
    maps: ["Colosseo", "Esperanca", "Lijiang Tower"],
    note: "当たり直しが多いPushや、短い距離で殴り合うControlでテンポを作りやすい。",
  },
  mauga: {
    allies: [
      ["baptiste", "イモータリティと範囲回復で、撃ち合い時間を伸ばせる。"],
      ["kiriko", "阻害を鈴で返せると、マウガの継戦力を活かしやすい。"],
      ["bastion", "正面火力を重ねて、相手タンクを早く下げられる。"],
    ],
    styles: ["狭所乱戦", "長射線"],
    maps: ["King's Row", "Midtown", "Rialto"],
    note: "正面の射線が通り、味方サポートが見やすい場所で強い。",
  },
  orisa: {
    allies: [
      ["baptiste", "正面維持と相性がよく、イモータリティで押し切りやすい。"],
      ["sojourn", "オリーサが前線を止めている間に中距離火力を出しやすい。"],
      ["kiriko", "鈴で阻害やCCを返し、硬さをさらに伸ばせる。"],
    ],
    styles: ["狭所乱戦", "長射線"],
    maps: ["King's Row", "Midtown", "Shambali Monastery"],
    note: "正面を止める、角を守る、相手の突入を受けるマップで安定しやすい。",
  },
  ramattra: {
    allies: [
      ["lucio", "ネメシスフォーム中に距離を詰めやすく、押し引きが明確になる。"],
      ["mei", "壁で分断した相手をパンメルで落としやすい。"],
      ["baptiste", "固まった構成での範囲回復と火力補助が噛み合う。"],
    ],
    styles: ["狭所乱戦", "長射線"],
    maps: ["King's Row", "Eichenwalde", "Shambali Monastery"],
    note: "盾で射線を切り、ネメシスで角を押す展開が作れるマップ向き。",
  },
  reinhardt: {
    allies: [
      ["lucio", "必須級。スピードで接近し、盾を割られる前に近距離戦を作る。"],
      ["mei", "壁で分断して、ラインハルトのハンマー範囲に閉じ込めやすい。"],
      ["baptiste", "固まった味方を範囲回復し、イモータリティで押し込みを支える。"],
    ],
    styles: ["狭所乱戦"],
    maps: ["King's Row", "Lijiang Tower", "Eichenwalde"],
    note: "短い角、狭い門、曲がり角が多いマップで距離を詰めやすい。",
  },
  roadhog: {
    allies: [
      ["kiriko", "阻害を鈴で返せると、自己回復を通しやすい。"],
      ["mei", "フック後に壁で逃げ道を塞ぎ、確定キルを作りやすい。"],
      ["hanzo", "フックや壁裏への圧に合わせて、単発キルを狙いやすい。"],
    ],
    styles: ["狭所乱戦", "長射線"],
    maps: ["Ilios", "Junkertown", "Rialto"],
    note: "落下や角待ち、フック後に逃げられにくい通路があるマップで価値が上がる。",
  },
  sigma: {
    allies: [
      ["ashe", "長い射線で一緒に削り、相手が入る前にリソースを使わせる。"],
      ["baptiste", "高台と射線維持を支えながら、火力も重ねやすい。"],
      ["zenyatta", "不和とシグマの中距離圧で、相手タンクを下げやすい。"],
    ],
    styles: ["長射線", "高台"],
    maps: ["Circuit Royal", "Havana", "Shambali Monastery"],
    note: "長い射線、角、少しずつ下がれるルートがあるマップで強い。",
  },
  winston: {
    allies: [
      ["tracer", "飛び先に一緒に圧をかけ、後衛を倒し切りやすい。"],
      ["genji", "高台やバックラインへ同時に入り、フォーカスを合わせやすい。"],
      ["ana", "遠距離回復とナノで、深いジャンプの価値を上げられる。"],
    ],
    styles: ["高台", "広い移動"],
    maps: ["Watchpoint: Gibraltar", "Numbani", "Dorado"],
    note: "高台にいる相手を下ろす、孤立した後衛へ触るマップで強い。",
  },
  "wrecking-ball": {
    allies: [
      ["sombra", "ハックした相手にボールが触ると、逃げスキルを使わせず倒しやすい。"],
      ["tracer", "ボールが荒らした相手を追い切りやすい。"],
      ["zenyatta", "不和でボールの短い接触をキル圧に変えやすい。"],
    ],
    styles: ["広い移動", "高台"],
    maps: ["New Junk City", "Suravasa", "Watchpoint: Gibraltar"],
    note: "広く回れるルート、ヘルスパック、裏取り導線が多いマップで動きやすい。",
  },
  zarya: {
    allies: [
      ["reaper", "バリアを付けて近距離で強引に前へ出しやすい。"],
      ["genji", "ブレードや深い仕掛けにバリアを合わせると事故を減らせる。"],
      ["baptiste", "正面の撃ち合いを支え、ザリアが高エネルギーを維持しやすい。"],
    ],
    styles: ["狭所乱戦"],
    maps: ["King's Row", "Lijiang Tower", "Nepal"],
    note: "味方にバリアを合わせやすく、短い距離で高エネルギーを活かせる場所向き。",
  },
};
const ROLE_PLAYSTYLE_GUIDES = {
  tank: {
    title: "前線を作る",
    tips: [
      "味方が撃てる角や高台まで前線を上げる。",
      "防御/移動スキルを使い切ったら、遮蔽物まで戻って回復を待つ。",
      "相手タンクだけを殴り続けず、孤立したDPS/サポートへ圧をかける。",
    ],
    avoid: "1人で深く入りすぎると味方の射線と回復が切れる。",
  },
  damage: {
    title: "人数差を作る",
    tips: [
      "撃つ前に逃げ道と回復をもらえる位置を決める。",
      "正面で撃ち負ける時は、横から味方と同じ敵を見る。",
      "キルできなくても、相手サポートを下がらせれば当たり合いが楽になる。",
    ],
    avoid: "単独の裏取りを続けるより、味方の当たり合いに合わせる。",
  },
  support: {
    title: "生きて人数差を戻す",
    tips: [
      "回復量より先に、自分が死なない遮蔽物を取る。",
      "味方タンクの真後ろではなく、横の角や高台から支える。",
      "余裕がある時だけ、HPが減った敵や相手サポートを撃つ。",
    ],
    avoid: "味方を助けに行って自分も倒れる連鎖を避ける。",
  },
};
const ARCHETYPE_PLAYSTYLE_GUIDES = {
  brawl: {
    label: "近距離",
    tips: ["角を使って短い距離で戦う。", "味方と固まり、スピードや壁で一気に距離を詰める。"],
  },
  dive: {
    label: "ダイブ",
    tips: ["孤立した敵や高台の敵に短く入る。", "入る前に帰り道と味方の位置を確認する。"],
  },
  poke: {
    label: "ポーク",
    tips: ["長い射線と高台から先に削る。", "詰められたら下がれる角を残して戦う。"],
  },
  pick: {
    label: "ワンピック",
    tips: ["最初の1人を落とすために射線をずらす。", "倒し切れない時は無理に追わず、次の射線へ移る。"],
  },
};
const ROLE_SYNERGY_GUIDES = {
  tank: [
    ["lucio", "前に出るタイミングと下がるタイミングを作りやすい。"],
    ["baptiste", "範囲回復とイモータリティで前線維持を支えやすい。"],
    ["kiriko", "阻害やCCを鈴で返し、深めの位置から戻しやすい。"],
  ],
  damage: [
    ["winston", "高台や後衛への圧に合わせると、同じ敵を倒し切りやすい。"],
    ["mercy", "射線を広げるDPSの火力と生存を支えやすい。"],
    ["ana", "阻害や遠距離回復で、横展開したDPSを活かしやすい。"],
  ],
  support: [
    ["dva", "高台や裏から来る相手を剥がしやすい。"],
    ["sojourn", "回復の合間に削った敵を中距離から回収しやすい。"],
    ["reinhardt", "味方が固まりやすく、回復と補助を合わせやすい。"],
  ],
};
const COMP_METADATA = {
  迷ったらこれ: {
    category: "style",
    rules: COMP_RULE_OPTIONS,
    maps: ["長射線", "高台", "狭所乱戦"],
    reasons: ["オリーサで前線を安定させ、ソルジャー76/ソジョーンで中距離の火力を出しやすい。", "バティストとキリコで回復、無敵、鈴を持てるため、事故を戻しやすく初心者にも説明しやすい。"],
  },
  汎用ポーク寄り: {
    category: "style",
    rules: ["Escort", "Hybrid"],
    maps: ["長射線", "高台"],
    reasons: ["シグマとバティストで射線を維持し、アッシュ/ソジョーンが先に削る基本形。", "迷ったら高台と角を使い、倒し切れない時も相手のリソースを先に使わせやすい。"],
  },
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
const VIEW_IDS = ["mindset", "heroes", "guides", "comps", "sensitivity", "updates"];
const GUIDE_RULES = {
  Control: {
    win: "先に強い位置を取り、拠点に入りすぎず入口を押さえる。",
    position: "拠点内に全員で固まらず、角や高台から拠点へ撃てる位置を取る。",
    reset: "人数不利なら拠点で粘りすぎず、次の当たり合いで5人をそろえる。",
    mistake: "拠点を踏むことだけに集中して、周りの高台や横道を放置する。",
  },
  Escort: {
    win: "ペイロードを盾にしながら、次の角や高台を先に取る。",
    position: "攻撃は荷物より少し前、防衛は次の角と高台で待つ。",
    reset: "攻撃は荷物を押す人を1人決め、防衛は倒されたら次の曲がり角まで下がる。",
    mistake: "全員で荷物に乗り続けて、前の強い場所を相手に渡す。",
  },
  Hybrid: {
    win: "第1は入口突破、第2以降はEscort同様に次の角を取り続ける。",
    position: "攻撃は左右どちらから入るかを決め、防衛は最初に強い高台や角を守る。",
    reset: "第1で崩れたら即集合。荷物移行後は無理な延長戦を減らす。",
    mistake: "第1で同じ正面入口から入り続け、横や高台を使わない。",
  },
  Push: {
    win: "ロボットより先に中央の強い場所を取り、勝った後だけ押す。",
    position: "ロボット周辺に固まらず、次に戦う曲がり角や高台を先に見る。",
    reset: "負けたら単独で触らず、戻りながら次の集合地点を決める。",
    mistake: "ロボットを押すことだけを見て、次の当たり合いの位置取りが遅れる。",
  },
  Flashpoint: {
    win: "次の拠点へ早く移動し、入口を先に押さえる。",
    position: "広いので味方から離れすぎず、サポートが見える範囲で横を取る。",
    reset: "遠い拠点で人数不利なら早めに切り、次の拠点移動に備える。",
    mistake: "1人ずつ到着して戦い、毎回人数不利で当たる。",
  },
  Clash: {
    win: "連続拠点なので、勝ったら前を取り、負けたら次の入口で止める。",
    position: "狭い通路と角を使い、相手を一列にして撃てる場所を守る。",
    reset: "奥へ追いすぎず、倒し切れない時は次の拠点で待つ。",
    mistake: "勝った後に深追いしすぎて、次の拠点で人数不利になる。",
  },
};
const GUIDE_MAP_STYLES = {
  長射線: {
    attack: "遮蔽物をつなぎ、いきなり中央を歩かず横や高台から射線を増やす。",
    defense: "長い射線を先に置き、相手が角を曲がる前にリソースを使わせる。",
    role: ["Tank: 盾や体で射線を切り、味方が渡る時間を作る。", "Damage: 横の射線か高台から、相手サポートを下がらせる。", "Support: 長い射線に出っぱなしにせず、角から回復と火力を出す。"],
    mistake: "何も考えず正面の長い道を歩き、先に削られてスキルを吐く。",
  },
  高台: {
    attack: "まず高台の敵をどかす。無理に拠点へ直行しない。",
    defense: "高台を取られたら早めに下がり、取り返すタイミングを味方と合わせる。",
    role: ["Tank: 高台に触るか、相手の高台射線を切る。", "Damage: 高台を使って正面以外から撃つ。", "Support: 高台や角から、味方全体が見える位置を取る。"],
    mistake: "高台の敵を放置して、拠点内で上から撃たれ続ける。",
  },
  狭所乱戦: {
    attack: "角を使って短い距離で当たり、1人を集中して落とす。",
    defense: "入口や曲がり角で待ち、相手が狭い場所に入った瞬間にスキルを使う。",
    role: ["Tank: 角から短く出入りし、スキルなしで前に残らない。", "Damage: タンクが触った敵を一緒に撃つ。", "Support: 味方のすぐ後ろではなく、1つ後ろの角を使う。"],
    mistake: "狭い場所でバラバラに入り、回復もフォーカスも分かれる。",
  },
  広い移動: {
    attack: "移動ルートを決め、遅れた味方を待ってから当たる。",
    defense: "広がりすぎず、相手が孤立した瞬間に全員で見る。",
    role: ["Tank: 先に入りすぎず、味方が届く距離で前線を作る。", "Damage: 横を取っても戻り道を残す。", "Support: 移動中に孤立しないよう、味方が見える道を選ぶ。"],
    mistake: "広いマップで1人ずつ戦い、毎回フォーカスされる。",
  },
};
const ULT_COMBO_GUIDES = [
  {
    title: "ナノ + ブレード",
    heroes: "アナ + ゲンジ",
    timing: "ゲンジが風斬りで入れる位置にいて、相手のスタン/無敵を1つ使わせた後。",
    call: "アナはナノを先に言う。ゲンジはブレード後に孤立したサポートから狙う。",
    mistake: "相手が全員そろっていて、スリープや鈴が残っているのに正面から使う。",
  },
  {
    title: "狐走り + ラッシュ",
    heroes: "キリコ + ラインハルト/ラマットラ/ルシオ",
    timing: "角を曲がって一気に距離を詰める直前。味方が同じ方向へ進める時。",
    call: "狐の道を正面ではなく、次の角や拠点入口へ通す。タンクは止まらず前へ出る。",
    mistake: "味方が散っている時に使い、狐の道に誰も乗れない。",
  },
  {
    title: "グラビトン + 範囲火力",
    heroes: "ザリア + ハンゾー/ジャンクラット/ソジョーン",
    timing: "相手の防御ULTや鈴を使わせた後。2人以上を捕まえられる角や拠点で使う。",
    call: "ザリアが先に使う場所を言う。DPSは即合わせできる射線に移動しておく。",
    mistake: "ザリアだけが見えている場所に撃ち、味方の火力が届かない。",
  },
  {
    title: "EMP + フォーカス",
    heroes: "ソンブラ + 全員",
    timing: "味方が撃てる距離にいて、EMP後すぐ同じ敵を狙える時。",
    call: "EMP前にターゲットを1人決める。使った後はサポートか逃げスキルなしの敵を全員で見る。",
    mistake: "ソンブラが奥で1人だけ使い、味方が届かずキルにつながらない。",
  },
  {
    title: "サウンドバリア/虹彩で受ける",
    heroes: "ルシオ/ゼニヤッタ",
    timing: "相手のブレード、グラビトン、ラッシュ、EMP後の押し込みを受ける時。",
    call: "先に使う防御ULTを決める。2つ同時に使わず、1つ目で耐えて次の当たりに残す。",
    mistake: "怖くて早すぎるタイミングで使い、相手の本命ULTを受けられない。",
  },
];
const BEGINNER_THEORY_GUIDES = [
  { title: "人数差", body: "1人倒したら前へ、1人倒されたら下がる。人数差を見ずに戦うとエイム以前に負けやすい。" },
  { title: "リグループ", body: "負けた後は1人で触らず5人で集合する。最後に生き残った人ほど早く下がる。" },
  { title: "高台", body: "高台は撃ち下ろし、逃げ道、回復線を作れる。敵の高台を放置しない。" },
  { title: "射線", body: "正面1本だけだと止められる。DPSは横、サポートは安全な角、タンクは射線を切る場所を作る。" },
  { title: "フォーカス", body: "味方と同じ敵を見るだけでキルが増える。低HP、孤立、スキルなしの敵を優先する。" },
  { title: "ULT管理", body: "勝ち確の戦いでULTを足しすぎない。次の当たりで何を使うか1つだけ決める。" },
  { title: "角待ち", body: "遮蔽物のない場所で撃ち合わない。角から短く出て、スキルを使ったら戻る。" },
  { title: "デスを減らす", body: "勝てない時はキル数より最初のデスを見る。最初に死なないだけで勝率が上がる。" },
];
const SETTINGS_CHECKLIST = [
  { title: "味方HP表示", body: "サポート以外でもON推奨。助ける相手、引くべきタイミングが見えやすい。" },
  { title: "ピン設定", body: "敵、集合、後退、ULT状況を押しやすい場所に置く。VCなしでも合わせやすくなる。" },
  { title: "字幕/効果音", body: "ULT音声と足音を聞き取りやすい音量にする。BGMは少し下げる。" },
  { title: "視野角", body: "設定できる機種では広めを試す。横から来る敵や味方位置を把握しやすい。" },
  { title: "エイムアシスト", body: "強度は高め、ウィンドウは広すぎると吸われる。違和感がある時だけ小さく調整する。" },
  { title: "色設定", body: "敵味方の色を見分けやすくする。赤緑が見づらい場合は色覚設定を使う。" },
  { title: "リプレイ", body: "負け試合は最初のデスだけ確認する。全部見直すより原因が見つかりやすい。" },
  { title: "詳細情報パネル", body: "アビリティ説明をゲーム内でも確認できる。新キャラやパーク確認に使う。" },
];
const MAP_GUIDE_OVERRIDES = Object.fromEntries(FALLBACK_STAGES.map((stage) => {
  const style = GUIDE_MAP_STYLES[stage.style] || GUIDE_MAP_STYLES["狭所乱戦"];
  const compByStyle = {
    長射線: "ポーク",
    高台: "ダイブ/ピック",
    狭所乱戦: "ラッシュ",
    広い移動: "ダイブ/機動力",
  };
  const strongByStyle = {
    長射線: "長い射線、角、高台。正面を歩く前に横の射線を作る。",
    高台: "高台、上から拠点を撃てる場所、下がれる角。",
    狭所乱戦: "曲がり角、狭い入口、拠点手前のチョーク。",
    広い移動: "次の集合地点、回復パック周辺、横道の合流地点。",
  };
  const roleByStyle = {
    長射線: ["Tank: 射線を切って味方が渡る時間を作る。", "Damage: 横か高台からサポートを下がらせる。", "Support: 長射線に立ち続けず角から支える。"],
    高台: ["Tank: 高台を取り返すか、敵高台の射線を消す。", "Damage: 高台の敵を先に見る。", "Support: 味方全体が見える高台/角を使う。"],
    狭所乱戦: ["Tank: 角から短く出入りしてスキルを使わせる。", "Damage: タンクが触った敵を一緒に撃つ。", "Support: 1つ後ろの角から回復と火力を出す。"],
    広い移動: ["Tank: 味方が届く距離で前線を作る。", "Damage: 横を取っても戻り道を残す。", "Support: 移動中に孤立しない道を選ぶ。"],
  };
  return [stage.name, {
    rule: stage.rule,
    attack: stageHasAttackDefense(stage) ? `${stage.name}攻撃は、${style.attack}` : `${stage.name}は、先に次の強い場所を取り、人数がそろってから当たる。`,
    defense: stageHasAttackDefense(stage) ? `${stage.name}防衛は、${style.defense}` : `${stage.name}は、負けたら粘りすぎず次の入口で受け直す。`,
    strong: strongByStyle[stage.style],
    mistake: `${stage.name}での初心者ミス: ${style.mistake}`,
    comp: compByStyle[stage.style],
    roles: roleByStyle[stage.style],
  }];
}));
const ROLE_BEGINNER_GUIDES = {
  tank: {
    role: "味方が撃てる場所まで前線を作る。",
    position: "角、高台の入口、ペイロード前など、味方の射線が届く場所。",
    skill: "防御/移動スキルは入る時と帰る時のどちらに使うか決めてから使う。",
    dont: "回復が届かない場所まで1人で進む。",
  },
  damage: {
    role: "味方と同じ敵を撃ち、人数差を作る。",
    position: "正面だけでなく、戻れる横道や高台。",
    skill: "逃げスキルを先に使い切らず、撃った後に帰る手段を残す。",
    dont: "単独裏取りを繰り返して、味方の当たり合いに参加しない。",
  },
  support: {
    role: "生き残って、味方がもう一度戦える時間を作る。",
    position: "味方全員が少し見える角や高台。タンクの真後ろに立ち続けない。",
    skill: "大事な回復/無敵/自衛スキルは、味方か自分が本当に落ちる時に使う。",
    dont: "助けに行って自分も倒れる。",
  },
};
const ENEMY_COMP_COUNTER_GUIDES = {
  dive: {
    label: "ダイブ寄り",
    plan: "孤立を作らず、飛んできた敵を着地後に全員で見る。先にサポートへ寄れる位置を作る。",
    position: "広がりすぎず、サポートが逃げ込める角や高台下で受ける。バックラインだけを置き去りにしない。",
    cooldown: "ジャンプ、ブリンク、ハック、ブースターなどの突入スキル後が反撃タイミング。逃げスキルを使った敵を深追いしない。",
    swap: "ブリギッテ、キャスディ、トールビョーン、D.Va、キリコのように自衛・ peel ・即時離脱がある候補が安定。",
    candidates: ["dva", "orisa", "cassidy", "torbjorn", "brigitte", "kiriko", "moira"],
  },
  brawl: {
    label: "ラッシュ/近距離寄り",
    plan: "相手の得意な短距離で受け続けず、角を下がりながら削ってから当たる。",
    position: "狭い入口に全員で詰まらない。横射線や高台から、相手が詰める前に体力とスキルを使わせる。",
    cooldown: "スピード、バリア、自己回復、無敵を使わせた後に引き撃ちする。相手のラッシュULTには防御ULTを1つ残す。",
    swap: "シグマ、メイ、アッシュ、ソジョーン、ゼニヤッタ、アナなど、距離を保って止められる候補が有効。",
    candidates: ["sigma", "mei", "ashe", "sojourn", "ana", "zenyatta", "lucio"],
  },
  poke: {
    label: "ポーク/長射線寄り",
    plan: "正面の撃ち合いに付き合わず、遮蔽物をつないで距離を詰めるか、別射線から同時に圧をかける。",
    position: "長い道の中央を歩かない。タンクは射線を切り、DPSは横、サポートは角から支える。",
    cooldown: "盾、移動、阻害、退避スキルを使わせてから前へ出る。1人で射線に出て先に削られない。",
    swap: "ウィンストン、D.Va、ソンブラ、トレーサー、ルシオ、キリコなど、射線を無視して触れる候補が刺さりやすい。",
    candidates: ["winston", "dva", "sombra", "tracer", "lucio", "kiriko", "genji"],
  },
  pick: {
    label: "ワンピック/スナイプ寄り",
    plan: "最初の1デスを防ぐ。見られている射線を切り、相手の狙撃/奇襲キャラに先に圧をかける。",
    position: "単独で横断しない。角、盾、高台下を使い、味方と同時にピークする。",
    cooldown: "グラップル、ステルス、ワープ、逃げスキル後に詰める。蘇生や無敵でピックを返されないように見る。",
    swap: "ウィンストン、D.Va、ソンブラ、トレーサー、キリコ、マーシーなど、射線管理やリカバーができる候補が有効。",
    candidates: ["winston", "dva", "sombra", "tracer", "kiriko", "mercy", "lucio"],
  },
  mixed: {
    label: "混合構成",
    plan: "相手の一番強い勝ち筋を1つだけ止める。タンクだけ、スナイパーだけのように見方を絞る。",
    position: "味方が見える範囲で広がり、正面と横のどちらかが孤立しない形を作る。",
    cooldown: "相手の起点スキルを1つ決めて数える。使った直後に前へ、残っている時は無理に入らない。",
    swap: "自分が生き残れる得意キャラを軸に、足りない役割だけアンチ候補へ寄せる。",
    candidates: ["dva", "sigma", "cassidy", "sombra", "ana", "kiriko", "brigitte"],
  },
};

const state = {
  bootstrapped: false,
  activeView: "heroes",
  heroes: [],
  heroDetails: new Map(),
  heroStats: new Map(),
  maps: FALLBACK_STAGES,
  selectedHeroKey: null,
  role: "all",
  query: "",
  favoriteOnly: false,
  favoriteHeroKeys: new Set(),
  mapRuleFilter: "all",
  mapFilter: "all",
  compFilters: {
    rule: "all",
    stage: "all",
  },
  enemyCounter: {
    tank: "",
    damage1: "",
    damage2: "",
    support1: "",
    support2: "",
  },
  guideFilters: {
    map: "all",
    rule: "Control",
    hero: "",
  },
  synergyHeroKey: null,
  sensitivity: {
    hero: "all",
    style: "balanced",
    result: "stable",
    horizontal: 55,
    vertical: 45,
    scoped: 45,
    assist: 100,
    window: 35,
    smoothing: 95,
    easeIn: 20,
  },
  loadingDetails: false,
};

const els = {};
let lastScrollY = 0;
let pendingHeroKeyFromHash = null;

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  readFavorites();
  bindEvents();
  syncViewFromLocation();
  bootstrap();
});

function cacheElements() {
  els.syncStatus = document.querySelector("#syncStatus");
  els.refreshButton = document.querySelector("#refreshButton");
  els.topbar = document.querySelector(".topbar");
  els.viewButtons = document.querySelectorAll("[data-view-target]");
  els.viewPanels = document.querySelectorAll("[data-view-panel]");
  els.latestPatchTitle = document.querySelector("#latestPatchTitle");
  els.latestPatchSummary = document.querySelector("#latestPatchSummary");
  els.heroSearch = document.querySelector("#heroSearch");
  els.roleButtons = document.querySelectorAll("[data-role]");
  els.favoriteFilterButton = document.querySelector("[data-favorite-filter]");
  els.heroMapRuleFilter = document.querySelector("#heroMapRuleFilter");
  els.heroMapFilter = document.querySelector("#heroMapFilter");
  els.heroMapNote = document.querySelector("#heroMapNote");
  els.quickPerkBoard = document.querySelector("#quickPerkBoard");
  els.heroList = document.querySelector("#heroList");
  els.heroDetail = document.querySelector("#heroDetail");
  els.heroCount = document.querySelector("#heroCount");
  els.detailProgress = document.querySelector("#detailProgress");
  els.metaStats = document.querySelector("#metaStats");
  els.updateGrid = document.querySelector("#updateGrid");
  els.guideMap = document.querySelector("#guideMap");
  els.guideRule = document.querySelector("#guideRule");
  els.guideHero = document.querySelector("#guideHero");
  els.guideQuick = document.querySelector("#guideQuick");
  els.guideDetails = document.querySelector("#guideDetails");
  els.centerHeroGrid = document.querySelector("#centerHeroGrid");
  els.synergyMap = document.querySelector("#synergyMap");
  els.enemyCounterInputs = document.querySelectorAll("[data-enemy-counter-slot]");
  els.enemyCounterResult = document.querySelector("#enemyCounterResult");
  els.theoryCompGrid = document.querySelector("#theoryCompGrid");
  els.compRuleFilter = document.querySelector("#compRuleFilter");
  els.compStageFilter = document.querySelector("#compStageFilter");
  els.compGrid = document.querySelector("#compGrid");
  els.sensitivityResult = document.querySelector("#sensitivityResult");
  els.sensHero = document.querySelector("#sensHero");
  els.sensInputs = document.querySelectorAll(
    "#sensHero, #sensStyle, #sensResult, #sensHorizontal, #sensVertical, #sensScoped, #sensAssist, #sensWindow, #sensSmoothing, #sensEaseIn",
  );
}

function bindEvents() {
  els.refreshButton.addEventListener("click", () => loadRemoteData({ force: true }));
  els.viewButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const view = button.dataset.viewTarget;
      if (!VIEW_IDS.includes(view)) {
        return;
      }
      event.preventDefault();
      setActiveView(view, { updateHash: true, scroll: true });
    });
  });

  els.heroSearch.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderHeroList();
  });

  els.roleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.role = button.dataset.role;
      els.roleButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", active ? "true" : "false");
      });
      renderHeroList();
    });
  });

  els.favoriteFilterButton.addEventListener("click", () => {
    state.favoriteOnly = !state.favoriteOnly;
    els.favoriteFilterButton.classList.toggle("is-active", state.favoriteOnly);
    els.favoriteFilterButton.setAttribute("aria-pressed", state.favoriteOnly ? "true" : "false");
    renderHeroList();
  });

  els.heroMapRuleFilter?.addEventListener("change", () => {
    state.mapRuleFilter = els.heroMapRuleFilter.value;
    state.mapFilter = "all";
    renderHeroMapFilterOptions();
    renderHeroList();
  });

  els.heroMapFilter?.addEventListener("change", () => {
    state.mapFilter = els.heroMapFilter.value;
    renderHeroList();
  });

  els.guideMap.addEventListener("change", () => {
    state.guideFilters.map = els.guideMap.value;
    const stage = getSelectedGuideStage();
    if (stage) {
      state.guideFilters.rule = stage.rule;
    }
    renderGuideControls();
    renderGuides();
  });

  els.guideRule.addEventListener("change", () => {
    state.guideFilters.rule = els.guideRule.value;
    state.guideFilters.map = "all";
    renderGuideControls();
    renderGuides();
  });

  els.guideHero.addEventListener("change", () => {
    state.guideFilters.hero = els.guideHero.value;
    renderGuides();
  });

  els.compRuleFilter?.addEventListener("change", () => {
    state.compFilters.rule = els.compRuleFilter.value;
    state.compFilters.stage = "all";
    renderComps();
  });

  els.compStageFilter?.addEventListener("change", () => {
    state.compFilters.stage = els.compStageFilter.value;
    renderComps();
  });

  els.enemyCounterInputs?.forEach((select) => {
    select.addEventListener("change", () => {
      const slot = select.dataset.enemyCounterSlot;
      if (slot) {
        state.enemyCounter[slot] = select.value;
        renderEnemyCounterResult();
      }
    });
  });

  els.sensInputs.forEach((input) => {
    const syncSensitivity = () => {
      readSensitivityInputs();
      renderSensitivity();
    };
    input.addEventListener("input", syncSensitivity);
    input.addEventListener("change", syncSensitivity);
  });

  window.addEventListener("scroll", updateTopbarVisibility, { passive: true });
  window.addEventListener("hashchange", () => {
    syncViewFromLocation({ scroll: false });
  });
}

function syncViewFromLocation(options = {}) {
  const parsed = parseHash(window.location.hash);
  const view = parsed.view || state.activeView;
  if (parsed.heroKey) {
    if (state.heroes.some((hero) => hero.key === parsed.heroKey)) {
      state.selectedHeroKey = parsed.heroKey;
      pendingHeroKeyFromHash = null;
      renderHeroList();
      renderHeroDetail();
    } else {
      pendingHeroKeyFromHash = parsed.heroKey;
    }
  } else {
    pendingHeroKeyFromHash = null;
  }
  setActiveView(view, { updateHash: false, scroll: options.scroll || false });
}

function parseHash(hash) {
  const raw = String(hash || "").replace(/^#/, "");
  const [view, heroKey] = raw.split("/");
  return {
    view: VIEW_IDS.includes(view) ? view : "",
    heroKey: heroKey ? safeDecodeHashSegment(heroKey) : "",
  };
}

function safeDecodeHashSegment(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

function applyPendingHeroSelection(heroes) {
  if (pendingHeroKeyFromHash && heroes.some((hero) => hero.key === pendingHeroKeyFromHash)) {
    state.selectedHeroKey = pendingHeroKeyFromHash;
    pendingHeroKeyFromHash = null;
    return true;
  }
  return false;
}

function setActiveView(view, options = {}) {
  if (!VIEW_IDS.includes(view)) {
    return;
  }
  state.activeView = view;
  els.viewPanels.forEach((panel) => {
    const active = panel.dataset.viewPanel === view;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
  els.viewButtons.forEach((button) => {
    const active = button.dataset.viewTarget === view;
    button.classList.toggle("is-active", active);
    if (button.tagName === "BUTTON") {
      button.setAttribute("aria-pressed", active ? "true" : "false");
    }
  });
  const targetHash =
    view === "heroes" && state.selectedHeroKey ? `#heroes/${encodeURIComponent(state.selectedHeroKey)}` : `#${view}`;
  if (options.updateHash && window.location.hash !== targetHash) {
    window.history.pushState(null, "", targetHash);
  }
  if (options.scroll) {
    document.querySelector(".view-switcher")?.scrollIntoView({ block: "start" });
  }
}

function updateHeroHash(heroKey) {
  if (state.activeView !== "heroes") {
    return;
  }
  const nextHash = `#heroes/${encodeURIComponent(heroKey)}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }
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

  const cached = readCache({ allowStale: true });
  if (cached) {
    hydrateFromCache(cached);
    renderAll();
    setProgress("Ready");
    setStatus(cached.stale ? "古いキャッシュ表示中" : "キャッシュ表示中");
  }

  await loadRemoteData({ force: false });
}

function renderInitialLoading() {
  els.heroList.innerHTML = Array.from({ length: 7 }, () => '<div class="hero-row skeleton"></div>').join("");
  els.heroDetail.innerHTML = '<div class="empty-state skeleton"></div>';
  renderSensitivity();
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
    if (!applyPendingHeroSelection(heroes) && !state.selectedHeroKey && heroes[0]) {
      state.selectedHeroKey = heroes[0].key;
    }

    renderAll();
    await loadHeroDetails(heroes, { force });
    writeCache();
    setStatus(`最終更新 ${formatClock(new Date())}`);
  } catch (error) {
    console.error(error);
    setStatus("API取得エラー");
    if (!state.heroes.length) {
      const stale = readCache({ allowStale: true });
      if (stale) {
        hydrateFromCache(stale);
        renderAll();
        setProgress("Ready");
        setStatus("古いキャッシュ表示中");
      } else {
        renderFatalError(error);
      }
    }
  } finally {
    els.refreshButton.disabled = false;
  }
}

async function fetchHeroes() {
  let heroes;
  try {
    heroes = await fetchJson("/heroes", { locale: LOCALE });
  } catch (error) {
    heroes = await fetchJson("/heroes", { locale: FALLBACK_LOCALE });
  }
  return mergeExtraHeroes(heroes);
}

async function fetchHeroDetail(heroKey) {
  try {
    return await fetchJson(`/heroes/${encodeURIComponent(heroKey)}`, { locale: LOCALE });
  } catch (error) {
    return fetchJson(`/heroes/${encodeURIComponent(heroKey)}`, { locale: FALLBACK_LOCALE });
  }
}

function mergeExtraHeroes(heroes) {
  const byKey = new Map(heroes.map((hero) => [hero.key, hero]));
  EXTRA_HEROES.forEach((hero) => {
    if (!byKey.has(hero.key)) {
      byKey.set(hero.key, hero);
    }
  });
  return [...byKey.values()];
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

async function loadHeroDetails(heroes, { force = false } = {}) {
  state.loadingDetails = true;
  let completed = 0;
  setProgress(`Perks ${completed}/${heroes.length}`);

  await mapLimit(heroes, 4, async (hero) => {
    if (!force && state.heroDetails.has(hero.key)) {
      completed += 1;
      setProgress(`Perks ${completed}/${heroes.length}`);
      return;
    }

    try {
      const detail = hero.localDetail && EXTRA_HERO_DETAILS[hero.key]
        ? EXTRA_HERO_DETAILS[hero.key]
        : await fetchHeroDetail(hero.key);
      state.heroDetails.set(hero.key, detail);
    } catch (error) {
      state.heroDetails.set(hero.key, { key: hero.key, error: error.message });
    } finally {
      completed += 1;
      setProgress(`Perks ${completed}/${heroes.length}`);
      renderQuickPerkBoard();
      if (hero.key === state.selectedHeroKey) {
        renderHeroDetail();
      }
      if (state.query) {
        renderHeroList();
      }
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

  const response = await fetchWithRetry(url);
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

async function fetchWithRetry(url) {
  let lastError;
  for (const delay of FETCH_RETRY_DELAYS) {
    if (delay > 0) {
      await wait(delay);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      return await fetch(url, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw lastError;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderAll() {
  renderMetaStats();
  renderUpdates();
  renderGuideControls();
  renderGuides();
  renderEnemyCounterControls();
  renderComps();
  renderTheoryComps();
  renderSynergyMapControls();
  renderSensitivityControls();
  renderSensitivity();
  renderHeroMapFilterOptions();
  renderQuickPerkBoard();
  renderHeroList();
  renderHeroDetail();
}

function renderHeroMapFilterOptions() {
  if (!els.heroMapFilter) {
    return;
  }
  if (els.heroMapRuleFilter) {
    const ruleCurrent = els.heroMapRuleFilter.value || state.mapRuleFilter;
    setSelectOptions(els.heroMapRuleFilter, ruleOptions(true), ruleCurrent);
    state.mapRuleFilter = els.heroMapRuleFilter.value;
  }
  const current = els.heroMapFilter.value || state.mapFilter;
  const options = [
    { value: "all", label: "指定なし" },
    ...filterStagesByRule(state.maps, state.mapRuleFilter)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "ja"))
      .map((stage) => ({ value: stage.key, label: `${stage.name}(${stage.rule})` })),
  ];
  setSelectOptions(els.heroMapFilter, options, current);
  state.mapFilter = els.heroMapFilter.value;
}

function renderGuideControls() {
  if (!els.guideMap || !els.guideRule || !els.guideHero) {
    return;
  }
  const ruleCurrent = els.guideRule.value || state.guideFilters.rule;
  setSelectOptions(els.guideRule, ruleOptions(false), ruleCurrent);
  state.guideFilters.rule = els.guideRule.value;

  const mapCurrent = els.guideMap.value || state.guideFilters.map;
  setSelectOptions(
    els.guideMap,
    [
      { value: "all", label: "指定なし" },
      ...filterStagesByRule(state.maps, state.guideFilters.rule)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, "ja"))
        .map((stage) => ({ value: stage.key, label: `${stage.name} / ${stage.rule}` })),
    ],
    mapCurrent,
  );
  state.guideFilters.map = els.guideMap.value;

  const stage = getSelectedGuideStage();
  if (stage && state.guideFilters.rule !== stage.rule) {
    setSelectOptions(els.guideRule, ruleOptions(false), stage.rule);
    state.guideFilters.rule = els.guideRule.value;
  }

  const heroCurrent = state.guideFilters.hero || els.guideHero.value || state.selectedHeroKey || state.heroes[0]?.key || "";
  setSelectOptions(
    els.guideHero,
    state.heroes
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "ja"))
      .map((hero) => ({ value: hero.key, label: `${hero.name} / ${roleLabel(hero.role)}` })),
    heroCurrent,
  );
  state.guideFilters.hero = els.guideHero.value;
}

function renderGuides() {
  if (!els.guideQuick || !els.guideDetails) {
    return;
  }
  const stage = getSelectedGuideStage() || state.maps[0] || FALLBACK_STAGES[0];
  const rule = GUIDE_RULES[state.guideFilters.rule] ? state.guideFilters.rule : stage.rule;
  const hero = findHeroByKey(state.guideFilters.hero) || state.heroes[0];
  if (!stage || !hero) {
    els.guideQuick.innerHTML = renderEmpty("攻略データを準備中です。");
    els.guideDetails.innerHTML = "";
    return;
  }

  els.guideQuick.innerHTML = [
    renderGuideQuickCard("今このマップ", `${stage.name} / ${stage.style}`, [
      mapStyleGuide(stage).attack,
      mapStyleGuide(stage).mistake,
    ]),
    renderGuideQuickCard("今このルール", rule, [
      ruleGuide(rule).win,
      ruleGuide(rule).reset,
    ]),
    renderGuideQuickCard("自分のロール", `${hero.name} / ${roleLabel(hero.role)}`, [
      roleBeginnerGuide(hero).role,
      roleBeginnerGuide(hero).dont,
    ]),
  ].join("");

  els.guideDetails.innerHTML = [
    renderMapGuide(stage),
    renderRuleGuide(rule),
    renderHeroBeginnerGuide(hero),
    renderMapSpecificGuide(stage),
    renderUltComboGuide(),
    renderBeginnerTheoryGuide(),
    renderSettingsChecklist(),
  ].join("");
  els.guideDetails.querySelector("[data-guide-open-hero]")?.addEventListener("click", () => selectHeroFromInline(hero.key));
}

function getSelectedGuideStage() {
  if (!state.guideFilters.map || state.guideFilters.map === "all") {
    return null;
  }
  return state.maps.find((stage) => stage.key === state.guideFilters.map) || null;
}

function ruleGuide(rule) {
  return GUIDE_RULES[rule] || GUIDE_RULES.Control;
}

function mapStyleGuide(stage) {
  return GUIDE_MAP_STYLES[stage?.style] || GUIDE_MAP_STYLES["狭所乱戦"];
}

function roleBeginnerGuide(hero) {
  return ROLE_BEGINNER_GUIDES[hero?.role] || ROLE_BEGINNER_GUIDES.damage;
}

function renderGuideQuickCard(title, meta, items) {
  return `
    <article class="guide-quick-card">
      <span>${escapeHtml(title)}</span>
      <h3>${escapeHtml(meta)}</h3>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
  `;
}

function renderMapGuide(stage) {
  const style = mapStyleGuide(stage);
  const sideBlocks = stageHasAttackDefense(stage)
    ? [
        ["攻撃", style.attack],
        ["防衛", style.defense],
      ]
    : [["共通", `${style.attack} ${style.defense}`]];
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>マップ別攻略</h3>
        <span class="chip">${escapeHtml(stage.name)} / ${escapeHtml(stage.rule)} / ${escapeHtml(stage.style)}</span>
      </div>
      <div class="guide-side-grid">
        ${sideBlocks.map(([label, text]) => `
          <section>
            <h4>${escapeHtml(label)}</h4>
            <p>${escapeHtml(text)}</p>
          </section>
        `).join("")}
      </div>
      <div class="guide-list-block">
        <h4>おすすめロール行動</h4>
        <ul>${style.role.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <p class="guide-warning"><strong>初心者ミス:</strong> ${escapeHtml(style.mistake)}</p>
    </article>
  `;
}

function mapSpecificGuide(stage) {
  return MAP_GUIDE_OVERRIDES[stage?.name] || null;
}

function renderMapSpecificGuide(stage) {
  const guide = mapSpecificGuide(stage);
  if (!guide) {
    return "";
  }
  const sideBlocks = stageHasAttackDefense(stage)
    ? [
        ["攻撃", guide.attack],
        ["防衛", guide.defense],
      ]
    : [["共通", `${guide.attack} ${guide.defense}`]];
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>${escapeHtml(stage.name)} 個別攻略</h3>
        <span class="chip">${escapeHtml(guide.rule)} / ${escapeHtml(guide.comp)}</span>
      </div>
      <div class="guide-side-grid">
        ${sideBlocks.map(([label, text]) => `
          <section>
            <h4>${escapeHtml(label)}</h4>
            <p>${escapeHtml(text)}</p>
          </section>
        `).join("")}
      </div>
      <div class="guide-check-grid">
        ${renderGuidePoint("強い位置", guide.strong)}
        ${renderGuidePoint("おすすめ構成タイプ", guide.comp)}
        ${renderGuidePoint("初心者ミス", guide.mistake)}
      </div>
      <div class="guide-list-block">
        <h4>ロール別に見る場所</h4>
        <ul>${guide.roles.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    </article>
  `;
}

function renderRuleGuide(rule) {
  const guide = ruleGuide(rule);
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>ルール別攻略</h3>
        <span class="chip">${escapeHtml(rule)}</span>
      </div>
      <div class="guide-check-grid">
        ${renderGuidePoint("勝ち筋", guide.win)}
        ${renderGuidePoint("立ち位置", guide.position)}
        ${renderGuidePoint("引き際", guide.reset)}
        ${renderGuidePoint("初心者ミス", guide.mistake)}
      </div>
    </article>
  `;
}

function renderHeroBeginnerGuide(hero) {
  const role = roleBeginnerGuide(hero);
  const playstyle = buildHeroPlaystyle(hero);
  const synergy = buildHeroSynergy(hero);
  const counters = getHeroCounters(hero);
  const counterNames = counters.slice(0, 3).map((counter) => heroName(counter.key)).join(" / ");
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>キャラ別攻略</h3>
        <button class="chip" type="button" data-guide-open-hero="${escapeAttr(hero.key)}">${escapeHtml(hero.name)}詳細へ</button>
      </div>
      <div class="guide-check-grid">
        ${renderGuidePoint("初心者向けの役割", role.role)}
        ${renderGuidePoint("基本の立ち位置", role.position)}
        ${renderGuidePoint("スキルの使いどころ", role.skill)}
        ${renderGuidePoint("やってはいけない動き", role.dont)}
      </div>
      <div class="guide-list-block">
        <h4>${escapeHtml(playstyle.badge)}の立ち回り</h4>
        <ul>${playstyle.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>
      </div>
      <div class="guide-side-grid">
        <section>
          <h4>対策される相手</h4>
          <p>${escapeHtml(counterNames)} に狙われる時は、射線を切る、味方の近くへ戻る、スキルを使い切ってから入らない。</p>
        </section>
        <section>
          <h4>味方との合わせ方</h4>
          <p>${escapeHtml(synergy.allies.slice(0, 2).map((ally) => `${heroName(ally.key)}: ${ally.reason}`).join(" / "))}</p>
        </section>
      </div>
    </article>
  `;
}

function renderUltComboGuide() {
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>ウルトの合わせ方</h3>
        <span class="chip">ULT Combo</span>
      </div>
      <div class="learning-card-grid">
        ${ULT_COMBO_GUIDES.map((combo) => `
          <section class="learning-card">
            <span>${escapeHtml(combo.heroes)}</span>
            <h4>${escapeHtml(combo.title)}</h4>
            <p><strong>タイミング:</strong> ${escapeHtml(combo.timing)}</p>
            <p><strong>合わせ方:</strong> ${escapeHtml(combo.call)}</p>
            <p><strong>失敗例:</strong> ${escapeHtml(combo.mistake)}</p>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderBeginnerTheoryGuide() {
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>初心者向けセオリー</h3>
        <span class="chip">Theory</span>
      </div>
      <div class="learning-card-grid is-compact">
        ${BEGINNER_THEORY_GUIDES.map((item) => `
          <section class="learning-card">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.body)}</p>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderSettingsChecklist() {
  return `
    <article class="guide-card">
      <div class="panel-title">
        <h3>設定でやっておくこと</h3>
        <span class="chip">Console</span>
      </div>
      <div class="learning-card-grid is-compact">
        ${SETTINGS_CHECKLIST.map((item) => `
          <section class="learning-card">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.body)}</p>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderGuidePoint(label, text) {
  return `
    <section>
      <h4>${escapeHtml(label)}</h4>
      <p>${escapeHtml(text)}</p>
    </section>
  `;
}

function renderSensitivityControls() {
  const current = els.sensHero.value || state.sensitivity.hero;
  const options = [
    { value: "all", label: "共通" },
    ...state.heroes
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "ja"))
      .map((hero) => ({ value: hero.key, label: `${hero.name} / ${labelRole(hero.role)}` })),
  ];
  setSelectOptions(els.sensHero, options, current);
  state.sensitivity.hero = els.sensHero.value;
}

function readSensitivityInputs() {
  const numberValue = (id, fallback) => {
    const input = document.querySelector(`#${id}`);
    const min = Number(input.min);
    const max = Number(input.max);
    return clamp(Number(input.value), min, max, fallback);
  };

  state.sensitivity = {
    hero: document.querySelector("#sensHero").value,
    style: document.querySelector("#sensStyle").value,
    result: document.querySelector("#sensResult").value,
    horizontal: numberValue("sensHorizontal", 55),
    vertical: numberValue("sensVertical", 45),
    scoped: numberValue("sensScoped", 45),
    assist: numberValue("sensAssist", 100),
    window: numberValue("sensWindow", 35),
    smoothing: numberValue("sensSmoothing", 95),
    easeIn: numberValue("sensEaseIn", 20),
  };
}

function renderSensitivity() {
  if (!els.sensitivityResult) {
    return;
  }

  const analysis = analyzeSensitivity(state.sensitivity);
  els.sensitivityResult.innerHTML = `
    <div class="sens-summary is-${escapeAttr(analysis.tone)}">
      <div>
        <span>${escapeHtml(analysis.preset.title)}</span>
        <strong>${escapeHtml(analysis.title)}</strong>
      </div>
      <p>${escapeHtml(analysis.summary)}</p>
    </div>
    <div class="sens-metrics">
      ${renderSensMetric("水平", analysis.recommendedHorizontal)}
      ${renderSensMetric("垂直", analysis.recommendedVertical)}
      ${renderSensMetric("スコープ", analysis.recommendedScoped)}
      ${renderSensMetric("縦横比", analysis.verticalRatio)}
    </div>
    <div class="sens-advice">
      <section>
        <h3>次に触る項目</h3>
        <p>${escapeHtml(analysis.primaryAction)}</p>
      </section>
      <section>
        <h3>射撃場チェック</h3>
        <ul>
          ${analysis.checks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;
}

function renderSensMetric(label, value) {
  return `
    <div class="metric">
      <span class="stat-label">${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
    </div>
  `;
}

function analyzeSensitivity(settings) {
  const heroProfile = getHeroAimProfile(settings.hero);
  const preset = heroProfile?.preset || SENSITIVITY_PRESETS[settings.style] || SENSITIVITY_PRESETS.balanced;
  const horizontalRange = heroProfile?.horizontal || preset.horizontal;
  const scopedRange = heroProfile?.scoped || preset.scoped;
  const ratio = settings.horizontal > 0 ? settings.vertical / settings.horizontal : preset.verticalRatio;
  const targetVertical = clamp(Math.round(settings.horizontal * preset.verticalRatio), 1, 100, settings.vertical);
  const recommendedHorizontal = recommendAround(settings.horizontal, horizontalRange);
  const recommendedVertical = recommendAround(targetVertical, [Math.max(1, targetVertical - 4), Math.min(100, targetVertical + 4)]);
  const recommendedScoped = recommendAround(settings.scoped, scopedRange);
  const actions = buildSensitivityActions(settings, { ...preset, horizontal: horizontalRange, scoped: scopedRange }, targetVertical);
  const checks = [
    "訓練場で近距離の左右移動ボットを30秒追い、行き過ぎるか届かないかだけを見る。",
    "次に中距離で180度振り向きから照準を戻し、水平感度だけを2から4刻みで調整する。",
    "最後にスコープヒーローで頭の高さをなぞり、スコープ相対感度を2刻みで合わせる。",
  ];

  return {
    preset,
    tone: actions.warning ? "warn" : "good",
    title: actions.title,
    summary: `${heroProfile?.label || preset.title}: ${heroProfile?.note || preset.note} 現在の縦横比は${formatDecimal(ratio, 2)}です。`,
    recommendedHorizontal,
    recommendedVertical,
    recommendedScoped,
    verticalRatio: `${formatDecimal(ratio, 2)}x`,
    primaryAction: actions.primary,
    checks,
  };
}

function getHeroAimProfile(heroKey) {
  if (!heroKey || heroKey === "all") {
    return null;
  }
  const hero = state.heroes.find((item) => item.key === heroKey);
  const explicit = HERO_AIM_PROFILES[heroKey];
  if (explicit) {
    return {
      label: hero?.name || heroName(heroKey),
      preset: SENSITIVITY_PRESETS[explicit.style] || SENSITIVITY_PRESETS.balanced,
      horizontal: explicit.horizontal,
      scoped: explicit.scoped,
      note: explicit.note,
    };
  }
  const role = hero?.role || "";
  const fallbackStyle = role === "tank" ? "balanced" : role === "support" ? "scoped" : "tracking";
  return {
    label: hero?.name || heroName(heroKey),
    preset: SENSITIVITY_PRESETS[fallbackStyle],
    note:
      role === "tank"
        ? "タンクは視点移動と前線確認が多いので、振り向ける水平感度を保ちつつ行き過ぎを抑える。"
        : role === "support"
          ? "サポートは味方追従と自衛を両立するため、中低速から安定を優先。"
          : "DPSは交戦距離に合わせ、まず追いエイムが崩れない水平感度から合わせる。",
  };
}

function buildSensitivityActions(settings, preset, targetVertical) {
  if (settings.assist < 80) {
    return {
      title: "アシスト強度を戻す",
      primary: `CS版の基準作りでは、まずエイムアシスト強度を80以上に戻す。低いまま感度を詰めると、追いエイムとフリックの判断がぶれやすい。`,
      warning: true,
    };
  }
  if (settings.result === "overshoot") {
    return {
      title: "行き過ぎを抑える",
      primary: `水平感度を${clamp(settings.horizontal - 4, 1, 100, settings.horizontal)}前後まで下げる。まだ止まらない場合だけ、アシストウィンドウを${recommendAround(settings.window + 5, preset.assistWindow)}へ寄せる。`,
      warning: true,
    };
  }
  if (settings.result === "undershoot") {
    return {
      title: "届かなさを減らす",
      primary: `水平感度を${clamp(settings.horizontal + 4, 1, 100, settings.horizontal)}前後まで上げる。細かい追従が崩れるならエイムイーズインを${recommendAround(settings.easeIn + 3, preset.easeIn)}へ戻す。`,
      warning: true,
    };
  }
  if (settings.result === "shaky") {
    return {
      title: "微振動を落ち着かせる",
      primary: `水平感度は触らず、エイムスムージングを${recommendAround(settings.smoothing + 4, preset.smoothing)}、アシストウィンドウを${recommendAround(settings.window + 4, preset.assistWindow)}に寄せる。`,
      warning: true,
    };
  }
  if (settings.result === "slow-turn") {
    return {
      title: "振り向きを速くする",
      primary: `水平感度を${clamp(settings.horizontal + 6, 1, 100, settings.horizontal)}前後まで上げる。縦感度は${targetVertical}付近にして、上下だけ速すぎる状態を避ける。`,
      warning: true,
    };
  }

  const horizontalInRange = inRange(settings.horizontal, preset.horizontal);
  const scopedInRange = inRange(settings.scoped, preset.scoped);
  if (!horizontalInRange) {
    return {
      title: "基準レンジに寄せる",
      primary: `まず水平感度を${recommendedBoundary(settings.horizontal, preset.horizontal)}へ寄せる。垂直感度は${targetVertical}付近から始める。`,
      warning: true,
    };
  }
  if (!scopedInRange) {
    return {
      title: "ADSだけ調整",
      primary: `通常感度は維持し、スコープ相対感度だけ${recommendAround(settings.scoped, preset.scoped)}に寄せる。`,
      warning: false,
    };
  }
  return {
    title: "大きく変えなくてよい",
    primary: `現在値は${preset.title}の目安内。変更するなら水平感度を2刻み、スコープ相対感度を1から2刻みで片方ずつ試す。`,
    warning: false,
  };
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
  renderLatestPatchSummary();
  const updates = getPatchUpdateDisplay();

  els.updateGrid.innerHTML = updates.items.length
    ? renderUpdateSection("公式パッチ", updates.note, updates.items)
    : renderEmpty("過去1週間以内の公式パッチ情報はありません。");
}

function renderLatestPatchSummary() {
  const display = getPatchUpdateDisplay();
  const patch = display.items[0];
  if (!els.latestPatchTitle || !els.latestPatchSummary) {
    return;
  }
  if (!patch) {
    els.latestPatchTitle.textContent = "過去1週間のパッチなし";
    els.latestPatchSummary.textContent = "古いパッチは表示せず、必要な時だけ公式パッチノートを確認してください。";
    return;
  }
  els.latestPatchTitle.textContent = `${display.stale ? "保存済み: " : ""}${patch.date} ${patch.title}`;
  els.latestPatchSummary.textContent = display.stale
    ? `${patch.summary} 最新情報は公式パッチノートで確認してください。`
    : patch.summary;
}

function getPatchUpdateDisplay() {
  const sortedPatches = PATCH_UPDATES
    .filter((item) => item.category === "patch")
    .sort((a, b) => updateTimestamp(b) - updateTimestamp(a));
  const visible = sortedPatches.filter(isVisibleRecentUpdate);
  return {
    items: visible.slice(0, 1),
    note: "過去1週間以内の最新のみ表示",
    stale: false,
  };
}

function renderUpdateCard(update) {
  const linkLabel = update.category === "topic" ? "参考記事を開く" : "公式で確認";
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
      <a href="${safeUrl(update.href)}" target="_blank" rel="noreferrer">${escapeHtml(linkLabel)}</a>
    </article>
  `;
}

function renderUpdateSection(title, note, items) {
  return `
    <section class="update-section">
      <div class="section-head compact">
        <div>
          <span class="eyebrow">${escapeHtml(title)}</span>
          <h3>${escapeHtml(note)}</h3>
        </div>
        <span class="section-note">${items.length}件</span>
      </div>
      <div class="update-card-grid">
        ${items.length ? items.map(renderUpdateCard).join("") : renderEmpty("表示できる項目はありません。")}
      </div>
    </section>
  `;
}

function renderComps() {
  if (!els.compGrid) {
    return;
  }
  renderCompFilterOptions();
  const stage = getSelectedStage();
  const comps = stage ? [...buildStageComps(stage), ...buildRecommendedComps()] : buildRecommendedComps();
  els.compGrid.innerHTML = comps.length
    ? comps.map(renderCompCard).join("")
    : renderEmpty("ステージ名を選ぶと、そのマップ向けの構成例を表示します。");
  els.compGrid.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function buildStageComps(stage) {
  const sides = stageHasAttackDefense(stage) ? ["attack", "defense"] : ["common"];
  return sides.map((side) => buildStageComp(stage, side));
}

function stageHasAttackDefense(stage) {
  return ["Escort", "Hybrid"].includes(stage.rule);
}

function buildStageComp(stage, side) {
  const sideLabel = labelStageSide(side);
  const members = pickStageMembers(stage, side);
  return {
    title: `${stage.name} ${sideLabel}`,
    note: buildStageCompNote(stage, side),
    tag: side === "attack" ? "Attack" : side === "defense" ? "Defense" : "Map",
    category: "map",
    categoryLabel: "ステージ別",
    rules: [stage.rule],
    maps: [stage.style],
    stageNames: [stage.name],
    reasons: buildStageReasons(stage, side),
    members: members.map((member) => ({
      ...member,
      hero: findHeroByKey(member.key),
      fallback: heroName(member.key),
      source: "stage",
    })),
  };
}

function pickStageMembers(stage, side) {
  if (side === "common") {
    if (stage.rule === "Control") {
      return stage.style === "狭所乱戦"
        ? buildStageMemberSet(["ramattra", "mei", "sojourn", "lucio", "kiriko"])
        : buildStageMemberSet(["dva", "tracer", "sojourn", "lucio", "kiriko"]);
    }
    if (stage.rule === "Push") {
      return buildStageMemberSet(["junker-queen", "tracer", "sojourn", "lucio", "juno"]);
    }
    if (stage.rule === "Flashpoint") {
      return buildStageMemberSet(["dva", "tracer", "venture", "lucio", "kiriko"]);
    }
    if (stage.rule === "Clash") {
      return buildStageMemberSet(["orisa", "mei", "cassidy", "baptiste", "kiriko"]);
    }
  }

  if (stage.style === "長射線") {
    return side === "defense"
      ? buildStageMemberSet(["sigma", "widowmaker", "ashe", "baptiste", "zenyatta"])
      : buildStageMemberSet(["sigma", "ashe", "sojourn", "baptiste", "kiriko"]);
  }
  if (stage.style === "高台") {
    return side === "defense"
      ? buildStageMemberSet(["dva", "ashe", "sojourn", "baptiste", "kiriko"])
      : buildStageMemberSet(["winston", "tracer", "genji", "ana", "juno"]);
  }
  if (stage.style === "広い移動") {
    return buildStageMemberSet(["dva", "tracer", "sombra", "lucio", "kiriko"]);
  }
  return side === "defense"
    ? buildStageMemberSet(["orisa", "mei", "cassidy", "baptiste", "kiriko"])
    : buildStageMemberSet(["reinhardt", "mei", "reaper", "lucio", "baptiste"]);
}

function buildStageMemberSet(keys) {
  return keys.map((key) => ({
    key,
    role: stageMemberRole(key),
  }));
}

function stageMemberRole(key) {
  const hero = findHeroByKey(key);
  if (hero?.role) {
    return hero.role;
  }
  if (["ana", "baptiste", "juno", "kiriko", "lucio", "zenyatta"].includes(key)) {
    return "support";
  }
  if (["dva", "junker-queen", "orisa", "ramattra", "reinhardt", "sigma", "winston"].includes(key)) {
    return "tank";
  }
  return "damage";
}

function buildStageCompNote(stage, side) {
  if (side === "attack") {
    return `${stage.rule}の攻撃側。${stage.style}で最初に有利位置を取りに行く構成。`;
  }
  if (side === "defense") {
    return `${stage.rule}の防衛側。先に持てる強い位置を守り、相手の入りを止める構成。`;
  }
  return `${stage.rule}は攻撃/防衛が固定されないため、${stage.style}に合わせた共通構成。`;
}

function buildStageReasons(stage, side) {
  if (side === "attack") {
    return [
      "攻撃側は最初にエリアを取り返す必要があるため、タンクが入口を作り、DPSが高台や角を動かす形にしています。",
      `${stage.style}の強みを相手に使わせ続けないよう、サポートは前線維持と離脱のしやすさを優先しています。`,
    ];
  }
  if (side === "defense") {
    return [
      "防衛側は先に強い射線や高台を持てるため、相手の進入ルートを絞って人数差を作る狙いです。",
      "押し切られそうな時も一度引いて立て直せるよう、耐久と自衛のあるサポートを合わせています。",
    ];
  }
  return [
    "このルールは攻防が固定されないため、初動、再集合、次の当たり合いへの移動を重視しています。",
    `${stage.style}に合わせて、迷った時でも役割が分かりやすいタンク、DPS、サポートの形にしています。`,
  ];
}

function labelStageSide(side) {
  if (side === "attack") return "攻撃";
  if (side === "defense") return "防衛";
  return "共通";
}

function findHeroByKey(key) {
  return state.heroes.find((hero) => hero.key === key || hero.name === key) || null;
}

function buildAllComps() {
  return [
    ...buildStaticComps(COMPOSITION_EXAMPLES),
    ...buildStaticComps(MODE_COMPOSITION_EXAMPLES),
    ...buildStaticComps(MAP_STYLE_COMPOSITION_EXAMPLES),
    ...buildRecommendedComps(),
  ];
}

function renderCompFilterOptions() {
  if (!els.compRuleFilter || !els.compStageFilter) {
    return;
  }
  const selected = { ...state.compFilters };
  setSelectOptions(
    els.compRuleFilter,
    ruleOptions(true),
    selected.rule,
  );
  const visibleStages = getVisibleCompStages();
  setSelectOptions(
    els.compStageFilter,
    [
      { value: "all", label: "ステージを選択" },
      ...visibleStages.map((stage) => ({
        value: stage.key,
        label: stage.name,
      })),
    ],
    selected.stage,
  );
}

function getVisibleCompStages() {
  return filterStagesByRule(state.maps, state.compFilters.rule);
}

function filterStagesByRule(stages, rule) {
  return (Array.isArray(stages) ? stages : []).filter((stage) => stageMatchesRule(stage, rule));
}

function stageMatchesRule(stage, rule) {
  return !rule || rule === "all" || stage.rule === rule;
}

function ruleOptions(includeAll = true) {
  const options = Object.keys(GUIDE_RULES).map((rule) => ({ value: rule, label: rule }));
  return includeAll ? [{ value: "all", label: "すべて" }, ...options] : options;
}

function renderTheoryComps() {
  if (!els.theoryCompGrid) {
    return;
  }
  els.theoryCompGrid.innerHTML = THEORY_COMPOSITION_EXAMPLES.map(renderTheoryCompCard).join("");
  els.theoryCompGrid.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function renderTheoryCompCard(comp) {
  return `
    <article class="theory-comp-card">
      <div class="theory-comp-head">
        <span class="chip">${escapeHtml(comp.archetype)}</span>
        <h4>${escapeHtml(comp.title)}</h4>
      </div>
      <div class="comp-members">
        ${comp.members.map(renderCompMember).join("")}
      </div>
      <div class="theory-comp-points">
        ${renderGuidePoint("狙い", comp.goal)}
        ${renderGuidePoint("強い場面", comp.strong)}
        ${renderGuidePoint("弱点", comp.weakness)}
        ${renderGuidePoint("入れ替え候補", comp.swaps)}
      </div>
    </article>
  `;
}

function renderEnemyCounterControls() {
  if (!els.enemyCounterInputs?.length) {
    return;
  }
  els.enemyCounterInputs.forEach((select) => {
    const slot = select.dataset.enemyCounterSlot;
    const role = select.dataset.enemyCounterRole;
    const heroes = sortHeroesForQuickPerks(state.heroes.filter((hero) => hero.role === role));
    const current = state.enemyCounter[slot] || "";
    select.innerHTML = [
      '<option value="">未選択</option>',
      ...heroes.map((hero) => `<option value="${escapeAttr(hero.key)}">${escapeHtml(hero.name)}</option>`),
    ].join("");
    select.value = heroes.some((hero) => hero.key === current) ? current : "";
    state.enemyCounter[slot] = select.value;
  });
  renderEnemyCounterResult();
}

function renderEnemyCounterResult() {
  if (!els.enemyCounterResult) {
    return;
  }
  const selectedHeroes = getSelectedEnemyHeroes();
  if (!selectedHeroes.length) {
    els.enemyCounterResult.innerHTML = renderEmpty("敵キャラを選ぶと、構成アンチと対策が表示されます");
    return;
  }

  const plan = buildEnemyCounterPlan(selectedHeroes);
  els.enemyCounterResult.innerHTML = `
    <div class="enemy-counter-summary">
      <div>
        <span class="eyebrow">Detected Comp</span>
        <h4>${escapeHtml(plan.guide.label)}</h4>
      </div>
      <div class="enemy-chip-list">
        ${selectedHeroes.map(renderEnemyChip).join("")}
      </div>
    </div>
    <div class="enemy-counter-plan">
      ${renderGuidePoint("勝ち筋", plan.guide.plan)}
      ${renderGuidePoint("立ち位置", plan.guide.position)}
      ${renderGuidePoint("スキル管理", plan.guide.cooldown)}
      ${renderGuidePoint("入れ替え方", plan.guide.swap)}
    </div>
    <div class="enemy-counter-roles">
      ${QUICK_PERK_ROLES.map((role) => renderEnemyCounterRole(role, plan.recommendations[role.role] || [])).join("")}
    </div>
    <div class="enemy-counter-notes">
      <strong>見る順番</strong>
      <span>${escapeHtml(plan.priority)}</span>
    </div>
  `;
  els.enemyCounterResult.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function getSelectedEnemyHeroes() {
  const keys = Object.values(state.enemyCounter).filter(Boolean);
  const seen = new Set();
  return keys
    .map((key) => findHeroByKey(key))
    .filter(Boolean)
    .filter((hero) => {
      if (seen.has(hero.key)) {
        return false;
      }
      seen.add(hero.key);
      return true;
    });
}

function buildEnemyCounterPlan(enemyHeroes) {
  const archetypeCounts = enemyHeroes.reduce((counts, hero) => {
    const archetypes = getHeroArchetypes(hero.key);
    const primary = archetypes[0] || roleFallbackArchetype(hero.role);
    counts[primary] = (counts[primary] || 0) + 1;
    return counts;
  }, {});
  const primaryType = Object.entries(archetypeCounts)
    .sort((a, b) => b[1] - a[1])
    .find(([, count]) => count >= 2)?.[0] || "mixed";
  const guide = ENEMY_COMP_COUNTER_GUIDES[primaryType] || ENEMY_COMP_COUNTER_GUIDES.mixed;
  return {
    guide,
    recommendations: buildEnemyCounterRecommendations(enemyHeroes, guide),
    priority: buildEnemyCounterPriority(enemyHeroes, guide),
  };
}

function buildEnemyCounterRecommendations(enemyHeroes, guide) {
  const scored = new Map();
  enemyHeroes.forEach((enemy) => {
    getHeroCounters(enemy).forEach((counter) => {
      if (!findHeroByKey(counter.key)) {
        return;
      }
      const current = scored.get(counter.key) || {
        key: counter.key,
        score: 0,
        reasons: new Set(),
        targets: new Set(),
      };
      current.score += 2;
      current.reasons.add(counter.reason);
      current.targets.add(enemy.name);
      scored.set(counter.key, current);
    });
  });
  guide.candidates.forEach((key) => {
    const hero = findHeroByKey(key);
    if (!hero) {
      return;
    }
    const current = scored.get(key) || {
      key,
      score: 0,
      reasons: new Set(),
      targets: new Set(),
    };
    current.score += 1;
    current.reasons.add(`${guide.label}へのセオリー対策候補。`);
    scored.set(key, current);
  });

  return QUICK_PERK_ROLES.reduce((grouped, role) => {
    grouped[role.role] = [...scored.values()]
      .map((item) => ({ ...item, hero: findHeroByKey(item.key) }))
      .filter((item) => item.hero?.role === role.role)
      .sort((a, b) => b.score - a.score || a.hero.name.localeCompare(b.hero.name, "ja"))
      .slice(0, 4)
      .map((item) => ({
        key: item.key,
        hero: item.hero,
        score: item.score,
        reason: buildEnemyCounterReason(item),
      }));
    return grouped;
  }, {});
}

function buildEnemyCounterReason(item) {
  const targets = [...item.targets].slice(0, 2).join(" / ");
  const reason = [...item.reasons][0] || "相手の勝ち筋を止めやすい。";
  return targets ? `${targets}に有効。${reason}` : reason;
}

function buildEnemyCounterPriority(enemyHeroes, guide) {
  const supportCount = enemyHeroes.filter((hero) => hero.role === "support").length;
  const damageNames = enemyHeroes.filter((hero) => hero.role === "damage").map((hero) => hero.name).slice(0, 2);
  if (guide === ENEMY_COMP_COUNTER_GUIDES.dive) {
    return "最初に味方サポートを守る。飛んできた敵を1人決めて全員で撃つ。";
  }
  if (guide === ENEMY_COMP_COUNTER_GUIDES.poke) {
    return "長射線を切ってから前へ出る。先に削られたら当たらず集合し直す。";
  }
  if (guide === ENEMY_COMP_COUNTER_GUIDES.brawl) {
    return "相手が近づく前に削る。スピードやバリアを使わせたら角を下がって受ける。";
  }
  if (damageNames.length) {
    return `${damageNames.join(" / ")}の射線や奇襲を最初に確認し、1デス目を防ぐ。`;
  }
  return supportCount ? "相手サポートの自衛スキルを使わせてから、同じ敵へフォーカスする。" : "相手の起点スキルを1つ決めて、使った直後に前へ出る。";
}

function renderEnemyChip(hero) {
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="relation-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;
  return `
    <button class="enemy-chip" type="button" data-hero-key="${escapeAttr(hero.key)}" title="${escapeAttr(hero.name)}">
      ${portrait}
      <span>
        <strong>${escapeHtml(hero.name)}</strong>
        <small>${escapeHtml(roleLabel(hero.role))}</small>
      </span>
    </button>
  `;
}

function renderEnemyCounterRole(role, recommendations) {
  return `
    <section class="enemy-counter-role">
      <div class="role-matchup-head">
        <span>${escapeHtml(role.label)}</span>
        <strong>${escapeHtml(role.ja)}の候補</strong>
        <small>${recommendations.length ? "クリックで詳細" : "候補なし"}</small>
      </div>
      <div class="enemy-counter-candidates">
        ${recommendations.length ? recommendations.map(renderEnemyCounterCandidate).join("") : renderEmpty("敵キャラを増やすと候補が出ます")}
      </div>
    </section>
  `;
}

function renderEnemyCounterCandidate(item) {
  const portrait = item.hero.portrait
    ? `<img src="${safeUrl(item.hero.portrait)}" alt="">`
    : `<span class="relation-placeholder">${escapeHtml(item.hero.name.slice(0, 2))}</span>`;
  return `
    <button class="enemy-counter-candidate" type="button" data-hero-key="${escapeAttr(item.hero.key)}" title="${escapeAttr(item.hero.name)}">
      ${portrait}
      <span>
        <strong>${escapeHtml(item.hero.name)}</strong>
        <small>${escapeHtml(item.reason)}</small>
      </span>
    </button>
  `;
}

function renderSynergyMapControls() {
  if (!els.centerHeroGrid || !els.synergyMap) {
    return;
  }
  const heroes = sortHeroesForQuickPerks(state.heroes);
  const preferred = state.synergyHeroKey || state.selectedHeroKey || heroes[0]?.key || "";
  const selected = heroes.some((hero) => hero.key === preferred) ? preferred : heroes[0]?.key || "";
  state.synergyHeroKey = selected;
  els.centerHeroGrid.innerHTML = heroes.map((hero) => renderCenterHeroButton(hero, selected)).join("");
  els.centerHeroGrid.querySelectorAll("[data-synergy-hero-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.synergyHeroKey = button.dataset.synergyHeroKey;
      renderSynergyMapControls();
    });
  });
  renderSynergyMap();
}

function renderCenterHeroButton(hero, selected) {
  const active = hero.key === selected ? " is-active" : "";
  const favorite = state.favoriteHeroKeys.has(hero.key) ? " is-favorite" : "";
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="center-hero-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;
  return `
    <button class="center-hero-button${active}${favorite}" type="button" data-synergy-hero-key="${escapeAttr(hero.key)}" aria-pressed="${active ? "true" : "false"}" title="${escapeAttr(hero.name)}">
      ${portrait}
      <span>${state.favoriteHeroKeys.has(hero.key) ? "★ " : ""}${escapeHtml(hero.name)}</span>
    </button>
  `;
}

function renderSynergyMap() {
  if (!els.synergyMap) {
    return;
  }
  const hero = findHeroByKey(state.synergyHeroKey) || state.heroes[0];
  if (!hero) {
    els.synergyMap.innerHTML = renderEmpty("ヒーロー取得中");
    return;
  }
  const synergy = buildHeroSynergy(hero);
  const counters = getHeroCounters(hero);
  els.synergyMap.innerHTML = `
    <div class="relation-diagram">
      <section class="relation-column is-good">
        <h4>相性がいい味方</h4>
        <div class="relation-node-list">
          ${synergy.allies.map((ally) => renderRelationNode(ally, "good")).join("")}
        </div>
      </section>
      <div class="relation-center">
        ${renderRelationHero(hero)}
        <div class="relation-arrows" aria-hidden="true">
          <span>味方</span>
          <strong>相性</strong>
          <span>苦手</span>
        </div>
      </div>
      <section class="relation-column is-bad">
        <h4>苦手な相手</h4>
        <div class="relation-node-list">
          ${counters.map((counter) => renderRelationNode(counter, "bad")).join("")}
        </div>
      </section>
    </div>
    <div class="relation-overview">
      <div class="panel-title">
        <h3>相性一覧</h3>
        <span class="chip">全ロール</span>
      </div>
      <div class="relation-table">
        ${sortHeroesForQuickPerks(state.heroes).map(renderRelationTableRow).join("")}
      </div>
    </div>
    <div class="role-matchup-overview">
      <div class="panel-title">
        <h3>ロール別 相性表</h3>
        <span class="chip">Tank / Damage / Support</span>
      </div>
      <div class="role-matchup-grid">
        ${QUICK_PERK_ROLES.map(renderRoleMatchupSection).join("")}
      </div>
    </div>
  `;
  els.synergyMap.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function renderRoleMatchupSection(role) {
  const heroes = sortHeroesForQuickPerks(state.heroes.filter((hero) => hero.role === role.role));
  return `
    <section class="role-matchup-section">
      <div class="role-matchup-head">
        <span>${escapeHtml(role.label)}</span>
        <strong>${escapeHtml(role.ja)}</strong>
        <small>${heroes.length} Heroes</small>
      </div>
      <div class="relation-table">
        ${heroes.length ? heroes.map(renderRelationTableRow).join("") : renderEmpty("ヒーロー取得中")}
      </div>
    </section>
  `;
}

function renderRelationHero(hero) {
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="relation-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;
  return `
    <button class="relation-hero" type="button" data-hero-key="${escapeAttr(hero.key)}" title="${escapeAttr(hero.name)}">
      ${portrait}
      <span>
        <strong>${escapeHtml(hero.name)}</strong>
        <small>${escapeHtml(roleLabel(hero.role))}</small>
      </span>
    </button>
  `;
}

function renderRelationNode(relation, tone) {
  const hero = findHeroByKey(relation.key);
  const name = hero?.name || heroName(relation.key);
  const portrait = hero?.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="relation-placeholder">${escapeHtml(name.slice(0, 2))}</span>`;
  const keyAttr = hero ? ` data-hero-key="${escapeAttr(hero.key)}"` : "";
  const disabled = hero ? "" : " disabled";
  return `
    <button class="relation-node is-${escapeAttr(tone)}" type="button"${keyAttr}${disabled} title="${escapeAttr(name)}">
      ${portrait}
      <span>
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(relation.reason)}</small>
      </span>
    </button>
  `;
}

function renderRelationTableRow(hero) {
  const synergy = buildHeroSynergy(hero).allies.slice(0, 3).map((ally) => heroName(ally.key)).join(" / ");
  const counters = getHeroCounters(hero).slice(0, 3).map((counter) => heroName(counter.key)).join(" / ");
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="relation-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;
  return `
    <button class="relation-row" type="button" data-hero-key="${escapeAttr(hero.key)}" title="${escapeAttr(hero.name)}">
      <span class="relation-row-hero">
        ${portrait}
        <span>
          <strong>${escapeHtml(hero.name)}</strong>
          <small>${escapeHtml(roleLabel(hero.role))}</small>
        </span>
      </span>
      <span><small>相性良い</small>${escapeHtml(synergy)}</span>
      <span><small>苦手</small>${escapeHtml(counters)}</span>
    </button>
  `;
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
    <button class="comp-member" type="button"${keyAttr}${disabled} title="${escapeAttr(name)}">
      ${portrait}
      <span>
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(labelRole(member.role || hero?.role))} · ${escapeHtml(detail)}</small>
      </span>
    </button>
  `;
}

function selectHeroFromInline(heroKey) {
  selectHero(heroKey, { resetFilters: true, switchView: true, scrollTarget: "detail" });
}

function openHeroGuide(heroKey) {
  state.guideFilters.hero = heroKey;
  setActiveView("guides", { updateHash: true, scroll: false });
  renderGuideControls();
  renderGuides();
  document.querySelector("#guides")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function selectHero(heroKey, options = {}) {
  if (!heroKey) {
    return;
  }
  state.selectedHeroKey = heroKey;
  if (options.resetFilters) {
    state.role = "all";
    state.query = "";
    els.heroSearch.value = "";
    els.roleButtons.forEach((item) => {
      const active = item.dataset.role === "all";
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  if (options.switchView) {
    setActiveView("heroes", { updateHash: false, scroll: false });
  }
  renderHeroList();
  renderHeroDetail();
  updateHeroHash(heroKey);
  if (options.scrollTarget === "detail") {
    els.heroDetail?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (options.scrollTarget === "section" || options.scrollIntoView) {
    document.querySelector("#heroes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderHeroList() {
  const heroes = getFilteredHeroes();
  els.heroCount.textContent = `${heroes.length} Heroes`;
  renderHeroMapNote();

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
    updateHeroHash(state.selectedHeroKey);
  }

  els.heroList.innerHTML = heroes.map((hero) => renderHeroRow(hero)).join("");
  els.heroList.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => {
      selectHero(button.dataset.heroKey);
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
  const mapStage = getSelectedMapStageFilter();
  const mapFits = mapStage ? heroFitsStage(hero, mapStage) : false;
  const mapFitReason = mapFits ? heroStageFitReason(hero, mapStage) : "";
  const mapFitMark = mapFits ? `<span class="map-fit-mark" title="${escapeAttr(mapFitReason)}">◎</span>` : "";
  const mapFitLine = mapFits ? `<small class="map-fit-reason">${escapeHtml(mapFitReason)}</small>` : "";
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="hero-row-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;

  return `
    <button class="hero-row${active}${favorite}" type="button" data-hero-key="${escapeAttr(hero.key)}" title="${escapeAttr(hero.name)}">
      ${portrait}
      <span>
        <strong>${favoriteMark}${mapFitMark}<span class="hero-row-name">${escapeHtml(hero.name)}</span></strong>
        <small>${escapeHtml(labelRole(hero.role))} · Pick ${pickRate} · Win ${winRate}</small>
        ${mapFitLine}
      </span>
      <span class="role-badge">${escapeHtml(shortRole(hero.role))}</span>
    </button>
  `;
}

function renderHeroMapNote() {
  if (!els.heroMapNote) {
    return;
  }
  const stage = getSelectedMapStageFilter();
  if (!stage) {
    els.heroMapNote.hidden = true;
    els.heroMapNote.textContent = "";
    return;
  }
  els.heroMapNote.hidden = false;
  els.heroMapNote.textContent = `${stage.name}(${stage.rule} · ${stage.style})向きのヒーローに ◎ を付けて上に表示しています。`;
}

function getSelectedMapStageFilter() {
  if (!state.mapFilter || state.mapFilter === "all") {
    return null;
  }
  return state.maps.find((stage) => stage.key === state.mapFilter) || null;
}

function heroFitsStage(hero, stage) {
  const tankGuide = hero.role === "tank" ? TANK_GUIDES[hero.key] : null;
  if (tankGuide) {
    return tankGuide.styles.includes(stage.style);
  }
  const archetypes = getHeroArchetypes(hero.key);
  const primaryType = archetypes[0] || roleFallbackArchetype(hero.role);
  return mapStylesForArchetype(primaryType).includes(stage.style);
}

function heroStageFitReason(hero, stage) {
  const tankGuide = hero.role === "tank" ? TANK_GUIDES[hero.key] : null;
  if (tankGuide) {
    return tankGuide.note;
  }
  const archetypes = getHeroArchetypes(hero.key);
  const primaryType = archetypes[0] || roleFallbackArchetype(hero.role);
  const guide = ARCHETYPE_PLAYSTYLE_GUIDES[primaryType];
  return guide ? `${guide.label}寄りの動きが${stage.style}で活きやすい。` : `${stage.style}に合うヒーロー。`;
}

function getFilteredHeroes() {
  return sortHeroesForList(state.heroes.filter((hero) => {
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
    const playstyle = buildHeroPlaystyle(hero);
    const synergy = buildHeroSynergy(hero);
    const counters = getHeroCounters(hero);
    const combos = getHeroCombos(hero);
    const fields = [
      hero.name,
      hero.key,
      hero.role,
      detail?.description,
      playstyle.summary,
      playstyle.avoid,
      ...playstyle.tips,
      ...combos.flatMap((combo) => [combo.title, combo.note, ...(combo.steps || [])]),
      ...synergy.allies.flatMap((ally) => [heroName(ally.key), ally.reason]),
      ...counters.flatMap((counter) => [heroName(counter.key), counter.reason]),
      ...(detail?.abilities || []).flatMap((ability) => [ability.name, ability.description]),
      ...perks.minor.flatMap((perk) => [perk.name, perk.description]),
      ...perks.major.flatMap((perk) => [perk.name, perk.description]),
    ];
    return fields.filter(Boolean).join(" ").toLowerCase().includes(state.query);
  }));
}

function sortHeroesForList(heroes) {
  const stage = getSelectedMapStageFilter();
  return heroes
    .map((hero, index) => ({ hero, index }))
    .sort((a, b) => {
      const aFavorite = state.favoriteHeroKeys.has(a.hero.key) ? 1 : 0;
      const bFavorite = state.favoriteHeroKeys.has(b.hero.key) ? 1 : 0;
      if (aFavorite !== bFavorite) {
        return bFavorite - aFavorite;
      }
      if (stage) {
        const aFit = heroFitsStage(a.hero, stage) ? 1 : 0;
        const bFit = heroFitsStage(b.hero, stage) ? 1 : 0;
        if (aFit !== bFit) {
          return bFit - aFit;
        }
      }
      return a.index - b.index;
    })
    .map((item) => item.hero);
}

function sortHeroesForQuickPerks(heroes) {
  return [...heroes].sort((a, b) => {
    const aFavorite = state.favoriteHeroKeys.has(a.key) ? 1 : 0;
    const bFavorite = state.favoriteHeroKeys.has(b.key) ? 1 : 0;
    if (aFavorite !== bFavorite) {
      return bFavorite - aFavorite;
    }
    return a.name.localeCompare(b.name, "ja");
  });
}

function renderQuickPerkBoard() {
  if (!els.quickPerkBoard) {
    return;
  }
  els.quickPerkBoard.innerHTML = QUICK_PERK_ROLES.map((role) => renderQuickPerkRole(role)).join("");
  els.quickPerkBoard.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function renderQuickPerkRole(role) {
  const heroes = sortHeroesForQuickPerks(state.heroes.filter((hero) => hero.role === role.role));
  return `
    <section class="quick-perk-role">
      <div class="quick-perk-role-head">
        <span>
          <strong>${escapeHtml(role.ja)}</strong>
          <small>${escapeHtml(role.label)}</small>
        </span>
        <em>${heroes.length}</em>
      </div>
      <div class="quick-perk-list">
        ${heroes.length ? heroes.map((hero) => renderQuickPerkRow(hero)).join("") : renderEmpty("ヒーロー取得中")}
      </div>
    </section>
  `;
}

function renderQuickPerkRow(hero) {
  const minor = getRecommendedPerk(hero, "minor");
  const major = getRecommendedPerk(hero, "major");
  const favorite = state.favoriteHeroKeys.has(hero.key);
  const portrait = hero.portrait
    ? `<img class="quick-perk-avatar" src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="quick-perk-avatar is-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;
  return `
    <button class="quick-perk-row${favorite ? " is-favorite" : ""}" type="button" data-hero-key="${escapeAttr(hero.key)}" title="${escapeAttr(hero.name)}">
      <span class="quick-perk-hero">
        ${portrait}
        <span class="quick-perk-hero-text">
          <strong>${favorite ? "★ " : ""}${escapeHtml(hero.name)}</strong>
          <small>${escapeHtml(roleLabel(hero.role))}</small>
        </span>
      </span>
      ${renderQuickPerkCell("Minor", minor)}
      ${renderQuickPerkCell("Major", major)}
    </button>
  `;
}

function roleLabel(role) {
  return QUICK_PERK_ROLES.find((item) => item.role === role)?.ja || role || "";
}

function renderQuickPerkCell(label, entry) {
  if (!entry) {
    return `
      <span class="quick-perk-cell is-loading">
        <small>${escapeHtml(label)}</small>
        <span>取得中</span>
      </span>
    `;
  }
  const usageLabel = Number.isFinite(entry.usage)
    ? `${entry.usage}%`
    : entry.analysis.level.replace("採用目安 ", "");
  const icon = entry.perk.icon
    ? `<img class="quick-perk-icon" src="${safeUrl(entry.perk.icon)}" alt="">`
    : '<span class="quick-perk-icon is-placeholder"></span>';
  return `
    <span class="quick-perk-cell is-${escapeAttr(entry.analysis.levelKey)}">
      <small>${escapeHtml(label)} · ${escapeHtml(usageLabel)}</small>
      <span class="quick-perk-main">
        ${icon}
        <span>${escapeHtml(entry.perk.name || "Unknown")}</span>
      </span>
    </span>
  `;
}

function getRecommendedPerk(hero, type) {
  const detail = state.heroDetails.get(hero.key);
  if (!detail || detail.error) {
    return null;
  }
  const stat = state.heroStats.get(hero.key);
  const perks = normalizePerks(detail.perks)[type] || [];
  return perks
    .map((perk, index) => {
      const usage = getOwPerksUsage(hero, type, index);
      return { perk, index, usage, analysis: analyzePerk(perk, index, type, hero, stat, usage) };
    })
    .sort((a, b) => b.analysis.score - a.analysis.score || a.index - b.index)[0] || null;
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
          <a class="chip" href="${safeUrl(OWPERKS_SOURCE_URL)}" target="_blank" rel="noreferrer">owperks使用率参考</a>
        </div>
        ${renderPerkGroup("Minor Perk", perks.minor, "minor", hero, stat)}
        ${renderPerkGroup("Major Perk", perks.major, "major", hero, stat)}
      </section>

      <section>
        ${renderPlaystylePanel(hero)}
        ${renderHeroComboPanel(hero)}
        ${renderSynergyPanel(hero)}
        ${renderCounterPanel(hero)}
        ${renderCounterplayPanel(hero)}
        ${renderHeroLearningPanel(hero)}
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
  els.heroDetail.querySelector("[data-open-hero-guide]")?.addEventListener("click", () => {
    openHeroGuide(hero.key);
  });
  els.heroDetail.querySelectorAll(".counter-card[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function renderHeroVisual(hero, detail) {
  const background = pickBackground(detail?.backgrounds);
  const hitpoints = formatHitpoints(detail?.hitpoints);
  const location = detail?.location ? `<span class="chip">${escapeHtml(detail.location)}</span>` : "";
  const hp = hitpoints.label ? `<span class="chip">${escapeHtml(hitpoints.label)}</span>` : "";
  const subrole = hero.subrole ? `<span class="chip">${escapeHtml(hero.subrole)}</span>` : "";
  const favorite = state.favoriteHeroKeys.has(hero.key);
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="${escapeAttr(hero.name)}">`
    : `<span class="portrait-placeholder">${escapeHtml(hero.name)}</span>`;

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
          <div class="hero-title-actions">
            <button class="favorite-button${favorite ? " is-on" : ""}" type="button" data-favorite-toggle aria-pressed="${favorite ? "true" : "false"}">
              <span>${favorite ? "★" : "☆"}</span>
              ${favorite ? "お気に入り解除" : "お気に入り"}
            </button>
            <button class="favorite-button" type="button" data-open-hero-guide>
              攻略を見る
            </button>
          </div>
        </div>
        <p>${escapeHtml(detail?.description || "データ取得中")}</p>
      </div>
      <div class="portrait-wrap">
        ${portrait}
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
  const entries = perks
    .map((perk, index) => {
      const usage = getOwPerksUsage(hero, type, index);
      return { perk, index, usage, analysis: analyzePerk(perk, index, type, hero, stat, usage) };
    })
    .sort((a, b) => b.analysis.score - a.analysis.score || a.index - b.index);
  const recommendedOriginalIndex = entries[0]?.index ?? -1;
  return `
    <div class="perk-group">
      <span class="perk-type">${escapeHtml(label)}</span>
      <div class="perk-grid">
        ${entries.length ? entries.map((entry) => renderPerkCard(entry.perk, entry.analysis, entry.index === recommendedOriginalIndex, entry.usage)).join("") : renderEmpty("パークを取得できませんでした。")}
      </div>
    </div>
  `;
}

function renderPerkCard(perk, analysis, recommended, usage) {
  const icon = perk.icon ? `<img src="${safeUrl(perk.icon)}" alt="">` : '<span></span>';
  const usageBadge = Number.isFinite(usage) ? `<span class="popular-perk">${escapeHtml(formatOwPerksUsage(usage))}</span>` : "";
  const recommendedBadge = recommended ? '<span class="popular-perk">★ よく使う候補</span>' : "";
  return `
    <article class="perk-card${recommended ? " is-recommended" : ""}">
      ${icon}
      <div>
        <div class="perk-card-head">
          <h4>${escapeHtml(perk.name || "Unknown")}</h4>
          ${usageBadge}
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

function getOwPerksUsage(hero, type, index) {
  const usage = OWPERKS_USAGE[owperksHeroKey(hero)];
  const values = usage?.[type];
  if (!Array.isArray(values)) {
    return NaN;
  }
  return Number(values[index]);
}

function owperksHeroKey(hero) {
  const key = hero?.key || "";
  const aliases = {
    "d-va": "dva",
    "junkerqueen": "junker-queen",
    "soldier76": "soldier-76",
    "wreckingball": "wrecking-ball",
    "tobjorn": "torbjorn",
  };
  const normalized = key.toLowerCase().replace(/[^a-z0-9-]/g, "");
  return aliases[normalized] || normalized;
}

function formatOwPerksUsage(value) {
  if (value >= 70) {
    return `使用率 高 ${value}%`;
  }
  if (value >= 55) {
    return `使用率 中 ${value}%`;
  }
  return `使用率 ${value}%`;
}

function analyzePerk(perk, index, type, hero, stat, usage) {
  const text = `${perk.name || ""} ${perk.description || ""}`.toLowerCase();
  const pick = numberFromStat(stat, ["pickrate", "pick_rate"]);
  const win = numberFromStat(stat, ["winrate", "win_rate"]);
  const isPopularHero = Number.isFinite(pick) && pick >= 10;
  const isWinningHero = Number.isFinite(win) && win >= 50;
  const isMajor = type === "major";

  if (Number.isFinite(usage) && usage >= 70) {
    return {
      levelKey: "high",
      level: "採用目安 高",
      score: 5 + usage / 100,
      situation: "迷った時・まず試す候補",
      reason: `owperksのコミュニティ投票で${usage}%と高め。まずこのパークから試して、相手構成で変える。`,
    };
  }
  if (Number.isFinite(usage) && usage >= 55) {
    return {
      levelKey: "medium",
      level: "採用目安 中",
      score: 4 + usage / 100,
      situation: "標準候補・構成に合わせる",
      reason: `owperksのコミュニティ投票で${usage}%。標準寄りだが、マップや相手で入れ替える余地がある。`,
    };
  }

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
  const icon = ability.icon ? `<img src="${safeUrl(ability.icon)}" alt="">` : '<span class="ability-placeholder"></span>';
  return `
    <article class="ability-card">
      ${icon}
      <div>
        <h4>${escapeHtml(ability.name || "Unknown")}</h4>
        <p>${escapeHtml(ability.description || "")}</p>
      </div>
    </article>
  `;
}

function renderHeroComboPanel(hero) {
  const combos = getHeroCombos(hero);
  if (!combos.length) {
    return "";
  }
  return `
    <div class="combo-panel">
      <div class="panel-title">
        <h3>固有コンボ</h3>
        <span class="chip">${combos.length}</span>
      </div>
      <div class="combo-list">
        ${combos.map(renderHeroComboCard).join("")}
      </div>
    </div>
  `;
}

function renderHeroComboCard(combo) {
  return `
    <article class="combo-card">
      <h4>${escapeHtml(combo.title)}</h4>
      <ol>
        ${(combo.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
      <p>${escapeHtml(combo.note || "")}</p>
    </article>
  `;
}

function getHeroCombos(hero) {
  const direct = HERO_COMBO_GUIDES[hero?.key];
  const normalized = HERO_COMBO_GUIDES[owperksHeroKey(hero)];
  return direct || normalized || [];
}

function renderPlaystylePanel(hero) {
  const guide = buildHeroPlaystyle(hero);
  return `
    <div class="playstyle-panel">
      <div class="panel-title">
        <h3>立ち回り</h3>
        <span class="chip">${escapeHtml(guide.badge)}</span>
      </div>
      <p>${escapeHtml(guide.summary)}</p>
      <ul>
        ${guide.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
      </ul>
      <div class="playstyle-avoid">
        <strong>やりすぎ注意</strong>
        <span>${escapeHtml(guide.avoid)}</span>
      </div>
    </div>
  `;
}

function buildHeroPlaystyle(hero) {
  const roleGuide = ROLE_PLAYSTYLE_GUIDES[hero.role] || ROLE_PLAYSTYLE_GUIDES.damage;
  const archetypes = getHeroArchetypes(hero.key);
  const primaryType = archetypes[0] || roleFallbackArchetype(hero.role);
  const archetypeGuide = ARCHETYPE_PLAYSTYLE_GUIDES[primaryType] || ARCHETYPE_PLAYSTYLE_GUIDES.poke;
  const tips = [...archetypeGuide.tips, ...roleGuide.tips].slice(0, 5);
  return {
    badge: `${labelRole(hero.role)} · ${archetypeGuide.label}`,
    summary: `${hero.name}は「${roleGuide.title}」を意識しつつ、${archetypeGuide.label}の距離で価値を出す。`,
    tips,
    avoid: roleGuide.avoid,
  };
}

function getHeroArchetypes(heroKey) {
  return Object.entries(HERO_ARCHETYPES)
    .filter(([, keys]) => keys.includes(heroKey))
    .map(([type]) => type);
}

function roleFallbackArchetype(role) {
  if (role === "tank") return "brawl";
  if (role === "support") return "poke";
  return "poke";
}

function renderCounterPanel(hero) {
  const counters = getHeroCounters(hero);
  return `
    <div class="counter-panel">
      <div class="panel-title">
        <h3>苦手な相手</h3>
        <span class="chip">${hero.role === "tank" ? "Tank重視" : "目安"}</span>
      </div>
      <div class="counter-grid">
        ${counters.map(renderCounterCard).join("")}
      </div>
    </div>
  `;
}

function renderCounterplayPanel(hero) {
  const counterplay = buildHeroCounterplay(hero);
  return `
    <div class="counterplay-panel">
      <div class="panel-title">
        <h3>このキャラへの対策</h3>
        <span class="chip">${escapeHtml(counterplay.badge)}</span>
      </div>
      <div class="counterplay-grid">
        ${renderGuidePoint("狙い方", counterplay.focus)}
        ${renderGuidePoint("立ち位置", counterplay.position)}
        ${renderGuidePoint("スキル管理", counterplay.cooldown)}
        ${renderGuidePoint("注意点", counterplay.warning)}
      </div>
      <div class="counterplay-counters">
        <h4>有効な対策キャラ</h4>
        <div class="counter-grid">
          ${counterplay.counters.map(renderCounterCard).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderHeroLearningPanel(hero) {
  const query = encodeURIComponent(`${hero.name} ${hero.key} 立ち回り OW2`);
  const youtubeSearch = `${HERO_LEARNING_LINKS.defaultSearchBase}${query}`;
  return `
    <div class="learning-link-panel">
      <div class="panel-title">
        <h3>立ち回り動画・学習リンク</h3>
        <span class="chip">Learning</span>
      </div>
      <div class="learning-links">
        <a href="${safeUrl(youtubeSearch)}" target="_blank" rel="noreferrer">YouTubeで${escapeHtml(hero.name)}の立ち回りを探す</a>
        <a href="${safeUrl(HERO_LEARNING_LINKS.defaultOfficial)}" target="_blank" rel="noreferrer">公式YouTubeを見る</a>
        <a href="${safeUrl(HERO_LEARNING_LINKS.officialNews)}" target="_blank" rel="noreferrer">公式ニュースで更新を確認</a>
      </div>
      <p>動画を見る時は、エイムより「立ち位置」「スキルを使う前後」「ULTを合わせる相手」を見ると上達につながりやすい。</p>
    </div>
  `;
}

function buildHeroCounterplay(hero) {
  const override = HERO_COUNTERPLAY_OVERRIDES[hero.key] || HERO_COUNTERPLAY_OVERRIDES[owperksHeroKey(hero)];
  if (override) {
    return {
      badge: "キャラ固有対策",
      focus: override.focus,
      position: override.position,
      cooldown: override.cooldown,
      warning: override.warning,
      counters: getHeroCounters(hero),
    };
  }

  const archetypes = getHeroArchetypes(hero.key);
  const primaryType = archetypes[0] || roleFallbackArchetype(hero.role);
  const rolePlan = {
    tank: {
      focus: "正面で硬さに付き合い続けず、阻害、不和、孤立、移動スキル後を味方全員で狙う。",
      position: "タンクの得意距離に入り続けない。角を使って射線を切り、横からサポートやDPSに圧をかける。",
      cooldown: "防御、移動、自己回復を使った直後が攻め時。先にスキルを吐かせてから詰める。",
      warning: "タンクだけ撃ってキルできない時は、後ろのサポートを下げさせる動きに切り替える。",
    },
    damage: {
      focus: "単独行動や撃った後の帰り道を狙う。逃げスキルを使わせてから、味方と同じタイミングで詰める。",
      position: "射線に出っぱなしにせず、横や高台から撃たれたら一度角に戻る。",
      cooldown: "機動力、自衛、バースト火力のスキルを見てから勝負する。先に無理に追わない。",
      warning: "1対1にこだわりすぎず、味方と同じ敵を見るだけで倒しやすくなる。",
    },
    support: {
      focus: "自衛スキルや逃げスキルを先に使わせてから倒す。回復役を下げさせるだけでも前線が楽になる。",
      position: "サポートの射線を切り、回復が届かない角や高台へ相手を動かす。",
      cooldown: "鈴、阻害、無敵、移動などの重要スキルを使った直後に攻める。",
      warning: "深追いして自分が倒れると逆効果。帰り道を残して圧をかける。",
    },
  }[hero.role] || {};
  const archetypePlan = {
    brawl: "近距離の殴り合いが得意なので、短い通路で受けず、引きながら削る。",
    dive: "一気に入ってくるため、孤立しないで合流し、着地後や帰り際を狙う。",
    poke: "長い射線が得意なので、正面で撃ち合わず遮蔽物をつなぐ。",
    pick: "ワンピック狙いが強いので、単独行動を避け、見られている射線を切る。",
  }[primaryType] || "相手の得意距離を避け、味方と同じタイミングで狙う。";
  const counters = getHeroCounters(hero);
  return {
    badge: `${labelRole(hero.role)}対策`,
    focus: rolePlan.focus,
    position: `${rolePlan.position} ${archetypePlan}`,
    cooldown: rolePlan.cooldown,
    warning: rolePlan.warning,
    counters,
  };
}

function renderSynergyPanel(hero) {
  const synergy = buildHeroSynergy(hero);

  return `
    <div class="synergy-panel">
      <div class="panel-title">
        <h3>相性がいい味方</h3>
        <span class="chip">${escapeHtml(synergy.label)}</span>
      </div>
      <div class="counter-grid">
        ${synergy.allies.map((ally) => renderCounterCard(ally)).join("")}
      </div>

      <div class="tank-map-panel">
        <div class="panel-title">
          <h3>向いているマップ</h3>
          <span class="chip">${escapeHtml(synergy.styles.join(" / "))}</span>
        </div>
        <p>${escapeHtml(synergy.note)}</p>
        <div class="tank-map-list">
          ${synergy.maps.map(renderTankMapChip).join("")}
        </div>
      </div>
    </div>
  `;
}

function buildHeroSynergy(hero) {
  const tankGuide = TANK_GUIDES[hero.key];
  if (hero.role === "tank" && tankGuide) {
    return {
      label: "具体例",
      allies: tankGuide.allies.map(([key, reason]) => ({ key, reason })),
      styles: tankGuide.styles,
      maps: tankGuide.maps,
      note: tankGuide.note,
    };
  }

  const archetypes = getHeroArchetypes(hero.key);
  const primaryType = archetypes[0] || roleFallbackArchetype(hero.role);
  const roleAllies = ROLE_SYNERGY_GUIDES[hero.role] || ROLE_SYNERGY_GUIDES.damage;
  const style = ARCHETYPE_PLAYSTYLE_GUIDES[primaryType]?.label || "標準";
  return {
    label: `${style}相性`,
    allies: roleAllies.map(([key, reason]) => ({ key, reason })),
    styles: mapStylesForArchetype(primaryType),
    maps: mapExamplesForArchetype(primaryType),
    note: `${style}寄りの動きがしやすいマップで、味方と同じ敵を見ると価値を出しやすい。`,
  };
}

function mapStylesForArchetype(type) {
  if (type === "dive" || type === "pick") return ["高台", "広い移動"];
  if (type === "brawl") return ["狭所乱戦"];
  return ["長射線", "高台"];
}

function mapExamplesForArchetype(type) {
  if (type === "dive") return ["Watchpoint: Gibraltar", "Numbani", "Dorado"];
  if (type === "pick") return ["Circuit Royal", "Havana", "Junkertown"];
  if (type === "brawl") return ["King's Row", "Lijiang Tower", "Eichenwalde"];
  return ["Circuit Royal", "Havana", "Shambali Monastery"];
}

function renderTankMapChip(mapName) {
  const stage = state.maps.find((item) => item.name === mapName) || FALLBACK_STAGES.find((item) => item.name === mapName);
  const meta = stage ? `${stage.rule} · ${stage.style}` : "Map";
  return `
    <span class="tank-map-chip" title="${escapeAttr(mapName)}">
      <strong>${escapeHtml(mapName)}</strong>
      <small>${escapeHtml(meta)}</small>
    </span>
  `;
}

function getHeroCounters(hero) {
  const direct = HERO_COUNTERS[hero.key];
  if (direct) {
    return direct.map(([key, reason]) => ({ key, reason }));
  }

  const fallback = {
    damage: [
      ["dva", "射線や高台への圧を消され、火力を通しにくい。"],
      ["winston", "後衛や高台に直接触られると安全に撃ちにくい。"],
      ["kiriko", "鈴と機動力でワンピックや状態異常を返されやすい。"],
    ],
    support: [
      ["tracer", "横や裏から継続的に触られると回復の手が止まる。"],
      ["sombra", "ハックと奇襲で自衛スキルのタイミングを崩される。"],
      ["winston", "バリアで射線を切られ、味方から分断されやすい。"],
    ],
    tank: [
      ["ana", "阻害とスリープで前に出る時間を止められる。"],
      ["zenyatta", "不和で耐久を削られ、下がる判断を迫られる。"],
      ["sombra", "重要な防御/移動スキルをハックで崩される。"],
    ],
  };
  return fallback[hero.role] || fallback.damage;
}

function renderCounterCard(counter) {
  const hero = state.heroes.find((item) => item.key === counter.key);
  const name = hero?.name || heroName(counter.key);
  const portrait = hero?.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="counter-placeholder">${escapeHtml(name.slice(0, 2))}</span>`;
  const keyAttr = hero ? ` data-hero-key="${escapeAttr(hero.key)}"` : "";
  const disabled = hero ? "" : " disabled";
  return `
    <button class="counter-card" type="button"${keyAttr}${disabled}>
      ${portrait}
      <span>
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(counter.reason)}</small>
      </span>
    </button>
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

function readCache(options = {}) {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!cached || !cached.timestamp) {
      return null;
    }
    const stale = Date.now() - cached.timestamp > CACHE_MS;
    if (stale && !options.allowStale) {
      return null;
    }
    return stale ? { ...cached, stale: true } : cached;
  } catch {
    return null;
  }
}

function hydrateFromCache(cached) {
  state.heroes = mergeExtraHeroes(cached.heroes || []);
  state.heroDetails = new Map(cached.heroDetails || []);
  Object.entries(EXTRA_HERO_DETAILS).forEach(([key, detail]) => {
    if (state.heroes.find((hero) => hero.key === key)?.localDetail) {
      state.heroDetails.set(key, detail);
    }
  });
  state.heroStats = new Map(cached.heroStats || []);
  state.maps = normalizeStages(cached.maps || FALLBACK_STAGES);
  if (!applyPendingHeroSelection(state.heroes)) {
    state.selectedHeroKey = state.heroes[0]?.key || null;
  }
}

function writeCache() {
  const payload = {
    timestamp: Date.now(),
    heroes: state.heroes,
    heroDetails: [...state.heroDetails.entries()],
    heroStats: [...state.heroStats.entries()],
    maps: state.maps,
  };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error(error);
  }
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
  try {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify([...state.favoriteHeroKeys]));
  } catch (error) {
    console.error(error);
  }
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

function updateTopbarVisibility() {
  if (!els.topbar) {
    return;
  }
  const current = window.scrollY || 0;
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const delta = current - lastScrollY;
  const shouldHide = isMobile && current > 120 && delta > 4;
  const shouldShow = !isMobile || delta < -2 || current < 80;
  if (shouldHide) {
    els.topbar.classList.add("is-hidden");
  } else if (shouldShow) {
    els.topbar.classList.remove("is-hidden");
  }
  lastScrollY = current;
}

function setSelectOptions(select, options, selectedValue) {
  if (!select) {
    return;
  }
  const values = new Set(options.map((option) => option.value));
  const fallbackValue = values.has("all") ? "all" : options[0]?.value || "";
  const nextValue = values.has(selectedValue) ? selectedValue : fallbackValue;
  if (nextValue !== selectedValue) {
    if (select === els.compRuleFilter) {
      state.compFilters.rule = nextValue;
    } else if (select === els.compStageFilter) {
      state.compFilters.stage = nextValue;
    }
  }

  select.innerHTML = options
    .map((option) => {
      const selected = option.value === nextValue ? " selected" : "";
      return `<option value="${escapeAttr(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
    })
    .join("");
  select.value = nextValue;
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

function recommendAround(value, range) {
  const adjusted = clamp(value, range[0], range[1], value);
  if (adjusted === value && inRange(value, range)) {
    return `${range[0]}-${range[1]}`;
  }
  return `${adjusted} (${range[0]}-${range[1]})`;
}

function recommendedBoundary(value, range) {
  return value < range[0] ? `${range[0]}以上` : `${range[1]}以下`;
}

function inRange(value, range) {
  return Number.isFinite(value) && value >= range[0] && value <= range[1];
}

function clamp(value, min, max, fallback) {
  const number = Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
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

function updateTimestamp(update) {
  const timestamp = Date.parse(update?.date);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function isVisibleRecentUpdate(update) {
  const timestamp = updateTimestamp(update);
  if (!timestamp) {
    return false;
  }
  const now = Date.now();
  const cutoff = now - RECENT_UPDATE_DAYS * 24 * 60 * 60 * 1000;
  return timestamp >= cutoff && timestamp <= now;
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
