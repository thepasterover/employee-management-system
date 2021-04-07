<template>
  <div>
    <chart />
    <salary-table />
  </div>
</template>

<script>
import Chart from '../components/salary/chart'
import salaryTable from '../components/salary/salaryTable'
export default {
  components: {
    Chart,
    salaryTable
  }
}
</script>