export default async function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error. Please Contact Server Administrator";

  if (err.name === "ManualValidationError") {
    status = 400;
    message = `${err.val} is required`;
  }

  if (err.name === "NoImage") {
    status = 400;
    message = "Menu Image is required";
  }

  if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  }

  if (err.name === "PassNotSame") {
    status = 400;
    message = "Retyped password is not the same!";
  }

  if (err.name === "SequelizeDatabaseError" || err.name === "ReportNoDate") {
    status = 400;
    message = "Invalid input";
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    status = 400;
    message = "Cannot Delete Data!";
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Data already exists";
  }

  if (err.name === "InvalidDataType") {
    status = 400;
    message = "Invalid Data Type";
  }

  if (err.name === "EmptyLogin") {
    status = 400;
    message = `Username and Password is required`;
  }

  if (err.name === "EmptyArr") {
    status = 400;
    message = err.msg;
  }

  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Unauthorized Access. Please LogIn";
  }

  if (err.name === "InvalidLogin") {
    status = 401;
    message = `Incorrect Username or Password`;
  }

  if (err.name === "NotLoggedIn") {
    status = 401;
    message = "Unauthorized Access. Please LogIn";
  }

  if (err.name === "NoAccess") {
    status = 403;
    message = "You Do Not Have This Access!";
  }

  if (err.name === "ActiveDocument") {
    status = 403;
    message = "Cannot Delete ACTIVE Document";
  }

  if (err.name === "PostedDocument") {
    status = 403;
    message = "Cannot Modify POSTED Document";
  }

  if (err.name == "NotFound") {
    status = 404;
    message = `Data with id ${err.id} not found`;
  }

  if (err.name === "ReqNotFound") {
    status = 404;
    message = err.message;
  }

  if (err.name === "ExternalError") {
    status = 500;
    message = `OPENAI SERVER DOWN`;
  }

  console.log(err);
  res.status(status).json({
    message,
    // err
    // status,
    // err
  });
}
