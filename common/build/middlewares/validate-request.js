"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
//import { validationResult } from 'express-validator';
const request_validation_error_1 = require("../errors/request-validation-error");
const { validationResult } = require('express-validator');
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    next();
};
exports.validateRequest = validateRequest;
