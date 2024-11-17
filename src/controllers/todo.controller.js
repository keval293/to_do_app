const todoListModel = require("../models/todo.model.js");
const { StatusCodes } = require("http-status-codes");
const logger = require("../utils/logger");
const todoModuleLog = logger.getLogger("todo_controller");
const ObjectId = require("mongoose").Types.ObjectId;
const {notFoundResponse,successResponse, errorResponse} = require("../utils/response.js");
const errorHandler = require("../utils/error.js");
const { PAGE,LIMIT } = process.env;
 
  const createTodo = async (req,res) => {
    try {
      const todoList = await todoListModel.find({title:req.body.title});
      if(todoList.length > 0){
        return res.status(StatusCodes.CONFLICT).send({
            ...errorResponse("1057")
        });
      }else{
        const todo = new todoListModel(req.body);
            const savedToDoList = await todo.save();
            if(Object.keys(savedToDoList).length > 0){
              // Return the successful response with data
              return res.status(StatusCodes.OK).send({
                  savedToDoList,
                  ...successResponse("1055")
              });
            }else{
                return res.status(StatusCodes.OK).send({
                    ...notFoundResponse("1056")
                });
            }
      }
    } catch (error) {
        todoModuleLog.error(error.message);
        todoModuleLog.error(error);
        errorHandler(error);
    }
  };

  const getTodos = async (req, res) => {
    try {
      // Extract page and limit from query parameters with default values
      const page = parseInt(req.query.page, 10) || PAGE; 
      const limit = parseInt(req.query.limit, 10) || LIMIT; 
      const skip = (page - 1) * limit;
  
      // Fetch the paginated to-do list
      const todoList = await todoListModel
        .find({ isDeleted: false })
        .skip(skip)
        .limit(limit);
  
      // Count the total number of documents (for calculating total pages)
      const totalCount = await todoListModel.countDocuments({ isDeleted: false });
  
      if (todoList.length > 0) {
        // Return the successful response with paginated data
        return res.status(StatusCodes.OK).send({
          todoList,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          ...successResponse("1053"),
        });
      } else {
        return res.status(StatusCodes.OK).send({
          ...notFoundResponse("1054"),
        });
      }
    } catch (error) {
      todoModuleLog.error(error.message);
      todoModuleLog.error(error);
      errorHandler(error);
    }
  };
  
  const getTodo = async (req,res) => {
    try {
      const {id} = req.params; 
      const todo = await  todoListModel.findById({_id: new ObjectId(id),isDeleted:false});
      console.log(todo,"todo");
      if(!todo){
        // to do is not present
        return res.status(StatusCodes.BAD_REQUEST).send({
            ...notFoundResponse("1052")
        });
      }else{
          // Return the successful response with data
          return res.status(StatusCodes.OK).send({
              todo,
              ...successResponse("1051")
          });
      }
    } catch (error) {
        todoModuleLog.error(error.message);
        todoModuleLog.error(error);
    }
  };
  
  const updateTodo = async (req,res) => {
    try {
      const {id} = req.params;
      const {title,description,isCompleted,dueDate} = req.body;
      const updateToDoData = await todoListModel.findByIdAndUpdate({_id: new ObjectId(id),isDeleted:false}, 
      {$set:{
        title:title,
        description: description,
        isCompleted:isCompleted,
        dueDate:dueDate,
      }}
      , { new: true });
        if(Object.keys(updateToDoData).length === 0){
            return res.status(StatusCodes.BAD_REQUEST).send({
                ...errorResponse("1060")
            });
        }else{
            return res.status(StatusCodes.OK).send({
              updateToDoData,
                ...successResponse("1059")
            });
        }
    } catch (error) {
      todoModuleLog.error(error.message);
      todoModuleLog.error(error);
      errorHandler(error);
    }
  };

  const deleteTodo = async (req,res) => {
    try {
      const {id} = req.params; 
      const deletedToDo = await todoListModel.findByIdAndUpdate(id,{isDeleted: true},{new : true});
      if(!deletedToDo){
        // to do is not present
        return res.status(StatusCodes.BAD_REQUEST).send({
            ...notFoundResponse("1059")
        });
      }else{
          // Return the successful response with data
          return res.status(StatusCodes.OK).send({
            deletedToDo,
              ...successResponse("1058")
          });
      }
    } catch (error) {
        todoModuleLog.error(error.message);
        todoModuleLog.error(error);
        errorHandler(error);
    }
  };

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
}
  