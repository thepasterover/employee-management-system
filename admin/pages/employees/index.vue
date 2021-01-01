<template>
  <div class="mt-3 pa-2">
    <v-row justify='end'> 
      <v-col>
        <h2 class="textheadpurple--text"> Employees </h2>
      </v-col>
      
      <v-col class="mb-2">
        <div class="text-right">
          <popup @add-employee="addEmployee"></popup>
        </div>
      </v-col>
      <v-col class="ml-4 pt-1" lg="3" cols=12>
        <v-text-field label="Search by name" outlined dense class="mt-1"> </v-text-field>
      </v-col>
      
    </v-row>
    <v-divider class="mt-n5 mb-4"></v-divider>
    <v-row justify="start" align="center">
      <v-col v-for="(item, i) in items" :key="i" cols=12 md=4 sm=5>
        <v-card  max-width="320">
          <div class="text-right mt-2 mb-n8">
            <v-col>
              <v-speed-dial
                transition="slide-y-transition"
                direction="bottom"
                top
                right
                class="mr-n4"
              >
                <template v-slot:activator>
                  <v-icon size=23>mdi-dots-vertical</v-icon>
                </template>
                <v-btn
                  fab
                  dark
                  small
                  color="secondary"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="red"
                  right
                  @click="delEmployee(i)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>
              
            </v-col>
          </div>
          <div class="text-center">
            <v-col class="pa-4 pt-8">
              <NuxtLink :to="`employees/${item.id}`" >
              <v-avatar
                color="mainpurple"
                size="95"
              >
              <span class="white--text">VJ</span>
              </v-avatar>
              <h3 class="mt-6 textheadpurple--text">{{item.name}}</h3>
              </NuxtLink>
              <h4 class="subtextgrey--text mt-1">{{formattedDate(item.date)}}</h4>
              <v-row class="mt-0" justify="center" align="center">
                <v-col align-self="center" class="mr-n5">
                  <v-icon color="subtextgrey" size="18">mdi-calendar-outline</v-icon>
                </v-col>
                <v-col align-self="center" class="mr-n3"><v-progress-linear value=100 color="#2B51D6" rounded></v-progress-linear></v-col>
                <v-col align-self="center" class="mr-n3"><v-progress-linear value=100 color="#577BF9" rounded></v-progress-linear></v-col>
                <v-col align-self="center"><v-progress-linear value=55 color="#54B5FF" rounded></v-progress-linear></v-col>
                <v-col class="subtextgrey--text mt-3 ml-n5"><p >{{item.attendance}}</p></v-col>
                
              </v-row>
              <h3 class="mt-4 mb-2 subtextgrey--text text-uppercase">{{item.desg}}</h3>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import popup from '../../components/popup.vue'
import moment from 'moment'
export default {
  components: { popup },
  data() {
    return {
      items: []
    }
  },
  methods: {
    async addEmployee(e) {
      try {
        let data = await this.$axios.$post('admin/employees/add', {
          date: e.date,
          name: e.name,
          desg: e.desg
        })
        console.log(data)
      } catch(err) {
        console.log(err)
      }
    },

    delEmployee(i){
      console.log(i)
      this.items.splice(i, 1)
    },

    formattedDate(d){
      return d ? moment(d).format('DD MMM YYYY') : ''
    },
  },

  async created() {
    try {
      let data = await this.$axios.$get('admin/employees')
      for (let employee of data.employees) {
        let item = {
          id: employee._id,
          name: employee.name,
          date: employee.date,
          desg: employee.desg,
          attendance: employee.attendance
        }
        this.items.push(item)
      }
    } catch(err) {
      console.log(err)
    }
  },

  
}
</script>

<style  scoped>

</style>