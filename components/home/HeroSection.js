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
                transition={{ duration: 1, delay: 0.8 }}
                sx={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    zIndex: 0,
                    color: theme.palette.mode === 'dark' ? '#0288D1' : '#0277BD',
                    fontSize: 100
                }}
            >
                <HomeIcon sx={{ fontSize: 'inherit' }} />
            </Box>

            <Box 
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.15, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '10%',
                    zIndex: 0,
                    color: theme.palette.mode === 'dark' ? '#4DD0E1' : '#039BE5',
                    fontSize: 80
                }}
            >
                <HubIcon sx={{ fontSize: 'inherit' }} />
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                textAlign: { xs: 'center', md: 'left' },
                                py: { xs: 5, md: 8 }
                            }}
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant={isMobile ? "h3" : "h1"}
                                component="h1"
                                fontWeight="bold"
                                sx={{
                                    ...styles.gradientTitle(theme),
                                    letterSpacing: '-1px',
                                    mb: 3,
                                    textShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(0, 136, 204, 0.3)' : 'none'
                                }}
                            >
                                {t('home.title')}
                            </Typography>

                            <Typography
                                variant={isMobile ? "body1" : "h5"}
                                component={motion.p}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                color="text.secondary"
                                paragraph
                                sx={{
                                    maxWidth: '650px',
                                    mx: { xs: 'auto', md: 0 },
                                    lineHeight: 1.8,
                                    opacity: 0.9,
                                    fontSize: { xs: '1rem', md: '1.2rem' },
                                    fontWeight: 400,
                                    mb: 4
                                }}
                            >
                                {t('home.subtitle')}
                            </Typography>

                            <Box
                                component={motion.div}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                sx={{
                                    mt: 6,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    gap: { xs: 2, sm: 3 }
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={onCreateProject}
                                    startIcon={<AddCircleOutlineIcon />}
                                    sx={styles.createButton(theme)}
                                >
                                    {t('home.createProject')}
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        window.location.href = '/dataset-square'
                                    }}
                                    startIcon={<SearchIcon />}
                                    sx={{
                                        ...styles.createButton(theme),
                                        background: theme.palette.mode === 'dark' 
                                            ? 'rgba(0, 149, 183, 0.15)' 
                                            : 'rgba(232, 245, 253, 0.95)',
                                        color: theme.palette.mode === 'dark' ? '#4DD0E1' : '#0277BD',
                                        '&:hover': {
                                            background: theme.palette.mode === 'dark' 
                                                ? 'rgba(0, 149, 183, 0.25)' 
                                                : 'rgba(232, 245, 253, 1)',
                                        }
                                    }}
                                >
                                    {t('home.searchDataset')}
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