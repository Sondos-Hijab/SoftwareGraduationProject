import 'package:intl/intl.dart';
import 'package:software_grad_project/core/constants/images_assets.dart';
import 'package:software_grad_project/data/model/businesses_name_image_model.dart';
import 'package:software_grad_project/data/model/feedback_model.dart';
import 'package:software_grad_project/data/model/follower_model.dart';
import 'package:software_grad_project/data/model/notification_item_model.dart';
import 'package:software_grad_project/data/model/onboarding_screens_model.dart';
import 'package:software_grad_project/data/model/posts_model.dart';
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

List<FeedbackModel> feedbackData = [
  FeedbackModel(
    "John Doe",
    null,
    "Doe's Cafe",
    "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience.",
    null,
    4,
    3,
    2,
  ),
  FeedbackModel(
    "Alice Smith",
    null,
    "Smith's Electronics",
    "I recently purchased a new laptop from Smith's Electronics and I couldn't be happier with my purchase! The ordering process was smooth, the delivery was prompt, and the product itself exceeded my expectations. It's rare to find such excellent customer service these days. I will definitely be a returning customer!",
    null,
    5,
    2,
    4,
  ),
  FeedbackModel(
    "Bob Johnson",
    null,
    "Johnson's Bakery",
    "Johnson's Bakery never disappoints! Every time I visit, I'm greeted with the heavenly aroma of freshly baked bread and pastries. The quality of their products is outstanding and the staff is always friendly and helpful. It's my go-to place for baked goods, and I highly recommend it to anyone with a sweet tooth!",
    null,
    4,
    4,
    5,
  ),
  FeedbackModel(
    "John Doe",
    null,
    "Doe's Cafe",
    "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience.",
    null,
    4,
    3,
    2,
  ),
  FeedbackModel(
    "John Doe",
    null,
    "Doe's Cafe",
    "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience.",
    null,
    4,
    3,
    2,
  ),
  FeedbackModel(
    "John Doe",
    null,
    "Doe's Cafe",
    "I had a wonderful experience at Doe's Cafe! The ambiance was cozy, the food was delicious, and the staff was very attentive. I especially loved their signature dish, it was simply divine. I highly recommend this place to anyone looking for a great dining experience.",
    null,
    4,
    3,
    2,
  ),
];

List<BusinessViewModel> businessViewList = [
  BusinessViewModel("RateRelay Business", null),
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

DateTime now = DateTime(
  2024, // year
  3, // month (1-12)
  1, // day
  10, // hour (0-23)
  30, // minute (0-59)
  0,
);

List<PostsModel> postsList = [
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
  PostsModel(
      null,
      "Business 1",
      "Step into our coffee world through this snapshot: imagine a warm cup of coffee on a wooden table, surrounded by scattered beans.",
      null,
      DateFormat('yyyy-MM-dd').format(now),
      DateFormat('HH:mm:ss').format(now)),
];

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

List<FollowerViewModel> followers = [
  FollowerViewModel("Follower 1", null),
  FollowerViewModel("Follower 2", null),
  FollowerViewModel("Follower 3", null),
  FollowerViewModel("Follower 4", null),
  FollowerViewModel("Follower 5", null),
  FollowerViewModel("Follower 1", null),
  FollowerViewModel("Follower 2", null),
  FollowerViewModel("Follower 3", null),
  FollowerViewModel("Follower 4", null),
  FollowerViewModel("Follower 5", null),
  FollowerViewModel("Follower 1", null),
  FollowerViewModel("Follower 2", null),
  FollowerViewModel("Follower 3", null),
  FollowerViewModel("Follower 4", null),
  FollowerViewModel("Follower 5", null)
];
