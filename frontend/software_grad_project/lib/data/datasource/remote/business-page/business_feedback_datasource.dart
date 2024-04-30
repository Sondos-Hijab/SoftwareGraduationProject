import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessFeedbackDataSource {
  CRUDRequests crud;

  BusinessFeedbackDataSource(this.crud);

  getDataWithAuthorization(String authToken, String businessName) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getBusinessFeedbackLink,
        {"businessName": businessName},
        authToken);
    return response.fold((l) => l, (r) => r);
  }

  filterFeedback(String authToken, String businessName, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.filterFeedbackBasedOnUsername,
        {"userName": username, "businessName": businessName},
        authToken);
    return response.fold((l) => l, (r) => r);
  }

  filterFeedbackBasedOnTone(
      String authToken, String businessName, String type) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.filterFeedbackBasedOnTone,
        {"businessName": businessName, "type": type},
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
