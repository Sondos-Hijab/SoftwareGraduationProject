import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/convert_data_to_file.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/messages/messages_datasource.dart';
import 'package:software_grad_project/data/model/businesses_name_image_model.dart';

abstract class MessagesPageController extends GetxController {
  fetchChatPartners();
  refreshChatPartnersList();
}

class MessagesPageControllerImp extends MessagesPageController {
  //myServices
  final myServices = Get.find<MyServices>();

  //datasources
  MessagesDatasource messagesDatasource = MessagesDatasource(Get.find());

  late String username;
  late List<BusinessViewModel>? businessesList = [];

  @override
  void onInit() {
    super.onInit();
    username = myServices.sharedPreferences.getString("username")!;
    fetchChatPartners();
  }

  @override
  fetchChatPartners() async {
    StatusRequest? statusRequest = StatusRequest.loading;
    String? accessToken = myServices.sharedPreferences.getString("accessToken");

    var response =
        await messagesDatasource.getChatPartners(accessToken!, username);

    statusRequest = handlingData(response);
    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        List<dynamic> businesses = response['chatPartners']['data'];

        businessesList = businesses.map((business) {
          return BusinessViewModel(
            business['businessName'],
            convertDataToFile(business['picture']),
          );
        }).toList();
      } else {
        Get.defaultDialog(
            title: "Error", middleText: "We are sorry, something went wrong");
      }
      update();
    }
  }

  @override
  refreshChatPartnersList() {
    fetchChatPartners();
  }
}
