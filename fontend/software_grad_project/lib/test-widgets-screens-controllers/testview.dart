import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/test-widgets-screens-controllers/test_controller.dart';
import 'package:software_grad_project/core/classes/handling_Data_view.dart';
import 'package:software_grad_project/core/constants/colors.dart';

class TestView extends StatelessWidget {
  const TestView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(TestController());
    return Scaffold(
      appBar: AppBar(
        title: const Text("Title"),
        backgroundColor: AppColors.primaryBlue,
      ),
      body: GetBuilder<TestController>(builder: (controller) {
        return HandlingDataView(
            statusRequest: controller.statusRequest,
            widget: ListView.builder(
                itemCount: controller.data.length,
                itemBuilder: (context, index) {
                  return Text("${controller.data}");
                }));
      }),
    );
  }
}
