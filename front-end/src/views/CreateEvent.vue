<template>
  <div class="create-event-container">
    <div class="create-event-box">
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
.create-event-container {
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
}

.create-event-box {
  width: fit-content;
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border-radius: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;

}

form legend {
  font-weight: 700;
  font-size: 25px;
}

input {
  margin-top: 10px;
  border: none;
  border-bottom: 2px solid #B5B5B5;
  padding: 8px 0;
}

input:focus {
  outline: none;
}

.button {
  margin-top: 20px;
  width: fit-content;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  font-weight: bold;
  color: white;
  background-color: #f6a192;
}

.button:hover {
  background-color: #f6b092;
}

</style>
