class Banner {
  constructor(el) {
    this.init(el)
    this.bindingEvent()
  }

  init(el) {
    this.listBox = $(el)
    this.num = 0
    this.timer = null
  }

  bindingEvent() {
    this.createList()
    this.timer = setInterval(this.move.bind(this), 10)
    this.listBox.on('mouseenter', () => clearInterval(this.timer))
    this.listBox.on(
      'mouseleave',
      () => (this.timer = setInterval(this.move.bind(this), 10)),
    )
    this.listBox.find('ul li').on('click', (e) => {
      e.preventDefault()
      const url = $(e.currentTarget).find('a').attr('href')
      this.callData(url)
    })
    $('body').on('click', '.btnClose', this.removePop)
  }

  createList() {
    this.listBox.append('<ul class="list">')
    let tags = ''

    for (var i = 1; i <= 10; i++) {
      tags += `
      <li>
        <a href='add${i}.html'>
          <img src='img/s${i}.jpg'>
        </a>
      </li>
      `
    }

    $('.list').html(tags)
  }

  move() {
    if (this.num <= -240) {
      this.num = 0
      this.listBox.find('li').eq(0).appendTo('ul')
    } else {
      this.num -= 2
    }
    this.listBox.find('ul').css({ marginLeft: this.num })
  }

  callData(url) {
    $.ajax({
      url: url,
      success: (data) => {
        this.createPop(data)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  createPop(data) {
    $('.pop').remove()

    $('body').append(
      $('<aside class="pop">').append(
        $('<div class="con">').html(data),
        $('<span class="btnClose">').text('close'),
      ),
    )

    $('.pop').fadeIn()
  }

  removePop() {
    $('.pop').fadeOut(500, function () {
      $('.pop').remove()
    })
  }
}
