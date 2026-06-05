import { authClient } from "@/lib/auth-client";

/**
 * Hook to access the current user session from Better Auth.
 *
 * Uses Better Auth's built-in reactive session management.
 * The session is fetched once and cached client-side.
 *
 * Usage:
 *   const { session, user, isPending } = useSession();
 */
export function useSession() {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    session,
    user: session?.user ?? null,
    isPending,
    error,
    isAuthenticated: !!session?.user,
  };
}
