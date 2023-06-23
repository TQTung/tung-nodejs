import express from "express";
import * as apiController from "../controller/apiController";

const router = express.Router();

const initApiRoute = (app) => {
  router.get("/users", apiController.getAllUsers);
  router.post("/create-user", apiController.createNewUser);
  router.put("/update-user", apiController.updateUser);
  router.delete("/delete-user/:id", apiController.deleteUser);

  return app.use("/api/v1", router);
};

export default initApiRoute;
