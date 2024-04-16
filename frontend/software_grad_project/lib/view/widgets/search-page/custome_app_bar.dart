import 'package:flutter/material.dart';

class CustomAppBar extends StatelessWidget {
  final String titleappbar;
  final void Function()? onPressedSearch;
  final void Function(String)? onChanged;
  final TextEditingController? searchController;
  const CustomAppBar(
      {Key? key,
      required this.titleappbar,
      this.onPressedSearch,
      this.onChanged,
      this.searchController})
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
            fillColor: Colors.grey[200]),
      )),
    ]);
  }
}
