import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Modal } from '../modal/modal';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { checkUserAuth } from '../../services/actions/user';
import { Home } from '../../pages/home/Home';
import { Login } from '../../pages/login/login';
import { NotFound } from '../../pages/not-found/not-found';
import { Register } from '../../pages/register/register';
import { Profile } from '../../pages/profile/profile';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { PrivateRoute, PublicRoute } from '../protected-route';
import { ProfileDetails } from '../profile-details/profile-details';
import { Orders } from '../orders/orders';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';

const App = (): JSX.Element => {
	const dispatch = useDispatch();
	const { data, dataRequest, dataError } = useSelector(
		(state: any) => state.ingredients
	);

	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(getIngredients() as any);
	}, [dispatch]);

	useEffect(() => {
		dispatch(checkUserAuth() as any);
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.whole__screen}>
				{dataRequest ? (
					<div className={styles.whole__screen}>Загрузка...</div>
				) : dataError ? (
					<div className={styles.whole__screen}>
						Ошибка получения данных с сервера: {dataError}
					</div>
				) : data && data.length > 0 ? (
					<>
						<Routes location={background || location}>
							<Route path='/' element={<Home />} />
							<Route
								path='/ingredients/:ingredientId'
								element={<IngredientDetails />}
							/>

							<Route
								path='/login'
								element={<PublicRoute component={<Login />} />}
							/>
							<Route
								path='/register'
								element={<PublicRoute component={<Register />} />}
							/>
							<Route
								path='/forgot-password'
								element={<PublicRoute component={<ForgotPassword />} />}
							/>
							<Route
								path='/reset-password'
								element={<PublicRoute component={<ResetPassword />} />}
							/>

							<Route
								path='profile'
								element={<PrivateRoute component={<Profile />} />}>
								<Route
									path='/profile'
									element={<PrivateRoute component={<ProfileDetails />} />}
								/>
								<Route
									path='orders'
									element={<PrivateRoute component={<Orders />} />}
								/>
							</Route>

							<Route path='*' element={<NotFound />} />
						</Routes>

						{background && (
							<Routes>
								<Route
									path='/ingredients/:ingredientId'
									element={
										<Modal
											header={'Детали ингредиента'}
											onClose={handleModalClose}>
											<IngredientDetails />
										</Modal>
									}
								/>
							</Routes>
						)}
					</>
				) : (
					<p className={styles.whole__screen}>Ошибка</p>
				)}
			</main>
		</div>
	);
};

export default App;
