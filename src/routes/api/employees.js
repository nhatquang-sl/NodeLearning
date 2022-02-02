const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES = require('../../config/roles');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(verifyRoles(ROLES.ADMIN, ROLES.EDITOR), employeesController.createNewEmployee)
  .put(verifyRoles(ROLES.ADMIN, ROLES.EDITOR), employeesController.updateEmployee)
  .delete(verifyRoles(ROLES.ADMIN), employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
