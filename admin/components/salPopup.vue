<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="mainpurple" class="white--text text-capitalize" v-bind="attrs"
            v-on="on" @click="dialog = true" elevation=0>
        <v-icon  class="pr-2 ml-n2">
          mdi-plus-box
        </v-icon>
        Add Salary
      </v-btn>
    </template>
    <v-card>
      <v-container>
      <v-card-title>
        <h3>Add Salary</h3>
      </v-card-title>
      <v-card-text>
          <v-form ref="form">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field color="mainpurple"
                label="Date" :value="formattedDate" v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="salDate" color="mainpurple"></v-date-picker>
            </v-menu>
            <v-select
            :items="employees"
            label="Employee"
            v-model="emp_id"
            item-value="id"
            :rules="inputRules"
            item-text="name"
            ></v-select>
            <v-text-field
            color="mainpurple"
            label="Salary" 
            v-model="salary"
            >
            </v-text-field>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                color="mainpurple"
                label="Month" 
                :value="formattedMonth"
                :rules="monthRules"
                v-bind="attrs" 
                v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="month"
                type="month"
                color="mainpurple"
              ></v-date-picker>
              
            </v-menu>

            <v-select
            :items="selectItems"
            label="Type"
            v-model="selectedType"
            ></v-select>
            
            <v-row justify="end">
              <v-btn text class="mainpurple mr-10 mt-3 white--text text-capitalize" @click="submit" >Submit</v-btn>
            </v-row>
          </v-form>
      </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      dialog: false,
      item: null,
      salDate: '',
      salary: '',
      emp_id: '',
      month: '',
      selectItems: [
        'Salary',
        'Advance'
      ],
      employees: [
      ],
      selectedType: null,
      inputRules: [
        v => !!v || 'Employee is required',
      ],
      monthRules: [
        v => !!v || 'Month is required',
      ] 
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
        this.item = {
          date: this.salDate,
          employee: this.emp_id,
          salary: this.salary,
          month: this.month,
          type: this.selectedType
        }
        this.$emit('add-salary', this.item)
        this.item = null
        this.dialog=false
        this.salDate = null
        this.emp_id = ''
        this.salary = ''
        this.month = ''
        this.type = null
      }
    }
  },

  async created() {
    let empData = await this.$axios.$get('admin/employees')
    for (let employee of empData.employees) {
      let temp = {
        id: employee._id,
        name: employee.name
      }
      this.employees.push(temp)
    }

  },

  computed: {
    formattedDate(){
        return this.salDate ? moment(this.salDate).format('DD MMM YYYY') : ''
    },
    formattedMonth(){
        return this.month ? moment(this.month).format('MMMM') : ''
    }
  }
}
</script>