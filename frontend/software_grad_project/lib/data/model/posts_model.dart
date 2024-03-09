import 'dart:io';

class PostsModel {
  final File? businessProfileImage;
  final String? businessName;
  final String? postText;
  final File? postImage;
  final String? date;
  final String? time;

  PostsModel(
    this.businessProfileImage,
    this.businessName,
    this.postText,
    this.postImage,
    this.date,
    this.time,
  );
}
