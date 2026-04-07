"use client";

import "@root/global-fonts.css";
import "@root/global.css";

import * as React from "react";

import CardDouble from "@components/CardDouble";
import ActionButton from "@components/ActionButton";
import Badge from "@components/Badge";
import BarProgress from "@components/BarProgress";

// ── DATA ─────────────────────────────────────────────────────────────

const HIRES = [
  { id: "rat", name: "Giant Rat", desc: "Scurries for loose coins", baseCost: 15, gps: 0.5, costMult: 1.15, icon: "~" },
  { id: "goblin", name: "Goblin Worker", desc: "Mines gold ore from walls", baseCost: 100, gps: 3, costMult: 1.15, icon: "⛏" },
  { id: "skeleton", name: "Skeleton Guard", desc: "Patrols for treasure", baseCost: 500, gps: 12, costMult: 1.15, icon: "☠" },
  { id: "troll", name: "Cave Troll", desc: "Sits on gold piles", baseCost: 3000, gps: 50, costMult: 1.15, icon: "⛰" },
  { id: "imp", name: "Fire Imp", desc: "Smelts pure gold bars", baseCost: 15000, gps: 200, costMult: 1.15, icon: "🔥" },
  { id: "necro", name: "Necromancer", desc: "Raises the dead 24/7", baseCost: 80000, gps: 800, costMult: 1.15, icon: "⚰" },
  { id: "demon", name: "Demon Lord", desc: "Extorts adventurers", baseCost: 400000, gps: 3500, costMult: 1.15, icon: "👿" },
  { id: "architect", name: "Dungeon Architect", desc: "Designs optimal loot routes", baseCost: 2000000, gps: 15000, costMult: 1.15, icon: "📐" },
  { id: "mimic", name: "Mimic Colony", desc: "Eats adventurers, hoards gold", baseCost: 10000000, gps: 65000, costMult: 1.15, icon: "📦" },
  { id: "lich", name: "Ancient Lich", desc: "Magical gold multiplication", baseCost: 50000000, gps: 280000, costMult: 1.15, icon: "💀" },
  { id: "prince", name: "Demon Prince", desc: "Rules the lower planes", baseCost: 250000000, gps: 1200000, costMult: 1.15, icon: "👑" },
  { id: "dragon", name: "Elder Dragon", desc: "Ancient beyond measure", baseCost: 1500000000, gps: 5000000, costMult: 1.15, icon: "🐉" },
];

const CLICK_UPGRADES = [
  { id: "sword", name: "Sharper Sword", desc: "+1 per click", baseCost: 500, clickPow: 1, costMult: 3, max: 10, icon: "⚔" },
  { id: "scroll", name: "Looting Scroll", desc: "+5 per click", baseCost: 5000, clickPow: 5, costMult: 3, max: 10, icon: "📜" },
  { id: "amulet", name: "Greed Amulet", desc: "+25 per click", baseCost: 100000, clickPow: 25, costMult: 3, max: 10, icon: "💎" },
  { id: "blade", name: "Crystal Blade", desc: "+125 per click", baseCost: 2000000, clickPow: 125, costMult: 3, max: 10, icon: "🗡" },
  { id: "scale", name: "Dragon Scale", desc: "+625 per click", baseCost: 40000000, clickPow: 625, costMult: 3, max: 10, icon: "🐲" },
  { id: "stone", name: "Philosopher's Stone", desc: "+3125 per click", baseCost: 800000000, clickPow: 3125, costMult: 3, max: 10, icon: "✨" },
];

