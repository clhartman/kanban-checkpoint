<template>
  <div class="boards">
    <div class="col" v-for="board in boards" :key="board._id" @click="boardDetails(board)">
      <div class="card p-3">
        <blockquote class="blockquote mb-0 card-body">
          <h3>{{ board.title }}</h3>
        </blockquote>
        <button @click.stop="deleteBoard(board._id)">DELETE BOARD</button>
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

<style>
  .card {
    display: flex;
    flex-direction: row;
  }
</style>