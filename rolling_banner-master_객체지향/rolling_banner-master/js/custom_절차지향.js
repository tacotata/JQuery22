function Banner(el) {
  this.init(el)
  this.bindingEvent()
}

Banner.prototype.init = function (el) {
  this.listBox = $(el)
  this.num = 0
  this.timer = null
}

Banner.prototype.bindingEvent = function () {
  this.createList()
  this.timer = setInterval(this.move.bind(this), 10)

  this.listBox.on(
    'mouseenter',
    function () {
      clearInterval(this.timer)
    }.bind(this),
  )

  this.listBox.on(
    'mouseleave',
    function () {
      this.timer = setInterval(this.move.bind(this), 10)
    }.bind(this),
  )

  this.listBox.find('ul li').on(
    'click',
    function (e) {
      e.preventDefault()
      const url = $(e.currentTarget).find('a').attr('href')
      this.callData(url)
    }.bind(this),
  )

  $('body').on('click', '.btnClose', this.removePop)
}

Banner.prototype.createList = function () {
  this.listBox.append('<ul class="list">')

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

Banner.prototype.move = function () {
  if (this.num <= -240) {
    this.num = 0
    this.listBox.find('li').eq(0).appendTo('ul')
  } else {
    this.num -= 2
  }
  this.listBox.find('ul').css({ marginLeft: this.num })
}

Banner.prototype.callData = function (url) {
  $.ajax({
    url: url,
    success: function (data) {
      this.createPop(data)
    }.bind(this),
    error: function (err) {
      console.log(err)
    },
  })
}

Banner.prototype.createPop = function (data) {
  $('.pop').remove()

  $('body').append(
    $('<aside class="pop">').append(
      $('<div class="con">').html(data),
      $('<span class="btnClose">').text('close'),
    ),
  )

  $('.pop').fadeIn()
}

Banner.prototype.removePop = function () {
  $('.pop').fadeOut(500, function () {
    $('.pop').remove()
  })
}
