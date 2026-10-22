"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3,
  Gem, Menu, Search, ShieldCheck, Sparkles, TrendingUp, Watch, X
} from "lucide-react";

type WatchModel = {
  brand: string;
  model: string;
  reference: string;
  years: string;
  low: number;
  high: number;
  image: string;
  tag: string;
};

const watches: WatchModel[] = [
  {
    brand: "Rolex", model: "Submariner Date", reference: "126610LN",
    years: "2020–2025", low: 118000, high: 142000,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=85",
    tag: "Ikonisk dykarklocka"
  },
  {
    brand: "Omega", model: "Speedmaster Moonwatch", reference: "310.30.42.50.01.001",
    years: "2021–2025", low: 58000, high: 72000,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1200&q=85",
    tag: "Klassisk kronograf"
  },
  {
    brand: "Cartier", model: "Santos de Cartier", reference: "WSSA0018",
    years: "2018–2025", low: 56000, high: 69000,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=85",
    tag: "Modern klassiker"
  },
  {
    brand: "Tudor", model: "Black Bay 58", reference: "79030N",
    years: "2018–2025", low: 27000, high: 35000,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
    tag: "Vintageinspirerad"
  },
  {
    brand: "TAG Heuer", model: "Carrera Chronograph", reference: "CBS2210",
    years: "2023–2025", low: 48000, high: 61000,
    image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=85",
    tag: "Sportig precision"
  },
  {
    brand: "Grand Seiko", model: "Snowflake", reference: "SBGA211",
    years: "2017–2025", low: 39000, high: 49000,
    image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=1200&q=85",
    tag: "Japansk hantverk"
  }
];

