import React from "react";
import { Link } from "react-router-dom";

type HeaderAfaProps = {
  title: string;
  logoSrc: string;
  logoAlt?: string;
};

export const HeaderAfa: React.FC<HeaderAfaProps> = ({ title, logoSrc, logoAlt }) => {
  return (
    <header className="header-bar">
      <Link to="/" aria-label="Retour à l'accueil AFA" className="brand-link">
        <img src={logoSrc} alt={logoAlt || "SNCF"} className="brand-logo" />
        <div className="brand-title">{title}</div>
      </Link>
    </header>
  );
};

export default HeaderAfa;
