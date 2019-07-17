import User from './user.model';
import userService from './user.service';
import jwt from '../../helpers/jwt';
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
            const authenticated = userService.comparePassword(value.password, user.password)
            if (!authenticated) {
                return res.status(401).json({ err: 'unauthorized' })
            }
            // return res.json(user)
            const token = jwt.issue({ id: user._id }, '1d');
            return res.json({ token })

        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },

    // get user by token 
    async authenticate(req, res) {
        res.json(req.user);
    },

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