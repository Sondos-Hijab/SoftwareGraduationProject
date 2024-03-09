import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BioDataSource {
  CRUDRequests crud;

  BioDataSource(this.crud);

  getDataWithOnlyAuthorization(String authToken) async {
    var response = await crud.getDataWithOnlyAuthorization(
        AppLink.getUserBioLink, authToken);
    return response.fold((l) => l, (r) => r);
  }

  putDataWithAuthorization(String bio, String authToken) async {
    var response = await crud.putDataWithAuthorization(
        AppLink.addUserBioLink, {"bio": bio}, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
