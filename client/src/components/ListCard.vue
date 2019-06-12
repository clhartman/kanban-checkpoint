<template>
  <div class="list-card">
    <div class="col" v-for="list in lists" :key="list._id">
      <div class="card" style="width: 18rem;">
        <div class="card-header">
          {{list.title}} <i class="fas fa-trash-alt" @click="deleteList(list)"></i>
        </div>
        <!-- this will be the task -->
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'ListCard',
    props: ['listId'],
    computed: {
      lists() {
        return this.$store.state.lists;
      }
    },
    methods: {
      deleteList(list) {
        this.$store.dispatch('deleteList', list);
      }
    }
  }
</script>

<style scoped>
</style>