// const html = (helmet: any, body: string) => `
//     <!doctype html>
//     <html ${helmet.htmlAttributes.toString()}>
//         <head>
//             ${helmet.title.toString()}
//             ${helmet.meta.toString()}
//             ${helmet.link.toString()}
//         </head>
//         <body ${helmet.bodyAttributes.toString()}>
//             <div id="app">${body}</div>
//         </body>
//     </html>
// `;

const html = (helmet: any, body: string) => `
    <!doctype html>
    <html>
        <head>
        </head>
        <body >
            <div id="app">${body}</div>
            <script type="application/javascript" src="bundle.js"></script>
        </body>
    </html>
`;

export default html;
