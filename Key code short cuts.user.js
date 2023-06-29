// ==UserScript==
// @name         Hotkeys for cards
// @version      2.13.4
// @description  mousetrap keybinds for card page
// @author       OG base code by: dithpri Moded far beyound what it once was by 9003
// @noframes
// @match        https://www.nationstates.net/*page=deck*card=*
// @match        https://www.nationstates.net/page=deck
// @match        https://www.nationstates.net/page=deck/*
// @match        https://www.nationstates.net*
// @match        https://www.nationstates.net/*
// @match        https://www.nationstates.net/*card=*page=deck*
// @match        https://www.nationstates.net/nation=*/page=deck/value_deck=1/template-overall=none
// @match        https://www.nationstates.net/nation=*/page=deck
// @match        https://www.nationstates.net/nation=*/page=deck/value_deck=1/template-overall=none
// @match        https://www.nationstates.net/nation=*/page=deck*
// @match        https://www.nationstates.net/nation=*?founded=new
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @grant        window.close
//
// ==/UserScript==
// IT WORKED!
/*
 * Keybinds:
 * [s]ell, [a]sk
 * [b]uy, [b]id
 * [y] remove ask
 * [u] remove bid
 * [m]atch
 * [o]pen
 * [Ctrl + O] Will open a pack of cards from any page
 * [w] will close the tab
 * [k] to also close the tab (good for one handed farming)
 * [t]o Deck page
 * [e]veryone hates useing 'e' to refresh a page rather then r
 * [f]lip 9003 off becuse you are so thankful for his code, and I guess it flips the cards
 * [enter] also will flip cards now
 * [j]unks all cards listed below the default is to junk Commons, Uncommons, Rares, Ultra rares.  You still need to press enter or space for the pop up
 * s[k]ips the current card so you can junk the next card
 * [h]elps you junk the previous card
 * [g]ifts card
 * [i]ssues in a new tab
 * [r] reloads the page
 * [n] puppet maker
 * [x] opens the config.
 * [1]-[0] Opens the [1]-[10]th card on the page as if clicking the info button
 * [a] pulls up auction page under the trades menu
 */



