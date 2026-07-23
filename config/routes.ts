/**
 * Centralized Route Configuration
 * Managing all application routes in one place to avoid hardcoded strings.
 */
export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SIGNUP: '/signup',
  VERIFY_OTP: '/verify-otp',
  UNAUTHORIZED: '/unauthorized',

  // Protected Routes
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
} as const;

/**
 * List of public routes that do not require authentication.
 * Used by Middleware to allow access.
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.SIGNUP,
  ROUTES.VERIFY_OTP,
  ROUTES.UNAUTHORIZED,
  ROUTES.DASHBOARD,
];

/**
 * Default redirect path after successful login.
 */
export const DEFAULT_LOGIN_REDIRECT = ROUTES.DASHBOARD;
