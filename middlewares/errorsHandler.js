const fs = require("fs");
const path = require("path");

/**
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (err, req, res, next) {

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  const status = err.status;

  res.format({
    json: () => {
      res.status(status).json({
        message: "BEEEP BOOOOP BEEEP ERROR!!",
        error: err.message
      });
    }
  });
};
