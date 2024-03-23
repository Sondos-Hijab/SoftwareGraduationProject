import 'package:get/get.dart';
import 'package:software_grad_project/core/services/service.dart';

abstract class UserFeedbackPageController extends GetxController {}

class UserFeedbackPageControllerImp extends UserFeedbackPageController {
  final myServices = Get.find<MyServices>();

  @override
  void onInit() {
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
  }
}
