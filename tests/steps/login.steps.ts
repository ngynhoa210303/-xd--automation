import { expect } from '@playwright/test';
import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

const username = process.env.USERNAME_ADMIN;
const password = process.env.PASSWORD_ADMIN;
const cqdb_db = "Chính quyền địa phương"

Given('user is on the login page', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When('user enters correct username', async function (this: CustomWorld) {
  if (!username) {
    throw new Error('USERNAME_ADMIN is missing');
  }
  await this.loginPage.txt_username.fill(username);
});

When('user enters correct password', async function (this: CustomWorld) {
  if (!password) {
    throw new Error('PASSWORD_ADMIN is missing');
  }
  await this.loginPage.txt_password.fill(password);
});

When('user searches and selects the CQDP database', async function (this: CustomWorld) {
  await this.loginPage.selectDatabase(cqdb_db);
});

When('user clicks the Login button', async function (this: CustomWorld) {
  await this.loginPage.btn_login.click();
});

Then('user should be redirected to the dashboard', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(`${process.env.BASE_URL}/trang-chu/`);
});

// ===== Đăng nhập theo role - tái sử dụng cho mọi vai trò =====
When('user enters username and password for {string}', async function (this: CustomWorld, role: string) {
  const username = process.env[`USERNAME_${role}`];
  const password = process.env[`PASSWORD_${role}`];
  if (!username || !password) {
    throw new Error(`Credentials for role ${role} is missing (check .env: USERNAME_${role} / PASSWORD_${role})`);
  }
  await this.loginPage.txt_username.fill(username);
  await this.loginPage.txt_password.fill(password);
});


When('user enters incorrect password', async function (this: CustomWorld) {
  await this.loginPage.txt_password.fill('SaiMatKhau@123');
});

When('user enters incorrect password {int} times', async function (this: CustomWorld, times: number) {
  for (let i = 0; i < times; i++) {
    await this.loginPage.txt_password.fill(`SaiMatKhau@${i}`);
    await this.loginPage.btn_login.click();
  }
});

When('user enters username {string}', async function (this: CustomWorld, username: string) {
  await this.loginPage.txt_username.fill(username);
});

When('user leaves username empty', async function (this: CustomWorld) {
  await this.loginPage.txt_username.fill('');
});

When('user leaves password empty', async function (this: CustomWorld) {
  await this.loginPage.txt_password.fill('');
});

When('user searches and selects the CQDP database', async function (this: CustomWorld) {
  await this.loginPage.selectDatabase(cqdb_db);
});

When('user clicks the Login button', async function (this: CustomWorld) {
  await this.loginPage.btn_login.click();
});

When('user clicks the Login button without selecting database', async function (this: CustomWorld) {
  await this.loginPage.btn_login.click();
});

When('user clicks the show password icon', async function (this: CustomWorld) {
  await this.loginPage.lb_eye.click();
});

When('user clicks the {string} link', async function (this: CustomWorld, linkText: string) {
  await this.page.getByText(linkText).click();
});

When('user searches database with keyword {string}', async function (this: CustomWorld, keyword: string) {
  await this.loginPage.selectDatabase(cqdb_db);
});

// ===== Assertions =====
Then('user should be redirected to the dashboard', async function (this: CustomWorld) {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error('BASE_URL is missing');
  await expect(this.page).toHaveURL(`${baseUrl}/trang-chu/`);
});

Then('user should see menu options matching role {string}', async function (this: CustomWorld, role: string) {
  await expect(this.page.locator('.main-menu')).toBeVisible();
  // TODO: bổ sung assert menu cụ thể theo từng role dựa vào ma trận phân quyền
});

Then('user should see error message {string}', async function (this: CustomWorld, message: string) {
  await expect(this.page.locator('.error-message, .toast-error')).toContainText(message);
});

Then('user should remain on the login page', async function (this: CustomWorld) {
  const baseUrl = process.env.BASE_URL;
  await expect(this.page).toHaveURL(`${baseUrl}/login`);
});

Then('no script alert should be triggered', async function (this: CustomWorld) {
  let alertTriggered = false;
  this.page.on('dialog', () => { alertTriggered = true; });
  await this.page.waitForTimeout(1000);
  expect(alertTriggered).toBe(false);
});

Then('password field should display as plain text', async function (this: CustomWorld) {
  await expect(this.loginPage.txt_password).toHaveAttribute('type', 'text');
});

Then('user should be redirected to the forgot password page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/quen-mat-khau/);
});

Then('user should see {string} in database dropdown', async function (this: CustomWorld, message: string) {
  await expect(this.page.locator('.database-dropdown')).toContainText(message);
});