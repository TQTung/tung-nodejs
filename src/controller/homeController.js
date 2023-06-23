import pool from "../configs/connectDB";

const getHomePage = async (_req, res) => {
  const [datas, _fields] = await pool.execute(`SELECT * FROM users`);
  return res.render("index.ejs", { dataUser: datas });
};

const getDetailPage = async (req, res) => {
  const { id } = req.params;
  const [user] = await pool.execute(`select * from users where id = ?`, [id]);
  return res.send(JSON.stringify(user));
};

const createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `insert into users(firstName, lastName, email,address) values (?,?,?,?)`,
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  await pool.execute(`delete from users where id = ?`, [userId]);
  return res.redirect("/");
};

const getEdituser = async (req, res) => {
  const { id } = req.params;
  const [user] = await pool.execute(`select * from users where id = ?`, [id]);
  return res.render("update.ejs", { dataUser: user[0] });
};

const postUpdateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    `update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`,
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

const getUploadFilePage = (_req, res) => {
  return res.render("uploadFile.ejs");
};

const handleUploadFile = (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
  res.send(
    `you have uploaded this image:
     <hr><img src="/images/${req.file.filename}" width="300" /></hr>
     <a href="/upload">Upload another image</a>
    `
  );
};

const handleUploadMultipleFiles = (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};

export {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEdituser,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultipleFiles,
};
