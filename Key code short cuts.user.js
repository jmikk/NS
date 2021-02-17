// ==UserScript==
// @name         Key code short cuts
// @version      1.7.8
// @description  mousetrap keybinds for card page
// @author       dithpri Moded far beyound what it once was by 9003
// @noframes
// @updateURL    https://github.com/jmikk/NS/raw/master/Key%20code%20short%20cuts
// @match        https://www.nationstates.net/*page=deck*card=*
// @match        https://www.nationstates.net/page=deck
// @match        https://www.nationstates.net/*card=*page=deck*
// @match        https://www.nationstates.net/nation=*/page=deck/value_deck=1/template-overall=none
// @match        https://www.nationstates.net/nation=*/page=deck
// @match        https://www.nationstates.net/nation=*/page=deck/value_deck=1/template-overall=none
// @match        https://www.nationstates.net/nation=*/page=deck*
// @match        https://www.nationstates.net/nation=*?founded=new
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @require      http://code.jquery.com/jquery-latest
// @grant        window.close
//
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_log
// @require       https://openuserjs.org/src/libs/sizzle/GM_config.min.js
// ==/UserScript==
// IT WORKED!
/*
 * Keybinds:
 * [s]ell, [a]sk
 * [b]uy, [b]id
 * [m]atch
 * [o]pen
 * [Ctrl + O] Will open a pack of cards from any page
 * [w] will close close the tab
 * [k] to also close the tab (good for one handed farming)
 * [t]o Deck page
 * [e]veryone hates useing 'e' to refresh a page rather then r
 * [f]lip 9003 off becuse you are so thankful for his code, and I guess it flips the cards
 * [enter] also will flip cards now
 * [j]unks all cards listed below the default is to junk Commons, Uncommons, Rares, Ultra rares.  You still need to press enter or space for the pop up
 * [i]ssues in a new tab
 * [r] reloads the page
 * [n] puppet maker
 * [x] opens the config.
 */

var count =0;
GM_config.init(
{
  'MainNation': {
    'label': GM_config.create('Main Nation'),
    'section': [GM_config.create('Config settings'), 'This is where you put your info in'],
    'type': 'text',
    'default': '9003'
  },
  'password': {
    'label': GM_config.create('Password for Puppet creation'),
    'type': 'text',
    'default': '****'
  },
    'GiftPuppet': {
    'label': GM_config.create('Defualt gift puppet'),
    'type': 'text',
    'default': '9006'
  },
    'JP': {
    'label': GM_config.create('Set as your Puppet Dump'),
    'type': 'text',
    'default': 'Big_farma'
    },
    'prefix':{
    'label': GM_config.create('What is your puppet prefixs'),
    'type': 'text',
    'default':"9003 is great"
    },
    'count':{
    'label': GM_config.create('what should the next number in your puppet series be for creation'),
    'type': 'int',
    'default':0
    },
    'email': {
    'label': GM_config.create('Email for puppet creation'),
    'type': 'text',
    'default': 'YourEmailHere@DoIT.com'
    },
    'sellkey1':{
    'label': GM_config.create('Sell/Ask key 1'),
    'type': 'text',
    'default': 'a'
    },
    'sellkey2':{
    'label': GM_config.create('Sell/Ask key 2'),
    'type': 'text',
    'default': 's'
    },
    'buykey1':{
    'label': GM_config.create('Buy/Bid key 1'),
    'type': 'text',
    'default': 'b'
    },
    'buykey2':{
    'label': GM_config.create('Buy/Bid key 2'),
    'type': 'text',
    'default': 'B'
    },
    'matchkey1':{
    'label': GM_config.create('Match key 1'),
    'type': 'text',
    'default': 'm'
    },
    'matchkey2':{
    'label': GM_config.create('Match key 2'),
    'type': 'text',
    'default': 'M'
    },
    'pulleventbidkey1':{
    'label': GM_config.create('Pullevent bidding key 1'),
    'type': 'text',
    'default': 'p'
    },
    'pulleventbidkey2':{
    'label': GM_config.create('Pullevent bidding key 2'),
    'type': 'text',
    'default': 'P'
    },
    'openpackkey1':{
    'label': GM_config.create('Sell/Ask key 1'),
    'type': 'text',
    'default': 'o'
    },
    'openpackkey2':{
    'label': GM_config.create('Sell/Ask key 2'),
    'type': 'text',
    'default': 'O'
    },
    'openconfigkey1':{
    'label': GM_config.create('Open Config key 1'),
    'type': 'text',
    'default': 'x'
    },
    'openconfigkey2':{
    'label': GM_config.create('Open Config key 2'),
    'type': 'text',
    'default': 'X'
    },
    'closekey1':{
    'label': GM_config.create('Close key 1'),
    'type': 'text',
    'default': 'w'
    },
    'closekey2':{
    'label': GM_config.create('Close key 2'),
    'type': 'text',
    'default': 'k'
    },
    'todeckpagekey1':{
    'label': GM_config.create('To deck page key 1'),
    'type': 'text',
    'default': 't'
    },
    'todeckpagekey2':{
    'label': GM_config.create('To deck page key 2'),
    'type': 'text',
    'default': 'T'
    },
    'reloadkey1':{
    'label': GM_config.create('Reload page key 1'),
    'type': 'text',
    'default': 'r'
    },
    'reloadkey2':{
    'label': GM_config.create('Reload page key 2'),
    'type': 'text',
    'default': 'R'
    },
    'flipcardskey1':{
    'label': GM_config.create('Flip cards key 1'),
    'type': 'text',
    'default': 'f'
    },
    'flipcardskey2':{
    'label': GM_config.create('Flip cards key 2'),
    'type': 'text',
    'default': 'F'
    },
    'issueskey1':{
    'label': GM_config.create('Open issues key 1'),
    'type': 'text',
    'default': 'i'
    },
    'issueskey2':{
    'label': GM_config.create('Open issues key 2'),
    'type': 'text',
    'default': 'I'
    },
    'junkkey1':{
    'label': GM_config.create('Junk cards key 1'),
    'type': 'text',
    'default': 'j'
    },
    'junkkey2':{
    'label': GM_config.create('Junk cards key 2'),
    'type': 'text',
    'default': 'J'
    },
    'puppetmakerkey1':{
    'label': GM_config.create('Puppet maker page key 1'),
    'type': 'text',
    'default': 'n'
    },
    'puppetmakerkey2':{
    'label': GM_config.create('Puppet maker page key 2'),
    'type': 'text',
    'default': 'N'
    }



});

