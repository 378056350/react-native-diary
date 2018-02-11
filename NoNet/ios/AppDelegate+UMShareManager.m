//
//  AppDelegate+UMShareManager.m
//  NoNet
//
//  Created by RY on 2018/2/11.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AppDelegate+UMShareManager.h"
#import <UMSocialCore/UMSocialCore.h>

#define USHARE_DEMO_APPKEY @""

@implementation AppDelegate (UMShareManager)

- (void)umShareManager {
  [[UMSocialManager defaultManager] openLog:YES];
  [[UMSocialManager defaultManager] setUmSocialAppkey:USHARE_DEMO_APPKEY];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wxdc1e388c3822c80b" appSecret:@"3baf1193c85774b3fd9d18447d76cab0" redirectURL:nil];
  [[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1105821097" appSecret:nil redirectURL:@""];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"3921700954"  appSecret:@"04b48b094faeb16683c32669824ebdad" redirectURL:@"https://sns.whalecloud.com/sina2/callback"];
}

@end
