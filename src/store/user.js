import * as fb from "firebase";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
    userLogged: false
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserLogged(state) {
      state.userLogged = true;
    }
  },
  actions: {
    registerUser({ commit }, { email, password }) {
      fb.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          const uid = response.user.uid;
          commit("setUser", new User(uid));
        });
    },
    loginUser({ commit }, { email, password }) {
      if (fb.auth().currentUser) {
        // [START signout]
        fb.auth().signOut();
        // [END signout]
      } else {
        // Sign in with email and pass.
        // [START authwithemail]
        fb.auth()
          .signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === "auth/wrong-password") {
              alert("Wrong password.");
            } else {
              alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });
        // [END authwithemail]
      }
      commit("setUserLogged");
    }
  }
};
