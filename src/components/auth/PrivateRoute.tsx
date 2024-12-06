import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireDelegate?: boolean;
}

const PrivateRoute = ({ 
  children, 
  requireAdmin = false,
  requireDelegate = false 
}: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin, isClubDelegate } = useAuth();
  const location = useLocation();

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