import Router from 'next/router';

function redirect(target, context) {
    if (!context.req) {
        Router.replace(target);
        return {};
    }

    if (context.req) {
        context.res.writeHead(302, {
            location: target
        });
        context.res.end();
        return {};
    }
}

export default redirect;