import { parse } from 'url';
import * as Hapi from 'hapi';
import * as Next from 'next';

// handler for _next routes
const nextHandlerWrapper = (app: Next.NextConfig) => {
  const handler = app.getRequestHandler();
  return async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    await handler(request.raw.req, request.raw.res, request.url);
    return h.close;
  };
};

// handler for default paths to be resolved by next
const defaultHandlerWrapper = (app: Next.NextConfig) => async (request: Hapi.Request) => {
  const { pathname, query } = parse(request.url.toString(), true);
  return app.renderToHTML(request.raw.req, request.raw.res, pathname, query);
};

// handler for remapping paths within next (should be avoided)
const pathWrapper = (app: Next.NextConfig, pathName: string, opts = {}) => async ({ raw, query, params }: {raw: any, query: string[], params: string[]}) => {
  return app.renderToHTML(
    raw.req,
    raw.res,
    pathName,
    { ...query, ...params },
    opts
  );
};

export { pathWrapper, defaultHandlerWrapper, nextHandlerWrapper };
