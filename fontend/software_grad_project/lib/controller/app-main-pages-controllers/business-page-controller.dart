import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

abstract class BusinessPagesController extends GetxController {}

class BusinessPagesControllerImp extends BusinessPagesController {
  GlobalKey<ScaffoldState>? scaffoldKey;
  File? businessImage;

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
