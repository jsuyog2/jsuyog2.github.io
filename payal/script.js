var width, datePicker;
init();
function init() {
  addDate();
}

function addDate() {
  $(".container").html(`
    <div class="row date">
        <div class="input-field col s12">
            <input type="text" class="datepicker" id="anniversary_date">
            <label for="anniversary_date">Select Date</label>
        </div>
    <div class="col s12 warning_message">You have selected the wrong date!</div>
</div>`);
  datePicker = $(".datepicker").datepicker({
    autoClose: true,
    onSelect: dateSelect,
  });

  $(".date").fadeIn("slow", "swing");
}

function dateSelect(date) {
  var anniversary_date = new Date("10 April 2022").getTime();
  if (anniversary_date == date.getTime()) {
    $(".date").fadeOut("slow", "swing", () => {
      addHeart();
      $(".img").fadeIn("slow", "swing");
      $(".warning_message").fadeOut("slow", "swing");
      var instance = M.Datepicker.getInstance(datePicker);
      instance.destroy();
    });
  } else {
    $(".warning_message").fadeIn("slow", "swing");
  }
}

function addHeart() {
  $(".container").html(`<div class="row img">
  <div class="col s12"><h6>click here</h6></div>
  <div class="col s12 icon"><img onClick="increaseHeart()" class="responsive-img center_img" src="heart.png"></div>
  </div>`);
  width = $(".icon img").width();
}

function increaseHeart() {
  width = width * 1.5;
  $(".icon img").width(width);
  if (width > 250) {
    $(".img").fadeOut("slow", "swing", () => {
      $(".icon img").width(50);
      width = $(".icon img").width();
      addLines();
    });
  }
}

function addLines() {
  $(".container").html(`<div class="row text">
    <div class="row line l1">Having you by my side</div>
    <div class="row line l2">is what completes me,</div>
<div class="row line l3">makes me and fulfils me.</div>
<div class="row line l4">You complete me.</div>
<div class="row line l5">So marry me and complete the circle with me!</div>
<div class="row line l6">Payal Amle Love You <span style="color: red;">♥</span></div>
<div class="row line l7"><a style="margin-top: 50px;" id="retry" class="waves-effect waves-light btn" onClick="retry()">Retry</a></div>
</div>`);
  showLines(1);
}

function showLines(i) {
  $(".line.l" + i).fadeIn("slow", "swing", () => {
    i++;
    showLines(i);
  });
}
function retry() {
  $(".text .line").fadeOut("slow", "swing", () => {
    init();
  });
}
