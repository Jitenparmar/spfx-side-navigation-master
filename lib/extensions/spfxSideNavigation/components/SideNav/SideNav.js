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
import * as React from "react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import SideNavNode from "./SideNavNode";
import SideNavProvider from "./provider/SideNavProvider";
var SideNav = (function (_super) {
    __extends(SideNav, _super);
    function SideNav(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOutsideClick = function (event) {
            if (!_this.state.isOpened) {
                return;
            } // if site nav is already closed, abort
            var foundSideNavPanel = false;
            for (var i = 0; i < event.path.length; i++) {
                var node = event.path[i];
                if (!node.className) {
                    continue;
                } // skip if no class name
                if (node.className.toLowerCase().indexOf("site-menu-panel") !== -1) {
                    foundSideNavPanel = true;
                    break;
                }
            }
            if (!foundSideNavPanel) {
                _this.toggleNav(); // if no site menu panel found, close the site menu
            }
        };
        _this.toggleNav = function () {
            _this.setState(function (state, props) { return ({
                isOpened: !state.isOpened
            }); });
        };
        _this.renderSideNavNodes = function (siteNavItem, index) {
            return (React.createElement(SideNavNode, { key: index, siteNavItem: siteNavItem, navIsOpened: _this.state.isOpened }));
        };
        _this.state = {
            siteNavItems: [],
            isOpened: false
        };
        window.addEventListener("click", _this.handleOutsideClick, true);
        return _this;
    }
    SideNav.prototype.componentWillMount = function () {
        this.sideNavProvider = new SideNavProvider();
    };
    SideNav.prototype.componentDidMount = function () {
        var _this = this;
        this.sideNavProvider.getSideNav().then(function (resultData) {
            _this.sideNavProvider
                .getSubSitesNav()
                .then(function (result) {
                resultData.push.apply(resultData, result);
                _this.setState({
                    siteNavItems: resultData
                });
            }).catch(function (error) {
                // console.log(error);
            });
        });
    };
    SideNav.prototype.render = function () {
        var siteMenuClass = this.state.isOpened
            ? "site-menu opened"
            : "site-menu";
        var toggleIconName = this.state.isOpened
            ? "DoubleChevronLeft8"
            : "DoubleChevronRight8";
        return (React.createElement("div", { className: "site-menu-panel ms-slideRightIn40 visible-i", style: {
                visibility: "hidden", marginTop: "88px"
            } },
            React.createElement("div", { className: siteMenuClass },
                React.createElement("div", { className: "menu-toggle" }, React.createElement(IconButton, { className: "site-menu-icon", checked: false, iconProps: {
                        iconName: toggleIconName
                    }, title: "Toggle Menu", ariaLabel: "Toggle Menu", onClick: this.toggleNav })),
                this.state.siteNavItems.length > 0 &&
                    this.state.siteNavItems.map(this.renderSideNavNodes))));
    };
    return SideNav;
}(React.Component));
export default SideNav;

//# sourceMappingURL=SideNav.js.map
