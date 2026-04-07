"use client";

import "@root/global-fonts.css";
import "@root/global.css";

import * as React from "react";

import Card from "@components/Card";
import CardDouble from "@components/CardDouble";
import ActionButton from "@components/ActionButton";
import Badge from "@components/Badge";
import BarProgress from "@components/BarProgress";
import Grid from "@components/Grid";
import Row from "@components/Row";
import DefaultLayout from "@components/page/DefaultLayout";

const HIRES = [
  { id: "rat", name: "Giant Rat", desc: "+0.5 gold/sec", baseCost: 15, gps: 0.5, costMult: 1.15 },
  { id: "goblin", name: "Goblin Worker", desc: "+3 gold/sec", baseCost: 100, gps: 3, costMult: 1.15 },
  { id: "skeleton", name: "Skeleton Guard", desc: "+12 gold/sec", baseCost: 500, gps: 12, costMult: 1.15 },
  { id: "troll", name: "Cave Troll", desc: "+50 gold/sec", baseCost: 3000, gps: 50, costMult: 1.15 },
  { id: "imp", name: "Fire Imp", desc: "+200 gold/sec", baseCost: 15000, gps: 200, costMult: 1.15 },
  { id: "necro", name: "Necromancer", desc: "+800 gold/sec", baseCost: 80000, gps: 800, costMult: 1.15 },
  { id: "demon", name: "Demon Lord", desc: "+3.5K gold/sec", baseCost: 400000, gps: 3500, costMult: 1.15 },
  { id: "dragon", name: "Ancient Dragon", desc: "+15K gold/sec", baseCost: 2500000, gps: 15000, costMult: 1.15 },
];

const UPGRADES = [
  { id: "sword", name: "Sharper Sword", desc: "+1 click power", baseCost: 500, clickPow: 1, costMult: 3, max: 10 },
  { id: "scroll", name: "Looting Scroll", desc: "+5 click power", baseCost: 5000, clickPow: 5, costMult: 3, max: 10 },
  { id: "amulet", name: "Greed Amulet", desc: "+25 click power", baseCost: 100000, clickPow: 25, costMult: 3, max: 10 },
];

function fmt(n: number): string {
  if (n < 1000) return Math.floor(n).toLocaleString();
  const s = ["", "K", "M", "B", "T", "Qa", "Qi"];
  const t = Math.min(Math.floor(Math.log10(Math.abs(n)) / 3), s.length - 1);
  const v = n / Math.pow(10, t * 3);
  return v.toFixed(v < 10 ? 2 : v < 100 ? 1 : 0) + s[t];
}

