import 'dart:io';

import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/messages/messages_datasource.dart';
import 'package:flutter/material.dart';
import 'package:software_grad_project/data/model/message_model.dart';

abstract class ChatsPageController extends GetxController {
  loadMessages();
  sendMessage();
}

class ChatsPageControllerImp extends ChatsPageController {
  GlobalKey<ScaffoldState>? scaffoldKey;
  late TextEditingController messageTextController;

  // ignore: avoid_init_to_null
  late File? imageFile = null;

  //myServices
  var myServices = Get.find<MyServices>();

  //datasources
  MessagesDatasource messagesDatasource = MessagesDatasource(Get.find());

  String username = '';

  late List<MessageModel> messages = [];
  late String businessName;
  late String accessToken;

  @override
  void onInit() {
    super.onInit();
    myServices = Get.find<MyServices>();
    scaffoldKey = GlobalKey();
    username = myServices.sharedPreferences.getString("username") ?? '';
    accessToken = myServices.sharedPreferences.getString("accessToken") ?? '';
    businessName = Get.arguments['businessName'] ?? '';
    messageTextController = TextEditingController();
    loadMessages();
  }

  @override
  void loadMessages() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await messagesDatasource.getChatMessages(
        accessToken!, username, businessName);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> jsonMessages = response['chatMessages'];

        messages = jsonMessages.map((jsonMessage) {
          return MessageModel(
            jsonMessage['chatID'],
            jsonMessage['admin_id'],
            jsonMessage['user_id'],
            jsonMessage['sender'],
            jsonMessage['userName'],
            jsonMessage['businessName'],
            jsonMessage['created_at'],
            jsonMessage['text'],
            convertDataToFile(jsonMessage['photo']),
          );
        }).toList();
        update();
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
    }
  }

  Future<void> pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      imageFile = File(pickedFile.path);
      update();
    }
  }

  @override
  sendMessage() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await messagesDatasource.sendChatMessages(accessToken!,
        username, businessName, "0", messageTextController.text, imageFile);

    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        loadMessages();
        messageTextController.text = "";
        imageFile = null;
        update();
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
    }
  }

  
}
