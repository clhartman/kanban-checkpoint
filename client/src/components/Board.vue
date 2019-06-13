<template>
  <div class="board">
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
</template>

<script>
  export default {
    name: "Board",
    props: ["boardId"],
    data() {
      return {
        newList: {
          title: '',
          boardId: this.boardId
        }
      }
    },
    computed: {},
    methods: {

      submitList({ target: form }) {
        debugger
        let list = { ...this.newList, boardId: this.boardId }
        this.$store.dispatch('addList', list)
        form.reset()
      },
      addList() {
        debugger
        this.$store.dispatch("addList", this.newList)
      }
    },
    components: {}
  }

</script>