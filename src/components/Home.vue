<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Order Details</h3>
      <table class="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Contact Number</th>
            <th>Order Date</th>
            <th>Deliver Date</th>
            <th>Status</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="order-item"
            v-for="orderData in orderDetails"
            :key="orderData.order.id"
            @click="toggleDetails(orderData.order.id)"
          >
            <td>{{ orderData.order.id }}</td>
            <td>{{ orderData.customer.name }}</td>
            <td>{{ orderData.customer.phone }}</td>
            <td>{{ orderData.order.createDate }}</td>
            <td>{{ orderData.order.deliverDate }}</td>
            <td><button
                class="btn-view-details"
                @click="changeStatus(orderData.order.id)"
              >
              {{ orderData.order.orderStatus }}
              </button>
            </td>
            <td>
              <button
                class="btn-download-pdf"
                @click="downloadPDF(orderData)"
              >
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <teleport to="body">
        <div v-if="selectedOrderId" class="modal-wrapper">
          <div class="modal-overlay"></div>
          <div class="modal-content">
            <div class="customer-info">
              <p><strong>Customer Name:</strong> {{ selectedOrder.customer.name }}</p>
              <p><strong>Email:</strong> {{ selectedOrder.customer.email }}</p>
              <p><strong>Phone:</strong> {{ selectedOrder.customer.phone }}</p>
            </div>
            <div class="shirt-info">
              <h5>Shirt Details</h5>
              <p><strong>Length:</strong> {{ selectedOrder.shirt.length }}</p>
              <!-- Display more shirt properties as needed -->
            </div>
            <div class="pant-info">
              <h5>Pant Details</h5>
              <p><strong>Waist:</strong> {{ selectedOrder.pant.waist }}</p>
              <!-- Display more pant properties as needed -->
            </div>
            
            <button @click="closeModal">Close Modal</button>
          </div>
        </div>
      </teleport>
    </header>
  </div>
</template>

<script>
import OrderService from "../services/order.service";
import jsPDF from "jspdf";
export default {
  name: "Home",
  data() {
    return {
      orderDetails: [],
      selectedOrderId: false,
    };
  },
  mounted() {
    OrderService.fetchAllOrder().then(
      (response) => {
        console.log(JSON.stringify(response));
        this.orderDetails = response;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    selectedOrder() {
      return this.orderDetails.find(
        (orderData) => orderData.order.id === this.selectedOrderId
      );
    },
  },
  methods: {
    toggleDetails(orderId) {
      this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
    },
    closeModal(){
      this.selectedOrderId = false;
    },

    downloadPDF(orderData) {
      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Set initial y position for the first section
      let yPos = 20;

      // Generate the PDF content for customer information section
      doc.setFontSize(18);
      doc.text("Customer Information", 10, yPos);
      doc.setFontSize(12);
      doc.text(`Customer Name: ${orderData.customer.name}`, 10, yPos + 10);
      doc.text(`Email: ${orderData.customer.email}`, 10, yPos + 20);
      doc.text(`Phone: ${orderData.customer.phone}`, 10, yPos + 30);

      // Update the y position for the next section
      yPos += 60;

      // Generate the PDF content for pant and shirt details section
      doc.setFontSize(18);
      doc.text("Pant and Shirt Details", 10, yPos);
      doc.setFontSize(12);
      doc.text(`Shirt Length: ${orderData.shirt.length}`, 10, yPos + 10);
      // Add more shirt details as needed
      doc.text(`Pant Waist: ${orderData.pant.waist}`, 10, yPos + 20);
      // Add more pant details as needed

      // Save the PDF file
      doc.save("order_details.pdf");
    },
    changeStatus(orderId){
      OrderService.assignOrder(orderId).then(
                (response) => {
                    console.log("ggggggg" + JSON.stringify(response));
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
    }
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
}

.jumbotron {
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  height: 30px;
}

table {
  border-collapse: collapse;
  width: 100%;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  text-align: left;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}

table th {
  background-color: #6c7ae0;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #ccc;
}

table tr:hover td {
  background-color: #ecf2ff;
}

table td {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
}
span {
  padding-left: 5px;
}
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
}
</style>
