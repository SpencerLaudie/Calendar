<template>
  <div class="login-container">
    <div class="login-box">
    <form class="register-form">
        <legend>Register</legend>
        <input placeholder="first name" v-model="firstName">
        <input placeholder="last name" v-model="lastName">
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit" class="button" @click.prevent="register">Register</button>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="login-form space-above">
        <legend>Login</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
        <button type="submit" class="button" @click.prevent="login">Login</button>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
   async register() {
     this.error = '';
     this.errorLogin = '';
     if (!this.firstName || !this.lastName || !this.username || !this.password)
       return;
     try {
       let response = await axios.post('/api/users', {
         firstName: this.firstName,
         lastName: this.lastName,
         username: this.username,
         password: this.password,
       });
       this.$root.$data.user = response.data.user;
       this.$router.push('/');
     } catch (error) {
       this.error = error.response.data.message;
       this.$root.$data.user = null;
     }
   },
   async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
        this.$router.push('/');
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
 },

}
</script>

<style scoped>
.login-container {
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-box {
  width: fit-content;
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border-radius: 30px;
}

.space-above {
  margin-top: 50px;
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

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>