(function () {

    var count = 0;
var Main_Nation = "9003";
var GiftPuppet= "9006";
var prefix="9003 is great ";
var password="****";
var email="YourEmailHere@DoIT.com";
var motto="I love 9003";
var currency="9003";
var animal="9003";
var JP="Big_farma";
  /* Keybinds */
var sellkey1="S";
var sellkey2="s";
var buykey1="b";
var buykey2="B";
var removesellkey1="y";
var removesellkey2="Y";
var removebuykey1="u";
var removebuykey2="U";
var matchkey1="m";
var matchkey2="M";
var pulleventbidkey1="p";
var pulleventbidkey2="P";
var openpackkey1="o";
var openpackkey2="O";
var closekey1="w";
var closekey2="W";
var todeckpagekey1="t";
var todeckpagekey2="T";
var reloadkey1="r";
var reloadkey2="R";
var flipcardskey1="f";
var flipcardskey2="F";
var issueskey1="i";
var issueskey2="I";
var valuekey1="v";
var valuekey2="V";
var junkkey1="j";
var junkkey2="J";
var closeIfAllJunked= false;
var skipkey1="k";
var skipkey2="K";
var unskipkey1="h";
var unskipkey2="H";
var giftkey1="g";
var giftkey2="G";
var mainsenderkey1="y";
var mainsenderkey2="Y";
var puppetmakerkey1="n";
var puppetmakerkey2="N";
var auctionkey1="a";
var auctionkey2="A";
var notices="p";
var notices2="P";
var Nsettings1="d";
var home1="[";
var market="]";
/*Other junk*/
var FirstTime=false;
var newTab=true;
var help="."
  "use strict";

  function noinput_mousetrap(event) {
    if (event.target.classList.contains("mousetrap")) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  const inputs = document.querySelectorAll('input.auctionbid[name="auction_ask"], input.auctionbid[name="auction_bid"]');
  let ask_match = document.querySelector("#highest_matchable_ask_price > .cardprice_sell");
  let bid_match = document.querySelector("#lowest_matchable_bid_price > .cardprice_buy");
  ask_match = ask_match ? ask_match.textContent : 0;
  bid_match = bid_match ? bid_match.textContent : 0;

    //IF YOU ARE ANNOYED BY A SINGLE POP UP DELETE FROM HERE TO THE NEXT **** LINE *********************************************************************************************************
    if (FirstTime)
  {
      alert("Hello, This message will only pop up once, and if you really hate it you can delete it in the code.(line 132ish-139ish)\nFirst off thanks for using 9003's hotkeys! Remember to say thanks.  Also if you want to change keys for hotkeys press x and use the built in config menu\nFor a full list of commands use [.]");
      FirstTime = false;
  }
   //END DELETE HERE ***************************************************************************************************************************************************************************

  // sell, ask
  Mousetrap.bind([sellkey1, sellkey2], function (ev) {
    noinput_mousetrap(ev);
    document.querySelector('th[data-mode="sell"').click();
    const askbox = document.querySelector('input.auctionbid[name="auction_ask"]');
    askbox.focus();
    askbox.select();
  }, "keyup");

  // buy, bid
  Mousetrap.bind([buykey1, buykey2], function (ev) {
    noinput_mousetrap(ev);
    document.querySelector('th[data-mode="buy"').click();
    const bidbox = document.querySelector('input.auctionbid[name="auction_bid"]');
    bidbox.focus();
    bidbox.select();
  }, "keyup");

  // Remove sell, ask
  Mousetrap.bind([removesellkey1, removesellkey2], function (ev) {
    noinput_mousetrap(ev);
    var stuff = document.querySelectorAll(".cardauctionunmatchedrow-ask .cardprice");
    for (var i = 0; i < stuff.length; i++) {
      stuff[i].click();
    }
    document.querySelector("button[name=remove_ask_price]").click();
  }, "keyup");

  // Remove bid
  Mousetrap.bind([removebuykey1, removebuykey2], function (ev) {
    noinput_mousetrap(ev);
    var stuff = document.querySelectorAll(".cardauctionunmatchedrow-bid .cardprice");
    for (var i = 0; i < stuff.length; i++) {
      stuff[i].click();
    }
    document.querySelector("button[name=remove_bid_price]").click();
  }, "keyup");

  // match sets the ask AND bid to match with the other one use with 'b' or 's' to auto buy or sell at the best price
  Mousetrap.bind([matchkey1, matchkey2], function (ev) {
    noinput_mousetrap(ev);
    if (ask_match && ask_match > 0) {
      document.querySelector('input.auctionbid[name="auction_ask"]').value = ask_match;
    }
    if (bid_match && bid_match > 0) {
      document.querySelector('input.auctionbid[name="auction_bid"]').value = bid_match;
    }
  }, "keyup");

  Mousetrap.bind(
    [pulleventbidkey1, pulleventbidkey2],
    function (ev) {
      noinput_mousetrap(ev);
      var i;
      var stuff;
      stuff = document.getElementsByClassName("cardprice"); //[0].click();
      for (i = 0; i < stuff.length; i++) {
        stuff[i].click();
      }
      document.querySelector('input#new_price_value[name="new_price"]').stepUp();
      document.getElementById("change_price_button").click();
    },
    "keyup"
  );

  Mousetrap.bind([openpackkey1, openpackkey2], function (ev) {
    window.open("https://www.nationstates.net/page=deck?open_loot_box=1","_self");

  }, "keyup");

  //HELP Page
    Mousetrap.bind([help], function (ev) {
    window.open("https://docs.google.com/spreadsheets/d/1LM1fWUM4YaQ6WNkZUjsCbApp1i1zoKc5HTwVIj4C2c4/edit?usp=sharing");
  }, "keyup");
    //close
  Mousetrap.bind([closekey1, closekey2], function (ev) {
    if (!window.location.href.endsWith("/auto")) window.close();
  }, "keyup");
    //To deck page
  Mousetrap.bind([todeckpagekey1, todeckpagekey2], function (ev) {
    window.location.replace("https://www.nationstates.net/page=deck");
  }, "keyup");
    //refresh
  Mousetrap.bind([reloadkey1, reloadkey2], function (ev) {
    location.reload();
  }, "keyup");

    //Notices Template open x page
  Mousetrap.bind([notices, notices2], function (ev) {
    if (newTab)
      {window.open("https://www.nationstates.net/page=notices","_blank");}
     else{
     window.open("https://www.nationstates.net/page=notices","_self");}
  }, "keyup");

      Mousetrap.bind([market], function (ev) {
    if (newTab)
      {window.open("https://www.nationstates.net/page=deck/show_market=auctions","_blank");}
     else{
     window.open("https://www.nationstates.net/page=deck/show_market=auctions","_self");}
  }, "keyup");

      //Home page
      Mousetrap.bind([home1], function (ev) {
    if (newTab)
      {window.open("https://www.nationstates.net","_blank");}
     else{
     window.open("https://www.nationstates.net","_self");}
  }, "keyup");

    //Nsettings
     Mousetrap.bind([Nsettings1], function (ev) {
    if (newTab)
      {window.open("https://www.nationstates.net/page=settings","_blank");}
     else{
     window.open("https://www.nationstates.net/page=settings","_self");}
  }, "keyup");

  //Flip cards
  Mousetrap.bind([flipcardskey1, flipcardskey2], function (ev) {
    document.getElementsByClassName("back")[0].click();
    document.getElementsByClassName("back")[1].click();
    document.getElementsByClassName("back")[2].click();
    document.getElementsByClassName("back")[3].click();
    document.getElementsByClassName("back")[4].click();
  }, "keyup");
    //issues answering stuff off "i"

  Mousetrap.bind([issueskey1, issueskey2], function (ev) {
    if (newTab)
    {
    var NT=true;
    }
      if (window.location.href.indexOf("page=dilemmas") > -1){
        const matches = document.getElementsByClassName("dillistnpaper silentlink");
        if (NT){
          window.open(matches[0].getAttribute('href'),"_blank");
            matches[0].remove()
        }
          else
          {
          window.open(matches[0].getAttribute('href'),"_self");

          }
    }
    else if (window.location.href.indexOf("page=show_dilemma") > -1) {
        const matches = document.getElementsByClassName("button big icon approve");
        matches[0].click();
    }
    else if (window.location.href.indexOf("page=enact_dilemma") > -1){
        const matches2 = document.getElementsByClassName("button lootboxbutton");
       if (matches2.length > 0)
       {
           matches2[0].click();
       }
       else if(NT)
       {window.close();}
       else
       {
           window.open("https://www.nationstates.net/page=dilemmas", "_self");}

   }
      else
    {
      if (NT){
      window.open("https://www.nationstates.net/page=dilemmas", "_blank");
      }
        else {
        window.open("https://www.nationstates.net/page=dilemmas", "_self");}
      }

  }, "keyup");

  Mousetrap.bind([valuekey1, valuekey2], function (ev) {
    window.open("https://www.nationstates.net/page=deck/value_deck=1", "_blank");
  }, "keyup");
  var skip = 0;
  Mousetrap.bind([junkkey1, junkkey2], function (ev) {
    if (document.body.dataset.nname != Main_Nation) {
      let elem = document.querySelectorAll(
        'a.deckcard-junk-button[data-rarity="common"],a.deckcard-junk-button[data-rarity="uncommon"], a.deckcard-junk-button[data-rarity="rare"], a.deckcard-junk-button[data-rarity="ultra-rare"],a.deckcard-junk-button[data-rarity="epic"]'
      )[skip];
      if (elem) {
        elem.click();
        elem.classList.remove("deckcard-junk-button");
        elem.classList.add("disabled");
      } else if (closeIfAllJunked) {
        window.close();
      }
    }
  }, "keyup");
  Mousetrap.bind([skipkey1, skipkey2], function (ev) {
    skip = skip + 1;
  }, "keyup");
  Mousetrap.bind([unskipkey1, unskipkey2], function (ev) {
    skip = skip - 1;
  }, "keyup");
    Mousetrap.bind([mainsenderkey1, mainsenderkey2], function (ev) {
    window.open(window.location.href+"/nation="+ GiftPuppet+"/container="+ GiftPuppet, "_blank");
  }, "keyup");

  // gift page
  Mousetrap.bind([giftkey1, giftkey2], function (ev) {
    noinput_mousetrap(ev);
    if (window.location.href.includes("card=")) {
      document.querySelectorAll("div.deckcard-info-cardbuttons > a.button").forEach(function (el) {
        if (el.textContent == "Gift") {
          el.click();
        }
      });
    }
  }, "keyup");

  if (window.location.href.indexOf("/gift=1") > -1) {
    document.getElementById("entity_name").value = GiftPuppet;
    document.getElementsByName("send_gift")[0].focus();
  }
     Mousetrap.bind("1", function (ev) {
     if(window.location.href=="https://www.nationstates.net/page=deck")
     {var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
     var linky = info1[1].getAttribute("href")
     window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("2", function (ev) {
        if(window.location.href=="https://www.nationstates.net/page=deck"){
            var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
            var linky = info1[4].getAttribute("href")
            window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("3", function (ev) {
         if(window.location.href=="https://www.nationstates.net/page=deck")
         {var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
          var linky = info1[7].getAttribute("href")
          window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("4", function (ev) {
      if(window.location.href=="https://www.nationstates.net/page=deck"){
         var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
          var linky = info1[10].getAttribute("href")
          window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("5", function (ev) {
      if(window.location.href=="https://www.nationstates.net/page=deck"){
         var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
          var linky = info1[13].getAttribute("href")
          window.open(linky, "_blank");}
  }, "keyup");
 Mousetrap.bind("6", function (ev) {
      if(window.location.href=="https://www.nationstates.net/page=deck")
      {var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
       var linky = info1[16].getAttribute("href")
       window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("7", function (ev) {
      if(window.location.href=="https://www.nationstates.net/page=deck"){
         var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
     var linky = info1[19].getAttribute("href")
     window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("8", function (ev) {
     if(window.location.href=="https://www.nationstates.net/page=deck"){
         var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
     var linky = info1[22].getAttribute("href")
     window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("9", function (ev) {
     if(window.location.href=="https://www.nationstates.net/page=deck"){
         var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
     var linky = info1[25].getAttribute("href")
     window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("0", function (ev) {
     if(window.location.href=="https://www.nationstates.net/page=deck"){
         var info1 = document.querySelectorAll('[href*="/page=deck/card="]');
     var linky = info1[28].getAttribute("href")
     window.open(linky, "_blank");}
  }, "keyup");
     Mousetrap.bind("left", function (ev) {
         document.getElementsByClassName("pagpage-arrow")[0].click()
  }, "keyup");
         Mousetrap.bind("right", function (ev) {
         document.getElementsByClassName("pagpage-arrow")[1].click()
  }, "keyup");


  Mousetrap.bind(
    [puppetmakerkey1, puppetmakerkey2],
    function (el) {
      const currency = currency;
      const animal = animal;
      const motto = motto;
      count=count+1;

      document.write(
        `
<form method="POST" action="/cgi-bin/build_nation.cgi" id="x-ns-cp-onestep-form" name="form" onSubmit="submitForm(form.create_nation,'<i class=\'icon-flag-1\'></i>Creating...');">
<table>
<tr><td>
Name:
</td><td>
<input name="nation" id="x-ns-cp-nation-name" maxlength="40" type="text" value="` +
          prefix +
          count +
          `" style="font-size:150%" autofocus required placeholder="Nation Name...">
</td></tr>
<tr><td>
Password:
</td><td>
<input type="password" id="x-ns-cp-pass" name="password" value="` + password + `" required placeholder="Password...">
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
<input name="slogan" maxlength="55" type="text" value="` +
          motto +
          `" placeholder="Motto..."> &rdquo;
</td></tr>
<tr><td>
E-mail:
</td><td>
<input name="email" type="email" value="` + email + `" placeholder="E-mail...">
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
`
      );

      document.getElementById("x-ns-cp-onestep-form").onsubmit = function () {
        document.getElementById("name").value = document.getElementById("x-ns-cp-nation-name").value;
        document.getElementById("x-ns-cp-confirm-pass").value = document.getElementById( "x-ns-cp-pass").value;
        return true;
      };
      //document.getElementById('x-ns-cp-nation-name').value = location.href.replace(/^.*\/x-ns-cp\?x-nsh-nation=([A-Za-z0-9_-]+)$/, "$1").replace(/_/g, " ");
      document.getElementByClass("button").focus();
    },
    "keyup"
  );

  inputs.forEach(function (el) {
    // to be able to use keybinds while inputting numbers
    el.classList.add("mousetrap");
    // to submit on enter
    el.addEventListener("keypress", function (e) {
      if (e.which == 13) {
        this.parentNode.nextElementSibling.firstChild.click();
      }
    });
  });
})();
