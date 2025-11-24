import React from "react";

type WcsButtonMode = "plain" | "stroked" | "clear";
type WcsButtonSize = "s" | "m" | "l";
type WcsButtonShape = "normal" | "round" | "square";

declare namespace JSX {
  interface IntrinsicElements {
    "wcs-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      mode?: WcsButtonMode;
      size?: WcsButtonSize;
      shape?: WcsButtonShape;
      href?: string;
      target?: "_blank" | "_self";
      type?: "button" | "submit";
      disabled?: boolean;
    };
    "wcs-breadcrumb": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    "wcs-breadcrumb-item": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      href?: string;
    };
  }
}
