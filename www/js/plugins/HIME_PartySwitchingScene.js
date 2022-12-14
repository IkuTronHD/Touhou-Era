/*:
-------------------------------------------------------------------------------
@title Party Switching Scene
@author Hime --> HimeWorks (http://himeworks.com)
@date Feb 5, 2018
@version 1.2
@filename HIME_PartySwitchingScene.js
@url http://himeworks.com/2016/03/party-switching-scene/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.2 - Provides a simple scene for switching party members between
different parties.
@help 
-------------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=e9d6YiYVXhY

In RPG Maker, you have a party of actors. This is the party that you control
normally when you explore the world, participate in battle, and so on.

However, what happens if there are more actors available in the game than you
can recruit? We need to put those actors somewhere.

This is where a party switching scene comes in: it provides a simple solution
for you to allow players to manage their parties.

This plugin provides a scene where you can trade actors between two parties.
I provide a "reserve" party which is just another party which holds all of
the actors that aren't in the current party.

So for example, let's say you completed a quest for someone and he was really
moved by your cause and decides to join your adventure, and tells you that
he will be available in the "guild hall".

When you go to the guild hall, you can speak to an NPC to check your party
status, and you will find the new actor ready to add to your party. If you
already have too many actors in your party, then you will either have to
swap someone out, or choose to leave him in the guild hall.

If you are using the Party Manager plugin, you can use this party switching
scene to trade actors between different parties of your choice.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.2 - Feb 5, 2018
 * Party list on the left should not be limited by max battle members
1.1 - Apr 29, 2016
 * implemented party locking with Party Manager
1.0 - Mar 18, 2016
 * initial release
 
== Required ==

* Party Manager
(http://himeworks.com/2016/02/party-manager-mv/)

== Usage ==

-- Calling the Scene --

To go to the party switching scene, use the script call

  SceneManager.push(Scene_PartySwitch)
  
In the plugin parameters, you can set up some help text that will be
shown during the scene.
  
-- Switching Party Members --

Once you're in the scene, you should see two windows by default.
The window on the left holds the current party, and the window on the
right holds the other party.

--- Adding actors ---

To add an actor to your party, if you have enough room, select an empty
space in the list. You will then be prompted to select an actor from the
other party to add to your current party.

--- Removing actors ---

To remove an actor from your party, select one of your actors, and then
select an empty space in the other window.

--- Swapping actors ---

To swap actors between parties, select one of your actors, and then
select another actor from the other window.

--- Leaving the Scene ---

To leave the scene, press the cancel button.
However, if you have no party members in the current scene, it will
play a buzzer sound and you cannot leave.

-- Maximum Party Members --

This plugin assumes that you have a limit on how many actors will be in
the party. It is determined by the max number of battle members.

-- Working with Reserve Party --

This plugin provides a default "reserve" party for you. The purpose of
this reserve party is to hold all of the actors that are currently not
in your party, but can be recruited into the party through the scene.

The reserve party can be accessed using a script call

  var party = $gameSystem.reserveParty()
  
Which will return a Game_Party object. You can then interact with this
party like any other party:

  var party = $gameSystem.reserveParty()
  party.addActor(2)     // add actor 2 to reserve party
  party.removeActor(3)  // remove actor 3 from reserve party
  
Initially, the reserve party has no actors.
  
-- Specifying a different party to trade --

Perhaps you would like to have multiple reserve parties, or just have other
parties that you would like to trade with.

The scene assumes the default party that you will trade with is the reserve
party provided by this plugin, but if you are using a plugin such as the
Party Manager, you may have other parties that you would like to use.

To have the scene use a different party, you can say

  SceneManager.push(Scene_PartySwitch)
  SceneManager.prepareNextScene(OTHER_PARTY)
  
Where the OTHER_PARTY is a reference to another Game_Party object.
The OTHER_PARTY will be shown on the right side.

Refer to the other plugins for instructions on how to retrieve a reference
to a party.

-------------------------------------------------------------------------------
@param Start Text
@desc The text that you see when an actor isn't selected yet
@default Please select a party of 4.

@param Select Text
@desc The text that you see after selecting an actor
@default Choose a member to switch with.
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_PartySwitchingScene = 1;
TH.PartySwitchingScene = TH.PartySwitchingScene || {};

function Scene_PartySwitch() {
  this.initialize.apply(this, arguments);
};

Scene_PartySwitch.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PartySwitch.prototype.constructor = Scene_PartySwitch;

function Window_PartySwitchList() {
  this.initialize.apply(this, arguments);
};

Window_PartySwitchList.prototype = Object.create(Window_Selectable.prototype);
Window_PartySwitchList.prototype.constructor = Window_PartySwitchList;

function Window_PartySwitchAvailable() {
  this.initialize.apply(this, arguments);
};

Window_PartySwitchAvailable.prototype = Object.create(Window_PartySwitchList.prototype);
Window_PartySwitchAvailable.prototype.constructor = Window_PartySwitchAvailable;

(function ($) {

  $.params = PluginManager.parameters("HIME_PartySwitchingScene");  
  $.startText = $.params["Start Text"];
  $.selectText = $.params["Select Text"];
  
  /***************************************************************************/

  var TH_GameSystem_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    TH_GameSystem_initialize.call(this);
    this._reserveParty = new Game_Party();
  };

  Game_System.prototype.reserveParty = function() {
    return this._reserveParty;
  };
  
  /***************************************************************************/

  /* Some defaults */
  Scene_PartySwitch.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._currentParty = $gameParty;
    this._otherParty = $gameSystem.reserveParty();
  };
  
  Scene_PartySwitch.prototype.prepare = function(otherParty, currentParty) {
    this._otherParty = otherParty;
    if (currentParty) {
      this._currentParty = currentParty;  
    }
  }
  Scene_PartySwitch.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindowLayer();
    this.createAllWindows();
  };
  
  Scene_PartySwitch.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);        
    this.startScene();    
  };
  
  Scene_PartySwitch.prototype.startScene = function() {
    this._listWindow.refresh();
    this._availableWindow.refresh();
    this._helpWindow.setText($.startText);
    this._listWindow.activate();
    this._listWindow.select(0);
  };
  
  Scene_PartySwitch.prototype.createAllWindows = function() {
    this.createHelpWindow();
    this.createListWindow();
    this.createAvailableWindow();
  };
  
  Scene_PartySwitch.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(1);    
    this.addWindow(this._helpWindow);
  };
  
  Scene_PartySwitch.prototype.createListWindow = function() {
    var y = this._helpWindow.y + this._helpWindow.height;
    this._listWindow = new Window_PartySwitchList(0, y, Graphics.width / 2, Graphics.height - y);
    this._listWindow.setData(this._currentParty);
    this._listWindow.setHandler('ok', this.onPartyOk.bind(this));
    this._listWindow.setHandler('cancel', this.onPartyCancel.bind(this));
    this.addWindow(this._listWindow);    
  };
  
  Scene_PartySwitch.prototype.createAvailableWindow = function() {
    var x = this._listWindow.x + this._listWindow.width
    var y = this._listWindow.y;
    this._availableWindow = new Window_PartySwitchAvailable(x, y, Graphics.width / 2 , Graphics.height - y);    
    this._availableWindow.setData(this._otherParty);
    this._availableWindow.setHandler('ok', this.onActorOk.bind(this));
    this._availableWindow.setHandler('cancel', this.onActorCancel.bind(this));    
    this.addWindow(this._availableWindow);
  };
  
  Scene_PartySwitch.prototype.onPartyOk = function() {
    this._helpWindow.setText($.selectText);
    this._listWindow.deactivate();
    this._availableWindow.activate();
    this._availableWindow.select(0);
  };
  
  Scene_PartySwitch.prototype.onPartyCancel = function() {
    if (this._currentParty.size() === 0) {
      SoundManager.playBuzzer();
      this._listWindow.activate();
    }
    else {    
      this.popScene();
    }
  };
  
  Scene_PartySwitch.prototype.onActorOk = function() {    
    this.swapMembers();
    this._helpWindow.setText($.startText);
    this._availableWindow.deselect();
    this._availableWindow.deactivate();
    this._listWindow.activate();
  };
  
  Scene_PartySwitch.prototype.onActorCancel = function() {    
    this._helpWindow.setText($.startText);
    this._availableWindow.deselect();
    this._availableWindow.deactivate();
    this._listWindow.activate();
  };
  
  /* Just get it to work */
  Scene_PartySwitch.prototype.swapMembers = function() {
    var sIdx = this._listWindow.index()
    var tIdx = this._availableWindow.index();
    
    var party = this._listWindow._data
    var otherParty = this._availableWindow._data;
    
    var oldActor = party.members()[sIdx];
    var newActor = otherParty.members()[tIdx];
    if (newActor) {
      party.addActor(newActor.actorId())
      party.swapOrder(newActor.index(), sIdx);
      otherParty.removeActor(newActor.actorId());
    }

    if (oldActor) {      
      otherParty.addActor(oldActor.actorId());
      otherParty.swapOrder(otherParty.members().indexOf(oldActor), tIdx);
      party.removeActor(oldActor.actorId());
    }
    
    this._listWindow.refresh();
    this._availableWindow.refresh();
  };
    
  Scene_PartySwitch.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
  };
  
  Scene_PartySwitch.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
  };
  
  /***************************************************************************/
  
  Window_PartySwitchList.prototype.initialize = function(x, y, width, height) {    
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);        
    this._data = $gameParty;    
    this.refresh();    
  };
  
  Window_PartySwitchList.prototype.setData = function(data) {
    if (this._data !== data) {
      this._data = data;
      this.refresh();
    }
  };
  
  Window_PartySwitchList.prototype.loadImages = function() {
    this._data.members().forEach(function(actor) {
        ImageManager.loadFace(actor.faceName());
    }, this);
  };
  
  Window_PartySwitchList.prototype.itemWidth = function() {
    return this.width;
  };
  
  Window_PartySwitchList.prototype.itemHeight = function() {
    return 164;
  };
  
  Window_PartySwitchList.prototype.maxItems = function() {
    return this._data ? this._data.size() + 1 : 0;
  };
  
  Window_PartySwitchList.prototype.maxCols = function() {
    return 1;
  };
  
  Window_PartySwitchList.prototype.isEnabled = function(actor) {
    return !actor || actor && !actor.isPartyLocked();
  };
  
  Window_PartySwitchList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);    
    var actor = this._data.members()[index]
    if (actor) {
      var x = rect.x;
      var y = rect.y + 10;
      this.changePaintOpacity(this.isEnabled(actor));
      this.drawActorFace(actor, x, y);
      this.drawText(actor.name(), x + 164, y, 200);
      this.drawText("LV", x + 164, y + 32, 200);
      this.drawText(actor.level, x + 164, y + 32, 200, 'center');
      this.drawText("HP", x + 164, y + 64, 200);
      this.drawText(actor.hp + "/" + actor.mhp, x + 164, y + 64, 200, 'center');
      this.drawText("MP", x + 164, y + 96, 200);
      this.drawText(actor.mp + "/" + actor.mmp, x + 164, y + 96, 200, 'center');
      this.changePaintOpacity(1);
    }
  };  
  
  Window_PartySwitchList.prototype.refresh = function() {
    this.loadImages();
    this.contents.clear();
    this.drawAllItems();
  };
    
  Window_PartySwitchList.prototype.processOk = function() {
    var actor = this._data.members()[this._index];
    if (!this.isEnabled(actor)) {
      this.playBuzzerSound();
    }
    else {
      Window_Selectable.prototype.processOk.call(this);
    }
  };
  
  /***************************************************************************/
    
  Window_PartySwitchAvailable.prototype.maxItems = function() {
    return this._data ? this._data.size() + 1 : 0;
  };
  
  Window_PartySwitchAvailable.prototype.maxCols = function() {
    return 1;
  };
  
  /***************************************************************************/
  
  /* Requires Menu Command Manager */
  Game_Unit.prototype.addMenuCommand_party = function() {
    var command = new Data_MenuCommand("party", $.commandName);
    this.addMenuCommand(command);
  }
  
  Window_MenuCommand.prototype.addCommand_party = function(cmd) {
    this.addCommand(cmd.name, cmd.symbol, cmd.isEnabled(), cmd.ext);
  };
  
  var TH_SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    TH_SceneMenu_createCommandWindow.call(this);
    this._commandWindow.setHandler('party', this.commandParty.bind(this));
  };
  
  Scene_Menu.prototype.commandParty = function() {
    SceneManager.push(Scene_PartySwitch);
  };
})(TH.PartySwitchingScene);