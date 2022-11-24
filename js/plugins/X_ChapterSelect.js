/* eslint-disable spaced-comment */
/*:
 * @pluginname X_ChapterSelect
 * @plugindesc A chapter selection system for your games
 * <X_ChapterSelect>
 * @modulename X_Chapter
 * @required
 * @external
 *
 * @author FeniX Contributors (https://fenixenginemv.gitlab.io/)
 *
 * @param loadLatestSave
 * @text Load Latest Save
 * @type boolean
 * @desc Load the latest save file to use for the chapter selection scene.
 * @default false
 *
 * @param chapters
 * @text Chapters
 * @type struct<Chapter>[]
 * @desc A list of all your chapters
 * @default ["{\"name\":\"01 That Dream\",\"description\":\"\\\"One day it all made sense, the next, well, the next day,\\\\nlets just say everything started \\\\nto change.\\\"\",\"summary\":\"\\\"\\\\\\\\C[3]Harold\\\\\\\\C[0] fell ill and \\\\\\\\C[3]Thersea\\\\\\\\C[0] set out\\\\non an adventure for a rare herb.\\\"\",\"thumbnail\":\"pictures/snowy_winter\",\"lockState\":\"true\",\"startMapId\":\"1\",\"playerX\":\"18\",\"playerY\":\"9\",\"requiredVariables\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"requiredSwitches\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\"}","{\"name\":\"02 Once Upon A Star\",\"description\":\"\\\"There it was, I gazed upon the starry\\\\nnight's sky and then it all made\\\\nsense. \\\\\\\\i[10]\\\"\",\"summary\":\"\\\"Travel the \\\\\\\\C[1] Dark Woods \\\\\\\\C[0] and\\\\nfind the \\\\\\\\C[4]Golden Stone.\\\"\",\"thumbnail\":\"pictures/starry_night\",\"lockState\":\"false\",\"startMapId\":\"2\",\"playerX\":\"14\",\"playerY\":\"7\",\"requiredVariables\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\",\"requiredSwitches\":\"[\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"id\\\\\\\":\\\\\\\"11\\\\\\\",\\\\\\\"value\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\"}","{\"name\":\"03 The Supernatural\",\"description\":\"\\\"This is when it all starts to get\\\\nreally weird. Are you ready for it\\\\nall?\\\"\",\"summary\":\"\\\"\\\"\",\"thumbnail\":\"\",\"lockState\":\"false\",\"startMapId\":\"3\",\"playerX\":\"5\",\"playerY\":\"2\",\"requiredVariables\":\"[]\",\"requiredSwitches\":\"[]\"}"]
 *
 * @param chapterWindow
 * @text Chapter Window Options
 * @type struct<ItemWindow>
 * @desc The customizations for the chapter selection window
 * @default {"x":"0","y":"this._helpWindow.height","width":"Graphics.width / 2","height":"Graphics.height - this._helpWindow.height","itemHeight":"160","maxItems":"4","fontSize":"18"}
 *
 * @param thumbnailWindow
 * @text Thumbnail Window Options
 * @type struct<BasicWindow>
 * @desc The customizations for the thumbnail window
 * @default {"x":"this._chapterSelectWindow.width","y":"this._helpWindow.height","width":"Graphics.width / 2","height":"Graphics.height / 2"}
 *
 * @param summaryWindow
 * @text Summary Window Options
 * @type struct<BasicWindow>
 * @desc The customizations for the summary window
 * @default {"x":"this._thumbnailWindow.x","y":"this._thumbnailWindow.y + this._thumbnailWindow.height","width":"Graphics.width / 2","height":"Graphics.height - (this._thumbnailWindow.height + this._helpWindow.height)"}
 *
 * @param horizontalLineColor
 * @text Horizontal Line Color
 * @type string
 * @desc The horizontal line color. This line is drawn under chapter titles
 * @default #fcefb3
 *
 * @param helpWindowTerm
 * @text Help Window Term
 * @type string
 * @desc The term used in the help window when selecting a chapter
 * @default Select a chapter to continue
 *
 * @param summaryTitle
 * @text Summary Title
 * @type string
 * @desc The term used as the title to th summary window
 * @default Summary
 *
 * @param isChapterCommandEnabled
 * @text Chapter Command Enabled
 * @type boolean
 * @desc Should the chapter command be included in the title scene's command window
 * @default true
 *
 * @param chapterCommandText
 * @text Chapter Command Text
 * @type string
 * @desc The text to use as the command's name on the title scene's command window
 * @default Chapter Select
 *
 * @help
--------------------------------------------------------------------------------
 # TERMS OF USE

 MIT License -

 * Free for use in any RPG Maker MV game project, commercial or otherwise

 * Credit may go to FeniXEngine Contributors or FeniXEngine

 * Though not required, you may provide a link back to the original source code,
   repository or website.
 -------------------------------------------------------------------------------
  # INSTALLATION

  Place the plugin file directly in your game project's `/js/plugins/`
  directory

 -------------------------------------------------------------------------------
 # INFORMATION

 This plugin provides the user the option of creating chapters for their game.
 Each chapter will allow you to reset and setup switches and variables which
 will be required for the player to play through the chapter again.

 -------------------------------------------------------------------------------
 # Parameters
 The plugin's parameters provide many options for you to customize the way the
 chapter is presented in the chapter selection scene.

 What is Required switches and variables?

 These are the switches and variables that you know are required to be setup
 in a way that the chapter can correctly proceed. For example if you did a
 full play-through of your game, then some switches and variables will be
 incorrectly set. Starting a chapter without resetting the switch and variable
 values would probably cause unexpected behavior and the chapter would be
 unplayable.

 -------------------------------------------------------------------------------
 # Script Calls

 $gameSystem.chapters()
 This script call return an array of all chapters

 $gameSystem.getChapterById(chapterId)
 Returns the chapter object by its ID

 $gameSystem.getChapterDescription()
 Returns the chapters description

 $gameSystem.isChapterLocked()
 Returns true is the chapter is locked

 $gameSystem.lockChapter()
 Locks the chapter

 $gameSystem.unlockChapter()
 Unlocks the chapter

 -------------------------------------------------------------------------------
 # Plugin Commands

 The Plugin command keyword is: Chapter

 ## Open Chapter Select Scene
 Chapter Open

 ## Lock a chapter
 Chapter Lock chapterId

 ## Unlock a chapter
 Chapter Unlock chapterId

*/

