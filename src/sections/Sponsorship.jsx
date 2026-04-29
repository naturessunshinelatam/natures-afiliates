import { useActiveContent } from "../lib/useActiveContent";
import "./Sponsorship.scss";

export const Sponsorship = () => {
  const content = useActiveContent();
  const data = content?.sponsorship;
  const statements = (data?.statements || [])
    .map((item) => {
      if (typeof item === "string") {
        return { text: item, icon: null };
      }

      return {
        text: item?.text || "",
        icon: item?.icon || null,
      };
    })
    .filter((item) => item.text);

  if (!data) return null;

  return (
    <section className="sponsorship">
      <div className="wrap sponsorship__inner">
        {/* Left — copy */}
        <div className="sponsorship__copy">
          <h2 className="sponsorship__title">{data.title}</h2>
          <p className="sponsorship__description">{data.description}</p>

          <ul className="sponsorship__list">
            {statements.map((item, i) => (
              <li key={i} className="sponsorship__item">
                <span className="sponsorship__itemIcon" aria-hidden="true">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt=""
                      className="sponsorship__itemIconImg"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="sponsorship__check" />
                  )}
                </span>
                <span className="sponsorship__itemText">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — photo collage */}
        <div className="sponsorship__collage" aria-hidden="true">
          {data.photos.slice(0, 7).map((url, i) => (
            <img
              key={i}
              className="sponsorship__photo"
              src={url}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
