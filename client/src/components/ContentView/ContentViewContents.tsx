import React from 'react';

type Props = {
    header: string
    content: string
}

const ContentViewContents = ({ header, content }: Props) => (
    <div>
        <p><b>{header}</b></p>
        <p>{content}</p>
    </div>
)

export default ContentViewContents;