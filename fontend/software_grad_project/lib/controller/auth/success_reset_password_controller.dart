import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class SuccessResetPasswordController extends GetxController {
  goToLoginPage();
}

class SuccessResetPasswordControllerImp extends SuccessResetPasswordController {
  @override
  goToLoginPage() {
    Get.offNamed(AppRoutes.login);
  }
}
