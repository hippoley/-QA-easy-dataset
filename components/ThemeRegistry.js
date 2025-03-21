'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// 导入字体
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

// 创建主题配置
const getTheme = (mode) => {
  // 智能家居主题色调
  const primaryLight = '#29B6F6'; // 浅蓝色
  const primaryMain = '#0288D1'; // 中蓝色
  const primaryDark = '#01579B'; // 深蓝色
  
  const secondaryLight = '#4DD0E1'; // 浅青色
  const secondaryMain = '#00B8D4'; // 中青色 
  const secondaryDark = '#0097A7'; // 深青色
  
  // 暗色主题背景色
  const darkBackground = '#121A21'; // 深海蓝黑色
  const darkPaper = '#18232C'; // 深蓝灰色
  
  // 数据可视化色谱 - 智能家居风格
  const dataVizColors = [
    '#0288D1', // 蓝色
    '#4DD0E1', // 青色
    '#03A9F4', // 淡蓝色
    '#2196F3', // 明亮蓝色
    '#00BCD4', // 青绿色
    '#4FC3F7'  // 天蓝色
  ];
  
  // 状态色
  const successColor = '#26A69A'; // 清新绿色
  const warningColor = '#29B6F6'; // 信息蓝
  const errorColor = '#EF5350';   // 错误红
  
  // 渐变色
  const gradientPrimary = mode === 'dark'
    ? 'linear-gradient(90deg, #01579B 0%, #0288D1 50%, #03A9F4 100%)'
    : 'linear-gradient(90deg, #01579B 0%, #0288D1 50%, #29B6F6 100%)';
  
  const gradientSecondary = mode === 'dark'
    ? 'linear-gradient(90deg, #006064 0%, #0097A7 50%, #00BCD4 100%)'
    : 'linear-gradient(90deg, #0097A7 0%, #00BCD4 50%, #4DD0E1 100%)';
  
  // 根据模式调整颜色
  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        dark: primaryDark,
        light: primaryLight,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: secondaryMain,
        dark: secondaryDark,
        light: secondaryLight,
        contrastText: '#FFFFFF',
      },
      error: {
        main: errorColor,
        dark: '#D32F2F',
        light: '#FFCDD2',
      },
      warning: {
        main: warningColor,
        dark: '#0288D1',
        light: '#4FC3F7',
      },
      success: {
        main: successColor,
        dark: '#00897B',
        light: '#80CBC4',
      },
      background: {
        default: mode === 'dark' ? darkBackground : '#F5FBFF',
        paper: mode === 'dark' ? darkPaper : '#FFFFFF',
        subtle: mode === 'dark' ? '#1E2A35' : '#E3F2FD',
      },
      text: {
        primary: mode === 'dark' ? '#E1F5FE' : primaryDark,
        secondary: mode === 'dark' ? '#B3E5FC' : primaryMain,
        disabled: mode === 'dark' ? '#4C626F' : '#78909C',
      },
      divider: mode === 'dark' ? 'rgba(77, 208, 225, 0.1)' : 'rgba(3, 169, 244, 0.1)',
      dataViz: dataVizColors,
      gradient: {
        primary: gradientPrimary,
        secondary: gradientSecondary
      }
    },
    typography: {
      fontFamily: '"Inter", "HarmonyOS Sans", "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontSize: '2.25rem', // 36px
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontSize: '1.75rem', // 28px
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.005em',
      },
      h3: {
        fontSize: '1.5rem', // 24px
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem', // 20px
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.125rem', // 18px
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem', // 16px
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem', // 16px
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem', // 14px
        lineHeight: 1.6,
      },
      caption: {
        fontSize: '0.75rem', // 12px
        lineHeight: 1.5,
      },
      code: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 12, // 增加圆角
    },
    spacing: 8, // 基础间距单位为8px
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: mode === 'dark' ? '#29B6F6 transparent' : '#0288D1 transparent',
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'dark' ? '#29B6F6' : '#0288D1',
              borderRadius: '4px',
            },
            backgroundColor: mode === 'dark' ? darkBackground : '#F5FBFF',
            color: mode === 'dark' ? '#E1F5FE' : primaryDark,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
          // 确保代码块使用 JetBrains Mono 字体
          'code, pre': {
            fontFamily: '"JetBrains Mono", monospace',
            borderRadius: '8px',
            backgroundColor: mode === 'dark' ? 'rgba(0, 30, 60, 0.5)' : 'rgba(227, 242, 253, 0.7)',
          },
          // 自定义渐变文本的通用样式
          '.gradient-text': {
            background: gradientPrimary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          },
          '.gradient-text-secondary': {
            background: gradientSecondary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          },
          '.text-shadow': {
            textShadow: mode === 'dark' ? '0 0 15px rgba(41, 182, 246, 0.4)' : '0 0 10px rgba(2, 136, 209, 0.2)',
          }
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '50px', // 圆形按钮
            padding: '8px 20px',
            transition: 'all 0.3s ease',
          },
          contained: {
            boxShadow: mode === 'dark' 
              ? '0 4px 12px rgba(0, 188, 212, 0.3)' 
              : '0 4px 12px rgba(3, 169, 244, 0.2)',
            '&:hover': {
              boxShadow: mode === 'dark' 
                ? '0 6px 16px rgba(0, 188, 212, 0.4)' 
                : '0 6px 16px rgba(3, 169, 244, 0.3)',
              transform: 'translateY(-2px)',
            },
          },
          containedPrimary: {
            background: mode === 'dark' 
              ? 'linear-gradient(135deg, #01579B, #0288D1)' 
              : 'linear-gradient(135deg, #0288D1, #29B6F6)',
            '&:hover': {
              background: mode === 'dark' 
                ? 'linear-gradient(135deg, #01579B, #039BE5)' 
                : 'linear-gradient(135deg, #0277BD, #03A9F4)',
            },
          },
          containedSecondary: {
            background: mode === 'dark' 
              ? 'linear-gradient(135deg, #006064, #0097A7)' 
              : 'linear-gradient(135deg, #0097A7, #00BCD4)',
            '&:hover': {
              background: mode === 'dark' 
                ? 'linear-gradient(135deg, #00838F, #00ACC1)' 
                : 'linear-gradient(135deg, #00ACC1, #26C6DA)',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              background: mode === 'dark' 
                ? 'rgba(41, 182, 246, 0.1)' 
                : 'rgba(3, 169, 244, 0.1)',
            },
          },
          outlinedPrimary: {
            borderColor: mode === 'dark' ? '#0288D1' : '#0288D1',
            '&:hover': {
              borderColor: mode === 'dark' ? '#29B6F6' : '#03A9F4',
            }
          },
          text: {
            '&:hover': {
              background: mode === 'dark' 
                ? 'rgba(41, 182, 246, 0.1)' 
                : 'rgba(3, 169, 244, 0.1)',
            }
          }
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            background: mode === 'dark' 
              ? 'rgba(18, 26, 33, 0.8)' 
              : 'rgba(3, 169, 244, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            boxShadow: mode === 'dark' 
              ? '0 8px 24px rgba(0, 0, 0, 0.3)' 
              : '0 8px 24px rgba(2, 136, 209, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'dark' 
                ? '0 12px 30px rgba(0, 0, 0, 0.4)' 
                : '0 12px 30px rgba(2, 136, 209, 0.15)',
            }
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backgroundImage: 'none',
          },
          elevation1: {
            boxShadow: mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
              : '0 4px 20px rgba(2, 136, 209, 0.08)',
          },
          elevation2: {
            boxShadow: mode === 'dark' 
              ? '0 6px 24px rgba(0, 0, 0, 0.25)' 
              : '0 6px 24px rgba(2, 136, 209, 0.12)',
          }
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '50px', // 完全圆角
            fontWeight: 500,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
          filled: {
            background: mode === 'dark' 
              ? 'rgba(41, 182, 246, 0.2)' 
              : 'rgba(3, 169, 244, 0.1)',
          },
          outlined: {
            borderWidth: '1.5px',
          }
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'dark' ? '#29B6F6' : '#0288D1'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'dark' ? '#29B6F6' : '#0288D1',
                borderWidth: '2px'
              }
            }
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            background: mode === 'dark'
              ? 'rgba(18, 26, 33, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            boxShadow: mode === 'dark'
              ? '0 20px 40px rgba(0, 0, 0, 0.4)'
              : '0 20px 40px rgba(0, 136, 204, 0.1)',
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              backgroundColor: mode === 'dark' 
                ? 'rgba(0, 136, 204, 0.1)' 
                : 'rgba(227, 242, 253, 0.7)',
            }
          }
        }
      }
    },
  });
};

export default function ThemeRegistry({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <InnerThemeRegistry>
        {children}
      </InnerThemeRegistry>
    </NextThemeProvider>
  );
}

function InnerThemeRegistry({ children }) {
  const { resolvedTheme } = useTheme();
  const theme = getTheme(resolvedTheme === 'dark' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

