import 'dart:typed_data';

class FetchedPostModel {
  final int? postID;
  final int? adminId;
  final String? businessName;
  final String? description;
  final Uint8List? picture;
  final String? createdAt;

  FetchedPostModel(
    this.postID,
    this.adminId,
    this.businessName,
    this.description,
    this.picture,
    this.createdAt,
  );
}
