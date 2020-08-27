import ISideNavProvider from "./ISideNavProvider";
import ISideNavItem from "../model/ISideNavItem";
import ISPSideNavItem from "../model/ISPSideNavItem";
import { sp, SPRest, Web } from "@pnp/sp";


export default class SideNavProvider implements ISideNavProvider {
  public getSideNav(): Promise<ISideNavItem[]> {
    return sp.web.lists.getByTitle("Shortcuts").items.select("ID", "Title", "LinkType", "Link")
      .orderBy("Title").usingCaching().get()
      .then(
        (items: ISPSideNavItem[]): ISideNavItem[] => {
          debugger;
          const siteNavItems: ISideNavItem[] = [];

          if (this.existsItemsInShortcuts(items, 'Page')) {
            siteNavItems.push({ ///SitePages
              title: 'Pages',
              svg: '<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><g id="Layer_1"><path d="M44,8.586L36.414,1H6v48h38V8.586z M37,4.414L40.586,8H37V4.414z M8,47V3h27v7h7v37H8z"/></g><g></g></svg>', url: '', openInNewWindow: false,
              subNavItems: this.getSubNavItemsByShortcuts(items, 'Page')
            });
          }

          if (this.existsItemsInShortcuts(items, 'Hyperlink')) {
            siteNavItems.push({
              title: 'Hyperlinks',
              svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
              url: '', openInNewWindow: false,
              subNavItems: this.getSubNavItemsByShortcuts(items, 'Hyperlink')
            });
          }

          if (this.existsItemsInShortcuts(items, 'Library')) {
            siteNavItems.push({ ///_layouts/15/viewlsts.aspx
              title: 'Libraries',
              svg: '<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
              url: '', openInNewWindow: false,
              subNavItems: this.getSubNavItemsByShortcuts(items, 'Library')
            });
          }

          if (this.existsItemsInShortcuts(items, 'List')) {
            siteNavItems.push({
              title: 'Lists',
              svg: '<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>',
              url: '', openInNewWindow: false,
              subNavItems: this.getSubNavItemsByShortcuts(items, 'List')
            });
          }
          /**
           * Commented By Jiten Parmar 
           
          if (this.existsSubWebs(sp.web)) {
            
            siteNavItems.push({
              title: 'Sub Sites', 
              svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M2545.2,2020.3L100-424.9h534.9h534.9l1914.2,1914.2L5000,3405.3l1916.1-1916.1L8830.2-424.9h534.9H9900L7454.8,2020.3C6109.9,3365.2,5005.7,4465.6,5000,4465.6S3890.1,3365.2,2545.2,2020.3z"/><path d="M3294.1,1279.1L1599.6-415.3v-1916.1v-1914.2h1700.2H5000v1490.1v1490.1h850.1h850.1v-1490.1v-1490.1h850.1h850.1v1916.1v1914.2L6704,1281c-932.2,932.2-1698.3,1694.5-1704,1694.5S4228.2,2213.3,3294.1,1279.1z"/></g></g></svg>', 
              url: '', openInNewWindow: false, 
              subNavItems: this.getSubSites(sp.web) });
          }
          */
          return siteNavItems;
        }
      );
  }
  public getSubSitesNav(): Promise<ISideNavItem[]> {
    return sp.web.webs.select("Title", "Url").get().then(
      async (items: ISPSideNavItem[]): Promise<ISideNavItem[]> => {
        const subNavItems: ISideNavItem[] = [];
        items.map((item: {Title:any,Url:any},index:any) =>{
          subNavItems.push({ title: item.Title, url: item.Url, openInNewWindow: false })
        });
        if (items.length > 0) {
          const siteNavItems: ISideNavItem[] = [];
          siteNavItems.push({
            title: 'Sub Sites',
            svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M2545.2,2020.3L100-424.9h534.9h534.9l1914.2,1914.2L5000,3405.3l1916.1-1916.1L8830.2-424.9h534.9H9900L7454.8,2020.3C6109.9,3365.2,5005.7,4465.6,5000,4465.6S3890.1,3365.2,2545.2,2020.3z"/><path d="M3294.1,1279.1L1599.6-415.3v-1916.1v-1914.2h1700.2H5000v1490.1v1490.1h850.1h850.1v-1490.1v-1490.1h850.1h850.1v1916.1v1914.2L6704,1281c-932.2,932.2-1698.3,1694.5-1704,1694.5S4228.2,2213.3,3294.1,1279.1z"/></g></g></svg>',
            url: '', openInNewWindow: false,
            subNavItems: subNavItems
          });
          return siteNavItems;
        }
      }
    )
  };