const ACHIEVEMENTS: { id: string; name: string; desc: string; check: (s: GameState) => boolean }[] = [
  { id: "click1", name: "First Blood", desc: "Click once", check: (s) => s.totalClicks >= 1 },
  { id: "click100", name: "Dedicated", desc: "Click 100 times", check: (s) => s.totalClicks >= 100 },
  { id: "click1000", name: "Obsessed", desc: "Click 1,000 times", check: (s) => s.totalClicks >= 1000 },
  { id: "click10000", name: "Carpal Tunnel", desc: "Click 10,000 times", check: (s) => s.totalClicks >= 10000 },
  { id: "gold100", name: "Pocket Change", desc: "Earn 100 gold", check: (s) => s.totalGold >= 100 },
  { id: "gold1k", name: "Walking Around Money", desc: "Earn 1K gold", check: (s) => s.totalGold >= 1000 },
  { id: "gold10k", name: "Nest Egg", desc: "Earn 10K gold", check: (s) => s.totalGold >= 10000 },
  { id: "gold100k", name: "Small Fortune", desc: "Earn 100K gold", check: (s) => s.totalGold >= 100000 },
  { id: "gold1m", name: "Millionaire", desc: "Earn 1M gold", check: (s) => s.totalGold >= 1000000 },
  { id: "gold10m", name: "Mogul", desc: "Earn 10M gold", check: (s) => s.totalGold >= 10000000 },
  { id: "gold100m", name: "Gold Hoarder", desc: "Earn 100M gold", check: (s) => s.totalGold >= 100000000 },
  { id: "gold1b", name: "Billionaire", desc: "Earn 1B gold", check: (s) => s.totalGold >= 1000000000 },
  { id: "gps1", name: "Passive Income", desc: "Reach 1 gold/sec", check: (s) => s._gps >= 1 },
  { id: "gps100", name: "Steady Flow", desc: "Reach 100 gold/sec", check: (s) => s._gps >= 100 },
  { id: "gps1k", name: "Gold Rush", desc: "Reach 1K gold/sec", check: (s) => s._gps >= 1000 },
  { id: "gps10k", name: "Midas Touch", desc: "Reach 10K gold/sec", check: (s) => s._gps >= 10000 },
  { id: "gps100k", name: "Gold Tsunami", desc: "Reach 100K gold/sec", check: (s) => s._gps >= 100000 },
  { id: "gps1m", name: "Gold Singularity", desc: "Reach 1M gold/sec", check: (s) => s._gps >= 1000000 },
  { id: "build1", name: "First Hire", desc: "Buy a hireling", check: (s) => s._totalBuildings >= 1 },
  { id: "build10", name: "Small Team", desc: "Own 10 hirelings", check: (s) => s._totalBuildings >= 10 },
  { id: "build50", name: "Workforce", desc: "Own 50 hirelings", check: (s) => s._totalBuildings >= 50 },
  { id: "build100", name: "Army", desc: "Own 100 hirelings", check: (s) => s._totalBuildings >= 100 },
  { id: "build500", name: "Empire", desc: "Own 500 hirelings", check: (s) => s._totalBuildings >= 500 },
  { id: "hire_rat", name: "Vermin Problem", desc: "Buy a Giant Rat", check: (s) => (s.buildings.rat || 0) >= 1 },
  { id: "hire_dragon", name: "Dragon Rider", desc: "Buy an Elder Dragon", check: (s) => (s.buildings.dragon || 0) >= 1 },
  { id: "hire_all", name: "Full Roster", desc: "Buy one of each hireling", check: (s) => HIRES.every((h) => (s.buildings[h.id] || 0) >= 1) },
  { id: "prestige1", name: "New Beginnings", desc: "Prestige once", check: (s) => s.prestigeCount >= 1 },
  { id: "prestige5", name: "Veteran", desc: "Prestige 5 times", check: (s) => s.prestigeCount >= 5 },
  { id: "prestige10", name: "Eternal", desc: "Prestige 10 times", check: (s) => s.prestigeCount >= 10 },
  { id: "souls1", name: "Soul Collector", desc: "Earn 1 soul", check: (s) => s.souls >= 1 },
  { id: "souls10", name: "Soul Hoarder", desc: "Earn 10 souls", check: (s) => s.souls >= 10 },
  { id: "souls50", name: "Soul Master", desc: "Earn 50 souls", check: (s) => s.souls >= 50 },
  { id: "event1", name: "Lucky Find", desc: "Trigger a random event", check: (s) => s.eventsTriggered >= 1 },
  { id: "event10", name: "Eventful", desc: "Trigger 10 events", check: (s) => s.eventsTriggered >= 10 },
  { id: "offline", name: "Welcome Back", desc: "Earn offline gold", check: (s) => s.offlineEarned > 0 },
];

