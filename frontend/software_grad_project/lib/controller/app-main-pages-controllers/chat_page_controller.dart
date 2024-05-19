import 'dart:io';
import 'dart:typed_data';

import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
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
  late IO.Socket socket;

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
    initSocket();
  }

  void initSocket() {
    const SOCKET_URL = "http://192.168.1.49:3000";

    socket = IO.io(SOCKET_URL, <String, dynamic>{
      'transports': ['websocket'],
    });

    socket.on('connect', (_) {
      print('Connected with socket ID: ${socket.id}');
    });

    socket.on('disconnect', (_) {
      print('Disconnected from socket server');
    });

    socket.on('receiveMessage', (data) {
      print('Received message: $data');
    });

    socket.on('newChatMessage', (data) {
      Uint8List? photoData;
      if (data['photo'] != null) {
        // Convert 'photo' to Uint8List if it's not null
        photoData = Uint8List.fromList(data['photo'].cast<int>());
      }

      messages.add(MessageModel(
        data['chatID'],
        data['admin_id'],
        data['user_id'],
        int.parse(data['sender']),
        data['userName'],
        data['businessName'],
        data['created_at'],
        data['text'],
        photoData,
      ));
      update();

      print('Received new chat message: $data');
    });
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
