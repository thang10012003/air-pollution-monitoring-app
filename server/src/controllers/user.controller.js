const  sendEmail = require('../utils/sendEmail')
const sendEmailUser = async(req, res) => {
      try {
        const { email, name, text} = req.body; // Lấy dữ liệu từ request
        console.log(email)
        await sendEmail.sendEmailToUser(email, name, text); // Gửi email
        res.status(200).json({ message: 'Email sent successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error });
      }
  };

module.exports = {sendEmailUser}