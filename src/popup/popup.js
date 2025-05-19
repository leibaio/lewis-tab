// https://openf1.org

console.log("[ 1111 ] >");

// 获取赛程数据并显示到页面上
async function getSessionData() {
  try {
    const response = await fetch(
      "https://api.openf1.org/v1/sessions?year=2025"
    );
    const data = await response.json();
    console.log("[ 2222 ] >", data);

    // 获取赛程列表容器
    const raceList = document.getElementById("race-list");

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
  } catch (error) {
    console.error("Error fetching race schedule:", error);
  }
}

// 调用函数获取并显示赛程
getSessionData();
