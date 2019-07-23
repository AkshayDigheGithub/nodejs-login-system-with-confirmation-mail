import nodemailer from 'nodemailer';
import { devConfig } from '../../config/env/development.config'

const transporter = nodemailer.createTransport({
    service: 'gmail',//smtp.gmail.com  //in place of service use host...
    secure: false,//true
    port: 25,//465
    auth: {
        user: devConfig.email.user,
        pass: devConfig.email.password
    }, tls: {
        rejectUnauthorized: false
    }
});

export default {

    async sendEmail(mailOptions, req, res) {
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
                // return res.send(err)
            }
            else {
                console.log(info);
                // return res.send(info)
            }
        })
    }

}