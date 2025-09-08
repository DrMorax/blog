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
            name: "About",
            href: "/about"
        },
        {
            name: "Contact",
            href: "/contact"
        },
    ]
}