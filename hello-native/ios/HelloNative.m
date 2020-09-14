#import "HelloNative.h"
#import <React/RCTLog.h>

@implementation HelloNative

RCT_EXPORT_MODULE()

// Example method
// See // https://facebook.github.io/react-native/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(nonnull NSNumber*)a withB:(nonnull NSNumber*)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @([a floatValue] * [b floatValue]);

  resolve(result);
}

RCT_REMAP_METHOD(sayHello, sayHelloWith:(NSString *)name withResolver:(RCTPromiseResolveBlock)resolve
                                                            withRejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"Saying hello to %@", name);
  NSString *hello = [NSString stringWithFormat: @"Hello %@ from Native IOS !", name];
  resolve(hello);
}


@end
