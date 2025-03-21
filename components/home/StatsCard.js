'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MemoryIcon from '@mui/icons-material/Memory';
import DevicesIcon from '@mui/icons-material/Devices';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { styles } from '@/styles/home';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 智能家居统计卡片
export default function StatsCard() {
  const theme = useTheme();
  
  // 智能家居数据统计
  const stats = [
    {
      title: "已连接设备",
      count: 157,
      icon: <DevicesIcon />,
      color: "#00B8D4"
    },
    {
      title: "智能场景数",
      count: 75,
      icon: <MemoryIcon />,
      color: "#0288D1"
    },
    {
      title: "控制命令",
      count: 2548,
      icon: <SendIcon />,
      color: "#0097A7"
    }
  ];

  return (
    <Box 
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 },
        justifyContent: 'center',
        mb: { xs: 5, md: 8 },
        width: '100%',
        maxWidth: '1100px',
        mx: 'auto',
        px: { xs: 2, md: 3 },
        willChange: 'transform, opacity'
      }}
    >
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          component={motion.div}
          variants={cardVariants}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          sx={{
            ...styles.statsCard,
            flex: 1,
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(77, 208, 225, 0.2)' 
              : 'rgba(3, 169, 244, 0.1)',
            borderRadius: '16px',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0, 30, 60, 0.4)' 
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 8px 20px rgba(0, 172, 193, 0.2)' 
                : '0 8px 20px rgba(3, 169, 244, 0.15)'
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2 
            }}>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.mode === 'dark' ? '#E1F5FE' : '#0277BD'
                }}
              >
                {stat.title}
              </Typography>
              <Box 
                sx={{ 
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme.palette.mode === 'dark' 
                    ? 'rgba(0, 149, 183, 0.15)' 
                    : 'rgba(232, 245, 253, 0.95)',
                  borderRadius: '12px',
                  width: 40,
                  height: 40
                }}
              >
                {stat.icon}
              </Box>
            </Box>
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(90deg, #4DD0E1 0%, #00B8D4 100%)' 
                  : 'linear-gradient(90deg, #0277BD 0%, #0288D1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent'
              }}
            >
              <CountUp 
                end={stat.count} 
                duration={2.5} 
                separator="," 
                decimals={0}
                delay={0.2 + index * 0.1}
              />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}