<template>
    <div class="mt-6">
      <v-row>
        <v-col cols=12 md=8>
          <h2>Work Chart</h2>
          <v-divider></v-divider>
          <apexchart type="area" :options="chartOptions" :series="series" :height=400 class="mt-5"></apexchart>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      series: [
      ],
      chartOptions: {
        chart: {
          type: 'area',
          toolbar: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        colors: ['#645DF6', '#26E7A5'],

        markers: {
          size: 4
        },

        xaxis: {
          type: 'datetime',
          title: {
            text: 'Time Series'
          },
        },
      }
    }
  },

  async created() {
    try {
      let data = await this.$axios.$get('admin/work/day')
      console.log(data)
      let tshirtlist = []
      let shortslist = []
      data.forEach(d => {
        let m = d._id.month < 10 ? '0' + d._id.month : d._id.month
        if(d._id.category === 'Tshirt'){
          tshirtlist.push([d._id.date, d.count])
        } else if(d._id.category  === 'Shorts'){
          shortslist.push([d._id.date, d.count]) 
        }
      })
      this.series.push({name: 'Tshirt', data: tshirtlist})
      this.series.push({name: 'Shorts', data: shortslist})
    } catch(err) {
      console.log(err)
    }
  }
}
</script>