import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/data/datasource/remote/feedback/feedback_datasource.dart';

abstract class UserFeedbackController extends GetxController {
  handleSubmitFeedback();
  updateCustomerServiceRate(String rate);
  updateValueOfMoneyRate(String rate);
  updateProductQualityRate(String rate);
  uploadImage();
}

class UserFeedbackControllerImp extends UserFeedbackController {
  String? businessName;
  TextEditingController feedbackTextEditingController = TextEditingController();
  String? customerServiceRate_1;
  String? valueOfMoneyRate_2;
  String? productQualityRate_3;
  File? selectedImage;

  final myServices = Get.find<MyServices>();
  StatusRequest? statusRequest;
  FeedbackDatasource feedbackDatasource = FeedbackDatasource(Get.find());
  String? accessToken;

  @override
  void onInit() {
    super.onInit();
    accessToken = myServices.sharedPreferences.getString("accessToken");
    businessName = Get.arguments;
  }

  @override
  void dispose() {
    super.dispose();
    feedbackTextEditingController.dispose();
  }

  @override
  handleSubmitFeedback() async {
    statusRequest = StatusRequest.loading;

    var response = await feedbackDatasource.postPhotoDataWithAuthorization(
        businessName!,
        feedbackTextEditingController.text,
        customerServiceRate_1!,
        valueOfMoneyRate_2!,
        productQualityRate_3!,
        selectedImage!,
        accessToken!);

    statusRequest = handlingData(response);
    print(statusRequest);

    if (StatusRequest.success == statusRequest) {
      if (response['statusCode'] == "200") {
        update();
        Get.defaultDialog(title: "Success", middleText: response['message']);
      } else if (response['statusCode'] == "400") {
        Get.defaultDialog(title: "Error", middleText: response['error']);
      } else {
        Get.defaultDialog(
            title: "Error",
            middleText: "We are sorry, something went wrong, try again later.");
      }
    }
    update();
  }

  @override
  updateCustomerServiceRate(String rate) {
    customerServiceRate_1 = rate;
    update();
  }

  @override
  updateValueOfMoneyRate(String rate) {
    valueOfMoneyRate_2 = rate;
    update();
  }

  @override
  updateProductQualityRate(String rate) {
    productQualityRate_3 = rate;
    update();
  }

  @override
  uploadImage() async {
    final pickedImage =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedImage != null) {
      selectedImage = File(pickedImage.path);
    }
    update();
  }
}
