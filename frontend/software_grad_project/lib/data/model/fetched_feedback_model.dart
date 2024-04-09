import 'dart:typed_data';

class FetchedFeedbackModel {
  final int? feedbackID; //feedbackID
  final int? userID; //user_id
  final int? adminID; //admin_id
  final String? businessName; //businessName
  final String? userName; //userName
  final String? description; //text
  final Uint8List? feedbackImage; //picture
  final double? customeServiceRate; //rate1
  final double? valueOfMoneyRate; //rate2
  final double? productQualityRate; //rate3
  final String? createdAt; //created_at
  final Uint8List? userProfilePicture; //userProfilePicture

  FetchedFeedbackModel(
      this.feedbackID,
      this.userID,
      this.adminID,
      this.businessName,
      this.userName,
      this.description,
      this.feedbackImage,
      this.customeServiceRate,
      this.valueOfMoneyRate,
      this.productQualityRate,
      this.createdAt,
      this.userProfilePicture);
}
