// ==UserScript==
// @name         No region move
// @version      0.1
// @namespace    dithpri
// @description  prevent moving regions on main
// @author       dithpri stole with permsion by 9003
// @noframes
// @match        https://www.nationstates.net/*region=*
// ==/UserScript==

(function() {
    'use strict';
    if (document.body.dataset.nname == '9003') {
        document
            .querySelectorAll('button[name="move_region"]')
            .forEach(function (el, idx) {
            el.disabled = true;
        });
    }
})();
