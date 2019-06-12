<template>
  <div class="comment">
    <form class="form-inline" @submit.prevent="submitComment">
      <div class="form-group mx-sm-3 mb-2">
        <input type="text" class="form-control" placeholder="Comments" v-model="newComment.content">
        <input type="text" class="form-control" placeholder="User" v-model="newComment.user">
        <button class="btn btn-info" type="submit"><i class="fas fa-plus"></i></button>
      </div>
    </form>
    <div>
      <p>{{commentData.content}} - {{commentData.user}}</p>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    props: ["task", "commentData"],
    data() {
      return {
        newComment: {
          content: '',
          user: '',
          taskId: this.task._id,
          listId: this.task.listId
        }
      }
    },
    // mounted(taskId) {
    //   this.$store.dispatch('getComments', this.taskId)
    // },
    computed: {
      comments() {
        return this.$store.state.tasks[this.listId] || []
      },
    },
    methods: {
      submitComment({ target: form }) {
        this.task.comments.push(this.newComment)
        this.$store.dispatch('addComment', this.task)
        form.reset()
      }
      // deleteComment(comment) {
      //   this.$store.dispatch('deleteComment', comment);
      // }
    }
  }
</script>