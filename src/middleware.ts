import { AuthPaths, Paths, UnAuthPaths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { ENUM_USERS_TYPES } from '@modules/admin/users/lib/enums';
import { getServerAuthSession } from '@modules/auth/lib/utils';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE_PATTERN = /\.(.*)$/;
export const REDIRECT_PREFIX = 'redirectUrl';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { host: hostname, protocol, pathname, search } = req.nextUrl;
  const host = req.headers.get('x-forwarded-host') || hostname;
  const hostProtocol = req.headers.get('x-forwarded-proto') || protocol;

  // Skip paths
  if (pathname.startsWith('/_next') || pathname.includes('/api/') || PUBLIC_FILE_PATTERN.test(pathname)) {
    return res;
  }

  // Handle unauthenticated paths
  if (UnAuthPaths.includes(pathname)) {
    try {
      const session = getServerAuthSession(req);

      if (session.isAuthenticate) {
        return NextResponse.redirect(new URL(`${hostProtocol}://${host}`), {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      }
    } catch (error) {
      return res;
    }
  }

  // Handle authenticated paths
  if (Toolbox.isDynamicPath(AuthPaths, pathname)) {
    try {
      const session = getServerAuthSession(req);

      if (!session.isAuthenticate) {
        const redirectUrl = new URL(
          `${Paths.auth.signIn}?${REDIRECT_PREFIX}=${encodeURIComponent(`${hostProtocol}://${host}${pathname}${search}`)}`,
          `${hostProtocol}://${host}`,
        );

        return NextResponse.redirect(redirectUrl, {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      } else if (pathname.startsWith(Paths.users.usersRoot) && session.user.type === ENUM_USERS_TYPES.Internal) {
        return NextResponse.redirect(new URL(Paths.admin.adminRoot, `${hostProtocol}://${host}`), {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      } else if (pathname.startsWith(Paths.admin.adminRoot) && session.user.type === ENUM_USERS_TYPES.Customer) {
        return NextResponse.redirect(new URL(Paths.users.usersRoot, `${hostProtocol}://${host}`), {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      }
    } catch (error) {
      return res;
    }
  }

  return res;
}
