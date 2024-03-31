module.exports = (app) => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/register', controller.login.register);
    router.post('/login', controller.login.login);
    router.get('/verifyToken', controller.login.verifyToken);
    router.get('/wxLogin', controller.login.wxLogin);
    router.post('/wx/user/setting', controller.user.setUser);
    router.get('/wx/user/getInfo', controller.user.getUser);
    router.get('/wx/project/list', controller.project.list);
    router.get('/wx/project/detail', controller.project.detail);
};