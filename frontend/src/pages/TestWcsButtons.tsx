import React from "react";
import HeaderAfa from "../components/HeaderAfa";
import FooterContact from "../components/FooterContact";
import { WcsBadge, WcsButton, WcsBreadcrumb, WcsBreadcrumbItem } from "wcs-react";

const TestWcsButtons: React.FC = () => {
  return (
    <div className="page-container sncf-holding">
      <HeaderAfa
        title="AFA (Automatisation des Flux Applicatifs)"
        logoSrc="/assets/sncf-logo.png"
        logoAlt="SNCF"
      />
      <main>
        <h1 className="hero-title">
          Boutons WCS <WcsBadge>Demo</WcsBadge>
        </h1>
        <WcsBreadcrumb className="breadcrumb" aria-label="Fil d'ariane demo">
          <WcsBreadcrumbItem>
            <a href="/">Bienvenue</a>
          </WcsBreadcrumbItem>
          <WcsBreadcrumbItem aria-current="page">
            <a href="/test">Demo WCS</a>
          </WcsBreadcrumbItem>
        </WcsBreadcrumb>

        <div className="cta-grid">
          <WcsButton className="wcs-primary demo-btn" shape="normal" size="m">
            Primary
          </WcsButton>
          <WcsButton className="wcs-secondary demo-btn" shape="normal" size="m">
            Secondary
          </WcsButton>
          <WcsButton className="wcs-success demo-btn" shape="normal" size="m">
            Success
          </WcsButton>
          <WcsButton className="wcs-warning demo-btn" shape="normal" size="m">
            Warning
          </WcsButton>
          <WcsButton className="wcs-critical demo-btn" shape="normal" size="m">
            Critical
          </WcsButton>
          <WcsButton className="wcs-info demo-btn" shape="normal" size="m">
            Info
          </WcsButton>
          <WcsButton className="wcs-dark demo-btn" shape="normal" size="m">
            Dark
          </WcsButton>
          <WcsButton className="wcs-light demo-btn" shape="normal" size="m">
            Light
          </WcsButton>
          <WcsButton className="wcs-primary demo-btn" style={{ width: "100%" }} shape="normal" size="m">
            Full Width Primary
          </WcsButton>
        </div>

        <wcs-divider></wcs-divider>

        <WcsBreadcrumb className="breadcrumb" aria-label="Fil d'ariane simulé">
          <WcsBreadcrumbItem>
            <a href="/">Accueil</a>
          </WcsBreadcrumbItem>
          <WcsBreadcrumbItem>
            <a href="/mq">MQ Series</a>
          </WcsBreadcrumbItem>
          <WcsBreadcrumbItem aria-current="page">Détail flux</WcsBreadcrumbItem>
        </WcsBreadcrumb>
      </main>
      <FooterContact
        contactHref="mailto:david.sissoko@sncf.fr"
        ariaLabel="Contacter le support AFA"
      />
    </div>
  );
};

export default TestWcsButtons;
