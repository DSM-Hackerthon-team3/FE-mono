const fontGenerator = (weight: number, size: number) => {
  return {
    fontWeight: weight,
    fontFamily: 'Pretendard',
    fontSize: `${size}px`,
  };
};

export const font = {
  header1: fontGenerator(600, 42),
  header2: fontGenerator(600, 32),
  header3: fontGenerator(600, 24),
  header4: fontGenerator(600, 20),
  subtitle1: fontGenerator(700, 18),
  subtitle2: fontGenerator(700, 16),
  bodytext1: fontGenerator(400, 16),
  bodytext2: fontGenerator(400, 14),
  bodytext3: fontGenerator(400, 12),
  caption: fontGenerator(300, 10),
  "heading-1": fontGenerator(300, 22),
};

export type FontType = keyof typeof font;