const PRESTIGE_UPGRADES = [
  { id: "discount", name: "Bulk Discount", desc: "Hirelings cost 5% less", max: 10, costPerLevel: 1, icon: "🏷" },
  { id: "clickMult", name: "Mighty Hands", desc: "+10% click power per level", max: 10, costPerLevel: 1, icon: "💪" },
  { id: "gpsMult", name: "Efficiency", desc: "+10% gold/sec per level", max: 10, costPerLevel: 1, icon: "⚙" },
  { id: "eventLuck", name: "Lucky Stars", desc: "+15% event chance per level", max: 5, costPerLevel: 2, icon: "🍀" },
  { id: "offlinePow", name: "Deep Pockets", desc: "+20% offline earnings per level", max: 5, costPerLevel: 2, icon: "💤" },
  { id: "startGold", name: "Inheritance", desc: "Start with gold after prestige", max: 5, costPerLevel: 3, icon: "🏦" },
];

const EVENTS = [
  { text: "Adventurers attacked! You looted their corpses for", goldMult: 5 },
  { text: "A treasure chest appeared! Inside you found", goldMult: 10 },
  { text: "A wandering merchant tripped and spilled", goldMult: 3 },
  { text: "A dragon hoard was discovered, yielding", goldMult: 20 },
  { text: "An old dungeon collapsed, uncovering", goldMult: 8 },
  { text: "Bandits tried to rob you. You robbed them back for", goldMult: 6 },
];

// ── TYPES ────────────────────────────────────────────────────────────

interface GameState {
  gold: number;
  totalGold: number;
  clickPower: number;
  souls: number;
  buildings: Record<string, number>;
  achievements: string[];
  prestigeUpgrades: Record<string, number>;
  prestigeCount: number;
  totalClicks: number;
  eventsTriggered: number;
  lastSaveTime: number;
  offlineEarned: number;
  _gps: number;
  _totalBuildings: number;
}

// ── UTILS ────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n < 0) return "-" + fmt(-n);
  if (n < 1000) return Math.floor(n).toLocaleString();
  const s = ["", "K", "M", "B", "T", "Qa", "Qi"];
  const t = Math.min(Math.floor(Math.log10(Math.abs(n)) / 3), s.length - 1);
  const v = n / Math.pow(10, t * 3);
  return v.toFixed(v < 10 ? 2 : v < 100 ? 1 : 0) + s[t];
}

function getCost(u: { baseCost: number; costMult: number; id: string }, buildings: Record<string, number>, discount: number): number {
  const owned = buildings[u.id] || 0;
  return Math.floor(u.baseCost * Math.pow(u.costMult, owned) * (1 - discount * 0.05));
}

// ── STYLES ───────────────────────────────────────────────────────────

