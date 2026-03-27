import { useEffect, useRef, useState, useCallback } from "react";
import "./Hero.css";

const slides = [
  {
    bg: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1920&q=90",
    tag: "PREMIUM CRUISE EXPERIENCE",
    heading: ["India's First", "Verified Cruise", "Booking Platform"],
    sub: "Explore the world's finest cruise lines with trusted, verified bookings — tailored for Indian travellers.",
  },
  {
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90",
    tag: "LUXURY AT SEA",
    heading: ["Sail Into", "Extraordinary", "Destinations"],
    sub: "From the Mediterranean to the Indian Ocean — your dream voyage begins here.",
  },
  {
    bg: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1920&q=90",
    tag: "EXCLUSIVE DEALS",
    heading: ["Best Prices,", "Guaranteed", "Everywhere"],
    sub: "We partner with top cruise lines to bring you exclusive rates and unmatched value.",
  },
];



const SLIDE_DURATION = 6000;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [visible, setVisible] = useState(false);
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
    setTimeout(() => setVisible(true), 80);
    // Start autoplay after component mounts
    const timer = setTimeout(() => {
      startAutoplay();
    }, 100);
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

  const px = (mousePos.x - 0.5) * 20;
  const py = (mousePos.y - 0.5) * 12;
  const slide = slides[active];

  return (
    <div ref={heroRef} onMouseMove={handleMouseMove}
      style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", background: "#04101f" }}>

      {/* DECO */}
      <div className="deco-grid" />
      {[560,360,160].map((s,i) => (
        <div key={i} className="deco-ring" style={{
          width:s,height:s,right:-s*.18,top:"50%",transform:"translateY(-50%)"
        }} />
      ))}

      {/* BG SLIDES */}
      {slides.map((s, i) => (
        <div key={i} className={`sbg${i===active?" sbg-active":i===prev?" sbg-out":" sbg-in"}`}
          style={{
            opacity: i===active ? 1 : i===prev ? 0 : 0,
            zIndex: i===active ? 2 : i===prev ? 1 : 0,
            transition: "opacity 1.1s cubic-bezier(.4,0,.2,1)",
            "--px": i===active ? px : 0,
            "--py": i===active ? py : 0,
          }}>
          <img src={s.bg} alt="" />
          <div className="sbg-overlay" />
          <div className="sbg-grain" />
          <div className="sbg-streak" />
        </div>
      ))}
      {/* CONTENT — re-keyed to replay animations per slide */}
      <div className="hcontent" key={`c-${active}`}>
        <div className="htag">
          <span className="htag-line" />
          {slide.tag}
          <span className="htag-dot" />
        </div>
        <div>
          {slide.heading.map((line, i) => (
            <div key={i} className="hheadwrap">
              <span className={`hheadline${i===1?" gold":""}`}>{line}</span>
            </div>
          ))}
        </div>
        <p className="hsub">{slide.sub}</p>
        <div className="hbtns">
          <button className="btnp">Explore Cruises</button>
          <button className="btns">View Packages</button>
        </div>
      </div>

      {/* SLIDE PROGRESS */}
      <div className="hprog">
        {slides.map((s, i) => (
          <div key={i} className={`prog-item${i===active?" prog-act":""}`} onClick={() => goTo(i)}>
            <div className="prog-barwrap">
              <div className="prog-bar"
                style={{width: i===active ? `${progress}%` : i<active ? "100%" : "0%"}} />
            </div>
            <span className="prog-lbl">{s.tag.split(" ").slice(0,2).join(" ")}</span>
          </div>
        ))}
      </div>

      {/* COUNTER */}
      <div className="hcount">
        <span className="hcount-cur">0{active+1}</span>
        <span className="hcount-sep">/</span>
        <span className="hcount-tot">0{slides.length}</span>
      </div>

      {/* SCROLL */}
      <div className="hscroll">
        <div className="hscroll-mouse">
          <div className="hscroll-wheel" />
        </div>
        <span className="hscroll-txt">Scroll</span>
      </div>


    </div>
  );
}
