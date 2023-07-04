export default class User {
    constructor(name, data = {}) {
        this.name = name || this.getStoredUser();
        this.data = data;
    }

    getStoredUser() {
        let user = localStorage.getItem('user');
        if (!user) {
            user = 'admin';
            localStorage.setItem('user', user);
        }
        return user;
    }

    getPicks() {
        return this.data;
    }

    updatePicks(rikishi) {
        const currentContest = new Date().getMonth();
        if ([0, 2, 4, 6, 8, 10].includes(currentContest)) {
            const contestName = new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();
            this.data[contestName] = rikishi;
        }
    }

    backfillResults(contestName, rikishi) {
        this.data[contestName] = rikishi;
    }

    displayBackfilledResults() {
        let results = '';
        for (const contest in picks) {
            const rikishi = this.data[contest];
            results += `${contest}: ${rikishi}\n`;
        }
        return results;
    }

    getUserDetails() {
        return {
            name: this.name,
            picks: this.getPicks()
        };
    }
}
