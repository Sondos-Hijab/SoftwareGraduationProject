import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class VerifyCodeDataSource {
  CRUDRequests crud;

  VerifyCodeDataSource(this.crud);

  postDataWithAuthorization(String authToken, String verifyCode) async {
    var response = await crud.postDataWithAuthorization(
        AppLink.verifyCode,
        {
          "otp": verifyCode,
        },
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
