import React from "react";

type FooterProps = {
  contactHref: string;
  ariaLabel?: string;
};

export const Footer: React.FC<FooterProps> = ({ contactHref, ariaLabel }) => {
  const version = __APP_VERSION__ || "0.0.0";

  return (
    <footer className="footer">
      <span>{`AFA front v${version} — `}</span>
      <a href={contactHref} aria-label={ariaLabel || "Contact"}>{`Contact`}</a>
    </footer>
  );
};

export default Footer;
