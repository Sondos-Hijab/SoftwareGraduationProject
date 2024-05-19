import 'dart:io';

import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class MessagesDatasource {
  CRUDRequests crud;

  MessagesDatasource(this.crud);

  getChatPartners(String authToken, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.fetchUserChatPartners, {"userName": username}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  getChatMessages(
      String authToken, String username, String businessName) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.fetchChatMessages,
        {"userName": username, "businessName": businessName},
        authToken);
    return response.fold((l) => l, (r) => r);
  }

  sendChatMessages(String authToken, String username, String businessName,
      String sender, String text, File? photo) async {
    var response = await crud.postPhotoDataWithAuthorization(
        AppLink.addChatMessage,
        photo != null
            ? {
                "userName": username,
                "businessName": businessName,
                "sender": sender,
                "text": text,
                "photo": photo.path
              }
            : {
                "userName": username,
                "businessName": businessName,
                "sender": sender,
                "text": text,
              },
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
