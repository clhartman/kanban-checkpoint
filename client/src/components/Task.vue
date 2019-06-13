<template>
  <div class="task">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h3>{{taskData.title}}<i class="fas fa-eraser" @click="deleteTask"></i></h3>
        <p>{{taskData.description}}</p>


        <!-- complete list drop down menu!! -->
        <select v-model="selected">
          <option disabled value="">Move Task...</option>
          <option v-for="list in lists" :value="list._id" @click="moveTask(selected)">{{list.title}}</option>
        </select>
      </li>
      <li class="list-group-item">

      </li>
    </ul>
    <div v-for="(comment, index) in comments" :task="taskData">
      <p>{{comment.content}} - {{comment.user}}<button class="btn btn-danger"
          @click="deleteComment(index)">Delete</button></p>
    </div>
    <form class="form-inline" @submit.prevent="submitComment">
      <div class="form-group mx-sm-3 mb-2">
        <input type="text" class="form-control" placeholder="Comments" v-model="newComment.content">
        <input type="text" class="form-control" placeholder="User" v-model="newComment.user">
        <button class="btn btn-info" type="submit"><i class="fas fa-plus"></i></button>
      </div>
    </form>
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

</style>