// ==UserScript==
// @name         Bodge 2 the electric boogaloo
// @version      0.2.1
// @description  Breeze but safer I guess and opened up
// @author       9003
// @noframes
// @match        https://www.nationstates.net*
// @match        https://www.nationstates.net/*
// @match        https://web.archive.org/web*
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @grant        window.close
// ==/UserScript==

/*
 * Keybinds:
 * [e]ndo the nation you are on
 * [m]ove to the region you have up
 * [w]ill close the tab you have open
 * [r]efresh the tab
 * [u]pdate checker to see if you updated
 * [n] pulls up the main nation page
 * [p]ulls up the WA page press again to apply/resine
 * [s]aves the current page in the waybackmacine index
 * [l] press 4 times to prep the puppet and move to the jump point (WA page, apply to join, JP page, move to JP)
 */

//SET THIS FOR SAFTY
//SET THESE TO YOUR MAIN NATION OR ANY NATION YOU DO NOT WANT TO MOVE
var main = '9003'; //Needs to be all lowercase and have _ for spaces
//SET THIS TO YOUR JUMP POINT FOR THE [l] keys
var JP = 'birb';
//SET THIS TO TRUE IF YOU WANT THE WAYBACKPAGE TO CLOSE AUTOMATICLY WHEN IT IS DONE SAVING WITH [S]
var close_wayback = false;
//END OF USER VAR

var endo = "";
//window.location.href.indexOf("franky") > -1

if (document.body.dataset.nname == main) {
        document
            .querySelectorAll('button[name="move_region"]')
            .forEach(function (el, idx) {
            el.disabled = true;
        });
    }


(function() {
    'use strict';

    function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
//
    Mousetrap.bind(['e'],  function(ev){document.getElementsByClassName("endorse button icon wa")[0].click();});

Mousetrap.bind(['m'],  function(ev){document.getElementsByClassName("button danger icon")[0].click();});
Mousetrap.bind(['w'],  function(ev){window.close();});
Mousetrap.bind(['r'],  function(ev){location.reload();});
Mousetrap.bind(['u'],  function(ev){window.location.replace("https://www.nationstates.net/page=ajax2/a=reports/view=self/filter=change");});
Mousetrap.bind(['n'],  function(ev){window.location.replace("https://www.nationstates.net");});
    Mousetrap.bind(['p'],  function(ev){
        if(!window.location.href.endsWith("/page=un"))
        {window.location.replace("https://www.nationstates.net/page=un");}
        else
        {
        document.getElementsByClassName("button icon")[1].click();
        }
    });
    //https://web.archive.org/save/https://www.nationstates.net/page=deck/card=2
    Mousetrap.bind(['s'],  function(ev){window.open("https://web.archive.org/save/"+window.location.href, '_blank');});
    if(close_wayback && window.location.href.startsWith("https://web.archive.org/web/"))
    {
    window.close();
    }

    Mousetrap.bind(['l'],  function(ev){
        if(!window.location.href.endsWith("/page=un")&&!window.location.href.endsWith("/region=birb")&&!window.location.href.endsWith("/page=UN_status"))
        {window.location.replace("https://www.nationstates.net/page=un");}
        if(window.location.href.endsWith("/page=un"))
        {document.getElementsByClassName("button icon")[1].click(); }
        if(window.location.href.endsWith("/page=UN_status"))
        {window.location.replace("https://www.nationstates.net/region="+JP);}
        if(window.location.href.endsWith("/region="+JP))
        {document.getElementsByClassName("button danger icon")[0].click();}
  });

    inputs.forEach(function(el) {
        // to be able to use keybinds while inputting numbers
        el.classList.add("mousetrap");
        // to submit on enter
        el.addEventListener('keypress', function(e) {
            if(e.which == 13) {
                this.parentNode.nextElementSibling.firstChild.click();
            }
        })
    });
})();