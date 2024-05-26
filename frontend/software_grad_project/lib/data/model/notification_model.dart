import 'dart:typed_data';

class NotificationModel {
  final int? postID;
  final String? businessName;
  final String? postDescription;
  final Uint8List? postPicture;
  final Uint8List? businessPicture;
  final String? postCreatedAt;

  NotificationModel(this.postID, this.businessName, this.postDescription,
      this.postPicture, this.businessPicture, this.postCreatedAt);
}
