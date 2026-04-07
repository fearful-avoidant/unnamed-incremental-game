"use client";

import "@root/global-fonts.css";
import "@root/global.css";

import * as React from "react";

import CardDouble from "@components/CardDouble";
import ActionButton from "@components/ActionButton";
import Badge from "@components/Badge";
import BarProgress from "@components/BarProgress";

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════

const HIRES = [
  { id: "rat", name: "Giant Rat", desc: "Scurries for coins", baseCost: 15, gps: 0.5, costMult: 1.15, icon: "~" },
  { id: "goblin", name: "Goblin Worker", desc: "Mines gold ore", baseCost: 100, gps: 3, costMult: 1.15, icon: "⛏" },
  { id: "skeleton", name: "Skeleton Guard", desc: "Patrols for treasure", baseCost: 500, gps: 12, costMult: 1.15, icon: "☠" },
  { id: "troll", name: "Cave Troll", desc: "Sits on gold piles", baseCost: 3000, gps: 50, costMult: 1.15, icon: "⛰" },
  { id: "imp", name: "Fire Imp", desc: "Smelts pure gold", baseCost: 15000, gps: 200, costMult: 1.15, icon: "🔥" },
  { id: "necro", name: "Necromancer", desc: "Raises the dead 24/7", baseCost: 80000, gps: 800, costMult: 1.15, icon: "⚰" },
  { id: "demon", name: "Demon Lord", desc: "Extorts adventurers", baseCost: 400000, gps: 3500, costMult: 1.15, icon: "👿" },
  { id: "architect", name: "Dungeon Architect", desc: "Optimal loot routes", baseCost: 2000000, gps: 15000, costMult: 1.15, icon: "📐" },
  { id: "mimic", name: "Mimic Colony", desc: "Eats adventurers, hoards", baseCost: 10000000, gps: 65000, costMult: 1.15, icon: "📦" },
  { id: "lich", name: "Ancient Lich", desc: "Magical gold mult", baseCost: 50000000, gps: 280000, costMult: 1.15, icon: "💀" },
  { id: "prince", name: "Demon Prince", desc: "Rules the lower planes", baseCost: 250000000, gps: 1200000, costMult: 1.15, icon: "👑" },
  { id: "dragon", name: "Elder Dragon", desc: "Ancient beyond measure", baseCost: 1500000000, gps: 5000000, costMult: 1.15, icon: "🐉" },
];

const CLICK_UPGRADES = [
  { id: "sword", name: "Sharper Sword", desc: "+1/click", baseCost: 500, clickPow: 1, costMult: 3, max: 10, icon: "⚔" },
  { id: "scroll", name: "Looting Scroll", desc: "+5/click", baseCost: 5000, clickPow: 5, costMult: 3, max: 10, icon: "📜" },
  { id: "amulet", name: "Greed Amulet", desc: "+25/click", baseCost: 100000, clickPow: 25, costMult: 3, max: 10, icon: "💎" },
  { id: "blade", name: "Crystal Blade", desc: "+125/click", baseCost: 2000000, clickPow: 125, costMult: 3, max: 10, icon: "🗡" },
  { id: "scale", name: "Dragon Scale", desc: "+625/click", baseCost: 40000000, clickPow: 625, costMult: 3, max: 10, icon: "🐲" },
  { id: "stone", name: "Philosopher\'s Stone", desc: "+3125/click", baseCost: 800000000, clickPow: 3125, costMult: 3, max: 10, icon: "✨" },
];

// Prestige upgrades (buy with souls)
const SOUL_UPGRADES = [
  { id: "discount", name: "Bulk Discount", desc: "Hirelings 5% cheaper", max: 10, costPer: 1, icon: "🏷" },
  { id: "clickMult", name: "Mighty Hands", desc: "+10% click power", max: 10, costPer: 1, icon: "💪" },
  { id: "gpsMult", name: "Efficiency", desc: "+10% gold/sec", max: 10, costPer: 1, icon: "⚙" },
  { id: "eventLuck", name: "Lucky Stars", desc: "+15% event chance", max: 5, costPer: 2, icon: "🍀" },
  { id: "offlinePow", name: "Deep Pockets", desc: "+20% offline gold", max: 5, costPer: 2, icon: "💤" },
  { id: "startGold", name: "Inheritance", desc: "Start with gold on prestige", max: 5, costPer: 3, icon: "🏦" },
];

// Transcend upgrades (buy with soul shards)
const SHARD_UPGRADES = [
  { id: "hireMult", name: "Dark Bargain", desc: "+20% hireling output", max: 10, costPer: 1, icon: "🌑" },
  { id: "prestigeMult", name: "Soul Harvest", desc: "+50% souls earned", max: 10, costPer: 1, icon: "🌀" },
  { id: "costReduction", name: "Void Discount", desc: "-5% all costs", max: 10, costPer: 1, icon: "🕳" },
  { id: "autoPrestige", name: "Auto Prestige", desc: "Auto-prestige toggle", max: 1, costPer: 5, icon: "🤖" },
  { id: "runeSpeed", name: "Rune Affinity", desc: "+25% rune XP", max: 5, costPer: 2, icon: "🔮" },
  { id: "challengeMult", name: "Trial Master", desc: "+30% challenge rewards", max: 5, costPer: 3, icon: "⚔" },
];

// Reincarnation upgrades (buy with demon essence)
const ESSENCE_UPGRADES = [
  { id: "globalMult", name: "Arcane Power", desc: "+25% everything", max: 10, costPer: 1, icon: "✨" },
  { id: "shardMult", name: "Essence Well", desc: "+50% soul shards", max: 10, costPer: 1, icon: "💎" },
  { id: "sacrificeBonus", name: "Blood Pact", desc: "+50% sacrifice rewards", max: 5, costPer: 2, icon: "🩸" },
  { id: "autoTranscend", name: "Auto Transcend", desc: "Auto-transcend toggle", max: 1, costPer: 5, icon: "⚙" },
  { id: "corruptionResist", name: "Willpower", desc: "Corruptions hurt less", max: 5, costPer: 2, icon: "🛡" },
  { id: "offlineMult", name: "Time Warp", desc: "+50% offline gold", max: 5, costPer: 3, icon: "⏰" },
];

