import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class BusinessLocation extends StatelessWidget {
  final List<Marker>? markers;
  final Completer<GoogleMapController>? gmController;

  const BusinessLocation(
      {super.key, required this.markers, required this.gmController});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 300,
      child: GoogleMap(
        markers: markers!.toSet(),
        mapType: MapType.normal,
        initialCameraPosition: const CameraPosition(
            target: LatLng(32.06241670374584, 35.323743012), zoom: 8),
        onMapCreated: (GoogleMapController controller) {
          gmController!.complete(controller);
        },
      ),
    );
  }
}
