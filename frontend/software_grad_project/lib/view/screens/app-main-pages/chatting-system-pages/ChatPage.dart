// import 'package:flutter/material.dart';
// import 'package:flutter_chat_ui/flutter_chat_ui.dart';
// import 'package:get/get.dart';
// import 'package:software_grad_project/controller/app-main-pages-controllers/chat_page_controller.dart';
// import 'package:software_grad_project/core/constants/colors.dart';

// class ChatPage extends StatelessWidget {
//   const ChatPage({super.key});

//   @override
//   Widget build(BuildContext context) {
//     Get.put(ChatsPageControllerImp());
//     return GetBuilder<ChatsPageControllerImp>(builder: (controller) {
//       return Scaffold(
//           key: controller.scaffoldKey,
//           appBar: AppBar(
//             centerTitle: true,
//             backgroundColor: AppColors.appWhite,
//             elevation: 0.0,
//             title: Text(
//               controller.businessName,
//               style: Theme.of(context).textTheme.headline6,
//             ),
//           ),
//           body: SafeArea(
//             child: Chat(
//               messages: controller.messages,
//               onAttachmentPressed: () {
//                 controller.handleAttachmentPressed(context);
//               },
//               onMessageTap: controller.handleMessageTap,
//               onPreviewDataFetched: controller.handlePreviewDataFetched,
//               onSendPressed: controller.handleSendPressed,
//               showUserAvatars: true,
//               showUserNames: true,
//               user: controller.user,
//               theme: const DefaultChatTheme(
//                 seenIcon: Text(
//                   'read',
//                   style: TextStyle(
//                     fontSize: 10.0,
//                   ),
//                 ),
//               ),
//             ),
//           ));
//     });
//   }
// }
