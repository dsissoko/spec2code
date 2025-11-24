import React from "react";
import HeaderAfa from "../components/HeaderAfa";
import Footer from "../components/Footer";
import CtaTile from "../components/CtaTile";
import { WcsBreadcrumb, WcsBreadcrumbItem } from "wcs-react";

const MqSeries: React.FC = () => {
  return (
    <div className="page-container sncf-holding">
      <HeaderAfa
        title="AFA (Automatisation des Flux Applicatifs)"
        logoSrc="/assets/sncf-logo.png"
        logoAlt="SNCF"
      />

      <main>
        <WcsBreadcrumb className="breadcrumb" aria-label="Fil d'ariane MQ Series">
          <WcsBreadcrumbItem>
            <a href="/">Bienvenue</a>
          </WcsBreadcrumbItem>
          <WcsBreadcrumbItem aria-current="page">MQ Series</WcsBreadcrumbItem>
        </WcsBreadcrumb>
        <div className="cta-grid">
          <CtaTile label="Faire une demande de flux MQ Series" to="/mq/demande" />
          <CtaTile label="Cartographie" to="/mq/cartographie" />
        </div>
      </main>

      <Footer
        contactHref="mailto:david.sissoko@sncf.fr"
        ariaLabel="Contacter le support AFA"
      />
    </div>
  );
};

export default MqSeries;
