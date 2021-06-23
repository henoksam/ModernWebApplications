const router = require("express").Router();

const studentController = require("../controller/studentController");
const adressController = require("../controller/adress-controller.js");

router
  .route("/students")
  .get(studentController.getStudents)
  .post(studentController.addAStudent);

router
  .route("/students/:studentId")
  .get(studentController.getAStudent)
  .put(studentController.updateAStudent)
  .delete(studentController.deleteAStudent);

//addresses
router
  .route("/students/:studentId/addresses")
  .get(adressController.getAddresses)
  .post(adressController.addAnAddress);

router
  .route("/students/:studentId/addresses/:addressId")
  .get(adressController.getAnAddress)
  .put(adressController.updateAnAddress)
  .delete(adressController.deleteAnAddress);

module.exports = router;
