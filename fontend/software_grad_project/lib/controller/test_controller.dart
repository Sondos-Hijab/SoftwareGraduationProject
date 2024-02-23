import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/data/datasource/remote/test_Data.dart';

class TestController extends GetxController {
  TestData testData = TestData(Get.find());

  List data = [];

  late StatusRequest statusRequest;

  getData() async {
    statusRequest = StatusRequest.loading;
    var response = await testData.getData();
    statusRequest = handlingData(response);

    if (StatusRequest.success == statusRequest) {
      print(statusRequest);
      print(response);
      data.add(response);
    }
    update();
  }

  @override
  void onInit() {
    getData();
    super.onInit();
  }
}
