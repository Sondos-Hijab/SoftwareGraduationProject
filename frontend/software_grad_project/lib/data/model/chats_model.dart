import 'dart:typed_data';

class ChatsModel {
  final int? id;
  final String? name;
  final String? lastMessage;
  final Uint8List? picture;
  final String? time;

  ChatsModel(this.id, this.name, this.lastMessage, this.picture, this.time);
}
