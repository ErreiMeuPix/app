import React, { useContext } from 'react';
import { View } from 'react-native';
import Register from './(logout)/register';
import { AuthContext } from '../contexts/auth_context';
import AppDrawer from './(drawer)';

// import { Container } from './styles';

const App: React.FC = () => {

	const { user } = useContext(AuthContext)

	console.log(user)

	if (user) {
		return <AppDrawer />
	}


	return <Register />;
}

export default App;
