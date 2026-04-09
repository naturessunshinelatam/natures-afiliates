import "./CtaButton.scss";

export const CtaButton = ({ onJoinClick, txt }) => {
  return (
    <button className="btn cfb__cta cfb__reveal" onClick={onJoinClick}>
      {txt}
    </button>
  );
};
