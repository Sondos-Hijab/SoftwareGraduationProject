import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/test-widgets-screens-controllers/test_controller.dart';
import 'package:software_grad_project/core/services/service.dart';

class TestWidget extends StatelessWidget {
  const TestWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final myServices = Get.find<MyServices>();

    Get.put(TestController());

    String? username = myServices.sharedPreferences.getString("username");
    String? password = myServices.sharedPreferences.getString("password");
    String? accessToken = myServices.sharedPreferences.getString("accessToken");
    String? refreshToken =
        myServices.sharedPreferences.getString("refreshToken");
    String? tempAccessToken =
        myServices.sharedPreferences.getString("tempAccessToken");

    return Scaffold(
      appBar: AppBar(
        title: Text("TEST TEST"),
      ),
      body: GetBuilder<TestController>(
        builder: (controller) {
          return Container(
            child: Column(
              children: [
                Text(username!),
                Text(password!),
                Text(accessToken!),
                Text(refreshToken!)
              ],
            ),
            // child: MaterialButton(onPressed: () => controller.getData()),
          );
        },
      ),
    );
  }
}
