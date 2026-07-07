const API_BASE = "https://overfast-api.tekrop.fr";
const LOCALE = "ja-jp";
const FALLBACK_LOCALE = "en-us";
const RECENT_UPDATE_DAYS = 31;
const QUICK_PERK_ROLES = [
  { role: "tank", label: "Tank", ja: "タンク" },
  { role: "damage", label: "Damage", ja: "ダメージ" },
  { role: "support", label: "Support", ja: "サポート" },
];
const PATCH_UPDATES = [
  {
    type: "Hero",
    title: "シオン追加",
    date: "2026-06-16",
    tone: "info",
    summary: "Season 3: Into the Tiger's Denで追加されたダメージヒーロー。高機動のフランカー寄り。",
    details: ["二丁拳銃とバイクを使うダメージヒーロー", "EvadeとJoyrideで素早く接近/離脱", "準備できている相手やCCに弱い"],
    href: "https://www.pcgamer.com/games/fps/overwatch-season-3-shion-release-date/",
  },
  {
    type: "Patch",
    title: "Season 3 バランス調整",
    date: "2026-06-16",
    tone: "nerf",
    summary: "Season 3開始時のパッチ。高機動メタを抑えつつ、新環境向けの調整が入った。",
    details: ["Jetpack Cat: 搬送中の燃料回復ペナルティが重くなり、Transport Shielding系も弱体化", "Jetpack Cat: Biotic PawjectilesやHeadbutt系は補填強化", "シオン追加に合わせてフランカー対策とCCの価値が上がりやすい"],
    href: "https://www.pcgamer.com/games/fps/overwatch-season-3-kicks-off-with-the-gift-of-jetpack-cat-nerfs-after-the-apache-helicopter-meta-dominated-the-world-cup/",
  },
  {
    type: "Season",
    title: "Season 3: Into the Tiger's Den",
    date: "2026-06-16",
    tone: "info",
    summary: "シオン実装、新バトルパス、ストア更新、ミシックスキン予定を含む新シーズン。",
    details: ["開催期間は6月16日から8月中旬見込み", "PC/コンソール/Switch 2で展開", "シオンはヒットスキャン寄りの高機動DPS"],
    href: "https://www.pcgamer.com/games/fps/overwatch-season-3-shion-release-date/",
  },
  {
    type: "News",
    title: "シオン開発情報",
    date: "2026-06-15",
    tone: "info",
    summary: "開発初期にはコンボ評価メーターも検討されたが、実戦負荷を考えて見送られた。",
    details: ["二丁拳銃、X字ボレー、ダッシュ、バイクを連携して戦う設計", "高いスキル上限のフランカー寄り", "準備された相手や妨害には弱い"],
    href: "https://www.pcgamer.com/games/fps/blizzard-almost-put-devil-mays-style-rank-into-overwatch-for-its-newest-combo-heavy-hero-shion/",
  },
  {
    type: "Preview",
    title: "シオンのバイク能力公開",
    date: "2026-06-12",
    tone: "video",
    summary: "Overwatch初の本格的な乗り物系アビリティとして、バイク移動と投げつけ攻撃が紹介された。",
    details: ["Joyrideで素早く移動し、バイクを攻撃にも使う", "Evadeでオーバーシールド付きの離脱/接近", "近距離奇襲と逃げ道管理が重要"],
    href: "https://www.gamesradar.com/games/fps/overwatch-gives-new-hero-shion-a-motorcycle-which-you-can-throw-at-people-when-youre-not-akira-sliding-all-over-the-place/",
  },
  {
    type: "Esports",
    title: "OWCS Champions Clash",
    date: "2026-05-25",
    tone: "esports",
    summary: "5月23日から25日に開催された直近1か月内のOWCS主要大会。",
    details: ["直近1か月の過去予定として表示", "次の大型大会はMidseason Championshipが7月30日から8月3日予定", "観戦メタの変化は構成例の見直し材料"],
    href: "https://overwatch.blizzard.com/en-us/news/24246297/owcs-2026-%25E9%2596%258B%25E5%25B9%2595%25E5%2589%258D%25E3%2582%25AC%25E3%2582%25A4%25E3%2583%2589/",
  },
  {
    type: "Upcoming",
    title: "OWCS Midseason Championship",
    date: "2026-07-30",
    tone: "esports",
    summary: "次の国際大会予定。7月30日から8月3日開催予定。",
    details: ["今後の予定として表示", "Season 3環境での構成傾向を確認しやすい大会", "タンク相性やフランカー対策の参考にする"],
    href: "https://overwatch.blizzard.com/en-us/news/24246297/owcs-2026-%25E9%2596%258B%25E5%25B9%2595%25E5%2589%258D%25E3%2582%25AC%25E3%2582%25A4%25E3%2583%2589/",
  },
];
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

