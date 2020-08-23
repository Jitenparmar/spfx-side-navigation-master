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
import * as ReactDOM from "react-dom";
import { IconButton } from "office-ui-fabric-react/lib/Button";
require("./site-menu.scss");
var SideNavNode = (function (_super) {
    __extends(SideNavNode, _super);
    function SideNavNode(props) {
        var _this = _super.call(this, props) || this;
        _this.renderSubNavItems = function (siteNavItem, index) {
            return (React.createElement(SideNavNode, { key: index, siteNavItem: siteNavItem, navIsOpened: _this.props.navIsOpened }));
        };
        _this.state = {
            isOpened: false
        };
        _this.nodeClick = _this.nodeClick.bind(_this);
        return _this;
    }
    SideNavNode.prototype.render = function () {
        var _this = this;
        var nodeClasses = ["site-nav-node"];
        if (this.state.isOpened && this.props.navIsOpened) {
            nodeClasses.push("opened");
        }
        if (this.props.siteNavItem.subNavItems) {
            nodeClasses.push("dropdown");
        }
        return (React.createElement("div", { key: this.props.key, className: nodeClasses.join(" ") },
            React.createElement("div", { role: "menu", onClick: function (e) { return _this.nodeClick(e); } }, (this.props.siteNavItem.svg && (React.createElement("div", { className: "icon-node ms-fadeIn400" },
                React.createElement("div", { className: "icon ms-fadeIn400", style: { maxWidth: 50, color: "#fff" }, dangerouslySetInnerHTML: { __html: this.props.siteNavItem.svg } }),
                this.props.navIsOpened && (React.createElement("div", null,
                    React.createElement("div", { className: "title noselect" }, this.props.siteNavItem.title),
                    (this.props.siteNavItem.subNavItems &&
                        !this.state.isOpened && (React.createElement(IconButton, { className: "sub-nav-item-icon", checked: false, iconProps: { iconName: "ChevronDownSmall" }, title: "Toggle Sub Menu", ariaLabel: "Toggle Sub Menu" }))) ||
                        (this.props.siteNavItem.subNavItems &&
                            this.state.isOpened && (React.createElement(IconButton, { className: "sub-nav-item-icon", checked: false, iconProps: { iconName: "ChevronUpSmall" }, title: "Toggle Sub Menu", ariaLabel: "Toggle Sub Menu" })))))))) ||
                (!this.props.siteNavItem.svg && (React.createElement("div", { className: "title-node" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "title noselect" }, this.props.siteNavItem.title)))))),
            (this.props.siteNavItem.subNavItems &&
                !this.props.navIsOpened && (React.createElement("div", { className: "dynamic-children flyouts" }, this.props.siteNavItem.subNavItems.map(this.renderSubNavItems)))) ||
                (this.props.siteNavItem.subNavItems &&
                    this.props.navIsOpened &&
                    this.state.isOpened && (React.createElement("div", { className: "dynamic-children", ref: "children" }, this.props.siteNavItem.subNavItems.map(this.renderSubNavItems))))));
    };
    SideNavNode.prototype.check = function () {
        var node = ReactDOM.findDOMNode(this.refs.children);
        if (!node) {
            return;
        }
        var rect = node.getBoundingClientRect();
        var space = window.innerHeight - (rect.top + rect.height);
        if (space < 0) {
            // it's off screen
            var heightStyle = "height: " + String(node.clientHeight + space) + "px;";
            var overflowStyle = "overflow-y: auto; -webkit-overflow-scrolling: touch;";
            node.setAttribute("style", heightStyle + overflowStyle);
        }
        else {
            node.setAttribute("style", "height: auto;");
        }
    };
    SideNavNode.prototype.nodeClick = function (e) {
        var _this = this;
        if (!this.props.siteNavItem) {
            return;
        }
        if (this.props.siteNavItem.url) {
            /* if has a url navigate to that address */
            if (this.props.siteNavItem.openInNewWindow) {
                window.open(this.props.siteNavItem.url, "_blank");
            }
            else {
                window.location.href = this.props.siteNavItem.url;
            }
            return;
        }
        if (!this.props.siteNavItem.url) {
            /* if no url then change the state */
            if (this.props.navIsOpened) {
                /* only change state if the navigation is opened */
                this.setState({
                    isOpened: !this.state.isOpened
                }, function () { return _this.check(); });
            }
            return;
        }
    };
    return SideNavNode;
}(React.Component));
export default SideNavNode;

//# sourceMappingURL=SideNavNode.js.map
