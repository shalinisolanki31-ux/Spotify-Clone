console.log("Hello Shalini");
// async function main()
// {
//     let a = await fetch("http://127.0.0.1:5500/songs/");
//     let response = await a.text();
//     console.log(response)
// }
// main();


const musicData = {
    1:{
        songs : [
            {name: "Ishq Jalakar", src : "songs/Dhurandhar/ishqjalakar.mp3"},
            {name : "Gehra Hua" ,src : "songs/Dhurandhar/gehrahua.mp3"},
            {name : "Rehman Dakait", src : "songs/Dhurandhar/sher-e-baloch.mp3"},
            {name : "Shararat", src : "songs/Dhurandhar/shararat.mp3"},
            {name : "Lutt Le Gaya", src : "songs/Dhurandhar/Lutt_Le_Gaya.mp3"},
        ]
    },
    2:{
        songs:[
            {name : "Ghar Kab Aaoge", src : "songs/gharkabhaaoge.mp3"},
            {name : "Mitti Ke Bete", src : "songs/mittikebete.mp3"},
            {name : "Hindustan Meri Jaan", src : "songs/hindustan.mp3"}
        ]
    },
    3:{
        songs:[
            {name: "saiyara", src : "songs/Saiyara/saiyara.mp3"},
            {name : "Dhun", src : "songs/Saiyara/Dhun.mp3"},
            {name : "Barbaad", src : "songs/Saiyara/Barbaad.mp3"},
            {name : "Tum Ho Toh", src : "songs/Saiyara/Tum_Ho_Toh.mp3"}
        ]
    },
    4:{
        songs : [
            {name : "Raat Bhar", src : "songs/DeDePyaarDe/raatbhar.mp3"},
            {name : "3Shaukk", src : "songs/DeDePyaarDe/3shaukk.mp3"},
            {name : "Babbul Ve", src : "songs/DeDePyaarDe/Babbul.mp3"}
        ]
    },
    5:{
        songs:[
            {name : "Chahun Mein Ya Naa", src : "songs/chahun.mp3"},
            {name : "Sunn Raha Hai", src : "songs/sunnraha.mp3"}
        ]
    },
    6:{
        songs:[
            {name : "Tera Chehra", src : "songs/terachehra.mp3"},
            {name : "Bewajah", src : "songs/bewajah.mp3"},
            {name : "Kheech Meri Photo", src : "song/kheech.mp3"},
            {name : "Sanam Teri Kasam", src : "songs/sanam.mp3"}
        ]
    },
    7:{
        songs:[
            {name : "Finding Her", src : "songs/findingher.mp3"}
        ]
    },
    8:{
        songs : [
            {name : "Raanjhan", src : "songs/raanjhan.mp3"},
            {name : "Maiyya", src : "songs/maiyya.mp3"},
            {name : "Thaaein Thaaein", src : "songs/thaaein.mp3"}
        ]
    },
    9:{
        songs:[
            {name : "Mein Tuzhko Bhaga Laya", src : "songs/HeroNo.1/meintuzhkobhaga.mp3"},
            {name : "Mohabbat Ki Nahi Jaati", src : "songs/HeroNo.1/mohabbat.mp3"},
            {name : "Saaton Janam Tuzhe Pyaar Karu", src : "songs/HeroNo.1/saatonjanam.mp3"},
            {name : "Sona Kitna Sona Hai", src : "songs/HeroNo.1/sonakitnasona.mp3"},
            {name : "Tum Humpe Marte Ho", src : "songs/HeroNo.1/tumhumpemarte.mp3"}
        ]
    },
    10:{
        songs:[
            {name : "Pyaar Hua Ikraar Hua", src : "songs/pyaarhua.mp3"},
            {name : "Ramaiya Vastavaiyan", src : "songs/ramaiya.mp3"},
            {name : "Mera Joota Hai Japani", src : "songs/japani.mp3"}
        ]
    },
    11:{
        songs:[
            {name : "Yeh Raatein Yeh Mausam", src : "songs/mausam.mp3"}
        ]
    },
    12:{
        songs:[
            {name : "Mere Sapno Ki Rani", src : "songs/sapno.mp3"}
        ]
    }
};




const audio = new Audio();
let currentPlaylist = [];//this is used to store the songs
let currentSongIndex = 0;//song which is currently playing

const songInfo = document.querySelector(".songInfo");




//function to play a song
function playSong(index){//currently the index will go in this function which will tell that currently which song is playing in the playlist
    if(!currentPlaylist.length)return;//if there is an empty playlist which means that the length is 0 then the function will stop
    
    currentSongIndex = index;//the current song index will be stored
    audio.src = currentPlaylist[currentSongIndex].src;
    audio.play();

    songInfo.innerText = currentPlaylist[currentSongIndex].name;//the currentsong name would be displayed in the song info internally
    updatePlaybarUI(true);//true here means that song is playing hide pay icon and show pause icon
}




