const dotenv = require('dotenv');
const sha1 = require('sha1');


dotenv.config();

module.exports = {
    async login(req, res, knex, jwt) {
        const { email, password } = req?.body;
        let data = await knex('user').where('email', email).andWhere('password', sha1(password)).first();
        if (!data) {
            throw new Error('Unauthorized');
        } else {
            const payload = {
                user: data,
                context: data.isAdmin ? 'Admin' : 'User'
            }
            jwt.sign(payload, process.env.SV_SECRET, (err, token) => {
                if (err) {
                    throw new Error('Token could not be created');
                } else {
                    data.password = '';
                    res.send({ status: 'success', data: { token, user: data } })
                }
            })
        }
    },

    async verifyToken(req, jwt, context, knex) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const tkn = bearerHeader.split(' ')[1];
            let user = await jwt.verify(tkn, process.env.SV_SECRET, (err, tokenData) => {
                if (err) {
                    throw new Error('Unauthorized');
                } else {
                    if (tokenData.context === context || context === 'User') {
                        return tokenData.user;
                    } else {
                        return false;
                    }
                }
            })
            return user;
        } else {
            return false;
        }
    }


}