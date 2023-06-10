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
            <!-- Shirt Measurements form -->
            <div class="form-group">
                <label for="shirtSize">Shirt Size</label>
                <input type="text" v-model="shirtMeasurements.size" />
            </div>
            <div class="form-group">
                <label for="shirtLength">Shirt Length</label>
                <input type="number" v-model="shirtMeasurements.length" />
            </div>
            <div class="form-group">
                <label for="shirtSleeve">Shirt Sleeve</label>
                <input type="number" v-model="shirtMeasurements.sleeve" />
            </div>
            <button @click="previousStep">Previous</button>
            <button @click="nextStep">Next</button>
        </div>

        
        <div v-if="currentStep === 3">
            <h2>Pant Measurements</h2>
            <!-- Pant Measurements form -->
            <div class="form-group">
                <label for="pantWaist">Pant Waist</label>
                <input type="number" v-model="pantMeasurements.waist" />
            </div>
            <div class="form-group">
                <label for="pantLength">Pant Length</label>
                <input type="number" v-model="pantMeasurements.length" />
            </div>
            <div class="form-group">
                <label for="pantInseam">Pant Inseam</label>
                <input type="number" v-model="pantMeasurements.inseam" />
            </div>
            <button @click="previousStep">Previous</button>
            <button @click="submitForm">Submit</button>
        </div>
    </div>
</template>
  
<script>
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
                size: "",
                length: 0,
                sleeve: 0,
            },
            pantMeasurements: {
                waist: 0,
                length: 0,
                inseam: 0,
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
        },
    },
};
</script>
  
<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
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
  