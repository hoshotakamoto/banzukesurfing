import Game from './game.js';
import AdminPanel from './AdminPanel.js';

// Function to construct the entire DOM
function buildDOM() {
    // Main header
    const h1 = document.createElement('h1');
    h1.textContent = 'Welcome to Banzuke Surfing Game!';
    document.body.appendChild(h1);

    // User paragraph
    const userP = document.createElement('p');
    userP.id = 'user';
    document.body.appendChild(userP);

    // Rikishi selection
    const rikishiP = document.createElement('p');
    rikishiP.textContent = 'Select your Rikishi and start playing!';
    document.body.appendChild(rikishiP);

    const rikishiSelect = document.createElement('select');
    rikishiSelect.id = 'rikishi';
    const rikishiOption1 = new Option('Rikishi 1', '1');
    const rikishiOption2 = new Option('Rikishi 2', '2');
    rikishiSelect.add(rikishiOption1, null);
    rikishiSelect.add(rikishiOption2, null);
    document.body.appendChild(rikishiSelect);

    const startButton = document.createElement('button');
    startButton.id = 'startPlayingButton';
    startButton.textContent = 'Start Playing';
    document.body.appendChild(startButton);

    const hr = document.createElement('hr');
    document.body.appendChild(hr);

    // Backfilled results
    const backfilledResultsHeader = document.createElement('h2');
    backfilledResultsHeader.textContent = 'Backfilled Results:';
    document.body.appendChild(backfilledResultsHeader);

    const backfilledResultsDiv = document.createElement('div');
    backfilledResultsDiv.id = 'backfilledResults';
    document.body.appendChild(backfilledResultsDiv);

    // Admin Panel
    const adminPanel = new AdminPanel(); // Assume AdminPanel is imported or included in the same file
    adminPanel.init();

    // Initialize game logic here, if needed
    window.game = new Game();
    window.game.initialize();
}

// Run the buildDOM function to construct the page
buildDOM();
