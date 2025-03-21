'use client';

import { Paper, Grid, Box, Typography, useMediaQuery, Avatar } from '@mui/material';
import { styles } from '@/styles/home';
import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import { useTranslation } from 'react-i18next';

// 默认模型列表
const mockModels = [
    { id: 'deepseek-r1', provider: 'Ollama', name: 'DeepSeek-R1' },
    { id: 'gpt-3.5-turbo-openai', provider: 'OpenAI', name: 'gpt-3.5-turbo' },
    { id: 'gpt-3.5-turbo-guiji', provider: 'Guiji', name: 'gpt-3.5-turbo' },
    { id: 'glm-4-flash', provider: 'Zhipu AI', name: 'GLM-4-Flash' }
];

export default function StatsCard({ projects = [] }) {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // 统计卡片数据
    const statsItems = [
        {
            value: projects.length,
            label: t('stats.ongoingProjects'),
            color: 'primary',
            icon: <FolderOpenIcon />,
            gradientFrom: theme.palette.mode === 'dark' ? '#0D47A1' : '#0277BD',
            gradientTo: theme.palette.mode === 'dark' ? '#2196F3' : '#039BE5'
        },
        {
            value: projects.reduce((sum, project) => sum + (project.questionsCount || 0), 0),
            label: t('stats.questionCount'),
            color: 'secondary',
            icon: <QuestionAnswerIcon />,
            gradientFrom: theme.palette.mode === 'dark' ? '#00796B' : '#00897B',
            gradientTo: theme.palette.mode === 'dark' ? '#4DD0E1' : '#26C6DA'
        },
        {
            value: projects.reduce((sum, project) => sum + (project.datasetsCount || 0), 0),
            label: t('stats.generatedDatasets'),
            color: 'info',
            icon: <StorageIcon />,
            gradientFrom: theme.palette.mode === 'dark' ? '#0097A7' : '#00ACC1',
            gradientTo: theme.palette.mode === 'dark' ? '#29B6F6' : '#4FC3F7'
        },
        {
            value: mockModels.length,
            label: t('stats.supportedModels'),
            color: 'primary',
            icon: <MemoryIcon />,
            gradientFrom: theme.palette.mode === 'dark' ? '#1565C0' : '#0288D1',
            gradientTo: theme.palette.mode === 'dark' ? '#42A5F5' : '#29B6F6'
        }
    ];

    return (
        <Paper 
            elevation={0} 
            sx={{
                ...styles.statsCard(theme),
                p: 3,
                borderRadius: '20px',
                background: theme.palette.mode === 'dark' 
                    ? 'rgba(18, 26, 33, 0.6)' 
                    : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 30px rgba(0, 0, 0, 0.2)'
                    : '0 10px 30px rgba(0, 0, 0, 0.08)'
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="smart-card data-flow"
        >
            <Grid container spacing={4}>
                {statsItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            whileHover={{ 
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: { xs: 2, md: 3 },
                                    py: { xs: 3, md: 4 },
                                    borderRadius: '16px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: theme.palette.mode === 'dark' 
                                        ? 'rgba(13, 71, 161, 0.1)' 
                                        : 'rgba(232, 245, 253, 0.7)',
                                    border: theme.palette.mode === 'dark'
                                        ? '1px solid rgba(25, 118, 210, 0.2)'
                                        : '1px solid rgba(3, 155, 229, 0.2)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(135deg, ${item.gradientFrom}10, ${item.gradientTo}20)`,
                                        zIndex: -1
                                    }
                                }}
                            >
                                <Box 
                                    sx={{
                                        position: 'absolute', 
                                        top: '-20px', 
                                        right: '-20px', 
                                        width: '100px', 
                                        height: '100px', 
                                        borderRadius: '50%', 
                                        background: `radial-gradient(circle, ${item.gradientTo}20, transparent 70%)`,
                                        filter: 'blur(15px)', 
                                        opacity: 0.8
                                    }} 
                                />
                                
                                <Avatar 
                                    sx={{
                                        width: 60, 
                                        height: 60, 
                                        mb: 2.5,
                                        background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                                        color: '#fff',
                                        boxShadow: `0 8px 20px ${item.gradientTo}40`,
                                        border: '4px solid',
                                        borderColor: theme.palette.mode === 'dark' 
                                            ? 'rgba(18, 26, 33, 0.7)' 
                                            : 'rgba(255, 255, 255, 0.9)',
                                    }}
                                    className="smart-icon"
                                >
                                    {item.icon}
                                </Avatar>
                                
                                <Typography 
                                    variant={isMobile ? 'h3' : 'h2'} 
                                    fontWeight="bold"
                                    sx={{
                                        mb: 1,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        textFillColor: 'transparent',
                                        letterSpacing: '-0.5px'
                                    }}
                                >
                                    {item.value}
                                </Typography>
                                
                                <Typography 
                                    variant="subtitle1" 
                                    color="text.secondary"
                                    fontWeight="500"
                                    sx={{ 
                                        opacity: 0.85, 
                                        textAlign: 'center',
                                        color: theme.palette.mode === 'dark' 
                                            ? '#B3E5FC'
                                            : '#0277BD',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}