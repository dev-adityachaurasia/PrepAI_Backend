import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config({});

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API_KEY;

export const otpVerify = async (req, res) => {
  const { name, email } = req.body;
  const OTP = Math.floor(1000 + Math.random() * 9000);
  // Define the transactional email API instance
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  // Define your email data
  let sendSmtpEmail = {
    to: [
      {
        email: email, // Replace with recipient's email address
        name: name, // Optional recipient's name
      },
    ],
    sender: {
      email: "adityachaurasia14322@gmail.com", // Replace with your verified email address
      name: "Prep Ai", // Optional sender's name
    },
    subject: "OTP Verification",
    textContent: "OTP Verification Code !",
    htmlContent: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      /* White Background */
      color: #333;
      /* Dark Text */
      text-align: center;
    }

    .container {
      max-width: 500px;
      margin: 40px auto;
      background: #ffffff;
      /* White Background */
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(157, 111, 236, 0.2);
      /* Light Purple Glow */
      text-align: center;
    }

    h1 {
      color: #9D6FEC;
      /* Light Purple */
    }

    p {
      color: #333;
      /* Dark Text */
    }

    .otp {
      display: inline-block;
      padding: 15px 20px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      background-color: #9D6FEC;
      /* Light Purple Background */
      border-radius: 5px;
      margin: 20px 0;
    }

    .footer {
      font-size: 14px;
      color: #555;
      margin-top: 20px;
    }

    .social-icons {
      margin-top: 20px;
    }

    .social-icons a {
      margin: 0 10px;
      display: inline-block;
    }

    .social-icons img {
      width: 32px;
      height: 32px;
    }

    @media (max-width: 600px) {
      .container {
        width: 90%;
        padding: 15px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Welcome to Prep Ai!</h1>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Your OTP for verification is:</p>
    <div class="otp">${OTP}</div>
    <p>If you did not request this OTP, please ignore this email.</p>
    <footer class="footer">
      Best regards,<br />The Prep Ai Team
      <div class="social-icons">
        <a href="https://www.instagram.com/yourprofile" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/in/yourprofile" target="_blank">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
        </a>
      </div>
    </footer>
  </div>
</body>

</html>`,
  };

  // Send the email
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      return res.status(200).json({
        otp: OTP,
        success: true,
      });
    },
    function (error) {
      console.log(error);
      return false;
    }
  );
};
export default otpVerify;
