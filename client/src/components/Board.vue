<template>
  <div class="board">
    <div class="card">
      <div class="card-body">
        <!-- <button class='btn' type="button" data-toggle="collapse" data-target="form1" aria-expanded="false"
              aria-controls="form1">+
              Add
              List
            </button> -->
        <form class="add-list-form" @submit.prevent="submitList">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Create List" v-model='newList.title'>
            <div class="input-group-append">
              <button type="submit" class="btn btn-success"><i class="fas fa-plus"></i></button>
            </div>
          </div>
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