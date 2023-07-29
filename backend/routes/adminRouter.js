const router = require('express').Router();

const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');

const auth = require('../middleware/Auth');

router.route('/auth').post(adminController.sendCurrentUser);

// register new admin
router
  .route('/register')
  .post(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    adminController.registerAdmin
  );

// login admin
router.route('/login').post(adminController.loginAdmin);

// logout admin
router.route('/logout').get(adminController.logoutAdmin);

// get all admin details
router
  .route('/users')
  .get(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    adminController.getAllAdminDetails
  );

// get single admin details
router
  .route('/users/:id')
  .get(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    adminController.getSingleAdminDetails
  )
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    adminController.updateAdminPrivilege
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    adminController.deleteAdmin
  );

// create a new product
router
  .route('/product/new')
  .post(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    productController.createProduct
  );

// send, update, delete a single product
router
  .route('/product/:id')
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('moderate', 'manager'),
    productController.updateProduct
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    productController.deleteProduct
  );

// delete product reviews
router
  .route('/product/review/:id')
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('manager'),
    productController.deleteReview
  );



module.exports = router;
