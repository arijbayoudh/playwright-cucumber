import { expect, Page } from "@playwright/test";
import BaseAction from "../utils/basePage";
import { LOCATORS } from "../locators/LoginLocators";

export class LoginShopPage extends BaseAction {
    private readonly currentPage: Page;

    constructor(page: Page) {
        super(page);
        this.currentPage = page;
    }

    public async navigate(url: string) {
        await this.currentPage.goto(url);
    }

    public async clickLoginLink() {
        await this.clickElements(LOCATORS.loginLink);
    }

    public async fillEmailAndPassword(email: string, password: string) {
        await this.fillText(LOCATORS.username, email);
        await this.fillText(LOCATORS.password, password);
    }

    public async clickBtn() {
        await this.clickElements(LOCATORS.btnConnection);
    }

    public async verifyLoggedInEmail(email: string) {
        await expect(this.currentPage.locator(LOCATORS.accountLink)).toHaveText(email);
    }

    public async verifyErrorMessage() {
        await expect(this.currentPage.locator(LOCATORS.errorMessage)).toBeVisible();
    }

    public async clickShoesCategory() {
        await this.clickElements(LOCATORS.shoesCategory);
    }

    public async verifyShoesPage() {
        await expect(this.currentPage.locator(LOCATORS.pageTitle)).toContainText('Shoes');
    }
}