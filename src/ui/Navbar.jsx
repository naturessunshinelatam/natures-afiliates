import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCountryToDetected,
  setCountryCode,
  fetchGeo,
} from "../store/geoSlice";
import { NSPLogo } from "./NSPLogo";

const links = [
  { id: "hero", label: "Inicio" },
  { id: "supplements", label: "Suplementos" },
  { id: "catalog", label: "Catálogo" },
  { id: "feature", label: "Beneficios" },
  { id: "testimonials", label: "Testimonios" },
  { id: "join", label: "Afíliate" },
];

const countries = [
  { code: "MX", label: "México" },
  { code: "CO", label: "Colombia" },
  { code: "EC", label: "Ecuador" },
  { code: "GT", label: "Guatemala" },
  { code: "SV", label: "El Salvador" },
  { code: "HN", label: "Honduras" },
  { code: "PA", label: "Panamá" },
  { code: "DO", label: "Rep. Dominicana" },
];

const goId = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { countryCode, status, detectedCountryCode, manual } = useSelector(
    (state) => state.geo,
  );

  const go = (id) => {
    goId(id);
    setOpen(false);
  };

  const onChangeCountry = (e) => {
    dispatch(setCountryCode(e.target.value));
  };

  return (
    <header className="nav">
      <div className="nav__top">
        <span className="nav__pill">
          {status === "loading" ? "Detectando país" : `Región: ${countryCode} `}
        </span>
        <div className="nav__selectWrap">
          <label htmlFor="countrySelect" className="nav__label">
            País
          </label>
          <select
            id="countrySelect"
            className="nav__select"
            value={countryCode}
            onChange={onChangeCountry}
            disabled={status === "loading"}
          >
            <option value="LATAM">LATAM (default)</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          {manual && (
            <button
              className="nav__reset"
              onClick={() => dispatch(fetchGeo({ force: true }))}
              disabled={status === "loading"}
            >
              Usar detectado
            </button>
          )}
        </div>
      </div>
      <div className="nav__bar">
        <div
          className="nav__brand"
          onClick={() => go("hero")}
          role="button"
          tabIndex={0}
        >
          <NSPLogo className="nav__brandLogo" color="var(--a)" />
          <span className="nav__brandText">Natures-afiliates</span>
        </div>

        <button
          className="nav__toggle"
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
        >
          {open ? "Cerrar" : "Menú"}
        </button>

        <nav className="nav__links nav__links--desktop">
          {links.map((l) => (
            <button key={l.id} className="nav__btn" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
      </div>

      {open && (
        <nav className="nav__panel">
          {links.map((l) => (
            <button
              key={l.id}
              className="nav__panelBtn"
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
