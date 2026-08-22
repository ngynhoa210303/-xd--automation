import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
  await this.startBrowser();
});

After(async function (this: CustomWorld) {
  await this.browser?.close();
});