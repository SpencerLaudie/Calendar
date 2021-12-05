<template lang="html">
  <div id="calendar-days">
    <div class='calendar-day' v-for='day in days' v-bind:key='day.date.toString()'>
      <div class="dayNum">{{day.dayOfMonth}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarDays",
  props: {
    initialYear: Number,
    initialMonth: Number
  },
  data() {
    return {
      year: this.initialYear,
      month: this.initialMonth
    }
  },
  computed: {
    days: function() {
      console.log('in create calendar method');
      var currentMonthDays = this.createCurrentMonth(this.year, this.month, new Date(this.year, this.month+1, 0).getDate());
      var previousMonthDays = this.createPreviousMonth(currentMonthDays, this.year, this.month);
      var nextMonthDays = this.createNextMonth(this.year, this.month);

      return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
      // loadEvents(previousMonthDays.length, year, month);
    },
  },
  methods: {
    createCurrentMonth: function(year, month, daysInMonth) {
      console.log('in create current month method');
      return [...Array(daysInMonth)].map((day, index)=> {
        return {
          date: new Date(year, month, index + 1),
          dayOfMonth: index + 1,
          isCurrentMonth: true
        };
      })
    },
    createPreviousMonth: function(currentMonthDays, year, month) {
      console.log('in create previous month method');
      const numVisibleDaysPrevMonth = currentMonthDays[0].date.getDay();

      var prevDays = new Date(year, month, 1);
      prevDays.setDate(prevDays.getDate()-numVisibleDaysPrevMonth);

      return [...Array(numVisibleDaysPrevMonth)].map((day, index) => {
        return {
          date: new Date(prevDays.getFullYear(), prevDays.getMonth(), prevDays.getDate() + index),
          dayOfMonth: prevDays.getDate() + index,
          isCurrentMonth: false
        };
      });
    },
    createNextMonth: function(year, month) {
      console.log('in create next month method');
      const lastDayOfTheMonthWeekday = new Date(year, month+1, 0).getDay();

      const nextMonth = new Date(year, month+1, 1);

      const numberVisibleNextMonth = 6 - lastDayOfTheMonthWeekday;

      return [...Array(numberVisibleNextMonth)].map((day, index) => {
        return {
          date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), index + 1),
          dayOfMonth: index + 1,
          isCurrentMonth: false
        };
      });
    },
  },
}
</script>

<style lang="css" scoped>
#days-of-week,
#calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

#days-of-week {
  text-align: center;
}

.day-of-week {
  height: 30px
}

.calendar-day {
  min-height: 125px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
}

.off-month {
  background-color: #efefef;
}

.dayNum {
  font-family: 'Azeret Mono', sans-serif;
  align-self: flex-end;
}
</style>
