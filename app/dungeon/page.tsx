"use client";

import "@root/global-fonts.css";
import "@root/global.css";

import * as React from "react";

import Card from "@components/Card";
import CardDouble from "@components/CardDouble";
import ActionButton from "@components/ActionButton";
import Badge from "@components/Badge";
import BarProgress from "@components/BarProgress";
import DefaultLayout from "@components/page/DefaultLayout";

const HIRES = [
  { id: "rat", name: "Giant Rat", desc: "Scurries for coins", baseCost: 15, gps: 0.5, costMult: 1.15, icon: "~" },
  { id: "goblin", name: "Goblin Worker", desc: "Mines gold ore", baseCost: 100, gps: 3, costMult: 1.15, icon: "⛏" },
  { id: "skeleton", name: "Skeleton Guard", desc: "Patrols for treasure", baseCost: 500, gps: 12, costMult: 1.15, icon: "☠" },
  { id: "troll", name: "Cave Troll", desc: "Sits on gold piles", baseCost: 3000, gps: 50, costMult: 1.15, icon: "⛰" },
  { id: "imp", name: "Fire Imp", desc: "Smelts pure gold", baseCost: 15000, gps: 200, costMult: 1.15, icon: "🔥" },
  { id: "necro", name: "Necromancer", desc: "Raises the dead 24/7", baseCost: 80000, gps: 800, costMult: 1.15, icon: "⚰" },
  { id: "demon", name: "Demon Lord", desc: "Extorts adventurers", baseCost: 400000, gps: 3500, costMult: 1.15, icon: "👿" },
  { id: "dragon", name: "Ancient Dragon", desc: "Legendary hoarder", baseCost: 2500000, gps: 15000, costMult: 1.15, icon: "🐉" },
];

const CLICK_UPGRADES = [
  { id: "sword", name: "Sharper Sword", desc: "+1 per click", baseCost: 500, clickPow: 1, costMult: 3, max: 10, icon: "⚔" },
  { id: "scroll", name: "Looting Scroll", desc: "+5 per click", baseCost: 5000, clickPow: 5, costMult: 3, max: 10, icon: "📜" },
  { id: "amulet", name: "Greed Amulet", desc: "+25 per click", baseCost: 100000, clickPow: 25, costMult: 3, max: 10, icon: "💎" },
];

function fmt(n: number): string {
  if (n < 1000) return Math.floor(n).toLocaleString();
  const s = ["", "K", "M", "B", "T", "Qa", "Qi"];
  const t = Math.min(Math.floor(Math.log10(Math.abs(n)) / 3), s.length - 1);
  const v = n / Math.pow(10, t * 3);
  return v.toFixed(v < 10 ? 2 : v < 100 ? 1 : 0) + s[t];
}

const layout: React.CSSProperties = {
  display: "flex",
  gap: 0,
  minHeight: "80vh",
};

const leftCol: React.CSSProperties = {
  flex: "0 0 300px",
  borderRight: "2px solid var(--theme-border)",
  padding: "calc(var(--font-size) * var(--theme-line-height-base)) 2ch",
};

const rightCol: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  padding: "calc(var(--font-size) * var(--theme-line-height-base)) 2ch",
  maxHeight: "85vh",
  overflowY: "auto",
};

const goldBig: React.CSSProperties = {
  fontSize: "2.4em",
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: "-1px",
};

const clickArea: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  margin: "calc(var(--font-size) * var(--theme-line-height-base)) 0",
};

const shopItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "6px 0",
  cursor: "pointer",
  gap: "1ch",
  borderTop: "1px solid var(--theme-border)",
};

const shopItemDisabled: React.CSSProperties = {
  ...shopItem,
  opacity: 0.3,
  cursor: "default",
};

const iconStyle: React.CSSProperties = {
  width: "3ch",
  textAlign: "center",
  flexShrink: 0,
};

const mobileBreakpoint = 700;

