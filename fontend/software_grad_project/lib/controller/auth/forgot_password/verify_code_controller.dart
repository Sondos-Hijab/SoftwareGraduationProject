import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/forgotPassword/verify_code_datasource.dart';

abstract class VerifyCodeController extends GetxController {
  checkCode();
  goToResetPassword(String verifyCode);
}

class VerifyCodeControllerImp extends VerifyCodeController {
  StatusRequest? statusRequest;
  VerifyCodeDataSource verifyCodeData = VerifyCodeDataSource(Get.find());

  List data = [];
  String? email;

  @override
  goToResetPassword(verifyCode) async {
    statusRequest = StatusRequest.loading;
    var response = await verifyCodeData.postData(email!, verifyCode);
    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      data.add(response);
      Get.offNamed(AppRoutes.resetPassword, arguments: {"email": email});
    } else if (StatusRequest.failure == statusRequest) {
      Get.defaultDialog(title: "Warning", middleText: "Email not found");
    }
    // Get.offNamed(AppRoutes.resetPassword, arguments: {"email": email});

    update();
  }

  @override
  checkCode() {}

  @override
  void onInit() {
    email = Get.arguments['email'];
    super.onInit();
  }
}
