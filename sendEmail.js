// Event listener for the form submission
document.getElementById('emailForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Retrieve form data
  const toEmail = document.getElementById('toEmail').value;
  const message = document.getElementById('message').value;

  // Define parameters to send via EmailJS
  const params = {
    to_email: toEmail,
    message: message
  };

  // Send the email using EmailJS
  emailjs.send("service_hiadywa", "template_w0ef0uq", params)
    .then(function(response) {
      // Show success message
      alert('Email sent successfully!');
      console.log('Success:', response);
    }, function(error) {
      // Show error message
      alert('Failed to send email. Please try again.');
      console.error('Error:', error);
    });
});
