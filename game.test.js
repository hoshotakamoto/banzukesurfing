require('jest-localstorage-mock'); // import the local storage mock

global.$ = jest.fn(() => ({
    val: jest.fn(() => '1')
}));

const { startPlaying } = require('./game');

beforeEach(() => {
    localStorage.clear(); // clear localStorage before each test
});

test('check if startPlaying is defined and returns expected value', () => {
    localStorage.setItem('user', 'testUser');
    localStorage.setItem('testUser', JSON.stringify({ 'July 2023': '1' })); // Assume a previous pick
    const result = startPlaying();
    expect(result).toBe("You selected: 1\nPrevious Picks: {\"July 2023\":\"1\"}");
});
