import 'jest-localstorage-mock';
import Game from './game.js';

let game;

beforeEach(() => {
    localStorage.clear();
    // set localStorage values
    localStorage.setItem('user', 'testUser');
    localStorage.setItem('testUser', JSON.stringify({ 'July 2023': '1' }));

    document.body.innerHTML = `
        <p id="user"></p>
        <select id="rikishi">
            <option value="1">Rikishi 1</option>
            <option value="2">Rikishi 2</option>
        </select>
        <button id="startPlayingButton">Start Playing</button>
        <button id="switchUserButton">Switch User</button>
        <input id="userSwitch" type="text">
        <input id="backfillContest" type="text">
        <input id="backfillRikishi" type="text">
        <button id="backfillResultsButton">Backfill Results</button>
        <div id="backfilledResults"></div>
        <p id="feedback"></p>
    `;
    game = new Game();
});

test('check if startPlaying is defined and returns expected value', () => {
    document.querySelector('#rikishi').value = '1';
    const result = game.startPlaying();
    expect(result).toBe("You selected: 1\nPrevious Picks: {\"July 2023\":\"1\"}");
});

test('check if switchUser updates the user in UI', () => {
    document.querySelector('#userSwitch').value = 'newUser';
    game.switchUser();
    expect(document.querySelector('#user').textContent).toBe('Current user: newUser');
});

test('check if backfillResults updates the results in UI', () => {
    document.querySelector('#backfillContest').value = 'May 2023';
    document.querySelector('#backfillRikishi').value = '2';
    game.backfillResults();
    let resultsElement = document.querySelector('#backfilledResults');
    expect(resultsElement.textContent).toContain('May 2023: 2');
});
