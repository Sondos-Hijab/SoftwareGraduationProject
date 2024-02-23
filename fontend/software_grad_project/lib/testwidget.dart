import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/core/services/service.dart';

class TestWidget extends StatelessWidget {
  const TestWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final myServices = Get.find<MyServices>();

    String? username = myServices.sharedPreferences.getString("username");
    String? password = myServices.sharedPreferences.getString("password");

    return Scaffold(
      appBar: AppBar(
        title: Text("TEST TEST"),
      ),
      body: Container(
        child: Column(
          children: [Text("$username"), Text("$password")],
        ),
      ),
    );
  }
}
