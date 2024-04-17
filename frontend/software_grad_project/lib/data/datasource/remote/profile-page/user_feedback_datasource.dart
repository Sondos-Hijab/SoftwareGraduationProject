import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class UserFeedbackDataSource {
  CRUDRequests crud;

  UserFeedbackDataSource(this.crud);

  getFeedbackWithAuthorization(String authToken, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getOtherUserFeedback, {"userName": username}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  deleteDataWithAuthorization(String authToken, int feedbackID) async {
    var response = await crud.deleteDataWithAuthorization(
        AppLink.deleteFeedbackLink, {"feedbackID": feedbackID}, authToken);
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
