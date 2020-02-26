import { AppPage } from './app.po';
import { browser, logging, element } from 'protractor';

describe('cobiro test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  /*
  it('should go to the webpage', () => {
    //page.navigateTo();
    page.checkItemList();    
  });
  */


  it('all menu items should have a button named "Button"', () => {
    for(var i=1; i<=8; i++){
      expect(page.getButtonName(i)).toEqual("Button");   
    }
   
  });


  it('check tree structure exists', () => {
    expect(page.checkItemLevel(".indent-1")).toBeGreaterThan(1);  
    expect(page.checkItemLevel(".indent-2")).toBeGreaterThan(1);  
    expect(page.checkItemLevel("")).toBeGreaterThan(1); 
    
  });

  
  it('total number of items should be 8', () => {
    page.navigateTo();
    expect(page.countItemList()).toBe(8);
  });

  it('should display correct names for items', () => {
    page.navigateTo();
    page.getItemName(1).then(function(text){
      var newtext = text.replace("Button","").trim();
      expect(newtext).toEqual("Item 1");  // according to the design spec
      })     
  });

  

  it('should filter items correctly', () => {
    const testCases = [
      { term: 'Item 44', total: 0, level0: 0, level1: 0, level2: 0},      // no match
      { term: 'Item 2 - Level 1', total: 8, level0: 3, level1: 2, level2: 3},    // full title - WILL FAIL
      { term: 'Item 1', total: 3, level0: 1, level1: 1, level2: 1},
      { term: 'Item 4', total: 1, level0: 1, level1: 0, level2: 0},      
      { term: 'Item 5', total: 4, level0: 1, level1: 1, level2: 2},      
      { term: 'Item 2', total: 2, level0: 0, level1: 1, level2: 1},      
      { term: 'Item 6', total: 3, level0: 0, level1: 1, level2: 2},      
      { term: 'Item 3', total: 1, level0: 0, level1: 0, level2: 1},      
      { term: 'Item 7', total: 1, level0: 0, level1: 0, level2: 1},      
      { term: 'Item 8', total: 1, level0: 0, level1: 0, level2: 1},    
      { term: 'tem 4', total: 1, level0: 1, level1: 0, level2: 0},   //partial match
      { term: 'Item', total: 8, level0: 3, level1: 2, level2: 3},    //match all  items   
     
    ];
  
    testCases.forEach(async test => {

        page.searchTerm(test.term)
        expect(page.countItemList()).toEqual(test.total);              //total number of items 
        expect(page.checkLevel0()).toEqual(test.level0);               //level 0 items
        expect(page.checkItemLevel(".indent-1")).toEqual(test.level1); //level 1 items 
        expect(page.checkItemLevel(".indent-2")).toEqual(test.level2); //level 2 items
     
    });
  });



  it('should show correct infomation on each item when clicking Button', () => {

    const testCases = [
      { item: 'Item 3', info1: 'Item ID: 4', info2: 'Item Title: Item 4', info3: 'Item Parent ID:'},      // actual result - BUG
      { item: 'Item 1', info1: 'Item ID: 2', info2: 'Item Title: Item 2', info3: 'Item Parent ID: 1'},    // actual result - BUG
      { item: 'Item 1', info1: 'Item ID: 1', info2: 'Item Title: Item 1', info3: 'Item Parent ID:'},      // WILL FAIL
      { item: 'Item 2', info1: 'Item ID: 2', info2: 'Item Title: Item 2', info3: 'Item Parent ID: 1'},    // WILL FAIL
      { item: 'Item 3', info1: 'Item ID: 3', info2: 'Item Title: Item 3', info3: 'Item Parent ID: 2'},    // WILL FAIL
      { item: 'Item 4', info1: 'Item ID: 4', info2: 'Item Title: Item 4', info3: 'Item Parent ID:'},      // WILL FAIL
      { item: 'Item 5', info1: 'Item ID: 5', info2: 'Item Title: Item 5', info3: 'Item Parent ID:'},      // WILL FAIL
      { item: 'Item 6', info1: 'Item ID: 6', info2: 'Item Title: Item 6', info3: 'Item Parent ID: 5'},    // WILL FAIL
      { item: 'Item 7', info1: 'Item ID: 7', info2: 'Item Title: Item 7', info3: 'Item Parent ID: 6'},    // WILL FAIL
      { item: 'Item 8', info1: 'Item ID: 8', info2: 'Item Title: Item 8', info3: 'Item Parent ID: 6'},    // WILL FAIL
        
    ];

    testCases.forEach(async test => {
      page.navigateTo();
      page.clickItemByName(test.item);
      expect(page.getItemInfo(1)).toEqual(test.info1);
      expect(page.getItemInfo(2)).toEqual(test.info2);    
      expect(page.getItemInfo(3)).toEqual(test.info3);
    })


  }); 


  it('Should show information on an item from filtered list when clicking button', () => {
    page.navigateTo();
    page.searchTerm('Item 2');
    page.clickItemByName('Item 3');

    expect(page.getItemInfo(1)).toEqual('Item ID: 4'); //BUG
    //expect(page.getItemInfo(1)).toEqual('Item ID: 3');    //EXPECTED, WILL FAIL
    
  });
  

})
