import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/components/app';

function renderHostMarkup(title: string, body: string) {
    return `  
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
        </head>
        <body>
          <div id="root">${body}</div>
        </body>
      </html>
    `;
};

export function renderClientHost(title: string)
{
    const appString = renderToString(<App />);

    return renderHostMarkup(title, appString);
}