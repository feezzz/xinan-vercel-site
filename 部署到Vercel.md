# 部署到 Vercel

这个文件夹已经是可以直接部署的静态网站，不需要安装项目依赖，也不需要设置构建命令。

## 第一次部署

1. 在电脑上解压整个文件夹。
2. 在解压后的文件夹空白处按住 Shift 并单击鼠标右键，选择“在终端中打开”。
3. 登录 Vercel：

   ```powershell
   npx vercel login
   ```

4. 登录完成后发布正式网站：

   ```powershell
   npx vercel --prod --yes
   ```

5. 命令结束时会显示一个 `vercel.app` 网址。先打开它确认页面显示“心安之地 · 小红书图文作品集”。

## 绑定 feezzz.space

1. 打开 Vercel 控制台，进入刚创建的项目。
2. 打开 Settings → Domains。
3. 添加 `feezzz.space` 和 `www.feezzz.space`。
4. 按 Vercel 页面给出的值修改 Cloudflare DNS。切换前先删除目前指向 ChatGPT Sites 的两条 A 记录和 `www` CNAME；用于 ChatGPT Sites 的四条 TXT 验证记录也可以删除。
5. 等 Vercel 显示 Valid Configuration 后，再访问两个域名。

域名切换期间，原来的 ChatGPT Sites 地址仍可继续访问，不会影响检查新部署。
