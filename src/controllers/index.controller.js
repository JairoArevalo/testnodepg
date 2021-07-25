const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '0012',
    database: 'test',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM adm.paciente ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM adm.usuario WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, correo } = req.body;
    console.log("Respuesta ", req.body);
    const response = await pool.query('INSERT INTO adm.usuario (nombre, correo) VALUES ($1, $2)', [name, correo]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {name, correo}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, correo } = req.body;

    const response =await pool.query('UPDATE adm.usuario SET name = $1, correo = $2 WHERE id = $3', [
        name,
        correo,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM adm.usuario where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};