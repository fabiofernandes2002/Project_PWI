// import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import { router } from '../router';

export const userStore = defineStore('user', {
    state: () => ({
        users: [
            { id: 1, username: 'Admin', tipo: 'admin', email: 'admin@gmail.com', dataNascimento: '12-01-2002', password: 'Esmad_2223', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300', pontos: 50, medalhas: [], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 1, diaSemana: 'Segunda-Feira'},
            { id: 2, username: 'User', tipo: 'userNormal', email: 'user@gmail.com', dataNascimento: '12-01-2002', password: 'Esmad_2223', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300', pontos: 15, medalhas: [1], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 2, diaSemana: 'Segunda-Feira'},
            { id: 3, username: 'Damião', tipo:'userNormal', email: 'damião@gmail.com', dataNascimento: '12-01-2002', password: 'damião', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia',codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300', pontos: 20, medalhas: [], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 3, diaSemana: 'Segunda-Feira'},
            { id: 4, username: 'Daniel', tipo:'userNormal', email: 'daniel@gmail.com', dataNascimento: '12-01-2002', password: 'daniel', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 50, medalhas: [], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 4, diaSemana: 'Segunda-Feira'},
            { id: 5, username: 'Tiago', tipo:'userNormal', email: 'tiago@gmail.com', dataNascimento: '12-01-2002', password: 'tiago', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 35, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            { id: 6, username: 'Rui', tipo:'userNormal', email: 'rui@gmail.com', dataNascimento: '12-01-2002', password: 'tiago', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 15, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            { id: 7, username: 'Ric', tipo:'userNormal', email: 'ric@gmail.com', dataNascimento: '12-01-2002', password: 'ric', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 100, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            { id: 8, username: 'Diogo', tipo:'userNormal', email: 'digo@gmail.com', dataNascimento: '12-01-2002', password: 'diogo', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 20, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            { id: 9, username: 'Miguel', tipo:'userNormal', email: 'miguel@gmail.com', dataNascimento: '12-01-2002', password: 'miguel', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 45, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            { id: 10, username: 'Ped', tipo:'userNormal', email: 'ped@gmail.com', dataNascimento: '12-01-2002', password: 'ped', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 200, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0,desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            { id: 11, username: 'Pedro', tipo:'userNormal', email: 'pedro@gmail.com', dataNascimento: '12-01-2002', password: 'pedro', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', codigoPostal: '4400-182', foto: 'https://picsum.photos/200/300' , pontos: 500, medalhas: [1,2], ecopontosUtilizados: 2,ecopontosRegistados: 0, desafios: [], classificacao: 5, diaSemana: 'Segunda-Feira'},
            
        ],
        
    }),

  getters: {
    getUsers: (state) => {
      return state.users;
    },

    getUserById: (state) => (id) => state.users.find((user) => user.id == id),
  },

  actions: {
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

        setUsers(users) {
            this.users = users;
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

    logout() {
      localStorage.removeItem('user');
      this.$router.push('/LandingPage');
    },
  },
});
