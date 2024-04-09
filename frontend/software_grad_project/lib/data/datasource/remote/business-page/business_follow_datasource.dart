import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessFollowDataSource {
  CRUDRequests crud;

  BusinessFollowDataSource(this.crud);

  follow(String authToken, String businessName) async {
    var response = await crud.postDataWithAuthorization(
        AppLink.followLink, {"businessName": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  unfollow(String authToken, String businessName) async {
    var response = await crud.deleteDataWithAuthorization(
        AppLink.unfollowLink, {"businessName": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  getFollowersNumber(String authToken, String businessName) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.followersNumberLink, {"businessName": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  getFollowers(String authToken, String businessName) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.followersLink, {"businessName": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  getFollowing(String authToken, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.followingLink, {"userName": username}, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
