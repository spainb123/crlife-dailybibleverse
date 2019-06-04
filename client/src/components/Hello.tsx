import * as React from "react";

export interface HelloProps { compiler: string; framework: string; data: string}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        const data = JSON.parse(this.props.data);

        return <div><h1>Hello from {this.props.compiler} and {this.props.framework}, now with SSR!</h1><p>Full Date:<b>{data.fullDate}</b></p></div>;
    }
}