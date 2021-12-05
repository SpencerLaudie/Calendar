<template>
  <div class="home">
    <Calendar/>
  </div>
</template>

<script>
import Calendar from '../components/Calendar.vue';
export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  width: 100%;
  display: flex;
}
</style>
