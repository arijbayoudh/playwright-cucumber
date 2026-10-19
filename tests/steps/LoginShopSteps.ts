import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../utils/custom-worlds';
import { MESSAGE } from '../constants/Const';
import { LOCATORS } from '../locators/LoginLocators';
import { LoginShopPage } from '../pages/LoginShopPage';

const resolve = (value: string) =>
  value === '{userEmail}' ? MESSAGE.userAddress : value;

Given('I navigate to WebShop website', async function (this: CustomWorld) {
  await this.page!.goto(this.parameters.appurl);
});

When('I click on the Log in link', async function (this: CustomWorld) {
  await this.page!.click(LOCATORS.loginLink);
});

When('I enter valid credentials', async function (this: CustomWorld, dataTable: DataTable) {
  const data = dataTable.rowsHash(); // { email: ..., password: ... }
  const loginPage = new LoginShopPage(this.page!);
  await loginPage.fillEmailAndPassword(resolve(data.email), data.password);
});

When('I click on the Log in button', async function (this: CustomWorld) {
  const loginPage = new LoginShopPage(this.page!);
  await loginPage.clickBtn();
});

Then(
  'I verify that I am redirected to the Home page with email {string}',
  async function (this: CustomWorld, email: string) {
    await expect(this.page!.locator(LOCATORS.accountLink)).toHaveText(resolve(email));
  }
);