export default function DungeonPage() {
  const [gold, setGold] = React.useState(0);
  const [totalGold, setTotalGold] = React.useState(0);
  const [clickPower, setClickPower] = React.useState(1);
  const [souls, setSouls] = React.useState(0);
  const [buildings, setBuildings] = React.useState<Record<string, number>>({});
  const [log, setLog] = React.useState<string[]>(["Welcome to Dungeon Inc!"]);
  const lastTick = React.useRef(Date.now());

  const soulBonus = 1 + souls * 0.1;
  const getCost = (u: { baseCost: number; costMult: number; id: string }) => Math.floor(u.baseCost * Math.pow(u.costMult, buildings[u.id] || 0));

  const gps = React.useMemo(() => {
    let g = 0;
    HIRES.forEach((u) => { g += u.gps * (buildings[u.id] || 0); });
    return g * soulBonus;
  }, [buildings, soulBonus]);

  const clickVal = React.useMemo(() => {
    let p = clickPower;
    UPGRADES.forEach((u) => { p += u.clickPow * (buildings[u.id] || 0); });
    return p * soulBonus;
  }, [clickPower, buildings, soulBonus]);

  const prestigeSouls = totalGold < 100000 ? 0 : Math.floor(Math.sqrt(totalGold / 100000));
  const addLog = (msg: string) => setLog((l) => [msg, ...l].slice(0, 20));

  const buy = (list: typeof HIRES | typeof UPGRADES, u: any) => {
    const cost = getCost(u);
    if (gold < cost || (u.max && (buildings[u.id] || 0) >= u.max)) return;
    setGold((g) => g - cost);
    setBuildings((b) => ({ ...b, [u.id]: (b[u.id] || 0) + 1 }));
    addLog("Bought " + u.name + " (x" + ((buildings[u.id] || 0) + 1) + ")");
  };

  const doClick = () => {
    const val = clickVal;
    setGold((g) => g + val);
    setTotalGold((t) => t + val);
  };

  const doPrestige = () => {
    if (prestigeSouls < 1) return;
    setSouls((s) => s + prestigeSouls);
    setGold(0);
    setTotalGold(0);
    setClickPower(1);
    setBuildings({});
    addLog("Retired! +" + prestigeSouls + " Souls (total: " + (souls + prestigeSouls) + ")");
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

  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      <br />
      <Grid>
        <Row>
          DUNGEON INC. <Badge>INCREMENTAL</Badge>
        </Row>
        <Row>An idle clicker</Row>
      </Grid>

      <Grid>
        <CardDouble title="VAULT">
          <div style={{ fontSize: "2em", fontWeight: "bold" }}>{fmt(gold)} gold</div>
          <div>{fmt(gps)} gold/sec</div>
          <div style={{ opacity: 0.6 }}>Click power: +{fmt(clickVal)}</div>
          <br />
          <ActionButton onClick={doClick}>RAID THE DUNGEON</ActionButton>
        </CardDouble>
      </Grid>

      <Grid>
        <CardDouble title="HIRELINGS">
          {HIRES.map((u) => {
            const cost = getCost(u);
            const owned = buildings[u.id] || 0;
            const canBuy = gold >= cost;
            return (
              <div key={u.id}>
                <Card mode="left" title={u.name}>
                  {u.desc}
                  <br />
                  <ActionButton onClick={() => buy(HIRES, u)} hotkey={fmt(cost) + "g"}>
                    {!canBuy ? "CAN'T AFFORD" : "BUY x" + owned}
                  </ActionButton>
                </Card>
                <br />
              </div>
            );
          })}
        </CardDouble>

        <CardDouble title="UPGRADES">
          {UPGRADES.map((u) => {
            const cost = getCost(u);
            const owned = buildings[u.id] || 0;
            const canBuy = gold >= cost && owned < (u.max || Infinity);
            const pct = u.max ? (owned / u.max) * 100 : 0;
            return (
              <div key={u.id}>
                <Card mode="left" title={u.name}>
                  {u.desc}
                  <br />
                  {u.max && (
                    <>
                      <BarProgress progress={pct} />
                      {owned}/{u.max}
                      <br />
                    </>
                  )}
                  <ActionButton onClick={() => buy(UPGRADES, u)} hotkey={fmt(cost) + "g"}>
                    {!canBuy ? "CAN'T AFFORD" : "BUY x" + owned}
                  </ActionButton>
                </Card>
                <br />
              </div>
            );
          })}

          <Card mode="left" title="PRESTIGE">
            Souls: <Badge>{souls}</Badge> (+{((soulBonus - 1) * 100).toFixed(0)}%)
            <br />
            On retirement: <Badge>{prestigeSouls}</Badge>
            <br />
            <BarProgress progress={Math.min(100, (totalGold / 100000) * 100)} />
            {fmt(totalGold)} / 100K
            <br />
            <ActionButton onClick={doPrestige} hotkey={prestigeSouls >= 1 ? "+" + prestigeSouls : "LOCKED"}>
              {prestigeSouls < 1 ? "NEED 100K" : "RETIRE (+" + prestigeSouls + " SOULS)"}
            </ActionButton>
          </Card>
        </CardDouble>
      </Grid>

      <Grid>
        <Card title="LOG">
          {log.map((l, i) => (
            <div key={i} style={{ opacity: Math.max(0.3, 1 - i * 0.1), padding: "2px 0" }}>
              {l}
            </div>
          ))}
        </Card>
      </Grid>
      <br />
    </DefaultLayout>
  );
}
