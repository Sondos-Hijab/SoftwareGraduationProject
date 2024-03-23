import 'dart:typed_data';

import 'package:google_maps_flutter/google_maps_flutter.dart';

class BusinessInfoModel {
  final int? adminID; //adminID
  final String? adminName; //adminName
  final String? email; //email
  final String? businessName; //name
  final List<Marker>? markers; //goona get it from location
  final int? phoneNumber; //phoneNumber
  final String? category; //category
  final String? description; //description
  final Uint8List? picture; //picture

  BusinessInfoModel(
    this.adminID,
    this.adminName,
    this.email,
    this.businessName,
    this.markers,
    this.phoneNumber,
    this.category,
    this.description,
    this.picture,
  );
}
