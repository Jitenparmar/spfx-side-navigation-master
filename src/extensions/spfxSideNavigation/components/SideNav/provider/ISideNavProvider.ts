import ISideNavItem from "../model/ISideNavItem";

export default interface ISideNavProvider {
    getSideNav(): Promise<ISideNavItem[]>;
    getSubSitesNav(): Promise<ISideNavItem[]>;
}
