var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import * as ReactDom from "react-dom";
import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer, PlaceholderName } from "@microsoft/sp-application-base";
import { setup as pnpSetup } from "@pnp/common";
import SideNav from "./components/SideNav/SideNav";
/** A Custom Action which can be run during execution of a Client Side Application */
var SpfxSideNavigationApplicationCustomizer = (function (_super) {
    __extends(SpfxSideNavigationApplicationCustomizer, _super);
    function SpfxSideNavigationApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpfxSideNavigationApplicationCustomizer.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            pnpSetup({
                spfxContext: _this.context
            });
            _this.context.placeholderProvider.changedEvent.add(_this, _this.renderPlaceHolders);
        });
    };
    SpfxSideNavigationApplicationCustomizer.prototype.renderPlaceHolders = function () {
        if (!this.topPlaceholder) {
            this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
            if (!this.topPlaceholder) {
                return;
            }
            if (this.topPlaceholder.domElement) {
                var element = React.createElement(SideNav, {});
                ReactDom.render(element, this.topPlaceholder.domElement);
            }
        }
    };
    __decorate([
        override
    ], SpfxSideNavigationApplicationCustomizer.prototype, "onInit", null);
    return SpfxSideNavigationApplicationCustomizer;
}(BaseApplicationCustomizer));
export default SpfxSideNavigationApplicationCustomizer;

//# sourceMappingURL=SpfxSideNavigationApplicationCustomizer.js.map
