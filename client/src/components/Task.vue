<template>
  <div class="task">
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="task in tasks" :key="task._id">
        <h3>{{task.title}}<i class="fas fa-eraser" @click="deleteTask(task)"></i></h3>
        - <p>{{task.description}}</p>
        <comment v-for="comment in task.comments" :commentData="comment" :task="task" />
      </li>
      <li class="list-group-item">
        <form class="form-inline" @submit.prevent="submitTask" id='form1'>
          <div class="form-group mx-sm-3 mb-2">
            <input type="text" class="form-control" placeholder="Add a Task" v-model='newTask.title'>
          </div>
          <div class="form-group mx-sm-3 mb-2">
            <input type="text" class="form-control" placeholder="Description" v-model='newTask.description'>
          </div>
          <button type="submit" class="btn btn-primary mb-2"><i class="fas fa-plus"></i></button>
        </form>

      </li>
    </ul>
  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: "Task",
    props: ['listId'],
    data() {
      return {
        newTask: {
          title: '',
          description: '',
          listId: this.listId,
          comments: []
        }
      }
    },
    mounted(listId) {
      this.$store.dispatch('getTasks', this.listId)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listId] || []
      }
    },
    methods: {
      submitTask({ target: form }) {
        this.$store.dispatch('addTask', this.newTask)
        form.reset()
      },
      deleteTask(task) {
        this.$store.dispatch('deleteTask', task);
      }
    },
    components: {
      Comment
    }
  }
</script>
<style>

</style>