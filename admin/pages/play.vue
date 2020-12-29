<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-avatar color="#555555"  size="80">
            <v-icon class="white--text" size="45">mdi-account-outline</v-icon>
          </v-avatar>
        </v-col>
        <v-col >
          <v-row 
          v-for="(examDetail, i) in examDetails" 
          :key="i" no-gutters 
          color="grey" 
          class="subtitle-2 pr-n16"> <!--Justify start wont work -->
            <v-col >{{examDetail.index}}</v-col>
            <v-col cols="1">:</v-col>
            <v-col v-if="examDetail.index == 'Remaining Time'">
              <v-chip color="blue">
                <vac :end-time="new Date().getTime() + (3*60*60*1000)" @finish="finish()">
                  <template
                      v-slot:process="{ timeObj }">
                      <span class="white--text">{{ `${timeObj.h}: ${timeObj.m}:${timeObj.s}` }}</span>
                  </template>
                  <template
                      v-slot:finish>
                      <span>Done!</span>
                  </template>
                </vac>
              </v-chip>
            </v-col>
            <v-col class="orange--text" v-text="examDetail.value" v-else></v-col>
          </v-row>
        </v-col>
        <v-col md="3">
          <v-select :items="languages" label="Language" outlined flat class="mt-4" height="50px">

          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row justify="space-between">
            <h3 class="mb-2 ml-3"> Question {{page+1}}: </h3>
            <v-btn 
            depressed 
            text 
            class="mr-2 text-decoration-underline primary--text"
            @click.stop="sidePanel = !sidePanel">
            <div v-if="!sidePanel">Show Panel</div>
            <div v-if="sidePanel">Hide Panel</div>
            </v-btn>
          </v-row>
          <hr>
          <div class="img--wrapper">
            <img :src="require(`~/assets/${getQuestion().img}.jpg`)">
          </div>

          <!-- Radio Buttons -->
          <v-row justify="space-between">
            <v-radio-group row class="mt-n5" v-model="tempSelected">
              <v-col v-for="n in 4" :key="n" class="n > 1 ? px-15 : null">
                <v-radio 
                :label="`${n})`"
                :value="n"
                ></v-radio>
              </v-col>
            </v-radio-group>
          </v-row>
          
          <hr class="mt-n2">
          
          <v-row class="mt-2" justify='start'> <!--Justify wont work again-->
            <v-col>
              <v-btn 
              color="#5AB55E" 
              class="white--text" 
              depressed
              @click.stop="saveAndNext">SAVE & NEXT</v-btn>
            </v-col>
            <v-col >
              <v-btn 
              depressed 
              outlined 
              @click.prevent="clear">CLEAR</v-btn>
            </v-col>
            <v-col >
              <v-btn depressed color="warning" @click="saveAndForReview">SAVE & MARK FOR REVIEW</v-btn>
            </v-col>
            <v-col >
              <v-btn depressed color="primary" @click.stop="markForReview">MARK FOR REVIEW & NEXT</v-btn>
            </v-col>
          </v-row>

          <hr style="border: 1px solid #DBDBDB;">

          <v-row justify="space-between">
            <v-col>
                <v-btn 
                depressed 
                outlined 
                :disabled="page == 0"
                @click="goBack">&#60;&#60; BACK</v-btn>
                
            </v-col>
            <v-col>
                <v-btn 
                depressed 
                outlined
                :disabled="page == (questions.length - 1)" 
                @click.stop="goNext">NEXT >></v-btn>
            </v-col>
            <v-col >
              <v-btn color="#5AB55E" class="white--text" depressed>SUBMIT</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <!-- side panel -->
        <v-col v-if="sidePanel">
          <v-row>
            <v-card outlined width="100%">
              <v-row class="px-5">
                <v-col align-self="center">
                  <v-card color="#555555" max-width="43">
                    <p class="pa-2 px-3 white--text" v-if="filterActions('notVisited') < 10">0{{filterActions('notVisited')}}</p>
                    <p class="pa-2 px-3 white--text" v-else>{{filterActions('notVisited')}}</p>
                  </v-card>
                </v-col>
                <v-col align-self="center" class="pb-7 ml-n10">
                  Not Visited
                </v-col>
                <v-col align-self="center">
                  <v-card color="error" max-width="43">
                    <p class="pa-2 px-3 white--text" v-if="filterActions('notAnswered') < 10">0{{filterActions('notAnswered')}}</p>
                    <p class="pa-2 px-3 white--text" v-else>{{filterActions('notAnswered')}}</p>
                  </v-card>
                </v-col>
                <v-col align-self="center" class="pb-7 ml-n10">
                  Not Answered
                </v-col>
              </v-row>
              <v-row class="px-5 mt-n4">
                <v-col align-self="center">
                  <v-card color="#5AB55E" max-width="43">
                    <p class="pa-2 px-3 white--text" v-if="filterActions('answered') < 10">0{{filterActions('answered')}}</p>
                    <p class="pa-2 px-3 white--text" v-else>{{filterActions('answered')}}</p>
                  </v-card>
                </v-col>
                <v-col align-self="center" class="pb-7 ml-n10">
                  Answered
                </v-col>
                <v-col align-self="center">
                  <v-card color="deep-purple" max-width="43">
                    <p class="pa-2 px-3 white--text" v-if="filterActions('markedForReview') < 10">0{{filterActions('markedForReview')}}</p>
                    <p class="pa-2 px-3 white--text" v-else>{{filterActions('markedForReview')}}</p>
                  </v-card>
                </v-col>
                <v-col align-self="center" class="pb-7 ml-n10">
                  Marked for Review
                </v-col>
              </v-row>
              <v-row class="px-5 mt-n4">
                <v-col cols="2" >
                  <v-badge color="#5AB55E" overlap>
                    <v-card color="deep-purple" max-width="45">
                      <p class="pa-2 px-3 white--text" v-if="filterActions('savedAndForReview') < 10">0{{filterActions('savedAndForReview')}}</p>
                      <p class="pa-3 px-3 white--text" v-else>{{filterActions('savedAndForReview')}}</p>
                    </v-card>
                  </v-badge>
                </v-col>
                <v-col cols="10">
                  Answered & Marked for Review <br/> (will be considered for evaluation)
                </v-col>
              </v-row>
            </v-card>
            
            <!-- Questions tab -->
            
              <v-card outlined class="mt-5 tabs--wrapper">
                <v-row class="px-5">
                  <v-col align-self="center" md="4"  v-for="n in questions.length" :key="n">
                    <v-badge color="#5AB55E" overlap v-if="questions[n-1].action === 'savedAndForReview'">
                      <v-card :color="tabsColors[questions[n-1].action]" max-width="43" @click="goToQuestion((n-1))">
                        <p class="pa-2 px-3 white--text" v-if="n < 10">0{{n}}</p>
                        <p class="pa-2 px-3 white--text" v-else>{{n}}</p>
                      </v-card>
                    </v-badge>
                    <v-card :color="tabsColors[questions[n-1].action]" max-width="43" @click="goToQuestion((n-1))" v-else>
                        <p class="pa-2 px-3 white--text" v-if="n < 10">0{{n}}</p>
                        <p class="pa-2 px-3 white--text" v-else>{{n}}</p>
                      </v-card>
                  </v-col>
                </v-row>
              </v-card>
          </v-row>
        </v-col>
        
      </v-row>
      
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: null,
      sidePanel: true,
      page: 0,
      tempSelected: null,
      examDetails: [
        {index: 'Candidate Name', value: 'Cand Name'},
        {index: 'Exam Name', value: 'Exam Name'},
        {index: 'Subject Name', value: 'Subject Name'},
        {index: 'Remaining Time', value: '2:16:14'},
      ],

      languages: [
        'English',
        'Hindi',
        'Gujrati'
      ],

      options: [
        {label: '1)', value: 'option1'},
        {label: '2)', value: 'option2'},
        {label: '3)', value: 'option3'},
        {label: '4)', value: 'option4'},
      ],

      questions: [
        {img: 'q1', selected: null, action: 'notVisited'},
        {img: 'q1', selected: null, action: 'notVisited'},
        {img: 'q1', selected: null, action: 'notVisited'},
      ],

      tabsColors: {
        notVisited: '#555555',
        notAnswered: 'error',
        answered: '#5AB55E',
        markedForReview: 'deep-purple',
        savedAndForReview: 'deep-purple'
      }

    }
  },

  methods: {
    finish() {
      // submit the answers
      console.log("Submitttttt!")
    },

    getQuestion() {
      if (!this.questions[this.page].selected){
        this.questions[this.page].action = 'notAnswered'
      } else{
        this.tempSelected = this.questions[this.page].selected
      }
      return this.questions[this.page]
    },
    
    saveAndNext() {
      if(this.tempSelected){
        this.question = this.getQuestion()
        this.question.selected = this.tempSelected
        this.question.action = 'answered'
        this.question = null
        this.page++
        this.tempSelected = null

      } else {
        this.$toast.error('To save option must be selected!')
      }
    },

    clear(){
      if(this.tempSelected){
        this.question = this.getQuestion()
        this.question.selected = null
        this.tempSelected = null
      }
      
    },

    markForReview(){
      if(this.tempSelected){
        this.question = this.getQuestion()
        this.question.action = 'markedForReview'
        this.question.selected = this.tempSelected
        this.page++
        this.tempSelected = null
      } else {
        this.$toast.error('Select a option!')
      }
    },
    saveAndForReview() {
      if(this.tempSelected){
        this.question = this.getQuestion()
        this.question.action = 'savedAndForReview'
        this.question.selected = this.tempSelected
        this.page++
        this.tempSelected = null
      } else {
        this.$toast.error('Select a option!')
      }
    },
    goNext() {
      this.question = this.getQuestion()
      if(!this.question.selected){
        this.question.action = 'notAnswered'
        this.page++
      } else {
        this.page++
        this.question = this.getQuestion()
      }
    },
    goBack(){
      this.page--
      this.question = this.getQuestion()
      if(this.question.selected){
        this.tempSelected = this.question.selected
      }
    },
    goToQuestion(i){
      this.page = i
      this.question = this.getQuestion()
      if(this.question.selected){
        this.tempSelected = this.question.selected
      } else {
        this.tempSelected = null
      }
    },
    filterActions(filt) {
      return this.questions.filter(item => item.action === filt).length
    },
  },

  // computed: {
  //   notVisited(){
  //     return this.questions.filter(item => item.action === 'notVisited').length
  //   },
  //   notAnswered() {
  //     return this.questions.filter(item => item.action === 'notAnswered').length
  //   },
  //   answered() {
  //     return this.questions.filter(item => item.action == 'answered').length
  //   },
  //   markedForReview() {
  //     return this.questions.filter(item => item.action == 'markedForReview').length
  //   },
  //   savedAndForReview(){
  //     return this.questions.filter(item => item.action == 'savedAndForReview').length
  //   }
  // }
}
</script>

<style scoped>

.img--wrapper {
  max-height:50%;
  width:auto; 
  overflow:scroll
}

.tabs--wrapper{
  max-height: 20rem;
  overflow:scroll;
  width: 100%;
}

</style>