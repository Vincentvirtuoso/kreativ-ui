import { SemanticTokens } from "@/types";

export const defaultSemanticTokens: SemanticTokens = {
  colors: {
    brand: {
      value: {
        light: "{colors.blue.500}",
        dark: "{colors.blue.400}",
      },
    },

    brandHover: {
      value: {
        light: "{colors.blue.600}",
        dark: "{colors.blue.300}",
      },
    },

    brandFg: {
      value: "{colors.white}",
    },

    surface: {
      value: {
        light: "{colors.gray.50}",
        dark: "{colors.gray.900}",
      },
    },

    surfaceRaised: {
      value: {
        light: "{colors.white}",
        dark: "{colors.gray.800}",
      },
    },

    surfaceSunken: {
      value: {
        light: "{colors.gray.100}",
        dark: "{colors.gray.950}",
      },
    },

    border: {
      value: {
        light: "{colors.gray.200}",
        dark: "{colors.gray.600}",
      },
    },

    text: {
      value: {
        light: "{colors.gray.900}",
        dark: "{colors.gray.50}",
      },
    },

    textMuted: {
      value: {
        light: "{colors.gray.500}",
        dark: "{colors.gray.400}",
      },
    },

    destructive: {
      value: {
        light: "{colors.red.500}",
        dark: "{colors.red.400}",
      },
    },

    destructiveFg: {
      value: "{colors.white}",
    },

    destructiveHover: {
      value: {
        light: "{colors.red.600}",
        dark: "{colors.red.300}",
      },
    },

    success: {
      value: {
        light: "{colors.green.500}",
        dark: "{colors.green.400}",
      },
    },

    successFg: {
      value: "{colors.white}",
    },

    successHover: {
      value: {
        light: "{colors.green.600}",
        dark: "{colors.green.300}",
      },
    },

    warning: {
      value: {
        light: "{colors.amber.500}",
        dark: "{colors.amber.400}",
      },
    },

    warningFg: {
      value: "{colors.black}",
    },

    warningHover: {
      value: {
        light: "{colors.amber.600}",
        dark: "{colors.amber.300}",
      },
    },

    info: {
      value: {
        light: "{colors.cyan.500}",
        dark: "{colors.cyan.400}",
      },
    },

    infoFg: {
      value: "{colors.white}",
    },

    infoHover: {
      value: {
        light: "{colors.cyan.600}",
        dark: "{colors.cyan.300}",
      },
    },
  },
};