require ('dotenv').config()

/**
 * A test to compare two screenshots. Check in ideal screenshots as comparison.
 */
const puppeteer = require('puppeteer')
const {toMatchImageSnapshot} = require('jest-image-snapshot')
// import autoScroll from './autoscroll.js'

expect.extend({toMatchImageSnapshot})
const BASIC_AUTH_USERNAME = ''
const BASIC_AUTH_PASSWORD = ''

// Load staging and live domains from .env file
const domain = process.env.TARGET_ENV

// Tune the failure threshold, default is 2%
const customConfig = {
	failureThreshold: 2,
	failureThresholdType: 'percent'
}
/**
 * Paths to test. Paths will be tested at each viewport.
 *
 * @type {string[]}
 */
const testPages = [
	'/',
	'/contact',
	'/blog',
	'/portfolio',
	'/pfff', // 404 page
	'/?s=pfff',
]
/**
 * Viewports to use for each page.
 * @type {[{name: string, width: number, height: number},{name: string, width: number, height: number},{name: string, width: number, height: number}]}
 */
const viewports = [
	{
		"name": "viewportDesktop",
		"width": 1920,
		"height": 1080
	},
	{
		"name": "viewportLaptop", // Laptop macbook pro
		"width": 1728,
		"height": 1117
	},
	{
		"name": "viewportTablet",
		"width": 768,
		"height": 1024
	},
	{
		"name": "viewportMobile", // iPhone SE
		"width": 375,
		"height": 667
	},
]

const ignoredAreas = [
	".testimonial-posts",
]

jest.setTimeout(20000);

/**
 * Example test checking google.com.
 * Will fail the first time if there is no image to compare against in the tests __image_snapshots__ folder.
 */
describe('Visual', () => {
	let browser;
	beforeAll(async () => {
		browser = await puppeteer.launch({
			// headless: false,
			// defaultViewport: null,
			args: ['--ignore-certificate-errors']
		});
	});
	testPages.forEach((testPage) => {
		// Test each viewport
		viewports.forEach((view) => {
			it(testPage + view.width, async () => {
				const page = await browser.newPage();
				await page.setViewport(view)
				// set the HTTP Basic Authentication credential
				// await page.authenticate({'username': BASIC_AUTH_USERNAME, 'password': BASIC_AUTH_PASSWORD});

				await page.goto(domain + testPage, {waitUntil: 'networkidle2'})

				await page.waitForTimeout(500);

				await scrollToBottom(page);
				await page.evaluate(() => { window.scroll(0,0); });
				// Hide ignored areas. Testimonials that are random ruin page layout tests
				await page.evaluate(() => {
					[].forEach.call(document.querySelectorAll('.testimonial-posts'), function (el) {
						el.style.visibility = 'hidden';
					});
				});

				await page.waitForTimeout(1000);

				const image = await page.screenshot({fullPage: true})
				expect(image).toMatchImageSnapshot(customConfig)
			});
		})
	})


	afterAll(async () => {
		await browser.close();
	});
});

function wait(ms) {
	return new Promise(resolve => setTimeout(() => resolve(), ms));
}

async function scrollToBottom(page) {
	const distance = 200; // should be less than or equal to window.innerHeight
	const delay = 100;
	while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
		await page.evaluate((y) => {
			document.scrollingElement.scrollBy(0, y);
		}, distance);
		await page.waitForTimeout(delay);
	}
}
