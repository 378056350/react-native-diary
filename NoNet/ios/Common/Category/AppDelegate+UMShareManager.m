//
//  AppDelegate+UMShareManager.m
//  NoNet
//
//  Created by RY on 2018/2/11.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AppDelegate+UMShareManager.h"

#define USHARE_DEMO_APPKEY @"5861e5daf5ade41326001eab"

@implementation AppDelegate (UMShareManager)

- (void)umShareManager {
  [[UMSocialManager defaultManager] openLog:YES];
  [[UMSocialManager defaultManager] setUmSocialAppkey:USHARE_DEMO_APPKEY];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_WechatSession appKey:@"wxdc1e388c3822c80b" appSecret:@"3baf1193c85774b3fd9d18447d76cab0" redirectURL:nil];
  [[UMSocialManager defaultManager] removePlatformProviderWithPlatformTypes:@[@(UMSocialPlatformType_WechatFavorite)]];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_QQ appKey:@"1105821097" appSecret:nil redirectURL:@""];
  [[UMSocialManager defaultManager] setPlaform:UMSocialPlatformType_Sina appKey:@"3921700954"  appSecret:@"04b48b094faeb16683c32669824ebdad" redirectURL:@"https://sns.whalecloud.com/sina2/callback"];
}

+ (void)shareWithPlatform:(UMSocialPlatformType)platformType {
  // 创建分享消息对象
  UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
  
  // 创建网页内容对象
  NSString *thumbURL =  @"https://mobile.umeng.com/images/pic/home/social/img-1.png";
  UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:@"欢迎使用【友盟+】社会化组件U-Share" descr:@"欢迎使用【友盟+】社会化组件U-Share，SDK包最小，集成成本最低，助力您的产品开发、运营与推广！" thumImage:thumbURL];
  //设置网页地址
  shareObject.webpageUrl = @"http://mobile.umeng.com/social";
  
  //分享消息对象设置分享内容对象
  messageObject.shareObject = shareObject;
  
  //调用分享接口
  [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
    if (error) {
      UMSocialLogInfo(@"************Share fail with error %@*********",error);
    }else{
      if ([data isKindOfClass:[UMSocialShareResponse class]]) {
        UMSocialShareResponse *resp = data;
        //分享结果消息
        UMSocialLogInfo(@"response message is %@",resp.message);
        //第三方原始返回的数据
        UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        
      }else{
        UMSocialLogInfo(@"response data is %@",data);
      }
    }
  }];
}

@end
