//
//  UMShareNative.m
//  NoNet
//
//  Created by RY on 2018/2/11.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "UMShareNative.h"
#import <UMSocialCore/UMSocialCore.h>
#import <UShareUI/UShareUI.h>
#import "AppDelegate+UMShareManager.h"

@implementation UMShareNative
RCT_EXPORT_MODULE()

// rn -> ios Block回调
RCT_EXPORT_METHOD(share:(NSDictionary *)dic andCallback:(RCTResponseSenderBlock)callback) {
  NSLog(@"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//  NSMutableString *st = [NSMutableString string];
//  for (NSObject *key in dic.allKeys) {
//    NSString *string = [NSString stringWithFormat:@"%@:%@;",key,[dic objectForKey:key]];
//    [st appendString:string];
//  }
//  callback(@[@"error",st]);
  [UMSocialUIManager setPreDefinePlatforms:@[@(UMSocialPlatformType_QQ),@(UMSocialPlatformType_WechatSession),@(UMSocialPlatformType_WechatTimeLine),@(UMSocialPlatformType_Sina)]];
  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    [AppDelegate shareWithPlatform:platformType];
//    if (userInfo) {
//      callback(@[@"", userInfo]);
//    } else {
//      callback(@[@"error", @""]);
//    }
  }];
}




- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

@end
