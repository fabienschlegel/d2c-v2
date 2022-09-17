import { INavItem } from "./types";

export const SITE_NAME = "Dévoreur 2 Code";

export const SITE_DESCRIPTION = "Another blog from a developer";

export const SITE_URL = "https://www.devoreur2code.com";

export const SITE_IMAGE = "/assets/media/D2C-fond-blanc.png";

export const FAVICON_URL = "/assets/media/Logo-D2C-fond-blc.png";

export const TWITTER_URL = "https://twitter.com/fabienschlegel";

export const LINKEDIN_URL = "https://www.linkedin.com/in/fabien-schlegel/";

export const GITHUB_PROFILE_URL = "https://github.com/fabienschlegel";

export const NAV_ITEMS: Array<INavItem> = [
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const POSTS_PER_PAGE = 5;
