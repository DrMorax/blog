type Links = {
    nav: Navlink[];
};

type Navlink = {
    name: string;
    href: string;
};

export const links: Links = {
    nav: [
        { name: "posts", href: "/posts" },
        { name: "about", href: "/about" },
        { name: "explore", href: "/explore" },
    ],
};
