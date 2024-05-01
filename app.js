console.log("hello world")

let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let songsItems = document.querySelectorAll(".songItem");
let songItemPlay = document.querySelectorAll(".songItemPlay");
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let masterSongName = document.querySelector("#masterSongName");

let songs = [
    { songName: "1", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songName: "2", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "3", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "4", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "5", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songName: "6", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { songName: "7", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { songName: "8", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
];

songsItems.forEach((ele, i) => {
    ele.querySelectorAll("img")[0].src = songs[i].coverpath;
    ele.querySelectorAll(".songName")[0].innerText = songs[i].songName;
    console.log(ele, i)
})

let makeAllPlay = () => {
    songItemPlay.forEach((ele) => {
        ele.classList.remove("fa-pause-circle")
        ele.classList.add("fa-play-circle")
    })
}

songItemPlay.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        console.log(e.target);
        makeAllPlay();
        songindex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songindex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        masterSongName.innerText = songs[songindex].songName;
    })
})


// audioElement.play()
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})



audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

next.addEventListener("click", () => {
    if (songindex >= 9) {
        songindex = 0
    } else {
        songindex += 1
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songindex].songName;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

prev.addEventListener("click", () => {
    if (songindex <= 0) {
        songindex = 0
    } else {
        songindex -= 1
    }
    console.log("ha")

    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songindex].songName;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})
