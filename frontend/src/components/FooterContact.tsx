import React from "react";

type FooterContactProps = {
  contactHref: string;
  ariaLabel?: string;
};

export const FooterContact: React.FC<FooterContactProps> = ({ contactHref, ariaLabel }) => {
  return (
    <footer className="footer">
      <a href={contactHref} aria-label={ariaLabel || "Contact"}>{`Contact`}</a>
    </footer>
  );
};

export default FooterContact;