// Challenges
const CHALLENGES = [
  { id: 0, name: "No Clicking", desc: "Clicking disabled", rewardDesc: "+50% GPS", rewardMult: 0.5, icon: "🚫" },
  { id: 1, name: "Expensive Shop", desc: "Costs 3x higher", rewardDesc: "-10% costs", rewardMult: -0.1, icon: "💰" },
  { id: 2, name: "Slow Start", desc: "GPS halved", rewardDesc: "+50% GPS", rewardMult: 0.5, icon: "🐌" },
  { id: 3, name: "Frugal", desc: "Click power /10", rewardDesc: "+100% click power", rewardMult: 1.0, icon: "🤏" },
  { id: 4, name: "Purge", desc: "No passive gold", rewardDesc: "+200% GPS", rewardMult: 2.0, icon: "💀" },
  { id: 5, name: "The Gauntlet", desc: "All restrictions", rewardDesc: "+500% everything", rewardMult: 5.0, icon: "⚔" },
  { id: 6, name: "Time Trial", desc: "Must finish in 60s", rewardDesc: "+100% event chance", rewardMult: 1.0, icon: "⏱" },
  { id: 7, name: "Iron Will", desc: "No prestige allowed", rewardDesc: "+100% prestige gain", rewardMult: 1.0, icon: "🦾" },
  { id: 8, name: "Corrupted", desc: "All corruptions Lv1", rewardDesc: "+100% corruption score", rewardMult: 1.0, icon: "☠" },
];

// Runes (leveled with offerings)
const RUNES = [
  { id: "speed", name: "Rune of Speed", desc: "+10% GPS per level", icon: "💨", baseCost: 10, costMult: 1.8, max: 50 },
  { id: "power", name: "Rune of Power", desc: "+15% click per level", icon: "⚡", baseCost: 10, costMult: 1.8, max: 50 },
  { id: "fortune", name: "Rune of Fortune", desc: "+5% event chance/lv", icon: "🍀", baseCost: 25, costMult: 2.0, max: 30 },
  { id: "greed", name: "Rune of Greed", desc: "+10% gold/lv", icon: "🤑", baseCost: 15, costMult: 1.9, max: 40 },
  { id: "mastery", name: "Rune of Mastery", desc: "+10% rune XP/lv", icon: "📖", baseCost: 50, costMult: 2.2, max: 25 },
  { id: "infinity", name: "Rune of Infinity", desc: "+5% everything/lv", icon: "♾", baseCost: 100, costMult: 2.5, max: 20 },
];

// Corruptions
const CORRUPTIONS = [
  { id: "viscosity", name: "Viscosity", desc: "GPS -15% per level", max: 10 },
  { id: "drought", name: "Drought", desc: "Click power -15% per level", max: 10 },
  { id: "inflation", name: "Inflation", desc: "Costs +20% per level", max: 10 },
  { id: "decay", name: "Decay", desc: "Lose 1% gold/sec", max: 10 },
  { id: "silence", name: "Silence", desc: "Events -25% per level", max: 10 },
];

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

type ChallengeResult = { completed: boolean; bestTime: number };
type CorruptionLevels = Record<string, number>;

interface SaveData {
  gold: number; totalGold: number; clickPower: number;
  souls: number; totalSouls: number; soulShards: number;
  totalShards: number; demonEssence: number;
  buildings: Record<string, number>; achievements: string[];
  prestigeUpgrades: Record<string, number>; prestigeCount: number;
  transcendUpgrades: Record<string, number>; transcendCount: number;
  reincarnateUpgrades: Record<string, number>; reincarnateCount: number;
  totalClicks: number; eventsTriggered: number;
  challengeResults: ChallengeResult[]; activeChallenge: number;
  runes: Record<string, number>; offerings: number;
  corruptions: CorruptionLevels;
  sacrificeCount: number; totalSacrificeBonuses: number;
  lastSaveTime: number;
}

// ═══════════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════════

function fmt(n: number): string {
  if (n < 0) return "-" + fmt(-n);
  if (n < 1000) return Math.floor(n).toLocaleString();
  const s = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];
  const t = Math.min(Math.floor(Math.log10(Math.abs(n)) / 3), s.length - 1);
  const v = n / Math.pow(10, t * 3);
  return v.toFixed(v < 10 ? 2 : v < 100 ? 1 : 0) + s[t];
}

function getHireCost(u: typeof HIRES[0], b: Record<string, number>, discount: number, infMult: number): number {
  const owned = b[u.id] || 0;
  return Math.floor(u.baseCost * Math.pow(u.costMult, owned) * (1 - discount * 0.05) * (1 + infMult * 0.2));
}

function getUpgCost(u: typeof CLICK_UPGRADES[0], b: Record<string, number>, infMult: number): number {
  const owned = b[u.id] || 0;
  return Math.floor(u.baseCost * Math.pow(u.costMult, owned) * (1 + infMult * 0.2));
}

function getRuneCost(u: typeof RUNES[0], level: number): number {
  return Math.floor(u.baseCost * Math.pow(u.costMult, level));
}

const mobileBreakpoint = 700;

// ═══════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════

