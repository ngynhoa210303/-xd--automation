import { BasePageComponent } from '../base.pageComponent';

export default class NavBar extends BasePageComponent {
  readonly menu = {
    home: this.page.locator("//div[@id='0-Trang_chủ']"),
    administrative_boundary: {
      menu: this.page.locator("//div[@id='8-Địa_giới_hành_chính']"),
      administrative_boundary_list: this.page.locator("//span[text()='Danh sách địa giới hành chính']"),
      administrative_boundary_data_entry: this.page.locator("//span[text()='Nhập liệu hồ sơ địa giới hành chính']"),
    },

    local_government: {
      menu: this.page.locator("//div[@id='9-Chính_quyền_địa_phương']"),
      local_government_list: this.page.locator("//span[text()='Danh sách chính quyền địa phương']"),
      local_government_data_entry: this.page.locator("//span[text()='Nhập liệu hồ sơ chính quyền địa phương']"),
    },

    reports: this.page.locator("//div[@id='10-Báo_cáo']"),

    configuration: {
      menu: this.page.locator("//div[@id='21-Cấu_hình']"),
    }
  };

  readonly userAvatar = this.page.locator("//div[contains(@class,'d-flex flex-column')]/following-sibling::div[1]");
  readonly notifications = this.page.locator("//div[contains(@class,'p-toast p-component')]/following-sibling::button[1]");

  readonly userAvatar_dropdown = {
    instructions: this.page.locator("(//li[@role='menuitem']//div)[1]"),
    information: this.page.locator("(//li[@role='menuitem']//div)[2]"),
    change_password: this.page.locator("(//li[@role='menuitem']//div)[3]"),
    logout: this.page.locator("(//li[@role='menuitem']//div)[4]"),
  };

}
