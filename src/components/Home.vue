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
            <th>Details</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr class="order-item" v-for="orderData in orderDetails" :key="orderData.order.id">
            <td>{{ orderData.order.id }}</td>
            <td>{{ orderData.customer.name }}</td>
            <td>{{ orderData.customer.phone }}</td>
            <td>{{ orderData.order.createDate }}</td>
            <td>{{ orderData.order.deliverDate }}</td>
            <td><button class="btn btn:hover" @click="changeStatus(orderData.order.id)">
                {{ orderData.order.orderStatus }}
              </button>
            </td>
            <td>
              <button class="btn btn:hover" @click="toggleDetails(orderData.order.id, $event)">
                View
              </button>
            </td>
            <td>
              <button class="btn btn:hover" @click="downloadPDF(orderData)">
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <teleport to="body">
        <div v-if="selectedOrderId" class="modal-wrapper">
          <div class="modal" :class="{ 'is-active': selectedOrderId }">
            <div class="modal-background"></div>
            <div class="modal-content">
              <div class="customer-info">
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> {{ selectedOrder.customer.name }}</p>
                <p><strong>Email:</strong> {{ selectedOrder.customer.email }}</p>
                <p><strong>Phone:</strong> {{ selectedOrder.customer.phone }}</p>
              </div>
              <div class="order-info">
                <h2>Order Information</h2>
                <p><strong>Order Id:</strong> {{ selectedOrder.order.orderId }}</p>
                <p><strong>Created Date</strong> {{ selectedOrder.order.createDate }}</p>
                <p><strong>Delivery Date:</strong> {{ selectedOrder.order.deliverDate }}</p>
              </div>
              <div class="measurements">
                <div class="shirt-measurements">
                  <h2>Shirt Measurements</h2>
                  <ul class="measurements-grid">
                    <li><strong>Fit:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Sleeves:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Collar:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Cuff:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Placket:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Length:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Neck:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Waist:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Sleeve Length:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Cuff Size:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Chest Size:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Shoulder:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Seat:</strong> {{ selectedOrder.shirt.length }}</li>
                    <li><strong>Notes:</strong> {{ selectedOrder.shirt.length }}</li>
                  </ul>
                </div>
                <!--<div class="pant-measurements">
          <h2>Pant Measurements</h2>
          <p><strong>Waist:</strong> {{ selectedOrder.pant.length }}</p>
          <p><strong>Hip:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Rise:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Inseam:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Opening:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Outseam:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Braise:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Fraise:</strong> {{ selectedOrder.shirt.length }}</p>
          <p><strong>Knee:</strong> {{ selectedOrder.shirt.length }}</p>
        </div>-->
                <div>
                  <button class="center btn" @click="closeModal">Close</button>
                </div>

              </div>

            </div>

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
    toggleDetails(orderId, event) {
      event.stopPropagation();
      this.selectedOrderId = this.selectedOrderId === orderId ? null : orderId;
    },
    closeModal() {
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
    changeStatus(orderId) {
      OrderService.assignOrder(orderId).then(
        (response) => {
          console.log(response);
          //this.$router.push("/home");
          this.orderDetails = response;
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
  background-color: #443C68;
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



/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
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
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
}

.modal-close:hover {
  opacity: 1;
}

/* Section Styles */
.customer-info,
.order-info,
.measurements {
  margin-bottom: 20px;
}

.customer-info h2,
.order-info h2,
.measurements h2 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.customer-info p,
.order-info p,
.measurements p {
  margin-bottom: 5px;
}

.customer-info strong,
.order-info strong,
.measurements strong {
  font-weight: bold;
}

.center {
  align-items: center;
}


.measurements-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.measurements-grid li {
  list-style-type: none;
}

/* Adjust the styles as per your design preferences */
</style>
