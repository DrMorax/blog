interface Links {
    nav: Navlink[]
}

type Navlink = {
    name: string,
    href: string
}

export const links: Links = {
    nav: [
        {
            name: "about",
            href: "/about"
        },
        {
            name: "explore",
            href: "/explore"
        },
    ]
}