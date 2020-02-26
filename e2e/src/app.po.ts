import { browser, by, element } from 'protractor';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;       
  }


  checkFirstItem() {
    var li = element(by.xpath('//ul/li'));
    expect(li.getText()).toMatch('Item 1 - Level');
    console.log("first item" + li.getText());
  }


  async searchTerm(term){
    await element(by.xpath("//input[@placeholder='Search']")).clear().then(function(){
       element(by.xpath("//input[@placeholder='Search']")).sendKeys(term);
       //browser.pause(2000);
    })
   
  }

  checkItemList() {    
    element.all(by.xpath('//ul/li')).count().then(function(text){
        console.log("Items on page: " + text)
    })   
  }

  async getItemName(index) {
    var li = element(by.css('ul')).element(by.css("li:nth-child("+ index + ")")).getText();
    return li;    
  }

  async clickItemByName(elemName) {    
      await element.all(by.css('ul li')).each(async elem=> {
        await elem.getText().then(text=>  {
        if ( text.includes(elemName))  {         
         elem.element(by.css("Button")).click();
        }
      })    
    })
  }


  async getItemInfo(index) {        
    var info = await element(by.css('div.item')).element(by.css("div:nth-child("+ index + ")")).getText()
    return info      
  }


  async countItemList() {  
    const newcount = await element.all(by.xpath('//ul/li')).count()
    return newcount
  }

 
  async getButtonName(index) {        
    var buttonText = element(by.xpath('//ul/li['+ index + ']/button')).getText()
    return buttonText      
  }


  async checkLevel0(){
    
    const allItems = await element.all(by.xpath('//ul/li[@class=""]')).count()
    return allItems;

  }

  async checkItemLevel(level){
    
    const allItems = await element.all(by.css('ul li' + level)).count()
    return allItems;

  }  

}
