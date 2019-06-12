<template>
  <div class="list-card col">
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <!-- {{list.title}} -->
      </div>
      <!-- this will be the task -->
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
    </div>
    <!-- v-for="list in lists" :key="list._id" -->

  </div>
</template>

<script>
  export default {
    name: 'ListCard',
    props: ['listId'],
    computed: {

    }
  }
</script>

<style scoped>
</style>