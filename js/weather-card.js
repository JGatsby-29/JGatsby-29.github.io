// const weatherTextButton = document.querySelector('.weather-header');

const API_KEY2 = 'e896b25822ba91b260857a5d72755484'

function getPosition(options) {
  return new Promise(function (resolve, reject) {
    window.navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

async function getWeather(lat, lon) {
  console.log(lat, lon)
  // 위도 경도가 있으면 본인 걸로 리턴
  if (lat && lon) {
    const data = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY2}&units=metric`)
    return data
  }

  // 없으면 서울, 각 리턴 값
  const data = await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=2719e331e07a6af0547cfe7df2754c8c')
  return data
}

async function renderWeather() {
  let lat = ""
  let lon = ""

  try {
    const position = await getPosition()
    lat = position.coords.latitude
    lon = position.coords.longitude
  } catch {

  }

  const result = await getWeather(lat, lon)

  const weatherData = result.data
  // 배열이 너무 많아서 오전, 오후만 볼 수 있게 해주자
  // 현재 
  const weatherList = weatherData.list.reduce((acc, cur) => {
    if ((cur.dt_txt.indexOf("18:00:00")) > 0) {
      acc.push(cur)
    }
    return acc
  }, [])

  console.log(weatherList)

  const temp = weatherList[0].main.temp
  const name = weatherData.city.name
  // weatherTextButton.textContent = `${Math.round(temp)}℃, ${name}`

  // 모달 창 안에 넣어주기
  const modalBody = document.querySelector('.modal-body')

  // 각 요소들을 temp만 추출하도록 매핑해준다
  modalBody.innerHTML = weatherList.map((e) => {
    return weatherWrapperComponent(e)
  })
}

function weatherWrapperComponent(e) {

  return `
    <div class="card" style = "width: 18rem;" >
      <div class="card-header text-center">
        ${e.dt_txt.split(" ")[0]}
      </div>
      <div class="card-body">
        <h5>${e.weather[0].main}</h5>
        <img src="${matchIcon(e.weather[0].main)}" class="card-img-top" alt="...">
        <p class="card-text">${e.main.temp}</p>
      </div>
    </div>
    `
}

function matchIcon(weatherData) {
  if (weatherData === "Clear") return "/images/039-sun.png"
  if (weatherData === "Clouds") return "/images/001-cloud.png"
  if (weatherData === "Rain") return "/images/003-rainy.png"
  if (weatherData === "Snow") return "/images/006-snowy.png"
  if (weatherData === "Thunderstorm") return "/images/008-storm.png"
  if (weatherData === "Drizzle") return "/images/031-snowflake.png"
  if (weatherData === "Atomsphere") return "/images/033-hurricane.png"
}

renderWeather()


