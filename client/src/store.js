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
    lists: [],
    tasks: {
      comments: []
    }
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
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks) //this makes the page reactive by forcing computed to fire
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
    logout({ commit, dispatch }, creds) {
      auth.delete('logout', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'login' })
        })
    },

    //logout will be similar to above but with a delete route


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
        let res = await api.get('/boards/' + boardId)
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
      console.log('triggered')
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
        debugger
        dispatch('getLists', payload.boardId)
      } catch (error) {
        console.error(error)

      }

    },
    async deleteList({ commit, dispatch }, list) {
      try {
        let res = await api.delete('/lists/' + list._id)
        debugger
        dispatch('getLists', list.boardId)
      } catch (error) { console.error(error) }
    },
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


    //#region --TASKS--
    async getTasks({ commit, dispatch }, listId) {
      try {
        let res = await api.get("/lists/" + listId + "/tasks")
        commit('setTasks', { tasks: res.data, listId: listId })
        console.log(res)
      } catch (error) { console.error(error) }
    },

    async addTask({ commit, dispatch }, payload) {
      try {
        let res = await api.post("/tasks", payload)
        dispatch('getTasks', payload.listId)
        console.log(res)
      } catch (error) { console.error(error) }
    },

    async deleteTask({ commit, dispatch }, task) {
      try {
        let res = await api.delete('/tasks/' + task._id)
        dispatch('getTasks', task.listId)
      } catch (error) { console.error(error) }
    },

    async moveTask({ commit, dispatch }, payload) {
      try {
        let res = await api.put('/tasks', payload)
        dispatch('getTasks', payload.listId)
        dispatch('getTasks', payload)
      } catch (error) { console.error(error) }
    },

    //  fire put request to tasks/:id
    //dispatch to getTasks with task.listID
    //dispatch to getTasks with old ListID


    //#endregion
    //#region --COMMENTS--
    // async getComments({ commit, dispatch }, taskId) {
    //   try {
    //     let res = await api.get("/tasks/" + taskId + "/comments")
    //     commit('setTasks', { tasks: res.data, listId: listId })
    //     console.log(res)
    //   } catch (error) { console.error(error) }
    // },

    async addComment({ commit, dispatch }, task) {
      try {
        let res = await api.put("/tasks/" + task._id, task)
        dispatch('getTasks', task.listId)
        console.log(res)
      } catch (error) { console.error(error) }
    },

    async deleteComment({ commit, dispatch }, payload) {
      try {
        let res = await api.put('/tasks/' + payload._id, payload)
        dispatch('getTasks', payload.listId)
      } catch (error) { console.error(error) }
    }

    //#endregion
  }
})
