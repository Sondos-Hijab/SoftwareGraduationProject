import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/authentication/forgotPassword/verify_code_datasource.dart';

abstract class VerifyCodeController extends GetxController {
  checkCode();
  goToResetPassword(String verifyCode);
}

class VerifyCodeControllerImp extends VerifyCodeController {
  StatusRequest? statusRequest;
  VerifyCodeDataSource verifyCodeData = VerifyCodeDataSource(Get.find());

  final myServices = Get.find<MyServices>();

  @override
  goToResetPassword(verifyCode) async {
    statusRequest = StatusRequest.loading;
    String? tempAccessToken =
        myServices.sharedPreferences.getString("tempAccessToken");

    var response = await verifyCodeData.getDataWithAuthorization(
        tempAccessToken!, verifyCode);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        Get.offNamed(AppRoutes.resetPassword);
      } else if (response['statusCode'] == "400") {
        Get.defaultDialog(title: "Warning", middleText: response['error']);
      } else if (response['statusCode'] == "403") {
        Get.defaultDialog(
            title: "Warning",
            middleText:
                "OTP code is invalid now because you spent more than 3 minutes submitting it, try again.");
      } else {
        Get.defaultDialog(
            title: "Error",
            middleText: "We are sorry, something went wrong, try again later.");
      }
      update();
    } 
  }

  @override
  checkCode() {}

  @override
  void onInit() {
    super.onInit();
  }
}
