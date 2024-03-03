import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class BusinessLocation extends StatelessWidget {
  final List<Marker>? markers;
  final CameraPosition? businessLocation;
  final Completer<GoogleMapController>? gmController;

  const BusinessLocation(
      {super.key,
      required this.markers,
      required this.businessLocation,
      required this.gmController});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 300,
      child: GoogleMap(
        markers: markers!.toSet(),
        mapType: MapType.normal,
        initialCameraPosition: businessLocation!,
        onMapCreated: (GoogleMapController controller) {
          gmController!.complete(controller);
        },
      ),
    );
  }
}
