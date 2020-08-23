import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";
export interface ISpfxSideNavigationApplicationCustomizerProperties {
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class SpfxSideNavigationApplicationCustomizer extends BaseApplicationCustomizer<ISpfxSideNavigationApplicationCustomizerProperties> {
    private topPlaceholder;
    onInit(): Promise<void>;
    private renderPlaceHolders();
}
