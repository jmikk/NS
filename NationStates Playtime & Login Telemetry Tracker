// ==UserScript==
// @name         NationStates Playtime & Login Telemetry Tracker
// @namespace    http://tampermonkey.net/
// @version      6.1
// @description  Restores classic styling, injects DBID into registry, and counts total native site logins via form tracking.
// @author       9005 + Genmini AI
// @match        https://www.nationstates.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ==========================================
    // 1. DATA STORAGE & INITIALIZATION ENGINE
    // ==========================================
    function getStored(key, defaultValue) { return localStorage.getItem(key) || defaultValue; }
    function setStored(key, value) { localStorage.setItem(key, value); }

    function getDailyLog() {
        try { return JSON.parse(getStored('ns_playtime_daily_log', '{}')); }
        catch(e) { return {}; }
    }
    function saveDailyLog(log) { setStored('ns_playtime_daily_log', JSON.stringify(log)); }

    function getTodayKey() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }

    let mainNation = getStored('ns_main_nation', '');
    let foundedTimestamp = parseInt(getStored('ns_founded_time', '0'), 10);
    let dbid = getStored('ns_dbid', '');

    if (!mainNation && window.location.pathname !== '/page=blank/stats') {
        mainNation = prompt("Please enter your main nation name to initialize statistical playtime estimation:");
        if (mainNation) {
            mainNation = mainNation.trim().toLowerCase().replace(/\s+/g, '_');
            setStored('ns_main_nation', mainNation);
            fetchNationData(mainNation);
        }
    } else if ((!foundedTimestamp || !dbid) && mainNation) {
        fetchNationData(mainNation);
    }

    function fetchNationData(nation) {
        fetch(`https://www.nationstates.net/cgi-bin/api.cgi?nation=${nation}&q=foundedtime+dbid`, {
            headers: { 'User-Agent': 'Tampermonkey Advanced Stats Dashboard Script (In Use By ' + nation + ')' }
        })
        .then(response => response.text())
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "text/xml");
            const foundedNode = xmlDoc.getElementsByTagName("FOUNDEDTIME")[0];
            const dbidNode = xmlDoc.getElementsByTagName("DBID")[0];

            let updated = false;
            if (foundedNode && foundedNode.textContent) {
                setStored('ns_founded_time', parseInt(foundedNode.textContent, 10));
                if (!getStored('ns_first_run_time', '')) setStored('ns_first_run_time', Date.now());
                updated = true;
            }
            if (dbidNode && dbidNode.textContent) {
                setStored('ns_dbid', dbidNode.textContent);
                updated = true;
            }
            if (updated && window.location.pathname.includes('/page=blank/stats')) {
                window.location.reload();
            }
        })
        .catch(err => console.error("Error fetching NationStates API data:", err));
    }

    // ==========================================
    // 2. NAV TAB INJECTION
    // ==========================================
    const banner = document.getElementById('banner');
    if (banner) {
        const statsButton = document.createElement('div');
        statsButton.className = 'bel';
        statsButton.innerHTML = `
            <div class="belcontent">
                <a href="/page=blank/stats" class="bellink">
                    <i class="icon-chart-bar"></i>STATS
                </a>
            </div>
        `;

        const spacingTarget = banner.querySelector('.belspacermain, #loginswitcher, #logoutbox');
        if (spacingTarget) {
            banner.insertBefore(statsButton, spacingTarget);
        } else {
            banner.appendChild(statsButton);
        }
    }

    // ==========================================
    // 3. STATISTICAL CALCULATIONS ENGINE
    // ==========================================
    function calculateAdvancedPlaytime() {
        const dailyLog = getDailyLog();
        const dailyValues = Object.values(dailyLog);
        const n = dailyValues.length;

        const totalTrackedSeconds = dailyValues.reduce((a, b) => a + b, 0);

        if (!foundedTimestamp) {
            return { total: totalTrackedSeconds, isEstimate: false, confidence: 'Gathering Data...', color: '#666', rawTracked: totalTrackedSeconds, daysRunning: n };
        }

        const nowMs = Date.now();
        const foundedMs = foundedTimestamp * 1000;
        const firstRunMs = parseInt(getStored('ns_first_run_time', nowMs.toString()), 10);
        const historicalDays = Math.max(0, (firstRunMs - foundedMs) / (1000 * 60 * 60 * 24));
        const trackedDays = Math.max(0.001, (nowMs - firstRunMs) / (1000 * 60 * 60 * 24));

        const mean = n > 0 ? (totalTrackedSeconds / n) : 0;
        const historicalEstimatedSeconds = historicalDays * mean;
        const totalCombinedSeconds = Math.floor(totalTrackedSeconds + historicalEstimatedSeconds);

        let confidenceText = 'Gathering Data...';
        let confidenceColor = '#666';

        if (n >= 2) {
            const variance = dailyValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
            const stdDev = Math.sqrt(variance);
            const stdError = stdDev / Math.sqrt(n);
            const tScore = n < 5 ? 2.353 : n < 10 ? 1.860 : 1.725;
            const marginOfErrorSeconds = stdError * tScore;
            const relativeError = mean > 0 ? (marginOfErrorSeconds / mean) : 0;

            if (n < 4) {
                confidenceText = 'Low (Need 4+ days)';
                confidenceColor = '#b85c00';
            } else if (relativeError < 0.15) {
                confidenceText = 'High (Consistent habits)';
                confidenceColor = '#2e7d32';
            } else if (relativeError < 0.40) {
                confidenceText = 'Moderate (Fluctuating)';
                confidenceColor = '#f57c00';
            } else {
                confidenceText = 'Low (High data variance)';
                confidenceColor = '#c62828';
            }
        }

        return {
            total: totalCombinedSeconds,
            isEstimate: historicalDays > 0,
            dailyAvgMins: Math.round(mean / 60),
            confidence: confidenceText,
            color: confidenceColor,
            rawTracked: totalTrackedSeconds,
            daysRunning: Math.ceil(trackedDays),
            historicalDays: Math.floor(historicalDays)
        };
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        let timeString = '';
        if (hrs > 0) timeString += `${hrs}h `;
        if (mins > 0 || hrs > 0) timeString += `${mins}m `;
        timeString += `${secs}s`;
        return timeString || '0s';
    }

    // ==========================================
    // 4. LIVE DASHBOARD DOM SYNC ENGINE
    // ==========================================
    function updateLiveDashboard() {
        if (!window.location.pathname.includes('/page=blank/stats')) return;

        const stats = calculateAdvancedPlaytime();
        const totalClicks = parseInt(getStored('ns_total_clicks', '0'), 10);
        const totalLogins = parseInt(getStored('ns_login_count', '0'), 10);
        const clickFrequency = stats.rawTracked > 0 ? (totalClicks / (stats.rawTracked / 60)).toFixed(1) : '0';

        const elTotalTime = document.getElementById('live-total-playtime');
        const elActionCount = document.getElementById('live-action-count');
        const elActionFreq = document.getElementById('live-action-frequency');
        const elDailyAvg = document.getElementById('live-daily-average');
        const elConfidence = document.getElementById('live-confidence');
        const elRawTracked = document.getElementById('live-raw-tracked');
        const elLoginCount = document.getElementById('live-login-count');

        if (elTotalTime) elTotalTime.textContent = formatTime(stats.total);
        if (elActionCount) elActionCount.textContent = `${totalClicks.toLocaleString()} Clicks`;
        if (elActionFreq) elActionFreq.textContent = clickFrequency;
        if (elDailyAvg) elDailyAvg.textContent = `${stats.dailyAvgMins} mins / day`;
        if (elRawTracked) elRawTracked.textContent = `${formatTime(stats.rawTracked)} across ${stats.daysRunning} days`;
        if (elLoginCount) elLoginCount.textContent = `${totalLogins.toLocaleString()} Logins`;

        if (elConfidence) {
            elConfidence.textContent = stats.confidence;
            elConfidence.style.color = stats.color;
        }
    }

    // Render Dashboard Structure
    if (window.location.pathname === '/page=blank/stats' || window.location.search.includes('page=blank/stats')) {
        document.title = "NationStates | Playtime Analytics";
        const mainContent = document.getElementById('content') || document.body;

        let foundationDateStr = "Loading database parameters...";
        if (foundedTimestamp) {
            foundationDateStr = new Date(foundedTimestamp * 1000).toLocaleDateString(undefined, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }

        const statsInit = calculateAdvancedPlaytime();

        mainContent.innerHTML = `
            <div style="max-width: 800px; margin: 20px auto; padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 4px; font-family: sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <h1 style="border-bottom: 1px solid #aaa; padding-bottom: 5px; margin-top: 0; color: #333;">NationStates Playtime Dashboard</h1>

                <div style="display: flex; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 220px; background: #f9f9f9; padding: 15px; border: 1px solid #e1e1e1; border-radius: 4px;">
                        <span style="font-size: 0.9em; color: #666; font-weight: bold;">TOTAL ESTIMATED PLAYTIME:</span>
                        <div id="live-total-playtime" style="font-size: 1.8em; font-weight: bold; margin-top: 5px; color: #24578a;">...</div>
                    </div>

                    <div style="flex: 1; min-width: 220px; background: #f9f9f9; padding: 15px; border: 1px solid #e1e1e1; border-radius: 4px;">
                        <span style="font-size: 0.9em; color: #666; font-weight: bold;">TOTAL INTERACTIONS:</span>
                        <div id="live-action-count" style="font-size: 1.8em; font-weight: bold; margin-top: 5px; color: #2e7d32;">...</div>
                        <span style="font-size: 0.8em; color: #777;">Frequency: <strong id="live-action-frequency">0</strong> clicks/min</span>
                    </div>

                    <div style="flex: 1; min-width: 220px; background: #f9f9f9; padding: 15px; border: 1px solid #e1e1e1; border-radius: 4px;">
                        <span style="font-size: 0.9em; color: #666; font-weight: bold;">DAILY ESTIMATED AVERAGE:</span>
                        <div id="live-daily-average" style="font-size: 1.8em; font-weight: bold; margin-top: 5px; color: #f57c00;">...</div>
                        <span style="font-size: 0.8em; color: #777;">Confidence: <strong id="live-confidence">...</strong></span>
                    </div>
                </div>

                <h3 style="margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 3px; color:#444;">Registry & Telemetry Metadata</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.95em;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Main Target Identity:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-transform: capitalize;">${mainNation.replace(/_/g, ' ')}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">System Database Key (DBID):</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-family: monospace; font-weight: bold; color: #24578a;">${dbid || 'Retrieving parameter...'}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Nation Creation Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${foundationDateStr}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Pre-Tracker Structural Age:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${statsInit.historicalDays} days</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Active Script Telemetry Data:</td><td id="live-raw-tracked" style="padding: 8px; border-bottom: 1px solid #eee;">...</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Tracked System Logins:</td><td id="live-login-count" style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #b85c00;">0 Authentications</td></tr>
                </table>

                <div style="margin-top: 30px; text-align: center;">
                    <button id="reset-ns-stats" style="background: #a00; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-weight: bold;">Purge Telemetry Storage Core</button>
                </div>
            </div>
        `;

        document.getElementById('reset-ns-stats').addEventListener('click', () => {
            if (confirm("Are you sure you want to completely clear all locally logged playtime metrics, click counters, login trackers, and settings?")) {
                localStorage.clear();
                alert("Core cleared. Reloading page.");
                window.location.reload();
            }
        });

        updateLiveDashboard();
    }

    // ==========================================
    // 5. OPERATIONAL REAL-TIME BACKGROUND LOOPS
    // ==========================================
    setInterval(updateLiveDashboard, 1000);

    // Focused Tab Chronometer Trigger
    setInterval(() => {
        if (!document.hidden) {
            const todayKey = getTodayKey();
            const dailyLog = getDailyLog();

            dailyLog[todayKey] = (dailyLog[todayKey] || 0) + 1;
            saveDailyLog(dailyLog);

            const currentTotal = parseInt(getStored('ns_total_playtime', '0'), 10);
            setStored('ns_total_playtime', currentTotal + 1);
        }
    }, 1000);

    // Global Clicks Event Core Hook
    window.addEventListener('click', () => {
        const globalClicks = parseInt(getStored('ns_total_clicks', '0'), 10);
        setStored('ns_total_clicks', globalClicks + 1);
        updateLiveDashboard();
    });

    // --- LOGIN FORM INTERCEPTION CORE ---
    window.addEventListener('submit', (e) => {
        // Intercepting native login payloads by scanning submitted inputs/buttons named 'submit' with the value 'login'
        const targetForm = e.target;
        if (targetForm) {
            const submitElement = targetForm.querySelector('[name="submit"]');
            if (submitElement && submitElement.value === 'Login') {
                const currentLogins = parseInt(getStored('ns_login_count', '0'), 10);
                setStored('ns_login_count', currentLogins + 1);
            }
        }
    });

    // Storage Vector Synchronizer
    window.addEventListener('storage', (e) => {
        if (['ns_playtime_daily_log', 'ns_founded_time', 'ns_total_clicks', 'ns_dbid', 'ns_login_count'].includes(e.key)) {
            updateLiveDashboard();
        }
    });

})();
