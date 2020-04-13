interface Props {
    helmet: any;
    body: string;
    style: string;
    scripts: string;
    links: string;
}

const html = ({ helmet, body, style, scripts, links }: Props) => `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${links}
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <style>${style}</style>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">${body}</div>
            ${scripts}
        </body>
    </html>
`;

export default html;
