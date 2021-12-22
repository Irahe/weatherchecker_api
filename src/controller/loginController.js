const dotenv = require('dotenv');


dotenv.config();

module.exports = {
    async login(req, res, knex, jwt) {
        const { email, password } = req?.body;
        let data = await knex('user').where('email', email).andWhere('password', password);
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
    }


}