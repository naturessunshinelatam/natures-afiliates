import { useActiveContent } from "../lib/useActiveContent";
import { JoinForm } from "./JoinForm";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import "./Join.scss";

export const Join = () => {
  const content = useActiveContent();

  if (!content?.join) return null;

  const { join } = content;

  return (
    <div className="wrap section join">
      <header className="section__head">
        <h2>{join.title}</h2>
        <p className="muted">{join.subtitle}</p>
      </header>

      <div className="join__grid">
        <div className="join__box">
          <JoinForm />
        </div>

        <aside className="join__side">
          <div className="sideCard">
            <h3>Contacto rápido</h3>
            <p className="muted">{join.contact.email}</p>
            <p className="muted">WhatsApp: {join.contact.whatsapp}</p>
            <p className="muted">{join.contact.schedule}</p>
            <WhatsAppButton
              phone={join.contact.whatsapp}
              label="Hablar por WhatsApp"
              className="join__wa"
            />
          </div>
          <div className="sideCard sideCard--grad join__community">
            <img
              className="join__community-image"
              src={join.community?.image || "/imgs/join.png"}
              alt={join.community?.imageAlt || "Comunidad Sunshiner"}
              loading="lazy"
            />
            {/* <h3>{join.community?.title || "Una comunidad que crece"}</h3> */}
            {/* <p className="muted">
              {join.community?.lead ||
                "Hoy miles de personas estan entrando a la Green Revolution."}
            </p> */}
            <p className="muted">{join.community?.intro || "Personas que:"}</p>
            <ul className="join__community-list muted">
              {(
                join.community?.highlights || [
                  "comparten habitos",
                  "inspiran bienestar",
                  "y ayudan a otros a sentirse mejor.",
                ]
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">
              {join.community?.story ||
                "Cada Sunshiner tiene una historia diferente."}
            </p>
            <p className="muted">
              {join.community?.common || "Pero todos tienen algo en comun:"}
            </p>
            <p className="muted">
              {join.community?.closing ||
                "empezaron compartiendo lo que les funcionaba."}
            </p>
            <p className="muted">
              {join.community?.ending || "Y asi empezaron a crecer."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
