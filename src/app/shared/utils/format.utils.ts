import { IMAGE_SIZES } from "../../image-size.constant";

export const ytFormats = Object.keys(IMAGE_SIZES).filter((key) => key.includes('youtube'));
export const fbFormats = Object.keys(IMAGE_SIZES).filter((key) => key.includes('facebook'));
export const instaFormats = Object.keys(IMAGE_SIZES).filter((key) => key.includes('instagram'));
