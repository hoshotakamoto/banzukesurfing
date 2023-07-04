import User from './user.js';

export default class Game {
    constructor() {
        this.users = {};
    }

    loadAllUsers() {
        const usersData = JSON.parse(localStorage.getItem('users')) || {};
        for (let userId in usersData) {
            this.users[userId] = new User(userId, usersData[userId]);
        }
    }

    displayAllUsers() {
        for (let userId in this.users) {
            const userDetails = this.users[userId].getUserDetails();
            document.querySelector('#user').textContent += `User ${userId}: ${userDetails}\n`;
        }
    }

    startPlaying(userId) {
        const rikishi = document.querySelector('#rikishi').value;
        const picks = this.users[userId].getPicks();
        const message = "You selected: " + rikishi + "\nPrevious Picks: " + JSON.stringify(picks);
        this.users[userId].updatePicks(rikishi);
        this.saveUser(userId);
        return message;
    }

    backfillResults(userId) {
        const contestName = document.querySelector('#backfillContest').value;
        const rikishi = document.querySelector('#backfillRikishi').value;
        this.users[userId].backfillResults(contestName, rikishi);
        this.users[userId].displayBackfilledResults();
        this.saveUser(userId);
    }

    provideFeedback(message) {
        document.querySelector('#feedback').textContent = message;
    }

    saveUser(userId) {
        let usersData = JSON.parse(localStorage.getItem('users')) || {};
        usersData[userId] = this.users[userId].getUserDetails();
        localStorage.setItem('users', JSON.stringify(usersData));
    }

    initialize() {
        this.loadAllUsers();
        this.displayAllUsers();

        // The user needs to be passed when calling startPlaying and backfillResults
        // TODO: Add mechanism for choosing userId
        document.querySelector("#startPlayingButton").addEventListener('click', () => this.startPlaying(/* userId goes here */));
        document.querySelector("#backfillResultsButton").addEventListener('click', () => this.backfillResults(/* userId goes here */));
    }
}
