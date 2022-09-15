const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../shared/errors");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  let costomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something went Wrong try again later ",
  };
  if (err.name === "CastError") {
    costomError.msg = `NO ITEM FOUND WITH ID:${err.value}`;
    costomError.statusCode = 404;
  }
  if (err.name === "ValidationError") {
    costomError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    costomError.statusCode = 400;
  }

  // if (err instanceof CustomAPIError){
  //   return res.status(err.statusCodes).send(err.message)
  // }
  return res.status(costomError.statusCode).send(costomError.msg);
};
module.exports = errorHandlerMiddleware;