(function() {
    'use strict';

    function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    function callback(){//alert("here");}
    }

    const inputs = document.querySelectorAll("input.auctionbid[name=\"auction_ask\"], input.auctionbid[name=\"auction_bid\"]");
    let ask_match = document.querySelector("#highest_matchable_ask_price > .cardprice_sell");
    let bid_match = document.querySelector("#lowest_matchable_bid_price > .cardprice_buy");
    ask_match = ask_match ? ask_match.textContent : 0;
    bid_match = bid_match ? bid_match.textContent : 0;


     if(window.location.href.indexOf("/gift=1") > -1){
         //alert("test");
       document.getElementById("entity_name").value = GM_config.get('GiftPuppet');
          document.getElementsByName("send_gift")[0].focus();
       }

    // sell, ask
    Mousetrap.bind([GM_config.get('sellkey1'),GM_config.get('sellkey2')], function(ev) {
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
    Mousetrap.bind([GM_config.get('buykey1'),GM_config.get('buykey2')], function(ev) {
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
   // Mousetrap.bind(['g', 'G'], function(ev) {
   //     noinput_mousetrap(ev);
   //    document.querySelectorAll("div.deckcard-info-cardbuttons > a.button").forEach(function(el) {
   //        if(el.textContent == "Gift") {
   //          el.click();
   //    }
   //     });
   //});

    // match sets the ask AND bid to match with the other one use with 'b' or 's' to auto buy or sell at the best price
    Mousetrap.bind([GM_config.get('matchkey1'),GM_config.get('matchkey2')], function(ev) {
        noinput_mousetrap(ev);
        if (ask_match && ask_match > 0) {
            document.querySelector("input.auctionbid[name=\"auction_ask\"]").value = ask_match;
        }
        if (bid_match && bid_match > 0) {
            document.querySelector("input.auctionbid[name=\"auction_bid\"]").value = bid_match;
        }
    });
    //stepUp()

     Mousetrap.bind([GM_config.get('pulleventbidkey1'),GM_config.get('pulleventbidkey2')], function(ev) {
        noinput_mousetrap(ev);
         var i;
         var stuff;
         stuff=document.getElementsByClassName("cardprice");//[0].click();
         for (i = 0; i < stuff.length; i++)
         {
         stuff[i].click();
         }
         document.querySelector("input#new_price_value[name=\"new_price\"]").stepUp();
         document.getElementById("change_price_button").click();
     });

     Mousetrap.bind([GM_config.get('openpackkey1'),GM_config.get('openpackkey2')],  function(ev){document.getElementsByClassName("button lootboxbutton")[0].click();});
    //Mousetrap.bind(['ctrl+o'], async function(ev){
        //alert("1");
      //  $.post("//www.nationstates.net/page=deck?9003sKeyCodes=1", "open_loot_box=1", callback);
             //alert('opend a pack');
        //});
    //open_loot_box=1

     Mousetrap.bind([GM_config.get('openconfigkey1'),GM_config.get('openconfigkey2')],  function(ev){GM_config.open();});
     Mousetrap.bind([GM_config.get('closekey1'),GM_config.get('closekey2')],  function(ev){if(!window.location.href.endsWith("/auto")) window.close();});
    Mousetrap.bind([GM_config.get('todeckpagekey1'),GM_config.get('todeckpagekey2')],   function(ev){window.location.replace("https://www.nationstates.net/page=deck");});
    Mousetrap.bind([GM_config.get('reloadkey1'),GM_config.get('reloadkey2')],  function(ev){location.reload();});
    Mousetrap.bind([GM_config.get('flipcardskey1'),GM_config.get('flipcardskey2')],  function(ev){document.getElementsByClassName("back")[0].click();document.getElementsByClassName("back")[1].click();document.getElementsByClassName("back")[2].click();document.getElementsByClassName("back")[3].click();document.getElementsByClassName("back")[4].click(); });
    Mousetrap.bind([GM_config.get('issueskey1'),GM_config.get('issueskey2')], function(ev) {window.open("https://www.nationstates.net/page=dilemmas")});

    Mousetrap.bind([GM_config.get('junkkey1'), GM_config.get('junkkey2')],  function(ev){let elem = document.querySelector('a.deckcard-junk-button[data-rarity="common"],a.deckcard-junk-button[data-rarity="uncommon"], a.deckcard-junk-button[data-rarity="rare"], a.deckcard-junk-button[data-rarity="ultra-rare"],a.deckcard-junk-button[data-rarity="epic"]');
   if (elem) {
    elem.click();
    elem.classList.remove('deckcard-junk-button');
    elem.classList.add('disabled');
}});

Mousetrap.bind([GM_config.get('puppetmakerkey1'), GM_config.get('puppetmakerkey2')], function (el){
  //Mousetrap.bind(['n'], function (el){
    const currency = "9003";
    const animal = "9003";
   GM_config.set('count', GM_config.get('count')+1);
    GM_config.save();


    document.write(`
<form method="POST" action="/cgi-bin/build_nation.cgi" id="x-ns-cp-onestep-form" name="form" onSubmit="submitForm(form.create_nation,'<i class=\'icon-flag-1\'></i>Creating...');">
<table>
<tr><td>
Name:
</td><td>
<input name="nation" id="x-ns-cp-nation-name" maxlength="40" type="text" value="`+GM_config.get('prefix') + GM_config.get('count') +`" style="font-size:150%" autofocus required placeholder="Nation Name...">
</td></tr>

<tr><td>
Password:
</td><td>
<input type="password" id="x-ns-cp-pass" name="password" value="` + GM_config.get('password') + `" required placeholder="Password...">
</td></tr>

<tr><td>
Classification:
</td><td>
<select id="type" name="type">
<option value="100">Republic</option>
</select>
</td></tr>

<tr><td>
Flag:
</td><td>
<select id="flag" name="flag" size="1">
<option selected value="Default.png">Default</option>
</select>
</td></tr>

<tr><td>
Currency:
</td><td>
The
<input name="currency" maxlength="40" type="text" value="` + currency + `" placeholder="currency...">
</td></tr>

<tr><td>
National Animal:
</td><td>
The
<input name="animal" maxlength="40" type="text" value="` + animal + `" placeholder="animal...">
</td></tr>

<tr><td>
Motto:
</td><td>
&ldquo;
<input name="slogan" maxlength="55" type="text" value="` + "I love 9003" + `" placeholder="Motto..."> &rdquo;
</td></tr>

<tr><td>
E-mail:
</td><td>
<input name="email" type="email" value="` + GM_config.get('email') + `" placeholder="E-mail...">
</td></tr>


</table>
<br>
<br>
<label></label><input type="checkbox" name="autologin" value="1" checked style="vertical-align:bottom"> Remember me</label>
<br>
<input type="checkbox" name="legal" value="1" id="legal" checked required="required">
<br>

<input type="hidden" name="name" id="name" value="">
<input type="hidden" id="x-ns-cp-confirm-pass" name="confirm_password" value="" required placeholder="Password...">
<input type="hidden" name="style" value="50.50.50">
<input type="hidden" name="history" value="">
<input type="hidden" name="q0" value="">
<input type="hidden" name="q1" value="">
<input type="hidden" name="q2" value="">
<input type="hidden" name="q3" value="">
<input type="hidden" name="q4" value="">
<input type="hidden" name="q5" value="">
<input type="hidden" name="q6" value="">
<input type="hidden" name="q7" value="">
<button type="submit" class="button" value="1" name="create_nation"><i class="icon-flag-1"></i> Create Nation</button>
</form>
<form method="get" action="//www.nationstates.net">
    <button type="submit">Bring me back!</button>
</form>

`);


    document.getElementById("x-ns-cp-onestep-form").onsubmit = function() {
        document.getElementById("name").value = document.getElementById("x-ns-cp-nation-name").value;
        document.getElementById("x-ns-cp-confirm-pass").value = document.getElementById("x-ns-cp-pass").value;
        return true;
    };
    //document.getElementById('x-ns-cp-nation-name').value = location.href.replace(/^.*\/x-ns-cp\?x-nsh-nation=([A-Za-z0-9_-]+)$/, "$1").replace(/_/g, " ");
    document.getElementByClass('button').focus();

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
