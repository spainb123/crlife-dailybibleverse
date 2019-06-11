import * as React from 'react'

interface FooterButtonProps {
    children: string,
}

const FooterButton: React.SFC<FooterButtonProps> = (props) => {
    return <span className="FooterButton">{props.children}</span>;
}

export default FooterButton;