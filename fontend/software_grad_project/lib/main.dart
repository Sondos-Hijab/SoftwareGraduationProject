import 'package:flutter/material.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:software_grad_project/bindings/initial_binding.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/constants/routesnames.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:software_grad_project/routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initialServices();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'RateRelay',
      theme: ThemeData(
        fontFamily: "Geologica",
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        primarySwatch: Colors.blue,
        useMaterial3: true,
        textTheme: const TextTheme(
          headlineMedium: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 30,
              color: AppColors.primaryBlue),
          headlineSmall: TextStyle(
              fontSize: 28, color: AppColors.grey, fontWeight: FontWeight.w500),
          headlineLarge: TextStyle(
              fontWeight: FontWeight.w400,
              fontSize: 30,
              color: AppColors.black),
          bodyLarge: TextStyle(height: 2, color: AppColors.grey, fontSize: 18),
          bodyMedium: TextStyle(height: 2, color: AppColors.grey, fontSize: 16),
          bodySmall: TextStyle(color: AppColors.lightGrey, fontSize: 14),
        ),
      ),
      initialRoute: AppRoutes.test,
      initialBinding: InitialBindings(),
      getPages: routes,
    );
  }
}