export default function DungeonPage() {
  const [gold, setGold] = React.useState(0);
  const [totalGold, setTotalGold] = React.useState(0);
  const [clickPower, setClickPower] = React.useState(1);
  const [souls, setSouls] = React.useState(0);
  const [buildings, setBuildings] = React.useState<Record<string, number>>({});
  const [flash, setFlash] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const lastTick = React.useRef(Date.now());

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const soulBonus = 1 + souls * 0.1;
  const getCost = (u: { baseCost: number; costMult: number; id: string }) =>
    Math.floor(u.baseCost * Math.pow(u.costMult, buildings[u.id] || 0));

  const gps = React.useMemo(() => {
    let g = 0;
    HIRES.forEach((u) => { g += u.gps * (buildings[u.id] || 0); });
    return g * soulBonus;
  }, [buildings, soulBonus]);

  const clickVal = React.useMemo(() => {
    let p = clickPower;
    CLICK_UPGRADES.forEach((u) => { p += u.clickPow * (buildings[u.id] || 0); });
    return p * soulBonus;
  }, [clickPower, buildings, soulBonus]);

  const prestigeSouls = totalGold < 100000 ? 0 : Math.floor(Math.sqrt(totalGold / 100000));

  const buy = (u: any) => {
    const cost = getCost(u);
    if (gold < cost || (u.max && (buildings[u.id] || 0) >= u.max)) return;
    setGold((g) => g - cost);
    setBuildings((b) => ({ ...b, [u.id]: (b[u.id] || 0) + 1 }));
  };

  const doClick = () => {
    const val = clickVal;
    setGold((g) => g + val);
    setTotalGold((t) => t + val);
    setFlash(true);
    setTimeout(() => setFlash(false), 80);
  };

  const doPrestige = () => {
    if (prestigeSouls < 1) return;
    setSouls((s) => s + prestigeSouls);
    setGold(0);
    setTotalGold(0);
    setClickPower(1);
    setBuildings({});
  };

  React.useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const dt = (now - lastTick.current) / 1000;
      lastTick.current = now;
      const earned = gps * dt;
      setGold((g) => g + earned);
      setTotalGold((t) => t + earned);
    };
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [gps]);

  React.useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("dungeonInc") || "{}");
      if (d.gold) setGold(d.gold);
      if (d.totalGold) setTotalGold(d.totalGold);
      if (d.clickPower) setClickPower(d.clickPower);
      if (d.souls) setSouls(d.souls);
      if (d.buildings) setBuildings(d.buildings);
    } catch {}
  }, []);

  React.useEffect(() => {
    const save = () =>
      localStorage.setItem("dungeonInc", JSON.stringify({ gold, totalGold, clickPower, souls, buildings }));
    const id = setInterval(save, 10000);
    window.addEventListener("beforeunload", save);
    return () => { clearInterval(id); window.removeEventListener("beforeunload", save); };
  }, [gold, totalGold, clickPower, souls, buildings]);

  const renderShopItem = (u: any) => {
    const cost = getCost(u);
    const owned = buildings[u.id] || 0;
    const canBuy = gold >= cost && (!u.max || owned < u.max);

    return (
      <div
        key={u.id}
        style={canBuy ? shopItem : shopItemDisabled}
        onClick={() => canBuy && buy(u)}
      >
        <span style={iconStyle}>{(u as any).icon || "▪"}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div>{u.name}</div>
          <div style={{ color: "var(--theme-text)", opacity: 0.5, fontSize: "0.85em" }}>
            {u.desc}
            {u.max ? ` (${owned}/${u.max})` : ""}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div>{fmt(cost)}g</div>
          {owned > 0 && (
            <div style={{ opacity: 0.5, fontSize: "0.85em" }}>x{owned}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      <div style={isMobile ? { display: "block" } : layout}>
        {/* LEFT: Click area + prestige */}
        <div style={isMobile ? { borderBottom: "2px solid var(--theme-border)", paddingBottom: "1em" } : leftCol}>
          <div style={goldBig}>{fmt(gold)}</div>
          <div style={{ opacity: 0.6 }}>gold</div>
          <div style={{ opacity: 0.4, fontSize: "0.85em", marginTop: 4 }}>
            {fmt(gps)}/sec &middot; +{fmt(clickVal)}/click
          </div>

          <div style={clickArea}>
            <ActionButton onClick={doClick} hotkey={"+ " + fmt(clickVal)}>
              {flash ? "⚔" : "⚔"} RAID
            </ActionButton>
          </div>

          {souls > 0 && (
            <div style={{ opacity: 0.5, fontSize: "0.85em", textAlign: "center", marginBottom: "1em" }}>
              <Badge>{souls}</Badge> souls (+{((soulBonus - 1) * 100).toFixed(0)}%)
            </div>
          )}

          <CardDouble title="PRESTIGE">
            <div style={{ fontSize: "0.85em", opacity: 0.6 }}>
              Souls earned: <span style={{ color: "var(--theme-text)" }}>{prestigeSouls}</span>
            </div>
            <BarProgress progress={Math.min(100, (totalGold / 100000) * 100)} />
            <div style={{ fontSize: "0.85em", opacity: 0.5, marginBottom: 8 }}>
              {fmt(totalGold)} / 100K total
            </div>
            <ActionButton onClick={doPrestige} hotkey={prestigeSouls >= 1 ? "RESET" : "LOCKED"}>
              {prestigeSouls < 1 ? "NEED 100K GOLD" : "RETIRE (+" + prestigeSouls + ")"}
            </ActionButton>
          </CardDouble>
        </div>

        {/* RIGHT: Shop */}
        <div style={rightCol}>
          <CardDouble title="HIRELINGS">
            {HIRES.map((u) => renderShopItem(u))}
          </CardDouble>

          <CardDouble title="CLICK UPGRADES">
            {CLICK_UPGRADES.map((u) => renderShopItem(u))}
          </CardDouble>
        </div>
      </div>
    </DefaultLayout>
  );
}
