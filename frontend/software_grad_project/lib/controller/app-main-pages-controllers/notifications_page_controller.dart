import 'dart:typed_data';

import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/notifications/notifications_datasource.dart';
import 'package:software_grad_project/data/model/notification_model.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

abstract class NotificationsPageController extends GetxController {
  fetchNotifications();
  decreaseNotificationsCount();
}

class NotificationsPageControllerImp extends NotificationsPageController {
  //myServices
  final myServices = Get.find<MyServices>();
  late IO.Socket socket;

  //datasources
  NotificationsDatasource notificationsDatasource =
      NotificationsDatasource(Get.find());

  late String username;
  List<NotificationModel>? notifications = [];

  void initSocket() {
    const SOCKET_URL = "http://192.168.1.49:3000";

    socket = IO.io(SOCKET_URL, <String, dynamic>{
      'transports': ['websocket'],
    });

    socket.on('newPost', (data) {
      Uint8List? postPicture;
      if (data['picture'] != null) {
        postPicture = Uint8List.fromList(data['picture'].cast<int>());
      }
      Uint8List? businessPicture;
      if (data['businessPicture'] != null) {
        businessPicture =
            Uint8List.fromList(data['businessPicture'].cast<int>());
      }
      final newNotification = NotificationModel(
        data['postID'],
        data['name'],
        data['description'],
        postPicture,
        businessPicture,
        data['created_at'],
      );

      notifications?.add(newNotification);

      notifications!.sort((a, b) => DateTime.parse(b.postCreatedAt!)
          .compareTo(DateTime.parse(a.postCreatedAt!)));

      update();
    });
  }

  @override
  void onInit() {
    super.onInit();
    username = myServices.sharedPreferences.getString("username")!;
    fetchNotifications();
    initSocket();
  }

  @override
  fetchNotifications() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await notificationsDatasource.getNotifications(accessToken!, username);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> responseNotifications = response['posts'];

        notifications = responseNotifications.map((post) {
          return NotificationModel(
            post['postID'],
            post['postName'],
            post['postDescription'],
            convertDataToFile(post['postPicture']),
            convertDataToFile(post['businessPicture']),
            post['postCreatedAt'],
          );
        }).toList();
        //newest to oldest
        notifications!.sort((a, b) => DateTime.parse(b.postCreatedAt!)
            .compareTo(DateTime.parse(a.postCreatedAt!)));
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  decreaseNotificationsCount() {
    final current = myServices.sharedPreferences.getInt("totalNotifications");
    if (current! > 0)
      myServices.sharedPreferences.setInt("totalNotifications", current - 1);
  }
}
