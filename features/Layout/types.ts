export interface SubNavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<SubNavItem>;
  href?: string;
}
