
let songs = [
    {
        artist: "EMAA",
        name: "Zburătorul",
        src: "music/EMAA - Zburătorul.mp3"
    },
    {
        artist: "Dj Project & Roxen",
        name: "Parte din tine",
        src: "music/DJ Project Roxen - Parte Din Tine.mp3"
    },
    {
        artist: "The Motans & EMAA",
        name: "Insula",
        src: "music/The Motans EMAA - Insula.mp3"
    },
    {
        artist: "Dj Project & Andia",
        name: "Slăbiciuni",
        src: "music/DJ Project Andia - Slabiciuni.mp3"
    },
    {
        artist: "Vexento",
        name: "Cloud Nine",
        src: "music/Vexento_cloud_nine.mp3"
    }, 
    {
        artist: "Vexento",
        name: "Forever",
        src: "music/Vexento_forever.mp3"
    }, 
    {
        artist: "Vexento",
        name: "Guava Breeze",
        src: "music/Vexento_guava_breeze.mp3"
    }, 
    {
        artist: "Vexento",
        name: "Sunrise",
        src: "music/Vexento_sunrise.mp3"
    }, 
    {
        artist: "Vexento",
        name: "Wild",
        src: "music/Vexento_wild.mp3"
    }, 
    {
        artist: "Vexento",
        name: "With You",
        src: "music/Vexento_with_you.mp3"
    }
];


const pics = ['div/pic1.jpg', 'div/pic2.jpg', 'div/pic3.jpg', 'div/pic04.jpg', 'div/pic5.jpg', 'div/pic6.jpg', 'div/pic7.jpg', 'div/pic8.jpg',
'div/pic9.jpg','div/pic10.jpg','div/pic11.jpg','div/pic12.jpg' ,'div/pic13.jpg','div/pic14.jpg' , 'div/pic15.jpg', 'div/pic16.jpg', 'div/pic17.jpg'];


const play_btn = document.querySelector('#play');
const back_btn = document.querySelector('.backward');
const forw_btn = document.querySelector('.forward');
const music = document.querySelector('.slider');
const audio = document.querySelector('audio');
const slider = document.querySelector('#song_slider');
let song_name = document.querySelector('#song_name');
let artist_name = document.querySelector('#artist');
let songTime = document.querySelector('#time');
let songDuration = document.querySelector('#duration');
let updateImage = document.querySelector(".player");
const library = document.querySelector('.library');
const libraryBtn = document.querySelector('#libraryBtn');


function changeFixedElementWidth() {
    let parentElement = document.querySelector('.library');
    let fixedElement = document.querySelector('.playlist_title');
    parentElement = parentElement.getBoundingClientRect().width;
    fixedElement.style.width = parentElement + 'px';
}

window.addEventListener('load', changeFixedElementWidth);
window.addEventListener('resize', changeFixedElementWidth);


//open/close songs playlist
function openLibrary(){
    library.classList.toggle('library_active');
    libraryBtn.onclick = () => {
        updateImage.classList.toggle('.move_player');
    }
}


//change background image every 2 minutes
let transitionBackground = setInterval(background, 20000);
function background() {
    updateImage.style.backgroundImage = `url(${pics[Math.floor(Math.random() * pics.length)]})`;
}


play_btn.addEventListener('click', PlayPause);
back_btn.addEventListener('click', prevSong);
forw_btn.addEventListener('click', nextSong);
audio.addEventListener("timeupdate", updateSong);
audio.addEventListener("ended", nextSong);
slider.addEventListener('change', updateSlider);


//update slider/bar while song is playing
function updateSlider(event){
    audio.currentTime = event.target.value;
}


//inject song details (playing time, duration) based on individual song 
function updateSong(event){
    const {currentTime, duration} = event.target;
    slider.min = 0;
    slider.max = duration;
    slider.value = currentTime;
    songTime.innerText = new Date(currentTime * 1000).toISOString().substr(14, 5);
    songDuration.innerText = new Date(duration * 1000).toISOString().substr(14, 5);
}

let index = 0;

//load the song into the app on page load
function loadSong(item) {
    audio.src = item.src;
    song_name.innerText = item.name;
    artist_name.textContent = item.artist;
}
loadSong(songs[index]);


//check the background image and switch text color to white/black
var checkBgImg = setInterval(function(){
    let bg = window.getComputedStyle(updateImage).getPropertyValue('background-image');
    let bgImg = bg.slice(49, -2);
    console.log(bg);

    if (bgImg == '04.jpg' || bgImg == '10.jpg' || bgImg == '15.jpg' || bgImg == '17.jpg' ){
        song_name.style.color = 'black';
        song_name.style.borderColor = "gray";
        artist_name.style.color = 'black';
        artist_name.style.fontSize = '150%';
    } else {
        song_name.style.color = 'white';
        song_name.style.borderColor = "white";
        artist_name.style.color = 'white';
    }

    if(bgImg == '16.jpg' || bgImg == '13.jpg' || bgImg == 'rever.jpg') {
        song_name.style.transition = "all 10s ease";
        libraryBtn.style.color = 'rgb(219, 219, 219)';
    } else {
        libraryBtn.style.color = 'black';
    }
    console.log(bg.slice(49, -2))
}, 2000);


//CSS transition over the song and artist name
function transition(){
    song_name.style.opacity = "1";
    song_name.style.transition = "all 4s";
    artist_name.style.opacity = "1";
    artist_name.style.transition = "all 4s";
}

//stop the transition on hover
function noTransition(event){
    event.style.transition = "none";
}


function PlayPause(){
        if (!audio.paused) {
            audio.pause();
            play_btn.setAttribute('src', 'imgs/playy.png');
        } else {
            play_btn.setAttribute('src', 'imgs/pausee.png');
            audio.play();
        }
        transition();
}

function prevSong(){
    index--;
    if (index < 0){
        index = songs.length - 1;
    }
    loadSong(songs[index]);
    PlayPause();
}


function nextSong(){
    index++;
    if (index > songs.length - 1){
        index = 0;
    }
    loadSong(songs[index]);
    PlayPause();
}

playListSongs = songs.map((val, ind, arr) => {
    let song = document.createElement('p');
    song.classList.add('play_list_song');
    library.appendChild(song);
    song.innerText = (ind+1) + ". " + val.name;

    song.onclick = (e) => {
        let songName = e.target.textContent;
        console.log(songName);
        switch(songName){
            case (ind+1) + ". " + "Zburătorul":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.textContent = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Parte din tine":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.textContent = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Insula":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.textContent = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Slăbiciuni":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.textContent = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Cloud Nine":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.textContent = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Forever":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.innerText = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Guava Breeze":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.innerText = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Sunrise":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.innerText = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "Wild":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.innerText = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;

            case (ind+1) + ". " + "With You":
            audio.src = songs[ind].src;
            PlayPause();
            song_name.innerText = songs[ind].name;
            artist_name.textContent = songs[ind].artist;
            break;
        }
    }    
    return song.onclick;
});
