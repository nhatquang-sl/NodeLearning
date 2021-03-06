import { Request, Response } from 'express';
import Employee from '../model/Employee';

const getAllEmployees = async (req: Request, res: Response) => {
  const employees = await Employee.find();
  res.json(employees);
};

const createNewEmployee = async (req: Request, res: Response) => {
  if (!req?.body?.firstName || !req?.body?.lastName) {
    return res.status(400).json({ message: 'First and last names are required' });
  }

  try {
    const result = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req: any, res: Response) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: `ID parameter is required`
    });
  }

  const employee = await Employee.findOne({
    _id: req.body.id
  }).exec();
  if (!employee) {
    return res.status(404).json({
      message: `Employee ID ${req.body.id} not found`
    });
  }

  if (req.body?.firstName) employee.firstName = req.body.firstName;
  if (req.body?.lastName) employee.lastName = req.body.lastName;
  const result = await employee.save();
  console.log(result);
  res.json(result);
};

const deleteEmployee = async (req: any, res: Response) => {
  if (!req?.body?.id) {
    return res.status(400).json({
      message: `ID parameter is required`
    });
  }
  const employee = await Employee.findOne({
    _id: req.body.id
  }).exec();
  if (!employee) {
    return res.status(404).json({
      message: `Employee ID ${req.body.id} not found`
    });
  }

  const result = await employee.deleteOne({
    _id: req.body.id
  });
  res.json(result);
};

const getEmployee = async (req: any, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      message: `ID parameter is required`
    });
  }

  const employee = await Employee.findOne({
    _id: req.params.id
  }).exec();
  if (!employee) {
    return res.status(404).json({
      message: `Employee ID ${req.params.id} not found`
    });
  }

  res.json(employee);
};

export default {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};
