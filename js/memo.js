function getMemo() {
  const memo = document.querySelector(".memo")
  const memoValue = localStorage.getItem("todo")
  memo.textContent = memoValue
  // memo div에다가 로컬저장소에서 가져와가지고 보여줄 거임
}

function setMemo() {
  const memoInput = document.querySelector('.memo-input')
  memoInput.addEventListener("keyup", function(e) {
    // 키가 떼졌을 때, 이벤트를 불러온다
    if(e.code === "Enter" && e.currentTarget.value) {
      // 그런데 그 이벤트 키가 "엔터"일 때 && 값이 있을 때
      localStorage.setItem("todo", e.currentTarget.value) // todo 키에 저장함과 동시에 세팅
      getMemo()
      memoInput.value = ""
    }
  })
}

function deleteMemo() {
  document.addEventListener("click", function(e) {
    if(e.target.classList.contains("memo")) {
      localStorage.removeItem("todo")
      // 로컬에 있는 걸 없애 버림
      e.target.textContent = ""
    }
  })
}

deleteMemo()
setMemo()