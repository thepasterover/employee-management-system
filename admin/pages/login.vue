<template>
    <div>
        <v-row justify="center">
        <v-card height="500" width="500">
            <v-row justify="center">
                <v-img
                :src="hostImageUrl + avatar"
                height='200'
                width='200'
                contain
                >
                </v-img>
            </v-row>
            <v-row justify="center" class="mt-n8">
                <v-card-title class="text-h5">Welcome back, Please Login</v-card-title>
            </v-row>
            <div class="pa-6 mt-5">
                <v-form ref="form">
                    <v-text-field v-model="email" color="mainpurple" label="Email" :rules="[rules.required, rules.max, rules.email]">
                        Email
                    </v-text-field>
                    <v-text-field 
                    v-model="password" 
                    color="mainpurple" 
                    label="Password" 
                    :rules="[rules.required, rules.max]"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    >
                        Password
                    </v-text-field>
                </v-form>
                <v-btn @click="submitInfo" color="mainpurple" class="white--text">Login</v-btn>
            </div> 
        </v-card>
        </v-row>
        <v-snackbar
        v-model="snackbar"
        :timeout="4000"
        color="error"
        top
        >
        {{error}}
        <template v-slot:action="{ attrs }">
            <v-btn
            fab
            color="white"
            x-small
            v-bind="attrs"
            @click="snackbar = false"
            >
                <v-icon
                color="error"
                size=23>
                    mdi-close-box
                </v-icon>
            </v-btn>
        </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hostImageUrl: process.env.HOST_IMAGE_URL,
            avatar: '/public/images/company_logos/default.jpg',
            email: '',
            password: '',
            snackbar: false,
            error: null,
            show: false,
            rules: {
                required: v => !!v || 'Required Field',
                max: v => (v || '').length <= 25 || 'Max 25 characters',
                email: v => {
                    let pattern = /\S+@\S+\.\S+/
                    return pattern.test(v) || 'Enter a valid email!'
                }
            }
        }
    },
    methods: {
        async submitInfo() {
            try{
                if(this.$refs.form.validate()){
                    await this.$auth.loginWith('local', {data: {email: this.email, password: this.password}})
                }
            } catch(err) {
                if(err.response){
                    this.snackbar = true
                    this.error = err.response.data.error
                } else {
                    console.log(err)
                }
            }
        }
    }
}
</script>