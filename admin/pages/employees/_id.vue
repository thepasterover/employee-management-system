<template>
  <div >
    <edit-dialog  :dialog="dialog" :item="employeeData" @edit-employee="editEmployee"></edit-dialog>
    <v-row class="pa-1 pl-3" no-gutters>
      <v-col>
        <v-btn icon :to="'/employees'" nuxt color="subtextgrey">
          <v-icon >mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-row no-gutters justify="end" align="end" class="px-1">
        <v-btn color="mainpurple" class="mr-5 white--text text-capitalize" @click="dialog = !dialog" depressed >
          <v-icon small class="pr-2">mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn color="error" @click="delEmployee" depressed>
          <v-icon small class="pr-2 text-capitalize">mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-row>
    </v-row>
    <v-divider class="mb-2"></v-divider>
    <v-row>
      <v-col>
        <v-card max-width="600" elevation="0">
          <v-row class="pa-7 pb-10" justify="center" align="center" align-content="center">
            <v-col class="pl-6 pt-5" cols="12" lg="4" align-self="center">
              <v-avatar color="mainpurple" size="110">
                <span class="white--text"> VJ </span>
              </v-avatar>
            </v-col>
            <v-col class="mb-n8">
              <v-row class="mt-n3">
                  <v-col cols="5">
                    <h4 class="subtextgrey--text subtitle-1 text-capitalize">Joined Date: </h4> 
                  </v-col>
                  <v-col cols="6">
                    <h4 class="textheadpurple--text">{{formattedDate(employeeData.date)}}</h4>
                  </v-col>
              </v-row>
              <v-row class="mt-n5">
                  <v-col cols="5">
                    <h4 class="subtextgrey--text subtitle-1 text-capitalize">Name: </h4> 
                  </v-col>
                  <v-col cols="6">
                    <h4 class="textheadpurple--text text-capitalize">{{employeeData.name}}</h4>
                  </v-col>
              </v-row>
              <v-row class="mt-n5">
                  <v-col cols="5">
                    <h4 class="subtextgrey--text subtitle-1 text-capitalize">Attendance: </h4> 
                  </v-col>
                  <v-col cols="6">
                    <h4 class="textheadpurple--text">{{employeeData.attendance}}</h4>
                  </v-col>
              </v-row>
              <v-row class="mt-n5">
                  <v-col cols="5">
                    <h4 class="subtextgrey--text subtitle-1 text-capitalize">Designation: </h4> 
                  </v-col>
                  <v-col cols="6">
                    <h4 class="textheadpurple--text text-capitalize">{{employeeData.desg}}</h4>
                  </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="600" elevation="0">
          <v-row class="pa-5" >
            <h4 class="textheadpurple--text">Work Info</h4>
          </v-row>
          <v-row>
            <v-col class="mx-4 mt-n6">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row justify="center" align="center" align-content="center">
            <v-col>
              <div  class="caption"> Work Done </div>
              <h2> {{getTotalWorkDone}} </h2>
            </v-col>
            <v-col>
              <div  class="caption"> Salary Received </div>
              <h2> {{salary}} </h2>
            </v-col>
            </v-row>
              <v-row>
            <v-col>
              <div  class="caption"> Advance Received </div>
              <h2> {{advance}} </h2>
            </v-col>
            <v-col>
              <div  class="caption"> Outstanding (If any) </div>
              <h2> {{getOustanding}} </h2>
            </v-col>
          </v-row >
          <!-- <v-row justify="center" align="center" align-content="center">
            <v-col class="mx-12 mb-3 mt-n3">
              <v-progress-circular
                :width="12"
                :size="120"
                :rotate="-90"
                :value="value"
                color="present error"
              >
              <span class="textheadpurple--text">{{value}}%</span></v-progress-circular>
            </v-col>
            <v-col class="mb-4">
              <v-row>
                <v-avatar color="present" size="18" class="mb-n1">
                </v-avatar>
                <h4 class="subtitle-2 px-5 mt-n1">Present </h4>
              </v-row>
              <v-row class="mt-4">
                <v-avatar color="subtextgrey" size="18" class="mb-n1">
                </v-avatar>
                <h4 class="subtitle-2 px-5 mt-n1">Absent </h4>
              </v-row>
            </v-col>
          </v-row> -->
        </v-card>
      </v-col>
    </v-row>
    <v-card elevation="0">
      <v-row class="pa-7 mb-n12 mt-n0">
        <v-col cols=3 sm=12 lg=4 xs=12>
          <h3 class="textheadpurple--text"> Attendance for Month of {{formattedMonth}}</h3>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="pt-6">
          <v-row>
          <v-sheet
          :height="20"
          :width="20"
          color="subtextgrey"></v-sheet>
          <span class="pl-4 subtitle-2">Undefined</span> 
          </v-row>
        </v-col>
        <v-col class="pt-6">
          <v-row>
          <v-sheet
          :height="20"
          :width="20"
          color="present"></v-sheet>
          <span class="pl-4 subtitle-2">Present</span> 
          </v-row>
        </v-col>
        <v-col class="pt-6">
          <v-row>
          <v-sheet
          :height="20"
          :width="20"
          color="error"></v-sheet>
          <span class="pl-4 subtitle-2">Absent</span> 
          </v-row>
        </v-col>
        
        <v-col class="mb-n4 mt-n2" cols="3">
          <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
            color="mainpurple"
            label="Month" 
            :value="formattedMonth"
            v-bind="attrs" 
            v-on="on"
            >
            </v-text-field>
            </template>
            <v-date-picker
            v-model="month"
            type="month"
            color="mainpurple"
            elevation="0"
            @change="monthChange"
            min="2021-01"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-divider class="mt-4 mx-7"></v-divider>
      <v-row v-if="!compDays" class="pa-7" justify="center">
        <v-col>
          <h3>No Data available</h3>
        </v-col>
      </v-row>
      <v-row class="pa-7" v-else>
        <v-col v-for="(day, i) in compDays" :key="day._id" >
          <v-sheet
            :height="40"
            :width="40"
            :color="day.sheetColor"
            rounded
            class="pa-2 pl-3"
            @click="sheetColorManager(day)"
          ><span class="white--text" v-if="i < 9">0{{i + 1}}</span>
          <span class="white--text" v-else>{{i+1}}</span></v-sheet>
        </v-col>
      </v-row>
    </v-card>

    <v-card >
      <v-row class="pa-5" justify="space-between">
        <h4 class="textheadpurple--text">Recent Work</h4>
        <add-work @add-work="addToWork"></add-work>
      </v-row>
      <v-row>
        <v-col class="mx-4 mt-n6">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-col>
        <v-data-table
        :headers=headers
        :items=works
        >
        <template v-slot:item.actions = {item}>
            <v-icon
            small
            color="error"
            class="ml-3"
            @click="deleteWork(item)"
            >
              mdi-delete
            </v-icon>
        </template>
          <template v-slot:item.total = {item}>
            {{item.price * item.quantity}}
        </template>
        </v-data-table>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import editDialog from '../../components/editDialog'

