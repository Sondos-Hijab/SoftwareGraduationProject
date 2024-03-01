import 'dart:io';

class FeedbackModel {
  final String? username;
  final String? placeHolderProfileImage;
  final String? businessName;
  final String? feedbackText;
  final String? placeHolderFeedbackPicture;
  final int? customerService;
  final int? valueOfMoney;
  final int? productQuality;

  FeedbackModel(
      this.username,
      this.placeHolderProfileImage,
      this.businessName,
      this.feedbackText,
      this.placeHolderFeedbackPicture,
      this.customerService,
      this.valueOfMoney,
      this.productQuality);
}
