/// <reference types="react" />
import * as React from "react";
import ISideNavProps from "./ISideNavProps";
import ISideNavState from "./ISideNavState";
export default class SideNav extends React.Component<ISideNavProps, ISideNavState> {
    private sideNavProvider;
    constructor(props: ISideNavProps);
    componentWillMount(): void;
    componentDidMount(): void;
    render(): JSX.Element;
    private handleOutsideClick;
    private toggleNav;
    private renderSideNavNodes;
}
