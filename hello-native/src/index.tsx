import { NativeModules } from 'react-native';

type HelloNativeType = {
  multiply(a: number, b: number): Promise<number>;
  sayHello(name: String): Promise<String>;
};

const { HelloNative } = NativeModules;

export default HelloNative as HelloNativeType;
