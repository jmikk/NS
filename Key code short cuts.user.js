// ==UserScript==
// @name         Hotkeys for cards
// @version      1.13.4
// @description  mousetrap keybinds for card page
// @author       OG base code by: dithpri Moded far beyound what it once was by 9003
// @noframes
// @updateURL    https://github.com/jmikk/NS/raw/master/Key%20code%20short%20cuts.user.js
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

var count = 0;
GM_config.init({
  /* General settings */
  MainNation: {
    label: GM_config.create("Main Nation"),
    section: [GM_config.create("Config settings"), "This is where you put your info in"],
    type: "text",
    default: "9003",
  },
  GiftPuppet: {
    label: GM_config.create("Default gift puppet"),
    type: "text",
    default: "9006",
  },
  /* Puppet creator */
  prefix: {
    label: GM_config.create("What is your puppet prefixes"),
    section: "Puppet creator",
    type: "text",
    default: "9003 is great ",
  },
  count: {
    label: GM_config.create("what should the next number in your puppet series be for creation"),
    type: "int",
    default: 0,
  },
  password: {
    label: GM_config.create("Password for Puppet creation"),
    type: "text",
    default: "****",
  },
  email: {
    label: GM_config.create("Email for puppet creation"),
    type: "text",
    default: "YourEmailHere@DoIT.com",
  },
  motto: {
    label: GM_config.create("Motto"),
    type: "text",
    default: "I love 9003",
  },
  currency: {
    label: GM_config.create("Currency"),
    type: "text",
    default: "9003",
  },
  animal: {
    label: GM_config.create("Animal"),
    type: "text",
    default: "9003",
  },
  JP: {
    label: GM_config.create("Set as your Puppet Dump"),
    type: "text",
    default: "Big_farma",
  },
  /* Keybinds */
  sellkey1: {
    label: GM_config.create("Sell/Ask key 1"),
    section: "Keybinds",
    type: "text",
    default: "S",
  },
  sellkey2: {
    label: GM_config.create("Sell/Ask key 2"),
    type: "text",
    default: "s",
  },
  buykey1: {
    label: GM_config.create("Buy/Bid key 1"),
    type: "text",
    default: "b",
  },
  buykey2: {
    label: GM_config.create("Buy/Bid key 2"),
    type: "text",
    default: "B",
  },
  removesellkey1: {
    label: GM_config.create("Remove sell/ask key 1"),
    type: "text",
    default: "y",
  },
  removesellkey2: {
    label: GM_config.create("Remove sell/ask key 2"),
    type: "text",
    default: "Y",
  },
  removebuykey1: {
    label: GM_config.create("Remove buy/bid key 1"),
    type: "text",
    default: "u",
  },
  removebuykey2: {
    label: GM_config.create("Remove buy/bid key 2"),
    type: "text",
    default: "U",
  },
  matchkey1: {
    label: GM_config.create("Match key 1"),
    type: "text",
    default: "m",
  },
  matchkey2: {
    label: GM_config.create("Match key 2"),
    type: "text",
    default: "M",
  },
  pulleventbidkey1: {
    label: GM_config.create("Pull event bidding key 1"),
    type: "text",
    default: "p",
  },
  pulleventbidkey2: {
    label: GM_config.create("Pull event bidding key 2"),
    type: "text",
    default: "P",
  },
  openpackkey1: {
    label: GM_config.create("Sell/Ask key 1"),
    type: "text",
    default: "o",
  },
  openpackkey2: {
    label: GM_config.create("Sell/Ask key 2"),
    type: "text",
    default: "O",
  },
  openconfigkey1: {
    label: GM_config.create("Open Config key 1"),
    type: "text",
    default: "x",
  },
  openconfigkey2: {
    label: GM_config.create("Open Config key 2"),
    type: "text",
    default: "X",
  },
  closekey1: {
    label: GM_config.create("Close key 1"),
    type: "text",
    default: "w",
  },
  closekey2: {
    label: GM_config.create("Close key 2"),
    type: "text",
    default: "W",
  },
  todeckpagekey1: {
    label: GM_config.create("To deck page key 1"),
    type: "text",
    default: "t",
  },
  todeckpagekey2: {
    label: GM_config.create("To deck page key 2"),
    type: "text",
    default: "T",
  },
  reloadkey1: {
    label: GM_config.create("Reload page key 1"),
    type: "text",
    default: "r",
  },
  reloadkey2: {
    label: GM_config.create("Reload page key 2"),
    type: "text",
    default: "R",
  },
  flipcardskey1: {
    label: GM_config.create("Flip cards key 1"),
    type: "text",
    default: "f",
  },
  flipcardskey2: {
    label: GM_config.create("Flip cards key 2"),
    type: "text",
    default: "F",
  },
  issueskey1: {
    label: GM_config.create("Open issues key 1"),
    type: "text",
    default: "i",
  },
  issueskey2: {
    label: GM_config.create("Open issues key 2"),
    type: "text",
    default: "I",
  },
  valuekey1: {
    label: GM_config.create("Value key 1"),
    type: "text",
    default: "v",
  },
  valuekey2: {
    label: GM_config.create("Value key 2"),
    type: "text",
    default: "V",
  },
  junkkey1: {
    label: GM_config.create("Junk cards key 1"),
    type: "text",
    default: "j",
  },
  junkkey2: {
    label: GM_config.create("Junk cards key 2"),
    type: "text",
    default: "J",
  },
  closeIfAllJunked: {
    label: GM_config.create("If the junk key is pressed and there's no cards to junk, close the tab instead"),
    type: "checkbox",
    default: false,
  },
  skipkey1: {
    label: GM_config.create("Skip cards key 1"),
    type: "text",
    default: "k",
  },
  skipkey2: {
    label: GM_config.create("Skip cards key 2"),
    type: "text",
    default: "K",
  },
  unskipkey1: {
    label: GM_config.create("Un-skip cards key 1"),
    type: "text",
    default: "h",
  },
  unskipkey2: {
    label: GM_config.create("Un-skip cards key 2"),
    type: "text",
    default: "H",
  },
  giftkey1: {
    label: GM_config.create("Gift key 1"),
    type: "text",
    default: "g",
  },
  giftkey2: {
    label: GM_config.create("Gift key 2"),
    type: "text",
    default: "G",

  },

  mainsenderkey1: {
    label: GM_config.create("Open up this page in main gifting puppet container key 1"),
    type: "text",
    default: "y",
  },
  mainsenderkey2: {
    label: GM_config.create("Open up this page in gifting puppet container key 1"),
    type: "text",
    default: "Y",
  },
  puppetmakerkey1: {
    label: GM_config.create("Puppet maker page key 1"),
    type: "text",
    default: "n",
  },
  puppetmakerkey2: {
    label: GM_config.create("Puppet maker page key 2"),
    type: "text",
    default: "N",
  },
  auctionkey1: {
    label: GM_config.create("Puppet maker page key 2"),
    type: "text",
    default: "a",
  },
  auctionkey2: {
    label: GM_config.create("Puppet maker page key 2"),
    type: "text",
    default: "A",
  },
  notices: {
    label: GM_config.create("Open your notices"),
    type: "text",
    default: "p",
  },
  notices2: {
    label: GM_config.create("Open your notices"),
    type: "text",
    default: "P",
  },
    TG1: {
        label: GM_config.create("Opens your Telagrams"),
        type: "text",
        default: "l",
    },
    TG2: {
        label: GM_config.create("Opens your Telagrams"),
        type: "text",
        default: "L",
    },
    Nsettings1: {
        label: GM_config.create("Opens your nations settings"),
        type: "text",
        default: "d",
    },
    home1: {
        label: GM_config.create("opens up your home naiton page"),
        type: "text",
        default: "[",
    },
        market: {
        label: GM_config.create("opens up the market"),
        type: "text",
        default: "]",
    },
   /*Other junk*/
    FirstTime:{
    section: "Other assorted Advanced junk",
    label: GM_config.create("First time pop up warning"),
    type: "checkbox",
    default: true
    },
    newTab:{
    label: GM_config.create("Always open in a new tab on issues"),
    type: "checkbox",
    default: true
    },
    help:{
    label: GM_config.create("HELP PAGE"),
    type: "text",
    default: "."},
});