export default {
  components: {
    editDialog
  },
  data() {
    return {
      dialog: false,
      employeeData: {},
      value: 0,
      attendance: 40,
      present: null,
      absent: null,
      month: null,
      currentMonth: null,
      days:  31,
      outstanding: 0,
      salary: 0,
      advance: 0,
      totalWorkDone: 0,




      headers: [
        {text: 'Date', value: 'date', class: 'textheadpurple--text'},
        {text: 'Quantity', value: 'quantity', class: 'textheadpurple--text'},
        {text: 'Price', value: 'price', class: 'textheadpurple--text'},
        {text: 'Category', value: 'category', class: 'textheadpurple--text'},
        {text: 'Total', value: 'total', class: 'textheadpurple--text'},
        {text: 'Actions', value: 'actions', class: 'textheadpurple--text', sortable: false},
      ],

      works: [
        
      ]
    }
  },

  async created() {
    try{
      let data = await this.$axios.$get('admin/employees/' + this.$route.params.id)
      this.employeeData = data.employee
      this.month = moment().format('YYYY-MM')
      this.currentMonth = this.month
      
      
      this.getAttendance()
      this.getWorks()
      this.getSalaryAndAdvance()
      
      
      
    } catch(err) {
      console.log(err)
    }
  },

  mounted() {
    // setInterval(() => {
    //   if(this.value < this.attendance){
    //     this.value += 10
    //   }
    // }, 150)
    
    
  },

  methods: {
    
    
    formattedDate(d){
      return d ? moment(d).format('DD MMM YYYY') : ''
    },

    // openDialog(item) {
    //   this.modalItem = item
    //   this.dialog = true
    //   console.log(this.modalItem)
    // },

    async sheetColorManager(day) {
      try{
        day.sheetColor === 'holiday' ? day.sheetColor = 'present' : 
          (day.sheetColor === 'present' ? day.sheetColor = 'absent' : day.sheetColor = 'holiday')
        let data = await this.$axios.$post('admin/attendance/update', {
          id: day.employees[0]._id,
          status: day.sheetColor
        })
        
        this.getAttendance()
      } catch(err) {
        console.log(err)
      }
    },

    async getAttendance(){
      try{
      let data = await this.$axios.$get('admin/attendance/' + this.$route.params.id, {
        params: {
          year_month: this.month
        }
      })
      this.days = data ? data.days : null
      
      } catch(err){
        console.log(err)
      } 
    },

    async getSalaryAndAdvance(){
      this.salary = 0
      this.advance = 0
      let data = await this.$axios.$get('admin/salary/' + this.employeeData.name + '/' + this.month)
      if(data.salaries.length >=  1){
        data.salaries.forEach((s) => {
          if(s.type==='Salary'){
            this.salary += s.salary
          } else {
            this.advance += s.salary
          }
        })
      }
    },

    async delEmployee(){
      try{
        let data = await this.$axios.$post('admin/employees/delete', {
          id: this.employeeData._id
        })
        
        this.$router.push('/employees')
        this.$toast.success('Employee Deleted')
      } catch(err) {
        console.log(err)
      }
    },

    monthChange(){
      this.getAttendance()
      this.getSalaryAndAdvance()
    },

    async addToWork(w) {
      try {
        let data = await this.$axios.$post('admin/work/add', {
          date: w.date,
          quantity: w.quantity,
          price: w.price,
          category: w.category,
          employee: this.employeeData._id
        })
        
      } catch(err) {
        console.log(err)
      }
    },

    async getWorks(){
      try {
        let data = await this.$axios.$get('admin/work/' + this.employeeData._id)
        
        if(data.works.works.length >= 1){
          data.works.works.forEach((w) => {
            w.name = data.works.name
            w.date = w.date ? moment(w.date).format('DD MMM YYYY') : w.date
            this.works.push(w)
          })
        }
        
      } catch(err) {
        console.log(err)
      }
    },

    async deleteWork(item){
      try{
        let data = await this.$axios.$post('admin/work/delete', {
          id: item._id,
          empId: this.employeeData._id
        })
        
        this.getWorks()
      } catch(err) {
        console.log(err)
      }
    }

  },

  computed: {
    formattedMonth(){
      return this.month ? moment(this.month).format('MMMM').toString() : ''
    },
    compDays() {
      if(this.days){
        Array.from(this.days).forEach((v) => {
          v.sheetColor = v.employees[0].status
        })
      }
      return this.days
    },

    getTotalWorkDone() {
      this.totalWorkDone = 0
      if(this.works.length >= 1){
          this.works.forEach((v) => {
            
            if(moment(v.date).format('YYYY-MM') === this.month){
              this.totalWorkDone+= v.price * v.quantity
            }
          })
        }
      return this.totalWorkDone
      },

    getOustanding() {
      this.outstanding = this.totalWorkDone - (this.salary + this.advance)
      return this.outstanding
    },

    
    
  },
  

}
</script>