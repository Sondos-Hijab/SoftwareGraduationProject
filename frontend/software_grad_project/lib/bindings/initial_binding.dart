import 'package:get/get.dart';
import 'package:software_grad_project/core/classes/crud.dart';

class InitialBindings extends Bindings {
  @override
  void dependencies() {
    Get.put(CRUDRequests());
  }
}
