<template>
    <div class="form-container">

        <div v-if="currentStep === 1">
            <h2>Customer Information</h2>
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
            <button class="btn" @click="nextStep">Next</button>
        </div>

        <div v-if="currentStep === 2" class="width500">
            <h2>Shirt Styling</h2>
            <div class="form-container">
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtSize">Fit</label>
                        <select v-model="shirtMeasurements.fit" class="form-select" aria-label="Default select example">
                            <option value="slim">Slim Fit</option>
                            <option value="regulat">Regulat Fit</option>
                        </select>
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Sleves</label>
                        <select v-model="shirtMeasurements.sleves" class="form-select" aria-label="Default select example">
                            <option value="full">Full Sleves</option>
                            <option value="half">Half Sleves</option>
                        </select>
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Collar</label>
                        <select v-model="shirtMeasurements.collar" class="form-select" aria-label="Default select example">
                            <option value="cointed_collar">Pointed Collar</option>
                            <option value="cutway_collar">Cutway Collar</option>
                            <option value="bind_collar">PoiBindnted Collar</option>
                            <option value="bow_collar">BOW Collar</option>
                        </select>
                    </div>
                </div>
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtSize">Pocket</label>
                        <select v-model="shirtMeasurements.pocket" class="form-select" aria-label="Default select example">
                            <option value="chest">Chest</option>
                            <option value="inside">Inside</option>
                            <option value="no">No Pocket</option>
                        </select>
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Cuff</label>
                        <select v-model="shirtMeasurements.cuff" class="form-select" aria-label="Default select example">
                            <option value="regular">Regular</option>
                            <option value="double">Double</option>
                        </select>
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Placket</label>
                        <select v-model="shirtMeasurements.placket" class="form-select" aria-label="Default select example">
                            <option value="cover">Cover Placket</option>
                            <option value="front">front Placket</option>
                            <option value="inside">inside Placket</option>
                        </select>
                    </div>
                   
                </div>
            </div>
            <button class="btn btn-side" @click="previousStep">Previous</button>
            <button class="btn btn-side" @click="nextStep">Next</button>
        </div>

        <div v-if="currentStep === 3" class="width500">
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
                        <label for="shirtSize">Front Length</label>
                        <input type="text" v-model="shirtMeasurements.length" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSize">Chest</label>
                        <input type="text" v-model="shirtMeasurements.chest_size" />
                    </div>
                    <!-- Add more fields for the first section as needed -->
                </div>

                <!-- Second Section -->
                <div class="shirt-form-section">
                    <div class="shirt-form-group">
                        <label for="shirtLength">Sleeve</label>
                        <input type="number" v-model="shirtMeasurements.sleves_length" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Cuff</label>
                        <input type="number" v-model="shirtMeasurements.cuff_size" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Seat</label>
                        <input type="number" v-model="shirtMeasurements.seat" />
                    </div>
                    <div class="shirt-form-group">
                        <label for="shirtSleeve">Notes</label>
                        <input type="text" v-model="shirtMeasurements.notes" />
                    </div>
                    <!-- Add more fields for the second section as needed -->
                </div>
            </div>
            <button class="btn btn-side" @click="previousStep">Previous</button>
            <button class="btn btn-side" @click="submitForm">Submit</button>
        </div>



        <div v-if="currentStep === 4" class="width500">
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
            <button class="btn btn-side" @click="previousStep">Previous</button>
            <button class="btn btn-side" @click="submitForm">Submit</button>
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
                fit: "",
                sleves: "",
                collar: "",
                cuff: "",
                placket: "",

                length: 0,
                neck: 0,
                waist: 0,
                sleves_length: 0,
                cuff_size: 0,
                chest_size: 0,
                shoulder: 0,
                notes: "",
                seat: 0,

            },
            pantMeasurements: {
                waist: 0,
                hip: 0,
                rise: 0,
                inseam: 0,
                opening: 0,
                Outseam: 0,
                braise: 0,
                fraise: 0,
                knee: 0,

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
                    this.message = response.message;
                    this.loading = false;
                    this.$router.push("/home");
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
  
  