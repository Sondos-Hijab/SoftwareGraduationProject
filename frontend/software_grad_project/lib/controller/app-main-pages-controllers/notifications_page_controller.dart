import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/notifications/notifications_datasource.dart';
import 'package:software_grad_project/data/model/notification_model.dart';

abstract class NotificationsPageController extends GetxController {
  fetchNotifications();
}

class NotificationsPageControllerImp extends NotificationsPageController {
  //myServices
  final myServices = Get.find<MyServices>();

  //datasources
  NotificationsDatasource notificationsDatasource =
      NotificationsDatasource(Get.find());

  late String username;
  List<NotificationModel>? notifications = [];

  @override
  void onInit() {
    super.onInit();
    username = myServices.sharedPreferences.getString("username")!;
    fetchNotifications();
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
}
