import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

abstract class ProfilePageController extends GetxController {
  editMode();
  getBio();
  goToFeedbackPage();
  goToBusinessesPage();
  logout();
  goToChangePassword();
  Future uploadImage();
}

class ProfilePageControllerImp extends ProfilePageController {
  bool isEditingBio = false;
  TextEditingController? bioController;
  File? selectedImage;
  @override
  editMode() {
    isEditingBio = !isEditingBio;
    if (isEditingBio == false) {
      //i should make a post request here to edit the bio in the databse for this user
    }
    update();
  }

  @override
  void onInit() {

    bioController = TextEditingController();
    getBio();
    super.onInit();
  }

  @override
  void dispose() {
    bioController!.dispose();
    super.dispose();
  }

  @override
  getBio() {
    //here i should make a get request to get the bio for this user from databse
    bioController!.text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  }

  @override
  goToBusinessesPage() {}

  @override
  goToFeedbackPage() {}

  @override
  goToChangePassword() {}

  @override
  logout() {}

  @override
  Future uploadImage() async {
    final pickedImage =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (pickedImage != null) {
      selectedImage = File(pickedImage.path);
      update(); // Trigger UI update to reflect the new image
    }
  }
}
