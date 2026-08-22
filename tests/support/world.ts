import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import HomePage from '../pageObjects/pages/home.page';
import LoginPage from '../pageObjects/pages/login.page';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  homePage!: HomePage;
  loginPage!: LoginPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async startBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS === 'true',
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.homePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
  }
}

setWorldConstructor(CustomWorld);