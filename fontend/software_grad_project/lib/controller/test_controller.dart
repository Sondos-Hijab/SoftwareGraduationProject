import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
// import 'package:software_grad_project/core/functions/handling_data_function.dart';
import 'package:software_grad_project/data/datasource/remote/test_Data.dart';
import 'package:http/http.dart' as http;
// import 'package:software_grad_project/linkapi.dart';
import 'package:dio/dio.dart';
import 'dart:convert';

class TestController extends GetxController {
  TestData testData = TestData(Get.find());

  List data = [];

  late StatusRequest statusRequest;
  final dio = Dio();

  getData() async {
    // var url = "http://192.168.1.49:3000/RateRelay/user/login";
    // dio.options.headers['Content-Type'] = 'application/json';

    // var response = await dio.post(url, data: {
    //   {'name': 'sondos', 'password': '123456'}
    // });
    // print(response);

    try {
      var response = await http.post(
          Uri.parse("http://192.168.1.49:3000/RateRelay/user/login"),
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
          },
          body: jsonEncode({
            "name": 'sondos'.toString(),
            "password": '123456'.toString(),
          }));
      print(response.body);
    } catch (e) {
      print(e);
    }
    // var response = await http.post(
    //   Uri.parse(url),
    //   body: {
    //     'name': 'sondos hijab',
    //     'password': '123456',
    //   },
    // );
    // print('Response status: ${response.statusCode}');
    // print('Response body: ${response.body}');

    update();
  }

  @override
  void onInit() {
    getData();
    super.onInit();
  }
}
