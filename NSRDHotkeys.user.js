// ==UserScript==
// @name         NSRDHotkeys
// @version      1.5
// @description  Breeze but safer I guess and opened up
// @author       9003
// @noframes
// @updateURL    https://github.com/jmikk/NS/raw/master/The%20Bodge%20Job.js
// @match        https://www.nationstates.net*
// @match        https://www.nationstates.net/*
// @match        https://web.archive.org/web*
// @require      http://code.jquery.com/jquery-latest
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @grant        window.close
//
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_log
// @require       https://openuserjs.org/src/libs/sizzle/GM_config.min.js
// ==/UserScript==

/*
 * Keybinds:
 * [e]ndo the nation you are on
 * [m]ove to the region you have up
 * [w]ill close the tab you have open
 * [r]efresh the tab
 * [u]pdate checker to see if you updated
 * [n] pulls up the main nation page
 * [p] applys for the WA
 * [s]aves the current page in the waybackmacine index
 * [l] press 4 times to prep the puppet and move to the jump point (WA page, apply to join, JP page, move to JP)
 * [<] back
 * [K] Moves puppet to JP
 */

var count=0;

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
    'JP': {
    'label': GM_config.create('Set as your Puppet Dump'),
    'type': 'text',
    'default': 'Birb'
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
    }
});



var main = GM_config.get('MainNation'); //Needs to be all lowercase and have _ for spaces
var JP = GM_config.get('JP');
//JP = JP.replace(" ","_").toLowerCase;
//SET THIS TO TRUE IF YOU WANT THE WAYBACKPAGE TO CLOSE AUTOMATICLY WHEN IT IS DONE SAVING WITH [S]
//END OF USER VA
//window.location.href.indexOf("franky") > -1

if (document.body.dataset.nname == main) {
        document
            .querySelectorAll('button[name="move_region"]')
            .forEach(function (el, idx) {
            el.disabled = true;
            
        });
    }


(  function() {
    'use strict';
     function callback(){

    }
    function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
//
Mousetrap.bind(['x'],  function(ev){GM_config.open();});
Mousetrap.bind([','],  function(ev){window.history.back()});
Mousetrap.bind(['e'],  function(ev){document.getElementsByClassName("endorse button icon wa")[0].click();});
Mousetrap.bind(['m'],  function(ev){document.getElementsByClassName("button danger icon")[0].click();});
Mousetrap.bind(['w'],  function(ev){window.close();});
Mousetrap.bind(['r'],  function(ev){location.reload();});
Mousetrap.bind(['u'],  function(ev){window.location.replace("https://www.nationstates.net/page=ajax2/a=reports/view=self/filter=change");});
Mousetrap.bind(['n'],  function(ev){window.location.replace("https://www.nationstates.net");});

Mousetrap.bind(['p'],  async function(ev){
                 if(document.body.dataset.nname != main){
        alert('Moveing to +'+JP);
                     $.get("//www.nationstates.net/region=" + JP + "?nspp=1", await function(data) {
				var chk = $(data).find('input[name="chk"]').val();
            alert('Moved to '+ JP);
                $.post("//www.nationstates.net/page=change_region?nspp=1", "localid=" + $(data).find("input[name='localid']").val() + "&region_name=" + JP + "&move_region=1", callback);

        })

        }});

Mousetrap.bind(['s'],  function(ev){window.open("https://web.archive.org/save/"+window.location.href, '_blank');});
    if(close_wayback && window.location.href.startsWith("https://web.archive.org/web/"))
    {
    window.close();
    }

Mousetrap.bind(['l'], async function(ev){

        $.get("//www.nationstates.net/page=un?nspp=1", await function(data) {
				var chk = $(data).find('input[name="chk"]').val();
             alert('Applying for the WA...');
                $.post("//www.nationstates.net/page=UN_status?nspp=1", "action=join_UN&chk=" + chk + "&submit=+Apply+to+Join+", callback);
             alert('applied your good to go');
        })

        

         if(document.body.dataset.nname != main){
        alert('Moveing to +'+JP);
                     $.get("//www.nationstates.net/region=" + JP + "?nspp=1", await function(data) {
				var chk = $(data).find('input[name="chk"]').val();
            alert('Moved to '+ JP);
                $.post("//www.nationstates.net/page=change_region?nspp=1", "localid=" + $(data).find("input[name='localid']").val() + "&region_name=" + JP + "&move_region=1", callback);

        })

        }});


Mousetrap.bind(['z'], function (el){
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

Mousetrap.bind(['c'], function (el){
var table; //<td><p><a target="_blank" href="https://www.nationstates.net/nation=`+temp[0]+`?nation=`+temp[0]+`&password=`+temp[1]+`&logging_in=1">Link to Puppet named `+temp[0]+`</a></p></td>
var i;
   // alert("test"+GM_config.get('count')+"test2");

    for(i=0;i<GM_config.get('count');i++)
    {
    table=table+`<tr>`;
    table=table+`<td><p><a target="_blank" href="https://www.nationstates.net/nation=`+GM_config.get('prefix')+i+`?nation=`+GM_config.get('prefix')+i+`+&password=`+GM_config.get('password')+`&logging_in=1">Link to `+GM_config.get('prefix')+i+`</a></p></td>`;
    table=table+`</tr>`;
    }
   

document.write(`
<html>
<head>
<style>
td.createcol p {
	padding-left: 10em;
}

a {
	text-decoration: none;
	color: black;
}

a:visited {
	color: grey;
}

table {
	border-collapse: collapse;
	display: table-cell;
	max-width: 100%;
	border: 1px solid darkorange;
}

tr, td {
	border-bottom: 1px solid darkorange;
}

td p {
	padding: 0.5em;
}

tr:hover {
	background-color: lightgrey;
}

</style>
</head>
<body>
<table>
<tr>
`

+table+

`
</tr>
<td><p><a target="_blank" href="https://www.nationstates.net/www.nationstates.net/page=blank">Done!</a></p></td>
</table>
<script>
document.querySelectorAll("td").forEach(function(el) {
	el.addEventListener("click", function() {
		let myidx = 0;
		const row = el.parentNode;
		let child = el;
		while((child = child.previousElementSibling) != null) {
			myidx++;
		}
		row.nextElementSibling.childNodes[myidx].querySelector("p > a").focus();
		row.parentNode.removeChild(row);
	});
});
</script>
</body>
`)


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