/*~struct~Chapter:
 * @param name
 * @text Name
 * @type string
 * @desc The name of this chapter
 * @default
 *
 * @param description
 * @text Description
 * @type note
 * @desc A description or small summary of this chapter
 * @default
 *
 * @param summary
 * @text Summary
 * @type note
 * @desc A small summary of the events which occurred during this chapter
 * @default
 *
 * @param thumbnail
 * @text Thumbnail
 * @type file
 * @dir /img/
 * @desc A picture or screenshot to represent this chapter
 * @default
 *
 * @param lockState
 * @text Lock State
 * @type boolean
 * @on Unlock
 * @off Lock
 * @desc The default state of this chapter's lock. Enable to allow access on a new game
 * @default false
 *
 * @param startMapId
 * @text Start Map ID
 * @type number
 * @desc The map this chapter should load and set the player location to.
 * @default
 *
 * @param playerX
 * @text Player X
 * @type number
 * @desc The player's x axis starting position
 * @default
 *
 * @param playerY
 * @text Player Y
 * @type number
 * @desc The player's y axis starting position
 * @default
 *
 * @param requiredVariables
 * @text Required Variables
 * @type struct<VariableChange>[]
 * @desc This will be a list of variables that you need to set up for the chapter to proceed correctly
 * @default
 *
 * @param requiredSwitches
 * @text Required Switches
 * @type struct<SwitchChange>[]
 * @desc This will be a list of switches that you need to set up for the chapter to proceed correctly
 * @default
 *
 */

