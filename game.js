import User from './user.js';

export default class Game {
    constructor() {
        this.users = [];
        this.usersData = JSON.parse(localStorage.getItem('users')) || {};
        this.selectedUser = null;
    }

    loadAllUsers() {
        this.users = Object.keys(this.usersData.map(userId => new User(userId, this.usersData[userId])));
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
        this.selectedUser.updatePicks(rikishi); // Update the picks with the new selection
        this.saveUser();
        return message;
    }

    backfillResults() {
        const contestName = document.querySelector('#backfillContest').value;
        const rikishi = document.querySelector('#backfillRikishi').value;
        this.user.backfillResults(contestName, rikishi);
        this.user.displayBackfilledResults(); // Display the updated results
        this.saveUser();
    }

    provideFeedback(message) {
        document.querySelector('#feedback').textContent = message;
    }

    saveUser() {
        this.usersData[this.selectedUser.getID()] = this.selectedUser.getUserDetails();
        localStorage.setItem('users', JSON.stringify(this.usersData));
    }

    initialize() {
        this.loadAllUsers();
        this.displayAllUsers();

        // Add event listeners
        document.querySelector("#startPlayingButton").addEventListener('click', () => this.startPlaying());
        document.querySelector("#backfillResultsButton").addEventListener('click', () => this.backfillResults());
    }
}
