export default interface ISPSideNavItem {
    Title: string;
    SideNavIconSvg?: string;
    SideNavUrl?: string;
    Link?: string;
    LinkType?: string;
    SideNavOpenInNewWindow?: boolean;
    SideNavParent?: {
        Title: string;
    };
}
