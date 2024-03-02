import 'package:software_grad_project/core/constants/imagesassets.dart';
import 'package:software_grad_project/data/model/businessmodel.dart';
import 'package:software_grad_project/data/model/feedbackmodel.dart';
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

List<FeedbackModel> feedbackData = [
  FeedbackModel(
    "John Doe",
    AppImageAssets.profileImage,
    "Doe's Cafe",
    "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience.",
    "assets/images/feedbackImages/cafe.jpg",
    4,
    3,
    2,
  ),
  FeedbackModel(
    "Alice Smith",
    AppImageAssets.profileImage,
    "Smith's Electronics",
    "I recently purchased a new laptop from Smith's Electronics and I couldn't be happier with my purchase! The ordering process was smooth, the delivery was prompt, and the product itself exceeded my expectations. It's rare to find such excellent customer service these days. I will definitely be a returning customer!",
    "assets/images/feedbackImages/devices.jpg",
    5,
    2,
    4,
  ),
  FeedbackModel(
    "Bob Johnson",
    AppImageAssets.profileImage,
    "Johnson's Bakery",
    "Johnson's Bakery never disappoints! Every time I visit, I'm greeted with the heavenly aroma of freshly baked bread and pastries. The quality of their products is outstanding and the staff is always friendly and helpful. It's my go-to place for baked goods, and I highly recommend it to anyone with a sweet tooth!",
    "assets/images/feedbackImages/bakery.jpg",
    4,
    4,
    5,
  ),
];

List businessViewList = [
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
  BusinessViewModel("Business name 1", null),
];
