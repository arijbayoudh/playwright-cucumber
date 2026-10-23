import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { MESSAGE } from '../constants/Const';
import { LoginShopPage } from '../pages/LoginShopPage';

const resolve = (value: string) =>
  value === '{userEmail}' ? MESSAGE.userAddress : value;

Given('I navigate to WebShop website', async function (this: CustomWorld) {
  await new LoginShopPage(this.page!).navigate(this.parameters.appurl);
});

When('I click on the Log in link', async function (this: CustomWorld) {
  await new LoginShopPage(this.page!).clickLoginLink();
});

When('I enter valid credentials', async function (this: CustomWorld, dataTable: DataTable) {
  const data = dataTable.rowsHash();
  await new LoginShopPage(this.page!).fillEmailAndPassword(resolve(data.email), data.password);
});

When('I click on the Log in button', async function (this: CustomWorld) {
  await new LoginShopPage(this.page!).clickBtn();
});

Then('I verify that I am redirected to the Home page with email {string}',
  async function (this: CustomWorld, email: string) {
    await new LoginShopPage(this.page!).verifyLoggedInEmail(resolve(email));
  });

When('I enter invalid credentials', async function (this: CustomWorld, dataTable: DataTable) {
  const data = dataTable.rowsHash();
  await new LoginShopPage(this.page!).fillEmailAndPassword(data.email, data.password);
});

Then('I verify login error message is displayed', async function (this: CustomWorld) {
  await new LoginShopPage(this.page!).verifyErrorMessage();
});

When('I click on Shoes category', async function (this: CustomWorld) {
  await new LoginShopPage(this.page!).clickShoesCategory();
});

Then('I verify that Shoes page is displayed', async function (this: CustomWorld) {
  await new LoginShopPage(this.page!).verifyShoesPage();
});