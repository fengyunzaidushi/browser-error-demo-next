import { POST as originalPOST } from '@browser-echo/next/route';

export { originalPOST as POST };
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
