<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="mainpurple" class="white--text text-capitalize" v-bind="attrs"
            v-on="on" @click="dialog = true">
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
              <v-date-picker v-model="joined" color="mainpurple"></v-date-picker>
            </v-menu>
            <v-select
            :items="employees"
            label="Employee"
            v-model="employeeName"
            :rules="inputRules"
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
      joined: null,
      salary: '',
      employeeName: '',
      month: '',
      selectItems: [
        'Salary',
        'Advance'
      ],
      employees: [
        'Raju',
        'Krishna'
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
          date: this.formattedDate,
          employee: this.employeeName,
          salary: this.salary,
          month: this.formattedMonth,
          type: this.selectedType
        }
        this.$emit('add-salary', this.item)
        this.item = null
        this.dialog=false
        this.joined = null
        this.employeeName = ''
        this.salary = ''
        this.month = ''
        this.type = null
      }
    }
  },
  computed: {
    formattedDate(){
        return this.joined ? moment(this.joined).format('DD MMM YYYY') : ''
    },
    formattedMonth(){
        return this.month ? moment(this.month).format('MMMM') : ''
    }
  }
}
</script>