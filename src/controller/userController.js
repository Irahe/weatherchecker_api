const sha1 = require("sha1");

module.exports = {
    async getAll(req, res, knex) {
        const users = await knex('user').select();
        res.send({ status: "success", data: users });
    },
    async create(req, res, knex) {
        const { name, email, password, isAdmin } = req.body;
        await knex('user').insert({ name, email, password: sha1(password), isAdmin: isAdmin ? 1 : 0 })
        res.send({ status: "success", data: {} });
    },
    async update(req, res, knex) {
        const { id, name, email, password, isAdmin } = req.body;

        if (!id) {
            throw Error('User not found');
        }

        await knex('user').update({ name, email, password: sha1(password), isAdmin: isAdmin ? 1 : 0 }).where("id", id);

        res.send({ status: "success", data: {} });
    },
    async delete(req, res, knex) {
        const { id } = req.body;

        if (!id) {
            throw Error('User not found');
        }
        await knex('user').where("id", id).del();

        res.send({ status: "success", data: {} });
    }
}

