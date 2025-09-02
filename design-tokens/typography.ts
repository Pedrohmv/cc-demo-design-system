// Typography tokens extracted from Figma
export const typography = {
  'caption-base-large-bold': {
    fontFamily: '"DM Sans"',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  'caption-base-regular': {
    fontFamily: '"DM Sans"',
    fontStyle: 'normal', 
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '1.4'
  },
  'tag-normal-regular': {
    fontFamily: '"DM Sans"',
    fontStyle: 'normal',
    fontWeight: '400', 
    fontSize: '12px',
    lineHeight: '1'
  },
  // Utility classes
  caption: {
    large: {
      bold: {
        fontFamily: '"DM Sans"',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '1.4'
      }
    },
    base: {
      regular: {
        fontFamily: '"DM Sans"',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px', 
        lineHeight: '1.4'
      }
    }
  },
  tag: {
    normal: {
      regular: {
        fontFamily: '"DM Sans"',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '1'
      }
    }
  }
} as const;