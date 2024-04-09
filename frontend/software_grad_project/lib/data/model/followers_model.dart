import 'dart:typed_data';

class FollowerModel {
  final String? followerName; //userName
  final int? followerID; //user_id
  final Uint8List? followerImage; //picture

  FollowerModel(this.followerName, this.followerID, this.followerImage);
}
