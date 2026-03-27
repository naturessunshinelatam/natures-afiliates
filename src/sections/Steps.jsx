import {
  Coins,
  Gift,
  HandCoins,
  Megaphone,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useActiveContent } from "../lib/useActiveContent";
import "./Steps.scss";

const iconByTitle = (title, step) => {
  const t = String(title || "").toLowerCase();

  if (t.includes("compra") || t.includes("ahorra")) return ShoppingBag;
  if (t.includes("vende") || t.includes("comparte")) return Megaphone;
  if (t.includes("regla") || t.includes("3")) return HandCoins;
  if (t.includes("comunidad") || t.includes("equipo")) return Users;
  if (t.includes("bono") || t.includes("reto")) return Gift;

  // deterministic fallback by position
  const fallback = [ShoppingBag, Megaphone, HandCoins, Users, Coins];
  return fallback[(Number(step) - 1) % fallback.length] || Coins;
};

export const Steps = ({ onJoinClick }) => {
  const content = useActiveContent();
  const steps = content?.steps;

  if (!steps) return null;

  return (
    <section className="steps">
      <div className="wrap">
        <header className="steps__header">
          <h2 className="steps__title">{steps.title}</h2>
          {steps.subtitle && (
            <p className="steps__subtitle">{steps.subtitle}</p>
          )}
          {steps.description && (
            <p className="steps__description">{steps.description}</p>
          )}
        </header>

        <div className="steps__grid">
          {steps.items.map((item) => {
            const Icon = iconByTitle(item.title, item.step);
            return (
              <article className="steps__card" key={item.step}>
                <span className="steps__iconWrap" aria-hidden="true">
                  <Icon className="steps__icon" strokeWidth={1.9} />
                </span>
                <h3 className="steps__card-title">{item.title}</h3>
                <p className="steps__card-body">{item.body}</p>
              </article>
            );
          })}
        </div>

        <footer className="steps__footer">
          <button className="btn steps__cta" onClick={onJoinClick}>
            {steps.cta}
          </button>
        </footer>
      </div>
    </section>
  );
};
