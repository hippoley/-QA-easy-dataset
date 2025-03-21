'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // 设置画布大小为窗口大小
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();

        // 创建智能家居风格的粒子
        function createParticles() {
            const particleCount = Math.floor(window.innerWidth / 15); // 较少的粒子
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                // 随机确定是普通点还是菱形
                const isNode = Math.random() > 0.8;
                
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: isNode ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 0.2 + 0.05,
                    directionX: Math.random() * 0.6 - 0.3,
                    directionY: Math.random() * 0.6 - 0.3,
                    color: theme.palette.mode === 'dark' 
                        ? isNode 
                            ? 'rgba(77, 208, 225, ' + (Math.random() * 0.5 + 0.1) + ')'  // 智能设备节点
                            : 'rgba(0, 149, 255, ' + (Math.random() * 0.2 + 0.05) + ')'  // 连接线
                        : isNode 
                            ? 'rgba(2, 119, 189, ' + (Math.random() * 0.4 + 0.1) + ')'
                            : 'rgba(3, 155, 229, ' + (Math.random() * 0.2 + 0.03) + ')',
                    isNode: isNode,
                    connections: [],
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }

            // 创建节点之间的连接
            for (let i = 0; i < particles.length; i++) {
                if (particles[i].isNode) {
                    const connectionsCount = Math.floor(Math.random() * 3) + 1; // 1-3个连接
                    for (let j = 0; j < connectionsCount; j++) {
                        // 找到最近的其他节点
                        let closestIndex = -1;
                        let closestDistance = Infinity;
                        
                        for (let k = 0; k < particles.length; k++) {
                            if (i !== k && particles[k].isNode) {
                                const dx = particles[i].x - particles[k].x;
                                const dy = particles[i].y - particles[k].y;
                                const distance = Math.sqrt(dx * dx + dy * dy);
                                
                                if (distance < closestDistance && distance < canvas.width / 5) {
                                    closestDistance = distance;
                                    closestIndex = k;
                                }
                            }
                        }
                        
                        if (closestIndex !== -1) {
                            particles[i].connections.push(closestIndex);
                        }
                    }
                }
            }
        }

        // 动画循环
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 绘制粒子和连接
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // 更新位置
                p.x += p.directionX;
                p.y += p.directionY;
                
                // 边界检测
                if (p.x < 0 || p.x > canvas.width) p.directionX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.directionY *= -1;
                
                // 绘制粒子
                ctx.beginPath();
                if (p.isNode) {
                    // 为节点绘制菱形
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(Math.PI / 4); // 旋转45度
                    ctx.rect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    ctx.restore();
                    
                    // 绘制脉冲效果
                    const pulseSize = Math.sin(Date.now() * 0.001 + p.pulsePhase) * 2 + 4;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
                    ctx.strokeStyle = p.color.replace(')', ', 0.2)').replace('rgba', 'rgba');
                    ctx.stroke();
                } else {
                    // 普通粒子为圆形
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                }
                
                // 绘制连接
                if (p.isNode) {
                    for (let j = 0; j < p.connections.length; j++) {
                        const connectedIndex = p.connections[j];
                        const connectedParticle = particles[connectedIndex];
                        
                        // 计算距离
                        const dx = p.x - connectedParticle.x;
                        const dy = p.y - connectedParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < canvas.width / 4) {
                            // 绘制连接线
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(connectedParticle.x, connectedParticle.y);
                            
                            // 使用渐变使线条颜色渐变
                            const gradient = ctx.createLinearGradient(
                                p.x, p.y, connectedParticle.x, connectedParticle.y
                            );
                            
                            const baseColor = theme.palette.mode === 'dark' 
                                ? 'rgba(0, 149, 255, ' 
                                : 'rgba(3, 155, 229, ';
                            
                            gradient.addColorStop(0, baseColor + '0.2)');
                            gradient.addColorStop(0.5, baseColor + '0.1)');
                            gradient.addColorStop(1, baseColor + '0.2)');
                            
                            ctx.strokeStyle = gradient;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                            
                            // 在线上绘制移动的数据点
                            const now = Date.now() * 0.001;
                            const pointPosition = (Math.sin(now + p.pulsePhase) + 1) / 2; // 0到1之间
                            
                            const pointX = p.x + (connectedParticle.x - p.x) * pointPosition;
                            const pointY = p.y + (connectedParticle.y - p.y) * pointPosition;
                            
                            ctx.beginPath();
                            ctx.arc(pointX, pointY, 1, 0, Math.PI * 2);
                            ctx.fillStyle = theme.palette.mode === 'dark' 
                                ? 'rgba(77, 208, 225, 0.8)' 
                                : 'rgba(2, 119, 189, 0.8)';
                            ctx.fill();
                        }
                    }
                }
            }
            
            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme.palette.mode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity: 0.7
            }}
        />
    );
}