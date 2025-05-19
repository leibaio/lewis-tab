// https://openf1.org

console.log("[ 1111 ] >");
const driverNumber = 44;
const year = new Date().getFullYear();
const nextRaceDiv = document.querySelector(".next-race");
const raceList = document.getElementById("race-list");

let lastRank = 0;
const lastRaceInfo = {};
const nextRaceInfo = {};

// 下一场比赛
async function nextRace() {
  const response = await fetch(
    `https://api.openf1.org/v1/sessions?year=${year}`
  );
  const data = await response.json();

  const now = new Date();
  let nextRace = null;

  console.log("[ new Date() ] >", new Date());

  for (const session of data) {
    const sessionDate = new Date(session.date_start);

    console.log("[ session.date_start ] >", session.date_start);
    console.log("[ sessionDate ] >", sessionDate);
    console.log("[ now ] >", now);
    console.log("[ sessionDate > now ] >", sessionDate > now);

    if (sessionDate > now) {
      nextRace = session;
      console.log("[ sessionDate1 ] >", sessionDate);
      break;
    }
  }

  if (nextRace) {
    displayNextRace(nextRace);
    displayRaceList(data);
  } else {
    nextRaceDiv.textContent = "No upcoming races.";
  }
}

// 显示下一场比赛的倒计时
function displayNextRace(race) {
  const raceDate = new Date(race.date_start);
  const countdown = calculateCountdown(raceDate);

  const countdownText = `
    Next Race: ${race.session_name} at ${race.location}<br>
    Countdown: ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds
  `;

  nextRaceDiv.innerHTML = countdownText;
}

// 计算倒计时
function calculateCountdown(raceDate) {
  const now = new Date();
  const diff = raceDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

// 显示赛程列表
function displayRaceList(races) {
  const now = new Date();
  const upcomingRaces = races.filter((race) => new Date(race.date_start) > now);

  upcomingRaces.forEach((race) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${race.session_name} at ${
      race.location
    } - ${new Date(race.date_start).toLocaleString()}`;
    raceList.appendChild(listItem);
  });
}

async function getSessionData() {
  const response = await fetch(
    `https://api.openf1.org/v1/sessions?year=${year}`
  );
  const data = await response.json();
  console.log("[ 2222 ] >", data);

  // 清空之前的赛程列表
  raceList.innerHTML = "";

  // 遍历赛程数据并添加到页面
  data.forEach((session) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${session.session_name} - ${new Date(
      session.date_start
    ).toLocaleString()}`;
    raceList.appendChild(listItem);
  });
}

async function getRaceInfo() {
  const response = await fetch(
    `https://api.openf1.org/v1/position?session_key=latest&driver_number=${driverNumber}`
  );
  const data = await response.json();
  lastRank = data[data.length - 1].position;
  document.querySelector(".last-rank").textContent = `P${lastRank}`;
}

getRaceInfo();

// nextRace();
