import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';

abstract class SuccessChangingPasswordController extends GetxController {
  goToProfilePage();
}

class SuccessChangingPasswordControllerImp
    extends SuccessChangingPasswordController {
  @override
  goToProfilePage() {
    Get.offAllNamed(AppRoutes.homeScreen);
  }
}
