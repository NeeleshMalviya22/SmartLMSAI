import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTE_PATHS, PROTECTED_ROUTES } from "./routes.config";
import RoleRoute from "../guards/RoleRoute";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import RoleBasedDashboard from "../utils/RoleBasedDashboard";

// Lazy load auth pages
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    Loading...
  </div>
);

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route
          path={ROUTE_PATHS.PUBLIC.LOGIN}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path={ROUTE_PATHS.PUBLIC.REGISTER}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Register />
            </Suspense>
          }
        />
      </Route>

      {/* Protected Routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path={ROUTE_PATHS.HOME} element={<RoleBasedDashboard />} />

        {/* Role-based route mapping */}
        {PROTECTED_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RoleRoute
                component={route.component}
                requiredRole={route.role!}
              />
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

// Export route helpers for use in navigation/breadcrumbs/menus
export { ROUTE_PATHS } from "./routes.config";


