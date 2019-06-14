<template>
  <div class="boards">
    <div class="row">
      <div class="col" v-for="board in boards" :key="board._id" @click="boardDetails(board)">
        <div class="card p-3">
          <div class="card-body board-title">
            <div>{{ board.title }}</div>
            <button class="btn btn-danger" title="Delete Board" @click.stop="deleteBoard(board._id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
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

<style>
  .card {
    display: flex;
    /* flex-direction: row; */
    /* background-image: url(https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80); */
    /* min-height: 80vh; */
    /* background-size: cover; */
  }

  .board-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .boards {
    /* background-color: #efefef; */
  }
</style>