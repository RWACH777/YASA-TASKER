// Get the login button from index.html
const loginButton = document.getElementById("loginButton");

// Handle login button click
loginButton.addEventListener("click", async function () {
  try {
    // Define which info you want from the user
    const scopes = ['username']; // add 'payments' if you also want to handle Pi payments

    // Call Pi.authenticate to log in
    const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);

    // Log user info
    console.log("Authenticated user:", authResult);
    alert("Welcome " + authResult.user.username + "! You are logged in.");

  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Check console for details.");
  }
});

// Called when Pi finds an incomplete payment (optional for now)
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}