const formatSEK = (value: number) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<WatchModel | null>(null);
  const [condition, setCondition] = useState("Bra");
  const [box, setBox] = useState("Ja");
  const [papers, setPapers] = useState("Ja");
  const [year, setYear] = useState("2022");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return watches.slice(0, 4);
    return watches.filter(w => `${w.brand} ${w.model} ${w.reference}`.toLowerCase().includes(q));
  }, [query]);

  const estimate = useMemo(() => {
    if (!selected) return null;
    const conditionFactor = condition === "Som ny" ? 1.05 : condition === "Sliten" ? 0.82 : condition === "Använt" ? 0.94 : 1;
    const setFactor = (box === "Ja" ? 1 : -0.025) + (papers === "Ja" ? 0.0 : -0.035);
    return {
      low: Math.round((selected.low * conditionFactor * (1 + setFactor)) / 500) * 500,
      high: Math.round((selected.high * conditionFactor * (1 + setFactor)) / 500) * 500
    };
  }, [selected, condition, box, papers]);

  const startValuation = () => {
    setShowResults(false);
    document.getElementById("värdera")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.getElementById("watch-search")?.focus(), 350);
  };

  const chooseWatch = (watch: WatchModel) => {
    setSelected(watch);
    setQuery(`${watch.brand} ${watch.model}`);
    setShowResults(false);
  };

  const submitValuation = () => {
    if (!selected) return;
    setShowResults(true);
  };

  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        En smartare start på din nästa klockaffär
        <ArrowRight size={14} />
      </div>

      <header className="site-header">
        <a className="brand" href="#" aria-label="ChronoValue startsida">
          <span className="brand-mark"><Watch size={22} strokeWidth={1.6} /></span>
          <span>chrono<span className="brand-light">value</span></span>
        </a>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#hur-det-funkar" onClick={() => setMobileMenu(false)}>Så fungerar det</a>
          <a href="#populart" onClick={() => setMobileMenu(false)}>Populära klockor</a>
          <a href="#om-vardering" onClick={() => setMobileMenu(false)}>Om värderingen</a>
        </nav>
        <div className="header-actions">
          <a className="header-link" href="#vardera">Värdera klocka</a>
          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Öppna meny">
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> KLOCKVÄRDERING, PÅ ETT NYTT SÄTT</div>
          <h1>Din klocka.<br /><em>Ditt värde.</em></h1>
          <p className="hero-lede">Ta reda på vad din klocka kan vara värd — med en tydlig uppskattning, utan krånglet.</p>
          <div className="hero-ctas">
            <button className="button button-dark" onClick={startValuation}>Värdera min klocka <ArrowRight size={17} /></button>
            <a className="text-link" href="#hur-det-funkar">Så fungerar det <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars"><span>R</span><span>O</span><span>C</span></div>
            <div><strong>För dig som uppskattar detaljer</strong><small>Från första klockan till samlarfavoriten</small></div>
          </div>
          <div className="hero-stats">
            <div><strong>30 sek</strong><span>Enkel process</span></div>
            <div className="stat-divider" />
            <div><strong>Oberoende</strong><span>Värderingsguide</span></div>
            <div className="stat-divider" />
            <div><strong>Gratis</strong><span>Att komma igång</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1500&q=90" alt="Elegant mekanisk klocka i närbild" className="hero-image" />
            <div className="image-shade" />
            <div className="image-caption"><span>THE ART OF TIME</span><span>01 / 06</span></div>
          </div>
          <div className="floating-card valuation-float">
            <div className="float-label"><span className="green-pulse" /> EXEMPEL PÅ VÄRDERING</div>
            <div className="float-value">124 500 kr</div>
            <div className="float-change"><TrendingUp size={14} /> Illustrativt marknadsvärde</div>
            <div className="mini-chart"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
          </div>
          <div className="floating-note"><Sparkles size={15} /><span>Kunskap som ger<br /><b>bättre beslut.</b></span></div>
          <div className="hero-index">EST. FOR WATCH ENTHUSIASTS <span>—</span> SWEDEN</div>
        </div>
      </section>

      <section className="trust-strip">
        <span>UPPTÄCK VÄRDET I KLOCKOR FRÅN</span>
        <div className="brand-list"><b>ROLEX</b><b>OMEGA</b><b className="cartier-word">CARTIER</b><b>TUDOR</b><b>TAG HEUER</b><b className="gs-word">GRAND SEIKO</b></div>
      </section>

      <section className="valuation-section section-pad" id="värdera">
        <div className="section-heading">
          <div className="eyebrow"><span className="eyebrow-line" /> DIN VÄRDERING BÖRJAR HÄR</div>
          <h2>Vad är din klocka <em>värd?</em></h2>
          <p>Välj din modell och berätta lite om skicket. Vi guidar dig vidare.</p>
        </div>
        <div className="valuation-panel" id="vardera">
          <div className="valuation-form">
            <div className="form-topline"><span className="step-number">01</span><span>IDENTIFIERA DIN KLOCKA</span><span className="step-progress">STEG 1 AV 2</span></div>
            <label htmlFor="watch-search">Märke, modell eller referensnummer</label>
            <div className="search-field">
              <Search size={19} />
              <input id="watch-search" value={query} onChange={e => { setQuery(e.target.value); setSelected(null); setShowResults(false); }} placeholder="T.ex. Rolex Submariner" autoComplete="off" />
              <kbd>⌕</kbd>
            </div>
            {query.trim() && !selected && (
              <div className="search-results">
                {filtered.length ? filtered.map(w => (
                  <button key={w.reference} className="search-result" onClick={() => chooseWatch(w)}>
                    <img src={w.image} alt="" />
                    <span><b>{w.brand} {w.model}</b><small>{w.reference}</small></span>
                    <ArrowRight size={16} />
                  </button>
                )) : <div className="no-results">Hittar ingen modell i demo-biblioteket. Prova Rolex, Omega, Cartier eller Tudor.</div>}
              </div>
            )}
            {!query.trim() && <div className="popular-searches"><span>POPULÄRA SÖKNINGAR</span>{["Rolex", "Omega", "Cartier", "Tudor"].map(b => <button key={b} onClick={() => setQuery(b)}>{b}</button>)}</div>}
            {selected && (
              <div className="selected-watch">
                <img src={selected.image} alt={`${selected.brand} ${selected.model}`} />
                <div><small>VALD MODELL</small><b>{selected.brand} {selected.model}</b><span>Ref. {selected.reference}</span></div>
                <button aria-label="Ta bort vald klocka" onClick={() => {setSelected(null);setQuery("");setShowResults(false);}}><X size={16}/></button>
              </div>
            )}
            <div className="form-divider" />
            <div className="form-topline"><span className="step-number">02</span><span>BERÄTTA OM SKICKET</span><span className="step-progress">VALFRITT</span></div>
            <div className="field-grid">
              <div className="field-group">
                <label htmlFor="condition">Skick</label>
                <div className="select-wrap"><select id="condition" value={condition} onChange={e => {setCondition(e.target.value);setShowResults(false);}}><option>Som ny</option><option>Bra</option><option>Använt</option><option>Sliten</option></select><ChevronDown size={16}/></div>
              </div>
              <div className="field-group">
                <label htmlFor="year">Tillverkningsår</label>
                <div className="select-wrap"><select id="year" value={year} onChange={e => setYear(e.target.value)}>{Array.from({length: 35}, (_, i) => String(2026-i)).map(y => <option key={y}>{y}</option>)}<option>Äldre / okänt</option></select><ChevronDown size={16}/></div>
              </div>
              <div className="field-group">
                <label htmlFor="box">Originalbox</label>
                <div className="select-wrap"><select id="box" value={box} onChange={e => {setBox(e.target.value);setShowResults(false);}}><option>Ja</option><option>Nej</option></select><ChevronDown size={16}/></div>
              </div>
              <div className="field-group">
                <label htmlFor="papers">Originalpapper</label>
                <div className="select-wrap"><select id="papers" value={papers} onChange={e => {setPapers(e.target.value);setShowResults(false);}}><option>Ja</option><option>Nej</option></select><ChevronDown size={16}/></div>
              </div>
            </div>
            <button className="button button-dark valuation-submit" onClick={submitValuation} disabled={!selected}>Visa uppskattat värde <ArrowRight size={17}/></button>
            <p className="form-disclaimer"><ShieldCheck size={14}/> Kostnadsfritt och utan förpliktelser.</p>
          </div>
          <div className="valuation-aside">
            {!showResults || !estimate ? (
              <>
                <div className="aside-icon"><Gem size={21}/></div>
                <span className="aside-kicker">EN SMARTARE VÄRDERING</span>
                <h3>Varje detalj<br/>gör skillnad.</h3>
                <p>Modell, skick och tillbehör påverkar värdet. Vi hjälper dig förstå helheten.</p>
                <div className="aside-checks"><span><Check size={15}/> Tydligt prisintervall</span><span><Check size={15}/> Enkel steg-för-steg-guide</span><span><Check size={15}/> Inga förpliktelser</span></div>
                <div className="aside-watch-art"><img src="https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=700&q=85" alt="Detaljbild av en klassisk klocka"/></div>
                <div className="aside-bottom"><span>PRECISION IN EVERY DETAIL</span><span>CV.01</span></div>
              </>
            ) : (
              <div className="result-card">
                <div className="result-badge"><Sparkles size={14}/> DIN UPPSKATTNING</div>
                <p className="result-brand">{selected?.brand} · {selected?.model}</p>
                <h3>Uppskattat värde</h3>
                <div className="result-price">{formatSEK(estimate.low)}<span> – </span>{formatSEK(estimate.high)}</div>
                <p className="result-subtitle">Indikativt prisintervall i SEK</p>
                <div className="result-line"><span>Skick</span><b>{condition}</b></div>
                <div className="result-line"><span>Originalbox</span><b>{box}</b></div>
                <div className="result-line"><span>Originalpapper</span><b>{papers}</b></div>
                <div className="result-notice">Detta är en demo-uppskattning baserad på exempeldata, inte en verifierad marknadsvärdering.</div>
                <button className="button button-outline" onClick={() => {setShowResults(false);setSelected(null);setQuery("");}}>Värdera en annan klocka <ArrowRight size={16}/></button>
              </div>
            )}
          </div>
        </div>
        <div className="valuation-footnote"><ShieldCheck size={16}/><span>Vi tror på transparens. Värden i den här första versionen är exempeldata och ska inte användas som underlag för köp eller försäljning.</span></div>
      </section>

      <section className="popular-section section-pad" id="populart">
        <div className="popular-head">
          <div><div className="eyebrow"><span className="eyebrow-line" /> KLOCKOR ATT UPPTÄCKA</div><h2>Ikoner som håller <em>tiden.</em></h2></div>
          <button className="text-link" onClick={startValuation}>Värdera din klocka <ArrowRight size={16}/></button>
        </div>
        <div className="watch-grid">
          {watches.slice(0, 4).map((w, i) => (
            <article className="watch-card" key={w.reference}>
              <button className="watch-card-image" onClick={() => {chooseWatch(w);startValuation();}} aria-label={`Värdera ${w.brand} ${w.model}`}>
                <img src={w.image} alt={`${w.brand} ${w.model}`} loading="lazy"/>
                <span className="card-index">0{i+1}</span><span className="card-arrow"><ArrowUpRight size={18}/></span>
              </button>
              <div className="watch-card-copy"><span>{w.brand}</span><h3>{w.model}</h3><p>{w.tag}</p><button onClick={() => {chooseWatch(w);startValuation();}}>Värdera modell <ArrowRight size={14}/></button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section section-pad" id="hur-det-funkar">
        <div className="how-intro"><div className="eyebrow"><span className="eyebrow-line" /> ENKLARE ÄN DU TROR</div><h2>Från nyfiken<br/>till <em>klockkoll.</em></h2><p>Du behöver inte vara expert. Börja med det du vet — vi hjälper dig med resten.</p></div>
        <div className="steps">
          <div className="step-card"><span className="step-count">01</span><div className="step-icon"><Search size={21}/></div><h3>Hitta din modell</h3><p>Sök på märke, modell eller referensnummer för att hitta rätt klocka.</p></div>
          <div className="step-card"><span className="step-count">02</span><div className="step-icon"><Clock3 size={21}/></div><h3>Lägg till detaljer</h3><p>Berätta om skick, år och tillbehör för en mer relevant uppskattning.</p></div>
          <div className="step-card"><span className="step-count">03</span><div className="step-icon"><TrendingUp size={21}/></div><h3>Få en överblick</h3><p>Se ett tydligt värdeintervall och förstå vad som påverkar klockans värde.</p></div>
        </div>
      </section>

      <section className="editorial-section" id="om-vardering">
        <div className="editorial-image"><img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1400&q=85" alt="Detaljerad närbild av armbandsur" loading="lazy"/></div>
        <div className="editorial-copy"><div className="eyebrow"><span className="eyebrow-line" /> KUNSKAP FÖRE GISSNING</div><h2>Ett pris är en sak.<br/><em>Rätt värde är en annan.</em></h2><p>En klockas värde påverkas av mer än märket på urtavlan. Referens, skick, servicehistorik, tillbehör och marknadens efterfrågan spelar alla roll.</p><p>ChronoValue är byggt för att göra den informationen lättare att förstå — med transparens kring vad som är en uppskattning och vad som bygger på verifierad data.</p><button className="button button-light" onClick={startValuation}>Börja värdera <ArrowRight size={16}/></button></div>
      </section>

      <section className="closing-cta">
        <div className="closing-orb"><Watch size={34} strokeWidth={1.2}/></div>
        <div className="eyebrow"><span className="eyebrow-line" /> DIN KLOCKRESA BÖRJAR HÄR</div>
        <h2>Nyfiken på vad<br/><em>du bär på handleden?</em></h2>
        <p>Ta första steget mot en bättre bild av din klockas värde.</p>
        <button className="button button-dark" onClick={startValuation}>Värdera min klocka <ArrowRight size={17}/></button>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark"><Watch size={20} strokeWidth={1.6}/></span><span>chrono<span className="brand-light">value</span></span></a>
        <p>Mer kunskap. Bättre klockbeslut.</p>
        <div className="footer-right"><span>© 2026 CHRONOVALUE</span><a href="#om-vardering">Om värderingen</a><a href="#värdera">Till värderingen ↑</a></div>
      </footer>
    </main>
  );
}
