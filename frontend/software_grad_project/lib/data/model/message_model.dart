import 'dart:typed_data';

class MessageModel {
  final int? chatID;
  final int? adminID;
  final int? userID;
  final int? sender;

  final String? userName;
  final String? businessName;
  final String? createdAt;
  final String? text;
  final Uint8List? photo;

  MessageModel(this.chatID, this.adminID, this.userID, this.sender,
      this.userName, this.businessName, this.createdAt, this.text, this.photo);
}
