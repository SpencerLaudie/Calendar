<template>
  <div class="create-event-container">
    <div class="create-event">
      <form class="" @submit.prevent="create">
        <legend>Create an Event</legend>
        <input v-model='title' placeholder="title">
        <v-date-picker v-model='date' color="#f6a192" elevation='10'></v-date-picker>
        <button type="submit" class="button">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CreateEvent',
  data() {
    return {
      title: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      error: '',
    }
  },
  methods: {
    async create() {
      try {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('date', this.date);
        await axios.post("/api/events", formData);
        this.title = '';
        this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
