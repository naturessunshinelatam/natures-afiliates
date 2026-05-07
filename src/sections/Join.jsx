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
            <p className="muted">Únete a la Green Revolution por WhatsApp.</p>
            <p className="muted">Nuestros horarios: {join.contact.schedule}</p>
            <WhatsAppButton
              phone={join.contact.whatsapp}
              label="Hablar por WhatsApp"
              className="join__wa"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};
