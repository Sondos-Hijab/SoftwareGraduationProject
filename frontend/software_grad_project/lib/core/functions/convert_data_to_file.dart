import 'dart:typed_data';

Uint8List? convertDataToFile(Map<String, dynamic>? pictureData) {
  if (pictureData != null && pictureData.containsKey('data')) {
    var data = pictureData['data'];
    if (data is List<dynamic>) {
      try {
        Uint8List bytes = Uint8List.fromList(data.cast<int>());
        // print(bytes);
        return bytes;
      } catch (e) {
        print("Error creating file: $e");
        return null;
      }
    } else {
      print('Error: Picture data is not a list of integers');
      return null;
    }
  }
  return null;
}
