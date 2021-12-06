<template>
  <div id="app">
    <div class="bod">
      <router-view/>
    </div>
    <div id="sidebar">
      <router-link to="/">Calendar</router-link>
      <router-link v-if='user' to="/profile">{{user.firstName}}</router-link>
      <router-link v-if='user' to="/create-event">Create Event</router-link>
      <a v-if='user' @click='logout'>Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        if (this.$router.path == '/')
          this.$router.push('/');
        else
          this.$forceupdate();

      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Urbanist', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding: 80px;
}

.bod {
  flex: 1;
}

#sidebar {
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#sidebar a:hover {
  color: #8f8f8f;
}

#sidebar a {
  margin: 10px 50px 10px 0;
  cursor: pointer;
  border: none;
  background-color: #ffffff;
  font-size: 25px;
  font-family: 'Urbanist';
  font-weight: 600;
  color: #afafaf;
  text-decoration: none;
}

#sidebar a.router-link-exact-active {
  color: #8f8f8f;
}
</style>
