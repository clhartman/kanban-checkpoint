<template>
  <div class="board container-fluid">
    {{board.title}}
    <div class="row">

    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <button class='btn' type="button" data-toggle="collapse" data-target="form1" aria-expanded="false"
              aria-controls="form1">+
              Add
              List

              <form class="form-inline collapse" id='form1'>
                <div class="form-group mb-2">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail2">
                </div>
                <div class="form-group mx-sm-3 mb-2">
                  <input type="text" class="form-control" placeholder="Create List">
                </div>
                <button type="submit" class="btn btn-primary mb-2">Add List</button>
              </form>
            </button>
          </div>
        </div>
      </div>
      <div class="col">here is where the lists will populate</div>
    </div>

    <!-- <list v-for="list in lists" :listData='list'></list> -->
  </div>
</template>

<script>
  export default {
    name: "board",
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
    props: ["boardId"]
  };
</script>