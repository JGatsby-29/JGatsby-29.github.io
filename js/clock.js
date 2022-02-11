const currentTime = document.querySelector('.timer')
const greetText = document.querySelector('.timer-content')

function greetingMessage(hour) {
  console.log(hour)
  if (hour > 5 && hour < 11) greetText.textContent = `Good Morning`
  else if (hour >= 11 && hour < 14) greetText.textContent = 'Have a Good Lunch.'
  else if (hour >= 14 && hour < 17) greetText.textContent = 'Good Afternoon.'
  else if (hour >= 17 && hour < 23) greetText.textContent = `즐거운 저녁입니당`
  else greetText.textContent = '오늘 하루는 잘 보냈어?'
}

function getCurrentTime() {
  const date = new Date()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()

  currentTime.textContent = `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
  // 시분초가 10보다 작으면 앞에 0붙여주기

  greetingMessage(hour)
  // greeting.js에 시간을 보내주고 시간에 맞게끔 텍스트 출력
}

if (currentTime) {
  getCurrentTime()
  setInterval(getCurrentTime, 1000)
  // 1초마다 값가져오기
}
