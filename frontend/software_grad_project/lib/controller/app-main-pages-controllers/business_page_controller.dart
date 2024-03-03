import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

abstract class BusinessPagesController extends GetxController {}

class BusinessPagesControllerImp extends BusinessPagesController {
  GlobalKey<ScaffoldState>? scaffoldKey;
  File? businessImage;
  final Completer<GoogleMapController> gmController =
      Completer<GoogleMapController>();

  List<Marker> markers = [
    const Marker(
      markerId: MarkerId("1"),
      position: LatLng(37.42796133580664, -122.085749655962),
    ),
  ];
  final CameraPosition businessLocation = const CameraPosition(
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 14.4746,
  );

  @override
  void onInit() {
    scaffoldKey = GlobalKey();
    super.onInit();
  }

  @override
  void dispose() {
    super.dispose();
  }
}
