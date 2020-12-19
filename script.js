let nextDate, birthday, howManyDays, monthDiff,
    today = Date.parse(new Date()),
    thisMonth = new Date().getMonth();
$('#birth').change(function () {
    birthday = Date.parse($(this).val());
    birthMonth = new Date(birthday).getMonth();
    howManyDays = Math.floor((today - birthday) / 86.4e6);
    if (thisMonth == birthMonth) {
        monthDiff = 12;
    } else if (birthMonth > thisMonth) {
        monthDiff = birthMonth - thisMonth;
    } else {
        monthDiff = birthMonth + 12 - thisMonth;
    }

});

let lastNum, error;
$('#name').change(function () {
    let name = $('#name').val().split(' ');
    error--;
    $('.error').remove();
    if(name.length == 3){
        if(isNaN(Number(name[2].slice(-2))) || (name[0].length + name[1].length + name[2].length > 30)){
            $(this).after('<span class="error">Ваше имя должно состоять из трез слов общей длиной не более 30 символов, также третье слово должно заканчиваться двумя цифрами!</span>');
            $('[type=submit]').attr('disabled','disabled');
            error = 1;
        } else {
            lastNum = Number(name[2].slice(-2));
            error = -1;
        }
    } else {
        $(this).after('<span class="error">Ваше имя должно состоять из трез слов общей длиной не более 30 символов, также третье слово должно заканчиваться двумя цифрами!</span>');
        $('[type=submit]').attr('disabled','disabled');
        error = 1;
    }

    if (error == -1) {
        $('[type=submit]').removeAttr('disabled');
    }
});

let checkedRadio = $('[name=number][checked]').val()
$('[name=number]').change(function () {
    checkedRadio = $(this).val();
});

function digitalRoot(n) {
  if (n < 10)
      return n;
  var s = 0;
  while(n) {
    s += n % 10;
    n = ~~(n / 10);
  }
  return digitalRoot(s);
}

$('#form').on('submit', function () {
    $.ajax({
        method: 'POST',
        url: 'test.php',
        dataType: 'text',
        data: {
            num: digitalRoot(checkedRadio + lastNum)
        },
        success: function (data) {
            $('.response-title').text('Вы похожи на этого персонажа');
            $('.response').css('background','#ccc');
            $('.response').append('<img src="' + data + '">');
            $('.response').append('<p>Вы прожили ' + howManyDays + ' дней, до следующего дня рождения ' + monthDiff + ' месяцев</p>');

            $('[type=submit]').attr('disabled', 'disabled');
            $('[type=submit]').val('Вот и все');
        }
    })

    return false;
})
