<template>
  <div class="task">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <h3>{{taskData.title}}<i class="fas fa-eraser" @click="deleteTask"></i></h3>
        <p>{{taskData.description}}</p>

      </li>
      <li class="list-group-item">

      </li>
    </ul>
    <!-- {{taskData.title}} -->
    <comment v-for="comment in taskData.comments" :task="taskData" />
    <form class="form-inline" @submit.prevent="submitComment">
      <div class="form-group mx-sm-3 mb-2">
        <input type="text" class="form-control" placeholder="Comments" v-model="newComment.content">
        <input type="text" class="form-control" placeholder="User" v-model="newComment.user">
        <button class="btn btn-info" type="submit"><i class="fas fa-plus"></i></button>
      </div>
    </form>
    <p>{{comment.content}} - {{comment.user}}</p>
  </div>
</template>

<script>
  export default {
    name: "Task",
    props: ['taskData'],
    data() {
      return {
        newComment: {
          content: '',
          user: '',
          taskId: this.taskData._id,
          listId: this.taskData.listId
        }
      }
    },
    computed: {
      comments() {
        return this.$store.state.tasks[this.listId] || []
      }
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
      deleteComment() {
        this.$store.dispatch('deleteComment', this.comment);
      },
    }

  }
</script>
<style>

</style>