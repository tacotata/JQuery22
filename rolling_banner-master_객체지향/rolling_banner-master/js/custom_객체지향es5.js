const listBox = $('.listBox')
// const ul = listBox.children('ul');
let num = 0
let timer = null

//초기화 함수 호출
init()

timer = setInterval(move, 10)

listBox.on('mouseenter', function () {
  clearInterval(timer)
})

listBox.on('mouseleave', function () {
  timer = setInterval(move, 10)
})

//리스트 클리시 해당 li의 a요소 주소값을 callData에 인수로 전달해서 데이처 출력
listBox.find('ul li').on('click', function (e) {
  e.preventDefault()
  const url = $(e.currentTarget).find('a').attr('href')
  console.log(url)
  callData(url)
})

$('body').on('click', '.btnClose', removePop)

//동적으로 리스트 생성하는 함수 정의
function init() {
  listBox.append('<ul class="list">')

  for (var i = 1; i <= 10; i++) {
    $('.list').append(
      $('<li>').append(
        $('<a>')
          .attr({ href: 'add' + i + '.html' })
          .append(
            $('<img>').attr({
              src: 'img/s' + i + '.jpg',
              alt: i,
            }),
          ),
      ),
    )
  }
}

function move() {
  if (num <= -240) {
    num = 0
    listBox.find('li').eq(0).appendTo('ul')
  } else {
    num -= 2
  }
  listBox.find('ul').css({ marginLeft: num })
}

//파라미터로 호출할 데이터 주소를 넣어서 성공시 데이터값 받는 함수

function callData(url) {
  $.ajax({
    url: url,
    success: function (data) {
      console.log(data)
      createPop(data)
    },
    error: function (err) {
      console.log(err)
    },
  })
}

function createPop(data) {
  $('.pop').remove()

  $('body').append(
    $('<aside class="pop">').append(
      $('<div class="con">').html(data),
      $('<span class="btnClose">').text('close'),
    ),
  )

  $('.pop').fadeIn()
  // return false
}

function removePop() {
  $('.pop').fadeOut(500, function () {
    $('.pop').remove()
  })
}

/*
  미션 1 - init함수를 통해서 로딩시 초기 10개의 li가 동적으로 생성
  미션 2 - 이벤트 위임을 통해서 리스트 이벤트 연결
  미션 3 - es5 버전 객체지향 
  미션 4 - es6 버전 객체지향
*/
