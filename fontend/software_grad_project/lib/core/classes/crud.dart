import 'dart:convert';
import 'package:dartz/dartz.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/check_internset.dart';
import 'package:http/http.dart' as http;

class CRUDRequests {
  Future<Either<StatusRequest, Map>> postData(String linkurl, Map data) async {
    if (await checkInternet()) {
      var response = await http.post(Uri.parse(linkurl),
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
          },
          body: jsonEncode(data));
      if (response.statusCode == 200 ||
          response.statusCode == 201 ||
          response.statusCode == 409 ||
          response.statusCode == 400 ||
          response.statusCode == 404 ||
          response.statusCode == 401) {
        Map responsebody = jsonDecode(response.body);
        return Right(responsebody);
      } else {
        return const Left(StatusRequest.serverfailure);
      }
    } else {
      return const Left(StatusRequest.offlinefailure);
    }
  }

  Future<Either<StatusRequest, Map>> fetchData(String linkurl) async {
    try {
      if (await checkInternet()) {
        var response = await http.get(Uri.parse(linkurl));
        if (response.statusCode == 200 || response.statusCode == 201) {
          var responseBody = json.decode(response.body);
          return Right(responseBody);
        } else {
          return const Left(StatusRequest.serverfailure);
        }
      } else {
        return const Left(StatusRequest.offlinefailure);
      }
    } catch (_) {
      return const Left(StatusRequest.serverException);
    }
  }
}
