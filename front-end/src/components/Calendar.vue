<template lang="html">
  <div class="calendar-container">
    <div id="calendar">
      <div id="calendar-header">
        <div id="selected-month">{{monthString}} {{year}}</div>
        <div id="calendar-month-selectors">
          <div id="prev-month-selector" @click="prevMonth()"><img src="https://img.icons8.com/material-outlined/30/000000/back--v1.png"/></div>
          <div id="next-month-selector" @click="nextMonth()"><img src="https://img.icons8.com/material-rounded/30/000000/forward.png"/></div>
        </div>
      </div>
      <div id="days-of-week">
        <div class="day-of-week">SUN</div>
        <div class="day-of-week">MON</div>
        <div class="day-of-week">TUE</div>
        <div class="day-of-week">WED</div>
        <div class="day-of-week">THU</div>
        <div class="day-of-week">FRI</div>
        <div class="day-of-week">SAT</div>
      </div>
      <div id="calendar-days">
        <div class='calendar-day' v-for='day in days'  v-bind:class="{'off-month': !day.isCurrentMonth, 'event': monthlyEvents.length > 0}" v-bind:key='day.date.toString()'>
          <div class="dayNum">{{day.dayOfMonth}}</div>
          <div class="event" v-for='event in events' v-bind:key="event.date.toString()"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Calendar',
  components: {

  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      events: []
    }
  },
  computed: {
    days: function() {
      var currentMonthDays = this.createCurrentMonth(this.year, this.month, new Date(this.year, this.month+1, 0).getDate());
      var previousMonthDays = this.createPreviousMonth(currentMonthDays, this.year, this.month);
      var nextMonthDays = this.createNextMonth(this.year, this.month);

      return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
      // loadEvents(previousMonthDays.length, year, month);
    },
    monthlyEvents: function() {
      return this.events.filter(event => event.date.getFullYear == this.year && event.date.getMonth == this.month);
    },
    monthString: function() {
      switch (this.month) {
        case 0:
          return 'January';
        case 1:
          return 'February';
        case 2:
          return 'March';
        case 3:
          return 'April';
        case 4:
          return 'May';
        case 5:
          return 'June';
        case 6:
          return 'July';
        case 7:
          return 'August';
        case 8:
          return 'September';
        case 9:
          return 'October';
        case 10:
          return 'November';
        case 11:
          return 'December';
        default:
          return 'not a month';
      }
    }
  },
  methods: {
    createCurrentMonth: function(year, month, daysInMonth) {
      if (this.$root.$data.user) {
        this.events = this.getEvents(year, month);
      }
      return [...Array(daysInMonth)].map((day, index)=> {
        return {
          date: new Date(year, month, index + 1),
          dayOfMonth: index + 1,
          isCurrentMonth: true,
          events: this.events,
        };
      })
    },
    getEvents: async function(year, month) {
      try {
        this.response = await axios.get("/api/events", {params: {year, month}});
        return this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    createPreviousMonth: function(currentMonthDays, year, month) {
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
    prevMonth: function() {
      let currentDate = new Date(this.year, this.month);
      let newDate = new Date(currentDate.setMonth(currentDate.getMonth()-1));
      this.month = newDate.getMonth();
      this.year = newDate.getFullYear();
    },
    nextMonth: function() {
      let currentDate = new Date(this.year, this.month);
      let newDate = new Date(currentDate.setMonth(currentDate.getMonth()+1));
      this.month = newDate.getMonth();
      this.year = newDate.getFullYear();
    },
  },


}
</script>

<style lang="css" scoped>
.calendar-container {
  height: fit-content;
  display: flex;
  justify-content: center;
  font-family: 'Urbanist', sans-serif;
  flex-grow: 1;
}

#calendar {
  width: 80%;
  height: fit-content;
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 30px;
}

#calendar-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px;
  font-size: 30px;
  font-weight: 700;
}

#calendar-month-selectors {
  display: flex;
}

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
  min-height: 100px;
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
