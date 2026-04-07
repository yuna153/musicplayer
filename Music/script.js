//-------歌曲資料庫 (songs陣列)-------//
const songs = [
  {
    title: "Aries(白羊座)",
    src: "music/Aries.mp3",
    cover: "images/Aries.jpg"
  },
  {
    title: "INFJ-A",
    src: "music/INFJ-A.mp3",
    cover: "images/INFJ-A.jpg"
  },
  {
    title: "Morning Coffee",
    src: "music/morning coffee.mp3",
    cover: "images/morning coffee.jpg"
  },
  {
    title: "I Want You",
    src: "music/I Want You.mp3",
    cover: "images/I Want You.jpg"
  },
  {
    title: "All For You",
    src: "music/all for you.mp3",
    cover: "images/all for you.jpg"
  },
  {
    title: "All The Time",
    src: "music/all the time.mp3",
    cover: "images/all the time.jpg"
  },

];

//------------------------------------------//

//抓 DOM 元素
const audio = document.getElementById("audio"); //真正播放音樂
const title = document.getElementById("title"); //顯示歌名
const cover = document.getElementById("cover"); //顯示封面

// 時間軸元素
const progress = document.getElementById("progress"); //進度條長度
const current = document.getElementById("current");   //當前時間
const duration = document.getElementById("duration"); //總時間

// 自動更新進度條
audio.addEventListener("timeupdate", () => {  //timeupdate = 當音樂播放時，每秒或每幾毫秒會觸發一次
  const { currentTime, duration: total } = audio;

  // 更新進度條計算 
  const percent = (currentTime / total) * 100; //(currentTime / total) = 目前時間 / 總長  // *100 = 轉成百分比
  progress.style.width = percent + "%"; //更新進度條寬度  //progress = 已經播放的部分 //.style.width = CSS 寬度 → 控制進度條長度 //percent + "%" = 轉成 CSS 可用的百分比字串

  // 更新時間文字  textContent = 改畫面上的文字
  current.textContent = formatTime(currentTime); //current=畫面上的目前時間元素(左邊) currentTime = 目前播放秒數 formatTime = 把秒數變成 分:秒 ((這行顯示現在播到幾分幾秒
  duration.textContent = formatTime(total); //duration = 畫面上的總時間元素(右邊) total = 總秒數((這行顯示整首歌長度
});

//點擊跳時間
function setProgress(e) { // (e)是event
  const width = e.currentTarget.clientWidth; //整條進度條寬度   e.currentTarget = 被點擊的元素 
  const clickX = e.offsetX; // e.offsetX = 點擊的位置
  const duration = audio.duration; //音樂總長度

  audio.currentTime = (clickX / width) * duration; //點擊位置 / 總寬 = 播放比例 ; audio.currentTime = 總長度 ;audio.currentTime = 目前播放秒數 
}

//時間格式化
function formatTime(time) {
  if (isNaN(time)) return "0:00"; //isNaN = 檢查值是不是不是數字(全名is Not a Number)

  const min = Math.floor(time / 60); //Math.floor()=取整數（去掉小數）
  const sec = Math.floor(time % 60);

  return `${min}:${sec < 10 ? "0" + sec : sec}`; //補0-->1:05（不是 1:5）; 
}                                                //? =「如果…就…」
                                                 //: =「否則…」 簡單說* 一行 if else *
                                                 //模板字串 `${min}:${sec}` 組成字串 --> 回傳文字 → "分:秒" $ = 字串 // ` = 包住字串
//--------------------------------

let currentIndex = 0;

//畫面左側點擊切歌功能
function playSong(index) {
  currentIndex = index;
  const song = songs[index];

  audio.src = song.src; //換音樂
  title.textContent = song.title; //換歌名
  cover.src = song.cover; //換封面

  audio.play(); //切歌後直接播放
}

//控制播放暫停狀態
function togglePlay() { //呼叫 HTML 按鈕的 togglePlay()

  if (audio.paused) { //if判斷是 true → 暫停 false → 播放 ; audio.paused = 是否暫停
    audio.play(); //播放行為 audio.play() = 播放

  } else {
    audio.pause(); //暫停行為 audio.pause() = 暫停
  }

}