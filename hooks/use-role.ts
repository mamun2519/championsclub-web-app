import { useAuthStore } from '@/store/auth.store';

export const useRole = () => {
  const user = useAuthStore((state) => state.user);

  return {
    role: user?.role,
    isAdmin: user?.role === 'ADMIN',
    isPlayer: user?.role === 'PLAYER',
    user,
    hasPermission: (p: string) => {
      if (user?.role === 'ADMIN') return true;
      return false;
    },
    checkAccess: (allowedRoles: string[]) => allowedRoles.includes(user?.role || ''),
  };
};
