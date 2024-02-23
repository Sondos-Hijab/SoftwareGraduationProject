import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class VerifyCodeDataSource {
  CRUDRequests crud;

  VerifyCodeDataSource(this.crud);

  postData(String email, String verifyCode) async {
    var response = await crud.postData(AppLink.verifyCode, {
      "email": email,
      "verifyCode": verifyCode,
    });
    return response.fold((l) => l, (r) => r);
  }
}
