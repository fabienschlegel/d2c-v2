export interface SubNavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<SubNavItem>;
  href?: string;
}
