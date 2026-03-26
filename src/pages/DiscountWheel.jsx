import { useState, useMemo, useCallback } from 'react';
import Confetti from 'react-confetti';
import { discountWheelConfig } from '../config/discountWheel.config';

const SLICE_DEGREES = 45;
const EDGE_MARGIN_DEGREES = 8;
const MIN_FULL_SPINS = 3;
const MAX_EXTRA_SPINS = 2;
const getEligibleSliceIndexes = segments =>
  segments
    .map((segment, index) => (segment.value === 5 || segment.value === 10 ? index : null))
    .filter(index => index !== null);

const computeSpinDelta = ({
  currentRotationDeg,
  sliceIndex,
  sliceDegrees = SLICE_DEGREES,
  edgeMargin = EDGE_MARGIN_DEGREES,
  minFullSpins = MIN_FULL_SPINS,
  maxExtraSpins = MAX_EXTRA_SPINS,
}) => {
  const fullSpins = Math.floor(Math.random() * maxExtraSpins) + minFullSpins;
  const safeOffset =
    Math.random() * (sliceDegrees - 2 * edgeMargin) + edgeMargin - sliceDegrees / 2;
  const sliceCenterDeg = sliceIndex * sliceDegrees + sliceDegrees / 2;
  const targetPointerDeg = sliceCenterDeg + safeOffset;
  const baseRotation = currentRotationDeg % 360;
  const desiredFinal = 360 - targetPointerDeg;
  return ((desiredFinal - baseRotation + 360) % 360) + fullSpins * 360;
};

const PointerIcon = ({ color }) => (
  <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow"
    >
      <path
        d="M16 30s10-9 10-17a10 10 0 1 0-20 0c0 8 10 17 10 17Z"
        fill={color}
        stroke="#b5891b"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="13" r="4" fill="#b5891b" />
    </svg>
  </div>
);

const SpinButton = ({ onClick, disabled, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full text-base sm:text-lg md:text-xl font-extrabold text-white shadow-2xl border-4 border-amber-200 transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
    style={{
      background: 'radial-gradient(circle at 30% 30%, #ffe8a3, #f2a600 55%, #c77700 100%)',
      boxShadow:
        '0 12px 25px rgba(0,0,0,0.25), inset 0 -6px 10px rgba(0,0,0,0.25), inset 0 4px 8px rgba(255,255,255,0.35)',
    }}
  >
    <span className="drop-shadow">{label}</span>
    <span
      className="pointer-events-none absolute inset-2 rounded-full"
      style={{
        boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.2)',
      }}
    ></span>
  </button>
);

const DiscountWheel = () => {
  const [wheelRotationDeg, setWheelRotationDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const { segments, spinButtonText, pointerColor } = discountWheelConfig;

  const segmentGradient = useMemo(
    () =>
      segments
        .map(
          (segment, index) =>
            `${segment.color} ${index * SLICE_DEGREES}deg ${(index + 1) * SLICE_DEGREES}deg`,
        )
        .join(', '),
    [segments],
  );

  const wheelStyle = {
    background: `conic-gradient(${segmentGradient})`,
    transform: `rotate(${wheelRotationDeg}deg)`,
    transition: isSpinning ? 'transform 2.6s cubic-bezier(0.23, 0.78, 0.32, 1)' : 'none',
    willChange: 'transform',
  };

  const spinWheel = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedSlice(null);
    setCouponCode('');

    const eligibleSliceIndexes = getEligibleSliceIndexes(segments);
    const targetSliceIndex =
      eligibleSliceIndexes[Math.floor(Math.random() * eligibleSliceIndexes.length)];

    const deltaRotationDeg = computeSpinDelta({
      currentRotationDeg: wheelRotationDeg,
      sliceIndex: targetSliceIndex,
    });

    setWheelRotationDeg(prev => prev + deltaRotationDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const landedSlice = segments[targetSliceIndex];
      setSelectedSlice(landedSlice);
      const code = `LUCKY${landedSlice.value}${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`;
      setCouponCode(code);
    }, 3000);
  }, [segments, wheelRotationDeg, isSpinning]);

  return (
    <div className="min-h-screen flex flex-col mt-0 mb-10 items-center justify-start px-3 py-8 md:px-4 md:py-10 bg-[var(--color-white,#ffffff)]">
      <div className="text-center mb-2 sm:mb-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 drop-shadow-sm">Lucky Spin Wheel</h1>
        <p className="text-sm md:text-lg text-slate-600 mt-1">Spin to win amazing discounts</p>
      </div>

      <div className="w-full max-w-xl">
        <div className="relative mx-auto rounded-3xl bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_18px_45px_rgba(0,0,0,0.10)] px-4 py-4 sm:px-5 sm:py-7 md:px-6 md:py-8">
          <div className="absolute inset-0 rounded-3xl bg-white/45 pointer-events-none"></div>

          <div className="relative flex flex-col items-center">
            <div
              className="relative"
              style={{
                width: 'clamp(240px, 76vw, 360px)',
                height: 'clamp(240px, 76vw, 360px)',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-amber-200/50 blur-3xl opacity-60"></div>

              <PointerIcon color={pointerColor} />

              <div
                className="w-full h-full rounded-full shadow-2xl border-[5px] md:border-[6px] border-gray-900 relative overflow-hidden bg-slate-900"
                style={wheelStyle}
              >
                <div className="absolute inset-2 rounded-full bg-black opacity-10"></div>

                {segments.map((seg, i) => (
                  <div
                    key={i}
                    className="absolute inset-2 sm:inset-3 md:inset-4 flex items-center justify-center text-white font-semibold text-[10px] sm:text-xs md:text-base drop-shadow-lg"
                    style={{
                      transform: `rotate(${i * 45 + 22.5}deg) translateY(-38%)`,
                      transformOrigin: 'center',
                    }}
                  >
                    <span
                      className="px-2 py-1 rounded-full bg-black/35 max-w-[82%] truncate"
                      style={{ transform: `rotate(${-i * 45 - 22.5}deg)` }}
                    >
                      {seg.label}
                    </span>
                  </div>
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                  <SpinButton onClick={spinWheel} disabled={isSpinning} label={spinButtonText} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reserve vertical space so the wheel doesn't shift when result appears */}
        <div className="mt-4 sm:mt-6 md:mt-7 flex justify-center min-h-[170px] sm:min-h-[190px] md:min-h-[220px]">
          {selectedSlice && (
            <div
              className="w-full max-w-sm rounded-[18px] overflow-hidden"
            >
              <div
                className="rounded-[18px] px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-center"
                style={{
                  background: 'linear-gradient(135deg, #1a0533 0%, #0d0d2b 100%)',
                }}
              >
                <div
                  className="text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase mb-1"
                  style={{
                    background: 'linear-gradient(90deg, #FFD700, #FF6A00, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  🏆 Congratulations!
                </div>
                <div
                  className="text-xl sm:text-2xl md:text-[26px] font-bold leading-snug"
                  style={{
                    background: 'linear-gradient(90deg, #FFD700 0%, #fff 50%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  You won {selectedSlice.label} 🎉
                </div>
                {couponCode && (
                  <div className="mt-2 text-[11px] sm:text-xs tracking-[0.22em] text-[#FFD700aa] font-mono">
                    Code: {couponCode}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedSlice && !isSpinning && (
        <Confetti
          numberOfPieces={120}
          recycle={false}
          gravity={0.4}
          initialVelocityY={12}
          tweenDuration={1800}
        />
      )}
    </div>
  );
};

export default DiscountWheel;
