import 'package:software_grad_project/core/classes/crud.dart';
import 'package:software_grad_project/linkapi.dart';

class NotificationsDatasource {
  CRUDRequests crud;

  NotificationsDatasource(this.crud);

  getNotifications(String authToken, String username) async {
    var response = await crud.getDataWithAuthorizationParams(
        AppLink.fetchNotifications, {"username": username}, authToken);
    return response.fold((l) => l, (r) => r);
  }
}
