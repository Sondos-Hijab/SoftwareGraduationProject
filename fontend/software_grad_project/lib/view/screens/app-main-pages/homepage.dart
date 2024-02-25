import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/home_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/core/services/service.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final myServices = Get.find<MyServices>();
    String? username = myServices.sharedPreferences.getString("username");

    Get.put(HomePageControllerImp());

    return Scaffold(
      body: SafeArea(
        child: GetBuilder<HomePageControllerImp>(builder: (controller) {
          return ListView(
            children: [
              const SizedBox(
                height: 40,
              ),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 10),
                padding: const EdgeInsets.symmetric(horizontal: 15),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Welcome Back",
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall!
                                .copyWith(
                                  fontSize: 20,
                                ),
                          ),
                          Text(
                            "$username",
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall!
                                .copyWith(
                                    fontSize: 25,
                                    color: AppColors.primaryBlue,
                                    fontWeight: FontWeight.w700),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                        onPressed: () {},
                        icon: Icon(
                          Icons.notifications_active_outlined,
                          size: 35,
                          color: Colors.grey.shade700,
                        ))
                  ],
                ),
              ),
              Container(
                height: 200,
                margin:
                    const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Stack(
                  children: [
                    PageView.builder(
                      controller: controller.pageController,
                      itemCount: sliderList.length,
                      itemBuilder: (context, index) {
                        return ClipRRect(
                          borderRadius: BorderRadius.circular(20),
                          child: Stack(
                            children: [
                              Image.asset(
                                sliderList[index].image!,
                                fit: BoxFit.cover,
                                width: double.infinity,
                                height: double.infinity,
                              ),
                              Positioned.fill(
                                child: Container(
                                  color: Colors.black.withOpacity(
                                      0.3), // Adjust opacity as needed
                                ),
                              ),
                              Positioned.fill(
                                child: Center(
                                  child: Text(
                                    sliderList[index].title!,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 25,
                                      fontFamily: "Anton",
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                    Positioned(
                      left: 10,
                      top: 80,
                      child: IconButton(
                        icon: const Icon(
                          Icons.arrow_back_ios_rounded,
                          size: 40,
                          color: Colors.white,
                        ),
                        onPressed: () {
                          controller.previousPageSlider();
                        },
                      ),
                    ),
                    Positioned(
                      right: 10,
                      top: 80,
                      child: IconButton(
                        icon: const Icon(
                          Icons.arrow_forward_ios_rounded,
                          size: 40,
                          color: Colors.white,
                        ),
                        onPressed: () {
                          controller.nextPageSlider();
                        },
                      ),
                    ),
                  ],
                ),
              ),

              //categories
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 20),
                height: 70,
                child: ListView.separated(
                    separatorBuilder: (context, index) => const SizedBox(
                          width: 10,
                        ),
                    itemCount: categoriesPictures.length,
                    scrollDirection: Axis.horizontal,
                    itemBuilder: (context, index) {
                      return InkWell(
                        onTap: () {},
                        child: Container(
                          width: 80,
                          decoration: BoxDecoration(
                              color: AppColors.primaryYellow,
                              borderRadius: BorderRadius.circular(20)),
                          padding: const EdgeInsets.all(10),
                          height: 50,
                          child: SvgPicture.asset(
                            categoriesPictures[index],
                            width: 70,
                            height: 70,
                            fit: BoxFit.contain,
                          ),
                        ),
                      );
                    }),
              ),
            ],
          );
        }),
      ),
    );
  }
}
