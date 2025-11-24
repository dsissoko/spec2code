import React from "react";
import HeaderAfa from "../components/HeaderAfa";
import Footer from "../components/Footer";
import { WcsBreadcrumb, WcsBreadcrumbItem, WcsCard } from "wcs-react";

const MqDemande: React.FC = () => {
  return (
    <div className="page-container sncf-holding">
      <HeaderAfa
        title="AFA (Automatisation des Flux Applicatifs)"
        logoSrc="/assets/sncf-logo.png"
        logoAlt="SNCF"
      />

      <main>
        <WcsBreadcrumb className="breadcrumb" aria-label="Fil d'ariane Demande MQ Series">
          <WcsBreadcrumbItem>
            <a href="/">Bienvenue</a>
          </WcsBreadcrumbItem>
          <WcsBreadcrumbItem>
            <a href="/mq">MQ Series</a>
          </WcsBreadcrumbItem>
          <WcsBreadcrumbItem aria-current="page">Demande de flux</WcsBreadcrumbItem>
        </WcsBreadcrumb>

        <WcsCard className="placeholder-card" aria-label="Formulaire demande de flux MQ Series (placeholder)">
          <div className="placeholder-card__title">Demande de flux MQ Series</div>
          <p className="placeholder-card__text">Ici le formulaire de saisie de la demande de flux</p>
        </WcsCard>
      </main>

      <Footer
        contactHref="mailto:david.sissoko@sncf.fr"
        ariaLabel="Contacter le support AFA"
      />
    </div>
  );
};

export default MqDemande;
