// ignore: file_names
import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class TestData {
  CRUDRequests crud;

  TestData(this.crud);

  getData() async {
    var response = await crud.fetchData(AppLink.test);
    return response.fold((l) => l, (r) => r);
  }
}
