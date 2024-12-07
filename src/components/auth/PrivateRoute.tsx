import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextManual";

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireDelegate?: boolean;
}

const PrivateRoute = ({
  children,
  requireAdmin = false,
  requireDelegate = false,
}: PrivateRouteProps) => {
  // const { isAuthenticated, isAdmin, isClubDelegate } = useAuth();
  const { isAuthenticated, isAdmin, isClubDelegate, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(isClubDelegate);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requireDelegate && !isClubDelegate && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
