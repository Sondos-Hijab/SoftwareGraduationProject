import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class SuccessSignUpController extends GetxController {
  goToLoginPage();
}

class SuccessSignUpControllerImp extends SuccessSignUpController {
  @override
  goToLoginPage() {
    Get.offNamed(AppRoutes.login);
  }
}
