import React, { MouseEvent, ReactNode, FunctionComponent } from 'react';

type Props = {
    onClick(e: MouseEvent<HTMLElement>) : void
    children? : ReactNode
}

const ContentViewButton : FunctionComponent<Props> = ({ onClick: handleClick, children } : Props) => (
    <button onClick={handleClick}>{children}</button>
)

export default ContentViewButton;
