<template>
  <div>
    <dash-board-cards />
    <work-chart />
  </div>
</template>

<script>
import workChart from "../components/dashboard/workChart";
import dashBoardCards from '../components/dashboard/dashboardCards'
export default {
  components: { 
    dashBoardCards,
    workChart
  },
  middleware: 'auth',
  async created() {
    try{
      // let data = await this.$axios.$get('employee/salary')
      // console.log(data)
    } catch(err) {
      console.log(err)
    }
  }
}
</script>