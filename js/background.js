async function setRenderBackground() {
  // https://picsum.photos/1920/1080
  const result = await axios.get("https://source.unsplash.com/collection/8469893/1920x1080", {
    responseType: "blob"
    // blob = Binary Large Object
    // 파일류의 불변하는 미가공 데이터, 텍스트 이진데이터 형태로 읽을 수 있다
    // 컴퓨터가 읽을 수 있도록 이진으로 바꿔준다
  })
  console.log(result.data)
  // 데이터 받아왔는데, 이미지다 보니까 깨져있다.
  // pending 중이라 해결하기 위해 async/awiat 사용

  const data = URL.createObjectURL(result.data)
  // createObjectURL -> 주어진 객체를 가리키는 URL을 STRING으로

  console.log(data)

  document.querySelector("body").style.backgroundImage = `url(${data})`
}

setRenderBackground()
setInterval(() => {
  setRenderBackground()
}, 20000)