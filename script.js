document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginButton");
  const payButton = document.getElementById("payButton");

  // Login handler
  loginButton.addEventListener("click", async () => {
    try {
      const scopes = ["username", "payments"];
      const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log("Login successful:", authResult);
      alert(`Welcome ${authResult.user.username}!`);
    } catch (err) {
      console.error("Login failed:", err);
    }
  });

  // Pay with Pi handler
  payButton.addEventListener("click", async () => {
    try {
      const paymentData = {
        amount: 1, // amount in Pi
        memo: "Test payment from YASA TASKER", // transaction note
        metadata: { jobId: "1234" } // extra info (optional)
      };

      const callbacks = {
        onReadyForServerApproval: async (paymentId) => {
          console.log("Ready for server approval:", paymentId);
          try {
            const resp = await fetch('/api/approve', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId })
            });
            const data = await resp.json();
            console.log('Server approve response:', data);
          } catch (err) {
            console.error('Error calling /api/approve', err);
          }
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("Ready for server completion:", paymentId, txid);
          try {
            const resp = await fetch('/api/complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId, txid })
            });
            const data = await resp.json();
            console.log('Server complete response:', data);
          } catch (err) {
            console.error('Error calling /api/complete', err);
          }
        },
        onCancel: (paymentId) => {
          console.log("Payment cancelled:", paymentId);
        },
        onError: (error, payment) => {
          console.error("Payment error:", error, payment);
        }
      };

      // Create the payment request
      Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  });

  // Handle any incomplete payments (optional but recommended)
  async function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment found:", payment);
  }
});