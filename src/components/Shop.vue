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
                address: this.shop.address
            }
            alert("hold" + JSON.stringify(requestObj, undefined,2));
            ShopService.createShop(requestObj).then(
                (response) => {
                    console.log("ggggggg" + JSON.stringify(response));
                    alert("adayyyyd")
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
                        alert("adad")
                }
            );
        },
    },
};
</script>
  
<style scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.error-feedback {
    color: red;
}

.btn {
  background-color: #635985;
  color: white;
}

.btn:hover {
  background-color: #393053;
  color: white;
}
</style>
  