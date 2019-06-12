import * as React from 'react'

interface FooterButtonProps {
    children: string,
}

const FooterButton: React.SFC<FooterButtonProps> = (props) => {
    return <div className="FooterButton text-center">{props.children}</div>;
}

export default FooterButton;