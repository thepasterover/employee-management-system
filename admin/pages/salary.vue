<template>
  <div>
    <v-data-table
    :headers=headers
    :items=items
    :search="formattedMonth"
    >
      <template v-slot:top>
        <v-toolbar
        flat
         class="mb-3">
        
        <v-toolbar-title>Salary</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-col cols="3" sm="2">
        <v-menu offset-y >
          <template v-slot:activator="{ on, attrs }">
          <v-text-field
          color="mainpurple"
          label="Sort by Month" 
          :value="formattedMonth"
          v-bind="attrs" 
          v-on="on"
          class="mt-5"
          >
          </v-text-field>
          </template>
          <v-date-picker
          v-model="monthSort"
          type="monthSort"
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

      <template v-slot:item.employee="props">
        <v-edit-dialog
          :return-value.sync="props.item.employee"
          >
            {{ props.item.employee }}
            <template v-slot:input>
              <v-select
              :items="employees"
              label="Edit Employee"
              v-model="props.item.employee"
              ></v-select>
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
        @click="deleteSalary(item)"
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
        employeeSort: '',
        employees: [
        'All',
        'Raju Sharma',
        'Krishna'
        ],
        headers: [
          {text: 'Date', value: 'date', class: 'headpurple--text'},
          {text: 'Employee Name', value: 'employee', class: 'headpurple--text'},
          {text: 'Salary', value: 'salary', class: 'headpurple--text'},
          {text: 'Month', value: 'month', class: 'headpurple--text'},
          {text: 'Type', value: 'type', class: 'headpurple--text'},
          {text: 'Actions', value: 'actions', class: 'headpurple--text', sortable: false},
        ],

        items: [
          {
            date: '20 Oct 2020',
            employee: 'Krishna',
            salary: '29000',
            month: 'Nov',
            type: 'Advance',
          },
          {
            date: '20 Oct 2020',
            employee: 'Raju Sharma',
            salary: '29000',
            month: 'Dec',
            type: 'Salary',
          },
          {
            date: '20 Oct 2020',
            employee: 'Raju Sharma',
            salary: '29000',
            month: 'Dec',
            type: 'Salary',
          },
        ]
      }
    },

    methods: {
      addToSalary(e) {
        this.items.push(e)
      },

      deleteSalary(item) {
        this.items = this.items.filter(i => i !== item)
      },

      logSort() {
        console.log(this.monthSort)
      }

      
    },
    computed: {
        formattedMonth(){
          return this.monthSort ? moment(this.monthSort).format('MMM').toString() : ''
        }
    }
}
</script>

<style scoped>

.v-data-table {
  color: #405793;
}

</style>