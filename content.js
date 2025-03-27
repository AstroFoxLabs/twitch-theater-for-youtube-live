init();

function init() {
    // Check if short
    const video = document.querySelector('video');
    video.addEventListener('loadeddata', function(event) {
        if (isShortVideo(event.target)) {
            addShortVideoClass();
        }
    });

    addThemeToTheaterButton();
    addDisableThemeToFullscreenButton();

    // Check on reload, if theater mode is enabled
    window.addEventListener('load', async () => {
            if (await enableCheck()) {
                enableTheaterTheme();
            }
        }
    )
}

function enableTheaterTheme() {
    console.log('Twitch Theater For Youtube: Enable Theater Theme');
    document.querySelector('body').classList.add('youtube-twitch-theater-theme');
}

function disableTheaterTheme() {
    console.log('Twitch Theater For Youtube: Disable Theater Theme');
    document.querySelector('body').classList.remove('youtube-twitch-theater-theme');
}

function enableCheck() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const element = document.querySelector('ytd-watch-flexy');
            resolve(element ? element.hasAttribute('theater') : false);
        }, 2000);
    });
}


function addThemeToTheaterButton() {
    const theaterBtn = document.querySelector('.ytp-size-button.ytp-button');

    if (theaterBtn) {
        theaterBtn.addEventListener('click', (event) => {
                const ytdWatchFlexy = document.querySelector('ytd-watch-flexy');
                setTimeout(() => {
                    if (ytdWatchFlexy.hasAttribute('theater')) {
                        enableTheaterTheme();
                        console.log(document.querySelector('.ytp-rounded-miniplayer-not-regular-wide-video'))
                    } else {
                        disableTheaterTheme();
                    }
                }, 0);
            }
        )
    }
}

function addDisableThemeToFullscreenButton() {
    const fullscreenBtn = document.querySelector('.ytp-fullscreen-button.ytp-button');

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (event) => {
            disableTheaterTheme();
        });
    }
}

function isShortVideo(target) {
    return target.videoWidth < target.videoHeight;
}

function addShortVideoClass() {
    document.querySelector('.html5-video-container').classList.add('youtube-twitch-short-video');
}
