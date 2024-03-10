import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class CheckAuthenticationDataSource {
  CRUDRequests crud;

  CheckAuthenticationDataSource(this.crud);

  getDataWithOnlyAuthorization(String authToken) async {
    var response = await crud.getDataWithOnlyAuthorization(
        AppLink.checkAccessTokenLink, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
