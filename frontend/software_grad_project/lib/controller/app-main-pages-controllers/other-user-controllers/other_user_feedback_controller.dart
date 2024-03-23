import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/other-user-profile/other_user_info_datasource.dart';
import 'package:software_grad_project/data/model/fetched_feedback_model.dart';

abstract class OtherUserFeedbackPageController extends GetxController {
  getUserFeedback(String username);
}

class OtherUserFeedbackPageControllerImp
    extends OtherUserFeedbackPageController {
  final myServices = Get.find<MyServices>();
  String? username = "";

  OtherUserInfoDataSource otherUserInfoDataSource =
      OtherUserInfoDataSource(Get.find());

  List<FetchedFeedbackModel>? userFeedback = [];

  @override
  void onInit() {
    username = Get.arguments['username'];
    getUserFeedback(username!);
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  getUserFeedback(String username) async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response = await otherUserInfoDataSource.getFeedbackWithAuthorization(
        accessToken!, username);

    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> feedback = response['feedback'];
        userFeedback = feedback.map((feed) {
          return FetchedFeedbackModel(
            feed['feedbackID'],
            feed['user_id'],
            feed['admin_id'],
            feed['businessName'],
            feed['userName'],
            feed['text'],
            convertDataToFile(feed['picture']),
            feed['rate1'].toDouble(),
            feed['rate2'].toDouble(),
            feed['rate3'].toDouble(),
            feed['created_at'],
            convertDataToFile(feed['userProfilePicture']),
          );
        }).toList();

        userFeedback!.sort((a, b) => DateTime.parse(b.createdAt!)
            .compareTo(DateTime.parse(a.createdAt!)));
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }
}
