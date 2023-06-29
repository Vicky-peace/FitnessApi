import { getAllUsers,getOneUser,updateUser,deleteUser} from "../controllers/userController.js";
import { login, register,loginRequired} from '../controllers/userController.js';
const userRoutes = (app) => {
  app.route("/users")
  .get(loginRequired,getAllUsers)


  

  
    app.route("/users/:user_id")
    .get(loginRequired,getOneUser)
    .put(loginRequired,updateUser)
    .delete(loginRequired,deleteUser);

  // auth routes
    app.route('/auth/register')
       .post(register)

      app.route('/auth/login')
      .post(login)
};
export default userRoutes;