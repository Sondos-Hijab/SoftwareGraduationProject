import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:software_grad_project/controller/app-main-pages-controllers/search_page_controller.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';
import 'package:software_grad_project/view/widgets/home-page/business-view/business_view.dart';

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
      body: GetX<SearchPageControllerImp>(builder: (controller) {
        return ListView(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              //i used row and didn't use custom app bar
              child: Row(children: [
                Expanded(
                    child: TextFormField(
                  controller: controller.searchText,
                  onChanged: (value) {
                    controller.checkSearch(value);
                  },
                  decoration: InputDecoration(
                      prefixIcon: IconButton(
                        icon: const Icon(Icons.search),
                        onPressed: () {
                          controller.onSearch();
                        },
                      ),
                      hintText: "Search for a business",
                      hintStyle: const TextStyle(fontSize: 18),
                      border: OutlineInputBorder(
                          borderSide: BorderSide.none,
                          borderRadius: BorderRadius.circular(10)),
                      filled: true,
                      fillColor: Colors.grey[200],
                      suffixIcon: IconButton(
                        onPressed: () {
                          controller.showFilter.value =
                              !controller.showFilter.value;
                        },
                        icon: const Icon(
                          Icons.filter_alt,
                          color: AppColors.grey,
                        ),
                      )),
                )),
              ]),
            ),
            controller.showFilter.value
                ? Container(
                    margin: const EdgeInsets.symmetric(
                        horizontal: 30, vertical: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        DropdownButtonFormField<String>(
                          value: controller.selectedCountry.value,
                          onChanged: (String? newValue) {
                            controller.setSelectedCountry(newValue!);
                            controller.setSelectedCity(cities[newValue]![0]);
                          },
                          items: countries.map<DropdownMenuItem<String>>(
                            (String country) {
                              return DropdownMenuItem<String>(
                                value: country,
                                child: Text(country),
                              );
                            },
                          ).toList(),
                          decoration: const InputDecoration(
                            labelText: 'Select Country',
                            labelStyle: TextStyle(fontSize: 18),
                          ),
                        ),
                        const SizedBox(height: 10),
                        DropdownButtonFormField<String>(
                          value: controller.selectedCity.value,
                          onChanged: (String? newValue) {
                            controller.setSelectedCity(newValue!);
                          },
                          items: controller.chosenCities
                              .map<DropdownMenuItem<String>>(
                            (String city) {
                              return DropdownMenuItem<String>(
                                value: city,
                                child: Text(city),
                              );
                            },
                          ).toList(),
                          decoration: const InputDecoration(
                            labelText: 'Select City',
                            labelStyle: TextStyle(fontSize: 18),
                          ),
                        ),
                        DropdownButtonFormField<String>(
                          value: 'gym', // Default value
                          onChanged: (String? newValue) {
                            // You can handle the state change here if needed
                          },
                          items: categoriesMapping.entries
                              .map<DropdownMenuItem<String>>(
                            (MapEntry<int, String> entry) {
                              return DropdownMenuItem<String>(
                                value: entry.value,
                                child: Text(entry.value),
                              );
                            },
                          ).toList(),
                          decoration: const InputDecoration(
                            labelText: 'Select Category',
                            labelStyle: TextStyle(fontSize: 18),
                          ),
                        ),
                      ],
                    ),
                  )
                : SizedBox.shrink(),
            controller.isSearch.value
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
