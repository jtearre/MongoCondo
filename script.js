function sendEmail() {
  const toName = document.getElementById("to_name").value;
  const recipient = document.getElementById("recipient").value;
  const fromName = document.getElementById("from_name").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_r9gr1w7", "template_w0ef0uq", {
    to_name: toName,
    from_name: fromName,
    recipient_email: recipient,
    message: message
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
