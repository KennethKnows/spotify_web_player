// JavaScript code to control the music player

// Get references to the HTML elements
const audioPlayer = document.getElementById("audio-player");
const seekSlider = document.querySelector(".seek_slider");
const playpauseButton = document.querySelector(".playpause-track i");
const currentTimeDisplay = document.querySelector(".current-time");
const totalDurationDisplay = document.querySelector(".total-duration");

// Define some variables for tracking the player state
let isPlaying = false;
let currentTrackTime = 0;

// Add an event listener to play or pause the audio when the play/pause button is clicked
playpauseButton.addEventListener("click", function () {
    if (isPlaying) {
        audioPlayer.pause();
        playpauseButton.className = "fa fa-play-circle fa-3x";
    } else {
        audioPlayer.play();
        playpauseButton.className = "fa fa-pause-circle fa-3x";
    }
    isPlaying = !isPlaying;
});

// Add an event listener to update the seek slider and time displays as the audio plays
audioPlayer.addEventListener("timeupdate", function () {
    currentTrackTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    seekSlider.value = (currentTrackTime / duration) * 100;
    currentTimeDisplay.textContent = formatTime(currentTrackTime);
    totalDurationDisplay.textContent = formatTime(duration);
});

// Add an event listener to seek to a different part of the track when the seek slider is moved
seekSlider.addEventListener("input", function () {
    const seekTime = (audioPlayer.duration / 100) * seekSlider.value;
    audioPlayer.currentTime = seekTime;
});

// Function to format time as mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return (
        (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    );
}

// Function to make a Spotify API request
async function searchSpotify(query) {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key':  '55564e0586msh546946561fe51d1p1fb2e5jsn128098c17b07',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON
        console.log(result);

        // You can process the Spotify API response data here as needed
    } catch (error) {
        console.error(error);
    }
}

// Call the searchSpotify function with your query when needed
searchSpotify('YOUR_QUERY');
