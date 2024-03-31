import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/data/model/notification_item_model.dart';
import 'package:software_grad_project/data/model/onboarding_screens_model.dart';
import 'package:software_grad_project/data/model/home_page_slider_model.dart';

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

Map<int, String> categoriesMapping = {
  0: "gym",
  1: "beauty",
  2: "clothes",
  3: "devices",
  4: "restaurants",
};

final List<NotificationItem> notifications = [
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business1',
    time: '2 hours ago',
  ),
  NotificationItem(
    userPicture: 'assets/images/no-user.jpg',
    username: 'business2',
    time: '1 hour ago',
  ),
];
