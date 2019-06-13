<template>
  <div class="board container-fluid">
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