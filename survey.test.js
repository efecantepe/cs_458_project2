const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'emulator-5554',//'sdk_gphone_x86_64'
  'appium:appPackage': 'com.example.survey_page',
  'appium:appActivity': '.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(10000);
    await driver.deleteSession();
  }
}

// Before and after hooks to set up and tear down the Appium session


describe('Text input fields test suite', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  test('should fill text input fields', async () => {
    // Adjust the selectors according to your application's specifics
    const field1 = await client.$('com.example.survey_page:id/surnameEditText');
    await field1.setValue('Sample text for field 1');

    const field2 = await client.$('com.example.survey_page:id/nameEditText');
    await field2.setValue('Sample text for field 2');

    const field3 = await client.$('com.example.survey_page:id/nameEditText');
    await field2.setValue('Sample text for field 2');

    const field4 = await client.$('com.example.survey_page:id/nameEditText');
    await field2.setValue('Sample text for field 2');

    // Continue with other fields as necessary...

    // Assertions to verify the fields contain the expected values
    // (Adjust according to the actual logic of your test)
    expect(await field1.getText()).toEqual('Sample text for field 1');
    expect(await field2.getText()).toEqual('Sample text for field 2');

    // Add any additional assertions or interactions as needed
  });

  // Include additional tests as necessary
});