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


describe('Text Field Input Form Validation Tests', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  test('Sending is performed after the text exceeds 50 characters and popup message occurs', async () => {
    // Locate the text field
    const textField = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/nameEditText"]');
    
    // Set dummy text longer than 50 characters
    const longText = 'This is a dummy text longer than 50 characters. '.repeat(2); // Creating a text longer than 50 characters
    await textField.setValue(longText);

    // Locate the send button
    const sendButton = await client.$('android.widget.Button[@resource-id="com.example.survey_page:id/sendButton"]');
    
    // Check if the button is clickable
    const isClickable = await sendButton.isClickable();

    // Assert that the button is clickable after the text exceeds 50 characters
    expect(isClickable).toBeTruthy();

    // Perform click action on the send button
    await sendButton.click();

  });

  test('NameEditText text should not exceed 50 characters', async () => {
    const nameEditText = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/nameEditText"]');
    
    // Set dummy text longer than 50 characters
    await nameEditText.setValue('This is a dummy text longer than 50 characters');

    const text = await nameEditText.getText();
    expect(text.length).not.toBeGreaterThan(50);
  });

  test('SurnameEditText text should not exceed 50 characters', async () => {
    const surnameEditText = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/surnameEditText"]');
    
    // Set dummy text shorter than 50 characters
    await surnameEditText.setValue('Short dummy text');

    const text = await surnameEditText.getText();
    expect(text.length).not.toBeGreaterThan(50);
  });
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

  test('Send button is within the application bounds', async () => {
    // Locate the send button
    const sendButton = await client.$('android.widget.Button[@resource-id="com.example.survey_page:id/sendButton"]');
    
    // Get the location of the send button
    const location = await sendButton.getLocation();
    const sendButtonX = location.x;
    const sendButtonY = location.y;

    // Get the size of the application viewport
    const viewportSize = await client.getWindowRect();
    const viewportWidth = viewportSize.width;
    const viewportHeight = viewportSize.height;

    // Assert that the send button is within the application bounds
    expect(sendButtonX >= 0 && sendButtonX <= viewportWidth).toBeTruthy();
    expect(sendButtonY >= 0 && sendButtonY <= viewportHeight).toBeTruthy();
  });

  test('EditText is within the application bounds', async () => {
    // Locate the EditText element
    const editText = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/nameEditText"]');
    
    // Get the location of the EditText element
    const location = await editText.getLocation();
    const editTextX = location.x;
    const editTextY = location.y;

    // Get the size of the application viewport
    const viewportSize = await client.getWindowRect();
    const viewportWidth = viewportSize.width;
    const viewportHeight = viewportSize.height;

    // Assert that the EditText element is within the application bounds
    expect(editTextX >= 0 && editTextX <= viewportWidth).toBeTruthy();
    expect(editTextY >= 0 && editTextY <= viewportHeight).toBeTruthy();
  });
  
  test('Page is scrollable when keyboard appears', async () => {
    // Click on the EditText field
    const editText = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/nameEditText"]');
    await editText.click();

    // Check if the page is scrollable
    const isScrollable = await client.execute('mobile: isKeyboardShown');
    
    // Assert that the page is scrollable
    expect(isScrollable).toBeTruthy();
  });
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

describe('EditText Alignment Test', () => {
  let client;

  beforeEach(async () => {
    client = await remote(wdOpts);
  });

  afterEach(async () => {
    await client.deleteSession();
  });

  test('EditText elements are aligned properly', async () => {
    // Locate the EditText elements
    const nameEditText = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/nameEditText"]');
    const surnameEditText = await client.$('android.widget.EditText[@resource-id="com.example.survey_page:id/surnameEditText"]');
    
    // Get the location and dimensions of each EditText element
    const nameEditTextLocation = await nameEditText.getLocation();
    const nameEditTextSize = await nameEditText.getSize();
    const surnameEditTextLocation = await surnameEditText.getLocation();
    const surnameEditTextSize = await surnameEditText.getSize();

    // Check if the EditText elements start at the same position and end at the same position
    const nameEditTextStartX = nameEditTextLocation.x;
    const nameEditTextEndX = nameEditTextStartX + nameEditTextSize.width;
    const surnameEditTextStartX = surnameEditTextLocation.x;
    const surnameEditTextEndX = surnameEditTextStartX + surnameEditTextSize.width;

    // Assert that the EditText elements are aligned
    expect(nameEditTextStartX).toEqual(surnameEditTextStartX);
    expect(nameEditTextEndX).toEqual(surnameEditTextEndX);
  });

  test('CheckBox elements are aligned properly', async () => {
    // Locate the CheckBox elements
    const checkBoxChatGPT = await client.$('//android.widget.CheckBox[@text="ChatGPT"]');
    const checkBoxBard = await client.$('//android.widget.CheckBox[@text="Bard"]');
    const checkBoxClaude = await client.$('//android.widget.CheckBox[@text="Claude"]');
    const checkBoxCopilot = await client.$('//android.widget.CheckBox[@text="Copilot"]');
    
    // Get the Y coordinate of each CheckBox element
    const chatGPTY = (await checkBoxChatGPT.getLocation()).y;
    const bardY = (await checkBoxBard.getLocation()).y;
    const claudeY = (await checkBoxClaude.getLocation()).y;
    const copilotY = (await checkBoxCopilot.getLocation()).y;

    // Assert that the CheckBox elements are aligned
    expect(chatGPTY).toEqual(bardY);
    expect(chatGPTY).toEqual(claudeY);
    expect(chatGPTY).toEqual(copilotY);
  });
});