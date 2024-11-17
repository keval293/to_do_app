const express = require("express");
const router = express.Router();
const todolistController = require("../controllers/todo.controller.js");
const validateRequest = require("../middlewares/validation.middlewares.js");
const {todoBodySchema,todoParamsSchema,todoQuerySchema} = require("../validation/todo.validation.js");

// To do list routes 

router.get("/todolist/:id",validateRequest(todoParamsSchema, 'params'),todolistController.getTodo);

router.get("/todolists", validateRequest(todoQuerySchema, 'query'),todolistController.getTodos);

router.post("/todolist", validateRequest(todoBodySchema, 'body'),todolistController.createTodo);

router.put("/todolist/:id", validateRequest(todoBodySchema, 'body'),todolistController.updateTodo);

router.delete("/todolist/:id",validateRequest(todoParamsSchema, 'params'),todolistController.deleteTodo);

module.exports = router;