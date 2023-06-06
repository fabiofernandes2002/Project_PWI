// import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { router } from '../router';

export const userStore = defineStore('user', {
  state: () => ({
    users: [],
  }),

  getters: {
    getUsers: (state) => state.users
  },

  actions: {
    async login(user) {
      const response = await AuthService.login(user);
      if (response.token) {
        localStorage.setItem("user", JSON.stringify(response));
        this.loggedIn = true;
      }
    },

    async registo(user) {
      const response = await AuthService.registo(user);
      if (response) {
        router.push("/login");
      }
    },

    getUserLogged() {
      AuthService.getUserLogged();
    },

    logout() {
      AuthService.logout();
      this.loggedIn = false;
      router.push("/");
    },

    // get all users
    async getAllUsers() {
      try {
        const response = await UsersService.getAllUsers();
        this.setUsers(response);
      } catch (error) {
        console.log(error);
      }
    },

    setUsers(users) {
      this.users = users;
    },

    addPoints(id) {
      console.log(id);
      let user = this.users.find((user) => user.id == id);
      user.pontos += 10;
      //substituir o user antigo pelo novo
      this.users.splice(this.users.indexOf(user), 1, user);
      // salvar na locastorage o user na lista users
      localStorage.setItem('users', JSON.stringify(this.users));
    },

    addPointsForAddEcopoints(id){
        console.log(id);
        let user = this.users.find(user => user.id == id);
        user.pontos += 50;
        //substituir o user antigo pelo novo
        this.users.splice(this.users.indexOf(user), 1, user);
        // salvar na locastorage o user na lista users
        localStorage.setItem('users', JSON.stringify(this.users));
    },

    // contar ecopontosUtilizados e ecopontosRegistados para o user
    countEcopontosUtilizados(id){
        console.log(id);
        let user = this.users.find(user => user.id == id);
        user.ecopontosUtilizados += 1;
        //substituir o user antigo pelo novo
        this.users.splice(this.users.indexOf(user), 1, user);
        // salvar na locastorage o user na lista users
        localStorage.setItem('users', JSON.stringify(this.users));
    },

    countEcopontosRegistados(id){
        console.log(id);
        let user = this.users.find(user => user.id == id);
        user.ecopontosRegistados += 1;
        //substituir o user antigo pelo novo
        this.users.splice(this.users.indexOf(user), 1, user);
        // salvar na locastorage o user na lista users
        localStorage.setItem('users', JSON.stringify(this.users));
    },

    // updateUser data ao editar perfil
    updateUser(data){
    
        let user = this.users.find(user => user.id == data.id);
        user.username = data.username;
        user.email = data.email;
        user.password = data.password;
        user.foto = data.foto;

    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('user', JSON.stringify(user));
    },

    getUserLogged() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    },

    // getuserPosition que se encontra na tabela do ranking de utilizadores todos os utilizadores mesmo os que não estão no top 10 do tipo userNormal
    getUserPosition(username) {
      const allUsers = this.users.filter((user) => user.tipo == 'userNormal');
      const index = this.orderUsers(allUsers).findIndex((user) => user.username === username);
      if (index === -1) {
        return -1;
      } else {
        return index + 1 + `º`;
      }
    },

    orderUsers(allUsers) {
      return allUsers.sort((a, b) => {
        const aXP = a.pontos ? a.pontos : 0;
        const bXP = b.pontos ? b.pontos : 0;
        return bXP - aXP;
      });
    },

    isAdmin() {
      return getUserLogged().tipo === 'admin' ? true : false;
    },

    removeUser(id) {
      const index = this.users.findIndex((user) => user.id === id);
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
    },
  },
});
