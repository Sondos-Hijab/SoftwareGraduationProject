import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:software_grad_project/core/constants/colors.dart';
import 'package:software_grad_project/data/datasource/static/static.dart';

class CategoriesButtons extends StatelessWidget {
  const CategoriesButtons({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
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
    );
  }
}
