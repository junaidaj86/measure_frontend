<template>
    <div class="form-container">

        <div v-if="currentStep === 1">
            <h2>Customer Information</h2>
            <!-- Customer Information form -->
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="customerInfo.name" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="customerInfo.email" />
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" v-model="customerInfo.phone" />
            </div>
            <button @click="nextStep">Next</button>
        </div>


        <div v-if="currentStep === 2">
            <h2>Shirt Measurements</h2>
            <div class="form-container">
                <!-- First Section -->
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtLength">Shoulders</label>
                        <input type="number" v-model="shirtMeasurements.shoulder" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Neck</label>
                        <input type="text" v-model="shirtMeasurements.neck" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Waist</label>
                        <input type="text" v-model="shirtMeasurements.waist" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Length</label>
                        <input type="text" v-model="shirtMeasurements.length" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Chest</label>
                        <input type="text" v-model="shirtMeasurements.chest" />
                    </div>
                    <!-- Add more fields for the first section as needed -->
                </div>

                <!-- Second Section -->
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtLength">Left Sleeve</label>
                        <input type="number" v-model="shirtMeasurements.left_sleeve" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Left Cuff</label>
                        <input type="number" v-model="shirtMeasurements.left_cuff" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Right sleeve</label>
                        <input type="number" v-model="shirtMeasurements.right_sleeve" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtLength">Right Cuff</label>
                        <input type="number" v-model="shirtMeasurements.right_cuff" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Notes</label>
                        <input type="text" v-model="shirtMeasurements.notes" />
                    </div>
                    <!-- Add more fields for the second section as needed -->
                </div>
            </div>

            <!-- Common fields outside the sections -->



            <!-- Add more common fields as needed -->

            <!-- Navigation buttons -->
            <button @click="previousStep">Previous</button>
            <button @click="nextStep">Next</button>
        </div>



        <div v-if="currentStep === 3">
            <h2>Pant Measurements</h2>
            <!-- Pant Measurements form -->
            <div class="form-container">
                <!-- First Section -->
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtLength">Waist</label>
                        <input type="number" v-model="pantMeasurements.waist" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Hip</label>
                        <input type="text" v-model="pantMeasurements.hip" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Thigh</label>
                        <input type="text" v-model="pantMeasurements.thigh" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Inseam</label>
                        <input type="text" v-model="pantMeasurements.inseam" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Rise</label>
                        <input type="text" v-model="pantMeasurements.rise" />
                    </div>
                    <!-- Add more fields for the first section as needed -->
                </div>

                <!-- Second Section -->
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtLength">Leg Opening</label>
                        <input type="number" v-model="pantMeasurements.opening" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Knee</label>
                        <input type="number" v-model="pantMeasurements.knee" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Front Raise</label>
                        <input type="number" v-model="pantMeasurements.fraise" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtLength">Back Raise</label>
                        <input type="number" v-model="pantMeasurements.braise" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Outseam</label>
                        <input type="text" v-model="pantMeasurements.Outseam" />
                    </div>
                    <!-- Add more fields for the second section as needed -->
                </div>
            </div>
            <button @click="previousStep">Previous</button>
            <button @click="submitForm">Submit</button>
        </div>
    </div>
</template>
  
<script>
import OrderService from "../services/order.service"
export default {
    data() {
        return {
            currentStep: 1,
            customerInfo: {
                name: "",
                email: "",
                phone: "",
            },
            shirtMeasurements: {
                length: 0,
                neck: 0,
                waist: 0,
                left_sleeve: 0,
                right_sleeve: 0,
                left_cuff: 0,
                right_cuff: 0,
                chest: 0,
                shoulder: 0,
                notes: "",

            },
            pantMeasurements: {
                waist: 0,
                hip: 0,
                rise:0,
                inseam: 0,
                opening:0,
                Outseam:0,
                braise:0,
                fraise:0,
                knee:0,

            },
        };
    },
    methods: {
        nextStep() {
            this.currentStep++;
        },
        previousStep() {
            this.currentStep--;
        },
        submitForm() {
            // Handle form submission
            console.log("Form submitted!");
            let requestObj = {
                customer: this.customerInfo,
                shirt: this.shirtMeasurements,
                pant: this.pantMeasurements
            }
            OrderService.createOrder(requestObj).then(
                (response) => {
                    console.log("ggggggg" + JSON.stringify(response));
                    this.message = response.message;
                    this.loading = false;
                    this.$router.push("/customer");
                },
                (error) => {
                    this.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },
};
</script>
  
<style scoped>
template {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    justify-content: center;
}

.form-group {
    margin-bottom: 20px;
}


.shirt-form-section {
    flex: 1;
    gap: 20px;
}

.shirt-form-group {
    margin-bottom: 10px;
    size: 50%;
    padding-right: 20px;
}


label {
    font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="email"],
input[type="tel"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background-color: #45a049;
}
</style>
  