import React from 'react';
import messaging, {
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
// import {useNavigation} from '@react-navigation/native';
import notificationService from './notificationService';
import notifee, {EventType} from '@notifee/react-native';

export async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled && __DEV__) {
		console.log('Authorization status:', authStatus);
	}
}

export const listenFirebaseTopic = (topicName: string) => {
	void messaging()
		.subscribeToTopic(topicName)
		.then(
			() => {
				if (__DEV__) {
					console.log(`[FIREBASE TOPIC LISTENER]: ${topicName}`);
				}
			},
			reason => {
				if (__DEV__) {
					console.error(
						`[FIREBASE TOPIC LISTENER ERROR]: ${topicName}`,
						JSON.stringify({reason}, null, 2),
					);
				}
			},
		);
};

export const unsubscribeFirebaseTopic = (topicName: string) => {
	void messaging()
		.unsubscribeFromTopic(topicName)
		.then(() => {
			if (__DEV__) {
				console.log('[FIREBASE TOPIC LISTENER]: unsubscribe');
			}
		});
};

export const getFCMToken = async () => {
	const fcm = await messaging().getToken();

	if (__DEV__) {
		console.log(`fcmToken: ${fcm}`);
	}

	return fcm;
};

export function registerChannel(): void {
	notificationService.createOrUpdateChannel(
		'Order',
		'Channel for geting info about new order',
		'default',
	);
}

export function useInitializeNotification(): void {
	React.useEffect(() => {
		const unsubscribe = () =>
			messaging()
				.getInitialNotification()
				.then(remoteMessage => {
					if (__DEV__) {
						console.log('[ useInitializeNotification ]', remoteMessage);
					}
				});

		void unsubscribe();
	}, []);
}

export function notificationOnBackgroundListener(): void {
	messaging().setBackgroundMessageHandler(async remoteMessage => {
		const {notification} = remoteMessage;

		notificationService.showNotification(
			notification?.title,
			notification?.body as string,
			'Order',
		);

		if (__DEV__) {
			console.log('Message handled in the background!', remoteMessage);
		}
	});

	notifee.onBackgroundEvent(async ({type, detail}) => {
		if (type === EventType.APP_BLOCKED && __DEV__) {
			console.log('APP got Blocked');
		}

		await notifee.cancelNotification(detail.notification?.id || '');
	});
}

//Hooks listener
export const useNotificationListener = () => {
	const messagingRef = React.useRef(messaging());
	// const {navigate} = useNavigation<NavParamsDeliver>();

	React.useEffect(() => {
		return messagingRef.current.onMessage(
			(remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
				if (__DEV__) {
					console.log(
						'A new FCM message arrived!',
						JSON.stringify(remoteMessage),
					);
				}

				const {notification} = remoteMessage;

				notificationService.showNotification(
					notification?.title,
					notification?.body as string,
					'Order',
				);

				/**
				 * triggered by foreground notification
				 * and tell the navigation which route will navigate through notification
				 */
				// if (
				// 	remoteMessage?.data !== undefined &&
				// 	!isEmpty(remoteMessage?.data)
				// ) {
				// 	const {type, extraData} = remoteMessage.data as LinkingServiceParams;
				// 	foregroundData = {type, extraData};
				//
				// 	linkingService({type, extraData}, true);
				// }
			},
		);
	}, []);
};
