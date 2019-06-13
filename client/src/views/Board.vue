<template>
  <div class="board-view container-fluid">
    {{board.title}}

    <div class="row">
      <!-- nav bar -->
    </div>
    <div class="row">
      <div class="col">
        <board :boardId="boardId" />
      </div>
      <div class="col">
        <list-card v-for="l in lists" :key="l._id" :listData="l" />
      </div>
    </div>

    <!-- <list v-for="list in lists" :listData='list'></list> -->
  </div>
</template>

<script>
  import ListCard from '@/components/ListCard.vue'
  import Board from '@/components/Board.vue'

  export default {
    name: "BoardView",
    props: ["boardId"],
    data() {
      return {

      }
    },
    mounted() {
      if (!this.board._id) {
        this.$store.dispatch('getBoards')
      }
      this.$store.dispatch('getLists', this.boardId)
    },
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      }
    },
    components: {
      ListCard,
      Board
    }
  }

</script>
<style>
  .board-view {
    background-image: url(https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80);
    min-height: 100vh;
    background-size: cover;
  }
</style>