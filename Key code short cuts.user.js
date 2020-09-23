// ==UserScript==
// @name         Key code short cuts
// @version      0.2
// @description  mousetrap keybinds for card page
// @author       dithpri Moded far beyound what it once was by 9003
// @noframes
// @updateURL    https://github.com/jmikk/NS/raw/master/Key%20code%20short%20cuts.user.js 
// @match        https://www.nationstates.net/*page=deck*card=*
// @match        https://www.nationstates.net/page=deck
// @match        https://www.nationstates.net/*card=*page=deck*
// @match        https://www.nationstates.net/nation=*/page=deck/value_deck=1/template-overall=none
// @match        https://www.nationstates.net/nation=*/page=deck
// @match        https://www.nationstates.net/nation=*/page=deck/value_deck=1/template-overall=none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @grant        window.close
// ==/UserScript==
// IT WORKED!
/*
 * Keybinds:
 * [s]ell, [a]sk
 * [b]uy, [b]id
 * [g]ift
 * [m]atch
 * [o]pen
 * [w] will close close the tab
 * [k] to also close the tab (good for one handed farming)
 * [t]o Deck page
 * [e]veryone hates useing 'e' to refresh a page rather then r
 * [f]lip 9003 off becuse you are so thankful for his code, and I guess it flips the cards
 * [enter] also will flip cards now 
 * [j]unks all cards listed below the default is to junk Commons, Uncommons, Rares, Ultra rares.  You still need to press enter or space for the pop up
 * [i]ssues in a new tab
 * [r] reloads the page
 */

(function() {
    'use strict';
    function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    const inputs = document.querySelectorAll("input.auctionbid[name=\"auction_ask\"], input.auctionbid[name=\"auction_bid\"]");
    let ask_match = document.querySelector("#highest_matchable_ask_price > .cardprice_sell");
    let bid_match = document.querySelector("#lowest_matchable_bid_price > .cardprice_buy");
    ask_match = ask_match ? ask_match.textContent : 0;
    bid_match = bid_match ? bid_match.textContent : 0;

    // sell, ask
    Mousetrap.bind(['s', 'a', 'S', 'A', 'l'], function(ev) {
        noinput_mousetrap(ev);
        document.querySelector("th[data-mode=\"sell\"").click();
        const askbox = document.querySelector("input.auctionbid[name=\"auction_ask\"]");
        askbox.focus(); askbox.select();
    });
     //ignore this block unless your name is 9003 or you have 9003's puppet report maker
   if(window.location.href.endsWith("/auto")){ Mousetrap.bind(['x'], function(ev) {
        noinput_mousetrap(ev);
        document.querySelector("th[data-mode=\"sell\"").click();
        const askbox = document.querySelector("input.auctionbid[name=\"auction_ask\"]");
        askbox.focus(); askbox.select();
    });}

    // buy, bid
    Mousetrap.bind(['b', 'B'], function(ev) {
        noinput_mousetrap(ev);
        document.querySelector("th[data-mode=\"buy\"").click();
        const bidbox = document.querySelector("input.auctionbid[name=\"auction_bid\"]");
        bidbox.focus(); bidbox.select();
    });
    //ignore this block unless your name is 9003 or you have 9003's puppet report maker
 if(window.location.href.endsWith("/auto")){Mousetrap.bind(['z'], function(ev) {
        noinput_mousetrap(ev);
        document.querySelector("th[data-mode=\"buy\"").click();
        const bidbox = document.querySelector("input.auctionbid[name=\"auction_bid\"]");
        bidbox.focus(); bidbox.select();
    });}
    // gift page
    Mousetrap.bind(['g', 'G'], function(ev) {
        noinput_mousetrap(ev);
        document.querySelectorAll("div.deckcard-info-cardbuttons > a.button").forEach(function(el) {
            if(el.textContent == "Gift") {
                el.click();
            }
        });
    });

    // match sets the ask AND bid to match with the other one use with 'b' or 's' to auto buy or sell at the best price
    Mousetrap.bind(['m', 'M'], function(ev) {
        noinput_mousetrap(ev);
        if (ask_match && ask_match > 0) {
            document.querySelector("input.auctionbid[name=\"auction_ask\"]").value = ask_match;
        }
        if (bid_match && bid_match > 0) {
            document.querySelector("input.auctionbid[name=\"auction_bid\"]").value = bid_match;
        }
    });

     Mousetrap.bind(['o'],  function(ev){document.getElementsByClassName("button lootboxbutton")[0].click();});
     Mousetrap.bind(['w','k'],  function(ev){if(!window.location.href.endsWith("/auto")) window.close();});
    Mousetrap.bind(['t'],   function(ev){window.location.replace("https://www.nationstates.net/page=deck");});
    Mousetrap.bind(['r'],  function(ev){location.reload();});
     Mousetrap.bind(['f','enter'],  function(ev){document.getElementsByClassName("back")[0].click();document.getElementsByClassName("back")[1].click();document.getElementsByClassName("back")[2].click();document.getElementsByClassName("back")[3].click();document.getElementsByClassName("back")[4].click(); });
     Mousetrap.bind(['i'], function(ev) {window.open("https://www.nationstates.net/page=dilemmas")});
    Mousetrap.bind(['j'],  function(ev){let elem = document.querySelector('a.deckcard-junk-button[data-rarity="common"],a.deckcard-junk-button[data-rarity="uncommon"], a.deckcard-junk-button[data-rarity="rare"], a.deckcard-junk-button[data-rarity="ultra-rare"]');
   if (elem) {
    elem.click();
    elem.classList.remove('deckcard-junk-button');
    elem.classList.add('disabled');
}});
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
