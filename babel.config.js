module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	env: {
		production: {
			plugins: ['transform-remove-console'],
		},
	},
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
				extensions: ['.ios.js', '.android.js', '.js', '.json', '.tsx', '.ts'],
				alias: {
					'@root': '.',
					'@assets': './assets',
					'@src': './src',
					'@themes': './src/themes',
					'@modules': './src/modules',
					'@components': './src/components',
					'@libraries': './src/libraries',
					'@utils': './src/utils',
					'@hooks': './src/hooks',
					'@navigation': './src/navigation',
				},
			},
		],
	],
};
