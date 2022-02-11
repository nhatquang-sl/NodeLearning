import express from 'express';
import employeesController from '../../controllers/employeesController';
import ROLES from '../../config/roles';
import verifyRoles from '../../middleware/verifyRoles';
const router = express.Router();

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(verifyRoles([ROLES.ADMIN, ROLES.EDITOR]), employeesController.createNewEmployee)
  .put(verifyRoles([ROLES.ADMIN, ROLES.EDITOR]), employeesController.updateEmployee)
  .delete(verifyRoles([ROLES.ADMIN]), employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);

export default router;
