class CookiePop {
  constructor(selector, opt) {
    this.init(selector, opt);
    this.bindingEvent();
  }

  init(selector, opt) {
    this.btnView = $('.view');
    this.btnDel = $('.del');
    this.popup = $(selector);
    this.btnClose = this.popup.find('.close');
    this.cookieName = opt.cookieName;
    this.cookieValue = opt.cookieValue;
    this.arr = [this.cookieName, this.cookieValue];
    this.cookies = this.arr.join('=');
    this.isCookie = document.cookie.indexOf(this.cookies);
    this.isActive = '';
  }

  bindingEvent() {
    this.isCookie === -1 ? (this.isActive = 'block') : (this.isActive = 'none');
    this.popup.css('display', this.isActive);

    this.btnView.on('click', e => {
      e.preventDefault();
      console.log(document.cookie);
    });

    this.btnDel.on('click', e => {
      e.preventDefault();
      this.setCookie(this.cookieName, this.cookieValue, 0);
      alert('쿠키 삭제 완료');
    });

    this.btnClose.on('click', e => {
      e.preventDefault();

      const isChecked = this.popup.find('input').is(':checked');
      if (isChecked) this.setCookie(this.cookieName, this.cookieValue, 1);
      this.popup.fadeOut(500);
    });
  }

  setCookie(name, value, due) {
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + due);
    const duedate = today.toGMTString();
    document.cookie = `${name}=${value}; path=/; expires=${duedate}`;
  }
}
