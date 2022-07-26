// Dark ligth Toggle
const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

const setDarkMode = () => {
    document.querySelector('body').classList = 'dark';
    localStorage.setItem('colorMode', 'dark');
};

const setLightMode = () => {
    document.querySelector('body').classList = 'light';
    localStorage.setItem('colorMode', 'light');
};

const colorModeFromLocalStorage = () => {
    return localStorage.getItem('colorMode');
};

const colorModeFromPreferences = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light' // If preference is set or does not match anything (light is default)
};

const loadAndUpdateColor = () => {
    // local storage has precendence over the prefers-color-scheme
    const color = colorModeFromLocalStorage() || colorModeFromPreferences();


    color == 'dark' ? darkButton.click() : lightButton.click();
};

// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
        event.matches ? darkButton.click() : lightButton.click();
    });

// Load the right color on startup - localStorage has precedence
loadAndUpdateColor();