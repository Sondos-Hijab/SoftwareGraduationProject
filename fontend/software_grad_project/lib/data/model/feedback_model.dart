import 'dart:io';

class FeedbackModel {
  final String? username;
  final File? userProfileImage;
  final String? businessName;
  final String? feedbackText;
  final File? feedbackImage;
  final int? customerService;
  final int? valueOfMoney;
  final int? productQuality;

  FeedbackModel(
    this.username,
    this.userProfileImage,
    this.businessName,
    this.feedbackText,
    this.feedbackImage,
    this.customerService,
    this.valueOfMoney,
    this.productQuality,
  );
}
