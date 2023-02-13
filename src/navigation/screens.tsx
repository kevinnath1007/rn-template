import React from 'react';
import {
	registerChannel,
	useNotificationListener,
	useInitializeNotification,
	getFCMToken,
} from '@libraries/notification';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//region Root Stack
export type RootStackParams = {
	Unauthenticated: NavigatorScreenParams<UnauthenticatedStackParams>;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export const RootNavigator = () => {
	React.useEffect(() => {
		hideSplashScreen();
	}, []);

	useInitializeNotification();
	registerChannel();
	useNotificationListener();
	void getFCMToken();

	return (
		<RootStack.Navigator
			screenOptions={{headerShown: false, animation: 'fade_from_bottom'}}>
			<RootStack.Screen
				name="Unauthenticated"
				component={UnauthenticatedNavigator}
				options={{animation: 'fade_from_bottom'}}
			/>
		</RootStack.Navigator>
	);
};
//endregion

//region Unauthenticated Stack
import Login from '@modules/auth/login/Login';
import {NavigatorScreenParams} from '@react-navigation/native';
import {hideSplashScreen} from '@libraries/splashscreen';

export type UnauthenticatedStackParams = {
	Login: undefined;
	ForgotPassword: undefined;
};

const UnauthenticatedStack =
	createNativeStackNavigator<UnauthenticatedStackParams>();

const UnauthenticatedNavigator = () => {
	return (
		<UnauthenticatedStack.Navigator>
			<UnauthenticatedStack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
		</UnauthenticatedStack.Navigator>
	);
};
//endregion
