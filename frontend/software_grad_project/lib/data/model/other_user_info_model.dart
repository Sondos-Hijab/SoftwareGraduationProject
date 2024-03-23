import 'dart:typed_data';

class OtherUserInfoModel {
  final int? userProfileID; //userProfileID
  final int? userID; //user_id
  final String? username; //name
  final String? bio; //bio
  final Uint8List? picture; //picture

  OtherUserInfoModel(
      this.userProfileID, this.userID, this.username, this.bio, this.picture);
}
