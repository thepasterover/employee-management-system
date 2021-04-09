<template>
  <div>
    <dash-board-cards />
    <work-chart />
    <attendance />
  </div>
</template>

<script>
import workChart from "../components/dashboard/workChart";
import dashBoardCards from '../components/dashboard/dashboardCards';
import attendance from '../components/dashboard/attendance'
export default {
  head() {
    return{
        title: 'Overview'
    }  
  },
  components: { 
    dashBoardCards,
    workChart,
    attendance
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