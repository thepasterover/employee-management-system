<template>
    <div>
        <v-text-field v-model="email">
            Email
        </v-text-field>
        <v-text-field v-model="password">
            Password
        </v-text-field>
        <v-btn @click="submitInfo">Login</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async submitInfo() {
            try{
                let data  = await this.$auth.loginWith('local', {data: {email: this.email, password: this.password}})
                // console.log(data)
            } catch(err) {
                console.log(err)
            }
        }
    }
}
</script>