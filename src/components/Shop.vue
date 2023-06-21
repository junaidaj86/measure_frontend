<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
            <Form @submit="handleShopRequest" :validation-schema="schema">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="name">Shop Name</label>
                        <input type="text" v-model="shop.name" />
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" v-model="shop.address" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-block" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            Create Shop
                        </button>
                    </div>
                </div>
            </Form>

            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
            </div>
        </div>
    </div>
</template>
  
<script>
import ShopService from "../services/shop.service"

export default {
    data() {
        return {

            shop: {
                name: "",
                address: "",
            },
        };
    },
    methods: {

        handleShopRequest() {
            // Handle form submission
            console.log("Form submitted!");
            let requestObj = {
                name: this.shop.name,
                Address: this.shop.address
            }
            ShopService.createShop(requestObj).then(
                (response) => {
                    this.message = response.message;
                    this.loading = false;
                  
                },
                (error) => {
                    //this.content =
                      //  (error.response &&
                        //    error.response.data &&
                          //  error.response.data.message) ||
                        //error.message ||
                        //error.toString();
                        this.loading = false;
                        console.log("wertyuiowerthjkl" + error)
                        
                }
            );
        },
    },
};
</script>
  