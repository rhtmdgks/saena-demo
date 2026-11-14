import { authenticate, clearSessionCookie, errorResponse, loadAppOrigin, loadConfig, requireSameOrigin, requestToken, sessionCookie, SAFE_HEADERS } from '@/lib/rapid7/bridge.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const config=loadConfig(); requireSameOrigin(request,config);
    if (!request.headers.has('authorization')) return Response.json({error:'bearer_required'},{status:401,headers:SAFE_HEADERS});
    const token=requestToken(request); const actor=authenticate(token,config);
    return Response.json({authenticated:true},{headers:{...SAFE_HEADERS,'Set-Cookie':sessionCookie(token,actor)}});
  } catch(error) {return errorResponse(error);}
}
export async function DELETE(request: Request) {
  try {
    requireSameOrigin(request,loadAppOrigin());
    return Response.json({authenticated:false},{headers:{...SAFE_HEADERS,'Set-Cookie':clearSessionCookie()}});
  } catch(error) {return errorResponse(error);}
}
