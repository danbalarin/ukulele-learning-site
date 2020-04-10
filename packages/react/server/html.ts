interface Props {
    helmet: any;
    body: string;
    style: string;
}

const html = ({ helmet, body, style }: Props) => `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <style>${style}</style>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">${body}</div>
            <script type="application/javascript" src="bundle.js"></script>
        </body>
    </html>
`;

export default html;
