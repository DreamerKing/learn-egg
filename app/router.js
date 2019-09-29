module.exports = app => {
    const { router, controller, config } = app;
    const gzip = app.middleware.gzip({threshold: 100 });
    router.get('/', controller.home.index);
    router.get('/:name', controller.user.info);
    router.get('/needgzip', gzip, controller.needgzip.needgzip )
}

