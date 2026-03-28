import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import "./Hero.css";
import { heroSlides as slides } from "../config/hero.config";

const SLIDE_DURATION = 6000;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [progress, setProgress] = useState(0);
  const heroRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const startAutoplay = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    setProgress(0);
    const t0 = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - t0) / SLIDE_DURATION) * 100, 100));
    }, 40);
    timerRef.current = setInterval(() => {
      setActive((cur) => {
        const next = (cur + 1) % slides.length;
        setPrev(cur);
        setTransitioning(true);
        setTimeout(() => { setTransitioning(false); setPrev(null); }, 1000);
        return next;
      });
      clearInterval(progressRef.current);
      setProgress(0);
      const t1 = Date.now();
      progressRef.current = setInterval(() => {
        setProgress(Math.min(((Date.now() - t1) / SLIDE_DURATION) * 100, 100));
      }, 40);
    }, SLIDE_DURATION);
  }, []);

  const goTo = useCallback((idx) => {
    if (transitioning || idx === active) return;
    setPrev(active);
    setTransitioning(true);
    setActive(idx);
    setTimeout(() => { setTransitioning(false); setPrev(null); }, 1000);
    startAutoplay();
  }, [active, transitioning, startAutoplay]);

  useEffect(() => {
    const timer = setTimeout(() => { startAutoplay(); }, 100);
    return () => {
      clearTimeout(timer);
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [startAutoplay]);

  const handleMouseMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const px    = (mousePos.x - 0.5) * 20;
  const py    = (mousePos.y - 0.5) * 12;
  const slide = slides[active];

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden", background: "#04101f" }}
    >
      
      {/* BG SLIDES */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`sbg${i === active ? " sbg-active" : i === prev ? " sbg-out" : " sbg-in"}`}
          style={{
            opacity: i === active ? 1 : i === prev ? 0 : 0,
            zIndex: i === active ? 2 : i === prev ? 1 : 0,
            transition: "opacity 1.1s cubic-bezier(.4,0,.2,1)",
            "--px": i === active ? px : 0,
            "--py": i === active ? py : 0,
          }}
        >
          <img src={s.bg} alt="" />
          <div className="sbg-overlay" />
          <div className="sbg-grain" />
          <div className="sbg-streak" />
        </div>
      ))}

      {/* ── NAVBAR ── */}
      <nav className="hnav">
        <a className="hlogo" href="#">
          <span className="hlogo-main">LUMAVOYA</span>
          <span className="hlogo-sub">Luxury Cruises</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hnavlinks">
          {["Destinations", "Cruises", "Experiences", "About"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="/" className="hbooknow">Book Now</a>

        {/* Hamburger — visible on tablet/mobile only via CSS */}
        <a className="back-button" href="/" aria-label="Back to home">
          <ArrowLeft className="back-icon" size={16} /> Back
        </a>
        {/* <button
          className="hnav-burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`burger-bar${menuOpen ? " open" : ""}`} />
          <span className={`burger-bar${menuOpen ? " open" : ""}`} />
          <span className={`burger-bar${menuOpen ? " open" : ""}`} />
        </button> */}
      </nav>

      

      {/* ── CONTENT ── */}
      <div className="hcontent" key={`c-${active}`}>
        <div className="htag">
          <span className="htag-line" />
          {slide.tag}
          <span className="htag-dot" />
        </div>
        <div>
          {slide.heading.map((line, i) => (
            <div key={i} className="hheadwrap">
              <span className={`hheadline${i === 1 ? " gold" : ""}`}>{line}</span>
            </div>
          ))}
        </div>
        <p className="hsub">{slide.sub}</p>
        <div className="hbtns">
          <button className="btnp">Explore Cruises</button>
          <button className="btns">View Packages</button>
        </div>
      </div>

      {/* ── SLIDE PROGRESS ── */}
      <div className="hprog">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`prog-item${i === active ? " prog-act" : ""}`}
            onClick={() => goTo(i)}
          >
            <div className="prog-barwrap">
              <div
                className="prog-bar"
                style={{ width: i === active ? `${progress}%` : i < active ? "100%" : "0%" }}
              />
            </div>
            <span className="prog-lbl">{s.tag.split(" ").slice(0, 2).join(" ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
