import User from './user.model';
import userService from './user.service';
import _jwt from '../../helpers/jwt';
import mail from '../../helpers/mail';
import jwt from 'jsonwebtoken'
import { devConfig } from '../../../config/env/development.config';
export default {
    // signup user
    async signup(req, res) {
        try {

            const { value, error } = userService.validationSignup(req.body);
            if (error) {
                return res.status(400).json(error);
            }
            value.password = userService.encryptPassword(value.password);
            const user = await User.create(value);
            const token = _jwt.issue({ id: user._id }, '3d');
            const verficationLink = "http://localhost:3000/api/users/verify?key=" + token;
            console.log("link: ", verficationLink)
            var mailOptions = {
                from: devConfig.email.user,
                to: user.email,
                subject: 'Please confirm your email ',
                text: 'click on link' + verficationLink
            };

            mail.sendEmail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.json({ success: true })

        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },


    // login 

    async login(req, res) {
        try {
            const { value, error } = userService.validationLogin(req.body);
            if (error) {
                return res.status(400).json(error);
            }
            const user = await User.findOne({ email: value.email });
            if (!user) {
                return res.status(401).json({ err: 'unauthorized' })
            }
            if (!user.active) {
                return res.status(401).json({ err: 'please verify your email address' })
            }
            const authenticated = userService.comparePassword(value.password, user.password)
            if (!authenticated) {
                return res.status(401).json({ err: 'unauthorized' })
            }
            // return res.json(user)
            const token = _jwt.issue({ id: user._id }, '1d');
            return res.json({ token })

        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },

    // after click on email confirmation mail
    async verifyUserEmail(req, res) {
        jwt.verify(req.query.key, devConfig.secret, (err, decoded) => {
            if (err) {
                return res.send(err);
            }
            // return res.json(decoded.id);
            User.findByIdAndUpdate(decoded.id, { active: true }, { new: true }, (err, userResponse) => {
                if (err) {
                    return res.send(err)
                }
                return res.send(userResponse);
            })
        });
    },

    // get user by token 
    async authenticate(req, res) {
        res.json(req.user);
    },

    //  update user details after user login
    updateMe(req, res) {
        const query = { _id: req.user._id };
        try {
            const { value, error } = userService.validationUpdateMe(req.body);
            if (error) {
                return res.status(400).json(error);
            }
            User.findOneAndUpdate(query, value, (error, response) => {
                if (error) {
                    return res.status(500).send(error)
                }
                return res.json(response);
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },

    // get all users 
    async getAllUser(req, res) {
        let userObj;
        try {
            const users = await User.find();
            if (!users) {
                return res.status(200).json({});
            }
            const count = await User.count({});
            userObj = {
                user: users,
                count: count
            }
            return res.json(userObj)
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    }
}