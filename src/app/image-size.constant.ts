interface ImageSizeDetails {
  width: number;
  height: number;
  formatName: string;
}

export const IMAGE_SIZES: { [key: string]: ImageSizeDetails } = {
  'yt-thumbnail': { width: 1280, height: 720, formatName: 'YouTube Thumbnail' },
  'yt-cover': { width: 2560, height: 1440, formatName: 'YouTube Cover' },
  'yt-end-screen': { width: 1920, height: 1080, formatName: 'YouTube End Screen' },
  'yt-channel-art': { width: 2560, height: 1440, formatName: 'YouTube Channel Art' },
  'yt-banner': { width: 2560, height: 1440, formatName: 'YouTube Banner' },

  'facebook-story': { width: 1080, height: 1920, formatName: 'Facebook Story' },
  'facebook-square': { width: 1200, height: 1200, formatName: 'Facebook Square' },
  'facebook-event-cover': { width: 1920, height: 1080, formatName: 'Facebook Event Cover' },
  'facebook-cover': { width: 1600, height: 900, formatName: 'Facebook Cover' },
  'facebook-post': { width: 1200, height: 630, formatName: 'Facebook Post' },
  'facebook-ad': { width: 1200, height: 628, formatName: 'Facebook Ad' },
  'facebook-group-cover': { width: 1640, height: 856, formatName: 'Facebook Group Cover' },
  'facebook-cover-photo': { width: 820, height: 312, formatName: 'Facebook Cover Photo' },

  'instagram-story': { width: 1080, height: 1920, formatName: 'Instagram Story' },
  'instagram-portrait': { width: 1080, height: 1350, formatName: 'Instagram Portrait' },
  'instagram-post': { width: 1080, height: 1080, formatName: 'Instagram Post' },
  'instagram-landscape': { width: 1080, height: 566, formatName: 'Instagram Landscape' }
};
