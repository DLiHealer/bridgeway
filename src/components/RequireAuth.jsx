import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// With a backend, the page needs a logged-in account; without one the app stays local (guest) and the page is open.
export default function RequireAuth({ children }) {
  const { backend, account } = useAuth();
  if (backend === null) return null;
  if (backend && !account) return <Navigate to="/logowanie" replace />;
  return children;
}
