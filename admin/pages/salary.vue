<template>
  <div>
    <v-data-table
    :headers=headers
    :items=items
    :search="formattedMonthSort"
    >
      <template v-slot:top>
        <v-toolbar
        flat
         class="mb-3">
        
        <v-toolbar-title class="textheadpurple--text">Salary</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
            color="mainpurple"
            label="Sort by Month" 
            :value="formattedMonthSort"
            v-bind="attrs" 
            v-on="on"
            class="mt-5"
            >
            </v-text-field>
            </template>
            <v-date-picker
            v-model="monthSort"
            type="month"
            color="mainpurple"
            elevation="0"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <sal-popup @add-salary="addToSalary"></sal-popup>
        </v-toolbar>
      </template>

      <template v-slot:item.date="props">
        <v-edit-dialog
          :return-value.sync="props.item.date"
          >
            {{ props.item.date }}
            <template v-slot:input>
              <v-text-field
              v-model="props.item.date"
              label="Edit"
              single-line>

              </v-text-field>
            </template>
        </v-edit-dialog>
      </template>


      <template v-slot:item.salary="props">
        <v-edit-dialog
          :return-value.sync="props.item.salary"
          >
            {{ props.item.salary }}
            <template v-slot:input>
              <v-text-field
              v-model="props.item.salary"
              label="Edit"
              single-line>

              </v-text-field>
            </template>
        </v-edit-dialog>
      </template>


      

      <template v-slot:item.actions = {item}>
        <v-icon
        small
        color="error"
        class="ml-3"
        @click="deleteSalary(item._id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import SalPopup from '~/components/salPopup.vue'
import moment from 'moment'

export default {
    components: {
        SalPopup
    },
    data() {
      return {
        monthSort : '',
        employees: [
        'Raju Sharma',
        'Krishna'
        ],
        headers: [
          {text: 'Date', value: 'date', class: 'textheadpurple--text'},
          {text: 'Employee Name', value: 'employee', class: 'textheadpurple--text'},
          {text: 'Salary', value: 'salary', class: 'textheadpurple--text'},
          {text: 'Month', value: 'month', class: 'textheadpurple--text'},
          {text: 'Type', value: 'type', class: 'textheadpurple--text'},
          {text: 'Actions', value: 'actions', class: 'textheadpurple--text', sortable: false},
        ],

        items: [
        ]
      }
    },

    methods: {
      async getSalaries(){
        this.items = []
        let data = await this.$axios.$get('admin/salary')
        
        for(let salary of data.salaries) {
          salary.date = salary.date ? moment(salary.date).format('DD MMM YYYY') : ''
          salary.month = salary.month ? moment(salary.month).format('MMMM') : ''
          this.items.push(salary)
        }
      },
      async addToSalary(e) {
        try{
          let d = await this.$axios.$post('admin/salary/add', {
            date: e.date,
            salary: e.salary,
            month: e.month,
            type: e.type,
            employee: e.employee
          })
          this.getSalaries()
        } catch(err) {
          console.log(err)
        }
        // this.items.push(e)
      },

      async deleteSalary(id) {
        try{
          await this.$axios.$post('admin/salary/delete', {
            id: id
          })
          this.getSalaries()
        } catch(err) {
          console.log(err)
        }
      },
    },
    async created() {
      this.getSalaries()
    },
    computed: {
      formattedMonthSort(){
        return this.monthSort ? moment(this.monthSort).format('MMMM').toString() : ''
      },
    },
}
</script>

<style scoped>

.v-data-table {
  color: #405793;
}

</style>