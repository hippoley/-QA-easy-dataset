# 使用Node.js LTS版本作为基础镜像
FROM node:lts

# 设置工作目录
WORKDIR /app

# 设置npm使用淘宝镜像源
RUN npm config set registry https://registry.npmmirror.com

# 安装pnpm
RUN npm install -g pnpm

# 复制package.json和pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install

# 复制所有文件
COPY . .

# 构建应用
RUN pnpm build

# 暴露端口
EXPOSE 1717

# 启动应用
CMD ["pnpm", "start"]