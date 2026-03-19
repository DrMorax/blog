type Links = {
  nav: Navlink[];
};

type Navlink = {
  name: string;
  href: string;
};

export type Guestbook = {
  success: boolean;
  data: GuestbookMessage[];
};

export type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  created_at: Date;
};

export const links: Links = {
  nav: [
    { name: "posts", href: "/posts" },
    { name: "about", href: "/about" },
    { name: "guest", href: "/guest" },
  ],
};

export const API_URL = import.meta.env.PROD
  ? "https://api.morax.dev"
  : "http://localhost:4000";
