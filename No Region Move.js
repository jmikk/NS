// ==UserScript==
// @name         Anti Region move
// @version      0.1
// @description  Remove the move region button
// @author       9003 (Thanks dithpri for the oringal code)
// @match        https://www.nationstates.net/*region=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (document.body.dataset.nname == '9003') {

    var butts = document.getElementsByName("button danger icon ");
       butts[1].remove;
    }
    // Your code here...
})();
