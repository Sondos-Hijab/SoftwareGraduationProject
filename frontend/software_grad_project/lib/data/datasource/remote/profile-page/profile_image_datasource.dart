import 'dart:io';

import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class ProfileImageDataSource {
  CRUDRequests crud;

  ProfileImageDataSource(this.crud);

  getDataWithOnlyAuthorization(String authToken) async {
    var response = await crud.getDataWithOnlyAuthorization(
        AppLink.getUserPictureLink, authToken);
    return response.fold((l) => l, (r) => r);
  }

  putPhotoDataWithAuthorization(File profileImage, String authToken) async {
    var response = await crud.putPhotoDataWithAuthorization(
        AppLink.addUserPictureLink,
        {"profilePicture": profileImage.path},
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