const layoutS: React.CSSProperties = { display: "flex", gap: 0, minHeight: "85vh" };
const leftS: React.CSSProperties = { flex: "0 0 38%", borderRight: "2px solid var(--theme-border)", padding: "2em 3ch", display: "flex", flexDirection: "column" };
const rightS: React.CSSProperties = { flex: 1, minWidth: 0, maxHeight: "90vh", overflowY: "auto" };
const goldS: React.CSSProperties = { fontSize: "2.8em", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-1px" };
const shopItem: React.CSSProperties = { display: "flex", alignItems: "center", padding: "8px 0", cursor: "pointer", gap: "1ch", borderTop: "1px solid var(--theme-border)" };
const shopDis: React.CSSProperties = { ...shopItem, opacity: 0.3, cursor: "default" };
const iconS: React.CSSProperties = { width: "3ch", textAlign: "center", flexShrink: 0 };
const tabS: React.CSSProperties = { display: "inline-block", padding: "4px 1ch", cursor: "pointer", opacity: 0.5, borderBottom: "2px solid transparent", marginRight: "1ch" };
const tabA: React.CSSProperties = { ...tabS, opacity: 1, borderBottom: "2px solid var(--theme-text)" };

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function DungeonPage() {
  // Core
  const [gold, setGold] = React.useState(0);
  const [totalGold, setTotalGold] = React.useState(0);
  const [clickPower, setClickPower] = React.useState(1);
  const [souls, setSouls] = React.useState(0);
  const [totalSouls, setTotalSouls] = React.useState(0);
  const [soulShards, setSoulShards] = React.useState(0);
  const [totalShards, setTotalShards] = React.useState(0);
  const [demonEssence, setDemonEssence] = React.useState(0);
  const [buildings, setBuildings] = React.useState<Record<string, number>>({});
  const [achievements, setAchievements] = React.useState<string[]>([]);
  const [prestigeUpgrades, setPrestigeUpgrades] = React.useState<Record<string, number>>({});
  const [prestigeCount, setPrestigeCount] = React.useState(0);
  const [transcendUpgrades, setTranscendUpgrades] = React.useState<Record<string, number>>({});
  const [transcendCount, setTranscendCount] = React.useState(0);
  const [reincarnateUpgrades, setReincarnateUpgrades] = React.useState<Record<string, number>>({});
  const [reincarnateCount, setReincarnateCount] = React.useState(0);
  const [totalClicks, setTotalClicks] = React.useState(0);
  const [eventsTriggered, setEventsTriggered] = React.useState(0);
  const [challengeResults, setChallengeResults] = React.useState<ChallengeResult[]>(
    () => CHALLENGES.map(() => ({ completed: false, bestTime: Infinity }))
  );
  const [activeChallenge, setActiveChallenge] = React.useState<number>(-1);
  const [challengeTimer, setChallengeTimer] = React.useState(0);
  const [runes, setRunes] = React.useState<Record<string, number>>({});
  const [offerings, setOfferings] = React.useState(0);
  const [corruptions, setCorruptions] = React.useState<CorruptionLevels>({});
  const [sacrificeCount, setSacrificeCount] = React.useState(0);
  const [totalSacrificeBonuses, setTotalSacrificeBonuses] = React.useState(0);

  // UI
  type Tab = "hirelings" | "upgrades" | "challenges" | "runes" | "stats";
  const [tab, setTab] = React.useState<Tab>("hirelings");
  const [particles, setParticles] = React.useState<{ id: number; x: number; y: number; val: number }[]>([]);
  const [offlinePopup, setOfflinePopup] = React.useState<number | null>(null);
  const [eventBanner, setEventBanner] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [newAchievements, setNewAchievements] = React.useState<string[]>([]);
  const particleId = React.useRef(0);
  const lastTick = React.useRef(Date.now());
  const clickBtnRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const golRef = React.useRef<boolean[][]>([]);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // GAME OF LIFE
  // ═══════════════════════════════════════════════════════════════

  const COLS = 48, ROWS = 32, CELL = 8, GAP = 1;

  const initGol = React.useCallback(() => {
    const g: boolean[][] = [];
    for (let y = 0; y < ROWS; y++) { g[y] = []; for (let x = 0; x < COLS; x++) g[y][x] = Math.random() < 0.15; }
    golRef.current = g;
  }, []);

  const stepGol = React.useCallback(() => {
    const g = golRef.current; if (!g.length) return;
    const next: boolean[][] = [];
    for (let y = 0; y < ROWS; y++) {
      next[y] = [];
      for (let x = 0; x < COLS; x++) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          if (g[(y+dy+ROWS)%ROWS][(x+dx+COLS)%COLS]) n++;
        }
        next[y][x] = g[y][x] ? (n===2||n===3) : n===3;
      }
    }
    golRef.current = next;
  }, []);

  const seedGol = React.useCallback(() => {
    const g = golRef.current; if (!g.length) return;
    for (let i = 0; i < 12; i++) g[Math.floor(Math.random()*ROWS)][Math.floor(Math.random()*COLS)] = true;
  }, []);

  const drawGol = React.useCallback(() => {
    const c = canvasRef.current, g = golRef.current; if (!c || !g.length) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = COLS*(CELL+GAP)+GAP; c.height = ROWS*(CELL+GAP)+GAP;
    ctx.fillStyle = "#0d1117"; ctx.fillRect(0, 0, c.width, c.height);
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      if (g[y][x]) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          if (g[(y+dy+ROWS)%ROWS][(x+dx+COLS)%COLS]) n++;
        }
        ctx.fillStyle = `rgba(63,185,80,${0.3+n/8*0.7})`;
      } else {
        ctx.fillStyle = "rgba(48,54,61,0.3)";
      }
      ctx.fillRect(GAP+x*(CELL+GAP), GAP+y*(CELL+GAP), CELL, CELL);
    }
  }, []);

  React.useEffect(() => {
    initGol(); let fc = 0;
    const loop = () => { fc++; if (fc%30===0) stepGol(); drawGol(); requestAnimationFrame(loop); };
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [initGol, stepGol, drawGol]);

  // ═══════════════════════════════════════════════════════════════
  // COMPUTED VALUES
  // ═══════════════════════════════════════════════════════════════

  const soulBonus = 1 + souls * 0.1;
  const soulDiscount = prestigeUpgrades.discount || 0;
  const clickMultBonus = 1 + (prestigeUpgrades.clickMult || 0) * 0.1;
  const gpsMultBonus = 1 + (prestigeUpgrades.gpsMult || 0) * 0.1;
  const eventBaseChance = 0.0005 * (1 + (prestigeUpgrades.eventLuck || 0) * 0.15);
  const offlineMult = 0.5 + (prestigeUpgrades.offlinePow || 0) * 0.2;

  // Transcend bonuses
  const hireMultBonus = 1 + (transcendUpgrades.hireMult || 0) * 0.2;
  const prestigeMultBonus = 1 + (transcendUpgrades.prestigeMult || 0) * 0.5;
  const costReduction = (transcendUpgrades.costReduction || 0) * 0.05;

  // Reincarnation bonuses
  const globalMult = 1 + (reincarnateUpgrades.globalMult || 0) * 0.25;
  const shardMultBonus = 1 + (reincarnateUpgrades.shardMult || 0) * 0.5;
  const sacrificeBonus = 1 + (reincarnateUpgrades.sacrificeBonus || 0) * 0.5;

  // Rune bonuses
  const runeGpsBonus = 1 + (runes.speed || 0) * 0.1;
  const runeClickBonus = 1 + (runes.power || 0) * 0.15;
  const runeEventBonus = (runes.fortune || 0) * 0.05;
  const runeGoldBonus = 1 + (runes.greed || 0) * 0.1;
  const runeXpMult = 1 + (runes.mastery || 0) * 0.1;
  const runeInfinityBonus = 1 + (runes.infinity || 0) * 0.05;

  // Corruption debuffs
  const corrGpsMult = 1 - (corruptions.viscosity || 0) * 0.15;
  const corrClickMult = 1 - (corruptions.drought || 0) * 0.15;
  const corrCostMult = 1 + (corruptions.inflation || 0) * 0.2;
  const corrDecayRate = (corruptions.decay || 0) * 0.01;
  const corrEventMult = 1 - (corruptions.silence || 0) * 0.25;
  const corruptionScore = Object.values(corruptions).reduce((a, b) => a + (b || 0), 0);
  const corruptionMult = 1 + corruptionScore * 0.1;

  // Challenge bonuses
  const challengeBonus = React.useMemo(() => {
    let gps = 0, click = 0, cost = 0, event = 0, prestige = 0, global = 0;
    challengeResults.forEach((r, i) => {
      if (!r.completed) return;
      const c = CHALLENGES[i];
      if (i === 0 || i === 2) gps += c.rewardMult;
      if (i === 1) cost += c.rewardMult;
      if (i === 3) click += c.rewardMult;
      if (i === 4) gps += c.rewardMult;
      if (i === 5) global += c.rewardMult;
      if (i === 6) event += c.rewardMult;
      if (i === 7) prestige += c.rewardMult;
    });
    return { gps: 1+gps, click: 1+click, cost: 1+cost, event: 1+event, prestige: 1+prestige, global: 1+global };
  }, [challengeResults]);

  // Challenge restrictions
  const chalNoClick = activeChallenge === 0 || activeChallenge === 5;
  const chalCostMult = activeChallenge === 1 || activeChallenge === 5 ? 3 : 1;
  const chalGpsMult = activeChallenge === 2 || activeChallenge === 5 ? 0.5 : 1;
  const chalClickMult = activeChallenge === 3 || activeChallenge === 5 ? 0.1 : 1;
  const chalNoPassive = activeChallenge === 4 || activeChallenge === 5;

  // Final GPS
  const gps = React.useMemo(() => {
    if (chalNoPassive) return 0;
    let g = 0;
    HIRES.forEach(u => { g += u.gps * (buildings[u.id] || 0); });
    g *= soulBonus * gpsMultBonus * hireMultBonus * globalMult * runeGpsBonus * runeGoldBonus * runeInfinityBonus
      * challengeBonus.gps * challengeBonus.global * corrGpsMult * chalGpsMult * corruptionMult;
    g *= (1 - corrDecayRate); // decay reduces effective GPS
    return Math.max(0, g);
  }, [buildings, soulBonus, gpsMultBonus, hireMultBonus, globalMult, runeGpsBonus, runeGoldBonus,
    runeInfinityBonus, challengeBonus, corrGpsMult, chalGpsMult, corrDecayRate, chalNoPassive, corruptionMult]);

  // Final click value
  const clickVal = React.useMemo(() => {
    let p = clickPower;
    CLICK_UPGRADES.forEach(u => { p += u.clickPow * (buildings[u.id] || 0); });
    p *= soulBonus * clickMultBonus * globalMult * runeClickBonus * runeInfinityBonus
      * challengeBonus.click * challengeBonus.global * corrClickMult * chalClickMult * corruptionMult;
    return Math.max(1, p);
  }, [clickPower, buildings, soulBonus, clickMultBonus, globalMult, runeClickBonus,
    runeInfinityBonus, challengeBonus, corrClickMult, chalClickMult, corruptionMult]);

  // Event chance
  const eventChance = eventBaseChance * (1 + runeEventBonus) * challengeBonus.event * corrEventMult;

  // Cost multiplier
  const totalCostMult = chalCostMult * (1 + corrCostMult - 1) * challengeBonus.cost;

  // Prestige calculations
  const prestigeSouls = totalGold < 100000 ? 0 : Math.floor(Math.sqrt(totalGold / 100000) * prestigeMultBonus);
  const freeSouls = Math.max(0, prestigeSouls - Object.values(prestigeUpgrades).reduce((a, b) => a + b, 0));

  // Transcend calculations (based on total souls earned)
  const transcendShards = totalSouls < 100 ? 0 : Math.floor(Math.sqrt(totalSouls / 100) * shardMultBonus);
  const freeShards = Math.max(0, transcendShards - Object.values(transcendUpgrades).reduce((a, b) => a + b, 0));

  // Reincarnation calculations (based on total soul shards earned)
  const reincarnateEssence = totalShards < 10 ? 0 : Math.floor(Math.sqrt(totalShards / 10));
  const freeEssence = Math.max(0, reincarnateEssence - Object.values(reincarnateUpgrades).reduce((a, b) => a + b, 0));

  // Sacrifice value
  const sacrificeValue = React.useMemo(() => {
    let total = 0;
    HIRES.forEach(u => { total += (buildings[u.id] || 0) * u.gps; });
    return Math.floor(total * sacrificeBonus * globalMult * runeInfinityBonus * corruptionMult);
  }, [buildings, sacrificeBonus, globalMult, runeInfinityBonus, corruptionMult]);

  // Total buildings
  const totalBuildings = React.useMemo(() => {
    let t = 0; HIRES.forEach(u => { t += buildings[u.id] || 0; }); return t;
  }, [buildings]);

  // ═══════════════════════════════════════════════════════════════
  // ACTIONS
  // ═══════════════════════════════════════════════════════════════

  const buy = (u: any, isHire: boolean) => {
    const cost = isHire ? getHireCost(u, buildings, soulDiscount, corrCostMult) : getUpgCost(u, buildings, corrCostMult);
    const adjustedCost = Math.floor(cost * chalCostMult * challengeBonus.cost);
    if (gold < adjustedCost || (u.max && (buildings[u.id] || 0) >= u.max)) return;
    setGold(g => g - adjustedCost);
    setBuildings(b => ({ ...b, [u.id]: (b[u.id] || 0) + 1 }));
  };

  const doClick = () => {
    if (chalNoClick) return;
    const val = clickVal;
    setGold(g => g + val); setTotalGold(t => t + val); setTotalClicks(c => c + 1);
    seedGol();
    const rect = clickBtnRef.current?.getBoundingClientRect();
    if (rect) { particleId.current++;
      setParticles(p => [...p, { id: particleId.current, x: Math.random()*rect.width, y: Math.random()*20, val }]);
      setTimeout(() => setParticles(p => p.slice(1)), 800);
    }
  };

  const doPrestige = () => {
    if (prestigeSouls < 1) return;
    setSouls(s => s + prestigeSouls); setTotalSouls(t => t + prestigeSouls);
    setGold(0); setTotalGold(0); setClickPower(1);
    setBuildings({}); setPrestigeCount(c => c + 1);
    if (activeChallenge === 7) { endChallenge(false); } // Iron Will challenge ends on prestige
  };

  const doTranscend = () => {
    if (transcendShards < 1) return;
    setSoulShards(s => s + transcendShards); setTotalShards(t => t + transcendShards);
    setSouls(0); setTotalSouls(0); setSoulShards(0); setGold(0); setTotalGold(0);
    setClickPower(1); setBuildings({}); setPrestigeCount(0); setPrestigeUpgrades({});
    setTranscendCount(c => c + 1);
  };

  const doReincarnate = () => {
    if (reincarnateEssence < 1) return;
    setDemonEssence(e => e + reincarnateEssence);
    setSouls(0); setTotalSouls(0); setSoulShards(0); setTotalShards(0); setDemonEssence(0);
    setGold(0); setTotalGold(0); setClickPower(1); setBuildings({});
    setPrestigeCount(0); setPrestigeUpgrades({}); setTranscendCount(0); setTranscendUpgrades({});
    setReincarnateCount(c => c + 1);
  };

  const buyUpgrade = (u: any, level: number, currency: number, setCurrency: any, setUpgrades: any, costPer: number) => {
    if (u.max && level >= u.max) return;
    if (currency < costPer) return;
    setUpgrades((p: any) => ({ ...p, [u.id]: level + 1 }));
  };

  const buyRune = (u: typeof RUNES[0]) => {
    const level = runes[u.id] || 0;
    if (level >= u.max) return;
    const cost = getRuneCost(u, level);
    if (offerings < cost) return;
    setOfferings(o => o - cost);
    setRunes(r => ({ ...r, [u.id]: level + 1 }));
  };

  const doSacrifice = () => {
    if (totalBuildings < 1) return;
    const earned = sacrificeValue;
    setOfferings(o => o + earned);
    setBuildings({}); setSacrificeCount(c => c + 1); setTotalSacrificeBonuses(b => b + earned);
  };

  const startChallenge = (id: number) => {
    setActiveChallenge(id); setChallengeTimer(0);
    setGold(0); setTotalGold(0); setClickPower(1); setBuildings({});
  };

  const endChallenge = (success: boolean) => {
    if (activeChallenge < 0) return;
    if (success) {
      setChallengeResults(r => {
        const n = [...r];
        const time = challengeTimer;
        n[activeChallenge] = { completed: true, bestTime: Math.min(n[activeChallenge].bestTime, time) };
        return n;
      });
    }
    setActiveChallenge(-1); setChallengeTimer(0);
    setGold(0); setTotalGold(0); setClickPower(1); setBuildings({});
  };

  // Challenge goal: earn 1M gold
  const challengeGoal = 1000000;

  // ═══════════════════════════════════════════════════════════════
  // GAME LOOP
  // ═══════════════════════════════════════════════════════════════

  React.useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const dt = (now - lastTick.current) / 1000;
      lastTick.current = now;
      const earned = gps * dt;
      setGold(g => g + earned);
      setTotalGold(t => t + earned);

      // Decay (corruption)
      if (corrDecayRate > 0) {
        setGold(g => Math.max(0, g * (1 - corrDecayRate * dt)));
      }

      // Challenge timer
      if (activeChallenge >= 0) {
        setChallengeTimer(t => {
          const nt = t + dt;
          // Time Trial challenge: fail if > 60s
          if (activeChallenge === 6 && nt > 60) { endChallenge(false); return 0; }
          // Check goal
          if (totalGold >= challengeGoal) { endChallenge(true); return 0; }
          return nt;
        });
      }

      // Random event
      if (Math.random() < eventChance && gps > 0 && activeChallenge < 0) {
        const events = [
          { text: "Adventurers attacked! Looted", mult: 5 },
          { text: "Treasure chest found!", mult: 10 },
          { text: "Merchant tripped, spilled", mult: 3 },
          { text: "Dragon hoard uncovered!", mult: 20 },
          { text: "Dungeon collapsed, found", mult: 8 },
          { text: "Bandits robbed back for", mult: 6 },
        ];
        const ev = events[Math.floor(Math.random() * events.length)];
        const bonus = Math.floor(gps * ev.mult);
        setGold(g => g + bonus); setTotalGold(t => t + bonus);
        setEventsTriggered(e => e + 1);
        setEventBanner(ev.text + " " + fmt(bonus) + " gold!");
        setTimeout(() => setEventBanner(null), 4000);
      }
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [gps, eventChance, corrDecayRate, activeChallenge, totalGold]);

  // ═══════════════════════════════════════════════════════════════
  // SAVE / LOAD
  // ═══════════════════════════════════════════════════════════════

  React.useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("dungeonIncV3") || "{}");
      if (d.gold != null) setGold(d.gold);
      if (d.totalGold != null) setTotalGold(d.totalGold);
      if (d.clickPower != null) setClickPower(d.clickPower);
      if (d.souls != null) setSouls(d.souls);
      if (d.totalSouls != null) setTotalSouls(d.totalSouls);
      if (d.soulShards != null) setSoulShards(d.soulShards);
      if (d.totalShards != null) setTotalShards(d.totalShards);
      if (d.demonEssence != null) setDemonEssence(d.demonEssence);
      if (d.buildings) setBuildings(d.buildings);
      if (d.achievements) setAchievements(d.achievements);
      if (d.prestigeUpgrades) setPrestigeUpgrades(d.prestigeUpgrades);
      if (d.prestigeCount != null) setPrestigeCount(d.prestigeCount);
      if (d.transcendUpgrades) setTranscendUpgrades(d.transcendUpgrades);
      if (d.transcendCount != null) setTranscendCount(d.transcendCount);
      if (d.reincarnateUpgrades) setReincarnateUpgrades(d.reincarnateUpgrades);
      if (d.reincarnateCount != null) setReincarnateCount(d.reincarnateCount);
      if (d.totalClicks != null) setTotalClicks(d.totalClicks);
      if (d.eventsTriggered != null) setEventsTriggered(d.eventsTriggered);
      if (d.challengeResults) setChallengeResults(d.challengeResults);
      if (d.runes) setRunes(d.runes);
      if (d.offerings != null) setOfferings(d.offerings);
      if (d.corruptions) setCorruptions(d.corruptions);
      if (d.sacrificeCount != null) setSacrificeCount(d.sacrificeCount);
      if (d.totalSacrificeBonuses != null) setTotalSacrificeBonuses(d.totalSacrificeBonuses);
      // Offline earnings
      if (d.lastSaveTime) {
        const elapsed = (Date.now() - d.lastSaveTime) / 1000;
        if (elapsed > 60 && gps > 0) {
          const offGold = Math.floor(gps * elapsed * offlineMult);
          setGold(g => g + offGold); setTotalGold(t => t + offGold);
          setOfflinePopup(offGold);
        }
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    const save = () => localStorage.setItem("dungeonIncV3", JSON.stringify({
      gold, totalGold, clickPower, souls, totalSouls, soulShards, totalShards, demonEssence,
      buildings, achievements, prestigeUpgrades, prestigeCount, transcendUpgrades, transcendCount,
      reincarnateUpgrades, reincarnateCount, totalClicks, eventsTriggered, challengeResults,
      runes, offerings, corruptions, sacrificeCount, totalSacrificeBonuses, lastSaveTime: Date.now(),
    }));
    const id = setInterval(save, 10000);
    window.addEventListener("beforeunload", save);
    return () => { clearInterval(id); window.removeEventListener("beforeunload", save); };
  }, [gold, totalGold, clickPower, souls, totalSouls, soulShards, totalShards, demonEssence,
    buildings, achievements, prestigeUpgrades, prestigeCount, transcendUpgrades, transcendCount,
    reincarnateUpgrades, reincarnateCount, totalClicks, eventsTriggered, challengeResults,
    runes, offerings, corruptions, sacrificeCount, totalSacrificeBonuses]);

  // ═══════════════════════════════════════════════════════════════
  // RENDER HELPERS
  // ═══════════════════════════════════════════════════════════════

  const renderItem = (u: any, cost: number, canBuy: boolean, onClick: () => void, extra?: string) => (
    <div key={u.id} style={canBuy ? shopItem : shopDis} onClick={canBuy ? onClick : undefined}>
      <span style={iconS}>{u.icon || "▪"}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div>{u.name}</div>
        <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{u.desc}{extra ? " " + extra : ""}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div>{fmt(cost)}{u.gps != null ? "g" : ""}</div>
        {(buildings[u.id] || 0) > 0 && <div style={{ opacity: 0.5, fontSize: "0.85em" }}>x{buildings[u.id]}</div>}
      </div>
    </div>
  );

  const renderUpgradeList = (items: any[], levels: Record<string,number>, currency: number, setCurrency: any, setUpgrades: any, currName: string) => (
    <CardDouble title={currName.toUpperCase() + " UPGRADES"}>
      {items.map(u => {
        const level = levels[u.id] || 0;
        const canBuy = currency >= u.costPer && level < u.max;
        return (
          <div key={u.id} style={canBuy ? shopItem : shopDis} onClick={canBuy ? () => buyUpgrade(u, level, currency, setCurrency, setUpgrades, u.costPer) : undefined}>
            <span style={iconS}>{u.icon}</span>
            <div style={{ flex: 1 }}>
              <div>{u.name}</div>
              <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{u.desc}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div>Lv {level}/{u.max}</div>
              <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{u.costPer} {currName}</div>
            </div>
          </div>
        );
      })}
    </CardDouble>
  );

  const renderStats = () => {
    const stats = [
      ["Total gold earned", fmt(totalGold)],
      ["Gold per second", fmt(gps)],
      ["Click power", fmt(clickVal)],
      ["Total clicks", totalClicks.toLocaleString()],
      ["Total buildings", totalBuildings.toLocaleString()],
      ["Souls / Shards / Essence", fmt(souls) + " / " + fmt(soulShards) + " / " + fmt(demonEssence)],
      ["Prestiges / Transcends / Reincarnations", prestigeCount + " / " + transcendCount + " / " + reincarnateCount],
      ["Sacrifices", sacrificeCount.toString()],
      ["Offerings", fmt(offerings)],
      ["Challenges completed", challengeResults.filter(r => r.completed).length + "/" + CHALLENGES.length],
      ["Events triggered", eventsTriggered.toString()],
    ];
    return (
      <CardDouble title="STATS">
        {stats.map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderTop: "1px solid var(--theme-border)" }}>
            <span style={{ opacity: 0.6 }}>{l}</span><span>{v}</span>
          </div>
        ))}
      </CardDouble>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Banners */}
      {eventBanner && <div style={{ background: "var(--theme-focused-foreground)", color: "var(--theme-background)", padding: "6px 2ch", textAlign: "center", fontSize: "0.9em" }}>{eventBanner}</div>}
      {newAchievements.length > 0 && <div style={{ background: "var(--theme-text)", color: "var(--theme-background)", padding: "6px 2ch", textAlign: "center", fontSize: "0.9em" }}>Achievement unlocked!</div>}
      {offlinePopup !== null && offlinePopup > 0 && <div style={{ background: "var(--theme-focused-foreground)", color: "var(--theme-background)", padding: "6px 2ch", textAlign: "center", fontSize: "0.9em", cursor: "pointer" }} onClick={() => setOfflinePopup(null)}>Welcome back! Earned {fmt(offlinePopup)} gold while away. (click to dismiss)</div>}
      {activeChallenge >= 0 && <div style={{ background: "var(--theme-button)", color: "var(--theme-background)", padding: "6px 2ch", textAlign: "center", fontSize: "0.9em" }}>Challenge: {CHALLENGES[activeChallenge].name} — {fmt(totalGold)}/{fmt(challengeGoal)} — {challengeTimer.toFixed(1)}s</div>}

      <div style={isMobile ? { display: "block" } : layoutS}>
        {/* LEFT */}
        <div style={isMobile ? { borderBottom: "2px solid var(--theme-border)", padding: "1em 2ch" } : leftS}>
          <div style={goldS}>{fmt(gold)}</div>
          <div style={{ opacity: 0.6 }}>gold</div>
          <div style={{ opacity: 0.4, fontSize: "0.85em", marginTop: 4 }}>{fmt(gps)}/sec &middot; +{fmt(clickVal)}/click</div>

          {/* Currency row */}
          <div style={{ display: "flex", gap: "2ch", marginTop: 8, flexWrap: "wrap", fontSize: "0.85em" }}>
            {souls > 0 && <div><Badge>{fmt(souls)}</Badge> souls</div>}
            {soulShards > 0 && <div><Badge>{fmt(soulShards)}</Badge> shards</div>}
            {demonEssence > 0 && <div><Badge>{fmt(demonEssence)}</Badge> essence</div>}
            {offerings > 0 && <div><Badge>{fmt(offerings)}</Badge> offerings</div>}
          </div>

          <div style={{ display: "flex", justifyContent: "center", margin: "1em 0" }} ref={clickBtnRef}>
            <ActionButton onClick={doClick} hotkey={chalNoClick ? "DISABLED" : "+ " + fmt(clickVal)}>
              {chalNoClick ? "🚫" : "⚔"} RAID
            </ActionButton>
          </div>

          <div style={{ position: "relative", height: 0 }}>
            {particles.map(p => <div key={p.id} style={{ position: "absolute", left: p.x, top: p.y, pointerEvents: "none", fontWeight: 400, fontSize: "0.9em", animation: "floatUp 0.8s ease-out forwards", color: "var(--theme-focused-foreground)" }}>+{fmt(p.val)}</div>)}
          </div>
          <style>{`@keyframes floatUp { 0% { opacity:1; transform:translateY(0); } 100% { opacity:0; transform:translateY(-40px); } }`}</style>

          {/* Game of Life */}
          <div style={{ textAlign: "center", margin: "1em 0" }}>
            <canvas ref={canvasRef} style={{ border: "1px solid var(--theme-border)", borderRadius: 4, imageRendering: "pixelated", width: "100%", maxWidth: COLS*(CELL+GAP)+GAP }} />
            <div style={{ opacity: 0.3, fontSize: "0.75em", marginTop: 4 }}>dungeon map &middot; cells alive</div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Reset buttons */}
          <div style={{ display: "flex", gap: "1ch", marginBottom: "1em", flexWrap: "wrap" }}>
            <ActionButton onClick={doPrestige} hotkey={prestigeSouls >= 1 ? "+"+prestigeSouls : "—"}>
              Prestige
            </ActionButton>
            {transcendCount > 0 || totalSouls >= 100 ? (
              <ActionButton onClick={doTranscend} hotkey={transcendShards >= 1 ? "+"+transcendShards : "—"}>
                Transcend
              </ActionButton>
            ) : null}
            {reincarnateCount > 0 || totalShards >= 10 ? (
              <ActionButton onClick={doReincarnate} hotkey={reincarnateEssence >= 1 ? "+"+reincarnateEssence : "—"}>
                Reincarnate
              </ActionButton>
            ) : null}
          </div>

          {totalBuildings > 0 && (
            <div style={{ marginBottom: "1em" }}>
              <ActionButton onClick={doSacrifice} hotkey={fmt(sacrificeValue)}>
                Sacrifice All ({fmt(offerings)} + {fmt(sacrificeValue)})
              </ActionButton>
            </div>
          )}

          {/* Upgrade trees */}
          {renderUpgradeList(SOUL_UPGRADES, prestigeUpgrades, freeSouls, setSouls, setPrestigeUpgrades, "souls")}
          {transcendCount > 0 && <br />}
          {transcendCount > 0 && renderUpgradeList(SHARD_UPGRADES, transcendUpgrades, freeShards, setSoulShards, setTranscendUpgrades, "shards")}
          {reincarnateCount > 0 && <br />}
          {reincarnateCount > 0 && renderUpgradeList(ESSENCE_UPGRADES, reincarnateUpgrades, freeEssence, setDemonEssence, setReincarnateUpgrades, "essence")}
        </div>

        {/* RIGHT */}
        <div style={rightS}>
          <div style={{ padding: "2em 3ch 0", borderBottom: "1px solid var(--theme-border)" }}>
            <span style={tab === "hirelings" ? tabA : tabS} onClick={() => setTab("hirelings")}>HIRELINGS</span>
            <span style={tab === "upgrades" ? tabA : tabS} onClick={() => setTab("upgrades")}>UPGRADES</span>
            <span style={tab === "challenges" ? tabA : tabS} onClick={() => setTab("challenges")}>CHALLENGES</span>
            <span style={tab === "runes" ? tabA : tabS} onClick={() => setTab("runes")}>RUNES</span>
            <span style={tab === "stats" ? tabA : tabS} onClick={() => setTab("stats")}>STATS</span>
          </div>

          <div style={{ padding: "1em 3ch" }}>
            {tab === "hirelings" && (
              <CardDouble title="HIRELINGS">
                {HIRES.map(u => renderItem(u, getHireCost(u, buildings, soulDiscount, corrCostMult), gold >= getHireCost(u, buildings, soulDiscount, corrCostMult) * totalCostMult, () => buy(u, true)))}
              </CardDouble>
            )}

            {tab === "upgrades" && (
              <CardDouble title="CLICK UPGRADES">
                {CLICK_UPGRADES.map(u => renderItem(u, getUpgCost(u, buildings, corrCostMult), gold >= getUpgCost(u, buildings, corrCostMult) * totalCostMult && (!u.max || (buildings[u.id]||0) < u.max), () => buy(u, false), u.max ? "(" + (buildings[u.id]||0) + "/" + u.max + ")" : ""))}
              </CardDouble>
            )}

            {tab === "challenges" && (
              <CardDouble title="CHALLENGES">
                <div style={{ opacity: 0.6, marginBottom: "1em", fontSize: "0.85em" }}>
                  Earn {fmt(challengeGoal)} gold under restrictions. Permanent bonuses on completion.
                </div>
                {CHALLENGES.map((c, i) => {
                  const r = challengeResults[i];
                  const canStart = activeChallenge < 0;
                  return (
                    <div key={i} style={{ padding: "8px 0", borderTop: "1px solid var(--theme-border)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1ch" }}>
                        <span style={iconS}>{c.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div>{c.name} {r.completed && <Badge>✓</Badge>}</div>
                          <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{c.desc} &middot; Reward: {c.rewardDesc}</div>
                          {r.completed && <div style={{ opacity: 0.4, fontSize: "0.75em" }}>Best: {r.bestTime.toFixed(1)}s</div>}
                        </div>
                        {canStart && !r.completed && (
                          <ActionButton onClick={() => startChallenge(i)} hotkey="START">Start</ActionButton>
                        )}
                        {r.completed && (
                          <ActionButton onClick={() => startChallenge(i)} hotkey="RETRY">Retry</ActionButton>
                        )}
                      </div>
                    </div>
                  );
                })}
                {activeChallenge >= 0 && (
                  <div style={{ marginTop: "1em" }}>
                    <ActionButton onClick={() => endChallenge(false)} hotkey="ABANDON">Abandon Challenge</ActionButton>
                  </div>
                )}
              </CardDouble>
            )}

            {tab === "runes" && (
              <>
                <CardDouble title="RUNES">
                  <div style={{ opacity: 0.6, marginBottom: "1em", fontSize: "0.85em" }}>
                    Level runes with offerings (from sacrifice). Offerings: <span style={{ color: "var(--theme-text)" }}>{fmt(offerings)}</span>
                  </div>
                  {RUNES.map(u => {
                    const level = runes[u.id] || 0;
                    const cost = getRuneCost(u, level);
                    const canBuy = offerings >= cost && level < u.max;
                    return (
                      <div key={u.id} style={canBuy ? shopItem : shopDis} onClick={canBuy ? () => buyRune(u) : undefined}>
                        <span style={iconS}>{u.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div>{u.name}</div>
                          <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{u.desc}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div>Lv {level}/{u.max}</div>
                          <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{fmt(cost)} offerings</div>
                        </div>
                      </div>
                    );
                  })}
                </CardDouble>
                <br />
                <CardDouble title="CORRUPTIONS">
                  <div style={{ opacity: 0.6, marginBottom: "1em", fontSize: "0.85em" }}>
                    Opt-in debuffs that multiply rewards. Score: {corruptionScore} (x{corruptionMult.toFixed(1)} rewards)
                  </div>
                  {CORRUPTIONS.map(c => {
                    const level = corruptions[c.id] || 0;
                    return (
                      <div key={c.id} style={{ padding: "8px 0", borderTop: "1px solid var(--theme-border)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1ch" }}>
                          <div style={{ flex: 1 }}>
                            <div>{c.name}</div>
                            <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{c.desc}</div>
                          </div>
                          <div style={{ display: "flex", gap: "4px" }}>
                            <ActionButton onClick={() => setCorruptions(cr => ({ ...cr, [c.id]: Math.max(0, level - 1) }))} hotkey="-">-</ActionButton>
                            <span style={{ padding: "0 1ch" }}>{level}/{c.max}</span>
                            <ActionButton onClick={() => setCorruptions(cr => ({ ...cr, [c.id]: Math.min(c.max, level + 1) }))} hotkey="+">+</ActionButton>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardDouble>
              </>
            )}

            {tab === "stats" && renderStats()}
          </div>
        </div>
      </div>
    </div>
  );
}
