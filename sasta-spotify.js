let track_list=[
    {
        name:"Aghori",
        artist:"Gurbax Mr. Doss",
        image:"songImgs/aghori.jpg",
        path:"songs/Aghori.mp3"
    },
    {
        name:"Rama Anthem",
        artist:"Bass Rebellion",
        image:"songImgs/ramAnthem.jpeg",
        path:"songs/Rama Anthem.mp3"
    },
    {
        name:"Me & My Demons",
        artist:"OMIDO x Silent Child",
        image:"songImgs/meAndMyDemons.jpeg",
        path:"songs/Me My Demons.mp3"
    },
    {
        name:"Sapne",
        artist:"MojoJojo",
        image:"songImgs/sapne.jpeg",
        path:"songs/Sapne.mp3"
    }
];

let now_playing=document.querySelector('.now-playing');
let track_art=document.querySelector('.track-art');
let track_name=document.querySelector('.track-name');
let track_artist=document.querySelector('.track-artist');

let prev_btn=document.querySelector('.prev-track');
let next_btn=document.querySelector('.next-track');
let playpause_btn=document.querySelector('.play-pause');

let curr_time=document.querySelector('.current-time');
let duration=document.querySelector('.total-duration');
let track_seeker=document.querySelector('.track-seeker');
let volume_seeker=document.querySelector('.volume-seeker');

let isPlaying=false;
let track_index=0;
let updateTimer;

let curr_track=document.createElement("audio");

let random_bg=0;

function random_bg_color(){
    if(random_bg===1)
    {
        let red=Math.floor(Math.random()*(256-64)) +64;
        let green=Math.floor(Math.random()*(256-64)) +64;
        let blue=Math.floor(Math.random()*(256-64)) +64;
        let color=`rgb(${red},${green},${blue})`;
        document.body.style.backgroundColor=color;
    }
}

function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();
    //load
    curr_track.src=track_list[track_index].path;
    curr_track.load();
    track_name.textContent=track_list[track_index].name;
    track_artist.textContent=track_list[track_index].artist;
    track_art.style.backgroundImage=`url("${track_list[track_index].image}")`;
    now_playing.textContent=`PLAYING ${track_index+1} of ${track_list.length}`;

    updateTimer=setInterval(seekUpdate,1000);

    curr_track.addEventListener('ended',nextTrack);
}

function resetValues(){
    curr_time.innerText='00:00';
    duration.innerText='00:00';
    track_seeker.value=0;
}

function play_pause_track(){
    if(isPlaying){
        pauseTrack();
        random_bg=0;
    }
    else{
        playTrack();
        random_bg=1;
    }
}

function playTrack(){
    curr_track.play();
    isPlaying=true;
    playpause_btn.innerHTML=`<i class="fa fa-pause-circle fa-5x"></i>`
}

function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    playpause_btn.innerHTML=`<i class="fa fa-play-circle fa-5x"></i>`
}

function nextTrack(){
    track_index=track_index+1;
    if(track_index>=track_list.length){
        track_index=0;
    }

    loadTrack(track_index);
    playTrack();

    random_bg=1;
}

function prevTrack(){
    track_index=track_index-1;
    if(track_index<0){
        track_index=track_list.length-1;
    }
    loadTrack(track_index);
    playTrack();

    random_bg=1;
}

function seekTo(){
    let seekTo=curr_track.duration*(track_seeker.value/100);
    curr_track.currentTime=seekTo;
}

function setVolume(){
    curr_track.volume=volume_seeker.value/100;
}

function seekUpdate(){
    let seekPosition=0;
    seekPosition=(curr_track.currentTime/curr_track.duration)*100;
    track_seeker.value=seekPosition;

    let currMin=Math.floor(curr_track.currentTime/60);
    let currSec=Math.floor(curr_track.currentTime-(currMin*60));
    let durationMin=Math.floor(curr_track.duration/60);
    let durationSec=Math.floor(curr_track.duration-(durationMin*60));

    if(currMin<10){currMin=`0`+currMin};
    if(currSec<10){currSec=`0`+currSec};
    if(durationMin<10){durationMin=`0`+durationMin};
    if(durationSec<10){durationSec=`0`+durationSec};

    curr_time.innerText=`${currMin}:${currSec}`;
    duration.innerText=`${durationMin}:${durationSec}`;
}


setInterval(random_bg_color,3000);
loadTrack(track_index);
playpause_btn.addEventListener('click',play_pause_track);
track_seeker.addEventListener('input',seekTo);
volume_seeker.addEventListener('input',setVolume);