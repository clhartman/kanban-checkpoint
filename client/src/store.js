import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'


Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
      router.push({ name: 'board', params: { boardId: activeBoard._id } })
    },
    setLists(state, lists) {
      state.lists = lists
    }
  },

  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getActiveBoard({ commit, dispatch }, activeBoard) {
      commit('setActiveBoard', activeBoard)
    },

    async getBoardById({ commit, dispatch }, boardId) {
      try {
        let res = await _api.get('/boards' + boardId + '/lists')
        commit('setActiveBoard', res.data)
      } catch (error) { console.error(error) }
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --
    getLists({ commit, dispatch }, boardId) {
      api.get('/boards/' + boardId + '/lists')
        .then(res => {
          commit('setLists', res.data)
          console.log(res)
        })
    },
    // getActiveBoard({ commit, dispatch }, activeBoard) {
    //   commit('setActiveBoard', activeBoard)
    // },

    // async getBoardById({ commit, dispatch }, boardId) {
    //   try {
    //     let res = await _api.get('/boards' + boardId + '/lists')
    //     commit('setActiveBoard', res.data)
    //   } catch (error) { console.error(error) }
    // },
    async addList({ commit, dispatch }, payload) {
      try {
        let res = await api.post('/lists', payload)
        dispatch('getLists', payload.boardId)
      } catch (error) {
        console.error(error)

      }

    },
    async deleteList({ commit, dispatch }, list) {
      try {
        debugger
        let res = await api.delete('/lists/' + list._id)
        dispatch('getLists', list.boardId)
      } catch (error) { console.error(error) }
    }
    // addList({ commit, dispatch }, boardData) {
    //   api.post('lists', boardData)
    //     .then(serverBoard => {
    //       dispatch('getLists')
    //     })
    // }
    // deleteBoard({ commit, dispatch }, boardId) {
    //   api.delete('boards/' + boardId)
    //     .then(res => {
    //       dispatch('getBoards')
    //     })
    // }


    //#endregion
  }
})
