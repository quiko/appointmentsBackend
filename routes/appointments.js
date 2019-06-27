const router = require("express-promise-router")();
const appointmentController = require("../controllers/appointments");

router.get("/list", appointmentController.list);
router.post("/add", appointmentController.add);
router
  .route("/edit/:id")
  .get(appointmentController.show)
  .post(appointmentController.edit);
router.get("/delete/:id", appointmentController.delete);

module.exports = router;
