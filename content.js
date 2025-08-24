window.addEventListener('yt-navigate-finish', () => {
    if (theaterIsEnabled()) {
        enableTheaterTheme();
    }

    /**
     * the interval is needed because YouTube continuously adds/removes the chat frame element when switching between videos
     * even when there is no chat (I noticed when you click a stream and then switch to a video with no chat, the chat frame is still there and then gets removed)
     */
    setInterval(() => {
        const chatFrameElement = document.querySelector('ytd-live-chat-frame');
        if (chatFrameElement) {
            addTheaterButtonListener();
            addDisableThemeToFullscreenButton();
        } else {
            disableTheaterTheme();
            removeTheaterButtonListener();
        }
    }, 1000);
});

function theaterIsEnabled() {
    const element = document.querySelector('ytd-watch-flexy');
    return element && element.hasAttribute('theater');
}

function enableTheaterTheme() {
    console.log('Twitch Theater For Youtube: Enable Theater Theme');
    document.querySelector('body').classList.add('youtube-twitch-theater-theme');
}

function disableTheaterTheme() {
    console.log('Twitch Theater For Youtube: Disable Theater Theme');
    document.querySelector('body').classList.remove('youtube-twitch-theater-theme');
}

function addTheaterButtonListener() {
    const theaterBtn = document.querySelector('.ytp-size-button.ytp-button');

    if (theaterBtn) {
        theaterBtn.addEventListener('click', handleTheaterButtonClick);
    }
}

function handleTheaterButtonClick() {
    const ytdWatchFlexy = document.querySelector('ytd-watch-flexy');

    // waiting a tick for the attribute to be updated
    setTimeout(() => {
        if (ytdWatchFlexy.hasAttribute('theater')) {
            enableTheaterTheme();
        } else {
            disableTheaterTheme();
        }
    }, 0);
}

function removeTheaterButtonListener() {
    const theaterBtn = document.querySelector('.ytp-size-button.ytp-button');

    if (theaterBtn) {
        theaterBtn.removeEventListener('click', handleTheaterButtonClick);
    }
}

// Theme breaks in fullscreen mode, so disable it when entering fullscreen
function addDisableThemeToFullscreenButton() {
    const fullscreenBtn = document.querySelector('.ytp-fullscreen-button.ytp-button');

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (event) => {
            disableTheaterTheme();
        });
    }
}
