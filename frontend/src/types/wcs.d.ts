import type * as React from "react";

type WcsButtonMode = "plain" | "stroked" | "clear";
type WcsButtonSize = "s" | "m" | "l";
type WcsButtonShape = "normal" | "round" | "square";

type WcsDivider = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

type WcsButton = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  mode?: WcsButtonMode;
  size?: WcsButtonSize;
  shape?: WcsButtonShape;
  href?: string;
  target?: "_blank" | "_self";
  type?: "button" | "submit";
  disabled?: boolean;
};

type WcsBreadcrumb = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type WcsBreadcrumbItem = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  href?: string;
};

type WcsIntrinsicElements = {
  "wcs-button": WcsButton;
  "wcs-breadcrumb": WcsBreadcrumb;
  "wcs-breadcrumb-item": WcsBreadcrumbItem;
  "wcs-divider": WcsDivider;
};

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends WcsIntrinsicElements {}
  }
}

declare module "react/jsx-runtime" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements extends WcsIntrinsicElements {}
  }
}
