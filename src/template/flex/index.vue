<template>
  <main id="calendar">
    <section class="th">
      <span>Sunday</span>
      <span>Monday</span>
      <span>Tuesday</span>
      <span>Wednesday</span>
      <span>Thursday</span>
      <span>Friday</span>
      <span>Saturday</span>
    </section>
    <div class="week">
      <div />
      <div />
      <div />
      <div data-date="1" />
      <div data-date="2" />
      <div data-date="3" />
      <div data-date="4" />
    </div>
    <div class="week">
      <div data-date="5" />
      <div data-date="6" />
      <div data-date="7" />
      <div data-date="8" />
      <div data-date="9" />
      <div data-date="10" />
      <div data-date="11" />
    </div>
    <div class="week">
      <div data-date="12" />
      <div data-date="13" />
      <div data-date="14" />
      <div data-date="15" />
      <div data-date="16" />
      <div data-date="17" />
      <div data-date="18" />
    </div>
    <div class="week">
      <div data-date="19" />
      <div data-date="20" />
      <div data-date="21" />
      <div data-date="22" />
      <div data-date="23" />
      <div data-date="24" />
      <div data-date="25" />
    </div>
    <div class="week">
      <div data-date="26" />
      <div data-date="27" />
      <div data-date="28" />
      <div data-date="29" />
      <div data-date="30" />
      <div data-date="31" />
      <div />
    </div>
  </main>
</template>

<script>
export default {
  data: function() {
    return {}
  }
}
</script>

<style scoped>

/* Basic Reset + 100% Height */
html,body{margin:0;padding:0;border:0;font-size:100%;height:100%}
body {font: 0.8em/1.5em 'Arial', sans-serif;}

/* Calendar 100% height */
#calendar { height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
}
/* Above only works if child weeks aren't displayed as flex... */
/* Uncomment to see what I mean */

.th {
    flex: 30px 0 0;
}
.week {
    flex: 30px 1 0;
    border-bottom: 1px solid #ccc;
}

/* Calendar rows */
.th, .week { display: flex; }
.th>span {
    border-bottom: 4px solid rgba(255,0,0,0.3);
    padding: 0 2px 2px 0;
    text-align: right;
}
.week>div {
    border-top: 1px solid #eee;
    padding: 20px 2px 2px;
    min-height: 50px;
    position: relative; /* allow ::after psuedo element absolute positioning */
}
.th>span, .week>div {
    width: 100%;
    margin-right: 5px;
    color: #333;
}
/* Dates */
.week>div::after {
    content: attr(data-date);
    display: block;
    position: absolute;
    top: 0; right: 2px;
    color: #999;
}
/* Weekends */
.th>span:first-child, .th>span:last-child, .week>div:first-child, .week>div:last-child {background:#f3f3f3}
.th>span:last-child, .week>div:last-child {margin-right:0}
</style>
