import { ROUTES } from './routes';
import { UserRole } from '@/store/auth.store';

/**
 * Define which routes are accessible by each role.
 * Use '*' for full access (ADMIN).
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: ['*'],
  PLAYER: [ROUTES.DASHBOARD],
};

export const isAuthorized = (role: UserRole, path: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  if (permissions.includes('*')) return true;
  return permissions.some((p) => path.startsWith(p));
};
