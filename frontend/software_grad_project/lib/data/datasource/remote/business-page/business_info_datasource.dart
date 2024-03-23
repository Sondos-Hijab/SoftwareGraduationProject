import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessInfoDataSource {
  CRUDRequests crud;

  BusinessInfoDataSource(this.crud);

  getDataWithAuthorization(String authToken, String businessName) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getBusinessInfoLink, {"name": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
