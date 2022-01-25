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

// on save button click convert text area value to an h4 element
$('.row').on('click', 'button', function() {
    var text = $(this).closest('div').children('textarea').val();
    var task = $('<p>').addClass('col-md-9 mb-0 task-text').text(text);
    $(this).closest('div').children('textarea').replaceWith(task);

    var timeOfDay = $(this).closest('div').attr('id');
    tasks[timeOfDay].text = text
    //saveTask();
});

// on h4 element click creat text area
$('.row').on('click', 'p', function() {
    var text = $(this).text().trim();
    var textInput = $('<textarea>').addClass('col-md-9 mb-0').val(text);
    $(this).replaceWith(textInput);
    textInput.trigger('focus');
});