import User from './user.js';

export default class Game {
    constructor() {
        this.users = {};
        this.userId = null;
    }

    loadAllUsers() {
        const usersData = JSON.parse(localStorage.getItem('users')) || {};
        for (let userId in usersData) {
            this.users[userId] = new User(userId, usersData[userId]);
        }
    }

    setActiveUser(userId) {
        if (this.users[userId]) {
            this.userId = userId;
            return true;
        }
        return false;
    }

    displayAllUsers() {
        for (let userId in this.users) {
            const userDetails = this.users[userId].getUserDetails();
            document.querySelector('#user').textContent += `User ${userId}: ${userDetails}\n`;
        }
    }

    startPlaying() {
        const rikishi = document.querySelector('#rikishi').value;
        const picks = this.users[this.userId].getPicks();
        const message = "You selected: " + rikishi + "\nPrevious Picks: " + JSON.stringify(picks);
        this.users[this.userId].updatePicks(rikishi);
        this.saveUser();
        return message;
    }

    backfillResults() {
        const contestName = document.querySelector('#backfillContest').value;
        const rikishi = document.querySelector('#backfillRikishi').value;
        this.users[this.userId].backfillResults(contestName, rikishi);
        this.users[this.userId].displayBackfilledResults();
        this.saveUser();
    }

    provideFeedback(message) {
        document.querySelector('#feedback').textContent = message;
    }

    saveUser() {
        let usersData = JSON.parse(localStorage.getItem('users')) || {};
        usersData[this.userId] = this.users[this.userId].getUserDetails();
        localStorage.setItem('users', JSON.stringify(usersData));
    }

    initialize() {
        this.loadAllUsers();
        const activeUserId = localStorage.getItem('user');
        if (activeUserId && this.setActiveUser(activeUserId)) {
            this.displayAllUsers();

            document.querySelector("#startPlayingButton").addEventListener('click', () => this.startPlaying());
            document.querySelector("#backfillResultsButton").addEventListener('click', () => this.backfillResults());
        } else {
            console.error("Unable to initialize game: invalid active user ID");
        }
    }
}
