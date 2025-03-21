'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Slide,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

// 定义过渡动画
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateProjectDialog({ open, onClose }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    reuseConfigFrom: ''
  });
  const [error, setError] = useState(null);

  // 获取项目列表
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('获取项目列表失败:', error);
      }
    };

    if (open) {
      fetchProjects();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t('projects.createFailed'));
      }

      const data = await response.json();

      router.push(`/projects/${data.id}/settings?tab=model`);
    } catch (err) {
      console.error(t('projects.createError'), err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 表单域动画
  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: theme.palette.mode === 'dark'
            ? 'rgba(18, 26, 33, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: theme.palette.mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(232, 245, 253, 0.4)',
          overflow: 'visible',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 20px 40px rgba(0, 0, 0, 0.4)'
            : '0 20px 40px rgba(0, 136, 204, 0.1)',
        },
        component: motion.div,
        initial: { opacity: 0, y: 40, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.3 }
      }}
    >
      {/* 标题栏 */}
      <DialogTitle sx={{ 
        position: 'relative', 
        pb: 2, 
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(90deg, #0D47A1, #1976D2)'
          : 'linear-gradient(90deg, #01579B, #0288D1)',
        color: '#fff',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SettingsRemoteIcon sx={{ mr: 1.5, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="bold">
            {t('projects.createNew')}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 12,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <motion.div variants={formFieldVariants} initial="hidden" animate="visible">
            <TextField
              name="name"
              label={t('projects.name')}
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                    borderWidth: '2px'
                  }
                }
              }}
              InputProps={{
                sx: {
                  '&::placeholder': {
                    opacity: 0.7
                  }
                }
              }}
            />
          </motion.div>

          <motion.div 
            variants={formFieldVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <TextField
              name="description"
              label={t('projects.description')}
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                    borderWidth: '2px'
                  }
                }
              }}
            />
          </motion.div>

          <motion.div 
            variants={formFieldVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HistoryIcon sx={{ 
                fontSize: 20, 
                mr: 1,
                color: theme.palette.mode === 'dark' ? '#4FC3F7' : '#0288D1'
              }} />
              <Typography variant="body2" sx={{ 
                color: theme.palette.mode === 'dark' ? '#4FC3F7' : '#0288D1',
                fontWeight: 500
              }}>
                {t('projects.reuseConfigTitle')}
              </Typography>
            </Box>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="reuse-config-label">{t('projects.reuseConfig')}</InputLabel>
              <Select
                labelId="reuse-config-label"
                name="reuseConfigFrom"
                value={formData.reuseConfigFrom}
                onChange={handleChange}
                label={t('projects.reuseConfig')}
                sx={{ 
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    transition: 'all 0.3s ease',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#42A5F5' : '#0288D1',
                    borderWidth: '2px'
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '12px',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(18, 26, 33, 0.95)'
                        : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                    }
                  }
                }}
              >
                <MenuItem value="">{t('projects.noReuse')}</MenuItem>
                {projects.map(project => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </motion.div>

          {error && (
            <Typography color="error" variant="body2" sx={{ 
              mt: 1, 
              mb: 2,
              p: 1.5, 
              borderRadius: '8px',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(244, 67, 54, 0.1)' 
                : 'rgba(244, 67, 54, 0.05)',
              border: '1px solid rgba(244, 67, 54, 0.2)'
            }}>
              {error}
            </Typography>
          )}
        </DialogContent>

        <Divider sx={{ 
          opacity: 0.6,
          mx: 3
        }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={onClose} 
            sx={{
              borderRadius: '50px',
              color: theme.palette.mode === 'dark' ? '#B3E5FC' : '#0277BD',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(77, 208, 225, 0.5)' : 'rgba(2, 119, 189, 0.5)'}`,
              px: 3,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(77, 208, 225, 0.05)' : 'rgba(2, 119, 189, 0.05)',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(77, 208, 225, 0.8)' : 'rgba(2, 119, 189, 0.8)',
              }
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !formData.name}
            startIcon={loading ? <CircularProgress size={16} /> : <AddIcon />}
            sx={{
              borderRadius: '50px',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #0D47A1, #1976D2, #42A5F5)'
                : 'linear-gradient(90deg, #01579B, #0288D1, #29B6F6)',
              boxShadow: '0 4px 15px rgba(0, 136, 204, 0.3)',
              px: 3,
              fontWeight: 500,
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #0D47A1, #1565C0, #1E88E5)'
                  : 'linear-gradient(90deg, #01579B, #0277BD, #0288D1)',
                boxShadow: '0 6px 20px rgba(0, 136, 204, 0.4)'
              },
              '&.Mui-disabled': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(25, 118, 210, 0.3)'
                  : 'rgba(2, 136, 209, 0.3)',
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            {loading ? t('common.creating') : t('home.createProject')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
