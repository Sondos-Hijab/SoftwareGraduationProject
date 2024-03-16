import 'dart:convert';
import 'package:dartz/dartz.dart';
import 'package:software_grad_project/core/classes/status_request.dart';
import 'package:software_grad_project/core/functions/check_internset.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';

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

  Future<Either<StatusRequest, Map>> getDate(String linkurl, Map data) async {
    try {
      if (await checkInternet()) {
        var uri = Uri.parse(linkurl);
        var jsonData = jsonDecode(
            jsonEncode(data)); // Convert data to JSON string and then decode it

        var request = http.Request('GET', uri)
          ..headers['Content-type'] = 'application/json'
          ..headers['Accept'] = 'application/json'
          ..body = jsonEncode(jsonData); // Set jsonData as the request body

        var response =
            await request.send().then((res) => http.Response.fromStream(res));
        if (response.statusCode == 200 ||
            response.statusCode == 201 ||
            response.statusCode == 404) {
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

  Future<Either<StatusRequest, Map>> getDataWithAuthorizationParams(
      String linkurl, Map<String, dynamic> params, String authToken) async {
    try {
      if (await checkInternet()) {
        var uri = Uri.parse(linkurl);
        uri = uri.replace(queryParameters: params);

        var response = await http.get(
          uri,
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $authToken',
          },
        );

        if (response.statusCode == 200 ||
            response.statusCode == 201 ||
            response.statusCode == 400 ||
            response.statusCode == 403) {
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

  Future<Either<StatusRequest, Map>> getDataWithAuthorization(
      String linkurl, Map data, String authToken) async {
    try {
      if (await checkInternet()) {
        var uri = Uri.parse(linkurl);
        var jsonData = jsonDecode(
            jsonEncode(data)); // Convert data to JSON string and then decode it

        var request = http.Request('GET', uri)
          ..headers['Content-type'] = 'application/json'
          ..headers['Accept'] = 'application/json'
          ..headers['Authorization'] =
              'Bearer $authToken' // Include the authorization token in the headers
          ..body = jsonEncode(jsonData); // Set jsonData as the request body

        var response =
            await request.send().then((res) => http.Response.fromStream(res));

        if (response.statusCode == 200 ||
            response.statusCode == 201 ||
            response.statusCode == 400 ||
            response.statusCode == 403) {
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

  Future<Either<StatusRequest, Map>> getDataWithOnlyAuthorization(
      String linkurl, String authToken) async {
    try {
      if (await checkInternet()) {
        var uri = Uri.parse(linkurl);

        var request = http.Request('GET', uri)
          ..headers['Content-type'] = 'application/json'
          ..headers['Accept'] = 'application/json'
          ..headers['Authorization'] =
              'Bearer $authToken'; // Include the authorization token in the headers

        var response =
            await request.send().then((res) => http.Response.fromStream(res));

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

  Future<Either<StatusRequest, Map>> putDataWithAuthorization(
      String linkurl, Map data, String authToken) async {
    try {
      if (await checkInternet()) {
        var response = await http.put(Uri.parse(linkurl),
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Authorization":
                  "Bearer $authToken", // Include authorization token in the headers
            },
            body: jsonEncode(data));
        if ([200, 201, 400, 403].contains(response.statusCode)) {
          // Handle the appropriate status codes
          Map responsebody = jsonDecode(response.body);
          return Right(responsebody);
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

  Future<Either<StatusRequest, Map>> postDataWithAuthorization(
      String linkurl, Map data, String authToken) async {
    try {
      if (await checkInternet()) {
        var response = await http.post(Uri.parse(linkurl),
            headers: {
              "Content-type": "application/json",
              "Accept": "application/json",
              "Authorization":
                  "Bearer $authToken", // Include authorization token in the headers
            },
            body: jsonEncode(data));
        if ([200, 201, 400, 403].contains(response.statusCode)) {
          // Handle the appropriate status codes
          Map responsebody = jsonDecode(response.body);
          return Right(responsebody);
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

  Future<Either<StatusRequest, Map>> deleteDataWithAuthorization(
      String linkurl, Map data, String authToken) async {
    try {
      if (await checkInternet()) {
        var uri = Uri.parse(linkurl);
        var jsonData = jsonDecode(
            jsonEncode(data)); // Convert data to JSON string and then decode it

        var request = http.Request('DELETE', uri)
          ..headers['Content-type'] = 'application/json'
          ..headers['Accept'] = 'application/json'
          ..headers['Authorization'] =
              'Bearer $authToken' // Include the authorization token in the headers
          ..body = jsonEncode(jsonData); // Set jsonData as the request body

        var response =
            await request.send().then((res) => http.Response.fromStream(res));

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

  Future<Either<StatusRequest, Map>> putPhotoDataWithAuthorization(
      String linkurl, Map<String, dynamic> data, String authToken) async {
    try {
      if (await checkInternet()) {
        var request = http.MultipartRequest('PUT', Uri.parse(linkurl));
        request.headers['Authorization'] = 'Bearer $authToken';

        // Add other headers if needed
        request.headers['Content-Type'] = 'multipart/form-data';

        // Add form fields
        data.forEach((key, value) {
          request.fields[key] = value.toString();
        });

        // Add file(s)
        if (data.containsKey('profilePicture')) {
          request.files.add(
            await http.MultipartFile.fromPath(
              'profilePicture',
              data['profilePicture'],
              contentType: MediaType('image', '*'),
            ),
          );
        }

        var streamedResponse = await request.send();
        var response = await http.Response.fromStream(streamedResponse);

        if ([200, 201, 400].contains(response.statusCode)) {
          Map responsebody = jsonDecode(response.body);
          return Right(responsebody);
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

  Future<Either<StatusRequest, Map>> postPhotoDataWithAuthorization(
      String linkurl, Map<String, dynamic> data, String authToken) async {
    try {
      if (await checkInternet()) {
        var request = http.MultipartRequest('POST', Uri.parse(linkurl));
        request.headers['Authorization'] = 'Bearer $authToken';

        // Add other headers if needed
        request.headers['Content-Type'] = 'multipart/form-data';

        // Add form fields
        data.forEach((key, value) {
          request.fields[key] = value.toString();
        });

        // Add file(s)
        if (data.containsKey('picture')) {
          request.files.add(
            await http.MultipartFile.fromPath(
              'picture',
              data['picture'],
              contentType: MediaType('image', '*'),
            ),
          );
        }

        var streamedResponse = await request.send();
        var response = await http.Response.fromStream(streamedResponse);

        if ([200, 201, 400].contains(response.statusCode)) {
          Map responsebody = jsonDecode(response.body);
          return Right(responsebody);
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

  Future<Either<StatusRequest, Map>> getDataWithParams(
    String linkUrl,
    Map<String, dynamic> params,
    String authToken,
  ) async {
    try {
      if (await checkInternet()) {
        var uri = Uri.parse(linkUrl);
        uri = uri.replace(queryParameters: params);

        var response = await http.get(
          uri,
          headers: {
            "Authorization": "Bearer $authToken",
            "Content-type": "application/json",
            "Accept": "application/json",
          },
        );

        if ([200, 201, 400, 403, 404].contains(response.statusCode)) {
          var responseBody = json.decode(response.body);
          return Right(responseBody);
        } else {
          return Left(StatusRequest.serverfailure);
        }
      } else {
        return Left(StatusRequest.offlinefailure);
      }
    } catch (_) {
      return Left(StatusRequest.serverException);
    }
  }
}
