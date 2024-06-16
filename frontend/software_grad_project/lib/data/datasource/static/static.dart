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

Map<int, String> categoriesMap = {
  0: "Select Category",
  1: "gym",
  2: "beauty",
  3: "clothes",
  4: "devices",
  5: "restaurants",
};

List<String> countries = [
  'Select Country',
  'Algeria',
  'Bahrain',
  'Comoros',
  'Djibouti',
  'Egypt',
  'Iraq',
  'Jordan',
  'Kuwait',
  'Lebanon',
  'Libya',
  'Mauritania',
  'Morocco',
  'Palestine',
  'Qatar',
  'Saudi Arabia',
  'Somalia',
  'Sudan',
  'Syria',
  'Tunisia',
  'United Arab Emirates',
  'Yemen',
];

Map<String, List<String>> cities = {
  'Select Country': ['Select City'],
  'Algeria': [
    'Select City',
    'Algiers',
    'Oran',
    'Constantine',
    'Annaba',
    'Batna'
  ],
  'Bahrain': [
    'Select City',
    'Manama',
    'Riffa',
    'Muharraq',
    'Hamad Town',
    'Isa Town'
  ],
  'Comoros': [
    'Select City',
    'Moroni',
    'Moutsamoudou',
    'Fomboni',
    'Domoni',
    'Tsimbeo'
  ],
  'Djibouti': [
    'Select City',
    'Djibouti City',
    'Ali Sabieh',
    'Tadjourah',
    'Obock',
    'Dikhil'
  ],
  'Egypt': [
    'Select City',
    'Cairo',
    'Alexandria',
    'Giza',
    'Shubra El-Kheima',
    'Port Said'
  ],
  'Iraq': ['Select City', 'Baghdad', 'Basra', 'Sulaymaniyah', 'Erbil', 'Najaf'],
  'Jordan': ['Select City', 'Amman', 'Zarqa', 'Irbid', 'Russeifa', 'Al-Salt'],
  'Kuwait': [
    'Select City',
    'Kuwait City',
    'Al Ahmadi',
    'Hawalli',
    'As Salimiyah',
    'Sabah as Salim'
  ],
  'Lebanon': ['Select City', 'Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Jounieh'],
  'Libya': [
    'Select City',
    'Tripoli',
    'Benghazi',
    'Misrata',
    'Tarhuna',
    'Zawiya'
  ],
  'Mauritania': [
    'Select City',
    'Nouakchott',
    'Nouadhibou',
    'Kiffa',
    'Zouérat',
    'Atar'
  ],
  'Morocco': [
    'Select City',
    'Casablanca',
    'Rabat',
    'Fes',
    'Marrakesh',
    'Tangier'
  ],
  'Oman': ['Select City', 'Muscat', 'Seeb', 'Salalah', 'Bawshar', 'Suhar'],
  'Palestine': [
    'Select City',
    'Jerusalem',
    'Gaza',
    'Hebron',
    'Nablus',
    'Rafah',
    'Ya\'bad',
    'Tulkarm',
    'Tubas',
    'Surif',
    'Sa\'ir',
    'Ramallah',
    'Qalqilya',
    'Qabatiya',
    'Khan Yunis',
    'Jericho (Ariha)',
    'Jenin',
    'Jabalia',
    'Idhna',
    'Hebron (al-Khalil)',
    'Halhul',
    'Gaza City (Ghazzah)',
    'Dura',
    'Deir al-Balah',
    'Bethlehem (Beit Lahm)',
    'Beitunia',
    'Beit Ummar',
    'Beit Sahour',
    'Beit Lahia',
    'Beit Jala',
    'Beit Hanoun',
    'Bani Suheila',
    'Bani Na\'im',
    'az-Zawayda',
    'as-Samu',
    'al-Yamun',
    'al-Bireh',
    'ad-Dhahiriya',
    'Abu Dis'
  ],
  'Qatar': [
    'Select City',
    'Doha',
    'Al Rayyan',
    'Umm Salal',
    'Al Wakrah',
    'Al Khor'
  ],
  'Saudi Arabia': [
    'Select City',
    'Riyadh',
    'Jeddah',
    'Mecca',
    'Medina',
    'Dammam'
  ],
  'Somalia': [
    'Select City',
    'Mogadishu',
    'Hargeisa',
    'Bosaso',
    'Kismaayo',
    'Mereeg'
  ],
  'Sudan': [
    'Select City',
    'Khartoum',
    'Omdurman',
    'Port Sudan',
    'Kassala',
    'El Obeid'
  ],
  'Syria': ['Select City', 'Damascus', 'Aleppo', 'Homs', 'Hama', 'Latakia'],
  'Tunisia': ['Select City', 'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  'United Arab Emirates': [
    'Select City',
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Al Ain',
    'Ajman'
  ],
  'Yemen': ['Select City', 'Sanaa', 'Aden', 'Taiz', 'Al Hudaydah', 'Ibb'],
};
