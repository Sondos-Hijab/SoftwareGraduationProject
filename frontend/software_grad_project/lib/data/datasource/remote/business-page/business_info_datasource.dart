import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class BusinessInfoDataSource {
  CRUDRequests crud;

  BusinessInfoDataSource(this.crud);

  getDataWithAuthorization(String authToken, String businessName) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getBusinessInfoLink, {"name": businessName}, authToken);
    return response.fold((l) => l, (r) => r);
  }

  getBusinessAverageRate(String authToken, String businessName, String rateType,
      String startDate, String endDate) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.getAverageRateLink,
        {
          "businessName": businessName,
          "rateType": rateType,
          "startDate": startDate,
          "endDate": endDate
        },
        authToken);
    return response.fold((l) => l, (r) => r);
  }
}
