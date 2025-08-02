import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CameraProps {
  showPreview: boolean;
  photoUri?: string;
  onCapture: (uri: string) => void;
  onRetake: () => void;
  flip?: boolean;
}

const Camera: React.FC<CameraProps> = ({
  showPreview,
  photoUri,
  onCapture,
  onRetake,
  flip = true,
}) => {
  const [facing, setFacing] = useState<CameraType>('front');
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onCapture(photo.uri);
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      {showPreview && photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.camera} />
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          enableTorch={false}
        >
          
        </CameraView>
      )}

      {showPreview && (
        <TouchableOpacity style={styles.button} onPress={onRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'rgba(90, 137, 234, 0.85)',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default Camera;
