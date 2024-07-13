declare global {
    interface LayoutProps {
        children: React.ReactNode
        pageTitle?: string
        pageDescription?: string
        navbar?: boolean
        footer?: boolean
    }

    interface NavItemsProps {
        links: string;
        href: string;
    }

    interface NavbarProps {
        navItems: NavItemsProps[];
    }
}

export {}