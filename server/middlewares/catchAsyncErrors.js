const catchAsyncErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);//If error occurs...then it will go to app.js for finding the middleware i.e. errorMiddleware
  };
};

export default catchAsyncErrors;