const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');



exports.sendMail = (config, req, res) => {
  cors(req, res, () => {

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.mail.user,
        pass: config.mail.password
      }
    })
    const mailOptions = {
      from: `Club de Algoritmia CUCEI <${config.mail.user}>`,
      to: "erickp.borquez@alumnos.udg.mx",
      subject: 'wey que onda jeje', // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
            <br />
            <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
        ` // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send('Sended');
    });
  });
}