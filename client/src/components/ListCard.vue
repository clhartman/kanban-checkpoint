<template>
  <div class="list-card">
    <div class="col" v-for="list in lists" :key="list._id">
      <div class="card" style="width: 18rem;">
        <div class="card-header">
          {{list.title}} <i class="fas fa-trash-alt" @click="deleteList(list)"></i>
        </div>
        <task :listId="list._id" />
        <!-- this will be the task -->

      </div>
    </div>


  </div>
</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'ListCard',
    props: [],
    computed: {
      lists() {
        return this.$store.state.lists;
      }
    },
    methods: {
      deleteList(list) {
        this.$store.dispatch('deleteList', list);
      }
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