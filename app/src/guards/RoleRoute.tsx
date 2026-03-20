import { Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import type { Role } from "../types/types";

interface RoleRouteProps {
  component: React.ComponentType<any>;
  requiredRole: Role;
}

/**
 * RoleRoute: Reusable wrapper combining ProtectedRoute + lazy loading
 * Eliminates repetition and provides consistent role-based route protection
 */
export function RoleRoute({ component: Component, requiredRole }: RoleRouteProps) {
  return (
    <ProtectedRoute requiredRole={requiredRole}>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </ProtectedRoute>
  );
}

export default RoleRoute;
