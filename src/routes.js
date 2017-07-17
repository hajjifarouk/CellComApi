const ShopController = require('./app/shop/ShopController.js');
const UserController = require('./app/user/UserController.js');
const VisitController = require('./app/visit/VisitController.js');
const ReportController = require('./app/report/ReportController.js');
const QuestionController = require('./app/question/QuestionController.js');
const ProcessController = require('./app/process/ProcessController.js');
const PlanController = require('./app/plan/PlanController.js');
const PlaceController = require('./app/place/PlaceController.js');
const FormController = require('./app/form/FormController.js');
const ChoiceController = require('./app/choice/ChoiceController.js');
const AnswerController = require('./app/answer/AnswerController.js');

module.exports = router => {
    router.get('/', (req, res) => res.send('Welcome to Cellcom !'));
    // Shop model routes
    router.get('/shop', (req, res) => ShopController.get(req, res));
    router.get('/shop/:id', (req, res) => ShopController.getOneById(req, res));
    router.get('/shop/:process', (req, res) => ShopController.getByProcess(req, res));
    router.post('/shop', (req, res) => ShopController.add(req, res));
    router.put('/shop/:id', (req, res) => ShopController.edit(req, res));
    router.delete('/shop/:id', (req, res) => ShopController.delete(req, res));
    // Visit model routes
    router.get('/visit', (req, res) => VisitController.get(req, res));
    router.get('/visit/:id', (req, res) => VisitController.getOneById(req, res));
    router.get('/visit/:process', (req, res) => VisitController.getByProcess(req, res));
    router.post('/visit', (req, res) => VisitController.add(req, res));
    router.put('/visit/:id', (req, res) => VisitController.edit(req, res));
    router.delete('/visit/:id', (req, res) => VisitController.delete(req, res));
    // Report model routes
    router.get('/report', (req, res) => ReportController.get(req, res));
    router.get('/report/:id', (req, res) => ReportController.getOneById(req, res));
    router.get('/report/:process', (req, res) => ReportController.getByProcess(req, res));
    router.post('/report', (req, res) => ReportController.add(req, res));
    router.put('/report/:id', (req, res) => ReportController.edit(req, res));
    router.delete('/report/:id', (req, res) => ReportController.delete(req, res));
    // Question model routes
    router.get('/question', (req, res) => QuestionController.get(req, res));
    router.get('/question/:id', (req, res) => QuestionController.getOneById(req, res));
    router.get('/question/:process', (req, res) => QuestionController.getByProcess(req, res));
    router.post('/question', (req, res) => QuestionController.add(req, res));
    router.put('/question/:id', (req, res) => QuestionController.edit(req, res));
    router.delete('/question/:id', (req, res) => QuestionController.delete(req, res));
    // Process model routes
    router.get('/process', (req, res) => ProcessController.get(req, res));
    router.get('/process/:id', (req, res) => ProcessController.getOneById(req, res));
    router.get('/process/:process', (req, res) => ProcessController.getByProcess(req, res));
    router.post('/process', (req, res) => ProcessController.add(req, res));
    router.put('/process/:id', (req, res) => ProcessController.edit(req, res));
    router.delete('/process/:id', (req, res) => ProcessController.delete(req, res));
    // Plan model routes
    router.get('/plan', (req, res) => PlanController.get(req, res));
    router.get('/plan/:id', (req, res) => PlanController.getOneById(req, res));
    router.get('/plan/:process', (req, res) => PlanController.getByProcess(req, res));
    router.post('/plan', (req, res) => PlanController.add(req, res));
    router.put('/plan/:id', (req, res) => PlanController.edit(req, res));
    router.delete('/plan/:id', (req, res) => PlanController.delete(req, res));
    // Place model routes
    router.get('/place', (req, res) => PlaceController.get(req, res));
    router.get('/place/:id', (req, res) => PlaceController.getOneById(req, res));
    router.get('/place/:process', (req, res) => PlaceController.getByProcess(req, res));
    router.post('/place', (req, res) => PlaceController.add(req, res));
    router.put('/place/:id', (req, res) => PlaceController.edit(req, res));
    router.delete('/place/:id', (req, res) => PlaceController.delete(req, res));
    // Form model routes
    router.get('/form', (req, res) => FormController.get(req, res));
    router.get('/form/:id', (req, res) => FormController.getOneById(req, res));
    router.get('/form/:process', (req, res) => FormController.getByProcess(req, res));
    router.post('/form', (req, res) => FormController.add(req, res));
    router.put('/form/:id', (req, res) => FormController.edit(req, res));
    router.delete('/form/:id', (req, res) => FormController.delete(req, res));
    // Choice model routes
    router.get('/choice', (req, res) => ChoiceController.get(req, res));
    router.get('/choice/:id', (req, res) => ChoiceController.getOneById(req, res));
    router.get('/choice/:process', (req, res) => ChoiceController.getByProcess(req, res));
    router.post('/choice', (req, res) => ChoiceController.add(req, res));
    router.put('/choice/:id', (req, res) => ChoiceController.edit(req, res));
    router.delete('/choice/:id', (req, res) => ChoiceController.delete(req, res));
    // Answer model routes
    router.get('/answer', (req, res) => AnswerController.get(req, res));
    router.get('/answer/:id', (req, res) => AnswerController.getOneById(req, res));
    router.get('/answer/:process', (req, res) => AnswerController.getByProcess(req, res));
    router.post('/answer', (req, res) => AnswerController.add(req, res));
    router.put('/answer/:id', (req, res) => AnswerController.edit(req, res));
    router.delete('/answer/:id', (req, res) => AnswerController.delete(req, res));
    // User model routes
    router.get('/user', (req, res) => UserController.get(req, res));
    router.get('/user/:id', (req, res) => UserController.getOneById(req, res));
    router.get('/user/:email', (req, res) => UserController.getOneByEmail(req, res));
    router.get('/user/:process', (req, res) => UserController.getByProcess(req, res));
    router.post('/user', (req, res) => UserController.add(req, res));
    router.put('/user/:id', (req, res) => UserController.edit(req, res));
    router.put('/user/:email', (req, res) => UserController.editByEmail(req, res));
    router.delete('/user/:id', (req, res) => UserController.delete(req, res));
    router.put('/user/:id', (req, res) => UserController.changePassword(req, res));
    router.post('/user/:id/password', (req, res) => UserController.resetPassword(req, res));
    router.post('/login', (req, res) => UserController.login(req, res));
    router.post('/register', (req, res) => UserController.register(req, res));

}