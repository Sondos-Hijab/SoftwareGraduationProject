import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/search_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/view/widgets/home-page/business-view/business_view.dart';
import 'package:software_grad_project/view/widgets/search-page/custome_app_bar.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(SearchPageControllerImp());
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: AppColors.appWhite,
        elevation: 0.0,
        title: Text(
          'Search Page',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
      ),
      body: GetBuilder<SearchPageControllerImp>(builder: (controller) {
        return ListView(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              child: CustomAppBar(
                titleappbar: "Search for a business",
                searchController: controller.searchText,
                onChanged: (value) {
                  controller.checkSearch(value);
                },
                onPressedSearch: () {
                  controller.onSearch();
                },
              ),
            ),
            controller.isSearch != null && controller.isSearch!
                ? Column(
                    children: List.generate(
                      controller.businessesList!.length,
                      (index) => BusinessViewItem(
                        businessName:
                            controller.businessesList![index].businessName,
                        picture: controller.businessesList![index].picture,
                        onTap: () {
                          controller.goToBusinessPage(
                              controller.businessesList![index].businessName!,
                              controller.businessesList![index].picture!);
                        },
                      ),
                    ),
                  )
                : Container(
                    margin: const EdgeInsets.all(20),
                    child: const Text(
                        "Results of your search will appear here when you click the search button above.")),
          ],
        );
      }),
    );
  }
}
