import "./WhatsAppButton.scss";

const normalizePhone = (phone) => String(phone ?? "").replace(/\D/g, "");

export const WhatsAppButton = ({
  phone,
  message = "Hola, me interesa afiliarme a Nature's Sunshine.",
  label = "Escríbenos por WhatsApp",
  className = "",
}) => {
  const normalizedPhone = normalizePhone(phone);
  const href = normalizedPhone
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
    : "#";

  return (
    <a
      className={`waBtn ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <span className="waBtn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img" focusable="false">
          <path
            d="M20.52 3.48A11.9 11.9 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.1.55 4.16 1.6 5.98L0 24l6.2-1.6a11.95 11.95 0 0 0 5.8 1.48h.02c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.5-8.4ZM12.02 21.86h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.22-3.68.95.98-3.58-.24-.37A9.88 9.88 0 0 1 2.04 12c0-5.5 4.48-9.98 9.99-9.98a9.9 9.9 0 0 1 7.07 2.92A9.9 9.9 0 0 1 22.02 12c0 5.5-4.48 9.98-10 9.98Zm5.47-7.46c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.46a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.45.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.28.3-1.06 1.04-1.06 2.52 0 1.5 1.08 2.93 1.23 3.14.15.2 2.14 3.26 5.2 4.57.73.3 1.3.48 1.75.62.73.23 1.4.2 1.93.12.6-.1 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="waBtn__text">{label}</span>
    </a>
  );
};
