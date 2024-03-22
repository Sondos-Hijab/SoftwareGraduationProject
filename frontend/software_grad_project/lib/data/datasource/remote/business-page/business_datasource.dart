import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessDataSource {
  CRUDRequests crud;

  BusinessDataSource(this.crud);

  getDataWithParams(String authToken, String category) async {
    var response = await crud.getDataWithParams(
        AppLink.getBusinessesByCategoryLink, {"category": category}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  searchDataWithParams(String authToken, String name) async {
    var response = await crud.getDataWithParams(
        AppLink.getBusinessByNameLink, {"name": name}, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