(function () {
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
    if (GM_config.get("FirstTime"))
  {
      alert("Hello, This message will only pop up once, and if you really hate it you can delete it in the code.(line 352ish-357ish)\nFirst off thanks for using 9003's hotkeys! Remember to say thanks.  Also if you want to change keys for hotkeys press x and use the built in config menu\nFor a full list of commands use [.]");
      GM_config.set("FirstTime",false);
      GM_config.save();
  }
   //END DELETE HERE ***************************************************************************************************************************************************************************

  // sell, ask
  Mousetrap.bind([GM_config.get("sellkey1"), GM_config.get("sellkey2")], function (ev) {
    noinput_mousetrap(ev);
    document.querySelector('th[data-mode="sell"').click();
    const askbox = document.querySelector('input.auctionbid[name="auction_ask"]');
    askbox.focus();
    askbox.select();
  }, "keyup");

  //ignore this block unless your name is 9003 or you have 9003's puppet report maker
  if (window.location.href.endsWith("/auto")) {
    Mousetrap.bind(["x"], function (ev) {
      noinput_mousetrap(ev);
      document.querySelector('th[data-mode="sell"').click();
      const askbox = document.querySelector('input.auctionbid[name="auction_ask"]');
      askbox.focus();
      askbox.select();
    }, "keyup");
  }

  // buy, bid
  Mousetrap.bind([GM_config.get("buykey1"), GM_config.get("buykey2")], function (ev) {
    noinput_mousetrap(ev);
    document.querySelector('th[data-mode="buy"').click();
    const bidbox = document.querySelector('input.auctionbid[name="auction_bid"]');
    bidbox.focus();
    bidbox.select();
  }, "keyup");

  //ignore this block unless your name is 9003 or you have 9003's puppet report maker
  if (window.location.href.endsWith("/auto")) {
    Mousetrap.bind(["z"], function (ev) {
      noinput_mousetrap(ev);
      document.querySelector('th[data-mode="buy"').click();
      const bidbox = document.querySelector('input.auctionbid[name="auction_bid"]');
      bidbox.focus();
      bidbox.select();
    }, "keyup");
  }

  // Remove sell, ask
  Mousetrap.bind([GM_config.get("removesellkey1"), GM_config.get("removesellkey2")], function (ev) {
    noinput_mousetrap(ev);
    var stuff = document.querySelectorAll(".cardauctionunmatchedrow-ask .cardprice");
    for (var i = 0; i < stuff.length; i++) {
      stuff[i].click();
    }
    document.querySelector("button[name=remove_ask_price]").click();
  }, "keyup");

  // Remove bid
  Mousetrap.bind([GM_config.get("removebuykey1"), GM_config.get("removebuykey2")], function (ev) {
    noinput_mousetrap(ev);
    var stuff = document.querySelectorAll(".cardauctionunmatchedrow-bid .cardprice");
    for (var i = 0; i < stuff.length; i++) {
      stuff[i].click();
    }
    document.querySelector("button[name=remove_bid_price]").click();
  }, "keyup");

  // match sets the ask AND bid to match with the other one use with 'b' or 's' to auto buy or sell at the best price
  Mousetrap.bind([GM_config.get("matchkey1"), GM_config.get("matchkey2")], function (ev) {
    noinput_mousetrap(ev);
    if (ask_match && ask_match > 0) {
      document.querySelector('input.auctionbid[name="auction_ask"]').value = ask_match;
    }
    if (bid_match && bid_match > 0) {
      document.querySelector('input.auctionbid[name="auction_bid"]').value = bid_match;
    }
  }, "keyup");

  Mousetrap.bind(
    [GM_config.get("pulleventbidkey1"), GM_config.get("pulleventbidkey2")],
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

  Mousetrap.bind([GM_config.get("openpackkey1"), GM_config.get("openpackkey2")], function (ev) {
    window.open("https://www.nationstates.net/page=deck?open_loot_box=1","_self");

  }, "keyup");

  //Mousetrap.bind(['ctrl+o'], async function(ev){
  //alert("1");
  //  $.post("//www.nationstates.net/page=deck?9003sKeyCodes=1", "open_loot_box=1", callback);
  //alert('opend a pack');
  //});
  //open_loot_box=1

  Mousetrap.bind([GM_config.get("openconfigkey1"), GM_config.get("openconfigkey2")], function (ev) {
    GM_config.open();
  }, "keyup");
  //HELP Page
    Mousetrap.bind([GM_config.get("help")], function (ev) {
    window.open("https://docs.google.com/spreadsheets/d/1LM1fWUM4YaQ6WNkZUjsCbApp1i1zoKc5HTwVIj4C2c4/edit?usp=sharing");
  }, "keyup");
    //close
  Mousetrap.bind([GM_config.get("closekey1"), GM_config.get("closekey2")], function (ev) {
    if (!window.location.href.endsWith("/auto")) window.close();
  }, "keyup");
    //To deck page
  Mousetrap.bind([GM_config.get("todeckpagekey1"), GM_config.get("todeckpagekey2")], function (ev) {
    window.location.replace("https://www.nationstates.net/page=deck");
  }, "keyup");
    //refresh
  Mousetrap.bind([GM_config.get("reloadkey1"), GM_config.get("reloadkey2")], function (ev) {
    location.reload();
  }, "keyup");

    //Notices Template open x page
  Mousetrap.bind([GM_config.get("notices"), GM_config.get("notices2")], function (ev) {
    if (GM_config.get("newTab"))
      {window.open("https://www.nationstates.net/page=notices","_blank");}
     else{
     window.open("https://www.nationstates.net/page=notices","_self");}
  }, "keyup");

      Mousetrap.bind([GM_config.get("market")], function (ev) {
    if (GM_config.get("newTab"))
      {window.open("https://www.nationstates.net/page=deck/show_market=auctions","_blank");}
     else{
     window.open("https://www.nationstates.net/page=deck/show_market=auctions","_self");}
  }, "keyup");

      //Home page
      Mousetrap.bind([GM_config.get("home1")], function (ev) {
    if (GM_config.get("newTab"))
      {window.open("https://www.nationstates.net","_blank");}
     else{
     window.open("https://www.nationstates.net","_self");}
  }, "keyup");

    //Nsettings
     Mousetrap.bind([GM_config.get("Nsettings1")], function (ev) {
    if (GM_config.get("newTab"))
      {window.open("https://www.nationstates.net/page=settings","_blank");}
     else{
     window.open("https://www.nationstates.net/page=settings","_self");}
  }, "keyup");

     //TGs Template open x page
  Mousetrap.bind([GM_config.get("TG1"), GM_config.get("TG2")], function (ev) {
    if (GM_config.get("newTab"))
      {window.open("https://www.nationstates.net/page=telegrams","_blank");}
     else{
     window.open("https://www.nationstates.net/page=telegrams","_self");}
  }, "keyup");

  //Flip cards
  Mousetrap.bind([GM_config.get("flipcardskey1"), GM_config.get("flipcardskey2")], function (ev) {
    document.getElementsByClassName("back")[0].click();
    document.getElementsByClassName("back")[1].click();
    document.getElementsByClassName("back")[2].click();
    document.getElementsByClassName("back")[3].click();
    document.getElementsByClassName("back")[4].click();
  }, "keyup");
    //issues answering stuff off "i"

  Mousetrap.bind([GM_config.get("issueskey1"), GM_config.get("issueskey2")], function (ev) {
    if (GM_config.get("newTab"))
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

  Mousetrap.bind([GM_config.get("valuekey1"), GM_config.get("valuekey2")], function (ev) {
    window.open("https://www.nationstates.net/page=deck/value_deck=1", "_blank");
  }, "keyup");
  var skip = 0;
  Mousetrap.bind([GM_config.get("junkkey1"), GM_config.get("junkkey2")], function (ev) {
    if (document.body.dataset.nname != GM_config.get("MainNation")) {
      let elem = document.querySelectorAll(
        'a.deckcard-junk-button[data-rarity="common"],a.deckcard-junk-button[data-rarity="uncommon"], a.deckcard-junk-button[data-rarity="rare"], a.deckcard-junk-button[data-rarity="ultra-rare"],a.deckcard-junk-button[data-rarity="epic"]'
      )[skip];
      if (elem) {
        elem.click();
        elem.classList.remove("deckcard-junk-button");
        elem.classList.add("disabled");
      } else if (GM_config.get(["closeIfAllJunked"])) {
        window.close();
      }
    }
  }, "keyup");
  Mousetrap.bind([GM_config.get("skipkey1"), GM_config.get("skipkey2")], function (ev) {
    skip = skip + 1;
  }, "keyup");
  Mousetrap.bind([GM_config.get("unskipkey1"), GM_config.get("unskipkey2")], function (ev) {
    skip = skip - 1;
  }, "keyup");
    Mousetrap.bind([GM_config.get("mainsenderkey1"), GM_config.get("mainsenderkey2")], function (ev) {
    window.open(window.location.href+"/nation="+ GM_config.get("GiftPuppet")+"/container="+ GM_config.get("GiftPuppet"), "_blank");
  }, "keyup");

  // gift page
  Mousetrap.bind([GM_config.get("giftkey1"), GM_config.get("giftkey2")], function (ev) {
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
    document.getElementById("entity_name").value = GM_config.get("GiftPuppet");
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
    [GM_config.get("puppetmakerkey1"), GM_config.get("puppetmakerkey2")],
    function (el) {
      const currency = GM_config.get("currency");
      const animal = GM_config.get("animal");
      const motto = GM_config.get("motto");
      GM_config.set("count", GM_config.get("count") + 1);
      GM_config.save();

      document.write(
        `
<form method="POST" action="/cgi-bin/build_nation.cgi" id="x-ns-cp-onestep-form" name="form" onSubmit="submitForm(form.create_nation,'<i class=\'icon-flag-1\'></i>Creating...');">
<table>
<tr><td>
Name:
</td><td>
<input name="nation" id="x-ns-cp-nation-name" maxlength="40" type="text" value="` +
          GM_config.get("prefix") +
          GM_config.get("count") +
          `" style="font-size:150%" autofocus required placeholder="Nation Name...">
</td></tr>
<tr><td>
Password:
</td><td>
<input type="password" id="x-ns-cp-pass" name="password" value="` + GM_config.get("password") + `" required placeholder="Password...">
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
<input name="email" type="email" value="` + GM_config.get("email") + `" placeholder="E-mail...">
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
