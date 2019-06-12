<template>
  <div class="board container-fluid">
    {{board.title}}
    <div class="row">
      <!-- nav bar -->
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <!-- <button class='btn' type="button" data-toggle="collapse" data-target="form1" aria-expanded="false"
              aria-controls="form1">+
              Add
              List
            </button> -->

            <form class="form-inline" @submit.prevent="submitList" id='form1'>
              <div class="form-group mx-sm-3 mb-2">
                <input type="text" class="form-control" placeholder="Create List" v-model='newList.title'>
              </div>
              <button type="submit" class="btn btn-primary mb-2">Add List</button>
            </form>
          </div>
        </div>
      </div>
      <list-card />

    </div>

    <!-- <list v-for="list in lists" :listData='list'></list> -->
  </div>
</template>

<script>
  import ListCard from '@/components/ListCard.vue'
  export default {
    name: "board",
    data() {
      return {
        newList: {
          title: '',
          boardId: this.boardId

        }
      }
    },
    mounted() {
      if (!this.board._id) {

        this.$store.dispatch('getBoardById', this.$route.params.id)
      }
    },
    computed: {
      board() {
        return (
          this.$store.state.boards.find(b => b._id == this.boardId) || {
            title: "Loading..."
          }
        );
      }
    },
    mounted() {
      // let boardId = this.$route.params.id
      this.$store.dispatch('getLists', this.boardId)
    },
    methods: {
      submitList({ target: form }) {
        debugger
        let list = { ...this.newList, boardId: this.boardId }
        this.$store.dispatch('addList', list)
        form.reset()
      },
      addList() {
        this.$store.dispatch("addList", this.newList)
      }
    },
    components: {
      ListCard
    },
    props: ["boardId"]
  };
</script>