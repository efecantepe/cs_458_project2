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


describe('Text Field Input Form Validation Tests', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  test('Allowed Text Field Data', async () => {
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
    expect(await field2.getText()).toEqual('Sample text for field 2');
    // Add any additional assertions or interactions as needed
  });

  // Include additional tests as necessary
});

describe('Checkbox Functionailty Test', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  test('Checkbox able to check when clicked', async () => {
    // Replace with actual resource-id or text selectors for checkboxes
    const checkboxParentId = 'com.example.survey_page:id/aiModelCheckboxes';

    // Check the 'ChatGPT' checkbox
    const chatGPTCheckbox = await client.$(`android=new UiSelector().resourceId("${checkboxParentId}").text("ChatGPT")`);
    await chatGPTCheckbox.click();
    let isChecked = await chatGPTCheckbox.getAttribute('checked');
    expect(isChecked).toBe('true');

    // Check the 'Bard' checkbox
    const bardCheckbox = await client.$(`android=new UiSelector().resourceId("${checkboxParentId}").text("Bard")`);
    await bardCheckbox.click();
    isChecked = await bardCheckbox.getAttribute('checked');
    expect(isChecked).toBe('true');

  });

  test('Checkbox able to remove check if clicked double', async () => {
    const checkboxParentId = 'com.example.survey_page:id/aiModelCheckboxes';

    // Interact with the 'ChatGPT' checkbox
    const chatGPTCheckbox = await client.$(`android=new UiSelector().resourceId("${checkboxParentId}").text("ChatGPT")`);
    
    // Check the checkbox
    await chatGPTCheckbox.click();

    // Uncheck the checkbox
    await chatGPTCheckbox.click();
    isChecked = await chatGPTCheckbox.getAttribute('checked');
    expect(isChecked).toBe('false');

    // Repeat the process for the 'Bard' checkbox
    const bardCheckbox = await client.$(`android=new UiSelector().resourceId("${checkboxParentId}").text("Bard")`);
    
    // Check the checkbox
    await bardCheckbox.click();

    // Uncheck the checkbox
    await bardCheckbox.click();
    isChecked = await bardCheckbox.getAttribute('checked');
    expect(isChecked).toBe('false');


  });

  test('"Claude feedback" field appears when the "Claude" checkbox is checked', async () => {
    const checkboxParentId = 'com.example.survey_page:id/aiModelCheckboxes';
    
    // Interact with the 'Claude' checkbox
    const claudeCheckbox = await client.$(`android=new UiSelector().resourceId("${checkboxParentId}").text("Claude")`);
    await claudeCheckbox.click(); // Click to check the checkbox
    
    // Locate the 'Claude feedback' EditText by its text attribute
    const claudeFeedbackField = await client.$(`android=new UiSelector().textContains("Claude feedback")`);
    
    // Assert the 'Claude feedback' field is displayed
    const isDisplayed = await claudeFeedbackField.isDisplayed();
    expect(isDisplayed).toBe(true);
    
    // Optionally, uncheck the 'Claude' checkbox and assert the field is not displayed
    await claudeCheckbox.click(); // Click again to uncheck
    const isFeedbackFieldDisplayedAfterUnchecked = await claudeFeedbackField.isDisplayed();
    expect(isFeedbackFieldDisplayedAfterUnchecked).toBe(false);
  });

  test('Should hide the "Claude feedback" field when the "Claude" checkbox is unchecked', async () => {
    const checkboxParentId = 'com.example.survey_page:id/aiModelCheckboxes';
    
    // Interact with the 'Claude' checkbox to check it
    const claudeCheckbox = await client.$(`android=new UiSelector().resourceId("${checkboxParentId}").text("Claude")`);
    await claudeCheckbox.click(); // Click to check the checkbox
    await claudeCheckbox.click(); // Click again to uncheck the checkbox
    
    // Locate the 'Claude feedback' EditText by its text attribute
    const claudeFeedbackField = await client.$(`android=new UiSelector().textContains("Claude feedback")`);
    
    // Assert the 'Claude feedback' field is not displayed
    let isDisplayed;
    try {
      isDisplayed = await claudeFeedbackField.isDisplayed();
    } catch (error) {
      // If the element is not found, isDisplayed will throw an error
      isDisplayed = false;
    }
    expect(isDisplayed).toBe(false);
  });

});

describe('Component Boundry and UI/UX test', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  test('Allowed Text Field Data', async () => {
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
    expect(await field2.getText()).toEqual('Sample text for field 2');
    // Add any additional assertions or interactions as needed
  });

  // Include additional tests as necessary
});

describe('SQL Injection Tests', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  const checkDatabaseIsEmpty = async () => {
    try {
      const response = await axios.get('http://localhost:3000/survey');
      return response.data.length === 0; // Assuming the response data is an array of survey entries
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  };

  test('should attempt SQL injection in name field and check for empty database', async () => {
    const nameEditText = await client.$('id:com.example.survey_page:id/nameEditText');
    const sqlInjectionCode = "Robert'); DROP TABLE survey;--";
    await nameEditText.setValue(sqlInjectionCode);

    const sendButton = await client.$('id:com.example.survey_page:id/sendButton');
    await sendButton.click();

    const isDatabaseEmpty = await checkDatabaseIsEmpty();
    expect(isDatabaseEmpty).toBe(false);
  });

  test('should attempt SQL injection in surname field and check for empty database', async () => {
    const surnameEditText = await client.$('id:com.example.survey_page:id/surnameEditText');
    const sqlInjectionCode = "Robert'); DROP TABLE survey;--";
    await surnameEditText.setValue(sqlInjectionCode);

    const sendButton = await client.$('id:com.example.survey_page:id/sendButton');
    await sendButton.click();

    const isDatabaseEmpty = await checkDatabaseIsEmpty();
    expect(isDatabaseEmpty).toBe(false);
  });

  test('should attempt to use a comment to bypass subsequent SQL', async () => {
    const nameEditText = await client.$('id:com.example.survey_page:id/nameEditText');
    const sqlInjectionCode = "admin' --";
    await nameEditText.setValue(sqlInjectionCode);

    const sendButton = await client.$('id:com.example.survey_page:id/sendButton');
    await sendButton.click();

    const isDatabaseEmpty = await checkDatabaseIsEmpty();
    expect(isDatabaseEmpty).toBe(false);
  });

  test('should attempt to cause a deliberate SQL error', async () => {
    const surnameEditText = await client.$('id:com.example.survey_page:id/surnameEditText');
    const sqlInjectionCode = "1'; SELECT * FROM non_existent_table; --";
    await surnameEditText.setValue(sqlInjectionCode);

    const sendButton = await client.$('id:com.example.survey_page:id/sendButton');
    await sendButton.click();

    const isDatabaseEmpty = await checkDatabaseIsEmpty();
    expect(isDatabaseEmpty).toBe(false);
  });

});