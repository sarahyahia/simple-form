<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
           
            v-bind="attrs"
            v-on="on" 
            filled 
            color="purple white--text"
          > 
            Add Product<v-icon>mdi-plus</v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-alert
                v-if='msg'
                border="top"
                color="success"
                dark
                class="mt-2"
              >{{ msg }}</v-alert>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  v-model="title"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Vendor*"
                  v-model="vendor"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price*"
                  v-model="price"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity Available*"
                  v-model="quantity_available"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
              <v-select
                  v-model="category"
                  :items="this.$store.getters.getCategories"
                  label="Category*"
                  item-text="title"
                  @change="categoryChanged"
                  required
              ></v-select>
              </v-col>
              <v-col cols="12">
                <v-file-input
                    chips
                    show-size
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    truncate-length="15"
                    v-model="image"
                ></v-file-input>    
              </v-col> 
              <v-col cols="12">
                <v-text-field
                  label="Slug*"
                  v-model="slug"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                  <v-textarea
                    color="black"
                    v-model="description"
                    label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="purple darken-1 white--text"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import AuthService from '@/services/AuthService.js';

  export default {
      name:'EditProduct',
    //   props: {
    //       product: Object,
    //   },
    data: () => ({
        dialog: false,
        title:'',
        slug:'',
        description:'',
        category: '',
        status: 'available',
        quantity_available:1,
        vendor: '',
        price:0,
        image:'',
        msg: '',
        errors: [],
        rules: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        category_id:0,
    }),
    mounted(){
        
    },
    methods: {
        async submit () {
            try{
                let formData = new FormData()
                this.quantity_available > 0?
                  this.status = 'available':
                  this.status = 'sold out'
                formData.append('title',this.title)
                formData.append('price',this.price)
                formData.append('vendor',this.vendor)
                formData.append('description',this.description)
                formData.append('image',this.image)
                formData.append('category',this.category_id)
                formData.append('slug',this.slug)
                formData.append('status',this.status)
                formData.append('quantity_available',this.quantity_available)
                const token = this.$store.getters.isLoggedIn
                this.$store.commit('setIsLoading')
                const response = await AuthService.addProduct(formData, token);
                this.msg = response.msg
                this.$store.commit('setIsLoading');
                location.reload();
                // this.dialog = false;
                // this.reset();
                // this.$router.push({ path: this.product.get_absolute_url })
                // setTimeout(this.dialog = false, 2000)
            }catch (error) {
                this.errors = error
                console.log(error.response)
            }
        },
        reset(){
            this.title = ''
            this.slug = ''
            this.description = ''
            this.msg = ''

        },
        categoryChanged(e){
          this.category_id = this.$store.getters.getCategories.filter(obj => {
            return obj.title === e
          })[0].id
        }

    }
  }
</script>