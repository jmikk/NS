// ==UserScript==
// @name         Names Are Hard to come up with so I guess its a potato.user.js
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  try to take over the world! With Lots and Lots of nukes! Hot Keys for Nday
// @author       9003
// @include        https://www.nationstates.net/nation=*/page=nukes*
// @include        https://www.nationstates.net/page=nuke*
// @include        https://www.nationstates.net/page=faction*
// @updateURL    https://github.com/jmikk/NS/raw/master/Names%20Are%20Hard%20to%20come%20up%20with%20so%20I%20guess%20its%20a%20potato.user.js
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @grant        none
// ==/UserScript==




/*
* [p]roduction page is pulled up
* [i]ncoming nukes page for the faction
* [f]action NEEDS UPDATING WHEN THE FACTION # COMES OUT AT CREATION ********************************************
* [l]eaderboard, pulls up the faction leaderboard.  
* [j] Self incoming page
*/
//replace with the faction ID when it comes out
var facID="17";
(function() {
    'use strict';

    function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }


    //pulls up the proudction page
     Mousetrap.bind(['p'],  function(ev){window.location.replace("https://www.nationstates.net/page=nukes/view=production");});
     //click make nuke
     //click make shield
     //pulls up incomming page for the faction
     Mousetrap.bind(['i'],  function(ev){window.location.replace("https://www.nationstates.net/page=faction/fid="+facID+"/view=incoming");});
     //pulls up potato faction
//******************************************************************************************************************************************************************************
     Mousetrap.bind(['f'],  function(ev){window.location.replace("https://www.nationstates.net/page=faction/fid="+facID);});
    //Self incoming page
     Mousetrap.bind(['j'],  function(ev){window.location.replace("https://www.nationstates.net/page=nukes/view=incoming");});
//*******************************************************************************************************************************************************************************
      //pulls up faction leaderboard
      Mousetrap.bind(['l'],  function(ev){window.location.replace("https://www.nationstates.net/page=factions");});
})();
