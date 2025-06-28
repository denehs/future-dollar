import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const startTime = Date.now();
    const url = new URL(request.url);
    
    // Log request for observability
    console.log(`[${new Date().toISOString()}] ${request.method} ${url.pathname}`);
    
    // Built-in observability handles analytics automatically

    try {
      // Add logic to serve assets from KV
      const response = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
          mapRequestToAsset: handlePrefix,
        }
      );

      // Add security headers
      const headers = new Headers(response.headers);
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('X-Frame-Options', 'DENY');
      headers.set('X-XSS-Protection', '1; mode=block');
      headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
      headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
      
      // Set proper cache headers based on file type
      const pathname = url.pathname;
      if (pathname.endsWith('.html') || pathname === '/') {
        headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600'); // 1 hour
      } else if (pathname.endsWith('.js') || pathname.endsWith('.css')) {
        headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // 1 day
      }
      
      // Set CSP
      headers.set('Content-Security-Policy', getCSP());
      
      // Log response
      console.log(`[${new Date().toISOString()}] Response: ${response.status} in ${Date.now() - startTime}ms`);
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (e) {
      // Handle 404s and other errors
      console.error(`[${new Date().toISOString()}] Error:`, e.message);
      
      // Try to serve index.html for 404s (SPA support)
      if (e.status === 404) {
        try {
          const indexRequest = new Request(new URL('/', request.url).toString(), request);
          const response = await getAssetFromKV(
            {
              request: indexRequest,
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
            }
          );
          
          const headers = new Headers(response.headers);
          headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
          
          return new Response(response.body, {
            status: 200,
            headers,
          });
        } catch (e) {
          // If index.html also fails, return 404
        }
      }
      
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
          'X-Response-Time': `${Date.now() - startTime}ms`,
        },
      });
    }
  },
};

function handlePrefix(request) {
  // Remove any prefix path if needed
  const url = new URL(request.url);
  url.pathname = url.pathname;
  return mapRequestToAsset(new Request(url.toString(), request));
}

function getCSP() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com",
    "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}