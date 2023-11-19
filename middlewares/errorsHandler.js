const fs = require("fs");
const path = require("path");

/**
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (err, req, res, next) {

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  res.format({
    json: () => {
      res.status(status).json({
        message: "BEEEP BOOOOP BEEEP ERROR!!",
        error: message
      });
    }
  });
};
