//
//  AppDelegate+UMShareManager.h
//  NoNet
//
//  Created by RY on 2018/2/11.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AppDelegate.h"
#import <UMSocialCore/UMSocialCore.h>

@interface AppDelegate (UMShareManager)

- (void)umShareManager;
+ (void)shareWithPlatform:(UMSocialPlatformType)platformType;

@end
