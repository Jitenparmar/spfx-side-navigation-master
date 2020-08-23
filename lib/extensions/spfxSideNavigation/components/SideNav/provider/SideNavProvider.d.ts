import ISideNavProvider from "./ISideNavProvider";
import ISideNavItem from "../model/ISideNavItem";
export default class SideNavProvider implements ISideNavProvider {
    getSideNav(): Promise<ISideNavItem[]>;
    getSubSitesNav(): Promise<ISideNavItem[]>;
    private getSubSites(web);
    private existsSubWebs(web);
    private existsItemsInShortcuts(spNavItems, filter);
    private getSubNavItemsByShortcuts(spNavItems, filter);
    private getSubNavItems(spNavItems, filter);
}
