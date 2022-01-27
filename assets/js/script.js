var tasks = {};

// gets current date and makes it into a string in the variable of today 
var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
    dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear()
var today = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

// adds current date to header
$('#currentDay').text(today);

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("workTasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = {
      9: [],
      10: [],
      11: [],
      12: [],
      13: [],
      14: [],
      15: [],
      16: [],
      17: [],
      18: []
    };
  }

  $.each(tasks, function(time, arr) {
      arr.forEach(function(task) {
          var pTask = $('<p>').addClass('col-md-9 mb-0 task-text');
          pTask.text(task);
          $('#' + time).children('textarea').replaceWith(pTask);
      });
  });
};

// on save button click convert text area value to an h4 element
$('.row').on('click', 'button', function() {
    var text = $(this).closest('div').children('textarea').val();
    var task = $('<p>').addClass('col-md-9 mb-0 task-text').text(text);
    $(this).closest('div').children('textarea').replaceWith(task);

    var timeOfDay = $(this).closest('div').attr('id');
    tasks[timeOfDay][0] = text;
    saveTask();
    auditTimeOfDay();
});

// on h4 element click creat text area
$('.row').on('click', 'p', function() {
    var text = $(this).text().trim();
    var textInput = $('<textarea>').addClass('col-md-9 mb-0').val(text);
    $(this).replaceWith(textInput);
    textInput.trigger('focus');
});

var auditTimeOfDay = function() {
    for (var i = 9; i < 19; i++) {
        var rowEl = $('#' + [i]).children('textarea');
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        if (i < currentHour) {
            rowEl.addClass('past');
        } else if (i === currentHour) {
            rowEl.addClass('present');
        } else if (i > currentHour) {
            rowEl.addClass('future');
        }
        var rowEl2 = $('#' + [i]).children('p');
        if (i < currentHour) {
            rowEl2.addClass('past');
        } else if (i === currentHour) {
            rowEl2.addClass('present');
        } else if (i > currentHour) {
            rowEl2.addClass('future');
        }
    };
};

var saveTask = function() {
    localStorage.setItem('workTasks', JSON.stringify(tasks));
};

loadTasks();
auditTimeOfDay();

setInterval(function() {
    auditTimeOfDay();
}, 1800000);