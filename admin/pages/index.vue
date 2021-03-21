<template>
  <div>
    <h1>Welcome, Admin</h1>
    <v-divider></v-divider>
    <dash-board-cards/>
    
    <work-chart />
  </div>
</template>

<script>
import dashBoardCards from '../components/dashBoardCards.vue'
import workChart from '../components/workChart.vue'
export default {
  components: {
    dashBoardCards,
    workChart
  }
}
</script>

<style scoped>
/* .no_employees{
  font-size: 40px;
} */
</style>
