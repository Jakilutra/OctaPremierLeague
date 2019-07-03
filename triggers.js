function onEdit(e) {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      cell = {},
      cellValue = "",
      rule = {},
      rules = {},
      tierRange = {},
      slot = {},
      slots = [],
      indvSlots = [],
      compSlots = [],
      address = "",
      firstHiddenRow = 0,
      tierNo = 0,
      tierExp = 0,
      tierDif = 0,
      slotSum = 0,
      slotRem = 0,
      indvRem = 0,
      index = 0,
      findHiddenRow = function () {};
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  cell = sheet.getActiveCell();
  cellValue = cell.getValue();
  address = cell.getA1Notation();
  findHiddenRow = function (config){
    var i = 0;
    for (i=19;i<39;i++) {
      if (config.isRowHiddenByUser(i)) {
        return i;
      }
    }
    return 39;
  }
  
  if (address === "E4" && sheet.getName() === "Config") {
    
    // Showing and Hiding tier rows.
    
    firstHiddenRow = findHiddenRow(sheet);
    tierNo = cellValue;
    tierExp = firstHiddenRow - 19;
    tierDif = tierNo - tierExp;
    if (tierDif > 0){
      sheet.showRows(firstHiddenRow, tierDif);
    }
    if (tierDif < 0){
      sheet.hideRows(firstHiddenRow+tierDif, -tierDif);
    }
    
    // Setting Slots Toggle validation on tier number change.
  
    slot = sheet.getRange("F4");
    slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    slots.splice(0, cellValue-1);
    rule = SpreadsheetApp.newDataValidation().requireValueInList(slots).setAllowInvalid(false).build();
    slot.setDataValidation(rule);
    if (slot.getValue() < tierNo){
      slot.setValue(tierNo);
    }
    
    // Defaulting individual slot toggles on tier number change.
    
    slotSum = sheet.getRange("E18").getValue().match(/(\d\d?)/g);
    tierRange = sheet.getRange("E19:E38");
    indvSlots = tierRange.getValues();
    while (tierDif > 0){
      indvSlots[tierExp] = [1];
      tierDif--;
      tierExp++;
    }
    if ((slotSum + tierDif) > slot.getValue()) {
      indvSlots = [[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1]];
    }
    compSlots = [[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]];
    compSlots.splice(20-tierNo);
    indvSlots.splice(tierNo, 20-tierNo);
    indvSlots = indvSlots.concat(compSlots);
    tierRange.setValues(indvSlots);
    
    // Updating individual slot toggles validation on tier number change.
    
    slotSum = sheet.getRange("E18").getValue().match(/(\d\d?)/g);
    slotRem = slot.getValue() - slotSum;
    rules = tierRange.getDataValidations();
    for (index=0;index<20;index++) {
      indvRem = sheet.getRange("E"+(index+19)).getValue()-1;
      slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].slice(0,slotRem+indvRem+1);
      rules[index][0] = SpreadsheetApp.newDataValidation().requireValueInList(slots).setAllowInvalid(false).build();
    }
    tierRange.setDataValidations(rules);
  }
  
  if (address === "F4" && sheet.getName() === "Config") {
    
    slotSum = sheet.getRange("E18").getValue();
    slotSum = slotSum.match(/(\d\d?)/g);
    tierRange = sheet.getRange("E19:E38");
    
    // Defaulting individual slot toggles on slot decrease.
    
    if (cellValue < slotSum) {
      tierNo = sheet.getRange("E4").getValue();
      indvSlots = [[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1]];
      compSlots = [[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]];
      compSlots.splice(20-tierNo);
      indvSlots.splice(tierNo, 20-tierNo);
      indvSlots = indvSlots.concat(compSlots);
      tierRange.setValues(indvSlots);
    }
    
    // Defaulting individual slot toggles validation on slot change.
   
    slotRem = cellValue - slotSum;
    if (slotRem < 0){
      slotRem = cellValue - tierNo;
    }
    rules = tierRange.getDataValidations();
    for (index=0;index<20;index++) {
      indvRem = sheet.getRange("E"+(index+19)).getValue()-1;
      slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].slice(0,slotRem+indvRem+1);
      rules[index][0] = SpreadsheetApp.newDataValidation().requireValueInList(slots).setAllowInvalid(false).build();
    }
    tierRange.setDataValidations(rules);
  }
  
  // Updating individual slot toggle data validation.
  
  if (cell.getColumn() === 5 && sheet.getName() === "Config" && address.substr(1) > 18) {
    tierRange = sheet.getRange("E19:E38");
    slotSum = sheet.getRange("E18").getValue();
    slotSum = slotSum.match(/(\d\d?)/g);
    slotRem = sheet.getRange("F4").getValue() - slotSum;
    rules = tierRange.getDataValidations();
    for (index=0;index<20;index++) {
      indvRem = sheet.getRange("E"+(index+19)).getValue()-1;
      slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].slice(0,slotRem+indvRem+1);
      rules[index][0] = SpreadsheetApp.newDataValidation().requireValueInList(slots).setAllowInvalid(false).build();
    }
    tierRange.setDataValidations(rules);
  }
  
  // Team Ranking Criteria toggle.
  
  if (address === "B6" && sheet.getName() === "Config") {
    if (cellValue === "A") {
      sheet.getRange("C6").setValue("Most Points → Most Individual Wins → Least Adjudged Losses → Least Dead Matches");
    }
    if (cellValue === "B") {
      sheet.getRange("C6").setValue("Most Points → Most Individual Difference");
    }
  }
  
  if (address === "C6" && sheet.getName() === "Config") {
    if (cellValue === "Most Points → Most Individual Wins → Least Adjudged Losses → Least Dead Matches") {
      sheet.getRange("B6").setValue("A");
    }
    if (cellValue === "Most Points → Most Individual Difference") {
      sheet.getRange("B6").setValue("B");
    }
  }
      
  // Color Previews.
  
  if (cell.getColumn() === 3 || cell.getColumn() === 4) {
    if ((cell.getRow() > 7 && cell.getRow() < 18) || cell.getRow() > 18 && cell.getRow() < 39) {
      if (cellValue.charAt(0) !== "#" || cellValue.length !== 7) {
        cell.setValue("");
      }
      if (cellValue !== "") {
        cell.setBackground(cellValue);
      }
    }
  }
}
