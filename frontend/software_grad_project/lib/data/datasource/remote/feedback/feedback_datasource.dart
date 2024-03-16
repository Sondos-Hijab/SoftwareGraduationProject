import 'dart:io';

import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class FeedbackDatasource {
  CRUDRequests crud;

  FeedbackDatasource(this.crud);

  postPhotoDataWithAuthorization(
      String businessName,
      String feedbackText,
      String customerServiceRate,
      String valueOfMoneyRate,
      String productQualityRate,
      File picture,
      String authToken) async {
    var response = await crud.postPhotoDataWithAuthorization(
        AppLink.addFeedbackLink,
        {
          "businessName": businessName,
          "text": feedbackText,
          "rate1": customerServiceRate,
          "rate2": valueOfMoneyRate,
          "rate3": productQualityRate,
          "picture": picture.path
        },
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
