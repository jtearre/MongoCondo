
function sendEmail() {
  const recipient = document.getElementById("recipient").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_r9gr1w7", "template_w0ef0uq", {
    recipient_email: recipient,
    message_content: message
  }, "q20xTMI3E1Pn9hm6s")
  .then(response => {
    alert("Email sent successfully!");
    console.log("Success:", response.status, response.text);
  })
  .catch(error => {
    alert("Failed to send email.");
    console.error("Error:", error);
  });
}
