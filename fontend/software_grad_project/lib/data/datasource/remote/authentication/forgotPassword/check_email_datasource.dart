import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class CheckEmailDataSource {
  CRUDRequests crud;

  CheckEmailDataSource(this.crud);

  getData(String email) async {
    var response = await crud.getDate(AppLink.checkEmail, {"email": email});
    return response.fold((l) => l, (r) => r);
  }
}
