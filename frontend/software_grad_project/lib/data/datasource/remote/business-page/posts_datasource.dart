import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessPostsDataSource {
  CRUDRequests crud;

  BusinessPostsDataSource(this.crud);

  getDataWithAuthorization(String authToken, String businessName) async {
    var response = await crud.getDataWithAuthorization(
        AppLink.getBusinessPostsLink, {"name": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
