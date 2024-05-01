import { Outlet, Navigate, useLocation} from 'react-router-dom';
import useAuth from '../utils/useAuth';
import { useEffect, useState } from 'react';

function RouterProtector() {
    const { user } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    // due delay in loading local storage value to context state
    useEffect(() => {
        if(user) {
            setIsLoading(false)
        }
    }, [user]);

    return (
        isLoading ? <div>loading...</div> : user?.accessToken ? <Outlet /> : <Navigate to={`/login`} state={{ from: location}} replace />
    );
}

export default RouterProtector;