import { useSelector } from '../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
	onlyPublic?: boolean;
	component: React.ReactNode;
};

export const ProtectedRoute = ({
	onlyPublic = false,
	component,
}: TProtectedRouteProps): React.ReactNode => {
	const isAuthChecked = useSelector((store: any) => store.user.isAuthChecked);
	const user = useSelector((store: any) => store.user.user);
	const location = useLocation();

	if (!isAuthChecked) {
		return <div>Загрузка...</div>;
	}

	if (!onlyPublic && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyPublic && user) {
		const from = location.state?.from || { pathname: '/' };
		return <Navigate to={from} replace={true} />;
	}
	return component;
};

export const PrivateRoute = ({ component }: TProtectedRouteProps) => (
	<ProtectedRoute component={component} />
);
export const PublicRoute = ({ component }: TProtectedRouteProps) => (
	<ProtectedRoute onlyPublic={true} component={component} />
);
