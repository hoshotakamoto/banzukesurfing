export default class Game {
    constructor(initializeImmediately = false) {
        this.user = this.getUser();
        if (initializeImmediately) {
            this.initialize();
        }
    }

    startPlaying() {
        const rikishi = document.querySelector('#rikishi').value;
        const picks = this.getPicks();
        const message = "You selected: " + rikishi + "\nPrevious Picks: " + JSON.stringify(picks);
        this.updatePicks(rikishi); // Update the picks with the new selection
        return message;
    }

    getUser() {
        // get user from local storage
        let user = localStorage.getItem('user');
        if (!user) {
            user = 'admin';
            localStorage.setItem('user', user);
        }
        return user;
    }

    getPicks() {
        const picks = JSON.parse(localStorage.getItem(this.user));
        if (!picks) {
            return {};
        }
        return picks;
    }

    updatePicks(rikishi) {
        const picks = this.getPicks();
        const currentContest = new Date().getMonth();
        if ([0, 2, 4, 6, 8, 10].includes(currentContest)) {
            const contestName = new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();
            picks[contestName] = rikishi;
            localStorage.setItem(this.user, JSON.stringify(picks));
        }
    }

    switchUser() {
        const newUser = document.querySelector('#userSwitch').value;
        localStorage.setItem('user', newUser);
        document.querySelector('#user').textContent = 'Current user: ' + newUser;
        this.user = newUser;
    }

    backfillResults() {
        const contestName = document.querySelector('#backfillContest').value;
        const rikishi = document.querySelector('#backfillRikishi').value;
        const picks = this.getPicks();
        picks[contestName] = rikishi;
        localStorage.setItem(this.user, JSON.stringify(picks));
        this.provideFeedback('Backfilled results for ' + contestName + ' with ' + rikishi); // Provide feedback
        this.displayBackfilledResults(); // Display the updated results
    }

    displayBackfilledResults() {
        const picks = this.getPicks();
        const resultsElement = document.querySelector('#backfilledResults');

        // Clear previous results
        resultsElement.textContent = '';

        // Display each contest result
        for (const contest in picks) {
            const rikishi = picks[contest];
            const resultText = document.createTextNode(contest + ': ' + rikishi);
            const resultDiv = document.createElement('div');
            resultDiv.appendChild(resultText);
            resultsElement.appendChild(resultDiv);
        }
    }

    provideFeedback(message) {
        document.querySelector('#feedback').textContent = message;
    }

    initialize() {
        const userElement = document.querySelector('#user');
        if (userElement) {
            userElement.textContent = 'Current user: ' + this.user;
        }
        this.displayBackfilledResults(); // Display the initial results

        // Add event listeners
        document.querySelector("#startPlayingButton").addEventListener('click', () => this.startPlaying());
        document.querySelector("#switchUserButton").addEventListener('click', () => this.switchUser());
        document.querySelector("#backfillResultsButton").addEventListener('click', () => this.backfillResults());
    }
}

if (typeof window !== 'undefined') {
    window.game = new Game();
}
