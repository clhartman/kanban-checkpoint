<template>
  <div class="list-card">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        {{listData.title}} <i class="fas fa-trash-alt" @click="deleteList"></i>
      </div>
      <task v-for="task in tasks" :taskData="task" />
    </div>
    <!-- make new tasks here with task create form -->
    <form class="form-inline" @submit.prevent="submitTask" id='form1'>
      <div class="form-group mx-sm-3 mb-2">
        <input type="text" class="form-control" placeholder="Add a Task" v-model='newTask.title'>
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <input type="text" class="form-control" placeholder="Description" v-model='newTask.description'>
      </div>
      <button type="submit" class="btn btn-primary mb-2"><i class="fas fa-plus"></i></button>
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
  .col {
    display: flex;
    flex-direction: row;
  }
</style>