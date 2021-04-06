<template>
    <div class="mt-14 pa-2">
      <h3>Work Chart</h3>
     <apexchart type="line" :options="chartOptions" :series="series" :height=320  class="mt-5"></apexchart>
   </div>
</template>

<script>
export default {
    data() {
        return {
          series: [
            
          ],
          chartOptions: {
            stroke: {
              curve: 'smooth'
            },
            chart: {
              type: 'line',
              toolbar: false,
              zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              fontFamily: 'Inter',
              
              toolbar: {
                autoSelected: 'zoom'
              }
            },
            colors: ['#316cf5', '#73cfa6', '#F3B076', '#d62f2f'],

            markers: {
              size: 4
            },
            yaxis: {
              
            },
            xaxis: {
              type: 'datetime',
            },
        }
      }
    },

    async created() {
      try {
        let categories = await this.$axios.$get('employee/category')
        let data = await this.$axios.$get('employee/home/chart')
        let grandArr = []
        for(let ctg of categories){
          grandArr.push({name: ctg.category, data: []})
        }
        grandArr = grandArr.splice(0, 4)
        data.forEach(d => {
          let gIndex = grandArr.findIndex(g => g.name == d._id.category)
          if(gIndex > -1){
            grandArr[gIndex].data.push([d._id.date, d.count])
            }
        })
        this.series = [...grandArr]
      } catch(err) {
        console.log(err)
      }
    }
}
</script>