import sys
path = r'C:\Users\Administrator\Documents\Kimi\Workspaces\网络图册\show\admin.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 修复 escJs 定义中的引号问题
# 在单引号字符串中，"\\\\'" 会导致字符串过早结束
# 改为 "\\\\\\'"，在单引号字符串中变成 \\
content = content.replace('replace(/\\\'/g,"\\\\\'")', 'replace(/\\\'/g,"\\\\\\\'")')

# 修复 renderTabs 中的 setFolder 引号问题
# setFolder('all') 在单引号字符串中，' 是字符串结束符
# 改为 setFolder(\\'all\\')，在单引号字符串中变成 setFolder('all')
content = content.replace("setFolder('all')", "setFolder(\\'all\\')")
content = content.replace("setFolder('\"+escJs(folders[i])+"')", "setFolder(\\'\"+escJs(folders[i])+"\\')")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed!')
