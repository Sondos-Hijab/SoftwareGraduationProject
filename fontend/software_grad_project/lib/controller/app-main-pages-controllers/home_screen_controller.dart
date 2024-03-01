import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/view/screens/app-main-pages/homepage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/messagespage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/profilepage.dart';
import 'package:software_grad_project/view/screens/app-main-pages/searchpage.dart';

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
