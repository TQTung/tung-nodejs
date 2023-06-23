import pool from "../configs/connectDB";

const getAllUsers = async (req, res) => {
  const [users] = await pool.execute(`SELECT * FROM users`);
  return res.status(200).json({
    message: "success",
    data: users,
  });
};

const createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing required fields params",
    });
  }
  await pool.execute(
    `insert into users(firstName, lastName, email,address) values (?,?,?,?)`,
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "success",
  });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing required fields params",
    });
  }
  await pool.execute(
    `update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`,
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "success",
  });
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(200).json({
      message: "missing required fields params",
    });
  }
  await pool.execute(`delete from users where id = ?`, [id]);
  return res.status(200).json({
    message: "success",
  });
};

export { getAllUsers, createNewUser, updateUser, deleteUser };
