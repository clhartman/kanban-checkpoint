<template>
  <div class="card task">
    <div class="card-header task-header">
      <div class="task-title">
        <div>{{taskData.title}}</div>
        <button title="Delete Task" class="btn btn-danger" @click="deleteTask">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <p>{{taskData.description}}</p>
      <select v-model="selected">
        <option disabled value="">Move Task...</option>
        <option v-for="list in lists" :value="list._id" @click="moveTask(selected)">{{list.title}}</option>
      </select>
    </div>
    <div class="card-body task-body">
      <div v-for="(comment, index) in comments" class="comment" :task="taskData">
        <div>{{comment.content}} - {{comment.user}}</div>
        <button title="Delete Comment" class="btn btn-danger" @click="deleteComment(index)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <form class="add-comment-form" @submit.prevent="submitComment">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Comments" v-model="newComment.content">
          <input type="text" class="form-control" placeholder="User" v-model="newComment.user">
          <div class="input-group-append">
            <button class="btn btn-success" type="submit"><i class="fas fa-plus"></i></button>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Task",
    props: ['taskData', 'listData'],
    data() {
      return {
        newComment: {
          content: '',
          user: '',
          taskId: this.taskData._id,
          listId: this.taskData.listId
        },
        selected: '',
      }
    },
    computed: {
      comments() {
        // let comments = this.$store.state.tasks[this.taskData.listId] || []
        let comments = this.taskData.comments
        console.log('this is the comment array', comments)
        return comments
      },
      lists() {
        return this.$store.state.lists
      }
      //computed for lists
      //lookup lists dropdown select whith v-model="selected"
    },
    methods: {
      submitComment({ target: form }) {
        this.taskData.comments.push(this.newComment)
        this.$store.dispatch('addComment', this.taskData)
        form.reset()
      },
      deleteTask() {
        this.$store.dispatch('deleteTask', this.taskData);
      },
      deleteComment(index) {
        this.taskData.comments.splice(index, 1)
        this.$store.dispatch('deleteComment', this.taskData)
      },
      moveTask(selected) {
        debugger
        this.taskData.oldId = this.taskData.listId
        this.taskData.listId = this.selected
        this.$store.dispatch('moveTask', this.taskData.listId)
      } //complete moveTask
      //movetask
      // this.taskData.oldId=this.taskdata.listId
      // this.taskdata.listId= this.selected
    }

  }
</script>
<style>
  .task-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-body {
    background-color: lightblue;
  }

  .task {
    margin: 10px;
  }

  .add-comment-form {
    margin: 10px
  }

  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>