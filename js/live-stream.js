'use script';

const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    musicName = wrapper.querySelector(".song-details .name"),
    mainAudio = wrapper.querySelector("#main-audio"),
    playPauseBtn = wrapper.querySelector('.play-pause'),
    progressArea = wrapper.querySelector(".progress-area");
progressBar = wrapper.querySelector(".progress-bar");


let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex); //calling load music function once window load 
})

//Load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//Play music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//Pause music function 
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}


//play or music button event 
playPauseBtn.addEventListener("click", () => {
    const isMusicPause = wrapper.classList.contains("paused");
    isMusicPause ? pauseMusic() : playMusic();
})

//Update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = (e).target.currentTime;
    const duration = (e).target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {

        //Update song total duration 
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;


    });
    //Update playing song current time 
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//Updating song current time according to progress bar

progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
    playMusic();
});