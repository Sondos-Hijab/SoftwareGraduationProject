import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class OtherUserInfoDataSource {
  CRUDRequests crud;

  OtherUserInfoDataSource(this.crud);

  getDataWithAuthorization(String authToken, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getOtherUserInfoLink, {"name": username}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  getFeedbackWithAuthorization(String authToken, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getOtherUserFeedback, {"userName": username}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  filterFeedbackBasedOnCategory(
      String authToken, String username, String businessCategory) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.filterFeedbackBasedOnCatgory,
        {"userName": username, "businessCategory": businessCategory},
        authToken);
    return response.fold((l) => l, (r) => r);
  }

  filterFeedbackBasedOnBusinessName(
      String authToken, String businessName, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.filterFeedbackBasedOnBusinessName,
        {"userName": username, "businessName": businessName},
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
