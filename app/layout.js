import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import I18nProvider from '@/components/I18nProvider';

export const metadata = {
  title: 'RIZLL',
  description: '智能家居数据管理平台',
  icons: {
    icon: '/imgs/logo.ico',  // 更新为正确的文件名
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
