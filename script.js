document.addEventListener("DOMContentLoaded", () => {
  const payButton = document.getElementById("payButton");

  if (payButton) {
    console.log("Pay button found:", payButton);
    payButton.addEventListener("click", async () => {
      console.log("Pay button clicked, creating payment...");
      try {
        const paymentData = {
          amount: 1, // amount in Pi
          memo: "Test payment from YASA TASKER",
          metadata: { jobId: "1234" }
        };

        const callbacks = {
          onReadyForServerApproval: async (paymentId) => {
            console.log("Ready for server approval:", paymentId);
          },
          onReadyForServerCompletion: async (paymentId, txid) => {
            console.log("Ready for server completion:", paymentId, txid);
          },
          onCancel: (paymentId) => {
            console.log("Payment cancelled:", paymentId);
          },
          onError: (error, payment) => {
            console.error("Payment error:", error, payment);
          }
        };

        Pi.createPayment(paymentData, callbacks);
      } catch (err) {
        console.error("Payment failed:", err);
      }
    });
  } else {
    console.error("Pay button NOT found in DOM");
  }
});
