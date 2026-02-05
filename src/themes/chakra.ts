import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'var(--font-oooh), cursive',
    body: 'var(--font-baloo), sans-serif',
  },
  colors: {
    // Brand colors with improved contrast
    blue: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3", // Primary blue with WCAG AA contrast
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
  },
  styles: {
    global: {
      // Ensure sufficient contrast for text
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
      // Focus visible styles for keyboard navigation
      "*:focus-visible": {
        outline: "2px solid",
        outlineColor: "blue.500",
        outlineOffset: "2px",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
      baseStyle: {
        fontWeight: "600",
        borderRadius: "md",
      },
    },
    Link: {
      baseStyle: {
        color: "blue.600", // Darker blue for better contrast
        _hover: {
          color: "blue.700",
          textDecoration: "underline",
        },
        _focusVisible: {
          outline: "2px solid",
          outlineColor: "blue.500",
          outlineOffset: "2px",
        },
      },
    },
  },
});

export default theme;
