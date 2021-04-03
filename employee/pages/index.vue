<template>
  <div>
    <dash-board-cards />
  </div>
</template>

<script>
import dashBoardCards from '../components/dashboardCards'
export default {
  components: { dashBoardCards },
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