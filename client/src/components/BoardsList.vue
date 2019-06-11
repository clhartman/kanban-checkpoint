<template>
  <div class="boards container">
    <div class="row">
      <div class="col">
        <div class="card p-3" v-for="board in boards" :key="board._id" @click="boardDetails(board)">
          <blockquote class="blockquote mb-0 card-body">
            <h3>{{ board.title }}</h3>
          </blockquote>
          <button @click="deleteBoard(board._id)">DELETE BOARD</button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <div v-for="board in boards" :key="board._id">
  <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
  <button @click="deleteBoard(board._id)">DELETE BOARD</button>
</div> -->



<script>
  export default {
    name: "BoardsList",
    props: [],
    data() {
      return {
      }
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      boardDetails(board) {
        this.$store.dispatch('getActiveBoard', board)
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    },
    components: {}

  }
</script>