document.getElementById('emailForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const recipient = document.getElementById('recipient').value;
  const message = document.getElementById('message').value;

  const data = {
    sender: { email: "jeremy.hinman@gmail.com" }, // Your verified sender email in Brevo
    to: [{ email: recipient }],
    subject: "Message from Your Webpage",
    htmlContent: `<p>${message}</p>`
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`, // Replace with your Brevo API key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      console.error('Failed to send email', await response.json());
      alert('Failed to send email. Please check the console for details.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending the email.');
  }
});
