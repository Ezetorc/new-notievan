import { useEffect } from "react";
import { Route, type RouteProps, type Params, useLocation } from "wouter";
import { SessionService } from "../services/session.service";
import type { Role } from "../../../backend/prisma/generated/prisma/client";

export function ProtectedRoute<P extends Params>({
  component: Component,
  fallback,
  role,
  ...rest
}: RouteProps<P> & { fallback?: string; role?: Role }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!SessionService.value) {
      setLocation(fallback || "/sesion");
    }
  }, [setLocation, fallback]);

  if (!SessionService.value) return null;

  if (role && SessionService.user?.role !== role && SessionService.user?.role !== "ADMIN") {
    console.log("No tenés permisos");
    setLocation(fallback || "/cuenta");
    return null;
  }

  return <Route<P> {...rest} component={Component} />;
}
