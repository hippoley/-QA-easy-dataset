'use client';

import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Grid, 
  Card, 
  CardContent, 
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    }
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    transition: { duration: 0.2 }
  }
};

const ProjectList = ({ projects, isLoading }) => {
  const router = useRouter();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
        <CircularProgress size={40} color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => router.push('/project/create')}
        sx={{
          mb: 4,
          borderRadius: '50px',
          px: 3,
          py: 1.2,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, #0D47A1, #1976D2)'
            : 'linear-gradient(90deg, #01579B, #0288D1)',
          boxShadow: '0 4px 15px rgba(3,155,229,0.3)',
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(90deg, #1565C0, #2196F3)'
              : 'linear-gradient(90deg, #0277BD, #039BE5)',
            boxShadow: '0 6px 20px rgba(3,155,229,0.4)',
          }
        }}
      >
        创建新项目
      </Button>

      {projects && projects.length > 0 ? (
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(18, 18, 18, 0.6)'
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'rgba(0,0,0,0.06)'}`,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 20px rgba(0,0,0,0.4)'
                      : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <Box
                    sx={{
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0D47A1, #1976D2, #42A5F5)'
                        : 'linear-gradient(135deg, #01579B, #0288D1, #29B6F6)',
                      py: 2,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#fff',
                        fontWeight: 600,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {project.name}
                    </Typography>
                    <WidgetsIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, pb: 1, position: 'relative' }}>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: -28, 
                        right: -28, 
                        width: 80, 
                        height: 80, 
                        borderRadius: '50%', 
                        background: 'rgba(255,255,255,0.1)', 
                        filter: 'blur(30px)' 
                      }} 
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 1 }}>
                      <SmartToyIcon 
                        sx={{ 
                          mr: 1.5, 
                          color: theme.palette.primary.main,
                          fontSize: 20
                        }} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {project.description || '无项目描述'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip 
                        label={`${project.dataItems?.length || 0} 个数据项`} 
                        size="small"
                        sx={{ 
                          borderRadius: '50px',
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(25,118,210,0.2)'
                            : 'rgba(3,155,229,0.1)',
                          color: theme.palette.primary.main,
                          border: `1px solid ${theme.palette.mode === 'dark' 
                            ? 'rgba(25,118,210,0.3)'
                            : 'rgba(3,155,229,0.2)'}`,
                        }}
                      />
                      
                      <Typography variant="caption" color="text.secondary">
                        {project.updatedAt ? format(new Date(project.updatedAt), 'yyyy/MM/dd') : '未知时间'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push(`/project/${project.id}`)}
                        sx={{
                          borderRadius: '50px',
                          textTransform: 'none',
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: 'rgba(3,155,229,0.04)'
                          }
                        }}
                      >
                        查看详情
                      </Button>
                      
                      <Box>
                        <IconButton 
                          size="small" 
                          onClick={() => router.push(`/project/${project.id}/edit`)}
                          sx={{ color: theme.palette.mode === 'dark' ? '#64B5F6' : '#0288D1' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small"
                          sx={{ color: theme.palette.error.main }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box 
          sx={{ 
            py: 8, 
            textAlign: 'center',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(18, 18, 18, 0.6)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: `1px solid ${theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <SmartToyIcon 
            sx={{ 
              fontSize: 60, 
              color: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
              opacity: 0.7,
              mb: 2
            }} 
          />
          <Typography variant="h6" gutterBottom>
            暂无项目
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            点击上方按钮创建您的第一个智能项目
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectList;