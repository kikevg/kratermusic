const musics = document.querySelectorAll('.music-title');
const ul = document.querySelector('#ul');
const name = document.getElementById('name');
const artst = document.getElementById('artist');
const fill = document.querySelector('#fill');
const curTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const playPauseButton = document.getElementById('play-pause');
const previousButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let songs = [
    {
        name: 'Se le pasa el agua',
        artist: 'Grupo Krater',
        song: 'media/audios/se_le_pasa_el_agua.mp3'
    },
];

let currentSong = 0;
let isPlaying = false;
let audio = new Audio();

let s = 0;
let i = 1;

songs.forEach(song => {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let p = document.createElement('p');
    let div3 = document.createElement('div');
    let button = document.createElement('button');
    let icon = document.createElement('i');

    li.appendChild(div);
    div.appendChild(div2);
    div2.appendChild(span1);
    div2.appendChild(span2);
    div2.appendChild(p);
    div.appendChild(div3);
    div3.appendChild(button);
    button.appendChild(icon);

    li.classList.add('list-group-item');
    li.classList.add('bg-transparent');
    li.classList.add('px-0');
    div.classList.add('w-100');
    div.classList.add('d-flex');
    div.classList.add('justify-content-between');
    div.classList.add('align-items-center');
    div2.classList.add('w-100');
    div2.classList.add('music-title');
    div2.classList.add('text-white')
    p.classList.add('text-white-50')
    button.classList.add('p-0');
    button.classList.add('border-0');
    button.classList.add('bg-danger');
    button.classList.add('rounded-circle');
    button.classList.add('d-flex');
    button.classList.add('align-items-center');
    button.classList.add('justify-content-center');
    button.style.width = '40px'
    button.style.height = '40px'
    button.setAttribute('data-song', s);
    button.classList.add('play');
    icon.classList.add('fas');
    icon.classList.add('fa-play');
    icon.classList.add('text-white');

    span1.textContent = i + '. ';
    span2.textContent = song.name;
    p.textContent = song.artist;

    ul.appendChild(li);

    i++;
    s++;
});

const playButtons = document.querySelectorAll('.play');
const titles = document.querySelectorAll('.music-title');

const playing = (index) => {
    audio.src = songs[index].song;
    name.textContent = songs[index].name;
    artist.textContent = songs[index].artist;
}

const changeColor = (index) => {
    titles.forEach(t => t.classList.remove('text-danger'));
    playButtons.forEach(b => {
        if (b.getAttribute('data-song') == index) {
            b.parentElement.parentElement.children[0].classList.add('text-danger');
        }
    })
}

const changeIcon = () => {
    if (!isPlaying) {
        playPauseButton.children[0].classList.add('fa-play');
        playPauseButton.children[0].classList.remove('fa-pause');
    } else {
        playPauseButton.children[0].classList.add('fa-pause');
        playPauseButton.children[0].classList.remove('fa-play');
    }
}

window.onload = () => {
    playing(currentSong);
    changeColor(currentSong);
}

playButtons.forEach(p => {
    p.addEventListener('click', function () {
        currentSong = parseInt(this.getAttribute('data-song'));
        playing(currentSong);
        audio.play();
        isPlaying = true;
        changeIcon();
        changeColor(currentSong);
    })
});

playPauseButton.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
    changeIcon();
});

nextButton.addEventListener('click', function () {
    if (currentSong < (songs.length - 1)) {
        currentSong++;
        playing(currentSong);
        audio.play();
        isPlaying = true;
        changeIcon();
        changeColor(currentSong);
    }
});

previousButton.addEventListener('click', function () {
    if (currentSong > 0) {
        currentSong--;
        playing(currentSong);
        audio.play();
        isPlaying = true;
        changeIcon();
        changeColor(currentSong);
    }
});

audio.addEventListener('timeupdate', function () {
    if (!isNaN(audio.duration)) {
        let position = audio.currentTime * (60 / audio.duration);
        fill.style.width = position + '%';
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration) - durationMinutes * 60;
        let currentMinute = Math.floor(audio.currentTime / 60);
        let currentSecond = Math.floor(audio.currentTime) - currentMinute * 60;
        if (durationMinutes < 10) {
            durationMinutes = '0' + durationMinutes;
        }
        if (durationSeconds < 10) {
            durationSeconds = '0' + durationSeconds;
        }
        if (currentMinute < 10) {
            currentMinute = '0' + currentMinute;
        }
        if (currentSecond < 10) {
            currentSecond = '0' + currentSecond;
        }
        duration.textContent = durationMinutes + ':' + durationSeconds;
        curTime.textContent = currentMinute + ':' + currentSecond;
    }
});