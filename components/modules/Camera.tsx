import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, {
    forwardRef,
    useImperativeHandle, useRef, useState
} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
  
  export interface CameraHandle {
    takePhoto: () => Promise<void>;
    flipCamera: () => void;
  }
  
  interface CameraProps {
    showPreview: boolean;
    photoUri?: string;
    onCapture: (uri: string) => void;
    onRetake: () => void;
  }
  
  const Camera = forwardRef<CameraHandle, CameraProps>(
    ({ showPreview, photoUri, onCapture, onRetake }, ref) => {
      const cameraRef = useRef<any>(null);
      const [facing, setFacing] = useState<CameraType>('front');
      const [permission, requestPermission] = useCameraPermissions();
  
      useImperativeHandle(ref, () => ({
        takePhoto: async () => {
          if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            onCapture(photo.uri);
          }
        },
        flipCamera: () => {
          setFacing(prev => (prev === 'back' ? 'front' : 'back'));
        },
      }));
  
      if (!permission) return <View />;
      if (!permission.granted) {
        return (
          <View style={styles.container}>
            <Text style={styles.permissionText}>
              We need your permission to show the camera
            </Text>
            <Text onPress={requestPermission} style={styles.link}>
              Grant permission
            </Text>
          </View>
        );
      }
  
      return (
        <View style={styles.container}>
          {showPreview && photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.camera} />
          ) : (
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
            />
          )}
        </View>
      );
    }
  );
  
  const styles = StyleSheet.create({
    container: {
      width: 291,
      height: 350,
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      width: 291,
      height: 291,
      borderRadius: 800,
      overflow: 'hidden',
    },
    permissionText: {
      textAlign: 'center',
      marginBottom: 12,
    },
    link: {
      textAlign: 'center',
      color: '#5A89EA',
      fontWeight: 'bold',
    },
  });
  
  export default Camera;
  