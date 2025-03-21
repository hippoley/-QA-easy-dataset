// styles/home.js
export const styles = {
    heroSection: {
        pt: { xs: 6, md: 10 },
        pb: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out'
    },
    heroBackground: (theme) => ({
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 88, 139, 0.3) 0%, rgba(0, 136, 204, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(232, 245, 253, 1) 0%, rgba(240, 249, 255, 0.8) 100%)',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/imgs/smart-home-pattern.png") repeat',
            backgroundSize: '200px',
            opacity: theme.palette.mode === 'dark' ? 0.05 : 0.1,
            zIndex: 0
        }
    }),
    decorativeCircle: {
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 149, 255, 0.1) 0%, rgba(0, 188, 212, 0) 70%)',
        top: '-200px',
        right: '-100px',
        zIndex: 0,
        animation: 'float 20s infinite ease-in-out',
        '@keyframes float': {
            '0%': { transform: 'translateY(0px) scale(1)' },
            '50%': { transform: 'translateY(-20px) scale(1.05)' },
            '100%': { transform: 'translateY(0px) scale(1)' }
        }
    },
    decorativeCircleSecond: {
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77, 208, 225, 0.08) 0%, rgba(0, 149, 255, 0) 70%)',
        bottom: '-150px',
        left: '-100px',
        zIndex: 0,
        animation: 'float2 25s infinite ease-in-out',
        '@keyframes float2': {
            '0%': { transform: 'translateY(0px) scale(1)' },
            '50%': { transform: 'translateY(20px) scale(1.08)' },
            '100%': { transform: 'translateY(0px) scale(1)' }
        }
    },
    gradientTitle: (theme) => ({
        mb: 2,
        background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, #4DD0E1 0%, #00B8D4 100%)' 
            : 'linear-gradient(90deg, #0277BD 0%, #0288D1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent'
    }),
    createButton: (theme) => ({
        mt: 3,
        px: 4,
        py: 1.2,
        borderRadius: '50px',
        fontSize: '1rem',
        background: theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, #0288D1 0%, #039BE5 100%)'
            : 'linear-gradient(90deg, #0277BD 0%, #0288D1 100%)',
        boxShadow: '0 4px 10px rgba(2, 136, 209, 0.2)',
        color: '#fff',
        '&:hover': {
            background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #039BE5 0%, #03A9F4 100%)'
                : 'linear-gradient(90deg, #0288D1 0%, #039BE5 100%)',
            boxShadow: '0 6px 15px rgba(2, 136, 209, 0.3)'
        }
    }),
    statsCard: (theme) => ({
        mt: 6,
        p: { xs: 2, md: 4 },
        borderRadius: '20px',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 24px rgba(0, 0, 0, 0.2)'
            : '0 8px 24px rgba(0, 136, 204, 0.1)',
        background: theme.palette.mode === 'dark'
            ? 'rgba(18, 26, 33, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: theme.palette.mode === 'dark'
            ? '1px solid rgba(45, 55, 72, 0.5)'
            : '1px solid rgba(232, 245, 253, 0.5)'
    }),
    projectCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        position: 'relative',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 127, 178, 0.1)',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(0, 127, 178, 0.15)'
        }
    },
    projectAvatar: {
        position: 'absolute',
        top: -16,
        left: 24,
        zIndex: 1,
        boxShadow: '0 4px 10px rgba(0, 127, 178, 0.2)'
    },
    projectDescription: {
        mb: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '40px'
    }
};