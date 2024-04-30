import { Outlet, Navigate, useLocation} from 'react-router-dom';
import useAuth from '../utils/useAuth';

function RouterProtector() {
    const { user } = useAuth();
    const location = useLocation();

    return (
        user?.accessToken ? <Outlet /> : <Navigate to={`/login`} state={{ from: location}} replace />
    );
}

export default RouterProtector;