<template>
  <div class="boards">
    <div class="nav-bar container-fluid">
      <div class="row" id="nav">
        <div class="col-1">
          <h1>Cello</h1>
        </div>
        <div class="col-9">
          <form @submit.prevent="addBoard">
            <input type="text" placeholder="title" v-model="newBoard.title" required>
            <input type="text" placeholder="description" v-model="newBoard.description">
            <button type="submit">Create Board</button>
          </form>
        </div>
        <div class="col-2">
          <button class="btn btn-secondary" @click="logout">Log Out</button>
        </div>
      </div>
    </div>
    <div class="container" id="board-container">
      <boards-list />
    </div>
  </div>
</template>

<script>
  import BoardsList from "@/components/BoardsList.vue"

  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      // deleteBoard(boardId) {
      //   this.$store.dispatch("deleteBoard", boardId);
      // }

      logout() {
        this.$store.dispatch('logout', this.creds)
      }
    },
    components: {
      BoardsList,
    }
  };
</script>

<style scoped>
  #nav {
    margin-top: 25px;
    background-color: rgba(50, 50, 50, .5);
    height: 90px;
    z-index: 1;
    top: 0;
    display: flex;
    align-content: space-between;
  }

  #board-container {
    padding-top: 10px;
  }
</style>