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

//  "postID": 1,
//             "admin_id": 1,
//             "name": "RateRelay Business",
//             "description": "this is our new product",
//             "picture": null,
//             "created_at": "2024-03-09T17:41:30.000Z"