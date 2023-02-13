import RNBootSplash from 'react-native-bootsplash';

export const hideSplashScreen = () => {
	setTimeout(() => {
		void RNBootSplash.hide({
			fade: true,
		}).then(() => {
			if (__DEV__) {
				console.log('[SplashScreen] hide');
			}
		});
	}, 150);
};
