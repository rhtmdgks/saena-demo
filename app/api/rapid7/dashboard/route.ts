import { dashboard, loadConfig, errorResponse, SAFE_HEADERS } from '@/lib/rapid7/bridge.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try { return Response.json(await dashboard(request, loadConfig()), {headers:SAFE_HEADERS}); }
  catch (error) { return errorResponse(error); }
}
