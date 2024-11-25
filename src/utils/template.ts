export const generateFirstLoginEmail = (
    userName: string,
    userEmail: string,
    userPassword: string,
    companyName: string
): string => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome - First Time Login</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <style>
          body {
              font-family: 'Poppins', Arial, sans-serif;
              background-color: #f4f4f7;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #DC2626;
              padding: 20px;
              text-align: center;
              color: #ffffff;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .body {
              padding: 30px;
              color: #333333;
          }
          .body h2 {
              color: #DC2626;
              font-size: 22px;
              margin-bottom: 10px;
          }
          .body p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
          }
          .credentials {
              background-color: #f4f9fc;
              padding: 20px;
              border: 1px solid #4A90E2;
              border-radius: 5px;
              color: #333333;
              display: flex;
              flex-direction: column;
          }
          .credentials p {
              margin: 0;
              font-size: 16px;
              font-weight: bold;
              display: flex;
              align-items: center;
          }
          .credentials span {
              color: #ff5c5c;
              margin-left: 8px;
          }
          .icon {
              margin-right: 10px;
              width: 20px;
              height: 20px;
          }
          .footer {
              text-align: center;
              padding: 20px;
              background-color: #f4f4f7;
              font-size: 14px;
              color: #999999;
          }
          .footer a {
              color: #4A90E2;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
  
      <div class="container">
          <div class="header">
              <h1>Welcome to ${companyName}</h1>
          </div>
          <div class="body">
              <h2>Hi ${userName},</h2>
              <p>Welcome to ${companyName}! We are excited to have you on board. Below are your login credentials for your first-time access.</p>
              
              <div class="credentials">
                  <p><img src="https://img.icons8.com/material-outlined/24/ffffff/email.png" class="icon" alt="Email Icon"/> Email: <span>${userEmail}</span></p>
                  <p><img src="https://img.icons8.com/material-outlined/24/ffffff/password.png" class="icon" alt="Password Icon"/> Password: <span>${userPassword}</span></p>
              </div>
              
              <p>Please make sure to change your password after your first login for security reasons.</p>
              <p>If you have any issues logging in, feel free to contact us at <a href="mailto:support@chitracoffeebar.com">support@chitracoffeebar.com</a>.</p>
          </div>
          <div class="footer">
              <p>Thank you for choosing ${companyName}.</p>
              <p>Visit us at <a href="https://chitracoffeebar.com">chitracoffeebar.com</a></p>
          </div>
      </div>
  
 </body>
  </html>`;
};