  /*public getSubSitesNav(): Promise<ISideNavItem[]>{
    var b = sp.createBatch();
    const subNavItems: ISideNavItem[] = [];

    var checkWeb = function(webUrl) {
      let web = new Web(webUrl);
      web.select("Title, Url, Webs").expand("Webs").inBatch(b).get().then(w => {
        console.log("Site", w.Title)
        // Check if any subsite
        if(w.Webs.length > 0) {
          w.Webs.forEach(function(subsite) {
            // Add subsites to array
            subNavItems.push({
              title: subsite.Title,
              url: subsite.Url, openInNewWindow: false
            })
            // Call recursive for current subsite
            checkWeb(subsite.Url);
          })
        }
      });
    };

    sp.web.inBatch(b).get().then(
      async w => { 
      subNavItems.push({
        title: w.Title,
        url: w.Url, openInNewWindow: false
      })
      checkWeb(w.Url);
     });

     return subNavItems;

  }
  https://github.com/SharePoint/PnP-JS-Core/issues/578
  */


  private async getSubSites(web: Web): Promise<ISideNavItem[]> {

    const subNavItems: ISideNavItem[] = [];

    // subNavItems.push({ title: 'test', url: '', openInNewWindow: false });
    web.webs.select("Title", "Url").get().then(function (data) {
      for (var i = 0; i < data.length; i++) {
        subNavItems.push({ title: data[i].Title, url: data[i].Url, openInNewWindow: false });
      }

    }).catch(function (data) {
      subNavItems.push({ title: 'error', url: '', openInNewWindow: false });
    });
    return subNavItems.length > 0 ? subNavItems : undefined;
  }

  private existsSubWebs(web: Web): boolean {

    let rtn: boolean = false;

    web.webs.get().then(function (data) {
      if (data.length > 0) {
        rtn = true;
        return;
      }
    }).catch(function (data) {
    });

    return rtn;
  }

  private existsItemsInShortcuts(spNavItems: ISPSideNavItem[], filter: string): boolean {

    let rtn: boolean = false;

    spNavItems.forEach(
      (item: ISPSideNavItem): void => {
        if (item.LinkType === filter) {
          rtn = true;
          return;
        }
      }
    );

    return rtn;
  }

  private getSubNavItemsByShortcuts(spNavItems: ISPSideNavItem[], filter: string): ISideNavItem[] {

    const subNavItems: ISideNavItem[] = [];

    spNavItems.forEach(
      (item: ISPSideNavItem): void => {
        if (item.LinkType === filter) {
          subNavItems.push({ title: item.Title, url: item.Link["Url"], openInNewWindow: false });
        }
      }
    );

    return subNavItems.length > 0 ? subNavItems : undefined;
  }

  private getSubNavItems(
    spNavItems: ISPSideNavItem[],
    filter: string
  ): ISideNavItem[] {
    const subNavItems: ISideNavItem[] = [];
    spNavItems.forEach(
      (item: ISPSideNavItem): void => {
        if (item.SideNavParent && item.SideNavParent.Title === filter) {
          subNavItems.push({
            title: item.Title,
            url: item.SideNavUrl,
            openInNewWindow: item.SideNavOpenInNewWindow
          });
        }
      }
    );
    return subNavItems.length > 0 ? subNavItems : undefined;
  }
}
