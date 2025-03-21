'use client';

import { useState } from 'react';
import { Box, Typography, Container, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import ProjectList from './ProjectList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import { useProjects } from '@/hooks/useProjects';

export default function HomePage() {
  const theme = useTheme();
  const { projects, isLoading, error } = useProjects();
  const [showProjects, setShowProjects] = useState(false);

  // 动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <ParticleBackground />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {!showProjects ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 'calc(100vh - 128px)' }}
          >
            <motion.div variants={itemVariants}>
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 2,
                  py: 0.5,
                  mb: 2,
                  borderRadius: '50px',
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(90deg, rgba(0,30,60,0.7), rgba(25,118,210,0.4))'
                    : 'linear-gradient(90deg, rgba(232,245,255,0.8), rgba(227,242,253,0.6))',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}
              >
                <HomeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="subtitle2" color="primary">
                  智能数据助手
                </Typography>
              </Box>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #4FC3F7, #2196F3, #7C4DFF)'
                    : 'linear-gradient(90deg, #0277BD, #0288D1, #039BE5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: theme.palette.mode === 'dark' 
                    ? '0 0 20px rgba(33,150,243,0.3)'
                    : '0 0 10px rgba(3,155,229,0.1)'
                }}
              >
                智能化数据处理平台
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  maxWidth: '700px',
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                利用人工智能技术，轻松创建、管理和共享高质量数据集，打造智能家居级别的数据体验。
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => setShowProjects(true)}
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(90deg, #0D47A1, #1976D2, #42A5F5)'
                      : 'linear-gradient(90deg, #01579B, #0288D1, #29B6F6)',
                    boxShadow: '0 8px 20px rgba(3,155,229,0.3)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, #1565C0, #2196F3, #64B5F6)'
                        : 'linear-gradient(90deg, #0277BD, #039BE5, #4FC3F7)',
                      boxShadow: '0 10px 25px rgba(3,155,229,0.4)',
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  开始体验
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<DashboardIcon />}
                  href="/documentation"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                    color: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: theme.palette.mode === 'dark' ? '#64B5F6' : '#039BE5',
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(13,71,161,0.04)'
                        : 'rgba(1,87,155,0.04)',
                    }
                  }}
                >
                  查看文档
                </Button>
              </Box>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              style={{ 
                marginTop: 'auto', 
                display: 'flex',
                justifyContent: 'center',
                width: '100%' 
              }}
            >
              <Box
                sx={{
                  mt: 8,
                  p: 3,
                  borderRadius: '16px',
                  width: '100%',
                  maxWidth: '900px',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(13,71,161,0.2)'
                    : 'rgba(227,242,253,0.4)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    平台特点
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    智能数据处理、跨平台兼容、无缝协作、实时分析，让数据管理如同智能家居般便捷高效。
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 3,
                    backgroundColor: theme.palette.mode === 'dark' ? '#0D47A1' : '#01579B',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#1565C0' : '#0277BD',
                    }
                  }}
                >
                  了解更多
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mb: 4,
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 700,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(90deg, #4FC3F7, #2196F3)'
                    : 'linear-gradient(90deg, #0277BD, #0288D1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                我的智能项目
              </Typography>
              
              <Button
                variant="outlined"
                onClick={() => setShowProjects(false)}
                sx={{
                  borderRadius: '50px',
                  borderWidth: 2,
                  borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                  color: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: theme.palette.mode === 'dark' ? '#64B5F6' : '#039BE5',
                  }
                }}
              >
                返回首页
              </Button>
            </Box>
            
            <ProjectList projects={projects} isLoading={isLoading} />
          </motion.div>
        )}
      </Container>
    </Box>
  );
} 