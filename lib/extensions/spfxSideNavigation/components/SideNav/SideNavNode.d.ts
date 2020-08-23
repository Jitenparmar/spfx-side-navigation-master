/// <reference types="react" />
import * as React from "react";
import ISideNavNodeProps from "./model/ISideNavNodeProps";
import ISideNavNodeState from "./model/ISideNavNodeState";
export default class SideNavNode extends React.Component<ISideNavNodeProps, ISideNavNodeState> {
    constructor(props: ISideNavNodeProps);
    render(): JSX.Element;
    private check();
    private nodeClick(e);
    private renderSubNavItems;
}
