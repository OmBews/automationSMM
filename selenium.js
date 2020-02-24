const { Builder, By } = require("selenium-webdriver");
async function start() {
  const chrome = require("selenium-webdriver/chrome");
  const options = new chrome.Options();

  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--no-sandbox");

  // function pageIsLoaded(driver){
  //     return driver.find_element_by_tag_name('body') != null
  // }

  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  driver
    .manage()
    .window()
    .maximize();

  await driver.get("https://followiz.com/");
  await driver.sleep(5000);

  driver.findElement(By.name("LoginForm[username]")).sendKeys("oceanooi");
  driver.findElement(By.name("LoginForm[password]")).sendKeys("ooi0314475");
  driver.findElement(By.css(".btn:nth-child(1)")).click();

  driver.sleep(1000);
  driver.findElement(By.css(".fa-user-circle")).click();
}

start();
