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

  console.log('pathName', pathname);

  // Skip paths for Next.js internal files, API routes, and public files
  if (pathname.startsWith('/_next') || pathname.includes('/api/') || PUBLIC_FILE_PATTERN.test(pathname)) {
    return res;
  }

  // Handle unauthenticated paths
  if (UnAuthPaths.includes(pathname)) {
    try {
      const session = getServerAuthSession(req);
      console.log('session======>', session);

      if (session.isAuthenticate) {
        console.log('session======>');
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
      console.log(session);

      // If not authenticated, redirect to sign-in page with original path
      if (!session.isAuthenticate) {
        const redirectUrl = new URL(
          `${Paths.auth.signIn}?${REDIRECT_PREFIX}=${encodeURIComponent(`${hostProtocol}://${host}${pathname}${search}`)}`,
          `${hostProtocol}://${host}`,
        );
        console.log('Redirect URL for unauthenticated:', redirectUrl);

        return NextResponse.redirect(redirectUrl, {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      }

      // Redirect Super Admin to /admin
      if (pathname.startsWith(Paths.admin.adminRoot) && session.user.roles && session.user.roles[0] === 'Super Admin') {
        const redirectToAdminUrl = new URL(`${Paths.admin.adminRoot}`, `${hostProtocol}://${host}`);
        console.log('Redirecting Super Admin to /admin:', redirectToAdminUrl);

        return NextResponse.redirect(redirectToAdminUrl, {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      }

      // Redirect Customer to /users
      if (pathname.startsWith(Paths.admin.adminRoot) && session.user.type === ENUM_USERS_TYPES.Customer) {
        const redirectToUsersUrl = new URL(`${Paths.users.usersRoot}`, `${hostProtocol}://${host}`);
        console.log('Redirecting Customer to /users:', redirectToUsersUrl);

        return NextResponse.redirect(redirectToUsersUrl, {
          status: 302,
          headers: { 'Cache-Control': 'no-store' },
        });
      }
    } catch (error) {
      console.log('Error in middleware:', error);
      return res;
    }
  }

  return res;
}
