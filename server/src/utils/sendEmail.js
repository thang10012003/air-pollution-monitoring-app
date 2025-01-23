const nodemailer = require('nodemailer');

// Cấu hình transporter (sử dụng SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  service: 'gmail', // Có thể thay thế bằng dịch vụ email khác
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,  // Tài khoản gửi email
    pass: process.env.EMAIL_PASS   // Mật khẩu email
  }
});

// Hàm gửi email
const sendEmailToUser = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error; // Có thể ném lỗi ra ngoài để xử lý
  }
};

module.exports = { sendEmailToUser };
