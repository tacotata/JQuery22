/**
 * 쿠키쿠키 사용자 정보 값 저장저장
 * 쿠키: 사용자 컴퓨터에 저장되는 정보값
 * 쿠키이름=쿠키값: path=/; expires=삭제할 날짜
 *
 */

const btnView = $('.view');
const btnDel = $('.del');
const popup = $('#popup');
const btnClose = popup.find('.close');

//today=done//쿠키있으면 0 없으면 -1 반환
const isCookie = document.cookie.indexOf('today=done');
let isActive = '';
console.log(isCookie);
//쿠키있으면 0 없으면 -1 반환
//쿠키가 없으면 팝업이 보임 있으면 안보임(
isCookie === -1 ? (isActive = 'block') : (isActive = 'none');

popup.css('display', isActive);

btnView.on('click', e => {
  e.preventDefault();
  console.log(document.cookie);
});

btnDel.on('click', e => {
  e.preventDefault();
  setCookie('today', 'done', 0);
  alert('쿠키 삭제 완료');
});

//팝업 닫기 이벤트
btnClose.on('click', e => {
  e.preventDefault();
  //체크박스 체크시 쿠키 생성
  const isChecked = popup.find('input').is(':checked');

  if (isChecked) setCookie('today', 'done', 1);

  popup.fadeOut(500);
});

setCookie('today', 'done', 1);

//
function setCookie(name, value, due) {
  //현재 시간에서 오늘 날짜 데이터만 가져옴
  const today = new Date();
  const date = today.getDate();
  //오늘 날짜에 due 인수로 받은 값을 더해서 다시 현재 시간값으로 변경
  today.setDate(date + due);
  const dueddate = today.toGMTString();
  //변경된 날짜값을 쿠키 생성
  document.cookie = `${name}=${value};path=/;expires=${dueddate}`;
}
