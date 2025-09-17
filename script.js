document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script.js has loaded and DOM is ready");

  const loginButton = document.getElementById("loginButton");
  const payButton = document.getElementById("payButton");

  if (!loginButton) {
    console.error("❌ Login button not found!");
  } else {
    console.log("✅ Login button found");
  }

  if (!payButton) {
    console.error("❌ Pay button not found!");
  } else {
    console.log("✅ Pay button found");
  }

  // Attach events
  loginButton?.addEventListener("click", () => {
    console.log("🔑 Login button clicked");
    // Pi.authenticate()...
  });

  payButton?.addEventListener("click", () => {
    console.log("💰 Pay with Pi button clicked");
    // Pi.createPayment()...
  });
});
