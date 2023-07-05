class WavePortal {
  constructor(targetElement) {
    this.targetElement = targetElement;
    this.currentWave = null;
    this.currentBasho = null;
  }

  createWaveDisplay(waveData) {
    // Clear existing children
    while (this.targetElement.firstChild) {
      this.targetElement.removeChild(this.targetElement.firstChild);
    }

    // Create DOM elements for waves and bashos
    for (let waveId in waveData) {
      let wave = waveData[waveId];
      let waveElement = document.createElement('div');
      waveElement.classList.add('wave');
      waveElement.textContent = `Wave ${waveId}`;

      for (let bashoId in wave.bashos) {
        let bashoElement = document.createElement('div');
        bashoElement.classList.add('basho');
        bashoElement.textContent = `Basho ${bashoId}`;
        waveElement.appendChild(bashoElement);
      }

      this.targetElement.appendChild(waveElement);
    }

    // Setup event handlers
    this.setupEventHandlers();
  }

  updateWaveDisplay(waveId, bashoId) {
    // Update current wave and basho
    this.currentWave = waveId;
    this.currentBasho = bashoId;

    // Add 'selected' class to the current wave and basho, remove from others
    for (let waveElement of this.targetElement.getElementsByClassName('wave')) {
      if (waveElement.textContent === `Wave ${this.currentWave}`) {
        waveElement.classList.add('selected');
      } else {
        waveElement.classList.remove('selected');
      }

      for (let bashoElement of waveElement.getElementsByClassName('basho')) {
        if (bashoElement.textContent === `Basho ${this.currentBasho}`) {
          bashoElement.classList.add('selected');
        } else {
          bashoElement.classList.remove('selected');
        }
      }
    }
  }

  setupEventHandlers() {
    // Add click events to waves and bashos
    for (let waveElement of this.targetElement.getElementsByClassName('wave')) {
      waveElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('basho')) {
          this.updateWaveDisplay(waveElement.textContent.split(' ')[1], event.target.textContent.split(' ')[1]);
        } else {
          this.updateWaveDisplay(waveElement.textContent.split(' ')[1], null);
        }
      });
    }
  }

  initialize(waveData) {
    // Initialize the portal with the given wave data
    this.createWaveDisplay(waveData);
    this.updateWaveDisplay(Object.keys(waveData)[0], Object.keys(waveData[Object.keys(waveData)[0]].bashos)[0]);
  }
}
export default WavePortal;