const layout: React.CSSProperties = { display: "flex", gap: 0, minHeight: "85vh" };
const leftCol: React.CSSProperties = {
  flex: "0 0 38%",
  borderRight: "2px solid var(--theme-border)",
  padding: "2em 3ch",
  display: "flex",
  flexDirection: "column",
};
const rightCol: React.CSSProperties = {
  flex: 1, minWidth: 0, padding: "0",
  maxHeight: "90vh", overflowY: "auto",
};
const goldBig: React.CSSProperties = { fontSize: "2.8em", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-1px" };
const clickBtn: React.CSSProperties = {
  display: "flex", justifyContent: "center",
  margin: "1em 0",
};
const shopItem: React.CSSProperties = {
  display: "flex", alignItems: "center", padding: "8px 0", cursor: "pointer",
  gap: "1ch", borderTop: "1px solid var(--theme-border)",
};
const shopDisabled: React.CSSProperties = { ...shopItem, opacity: 0.3, cursor: "default" };
const iconS: React.CSSProperties = { width: "3ch", textAlign: "center", flexShrink: 0 };
const tabStyle: React.CSSProperties = {
  display: "inline-block", padding: "4px 1ch", cursor: "pointer",
  opacity: 0.5, borderBottom: "2px solid transparent", marginRight: "1ch",
};
const tabActive: React.CSSProperties = {
  ...tabStyle, opacity: 1, borderBottom: "2px solid var(--theme-text)",
};

const mobileBreakpoint = 700;

// ── COMPONENT ────────────────────────────────────────────────────────

export default function DungeonPage() {
  // Core state
  const [gold, setGold] = React.useState(0);
  const [totalGold, setTotalGold] = React.useState(0);
  const [clickPower, setClickPower] = React.useState(1);
  const [souls, setSouls] = React.useState(0);
  const [buildings, setBuildings] = React.useState<Record<string, number>>({});
  const [achievements, setAchievements] = React.useState<string[]>([]);
  const [prestigeUpgrades, setPrestigeUpgrades] = React.useState<Record<string, number>>({});
  const [prestigeCount, setPrestigeCount] = React.useState(0);
  const [totalClicks, setTotalClicks] = React.useState(0);
  const [eventsTriggered, setEventsTriggered] = React.useState(0);
  const [lastSaveTime, setLastSaveTime] = React.useState(Date.now());

  // UI state
  const [tab, setTab] = React.useState<"hirelings" | "upgrades" | "achievements" | "stats">("hirelings");
  const [particles, setParticles] = React.useState<{ id: number; x: number; y: number; val: number }[]>([]);
  const [offlinePopup, setOfflinePopup] = React.useState<number | null>(null);
  const [eventBanner, setEventBanner] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [newAchievements, setNewAchievements] = React.useState<string[]>([]);
  const particleId = React.useRef(0);
  const lastTick = React.useRef(Date.now());
  const startTime = React.useRef(Date.now());

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Computed values
  const soulBonus = 1 + souls * 0.1;
  const discount = prestigeUpgrades.discount || 0;
  const clickMultBonus = 1 + (prestigeUpgrades.clickMult || 0) * 0.1;
  const gpsMultBonus = 1 + (prestigeUpgrades.gpsMult || 0) * 0.1;
  const eventChance = 0.0005 * (1 + (prestigeUpgrades.eventLuck || 0) * 0.15);
  const offlineMult = 0.5 + (prestigeUpgrades.offlinePow || 0) * 0.2;

  const gps = React.useMemo(() => {
    let g = 0;
    HIRES.forEach((u) => { g += u.gps * (buildings[u.id] || 0); });
    return g * soulBonus * gpsMultBonus;
  }, [buildings, soulBonus, gpsMultBonus]);

  const clickVal = React.useMemo(() => {
    let p = clickPower;
    CLICK_UPGRADES.forEach((u) => { p += u.clickPow * (buildings[u.id] || 0); });
    return p * soulBonus * clickMultBonus;
  }, [clickPower, buildings, soulBonus, clickMultBonus]);

  const totalBuildings = React.useMemo(() => {
    let t = 0;
    HIRES.forEach((u) => { t += buildings[u.id] || 0; });
    return t;
  }, [buildings]);

  const prestigeSouls = totalGold < 100000 ? 0 : Math.floor(Math.sqrt(totalGold / 100000));
  const freeSouls = Math.max(0, prestigeSouls - Object.values(prestigeUpgrades).reduce((a, b) => a + b, 0));

  const playTime = Date.now() - startTime.current;

  // Game state snapshot for achievements
  const gameState: GameState = React.useMemo(() => ({
    gold, totalGold, clickPower, souls, buildings, achievements, prestigeUpgrades,
    prestigeCount, totalClicks, eventsTriggered, lastSaveTime, offlineEarned: 0,
    _gps: gps, _totalBuildings: totalBuildings,
  }), [gold, totalGold, clickPower, souls, buildings, achievements, prestigeUpgrades,
    prestigeCount, totalClicks, eventsTriggered, lastSaveTime, gps, totalBuildings]);

  // ── ACTIONS ──────────────────────────────────────────────────────

  const buy = (u: any) => {
    const cost = getCost(u, buildings, discount);
    if (gold < cost || (u.max && (buildings[u.id] || 0) >= u.max)) return;
    setGold((g) => g - cost);
    setBuildings((b) => ({ ...b, [u.id]: (b[u.id] || 0) + 1 }));
  };

  const clickBtnRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const golRef = React.useRef<boolean[][]>([]);

  // ── GAME OF LIFE ────────────────────────────────────────────────

  const COLS = 48;
  const ROWS = 32;
  const CELL = 8;
  const GAP = 1;

  const initGol = React.useCallback(() => {
    const grid: boolean[][] = [];
    for (let y = 0; y < ROWS; y++) {
      grid[y] = [];
      for (let x = 0; x < COLS; x++) {
        grid[y][x] = Math.random() < 0.15;
      }
    }
    golRef.current = grid;
  }, []);

  const stepGol = React.useCallback(() => {
    const g = golRef.current;
    if (!g.length) return;
    const next: boolean[][] = [];
    for (let y = 0; y < ROWS; y++) {
      next[y] = [];
      for (let x = 0; x < COLS; x++) {
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = (y + dy + ROWS) % ROWS;
            const nx = (x + dx + COLS) % COLS;
            if (g[ny][nx]) neighbors++;
          }
        }
        next[y][x] = g[y][x] ? (neighbors === 2 || neighbors === 3) : neighbors === 3;
      }
    }
    golRef.current = next;
  }, []);

  const seedGol = React.useCallback(() => {
    const g = golRef.current;
    if (!g.length) return;
    for (let i = 0; i < 12; i++) {
      const y = Math.floor(Math.random() * ROWS);
      const x = Math.floor(Math.random() * COLS);
      g[y][x] = true;
    }
  }, []);

  const drawGol = React.useCallback(() => {
    const canvas = canvasRef.current;
    const g = golRef.current;
    if (!canvas || !g.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = COLS * (CELL + GAP) + GAP;
    const h = ROWS * (CELL + GAP) + GAP;
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, w, h);

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (g[y][x]) {
          // Gradient from green (young) to dim based on neighbor count
          let neighbors = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const ny = (y + dy + ROWS) % ROWS;
              const nx = (x + dx + COLS) % COLS;
              if (g[ny][nx]) neighbors++;
            }
          }
          const alpha = 0.3 + (neighbors / 8) * 0.7;
          ctx.fillStyle = `rgba(63, 185, 80, ${alpha})`;
        } else {
          ctx.fillStyle = "rgba(48, 54, 61, 0.3)";
        }
        ctx.fillRect(
          GAP + x * (CELL + GAP),
          GAP + y * (CELL + GAP),
          CELL, CELL
        );
      }
    }
  }, []);

  React.useEffect(() => {
    initGol();
    let frameCount = 0;
    const loop = () => {
      frameCount++;
      if (frameCount % 30 === 0) stepGol(); // evolve every ~30 frames (0.5s at 60fps)
      drawGol();
      requestAnimationFrame(loop);
    };
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [initGol, stepGol, drawGol]);

  // ── END GAME OF LIFE ────────────────────────────────────────────

  const doClick = () => {
    const val = clickVal;
    setGold((g) => g + val);
    setTotalGold((t) => t + val);
    setTotalClicks((c) => c + 1);
    seedGol(); // add life on each click

    // Random particle position
    const rect = clickBtnRef.current?.getBoundingClientRect();
    if (rect) {
      particleId.current++;
      const x = Math.random() * rect.width;
      const y = Math.random() * 20;
      setParticles((p) => [...p, { id: particleId.current, x, y, val }]);
      setTimeout(() => setParticles((p) => p.slice(1)), 800);
    }
  };

  const doPrestige = () => {
    if (prestigeSouls < 1) return;
    const startGold = (prestigeUpgrades.startGold || 0) > 0
      ? Math.pow(10, (prestigeUpgrades.startGold || 0) + 1) : 0;
    setSouls((s) => s + prestigeSouls);
    setGold(startGold);
    setTotalGold(startGold);
    setClickPower(1);
    setBuildings({});
    setPrestigeCount((c) => c + 1);
  };

  const buyPrestigeUpgrade = (u: typeof PRESTIGE_UPGRADES[0]) => {
    const level = prestigeUpgrades[u.id] || 0;
    if (level >= u.max || freeSouls < u.costPerLevel) return;
    setPrestigeUpgrades((p) => ({ ...p, [u.id]: level + 1 }));
  };

  // ── GAME TICK ────────────────────────────────────────────────────

  React.useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const dt = (now - lastTick.current) / 1000;
      lastTick.current = now;
      const earned = gps * dt;
      setGold((g) => g + earned);
      setTotalGold((t) => t + earned);

      // Random event
      if (Math.random() < eventChance && gps > 0) {
        const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        const bonus = Math.floor(gps * event.goldMult);
        setGold((g) => g + bonus);
        setTotalGold((t) => t + bonus);
        setEventsTriggered((e) => e + 1);
        setEventBanner(event.text + " " + fmt(bonus) + " gold!");
        setTimeout(() => setEventBanner(null), 4000);
      }
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [gps, eventChance]);

  // ── SAVE / LOAD ──────────────────────────────────────────────────

  React.useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("dungeonIncV2") || "{}");
      if (d.gold != null) setGold(d.gold);
      if (d.totalGold != null) setTotalGold(d.totalGold);
      if (d.clickPower != null) setClickPower(d.clickPower);
      if (d.souls != null) setSouls(d.souls);
      if (d.buildings) setBuildings(d.buildings);
      if (d.achievements) setAchievements(d.achievements);
      if (d.prestigeUpgrades) setPrestigeUpgrades(d.prestigeUpgrades);
      if (d.prestigeCount != null) setPrestigeCount(d.prestigeCount);
      if (d.totalClicks != null) setTotalClicks(d.totalClicks);
      if (d.eventsTriggered != null) setEventsTriggered(d.eventsTriggered);
      if (d.lastSaveTime) {
        const elapsed = (Date.now() - d.lastSaveTime) / 1000;
        const currentGps = gps; // will be stale, but close enough
        if (elapsed > 60 && currentGps > 0) {
          const offlineGold = Math.floor(currentGps * elapsed * offlineMult);
          setGold((g) => g + offlineGold);
          setTotalGold((t) => t + offlineGold);
          setOfflinePopup(offlineGold);
        }
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    const save = () => {
      localStorage.setItem("dungeonIncV2", JSON.stringify({
        gold, totalGold, clickPower, souls, buildings, achievements,
        prestigeUpgrades, prestigeCount, totalClicks, eventsTriggered,
        lastSaveTime: Date.now(),
      }));
    };
    const id = setInterval(save, 10000);
    window.addEventListener("beforeunload", save);
    return () => { clearInterval(id); window.removeEventListener("beforeunload", save); };
  }, [gold, totalGold, clickPower, souls, buildings, achievements,
    prestigeUpgrades, prestigeCount, totalClicks, eventsTriggered]);

  // ── ACHIEVEMENT CHECKER ──────────────────────────────────────────

  React.useEffect(() => {
    const gs = { ...gameState, _gps: gps, _totalBuildings: totalBuildings, offlineEarned: offlinePopup || 0 };
    const newlyUnlocked: string[] = [];
    ACHIEVEMENTS.forEach((a) => {
      if (!achievements.includes(a.id) && a.check(gs)) {
        newlyUnlocked.push(a.id);
      }
    });
    if (newlyUnlocked.length > 0) {
      setAchievements((prev) => [...prev, ...newlyUnlocked]);
      setNewAchievements((prev) => [...prev, ...newlyUnlocked]);
      setTimeout(() => {
        setNewAchievements((prev) => prev.filter((id) => !newlyUnlocked.includes(id)));
      }, 3000);
    }
  }, [gold, totalGold, clickPower, souls, buildings, achievements, prestigeUpgrades,
    prestigeCount, totalClicks, eventsTriggered, gps, totalBuildings, offlinePopup]);

  // ── RENDER HELPERS ───────────────────────────────────────────────

  const renderShopItem = (u: any) => {
    const cost = getCost(u, buildings, discount);
    const owned = buildings[u.id] || 0;
    const canBuy = gold >= cost && (!u.max || owned < u.max);

    return (
      <div key={u.id} style={canBuy ? shopItem : shopDisabled} onClick={() => canBuy && buy(u)}>
        <span style={iconS}>{u.icon || "▪"}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div>{u.name}</div>
          <div style={{ opacity: 0.5, fontSize: "0.85em" }}>
            {u.desc}{u.max ? ` (${owned}/${u.max})` : ""}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div>{fmt(cost)}g</div>
          {owned > 0 && <div style={{ opacity: 0.5, fontSize: "0.85em" }}>x{owned}</div>}
        </div>
      </div>
    );
  };

  const renderAchievement = (a: typeof ACHIEVEMENTS[0]) => {
    const unlocked = achievements.includes(a.id);
    return (
      <div key={a.id} style={{ padding: "6px 0", borderTop: "1px solid var(--theme-border)", opacity: unlocked ? 1 : 0.3 }}>
        <span>{unlocked ? "◆ " : "◇ "}</span>
        <span style={{ fontWeight: unlocked ? 400 : 400 }}>{a.name}</span>
        <span style={{ opacity: 0.5, marginLeft: "1ch", fontSize: "0.85em" }}>{a.desc}</span>
      </div>
    );
  };

  const renderStats = () => {
    const playSec = Math.floor(playTime / 1000);
    const playMin = Math.floor(playSec / 60);
    const playHr = Math.floor(playMin / 60);
    const playStr = playHr > 0 ? `${playHr}h ${playMin % 60}m` : playMin > 0 ? `${playMin}m ${playSec % 60}s` : `${playSec}s`;

    const stats = [
      ["Total gold earned", fmt(totalGold)],
      ["Gold per second", fmt(gps)],
      ["Click power", fmt(clickVal)],
      ["Total clicks", totalClicks.toLocaleString()],
      ["Total buildings", totalBuildings.toLocaleString()],
      ["Dungeon Souls", souls.toString()],
      ["Soul bonus", `+${((soulBonus - 1) * 100).toFixed(0)}%`],
      ["Prestiges", prestigeCount.toString()],
      ["Events triggered", eventsTriggered.toString()],
      ["Achievements", `${achievements.length}/${ACHIEVEMENTS.length}`],
      ["Play time", playStr],
    ];

    return (
      <CardDouble title="STATS">
        {stats.map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderTop: "1px solid var(--theme-border)" }}>
            <span style={{ opacity: 0.6 }}>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </CardDouble>
    );
  };

  // ── MAIN RENDER ──────────────────────────────────────────────────

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Event banner */}
      {eventBanner && (
        <div style={{
          background: "var(--theme-focused-foreground)", color: "var(--theme-background)",
          padding: "6px 2ch", textAlign: "center", fontSize: "0.9em", fontWeight: 400,
        }}>
          {eventBanner}
        </div>
      )}

      {/* Achievement toast */}
      {newAchievements.length > 0 && (
        <div style={{
          background: "var(--theme-text)", color: "var(--theme-background)",
          padding: "6px 2ch", textAlign: "center", fontSize: "0.9em",
        }}>
          Achievement unlocked: {ACHIEVEMENTS.find((a) => a.id === newAchievements[newAchievements.length - 1])?.name}
        </div>
      )}

      {/* Offline popup */}
      {offlinePopup !== null && offlinePopup > 0 && (
        <div style={{
          background: "var(--theme-focused-foreground)", color: "var(--theme-background)",
          padding: "6px 2ch", textAlign: "center", fontSize: "0.9em", cursor: "pointer",
        }} onClick={() => setOfflinePopup(null)}>
          Welcome back! You earned {fmt(offlinePopup)} gold while away. (click to dismiss)
        </div>
      )}

      <div style={isMobile ? { display: "block" } : layout}>
        {/* LEFT COLUMN */}
        <div style={isMobile ? { borderBottom: "2px solid var(--theme-border)", padding: "1em 2ch" } : leftCol}>
          <div style={goldBig}>{fmt(gold)}</div>
          <div style={{ opacity: 0.6 }}>gold</div>
          <div style={{ opacity: 0.4, fontSize: "0.85em", marginTop: 4 }}>
            {fmt(gps)}/sec &middot; +{fmt(clickVal)}/click
          </div>
          {souls > 0 && (
            <div style={{ opacity: 0.5, fontSize: "0.85em", marginTop: 8 }}>
              <Badge>{souls}</Badge> souls (+{((soulBonus - 1) * 100).toFixed(0)}%)
            </div>
          )}

          <div style={clickBtn} ref={clickBtnRef}>
            <ActionButton onClick={doClick} hotkey={"+ " + fmt(clickVal)}>
              ⚔ RAID
            </ActionButton>
          </div>

          {/* Click particles */}
          <div style={{ position: "relative", height: 0 }}>
            {particles.map((p) => (
              <div key={p.id} style={{
                position: "absolute", left: p.x, top: p.y, pointerEvents: "none",
                fontWeight: 400, fontSize: "0.9em", animation: "floatUp 0.8s ease-out forwards",
                color: "var(--theme-focused-foreground)",
              }}>
                +{fmt(p.val)}
              </div>
            ))}
          </div>

          <style>{`@keyframes floatUp { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-40px); } }`}</style>

          {/* Game of Life dungeon map */}
          <div style={{ textAlign: "center", margin: "1em 0" }}>
            <canvas
              ref={canvasRef}
              style={{
                border: "1px solid var(--theme-border)",
                borderRadius: "4px",
                imageRendering: "pixelated",
                width: "100%",
                maxWidth: COLS * (CELL + GAP) + GAP,
              }}
            />
            <div style={{ opacity: 0.3, fontSize: "0.75em", marginTop: 4 }}>
              dungeon map · cells alive
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Prestige */}
          <CardDouble title="PRESTIGE">
            <div style={{ fontSize: "0.85em", opacity: 0.6 }}>
              Souls on retirement: <span style={{ color: "var(--theme-text)" }}>{prestigeSouls}</span>
            </div>
            <div style={{ fontSize: "0.85em", opacity: 0.6 }}>
              Available to spend: <span style={{ color: "var(--theme-text)" }}>{freeSouls}</span>
            </div>
            <BarProgress progress={Math.min(100, (totalGold / 100000) * 100)} />
            <div style={{ fontSize: "0.85em", opacity: 0.5, marginBottom: 8 }}>
              {fmt(totalGold)} / 100K total
            </div>
            <ActionButton onClick={doPrestige} hotkey={prestigeSouls >= 1 ? "RESET" : "LOCKED"}>
              {prestigeSouls < 1 ? "NEED 100K GOLD" : "RETIRE (+" + prestigeSouls + ")"}
            </ActionButton>

            {/* Prestige upgrades */}
            {Object.keys(prestigeUpgrades).length > 0 || freeSouls > 0 ? (
              <div style={{ marginTop: "1em" }}>
                <div style={{ opacity: 0.5, fontSize: "0.85em", marginBottom: 8 }}>SOUL UPGRADES</div>
                {PRESTIGE_UPGRADES.map((u) => {
                  const level = prestigeUpgrades[u.id] || 0;
                  const canBuy = freeSouls >= u.costPerLevel && level < u.max;
                  return (
                    <div
                      key={u.id}
                      style={canBuy ? { ...shopItem, borderTop: "1px solid var(--theme-border)" } : { ...shopDisabled, borderTop: "1px solid var(--theme-border)" }}
                      onClick={() => canBuy && buyPrestigeUpgrade(u)}
                    >
                      <span style={iconS}>{u.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div>{u.name}</div>
                        <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{u.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div>{level}/{u.max}</div>
                        <div style={{ opacity: 0.5, fontSize: "0.85em" }}>{u.costPerLevel} soul{u.costPerLevel > 1 ? "s" : ""}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </CardDouble>
        </div>

        {/* RIGHT COLUMN */}
        <div style={rightCol}>
          {/* Tabs */}
          <div style={{ padding: "2em 3ch 0", borderBottom: "1px solid var(--theme-border)" }}>
            <span style={tab === "hirelings" ? tabActive : tabStyle} onClick={() => setTab("hirelings")}>HIRELINGS</span>
            <span style={tab === "upgrades" ? tabActive : tabStyle} onClick={() => setTab("upgrades")}>UPGRADES</span>
            <span style={tab === "achievements" ? tabActive : tabStyle} onClick={() => setTab("achievements")}>
              ACHIEVEMENTS {achievements.length}/{ACHIEVEMENTS.length}
            </span>
            <span style={tab === "stats" ? tabActive : tabStyle} onClick={() => setTab("stats")}>STATS</span>
          </div>

          <div style={{ padding: "1em 3ch" }}>
            {tab === "hirelings" && (
              <CardDouble title="HIRELINGS">
                {HIRES.map(renderShopItem)}
              </CardDouble>
            )}

            {tab === "upgrades" && (
              <CardDouble title="CLICK UPGRADES">
                {CLICK_UPGRADES.map(renderShopItem)}
              </CardDouble>
            )}

            {tab === "achievements" && (
              <CardDouble title={`ACHIEVEMENTS (${achievements.length}/${ACHIEVEMENTS.length})`}>
                {ACHIEVEMENTS.map(renderAchievement)}
              </CardDouble>
            )}

            {tab === "stats" && renderStats()}
          </div>
        </div>
      </div>
    </div>
  );
}
