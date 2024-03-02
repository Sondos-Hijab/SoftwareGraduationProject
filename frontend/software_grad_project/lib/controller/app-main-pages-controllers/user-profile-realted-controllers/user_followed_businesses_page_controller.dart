import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';

abstract class FollowedbusinessesPageController extends GetxController {
  goToBusinessPage();
}

class FollowedbusinessesPageControllerImp
    extends FollowedbusinessesPageController {
  @override
  void onInit() {
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  goToBusinessPage() {
    Get.toNamed(AppRoutes.businessPage);
  }
}
