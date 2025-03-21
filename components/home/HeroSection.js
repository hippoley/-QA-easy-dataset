'use client';

import { Box, Container, Typography, Button, useMediaQuery, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import HubIcon from '@mui/icons-material/Hub';
import { styles } from '@/styles/home';
import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ onCreateProject }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ ...styles.heroSection, ...styles.heroBackground(theme) }}>
            {/* 粒子背景效果 */}
            <ParticleBackground />

            {/* 装饰圆形 */}
            <Box sx={styles.decorativeCircle} />
            <Box sx={styles.decorativeCircleSecond} />

            {/* 添加智能家居图标元素 */}
            <Box 
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.15, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    zIndex: 0,
                    color: theme.palette.mode === 'dark' ? '#0288D1' : '#0277BD',
                    fontSize: 100,
                    filter: 'blur(1px)',
                    willChange: 'transform'
                }}
            >
                <HomeIcon sx={{ fontSize: 'inherit' }} />
            </Box>

            <Box 
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.15, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '10%',
                    zIndex: 0,
                    color: theme.palette.mode === 'dark' ? '#00B8D4' : '#0097A7',
                    fontSize: 80,
                    filter: 'blur(1px)',
                    willChange: 'transform'
                }}
            >
                <HubIcon sx={{ fontSize: 'inherit' }} />
            </Box>

            <Container maxWidth="lg">
                <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={7}>
                        <Box 
                            component={motion.div} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            sx={{ zIndex: 1, position: 'relative' }}
                        >
                            <Typography
                                variant="h2"
                                gutterBottom
                                sx={{
                                    ...styles.gradientTitle,
                                    fontWeight: 800,
                                    mb: 2,
                                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                                    letterSpacing: '-0.5px',
                                    lineHeight: 1.2
                                }}
                            >
                                RIZLL 智能家居<br />数据管理平台
                            </Typography>

                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    opacity: 0.9, 
                                    mb: 4, 
                                    maxWidth: '600px',
                                    lineHeight: 1.6
                                }}
                            >
                                连接、管理与分析您的智能家居数据，让您的家更智能、更高效、更舒适
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button 
                                    variant="contained" 
                                    size="large"
                                    sx={styles.createButton}
                                    onClick={onCreateProject}
                                    startIcon={<AddCircleOutlineIcon />}
                                    component={motion.button}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    创建新项目
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="large"
                                    startIcon={<SearchIcon />}
                                    sx={{
                                        borderRadius: '50px',
                                        borderWidth: '2px',
                                        '&:hover': {
                                            borderWidth: '2px'
                                        }
                                    }}
                                    component={motion.button}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    浏览数据集
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            sx={{
                                position: 'relative',
                                height: '400px',
                                width: '100%',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0, 127, 178, 0.15)',
                            }}
                        >
                            <Box
                                component="img"
                                src="/imgs/bg.png"
                                alt="Smart Home"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}