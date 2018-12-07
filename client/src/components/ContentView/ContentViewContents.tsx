import React from 'react';

type Props = {
    content: string
}

const ContentViewContents = ({ content }: Props) => (
    <p>{content}</p>
)

export default ContentViewContents;