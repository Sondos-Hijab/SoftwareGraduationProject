import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessDataSource {
  CRUDRequests crud;

  BusinessDataSource(this.crud);

  getDataWithParams(String authToken, String category) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getBusinessesByCategoryLink, {"category": category}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  searchDataWithParams(String authToken, String name, String category,
      String country, String city) async {
    var dataToSend = <String, dynamic>{};
    dataToSend.addIf(name != "", "name", name);
    dataToSend.addIf(category != 'Select Category', "category", category);
    dataToSend.addIf(country != 'Select Country', "country", country);
    dataToSend.addIf(city != "Select City", "city", city);

    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getBusinessByNameLink, dataToSend, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
