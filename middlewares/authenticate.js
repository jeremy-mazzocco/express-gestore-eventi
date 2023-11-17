// const express = require("express");
// const jwt = require("jsonwebtoken");

// /**
//  * @param {express.Request} req
//  * @param {*} res
//  * @param {*} next
//  */
// module.exports = function (req, res, next) {

//   // Check if the token is present
//   const bearerToken = req.header("Authorization");
//   if (!bearerToken) {
//     throw new Error('Token assente');
//   }


//   try {
//     // Extract the token from the header
//     const token = bearerToken.split(" ")[1];

//     // Check if the token is valid
//     const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

//     // Add the user to the request object
//     req["user"] = jwtPayload


//     // go to the next phase 
//     next();

//   } catch (error) {

//     res.status(401).json({ error: 'Token di autenticazione non valido' });
//   }
// };
