import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ onlyPublic = false, component }) => {
	const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
	const user = useSelector((store) => store.user.user);
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

export const PrivateRoute = ({ component }) => (
	<ProtectedRoute component={component} />
);
export const PublicRoute = ({ component }) => (
	<ProtectedRoute onlyPublic={true} component={component} />
);

ProtectedRoute.propTypes = {
	component: PropTypes.element.isRequired,
	onlyUnAuth: PropTypes.bool,
};
