import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeAll,
  toggleMobileOpen,
  togglePathId,
  setScrolled,
  setHidden,
} from "../../store/Menu/menuSlice";
import { menuDefaults } from "./MenuDefaults";
import "./Menu.scss";

const deepMerge = (target, source) => {
  const out = { ...target };
  Object.keys(source || {}).forEach((key) => {
    const v = source[key];
    if (v && typeof v === "object" && !Array.isArray(v))
      out[key] = deepMerge(target[key] || {}, v);
    else out[key] = v;
  });
  return out;
};

const scrollToId = (id) => {
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
export const Menu = ({ config }) => {
  const dispatch = useDispatch();
  const { isMobileOpen, openPath, isScrolled, isHidden } = useSelector(
    (state) => state.menu,
  );

  const merged = useMemo(() => deepMerge(menuDefaults, config || {}), [config]);

  const lastYref = useRef(0);

  // Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const threshold = merged.behavior.scroll.threshold || 0;

      // Scrolled state ( para trasnaprente y también util general)

      dispatch(setScrolled(y > threshold));

      // hide ocultar al bajar muestra al subir
      if (merged.behavior.scroll.onScroll === "hide") {
        const goingDown = y > lastYref.current;
        const shouldHide = y > threshold && goingDown;
        dispatch(setHidden(shouldHide));
        lastYref.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // check on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    dispatch,
    merged.behavior.scroll.onScroll,
    merged.behavior.scroll.threshold,
  ]);

  const cssvars = {
    "--menu-height": `${merged.theme.height}px`,
    "--menu-bg": merged.theme.background,
    "--menu-bg-scrolled": merged.theme.backgroundScrolled,
    "--menu-text": merged.theme.text,
    "--menu-text-hover": merged.theme.textHover,
    "--menu-accent": merged.theme.accent,
    "--menu-gap": `${merged.layout.gap}px`,
    "--menu-maxw": `${merged.layout.containerMaxWidth}px`,
  };

  const isTransparentMode = merged.behavior.scroll.onScroll === "transparent";
  const isSticky = merged.behavior.mode === "sticky";

  const handleItemClick = (item) => {
    if (item.targetId) {
      scrollToId(item.targetId);
      dispatch(closeAll());
      return;
    }
    if (item.children && item.children.length > 0) {
      dispatch(togglePathId(item.id));
    }
  };

  const renderItems = (items, level = 0) => {
    return (
      <ul className={`menu__list menu__list--lvl-${level}`}>
        {items.map((item) => {
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;
          const isOpen = openPath.includes(item.id);

          return (
            <li
              key={item.id}
              className={`menu_item ${hasChildren ? "is-parent" : ""} ${isOpen ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="menu__link"
                onClick={() => handleItemClick(item)}
                aria-expanded={hasChildren ? isOpen : undefined}
              >
                <span>{item.label}</span>
                {hasChildren && <span className="menu__chev">"▼"</span>}
              </button>
              {hasChildren ? (
                <div
                  className={`menu__dropdown ${item.mega ? "menu__dropdown--mega" : ""}}`}
                  data-columns={item.columns || 1}
                >
                  {renderItems(item.children, level + 1)}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <header
      className={[
        "menu",
        isSticky ? "menu--sticky" : "menu--static",
        isTransparentMode ? "menu--transparent-mode" : "",
        isScrolled ? "is-scrolled" : "",
        isHidden ? "is-hidden" : "",
      ].join("")}
      style={cssvars}
    >
      <div className="menu__inner">
        {merged.logoPosition === "left" ? (
          <a
            href="#"
            className="menu__logo"
            onClick={(e) => e.preventDefault()}
          >
            <img
              src={merged.logo.src}
              alt={merged.logo.alt}
              style={{ width: merged.logo.width }}
            />
          </a>
        ) : null}

        <button
          className="menu__burger"
          type="button"
          onClick={() => dispatch(toggleMobileOpen())}
          aria-expanded={isMobileOpen}
        >
          <span className="menu__burgerLines" />
        </button>

        <nav
          className={`menu__nav ${isMobileOpen ? "is-open" : ""}`}
          aria-label="Main"
        >
          <div
            className="menu__navInner"
            style={{ justifyContent: merged.layout.align }}
          >
            {renderItems(merged.items)}
          </div>
        </nav>
        {merged.logo.position === "right" ? (
          <a href="#" className="menu__lo" onClick={(e) => e.preventDefault()}>
            <img
              src={merged.logo.src}
              alt={merged.logo.alt}
              style={{ width: merged.logo.width }}
            />
          </a>
        ) : null}
      </div>

      {isMobileOpen ? (
        <div className="menu__backdrop" onClick={() => dispatch(closeAll())} />
      ) : null}
    </header>
  );
};