/*~struct~VariableChange:
 * @param id
 * @text Variable ID
 * @type variable
 * @desc The variable you want to set/change value of
 * @default
 *
 * @param value
 * @text Value
 * @type string
 * @desc The value you want to change the variable to
 * @default
 *
 */

/*~struct~SwitchChange:
 * @param id
 * @text Switch ID
 * @type switch
 * @desc The switch you want to set/change value of
 * @default
 *
 * @param value
 * @text Value
 * @type boolean
 * @desc The value you want to change the switch to
 * @default
 *
 */

/*~struct~ItemWindow:
 * @param x
 * @text X Position
 * @type number
 * @desc The position of the window on the x axis (Eval allowed)
 * @default 0
 *
 * @param y
 * @text Y Position
 * @type number
 * @desc The position of the window on the y axis (Eval allowed)
 * @default 0
 *
 * @param width
 * @text Width
 * @type number
 * @desc The width of the window (Eval allowed)
 * @default 400
 *
 * @param height
 * @text Height
 * @type number
 * @desc The height of the window (Eval allowed)
 * @default 400
 *
 * @param itemHeight
 * @text Item Height
 * @type number
 * @desc The height of each chapter rectangle in the window
 * @default 145
 *
 * @param maxItems
 * @text Max Items
 * @type number
 * @desc The max amount of items to display in the window.
 * @default 4
 *
 * @param fontSize
 * @text Font Size
 * @type number
 * @desc The default font size for the content in the window
 * @default 18
 *
 */

/*~struct~BasicWindow:
 * @param x
 * @text X Position
 * @type number
 * @desc The position of the window on the x axis (Eval allowed)
 * @default 0
 *
 * @param y
 * @text Y Position
 * @type number
 * @desc The position of the window on the y axis (Eval allowed)
 * @default 0
 *
 * @param width
 * @text Width
 * @type number
 * @desc The width of the window (Eval allowed)
 * @default 400
 *
 * @param height
 * @text Height
 * @type number
 * @desc The height of the window (Eval allowed)
 * @default 400
 *
 */

