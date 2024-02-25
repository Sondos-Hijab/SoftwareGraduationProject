import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/data/model/onboardingmodel.dart';
import 'package:software_grad_project/data/model/slidermodel.dart';

List<OnBoardingModel> onBoardingList = [
  OnBoardingModel("Welcome!", AppImageAssets.onBoardingImageOne,
      "Welcome to RateRelay! Your go-to platform for sharing and discovering valuable feedback on products and services."),
  OnBoardingModel("Share Feedback", AppImageAssets.onBoardingImageTwo,
      "Share your experiences and help others make better choices. Your feedback matters!"),
  OnBoardingModel("Explore", AppImageAssets.onBoardingImageThree,
      "Explore a wide range of businesses and products. Get insights, ask questions, and make informed choices.")
];

List<SliderModel> sliderList = [
  SliderModel("Feedback on Gyms", AppImageAssets.sliderGyms),
  SliderModel("Feedback on Beauty", AppImageAssets.sliderBeauty),
  SliderModel("Feedback on Clothes", AppImageAssets.sliderClothes),
  SliderModel("Feedback on Devices", AppImageAssets.sliderDevices),
  SliderModel("Feedback on Restaurants", AppImageAssets.sliderRestaurants),
];

List categoriesPictures = [
  AppImageAssets.gymCategory,
  AppImageAssets.beautyCategory,
  AppImageAssets.clothesCategory,
  AppImageAssets.devicesCategory,
  AppImageAssets.restaurantCategory
];
