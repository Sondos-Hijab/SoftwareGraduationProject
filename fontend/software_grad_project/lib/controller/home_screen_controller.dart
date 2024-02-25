import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/screens/auth/login.dart';
import 'package:software_grad_project/view/screens/bottom-app-bar-pages/homepage.dart';
import 'package:software_grad_project/view/screens/bottom-app-bar-pages/messagespage.dart';
import 'package:software_grad_project/view/screens/bottom-app-bar-pages/profilepage.dart';
import 'package:software_grad_project/view/screens/bottom-app-bar-pages/searchpage.dart';

abstract class HomeScreenController extends GetxController {
  changePage(int pageIndex);
}

class HomeScreenControllerImp extends HomeScreenController {
  int currentPage = 3;

  List<Widget> listPage = [
    const SearchPage(),
    const MessagesPage(),
    const HomePage(),
    const ProfilePage()
  ];
  @override
  changePage(int pageIndex) {
    currentPage = pageIndex;
    update();
  }
}
