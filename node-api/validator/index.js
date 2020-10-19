exports.createPostValidator = (req, res, next) => {
    // title
    req.check('title', "Write a title").notEmpty();
    req.check('title', "Title must be 4-150 characters").isLength({ min: 4, max: 150 });
    // body
    req.check('body', "Write a body").notEmpty();
    req.check('body', "body must be 4-2000 characters").isLength({ min: 4, max: 2000 });
    // check for errors
    const errors = req.validationErrors();
    // if error show first on as they happen
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = (req, res, next) => {
    req.check('name', "Name is required")
        .notEmpty()
        .isLength({min: 4, mac: 10})
        .withMessage("Name must be 4-10 characters");

    req.check('email')
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email address")
        .isLength({ min: 3, max: 32 })
        .withMessage("Email must be 3-32 characters");

    req.check('password', "Password is required").notEmpty();
    req.check('password')
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain at least one number");

    // check for errors
    const errors = req.validationErrors();
    // if error show first on as they happen
    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
}