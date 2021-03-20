<template>
  <div>
    <h1>Welcome, Admin</h1>
    <v-divider></v-divider>
    <dash-board-cards/>
  </div>
</template>

<script>
import dashBoardCards from '../components/dashBoardCards.vue'
export default {
  components: {
    dashBoardCards
  }
}
</script>

<style scoped>
/* .no_employees{
  font-size: 40px;
} */
</style>
