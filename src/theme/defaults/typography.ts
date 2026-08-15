import { Typography } from "@/types";

export const defaultTypography: Typography = {
  body: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.md}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  bodySmall: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.sm}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  heading: {
    fontFamily: "{fonts.heading}",
    fontSize: "{fontSizes.2xl}",
    fontWeight: "{fontWeights.bold}",
    lineHeight: "{lineHeights.tight}",
  },

  headingSmall: {
    fontFamily: "{fonts.heading}",
    fontSize: "{fontSizes.xl}",
    fontWeight: "{fontWeights.semibold}",
    lineHeight: "{lineHeights.tight}",
  },

  caption: {
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.xs}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },

  mono: {
    fontFamily: "{fonts.mono}",
    fontSize: "{fontSizes.xs}",
    fontWeight: "{fontWeights.normal}",
    lineHeight: "{lineHeights.normal}",
  },
};
