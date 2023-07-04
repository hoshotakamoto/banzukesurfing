import User from './user.js';

export default class Game {
    constructor() {
        this.users = [];
    }

    loadAllUsers() {
        for (let i = 0; i < localStorage.length; i++) {
            const userId = localStorage.key(i);
            this.users.push(new User(userId));
        }
    }

    displayAllUsers() {
        this.users.forEach(user => {
            const userDetails = user.getUserDetails();
            document.querySelector('#user').textContent += `User ${user.userId}: ${userDetails}\n`;
        });
    }
    startPlaying() {
        const rikishi = document.querySelector('#rikishi').value;
        const picks = this.user.getPicks();
        const message = "You selected: " + rikishi + "\nPrevious Picks: " + JSON.stringify(picks);
        this.user.updatePicks(rikishi); // Update the picks with the new selection
        return message;
    }

    backfillResults() {
        const contestName = document.querySelector('#backfillContest').value;
        const rikishi = document.querySelector('#backfillRikishi').value;
        this.user.backfillResults(contestName, rikishi);
        this.user.displayBackfilledResults(); // Display the updated results
    }

    provideFeedback(message) {
        document.querySelector('#feedback').textContent = message;
    }

    initialize() {
        this.loadAllUsers();
        this.displayAllUsers();

        // Add event listeners
        document.querySelector("#startPlayingButton").addEventListener('click', () => this.startPlaying());
        document.querySelector("#backfillResultsButton").addEventListener('click', () => this.backfillResults());
    }
}
