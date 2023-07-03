function startPlaying() {
    var rikishi = document.querySelector('#rikishi').value;
    var user = getUser();
    var picks = getPicks(user);
    var message = "You selected: " + rikishi + "\nPrevious Picks: " + JSON.stringify(picks);
    updatePicks(user, rikishi); // Update the picks with the new selection
    return message;
}

function getUser() {
    // get user from local storage
    var user = localStorage.getItem('user');
    if (!user) {
        user = 'admin';
        localStorage.setItem('user', user);
    }
    return user;
}

function getPicks(user) {
    var picks = JSON.parse(localStorage.getItem(user));
    if (!picks) {
        picks = {};
    }
    return picks;
}

function updatePicks(user, rikishi) {
    var picks = getPicks(user);
    var currentContest = new Date().getMonth();
    if ([0, 2, 4, 6, 8, 10].includes(currentContest)) {
        var contestName = new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();
        picks[contestName] = rikishi;
        localStorage.setItem(user, JSON.stringify(picks));
    }
}

function switchUser() {
    var newUser = document.querySelector('#userSwitch').value;
    localStorage.setItem('user', newUser);
    document.querySelector('#user').textContent = 'Current user: ' + newUser;;
}

function backfillResults() {
    var user = getUser();
    var contestName = document.querySelector('#backfillContest').value;
    var rikishi = document.querySelector('#backfillRikishi').value;
    var picks = getPicks(user);
    picks[contestName] = rikishi;
    localStorage.setItem(user, JSON.stringify(picks));
}

function initialize() {
    var user = getUser();
    var userElement = document.querySelector('#user');
    if (userElement) {
        userElement.textContent = 'Current user: ' + user;
    }
}

initialize();

module.exports = { startPlaying, switchUser, backfillResults, initialize };
