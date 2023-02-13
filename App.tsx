/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '@navigation/screens';

function App(): JSX.Element {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}

export default App;
