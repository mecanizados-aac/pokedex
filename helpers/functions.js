exports.errorHandler = (resp, message, status = 500) => {
  resp.stastus(status).send({
    message: message,
  });
};
