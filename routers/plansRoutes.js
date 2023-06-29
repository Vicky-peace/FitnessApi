import {getAllplans,getPlanById,choosePlan} from '../controllers/plansController.js';
import { loginRequired,login } from '../controllers/userController.js';


const plansRoutes = (app) => {
    app.route('/plans')
      .get(getAllplans)

      app.route("/plans/:plan_id")
      .get(getPlanById)
      .put()
      .delete()


      app.route("/plans/choose")
      .post(loginRequired,choosePlan)
}
export default plansRoutes;