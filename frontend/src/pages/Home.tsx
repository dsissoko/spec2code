import React from "react";
import HeaderAfa from "../components/HeaderAfa";
import Footer from "../components/Footer";
import CtaTile from "../components/CtaTile";

const Home: React.FC = () => {
  return (
    <div className="page-container sncf-holding">
      <HeaderAfa
        title="AFA (Automatisation des Flux Applicatifs)"
        logoSrc="/assets/sncf-logo.png"
        logoAlt="SNCF"
      />

      <main>
        <h1 className="hero-title">Bienvenue</h1>
        <div className="cta-grid">
          <CtaTile label="Flux MQ Series" to="/mq" ariaLabel="Aller vers Flux MQ Series" />
          <CtaTile
            label="Flux Fluxbox"
            to="https://portail-fluxbox.flx.sncf.fr"
            external
            ariaLabel="Ouvrir Flux Fluxbox"
          />
        </div>
      </main>

      <Footer
        contactHref="mailto:david.sissoko@sncf.fr"
        ariaLabel="Contacter le support AFA"
      />
    </div>
  );
};

export default Home;
