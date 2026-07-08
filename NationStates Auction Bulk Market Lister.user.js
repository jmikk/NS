// ==UserScript==
// @name         NationStates Auction Bulk Market Lister
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds checkboxes to the auction asks table and generates discord $list commands (links only) in batches of 10.
// @author       Gemini+9003
// @match        https://www.nationstates.net/page=deck/show_trades=asks*
// @match        https://www.nationstates.net/nation=*/page=deck/show_trades=asks*

// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // Locate the target layout table
    const table = document.querySelector('table.auctionslisttable');
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tbody > tr'));
    if (rows.length === 0) return;

    // --- Inject UI Controls Panel ---
    const controlPanel = document.createElement('div');
    controlPanel.style = `
        margin: 15px 0;
        padding: 15px;
        background: #23272a;
        color: #fff;
        border-radius: 8px;
        font-family: sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;

    controlPanel.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #7289da;">📊 Market Listing Generator</h3>
        <div style="margin-bottom: 10px;">
            <button id="ns-select-all" type="button" style="padding: 6px 12px; background: #7289da; border: none; color: white; border-radius: 4px; cursor: pointer; margin-right: 5px;">☑️ Check All</button>
            <button id="ns-clear-all" type="button" style="padding: 6px 12px; background: #4f545c; border: none; color: white; border-radius: 4px; cursor: pointer; margin-right: 5px;">✖️ Clear All</button>
            <button id="ns-generate" type="button" style="padding: 6px 12px; background: #43b581; border: none; color: white; border-radius: 4px; cursor: pointer; font-weight: bold;">📋 Generate Blocks</button>
        </div>
        <div id="ns-output-container" style="display: none;">
            <p style="margin: 5px 0; font-size: 13px; color: #b9bbbe;">Click a text box below to auto-copy it directly to your clipboard:</p>
            <div id="ns-command-outputs"></div>
        </div>
    `;
    table.parentNode.insertBefore(controlPanel, table);

    // --- Modify Table Layout and Add Checkboxes ---
    rows.forEach((row, idx) => {
        const firstCell = row.cells[0];
        if (!firstCell) return;

        if (idx === 0) {
            // Header row replacement marker
            firstCell.innerHTML = '<p style="font-weight: bold; text-align: center;">Select</p>';
        } else {
            // Data row insertion marker
            const cardLinkEl = row.cells[1]?.querySelector('a.cardnameblock');

            if (cardLinkEl) {
                // Construct complete link url targeting original dynamic schema
                const rawHref = cardLinkEl.getAttribute('href');
                const fullLink = window.location.origin + rawHref;

                // Add active inputs (Price tracking removed)
                firstCell.style.textAlign = "center";
                firstCell.innerHTML = `<input type="checkbox" class="ns-market-select" data-link="${fullLink}" style="transform: scale(1.2); cursor: pointer;">`;
            }
        }
    });

    // --- Event Listeners and Commands Aggregation ---
    document.getElementById('ns-select-all').addEventListener('click', () => {
        document.querySelectorAll('.ns-market-select').forEach(cb => cb.checked = true);
    });

    document.getElementById('ns-clear-all').addEventListener('click', () => {
        document.querySelectorAll('.ns-market-select').forEach(cb => cb.checked = false);
        document.getElementById('ns-output-container').style.display = 'none';
    });

    document.getElementById('ns-generate').addEventListener('click', () => {
        const selected = Array.from(document.querySelectorAll('.ns-market-select:checked'));
        const outputContainer = document.getElementById('ns-output-container');
        const outputWrapper = document.getElementById('ns-command-outputs');

        outputWrapper.innerHTML = '';

        if (selected.length === 0) {
            alert('Please check at least one row card checkmark box first!');
            outputContainer.style.display = 'none';
            return;
        }

        // Segment selected arrays into blocks of 10 maximum entries per Discord invocation command rules
        const chunkSize = 10;
        let batchIndex = 1;

        for (let i = 0; i < selected.length; i += chunkSize) {
            const chunk = selected.slice(i, i + chunkSize);

            // Format layout syntax line: $list [link1] [link2]...
            const commandArguments = chunk.map(cb => cb.getAttribute('data-link')).join(' ');
            const completeDiscordCommand = `$list ${commandArguments}`;

            // Create individual visible interactive copy fields
            const blockDiv = document.createElement('div');
            blockDiv.style = "margin-bottom: 10px;";

            const label = document.createElement('div');
            label.style = "font-size: 12px; font-weight: bold; color: #b9bbbe; margin-bottom: 2px;";
            label.innerText = `Batch #${batchIndex} (${chunk.length} cards)`;

            const textarea = document.createElement('textarea');
            textarea.readOnly = true;
            textarea.value = completeDiscordCommand;
            textarea.style = `
                width: 100%;
                height: 40px;
                background: #2f3136;
                color: #8e9297;
                border: 1px solid #202225;
                border-radius: 4px;
                padding: 5px;
                resize: none;
                cursor: pointer;
                font-family: monospace;
                font-size: 11px;
            `;

            // Auto-copy on text focus selection layout
            textarea.addEventListener('click', function() {
                this.select();
                GM_setClipboard(this.value);

                const originalBg = this.style.background;
                this.style.background = '#43b581';
                this.style.color = '#ffffff';

                setTimeout(() => {
                    this.style.background = originalBg;
                    this.style.color = '#8e9297';
                }, 400);
            });

            blockDiv.appendChild(label);
            blockDiv.appendChild(textarea);
            outputWrapper.appendChild(blockDiv);
            batchIndex++;
        }

        outputContainer.style.display = 'block';
    });
})();
