declare global {
  interface LayoutProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    pageTitle?: string;
    pageDescription?: string;
    navbar?: boolean;
    footer?: boolean;
    keywords?: string;
    metaDesc?: string;
  }

  interface NavItemsProps {
    links: string;
    href: string;
  }

  interface NavbarProps {
    navItems: NavItemsProps[];
  }
}

export {};
