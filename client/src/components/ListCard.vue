<template>
  <div class="card list-card">
    <div class="card-header list-title">
      <div class="list-title-text">
        {{listData.title}}
      </div>
      <button @click="deleteList" class="btn btn-danger" title="Delete List">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <task v-for="task in tasks" :taskData="task" :listData="listData" />
    <!-- make new tasks here with task create form -->
    <form class="add-task-form" @submit.prevent="submitTask" id='form1'>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Add a Task" v-model='newTask.title'>
        <input type="text" class="form-control" placeholder="Description" v-model='newTask.description'>
        <div class="input-group-append">
          <button type="submit" class="btn btn-success"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'ListCard',
    props: ['listData'],
    data() {
      return {
        newTask: {
          title: '',
          description: '',
          listId: this.listData._id
        }
      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id]
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', this.listData);
      },
      submitTask({ target: form }) {
        this.$store.dispatch('addTask', this.newTask)
        form.reset()
      },

    },
    components: {
      Task
    }
  }
</script>

<style scoped>
  .list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .add-task-form {
    margin: 10px
  }

  .list-title-text {
    font-size: 18px;
  }
</style>