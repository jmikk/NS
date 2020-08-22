// ==UserScript==
// @name         Names Are Hard to come up with so I guess its a potato.user.js
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world! With Lots and Lots of nukes! Hot Keys for Nday
// @author       9003
// @match        https://www.nationstates.net/nation=*/page=nukes*
// @match        https://www.nationstates.net/page=nuke*
// @match        https://www.nationstates.net/page=faction*
// @grant        none
// ==/UserScript==




/*
*
*
*/
(function() {
    'use strict';
    
    
     function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    //pulls up the proudction page
     Mousetrap.bind(['p'],  function(ev){window.location.replace("nationstates.net/page=nukes/view=production");});
     
     //click make nuke
     //click make shield
     
     //pulls up own incomming page
     Mousetrap.bind(['i'],  function(ev){window.location.replace("https://www.nationstates.net/page=nukes/view=incoming");});
     
     //pulls up potato faction
      Mousetrap.bind(['f'],  function(ev){window.location.replace("https://www.nationstates.net/page=nukes/view=incoming");});
      
      //pulls up faction leaderboard
      Mousetrap.bind(['l'],  function(ev){window.location.replace("https://www.nationstates.net/page=factions");});
      
     
     
     
})();
