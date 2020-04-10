


Vue.component('loader', {
    template:`
    <div class="d-flex center text-center"> 
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div>
    `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            contacts: [
                {id: 1, name: 'megasaab', value:'+7 771 000 00 00', marked: false } // like database
            ]
        }
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods:{
        createContact() {
            const {...contact} = this.form
            
            
            this.contacts.push({...contact, id: Date.now(), marked: false})

            this.form.name = this.form.value = ''
        },
        markContact(id) {
            const contact = this.contacts.find(c =>  c.id == id)
            contact.marked = true
        },
        removeContact(id){
            this.contacts = this.contacts.filter(c => c.id !== id)
        }
    },

   async mounted() {
    this.contacts =  await request('/api/contacts')
    }
})


async function request(url, method = 'GET', data = null) {
    try {
        
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await respone.json()
    } catch (e){
        console.warn('Error:', e,message)
    }
}
