import 'package:flutter/material.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

class CustomAppBar extends StatelessWidget {
  final String titleappbar;
  final void Function()? onPressedSearch;
  final void Function(String)? onChanged;
  final TextEditingController? searchController;
  final String? selectedCity;
  final String? selectedCountry;
  final String? seletedCategory;
  final void Function(String) setCity;
  final void Function(String) setCategory;
  final void Function(String) setCountry;
  final List<String> chosenCities;

  const CustomAppBar(
      {Key? key,
      required this.titleappbar,
      this.onPressedSearch,
      this.onChanged,
      this.searchController,
      required this.selectedCity,
      required this.selectedCountry,
      required this.seletedCategory,
      required this.setCity,
      required this.setCategory,
      required this.setCountry,
      required this.chosenCities})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Expanded(
          child: TextFormField(
        controller: searchController,
        onChanged: onChanged,
        decoration: InputDecoration(
            prefixIcon: IconButton(
                icon: const Icon(Icons.search), onPressed: onPressedSearch),
            hintText: titleappbar,
            hintStyle: const TextStyle(fontSize: 18),
            border: OutlineInputBorder(
                borderSide: BorderSide.none,
                borderRadius: BorderRadius.circular(10)),
            filled: true,
            fillColor: Colors.grey[200],
            suffixIcon: IconButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: const Text('Custom Dialog'),
                      content: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          DropdownButtonFormField<String>(
                            value: selectedCountry,
                            onChanged: (String? newValue) {
                              setCountry(newValue!);
                              setCity(cities[newValue]![0]);
                            },
                            items: countries.map<DropdownMenuItem<String>>(
                                (String country) {
                              return DropdownMenuItem<String>(
                                value: country,
                                child: Text(country),
                              );
                            }).toList(),
                            decoration: const InputDecoration(
                              labelText: 'Select Country',
                              labelStyle: TextStyle(fontSize: 18),
                            ),
                          ),
                          const SizedBox(height: 10),
                          DropdownButtonFormField<String>(
                            value: selectedCity,
                            onChanged: (String? newValue) {
                              setCity(newValue!);
                            },
                            items: chosenCities
                                .map<DropdownMenuItem<String>>((String city) {
                              return DropdownMenuItem<String>(
                                value: city,
                                child: Text(city),
                              );
                            }).toList(),
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
                            }).toList(),
                            decoration: const InputDecoration(
                              labelText: 'Select Category',
                              labelStyle: TextStyle(fontSize: 18),
                            ),
                          ),
                        ],
                      ),
                      actions: <Widget>[
                        ElevatedButton(
                          onPressed: () {},
                          child: const Text('Submit'),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: const Text('Cancel'),
                        ),
                      ],
                    );
                  },
                );
              },
              icon: const Icon(
                Icons.filter_alt,
                color: AppColors.grey,
              ),
            )),
      )),
    ]);
  }
}
