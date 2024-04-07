/** @type {import('jest').Config} */
const config = {
	verbose: false,
	"reporters": [
		"default",
		[
			"jest-stare",
			{
				"resultDir": "tests/results/jest-stare",
				"reportTitle": "jest-stare!",
				"additionalResultsProcessors": [
					"jest-junit"
				],
				"coverageLink": "../../coverage/lcov-report/index.html",
				"jestStareConfigJson": "jest-stare.json",
				"jestGlobalConfigJson": "globalStuff.json"
			}
		],
		// [
		// 	'@hannohealth/jest-csv-reporter',
		// 	{
		// 		outputDir: 'reports',      // default
		// 		outputFile: 'test.csv',   // overwrite the default: 'test-report-unit.csv'
		// 	},
		// ],
	],
	"testResultsProcessor": "./node_modules/jest-stare"
};

export default config
