import 'package:get/get.dart';
import 'package:software_grad_project/core/constants/routes_names.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/data/model/businesses_name_image_model.dart';

abstract class FollowedbusinessesPageController extends GetxController {
  goToBusinessPage(String businessName);
}

class FollowedbusinessesPageControllerImp
    extends FollowedbusinessesPageController {
  late List<BusinessViewModel> businessesList;

  @override
  void onInit() {
    super.onInit();
    businessesList = businessViewList;
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  goToBusinessPage(String businessName) {
    Get.toNamed(AppRoutes.businessPage, arguments: businessName);
  }
}