//handle card play btn click
document.addEventListener("click", (e)=>{
    const playBtn = e.target.closest(".play");//this will check that whetehr the user has clicked on the card's playbtn closest means the nearest ancestor to .play
    if(!playBtn)return;//if the user has clicked anywhere on the page the song will not be played

    const card = playBtn.closest(".card");//it will check that which card this playbtn belongs to. Basically it will find the parent card that the play button belongs to
    const cardId = card.dataset.id;//which playlist does this card represent

    const cardData = musicData[cardId];//it will get the cardId from musicData.It will retrieve the data from the specific card 
    if(!cardData) return;

    currentPlaylist = cardData.songs;//it will replace the currentplaylist with new one .Loads the song associated with the clicked card
    playSong(0);
});




//autoplay next song when current ends

audio.addEventListener("ended", () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
        playSong(currentSongIndex + 1);
    }
    else{
        updatePlaybarUI(false);//this means that song has now ended and we have to show the play icon. if i will remove this the UI still shows the pause icon
    }
});



document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentSongIndex < currentPlaylist.length - 1) {
        playSong(currentSongIndex + 1);
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
    }
});

// document.getElementById("playPauseBtn").addEventListener("click", () => {
//     audio.paused ? audio.play() : audio.pause();
// });





const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

function updatePlaybarUI(isPlaying){
    console.log("updatePlaybarUI:", isPlaying);
    console.log("playIcon:", playIcon);
    console.log("pauseIcon:", pauseIcon);
    if(isPlaying)
    {
        playIcon.setAttribute("display", "none");   //if the current song playing is true to none false to block then hide the play icon when the song is playing and whe the song is paused show the play icon 
        pauseIcon.setAttribute("display", "inline");
    }
    else{
        playIcon.setAttribute("display", "inline");
        pauseIcon.setAttribute("display", "none");
    }
}


audio.addEventListener("play", ()=>updatePlaybarUI(true));
audio.addEventListener("pause", ()=>updatePlaybarUI(false));

document.getElementById("playPauseBtn").addEventListener("click", ()=>{
    if(!audio.src)return;
    if(audio.paused){
        audio.play();
       
    }
    else{
        audio.pause();
        
    }
});
// const audio = document.getElementById("audioPlayer");
// const playPauseBtn = document.getElementById("playPauseBtn");
// const progressBar = document.getElementById("progressBar");
// const currentTimeEl = document.getElementById("currentTime");
// const durationEl = document.getElementById("duration");

// playPauseBtn.addEventListener("click", async () => {
//     try {
//         if (audio.paused) {
//             await audio.play();
//             playPauseBtn.textContent = "⏸ Pause";
//             console.log("Audio playing");
//         } else {
//             audio.pause();
//             playPauseBtn.textContent = "▶ Play";
//             console.log("Audio paused");
//         }
//     } catch (err) {
//         console.error("Playback error:", err);
//         alert("Audio failed to play. Check console.");
//     }
// });

// audio.addEventListener("loadedmetadata", () => {
//     progressBar.max = audio.duration;
//     durationEl.textContent = formatTime(audio.duration);
// });

// audio.addEventListener("timeupdate", () => {
//     progressBar.value = audio.currentTime;
//     currentTimeEl.textContent = formatTime(audio.currentTime);
// });

// progressBar.addEventListener("input", () => {
//     audio.currentTime = progressBar.value;
// });

// function formatTime(time) {
//     if (isNaN(time)) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
// }




//renedering songs on next page



//   document.querySelectorAll(".card").forEach(card => {
//    card.addEventListener("click", () => {
//      const title = card.dataset.title;
//      const desc = card.dataset.desc;
//       const img = card.dataset.img;

//      const right = document.getElementById("rightSection");

//       right.innerHTML = `
//        <div class="song-detail">
//           <img src="${img}" alt="${title}" />
//          <h2>${title}</h2>
//          <p>${desc}</p>
//         </div>
//      `;
//     });
//   }); 


// document.querySelectorAll(".card").forEach(card => {
//   card.addEventListener("click", () => {

//     localStorage.setItem("songData", JSON.stringify({
//       title: card.dataset.title,
//       desc: card.dataset.desc,
//       img: card.dataset.img
//     }));

//     fetch("songs.html")
//       .then(res => res.text())
//       .then(html => {
//         document.getElementById("rightSection").innerHTML = html;

//         // After HTML is injected, now populate the data
//         const data = JSON.parse(localStorage.getItem("songData"));
//         document.getElementById("songImg").src = data.img;
//         document.getElementById("songTitle").textContent = data.title;
//         document.getElementById("songDesc").textContent = data.desc;
//       });
//   });
// });















// document.querySelectorAll(".card").forEach(card => {
//   card.addEventListener("click", () => {
//     const songId = card.dataset.id;

//     // Update right section
//     document.getElementById("rightSection").innerHTML = `
//       <h2>Song ${songId}</h2>
//     `;

//     // Add history entry
//     history.pushState({ songId: songId }, "", `?id=${songId}`);
//   });
// });



// window.addEventListener("popstate", function(event) {
//   const state = event.state;

//   if (state && state.songId) {
//     // update right section based on state.songId
//     document.getElementById("rightSection").innerHTML = `
//       <h2>Song ${state.songId}</h2>
//     `;
//   } else {
//     // If no state, show default page
//     document.getElementById("rightSection").innerHTML = `
//       <h2>Welcome Back</h2>
//     `;
//   }
// });