const state = {
  bootstrapped: false,
  activeView: "mindset",
  heroes: [],
  heroDetails: new Map(),
  heroStats: new Map(),
  maps: FALLBACK_STAGES,
  selectedHeroKey: null,
  role: "all",
  query: "",
  favoriteOnly: false,
  favoriteHeroKeys: new Set(),
  mapFilter: "all",
  compFilters: {
    stageInitial: "all",
    stage: "all",
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
  els.diagTank = document.querySelector("#diagTank");
  els.diagDamage1 = document.querySelector("#diagDamage1");
  els.diagDamage2 = document.querySelector("#diagDamage2");
  els.diagSupport1 = document.querySelector("#diagSupport1");
  els.diagSupport2 = document.querySelector("#diagSupport2");
  els.compDiagnosis = document.querySelector("#compDiagnosis");
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

  els.heroMapFilter.addEventListener("change", () => {
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
    renderGuides();
  });

  els.guideHero.addEventListener("change", () => {
    state.guideFilters.hero = els.guideHero.value;
    renderGuides();
  });

  [els.diagTank, els.diagDamage1, els.diagDamage2, els.diagSupport1, els.diagSupport2].forEach((select) => {
    select.addEventListener("change", renderCompDiagnosis);
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
  renderGuideControls();
  renderGuides();
  renderCompDiagnosisControls();
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
  const current = els.heroMapFilter.value || state.mapFilter;
  const options = [
    { value: "all", label: "指定なし" },
    ...state.maps
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
  const mapCurrent = els.guideMap.value || state.guideFilters.map;
  setSelectOptions(
    els.guideMap,
    [
      { value: "all", label: "指定なし" },
      ...state.maps
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name, "ja"))
        .map((stage) => ({ value: stage.key, label: `${stage.name} / ${stage.rule}` })),
    ],
    mapCurrent,
  );
  state.guideFilters.map = els.guideMap.value;

  const stage = getSelectedGuideStage();
  const ruleCurrent = stage?.rule || els.guideRule.value || state.guideFilters.rule;
  setSelectOptions(
    els.guideRule,
    Object.keys(GUIDE_RULES).map((rule) => ({ value: rule, label: rule })),
    ruleCurrent,
  );
  state.guideFilters.rule = els.guideRule.value;

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
  const updates = PATCH_UPDATES.slice()
    .filter(isVisibleRecentUpdate)
    .sort((a, b) => updateTimestamp(b) - updateTimestamp(a))
    .map(renderUpdateCard);

  els.updateGrid.innerHTML = updates.length
    ? updates.join("")
    : renderEmpty("直近1か月以内のイベント・ニュース・パッチ予定はありません。");
}

function renderLatestPatchSummary() {
  const patch = PATCH_UPDATES.slice()
    .filter((update) => update.type === "Patch")
    .sort((a, b) => updateTimestamp(b) - updateTimestamp(a))[0];
  if (!patch || !els.latestPatchTitle || !els.latestPatchSummary) {
    return;
  }
  els.latestPatchTitle.textContent = `${patch.date} ${patch.title}`;
  els.latestPatchSummary.textContent = patch.summary;
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
  if (!els.compGrid) {
    return;
  }
  renderCompFilterOptions();
  const stage = getSelectedStage();
  if (!stage) {
    els.compGrid.innerHTML = renderEmpty("ステージ名を選ぶと、そのマップ向けの構成例を表示します。");
    return;
  }

  const comps = buildStageComps(stage);
  els.compGrid.innerHTML = comps.map(renderCompCard).join("");
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
  if (!els.compInitialFilter || !els.compStageFilter) {
    return;
  }
  const selected = { ...state.compFilters };
  const visibleStages = getVisibleCompStages();
  setSelectOptions(
    els.compInitialFilter,
    [
      { value: "all", label: "すべて" },
      ...getStageInitialOptions().map((initial) => ({
        value: initial,
        label: initial,
      })),
    ],
    selected.stageInitial,
  );
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
  return state.maps.filter((stage) => stageMatchesInitial(stage, state.compFilters.stageInitial));
}

function getStageInitialOptions() {
  return [...new Set(state.maps.map(stageInitial).filter(Boolean))].sort((a, b) => a.localeCompare(b, "en"));
}

function stageMatchesInitial(stage, initial) {
  return !initial || initial === "all" || stageInitial(stage) === initial;
}

function stageInitial(stage) {
  return stringValue(stage.name).trim().charAt(0).toUpperCase();
}

function renderCompDiagnosisControls() {
  const favTanks = getFavoriteHeroKeysByRole("tank");
  const favDamage = getFavoriteHeroKeysByRole("damage");
  const favSupport = getFavoriteHeroKeysByRole("support");
  setHeroSelectOptions(els.diagTank, "tank", favTanks[0] || "orisa");
  setHeroSelectOptions(els.diagDamage1, "damage", favDamage[0] || "soldier-76");
  setHeroSelectOptions(els.diagDamage2, "damage", favDamage[1] || "sojourn");
  setHeroSelectOptions(els.diagSupport1, "support", favSupport[0] || "baptiste");
  setHeroSelectOptions(els.diagSupport2, "support", favSupport[1] || "kiriko");
  renderCompDiagnosis();
}

function getFavoriteHeroKeysByRole(role) {
  return state.heroes.filter((hero) => hero.role === role && state.favoriteHeroKeys.has(hero.key)).map((hero) => hero.key);
}

function setHeroSelectOptions(select, role, preferredKey) {
  const current = select.value;
  const heroes = state.heroes
    .filter((hero) => hero.role === role)
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
  const fallback = heroes.find((hero) => hero.key === preferredKey)?.key || heroes[0]?.key || "";
  const selected = heroes.some((hero) => hero.key === current) ? current : fallback;
  select.innerHTML = heroes
    .map((hero) => {
      const isSelected = hero.key === selected ? " selected" : "";
      return `<option value="${escapeAttr(hero.key)}"${isSelected}>${escapeHtml(hero.name)}</option>`;
    })
    .join("");
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
  `;
  els.synergyMap.querySelectorAll("[data-hero-key]").forEach((button) => {
    button.addEventListener("click", () => selectHeroFromInline(button.dataset.heroKey));
  });
}

function renderRelationHero(hero) {
  const portrait = hero.portrait
    ? `<img src="${safeUrl(hero.portrait)}" alt="">`
    : `<span class="relation-placeholder">${escapeHtml(hero.name.slice(0, 2))}</span>`;
  return `
    <button class="relation-hero" type="button" data-hero-key="${escapeAttr(hero.key)}">
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
    <button class="relation-node is-${escapeAttr(tone)}" type="button"${keyAttr}${disabled}>
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
    <button class="relation-row" type="button" data-hero-key="${escapeAttr(hero.key)}">
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

function renderCompDiagnosis() {
  const selectedKeys = [
    els.diagTank.value,
    els.diagDamage1.value,
    els.diagDamage2.value,
    els.diagSupport1.value,
    els.diagSupport2.value,
  ].filter(Boolean);

  if (selectedKeys.length < 5) {
    els.compDiagnosis.innerHTML = renderEmpty("ヒーローデータ取得後に診断できます。");
    return;
  }

  const result = diagnoseComposition(selectedKeys);
  els.compDiagnosis.innerHTML = `
    <div class="diagnosis-summary is-${escapeAttr(result.tone)}">
      <strong>${escapeHtml(result.title)}</strong>
      <span>${escapeHtml(result.summary)}</span>
    </div>
    <div class="diagnosis-grid">
      ${renderDiagnosisList("良い点", result.good)}
      ${renderDiagnosisList("アンチパターン", result.bad)}
      ${renderDiagnosisList("次に直すなら", result.next)}
    </div>
  `;
}

function renderDiagnosisList(title, items) {
  return `
    <section>
      <h4>${escapeHtml(title)}</h4>
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function diagnoseComposition(keys) {
  const counts = Object.fromEntries(Object.keys(HERO_ARCHETYPES).map((type) => [type, 0]));
  keys.forEach((key) => {
    Object.entries(HERO_ARCHETYPES).forEach(([type, heroKeys]) => {
      if (heroKeys.includes(key)) {
        counts[type] += 1;
      }
    });
  });

  const sortedTypes = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const mainType = sortedTypes[0][1] >= 3 ? sortedTypes[0][0] : "mixed";
  const good = [];
  const bad = [];
  const next = [];
  const has = (key) => keys.includes(key);
  const hasAny = (...heroKeys) => heroKeys.some((key) => keys.includes(key));

  if (mainType !== "mixed") {
    good.push(`${labelArchetype(mainType)}の方向性が3人以上そろっている。`);
  } else {
    bad.push("構成の勝ち方が散っている。先に「固まる」「飛び込む」「射線で削る」のどれかを決める。");
  }

  if (hasAny("lucio", "juno")) {
    good.push("移動補助があり、当たり始めと引き際を合わせやすい。");
  } else if (mainType === "brawl" || mainType === "dive") {
    bad.push("ラッシュ/ダイブ寄りなのに移動補助が薄い。入るタイミングがずれやすい。");
    next.push("ルシオかジュノを入れて、全員で同じタイミングで動ける形にする。");
  }

  if (has("winston") && !hasAny("tracer", "genji", "sombra", "venture")) {
    bad.push("ウィンストンだけが飛び込む形。後衛に触っても倒し切れない。");
    next.push("トレーサー、ゲンジ、ソンブラ、ベンチャーのどれかを合わせる。");
  }

  if (hasAny("widowmaker", "hanzo", "ashe") && hasAny("reinhardt", "reaper", "mei")) {
    bad.push("長射線DPSと近距離前進の要求が混ざっている。立ち位置が分かれやすい。");
    next.push("射線で戦うならシグマ寄り、近距離で戦うならルシオ/メイ/リーパー寄りに寄せる。");
  }

  if (hasAny("baptiste", "kiriko", "ana")) {
    good.push("事故を戻せるサポートがいて、初動のミスをカバーしやすい。");
  }

  if (has("mercy") && !hasAny("ashe", "sojourn", "soldier-76", "widowmaker", "pharah", "echo")) {
    bad.push("マーシーのダメージブースト先が弱い。支援先が決まらない。");
    next.push("アッシュ、ソジョーン、ソルジャー76、ファラ、エコーなど火力を伸ばせるDPSを置く。");
  }

  if (hasAny("zenyatta", "ana", "baptiste") && !hasAny("sigma", "orisa", "ramattra", "dva")) {
    bad.push("足が遅いサポートを守る前線が薄い。ダイブに狙われやすい。");
    next.push("シグマ、オリーサ、ラマットラ、D.Vaなどで射線や高台を守る。");
  }

  if (!bad.length) {
    good.push("大きなアンチパターンは少ない。マップに合わせた射線と集合を意識すれば使いやすい。");
    next.push("負けた時はヒーロー全替えより、DPSかサポートを1枠だけマップに合わせて差し替える。");
  }
  if (!next.length) {
    next.push("まずタンクの動きに合わせて、DPSとサポートを同じ戦い方へ寄せる。");
  }

  return {
    tone: bad.length >= 2 ? "warn" : "good",
    title: bad.length >= 2 ? "要調整" : "使いやすい構成",
    summary: mainType === "mixed" ? "勝ち方が混ざりやすい構成です。" : `${labelArchetype(mainType)}寄りの構成です。`,
    good,
    bad: bad.length ? bad : ["目立つアンチパターンは少ない。"],
    next,
  };
}

function labelArchetype(type) {
  const labels = {
    brawl: "ラッシュ/ブロール",
    dive: "ダイブ",
    poke: "ポーク",
    pick: "ピック",
  };
  return labels[type] || "混合";
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
    <button class="hero-row${active}${favorite}" type="button" data-hero-key="${escapeAttr(hero.key)}">
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
    const fields = [
      hero.name,
      hero.key,
      hero.role,
      detail?.description,
      playstyle.summary,
      playstyle.avoid,
      ...playstyle.tips,
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
    <button class="quick-perk-row${favorite ? " is-favorite" : ""}" type="button" data-hero-key="${escapeAttr(hero.key)}">
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
        ${renderSynergyPanel(hero)}
        ${renderCounterPanel(hero)}
        ${renderCounterplayPanel(hero)}
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

function buildHeroCounterplay(hero) {
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
    <span class="tank-map-chip">
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
  const nextValue = values.has(selectedValue) ? selectedValue : "all";
  if (nextValue !== selectedValue) {
    if (select === els.compInitialFilter) {
      state.compFilters.stageInitial = nextValue;
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
  const cutoff = Date.now() - RECENT_UPDATE_DAYS * 24 * 60 * 60 * 1000;
  return timestamp >= cutoff;
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
