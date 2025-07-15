const fontGenerator = (weight: number, size: number) =>
  `
        font-weight: ${weight};
        font-size: ${size}px;
    `;

export const font = {
  header1: fontGenerator(700, 42),
  header2: fontGenerator(700, 32),
  header3: fontGenerator(700, 24),
  header4: fontGenerator(700, 20),
  subtitle1: fontGenerator(700, 18),
  subtitle2: fontGenerator(700, 16),
  bodytext1: fontGenerator(400, 16),
  bodytext2: fontGenerator(400, 14),
  bodytext: fontGenerator(400, 12),
};

export type FontType = keyof typeof font;
