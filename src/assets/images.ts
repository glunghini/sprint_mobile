// In a real Expo project, place your actual image files in the assets/ folder
// and import them like:
//   import slider1 from '../../assets/slider1.png';
//
// The base64 strings below are used as fallback for environments without
// local asset bundling (e.g. Expo Snack or web preview).
// For the final APK/IPA build, replace with local require() imports.

export const SLIDER_IMAGES = [
  { uri: require('../../assets/slider1.png'), title: 'FORD F-150 TREMOR', sub: 'Abre Caminho' },
  { uri: require('../../assets/slider2.png'), title: 'MUSTANG GT', sub: 'Adrenalina Pura' },
  { uri: require('../../assets/slider3.png'), title: 'FORD RACING', sub: 'Vencedor' },
];

export const CAR_SILHOUETTE = require('../../assets/mystery_car.png');
