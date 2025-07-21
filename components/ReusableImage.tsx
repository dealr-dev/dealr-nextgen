import { Image, ImageStyle } from 'react-native';

interface Props {
  ImgSrc: any;
  style?: ImageStyle;
  remote?: boolean;
}

export default function ReusableImage({ ImgSrc, style, remote = false }: Props) {
  const source = remote ? { uri: ImgSrc } : ImgSrc;
  return <Image source={source} style={style} resizeMode="cover" />;
}