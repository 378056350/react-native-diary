#import <React/RCTBridgeModule.h>
#import <AssetsLibrary/AssetsLibrary.h>
#import <UIKit/UIKit.h>
@interface ReadImageData : NSObject <RCTBridgeModule>
@end

@implementation ReadImageData

RCT_EXPORT_MODULE();

// AssetsLibrary 图片转 Base64字符串
RCT_EXPORT_METHOD(readImage:(NSString *)input quality:(NSString *)quality callback:(RCTResponseSenderBlock)callback)
{

  NSURL *url = [[NSURL alloc] initWithString:input];
  ALAssetsLibrary *library = [[ALAssetsLibrary alloc] init];
  [library assetForURL:url resultBlock:^(ALAsset *asset) {
    ALAssetRepresentation *representation = [asset defaultRepresentation];
    CGImageRef imageRef = [representation fullResolutionImage];
    NSData *imageData = UIImageJPEGRepresentation([UIImage imageWithCGImage:imageRef], [quality floatValue]);
    NSString *base64Encoded = [imageData base64EncodedStringWithOptions:0];
    callback(@[base64Encoded]);
  } failureBlock:^(NSError *error) {
    NSLog(@"that didn't work %@", error);
  }];
}
@end
