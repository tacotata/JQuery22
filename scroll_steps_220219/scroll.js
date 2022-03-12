/*
브라우저를 스크롤시 발생하는 스크롤 거리값 : scrollTop()(동적)
DOM요소의 세로 위치값 : offset().top (정적)


*/
//박스의 갯수만큼 반복을 돌면서 세로 위치값을 배열에 저장
//유사배열
//3개인수idx, data , arr
const boxs = $('section')
const btns = $('#navi li')
const speed = 1000
let posArr = null

let enableClick = true

setPos()

$(window).on('resize', function () {
  setPos()
  const activeIndex = btns.filter('.on').index()
  window.scroll(0, posArr[activeIndex])
})
//버튼 클릭시 posArr배열의 세로 위치값으로 자동 이동
btns.on('click', function (e) {
  const isOn = $(e.currentTarget).hasClass('on')
  const i = $(e.currentTarget).index()
  if (enableClick && !isOn) {
    enableClick = false
    moveScroll(i)
  }
})

//크로스 브라우징
//브라우저 스크롤시 스크롤값을 박스위치값과 비교해서 조건문으로 버튼 활성화
$(window).on('scroll', function () {
  let scroll = $(window).scrollTop()

  btns.each(function (idx) {
    if (scroll >= posArr[idx]) {
      btns.removeClass('on')
      btns.eq(idx).addClass('on')
    }
  })
})

//deltaY 값 확인으로 가능
boxs.on('mousewheel', function (e) {
  e.preventDefault()
  //0보다 크면 휠을 내린거
  if (e.originalEvent.detaY > 0) {
    console.log('wheel down')
  }
  if (e.originalEvent.detaY < 0) {
    console.log('wheel up')
  }
})

function setPos() {
  posArr = []
  //박스의 갯수만큼 반복을 돌면서 세로 위치값을 배열에 저장
  boxs.each(function (idx) {
    posArr.push(boxs.eq(idx).offset().top)
  })
  console.log(posArr)
}

function moveScroll(index) {
  console.log('moveScroll')

  //stop으로 이벤트 큐를 제거 하고 있음
  $('html,body')
    .stop()
    .animate({ scrollTop: posArr[index] }, speed, function () {
      enableClick = true
    })
}

/*
활성화 버트 ㄴ재클릭 방지 
현재 ui 기능에서 문제점 찾고 해결방법 알아보기 
 */
