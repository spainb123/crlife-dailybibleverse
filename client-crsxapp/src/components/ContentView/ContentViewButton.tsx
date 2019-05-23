import React, { MouseEvent, ReactNode, FunctionComponent } from 'react';
import { Button } from 'reactstrap'

type Props = {
    onClick(e: MouseEvent<HTMLElement>) : void
    children? : ReactNode
}

const ContentViewButton : FunctionComponent<Props> = ({ onClick: handleClick, children } : Props) => (
    <Button color="link" onClick={handleClick}>{children}</Button>
)

export default ContentViewButton;
