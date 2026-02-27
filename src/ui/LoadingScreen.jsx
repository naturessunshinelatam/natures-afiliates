import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export const LoadingScreen = ({ done, progress = 0, label = "Cargando…" }) => {
  const root = useRef(null);

  // SVG circle math

  const size = 84;
  const stroke = 8;
  const r = useMemo(() => (size - stroke) / 2, [size, stroke]);
  const c = useMemo(() => 2 * Math.PI * r, [r]);
  const offset = useMemo(() => c * (1 - progress / 100), [c, progress]);

  useEffect(() => {
    if (!done || !root.current) return;

    gsap.to(root.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        if (root.current) root.current.style.display = "none";
      },
    });
  }, [done]);

  return (
    <div ref={root} className="loader">
      <div className="loader__card">
        <div className="loader__meter" aria-label={`Cargando ${progress}%`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--a)" />
                <stop offset="100%" stopColor="var(--b)" />
              </linearGradient>
            </defs>

            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="rgba(255,255,255,.14)"
              strokeWidth={stroke}
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#lg)"
              strokeWidth={stroke}
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 220ms ease" }}
            />
          </svg>

          <div className="loader__pct">{progress}%</div>
        </div>

        <div>
          <strong>{label}</strong>
          <div className="muted fine">Preparando el sitio...</div>
        </div>
      </div>
    </div>
  );
};
