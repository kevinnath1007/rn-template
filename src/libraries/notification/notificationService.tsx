import notifee, {
	AndroidImportance,
	AndroidVisibility,
} from '@notifee/react-native';

const notificationService = {
	configure: (): void => {
		notifee.getChannels().then(() => {
			(channels: string[]) => {
				if (__DEV__ && channels.length) {
					channels.forEach(channel => {
						console.log(`[ current notif channel ]: ${channel}`);
					});
				}
			};
		});

		// notifee.configure({
		// 	/**
		// 	 * onNotification() is required
		// 	 * Called when a remote is received or opened, or local notification is opened
		// 	 */
		// 	onNotification,
		// 	popInitialNotification: true,
		// 	requestPermissions: true,
		// });
	},
	createOrUpdateChannel: (
		channel: string,
		description: string,
		soundName: string = 'default',
	): void => {
		notifee.createChannel({
			id: channel, // (required)
			name: channel, // (required)
			description: description, // (optional) default: undefined.
			importance: AndroidImportance.HIGH,
			vibration: true,
			sound: soundName,
			visibility: AndroidVisibility.PUBLIC,
		});
	},
	onNotifAppOpen: async () => {
		const initialNotification = await notifee.getInitialNotification();

		if (initialNotification) {
			console.log(
				'Notification caused application to open',
				initialNotification.notification,
			);
			console.log(
				'Press action used to open the app',
				initialNotification.pressAction,
			);
		}
	},
	showNotification: (
		title: string | undefined,
		body: string,
		channelId: string,
		timeoutAfter?: number | null,
	): void => {
		notifee.displayNotification({
			title,
			body,
			android: {
				channelId,
				autoCancel: true,
				importance: AndroidImportance.HIGH,
				sound: 'default',
				timeoutAfter: timeoutAfter ?? undefined,
			},
		});
	},
};

export default notificationService;