(function () {
'use strict';

/**
 * Recursive method that will convert all string values in an object to a more
 * appropriate type.
 *
 * In MV there are a lot of objects filled with strings of different values, a lot
 * of times we need to convert each value manually, instead use this to quickly
 * deep parse each value from string to the correct type.
 *
 * @function convertParameters
 * @since 1.0.0
 * @memberof module:Utils
 *
 * @param {object} parameters - The string filled object you want converted
 *
 * @returns An object with it's string values converted
 * @example
 *
 * const myParams = { p1: '22', p2: 'true' }
 * convertParameters(myParams) // => { p1: 22, p2: true }
 *
 * const myParams = { p1: '{a: 1'1, c: '2'}', p2: '[{}, {}, {}]' }
 * convertParameters(myParams) // => { p1: {a: 1, c: 2}, p2: [{}, {}, {}] }
 *
 */
function convertParameters (parameters) {
  function parseParameters (string) {
    try {
      return JSON.parse(string, (key, value) => {
        try {
          return parseParameters(value)
        } catch (e) {
          return value
        }
      })
    } catch (e) {
      return string
    }
  }
  return parseParameters(JSON.stringify(parameters))
}

const rawParameters = $plugins.filter(
  plugin => plugin.description.contains('<X_ChapterSelect>'))[0].parameters;

const _Params = convertParameters(rawParameters);

function parsePath (path) {
  let folder = '';
  let filename = '';
  const paths = path.split('/');

  if (paths.length > 2) {
    paths.forEach((p, index) => {
      if (index === paths.length - 1) {
        filename = p;
        return
      }
      folder += `${p}/`;
    });
  } else {
    folder = `img/${paths[0]}/`;
    filename = paths[1];
  }

  return { folder, filename }
}

ImageManager.loadChapterThumbnail = function (path) {
  const { filename, folder } = parsePath(path);

  return this.loadBitmap(folder, filename, null, true)
};

ImageManager.reserveChapterThumbnail = function (path, hue, reservationId) {
  const { filename, folder } = parsePath(path);
  this.reserveBitmap(folder, filename, hue, false, reservationId);
};

const initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  initialize.call(this);
  this._chapters = [];
  this.setupChapters();
};

Game_System.prototype.setupChapters = function () {
  this._chapters = _Params.chapters;
};

Game_System.prototype.chapters = function () {
  return this._chapters
};

Game_System.prototype.getChapterById = function (chapterId) {
  return this._chapters[chapterId - 1]
};

Game_System.prototype.getChapterDescription = function (chapterId) {
  return this._chapters[chapterId - 1].description
};

Game_System.prototype.isChapterLocked = function (chapterId) {
  return this._chapters[chapterId - 1].lockState === false
};

// A locked chapter's lockState will be set to false
Game_System.prototype.lockChapter = function (chapterId) {
  this._chapters[chapterId - 1].lockState = false;
};

// An unlocked chapter's lockState will be set to true
Game_System.prototype.unlockChapter = function (chapterId) {
  this._chapters[chapterId - 1].lockState = true;
};

const loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function () {
  loadSystemImages.call(this);
  const thumbnailPaths = _Params.chapters.map(c => c.thumbnail);
  thumbnailPaths.forEach(path => {
    ImageManager.reserveChapterThumbnail(path);
  });
};

Window_TitleCommand.prototype.makeCommandList = function () {
  this.addCommand(TextManager.newGame, 'newGame');
  this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
  this.addCommand(_Params.chapterCommandText, 'chapterSelect', this.isContinueEnabled());
  this.addCommand(TextManager.options, 'options');
};

class Window_ChapterSelect extends Window_Selectable {
  constructor (x, y, width, height) {
    super();
    super.initialize(x, y, width, height);
    this._page = 0;
    this._data = [];
    this._thumbnails = [];
    this.contents.fontSize = _Params.chapterWindow.fontSize;
    this.refresh();
  }

  update () {
    super.update();
  }

  refresh () {
    this.contents.clear();
    this.makeItemList();
    this.drawAllItems();
  }

  itemHeight (index) {
    return _Params.chapterWindow.itemHeight
  }

  item () {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null
  }

  isCurrentItemEnabled () {
    return this.isEnabled(this.item())
  }

  isEnabled (item) {
    return item.lockState === true
  }

  makeItemList () {
    this._data = $gameSystem.chapters();
  }

  maxItems () {
    return _Params.chapterWindow.maxItems
  }

  drawTextRect (text, rect) {
    const y = rect.y + this.contents.fontSize;
    const width = this.textWidth(text);
    this.contents.fillRect(rect.x, y, width + 25, 5, _Params.horizontalLineColor);
  }

  drawItem (index) {
    const chapter = this._data[index];

    if (chapter) {
      const rect = this.itemRect(index);
      rect.width -= this.textPadding();
      this.changePaintOpacity(this.isEnabled(chapter));
      this.makeFontBigger();
      this.drawText(chapter.name, rect.x, rect.y, rect.width);
      this.drawTextRect(chapter.name, rect);
      this.makeFontSmaller();
      this.drawTextEx(chapter.description, rect.x, rect.y + 50, rect.width);
    }
  }
}

class Window_ChapterThumbnail extends Window_Base {
  constructor (x, y, width, height) {
    super();
    super.initialize(x, y, width, height);
    this._chapter = null;
    this.createThumbnail();
  }

  createThumbnail () {
    this._thumbnail = new Sprite();
    this._thumbnail.x = 0 + this.standardPadding();
    this._thumbnail.y = 0 + this.standardPadding();
    this._thumbnail.width = this.width / 2;
    this._thumbnail.height = this.height / 2;
    this.addChild(this._thumbnail);
  }

  setChapter (chapter) {
    this._chapter = chapter;
    this.refresh();
  }

  update () {
    super.update();
  }

  drawTextRect (text, rect) {
    const y = rect.y + this.contents.fontSize;
    const width = this.textWidth(text);
    this.contents.fillRect(rect.x, y, width + 25, 5, '#fcefb3');
  }

  refresh () {
    const chapter = this._chapter;
    if (chapter && chapter.thumbnail) {
      this._thumbnail.bitmap = ImageManager.loadChapterThumbnail(chapter.thumbnail);
      this._thumbnail.bitmap.addLoadListener((bitmap) => {
        this._thumbnail.width = this.width - this.standardPadding() * 2;
      });
    }
  }
}

class Window_ChapterSummary extends Window_Base {
  constructor (x, y, width, height) {
    super();
    super.initialize(x, y, width, height);
    this._chapter = null;
  }

  setChapter (chapter) {
    this._chapter = chapter;
    this.refresh();
  }

  update () {
    super.update();
  }

  refresh () {
    this.contents.clear();
    this.drawTitle();
    if (this._chapter) {
      this.drawChapterSummary();
    }
  }

  makeFontSmaller () {
    if (this.contents.fontSize >= 24) {
      this.contents.fontSize -= 8;
    }
  }

  drawTitle () {
    this.drawText(_Params.summaryTitle, 0, 0, this.width - this.standardPadding(), 'center');
    this.contents.fillRect(0, 35, this.width, 5, _Params.horizontalLineColor);
  }

  drawChapterSummary () {
    const chapter = this._chapter;
    this.drawTextEx(chapter.summary, 0, 45);
    this.resetFontSettings();
  }
}

class Scene_ChapterSelect extends Scene_MenuBase {
  constructor () {
    super();
    super.initialize();
    this._selectedChapter = 0;
    this._loadSuccess = false;
  }

  create () {
    DataManager.loadAllSavefileImages();
    this.createChapterBackground();
    this.createWindowLayer();
    this.createHelpWindow();
    this.createSaveFileList();
    this.createChapterSelect();
    this.createChapterThumbnail();
    this.createChapterSummary();
  }

  start () {
    super.start();
    if (this._saveFileList) {
      this._saveFileList.refresh();
    }
    if (this.loadSave(DataManager.latestSavefileId())) {
      this._loadSuccess = true;
      this._helpWindow.setText(_Params.helpWindowTerm);
      this._chapterSelectWindow.refresh();
    }
  }

  update () {
    super.update();
    if (_Params.loadLatestSave && !this._chapterSelectWindow.open()) {
      this._thumbnailWindow.open();
      this._summaryWindow.open();
      this._chapterSelectWindow.open();
      this._chapterSelectWindow.activate();
      this._helpWindow.setText(_Params.helpWindowTerm);
      this._chapterSelectWindow.refresh();
    }
    if (!_Params.loadLatestSave && !this._saveFileList.isClosing() && this._saveFileList.isClosed() && !this._chapterSelectWindow.isOpen()) {
      this._thumbnailWindow.open();
      this._summaryWindow.open();
      this._chapterSelectWindow.open();
      this._chapterSelectWindow.activate();
    }
    if (this._selectedChapter !== this._chapterSelectWindow.index()) {
      this._selectedChapter = this._chapterSelectWindow.index();
      this._thumbnailWindow.setChapter(this.selectedChapter());
      this._summaryWindow.setChapter(this.selectedChapter());
    }
  }

  createChapterBackground () {
    this._chapterBackground = new Sprite();
    this.addChild(this._chapterBackground);
  }

  createChapterSelect () {
    const width = this._tryEval(_Params.chapterWindow.width);
    const height = this._tryEval(_Params.chapterWindow.height);
    const y = this._tryEval(_Params.chapterWindow.y);

    this._chapterSelectWindow = new Window_ChapterSelect(0, y, width, height);
    this._chapterSelectWindow.setHandler('ok', this.onChapterSelect.bind(this));
    this._chapterSelectWindow.setHandler('cancel', this.popScene.bind(this));
    this._chapterSelectWindow.close();
    this.addWindow(this._chapterSelectWindow);
  }

  createChapterThumbnail () {
    const options = _Params.thumbnailWindow;
    const width = this._tryEval(options.width);
    const height = this._tryEval(options.height);
    const y = this._tryEval(options.y);
    const x = this._tryEval(options.x);

    this._thumbnailWindow = new Window_ChapterThumbnail(x, y, width, height);
    this._thumbnailWindow.close();
    this.addWindow(this._thumbnailWindow);
  }

  createChapterSummary () {
    const options = _Params.summaryWindow;
    const width = this._tryEval(options.width);
    const height = this._tryEval(options.height);
    const y = this._tryEval(options.y);
    const x = this._tryEval(options.x);

    this._summaryWindow = new Window_ChapterSummary(x, y, width, height);
    this._summaryWindow.close();
    this.addWindow(this._summaryWindow);
  }

  createSaveFileList () {
    if (_Params.loadLatestSave) {
      return
    }
    const width = Graphics.width;
    const height = Graphics.height - this._helpWindow.height;
    const y = this._helpWindow.height;

    this._saveFileList = new Window_SavefileList(0, y, width, height);
    this._saveFileList.setHandler('ok', this.onSaveFileLoad.bind(this));
    this._saveFileList.setHandler('cancel', this.popScene.bind(this));
    this._saveFileList.select(0);
    this._saveFileList.setTopRow(0 - 2);
    this._helpWindow.setText('Load a save file');
    this.addWindow(this._saveFileList);
  }

  selectedChapter () {
    return this._chapterSelectWindow.item()
  }

  setupSwitches (switchData) {
    if (switchData && switchData.length > 0) {
      switchData.forEach(data => {
        $gameSwitches.setValue(data.id, data.value);
      });
    }
  }

  setupVariables (variableData) {
    if (variableData && variableData.length > 0) {
      variableData.forEach(data => {
        $gameVariables.setValue(data.id, data.value);
      });
    }
  }

  onSaveFileLoad () {
    const savefileId = this._saveFileList.index() + 1;
    if (this.loadSave(savefileId)) {
      this._loadSuccess = true;
      this._saveFileList.deactivate();
      this._saveFileList.close();
      this._helpWindow.setText(_Params.helpWindowTerm);
      this._chapterSelectWindow.refresh();
    } else {
      this._saveFileList.activate();
    }
  }

  loadSave (savefileId) {
    if (DataManager.loadGame(savefileId)) {
      SoundManager.playLoad();
      return true
    } else {
      SoundManager.playBuzzer();
      return false
    }
  }

  onChapterSelect () {
    const chapter = this.selectedChapter();
    this._chapterSelectWindow.close();
    this.fadeOutAll();
    if (chapter.requiredVariables) {
      this.setupVariables(chapter.requiredVariables);
    }
    if (chapter.requiredSwitches) {
      this.setupSwitches(chapter.requiredSwitches);
    }
    $gamePlayer.reserveTransfer(chapter.startMapId, chapter.playerX, chapter.playerY);
    $gamePlayer.requestMapReload();
    SceneManager.goto(Scene_Map);
  }

  _tryEval (expression) {
    try {
      // eslint-disable-next-line no-eval
      return eval(expression)
    } catch (error) {
      console.error(`Unable to evaluate the following expression ${expression}`);
    }
  }
}

const createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function () {
  createCommandWindow.call(this);
  if (_Params.isChapterCommandEnabled) {
    this._commandWindow.setHandler('chapterSelect', this.commandChapterSelect.bind(this));
  }
};

Scene_Title.prototype.commandChapterSelect = function () {
  this._commandWindow.close();
  SceneManager.push(Scene_ChapterSelect);
};

const pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
  if (command.toLowerCase() === 'chapter') {
    const subCommand = args[0].toLowerCase();
    switch (subCommand) {
      case 'lock':
        $gameSystem.lockChapter(args[1]);
        break
      case 'unlock':
        $gameSystem.unlockChapter(args[1]);
        break
      case 'open':
        SceneManager.push(Scene_ChapterSelect);
        break
      default:
        console.error(`There was a problem with plugin command ${command} ${subCommand}`);
        break
    }
  } else {
    pluginCommand.call(this, command, args);
  }
};

}());
