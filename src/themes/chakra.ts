import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  colors: {
    brand: {
      50: "#faf6f0",
      100: "#f0e6d2",
      200: "#e0cba5",
      300: "#d4b87e",
      400: "#c49a5c",
      500: "#8b6f47",
      600: "#7a5f3a",
      700: "#5c4729",
      800: "#3d2b1f",
      900: "#2a1d14",
    },
    warmGray: {
      50: "#faf8f5",
      100: "#f5f0e8",
      200: "#e8dfd2",
      300: "#d4c5a9",
      400: "#b8a88a",
      500: "#8c7a62",
      600: "#6b5c48",
      700: "#4a3f32",
      800: "#332b22",
      900: "#1e1a15",
    },
    parchment: {
      50: "#fefcf8",
      100: "#faf6ed",
      200: "#f5eed8",
      300: "#ede2c2",
      400: "#e0d0a0",
    },
  },

  fonts: {
    heading: 'var(--font-playfair), "Playfair Display", "Georgia", serif',
    body: 'var(--font-crimson), "Crimson Text", "Georgia", serif',
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1.05rem",
    lg: "1.15rem",
    xl: "1.3rem",
    "2xl": "1.6rem",
    "3xl": "2rem",
    "4xl": "2.5rem",
    "5xl": "3.25rem",
    "6xl": "4rem",
  },

  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.75,
    taller: "2",
  },

  styles: {
    global: {
      body: {
        bg: "parchment.50",
        color: "warmGray.800",
      },
    },
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        fontFamily: "body",
        borderRadius: "sm",
        letterSpacing: "0.02em",
      },
      variants: {
        solid: {
          bg: "brand.600",
          color: "white",
          _hover: {
            bg: "brand.700",
            transform: "translateY(-1px)",
            shadow: "md",
          },
          _active: {
            bg: "brand.800",
            transform: "translateY(0)",
          },
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.700",
          _hover: {
            bg: "brand.50",
          },
        },
        ghost: {
          color: "brand.700",
          _hover: {
            bg: "parchment.200",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Link: {
      baseStyle: {
        color: "brand.600",
        transition: "all 0.2s",
        _hover: {
          color: "brand.800",
          textDecoration: "none",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "warmGray.300",
            bg: "white",
            _hover: { borderColor: "brand.400" },
            _focus: { borderColor: "brand.500", boxShadow: "0 0 0 1px #8b6f47" },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderColor: "warmGray.300",
          bg: "white",
          _hover: { borderColor: "brand.400" },
          _focus: { borderColor: "brand.500", boxShadow: "0 0 0 1px #8b6f47" },
        },
      },
    },
  },
});

export default theme;
