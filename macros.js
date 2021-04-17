function TeamRankUpdate() {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      tSheet = {};
  
  // Assigning sheet variables.
        
  spreadsheet = SpreadsheetApp.getActive();
  tSheet = spreadsheet.getSheetByName("Team Ranking");
  
  // Sorting Team Rankings.  
  
  tSheet.getRange('A6:AL13').activate().sort({column: 1, ascending: true});
  spreadsheet.toast("The Team Rankings have been sorted!");  
};

function PlayerRankUpdate() {

  // Declaring sheet variables.
  
  var spreadsheet = {},
      qrSheet = {},
      configSheet = {},
      teamValues = [];
      teamSheets = [];
  
  // Assigning sheet variables.
        
  spreadsheet = SpreadsheetApp.getActive();
  qrSheet = spreadsheet.getSheetByName("Quick Ranking");
  configSheet = spreadsheet.getSheetByName("Config");
  teamValues = configSheet.getRange('B10:B17').getValues();
  for (let team of teamValues) {
    teamSheets.push(team[0].replace(/(.*\s)/,""));
  }

  // Sorting Quick Rankings.  
  
  qrSheet.getRange('B6:D13').activate().sort([{column: 3, ascending: false},{column: 4, ascending: true}]);
  qrSheet.getRange('B14:D').activate().sort([{column: 3, ascending: false},{column: 4, ascending: true}]);
  qrSheet.getRange('E6:G13').activate().sort([{column: 6, ascending: false},{column: 7, ascending: true}]);
  qrSheet.getRange('E14:G').activate().sort([{column: 6, ascending: false},{column: 7, ascending: true}]);
  qrSheet.getRange('H6:J13').activate().sort([{column: 9, ascending: false},{column: 10, ascending: true}]);
  qrSheet.getRange('H14:J').activate().sort([{column: 9, ascending: false},{column: 10, ascending: true}]);
  qrSheet.getRange('K6:M13').activate().sort([{column: 12, ascending: false},{column: 13, ascending: true}]);
  qrSheet.getRange('K14:M').activate().sort([{column: 12, ascending: false},{column: 13, ascending: true}]);
  qrSheet.getRange('N6:P13').activate().sort([{column: 15, ascending: false},{column: 16, ascending: true}]);
  qrSheet.getRange('N14:P').activate().sort([{column: 15, ascending: false},{column: 16, ascending: true}]);
  qrSheet.getRange('Q6:S13').activate().sort([{column: 18, ascending: false},{column: 19, ascending: true}]);
  qrSheet.getRange('Q14:S').activate().sort([{column: 18, ascending: false},{column: 19, ascending: true}]);

  for (let team of teamSheets){
    let sheet = spreadsheet.getSheetByName(team);
    sheet.getRange('B8:F').activate().sort([{column: 5, ascending: false},{column: 6, ascending: true}]);
  }

  spreadsheet.toast("The Quick Rankings have been sorted!");   

};

