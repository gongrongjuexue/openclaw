# HEARTBEAT.md

# 自动检查进行中的任务
- 每 1 小时：subagents list --recentMinutes 60

# 通知所有关联群组
- 每 1 小时：python3 /Users/wangqiang/.openclaw/workspace/skills/notify_groups.py

# 🦞 每日技能发现任务
- **每日检查**: https://github.com/VoltAgent/awesome-openclaw-skills
- **任务**: 查看是否有新技能更新，发现高价值技能就分享给用户
- **检查频率**: 每天一次（每天早上6点）
- **分享标准**: 
  - 评分 > 3.5 的新技能
  - 实用工具类技能（Docker/Cursor/IDE 等）
  - 自我进化/学习类技能
  - 用户可能感兴趣的新发现

# 📰 每日新闻热点汇总任务
- **任务**: 抓取并推送每日新闻热点
- **执行脚本**: `python3 ~/.openclaw/workspace/src/scripts/news_daily_v2.py --send-email`
- **频率**: 每天一次（早上5:00）
- **推送内容**: 
  - 全球政治军事热点 Top10
  - 科技/AI新闻 Top10
  - 国内新闻热点 Top10
  - GitHub Agent项目 Top10
  - arXiv顶会AI论文 Top10
- **推送渠道**: 邮件（9387121@qq.com）+ 抄送Kevin
- **特点**: RSS实时抓取，动态更新，非静态模板

# 📝 每日笔记自动创建
- **任务**: 检查并创建 memory/YYYY-MM-DD.md（如果不存在）
- **频率**: 每天一次（早上6:05，技能检查之后）
- **操作**:
  ```bash
  TODAY=$(date +%Y-%m-%d)
  MEMORY_FILE="$HOME/.openclaw/workspace/memory/${TODAY}.md"
  if [ ! -f "$MEMORY_FILE" ]; then
    echo "# ${TODAY} 工作日志

## 今日任务
- [ ] 

## 重要进展

## 决策记录

## 阻塞问题

## 明日计划" > "$MEMORY_FILE"
    echo "✅ 已创建: ${MEMORY_FILE}"
  else
    echo "ℹ️ 文件已存在: ${MEMORY_FILE}"
  fi
  ```
- **目的**: 确保每天都有工作日志文件，防止遗漏记录

# 📝 每日笔记定时汇总
- **任务**: 自动追加 CANN项目进展到笔记
- **频率**: 每3小时（09:00, 12:00, 15:00, 18:00, 21:00）
- **内容**: 
  - 收集小I/小C/小T最新进展
  - 提取关键信息（完成的任务、当前状态、阻塞问题）
  - 追加到 memory/YYYY-MM-DD.md 的"## 重要进展"章节
- **格式**:
  ```markdown
  ### HH:MM CANN项目进展
  - 小I: [状态] - [关键进展]
  - 小C: [状态] - [关键进展]
  - 小T: [状态] - [关键进展]
  - 阻塞: [如有]
  ```
- **目的**: 自动记录项目进展，减少手动更新负担

# 📧 每日邮件报告任务
- **任务**: 发送CANN项目进展日报
- **频率**: 每天早上7:00
- **收件人**: 9387121@qq.com
- **内容**: 
  - 小I/小C/小T昨日进展汇总
  - 当前项目状态
  - 阻塞问题（如有）
- **配置**: SMTP使用QQ邮箱，授权码已配置

# 💾 配置文件备份任务
- **任务**: 备份核心配置文件（SOUL.md, IDENTITY.md, TOOLS.md, HEARTBEAT.md, MEMORY.md, AGENTS.md, USER.md）
- **频率**: 每天一次（每天晚上23:00）
- **脚本**: `~/.openclaw/workspace/scripts/backup_configs.sh`
- **保留策略**: 保留最近30天的备份
- **备份位置**: `~/.openclaw/workspace/backups/`
