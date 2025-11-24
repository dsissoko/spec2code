import React from "react";
import { useNavigate } from "react-router-dom";
import { WcsButton } from "wcs-react";

type CtaTileProps = {
  label: string;
  to: string;
  external?: boolean;
  ariaLabel?: string;
};

export const CtaTile: React.FC<CtaTileProps> = ({ label, to, external, ariaLabel }) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    if (external) return; // lien externe géré par href/target
    event.preventDefault();
    navigate(to);
  };

  return (
    <WcsButton
      className="cta-button wcs-primary"
      size="l"
      shape="normal"
      href={external ? to : undefined}
      target={external ? "_blank" : undefined}
      aria-label={ariaLabel || label}
      type="button"
      onClick={handleClick}
    >
      {label}
    </WcsButton>
  );
};

export default CtaTile;