function BracketsUpdate() {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      bSheet = {},
      block = 0,
      row0 = 0,
      row1 = 0,
      row2 = 0,
      hTable = {},
      vTable = {},
      ranksRange = {},
      ranks = [],
      rankformulas = [],
      teamsRangeX = {},
      teamsRangeY = {}, 
      grid = {},
      teamBGs = [],
      teamBGsGrid = [],
      statsRange = {},
      i=0,
      j=0;
  
  // Assigning sheet variables.
        
  spreadsheet = SpreadsheetApp.getActive();
  bSheet = spreadsheet.getSheetByName("Brackets");
  block = ((bSheet.getLastRow() - 2)/13);
  
  // Sorting Brackets Grids
  while (block > 0){
    row0 = (block*13) - 6;
    row1 = (block*13) - 5;
    row2 = (block*13) + 2;
    hTable = bSheet.getRange('B'+row1+':P'+row2);
    ranksRange = bSheet.getRange('B'+row1+':B'+row2);
    ranks = ranksRange.getValues();
    rankformulas = ranksRange.getFormulas();
    teamsRangeX = bSheet.getRange('C'+row1+':C'+row2);
    teamsRangeY = bSheet.getRange('D'+row0+':K'+row0);
    grid = bSheet.getRange('D'+row1+':K'+row2);
    statsRange = bSheet.getRange('L'+row1+':P'+row2);
    hTable.activate().sort({column: 2, ascending: true});
    teamsRangeX.copyTo(teamsRangeY,SpreadsheetApp.CopyPasteType.PASTE_NORMAL, true);
    grid.copyTo(grid, SpreadsheetApp.CopyPasteType.PASTE_NORMAL,true);
    ranksRange.setValues(ranks);
    hTable.activate().sort({column: 2, ascending: true});
    grid.copyTo(grid, SpreadsheetApp.CopyPasteType.PASTE_NORMAL,true);
    ranksRange.setFormulas(rankformulas);
    teamsRangeY.copyTo(teamsRangeX,SpreadsheetApp.CopyPasteType.PASTE_NORMAL, true);
    teamBGs = teamsRangeX.getBackgrounds();
    for (i=0;i<8;i++) {
      teamBGsGrid[i] = [];
      for (j=0;j<5;j++){
        teamBGsGrid[i][j] = String(teamBGs[i]);
      }
    }
    statsRange.setBackgrounds(teamBGsGrid);
    block--;
  }
  spreadsheet.toast("The Bracket grids have been sorted!");  
};

function InsertBrackets() {
 
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      sheetName = "",
      lastRow = 0,
      blocks = 0,
      xBlocks = 0;
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  sheetName = sheet.getName();
  
  // Sheet Check.
  
  if (sheetName !== "Brackets") {
      throw new Error("You are on the " + sheetName + " Sheet! Go to the Brackets Sheet to use this macro!");
      return;
  }
  
  // Assigning tier block variables.
  
  lastRow = sheet.getLastRow();
  blocks = ((lastRow - 2)/13);
  xBlocks = sheet.getRange('L3').getValue() + 1 - blocks;
  
  // Inserting Tier blocks check.
  
  if (xBlocks < 1){
      throw new Error("The required number of tiers is already added.");
      return;
  }
  
  // Inserting Tier blocks.
    
  while (xBlocks > 0){
    spreadsheet.getRange(lastRow+":"+lastRow).activate();
    spreadsheet.getActiveSheet().insertRowsAfter(spreadsheet.getActiveRange().getLastRow(), 13);
    spreadsheet.getRange("A"+(lastRow-12)+":"+"AB"+(lastRow)).activate();
    spreadsheet.getActiveRange().copyTo(spreadsheet.getRange("A"+(lastRow+1)));
    xBlocks--;
  }
  spreadsheet.toast("Tier grids have been added to the brackets sheet."); 
};

function RemoveBrackets() {
 
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      sheetName = "",
      lastRow = 0,
      blocks = 0,
      xBlocks = 0;
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  sheetName = sheet.getName();
  
  // Sheet Check.
  
  if (sheetName !== "Brackets") {
      throw new Error("You are on the " + sheetName + " Sheet! Go to the Brackets Sheet to use this macro!");
      return;
  }
  
  // Assigning tier block variables.
  
  lastRow = sheet.getLastRow();
  blocks = ((lastRow - 2)/13);
  xBlocks = blocks - 1 - sheet.getRange('L3').getValue();
  
  // Removing Tier blocks check.
  
  if (xBlocks < 1){
      throw new Error("The required number of tiers has already been removed.");
      return;
  }
  
  // Removing Tier blocks.
    
  while (xBlocks > 0){
    spreadsheet.getRange(lastRow-12+":"+lastRow).activate();
    sheet.deleteRows(lastRow-12, 13);
    lastRow = sheet.getLastRow();
    xBlocks--;
  }
  spreadsheet.toast("Tier grids have been removed from the brackets sheet."); 
};
